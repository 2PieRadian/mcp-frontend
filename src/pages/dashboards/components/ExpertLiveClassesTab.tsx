import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  Video,
  XCircle,
} from "lucide-react";
import {
  cancelLiveClass,
  getExpertStudentMemberships,
  rescheduleLiveClass,
  scheduleLiveClass,
  type StudentMembershipItem,
} from "../../../lib/api";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ExpertLiveClassesTab() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState<StudentMembershipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Schedule modal
  const [scheduleTarget, setScheduleTarget] =
    useState<StudentMembershipItem | null>(null);
  const [scheduleDateTime, setScheduleDateTime] = useState("");
  const [scheduleTopic, setScheduleTopic] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Reschedule modal
  const [rescheduleTarget, setRescheduleTarget] = useState<{
    appointmentId: number;
    studentName: string;
    subjectName: string;
    topic?: string | null;
  } | null>(null);
  const [rescheduleDateTime, setRescheduleDateTime] = useState("");
  const [rescheduleTopic, setRescheduleTopic] = useState("");

  const loadMemberships = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpertStudentMemberships();
      setMemberships(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load enrolled students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMemberships();
  }, [loadMemberships]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleTarget || !scheduleDateTime) {
      setModalError("Please select date & start time.");
      return;
    }
    setSubmitting(true);
    setModalError(null);
    try {
      await scheduleLiveClass(scheduleTarget.id, {
        startAt: new Date(scheduleDateTime).toISOString(),
        topic: scheduleTopic.trim() || undefined,
      });
      setScheduleTarget(null);
      setScheduleDateTime("");
      setScheduleTopic("");
      setFeedback("Live class scheduled! Student notified by email & push.");
      await loadMemberships();
    } catch (err: any) {
      setModalError(err?.message || "Failed to schedule class");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTarget || !rescheduleDateTime) {
      setModalError("Please select new date & time.");
      return;
    }
    setSubmitting(true);
    setModalError(null);
    try {
      await rescheduleLiveClass(rescheduleTarget.appointmentId, {
        startAt: new Date(rescheduleDateTime).toISOString(),
        topic: rescheduleTopic.trim() || undefined,
      });
      setRescheduleTarget(null);
      setRescheduleDateTime("");
      setFeedback("Live class rescheduled! Student notified.");
      await loadMemberships();
    } catch (err: any) {
      setModalError(err?.message || "Failed to reschedule class");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelClass = async (appointmentId: number) => {
    if (!confirm("Cancel this scheduled live class? Weekly quota will be freed.")) {
      return;
    }
    try {
      await cancelLiveClass(appointmentId);
      setFeedback("Live class cancelled and student notified.");
      await loadMemberships();
    } catch (err: any) {
      setError(err?.message || "Failed to cancel class");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-logo-heading flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Enrolled 1:1 Students
          </h2>
          <p className="text-sm text-gray-600">
            Schedule your student&apos;s X classes per week on any day that works for both of you.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {feedback}
          </span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {memberships.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <GraduationCap className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-800">
            No enrolled 1:1 students yet
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Students who enroll in your subjects will appear here for live class scheduling.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {memberships.map((m) => {
            const upcoming = (m.appointments || []).filter(
              (a) => a.status === "SCHEDULED" || a.status === "IN_PROGRESS",
            );
            const past = (m.appointments || []).filter(
              (a) => a.status === "COMPLETED",
            );
            const pct = Math.min(
              100,
              Math.round(
                (m.weeklyProgress.classesThisWeek / Math.max(1, m.classesPerWeek)) *
                  100,
              ),
            );

            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {m.user?.name || "Student"}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800">
                        {m.specialization?.name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          m.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {m.plan?.title} • {m.classDurationMinutes} mins per class • Valid{" "}
                      {formatDateShort(m.startDate)} – {formatDateShort(m.endDate)}
                    </p>
                    {m.notes && (
                      <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded-lg px-2.5 py-1.5 inline-block">
                        Goal: {m.notes}
                      </p>
                    )}
                  </div>

                  {m.status === "ACTIVE" && (
                    <button
                      type="button"
                      onClick={() => {
                        setModalError(null);
                        setScheduleTarget(m);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                    >
                      <CalendarClock className="w-4 h-4" />
                      Set Class Timing
                    </button>
                  )}
                </div>

                {/* Weekly Quota Progress */}
                <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-gray-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      This Week&apos;s Classes (Any Day):{" "}
                      <strong>
                        {m.weeklyProgress.classesThisWeek} / {m.classesPerWeek}
                      </strong>
                    </span>
                    <span className="text-gray-500">
                      {m.weeklyProgress.remainingThisWeek} left this week •{" "}
                      {past.length} completed total
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Upcoming Classes */}
                {upcoming.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Upcoming 1:1 Classes
                    </h4>
                    <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl">
                      {upcoming.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {formatDateTime(apt.startAt)}
                            </div>
                            {apt.userConcern && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                Topic: {apt.userConcern}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => navigate(`/appointments/${apt.id}/video`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold cursor-pointer"
                            >
                              <Video className="w-3.5 h-3.5" />
                              Join 1:1 Class
                            </button>
                            {apt.status === "SCHEDULED" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setModalError(null);
                                    setRescheduleTarget({
                                      appointmentId: apt.id,
                                      studentName: m.user?.name || "Student",
                                      subjectName: m.specialization?.name,
                                      topic: apt.userConcern,
                                    });
                                    setRescheduleTopic(apt.userConcern || "");
                                  }}
                                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 cursor-pointer"
                                >
                                  Reschedule
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleCancelClass(apt.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">
              Set Live Class Timing
            </h3>
            <p className="text-sm text-gray-600">
              {scheduleTarget.user?.name} — {scheduleTarget.specialization?.name} (
              {scheduleTarget.classDurationMinutes} mins)
            </p>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pick Date &amp; Start Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduleDateTime}
                  onChange={(e) => setScheduleDateTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                />
                {scheduleDateTime && (
                  <p className="text-xs text-emerald-700 mt-1.5 font-medium">
                    Timing: {formatDateTime(new Date(scheduleDateTime).toISOString())} –{" "}
                    {new Date(
                      new Date(scheduleDateTime).getTime() +
                        scheduleTarget.classDurationMinutes * 60000,
                    ).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Topic (optional)
                </label>
                <input
                  type="text"
                  value={scheduleTopic}
                  onChange={(e) => setScheduleTopic(e.target.value)}
                  placeholder="e.g., Chapter 4 Problem Solving"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                />
              </div>
              {modalError && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  {modalError}
                </p>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleTarget(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Schedule &amp; Notify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">
              Reschedule Live Class
            </h3>
            <p className="text-sm text-gray-600">
              {rescheduleTarget.studentName} — {rescheduleTarget.subjectName}
            </p>
            <form onSubmit={handleReschedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={rescheduleDateTime}
                  onChange={(e) => setRescheduleDateTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic (optional)
                </label>
                <input
                  type="text"
                  value={rescheduleTopic}
                  onChange={(e) => setRescheduleTopic(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                />
              </div>
              {modalError && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  {modalError}
                </p>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleTarget(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save New Time
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
