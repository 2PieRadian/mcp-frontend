import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  UserCheck,
  Video,
} from "lucide-react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { openRazorpayCheckout } from "../lib/razorpay";
import { loginPathWithRedirect } from "../lib/loginRedirect";
import {
  getMyMemberships,
  getPublicMembershipPlans,
  initiateMembershipPurchase,
  verifyMembershipPurchase,
  type PublicMembershipPlan,
  type StudentMembershipItem,
} from "../lib/api";

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

export default function LiveClasses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"browse" | "my">(user ? "my" : "browse");
  const [plans, setPlans] = useState<PublicMembershipPlan[]>([]);
  const [myMemberships, setMyMemberships] = useState<StudentMembershipItem[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Enroll Modal
  const [checkoutPlan, setCheckoutPlan] = useState<PublicMembershipPlan | null>(
    null,
  );
  const [selectedExpertId, setSelectedExpertId] = useState<string>("AUTO");
  const [studentNotes, setStudentNotes] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [plansRes, myRes] = await Promise.all([
        getPublicMembershipPlans(),
        user ? getMyMemberships().catch(() => []) : Promise.resolve([]),
      ]);
      setPlans(plansRes);
      setMyMemberships(myRes);
      if (user && myRes.length === 0) {
        setTab("browse");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load live class plans");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const subjects = useMemo(() => {
    const map = new Map<number, string>();
    plans.forEach((p) => {
      if (p.specialization) {
        map.set(p.specialization.id, p.specialization.name);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [plans]);

  const filteredPlans = useMemo(() => {
    if (selectedSubject === "ALL") return plans;
    return plans.filter((p) => String(p.specializationId) === selectedSubject);
  }, [plans, selectedSubject]);

  const handleOpenEnroll = (plan: PublicMembershipPlan) => {
    if (!user) {
      navigate(loginPathWithRedirect("/live-classes", ""));
      return;
    }
    setCheckoutPlan(plan);
    setSelectedExpertId(
      plan.eligibleExperts?.[0] ? String(plan.eligibleExperts[0].id) : "AUTO",
    );
    setStudentNotes("");
  };

  const handleConfirmEnroll = async () => {
    if (!checkoutPlan) return;
    setEnrolling(true);
    setError(null);
    try {
      const expertId =
        selectedExpertId === "AUTO" ? null : Number(selectedExpertId);
      const init = await initiateMembershipPurchase({
        planId: checkoutPlan.id,
        expertId,
        notes: studentNotes.trim() || undefined,
      });

      if (!init.requiresPayment) {
        setCheckoutPlan(null);
        setToastMsg("Membership activated! Check My Memberships.");
        setTab("my");
        await loadData();
        return;
      }

      const key =
        init.keyId || (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined);
      if (!key || !init.orderId) {
        throw new Error("Razorpay configuration missing");
      }

      await openRazorpayCheckout({
        key,
        amount: init.amountInPaise || (init.amount || checkoutPlan.price) * 100,
        currency: init.currency || "INR",
        order_id: init.orderId,
        name: "MindCurePath Live 1:1 Classes",
        description: `${checkoutPlan.title} (${checkoutPlan.durationLabel})`,
        handler: async (rzpRes) => {
          try {
            await verifyMembershipPurchase({
              razorpay_order_id: rzpRes.razorpay_order_id,
              razorpay_payment_id: rzpRes.razorpay_payment_id,
              razorpay_signature: rzpRes.razorpay_signature,
            });
            setCheckoutPlan(null);
            setToastMsg("Payment successful! Your 1:1 membership is active.");
            setTab("my");
            await loadData();
          } catch (verifyErr: any) {
            setError(verifyErr?.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => setEnrolling(false),
        },
      });
    } catch (err: any) {
      setError(err?.message || "Failed to start enrollment");
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#304048] flex items-center gap-2.5">
              <GraduationCap className="w-7 h-7 text-[#44666C]" />
              1-on-1 Live Classes &amp; Memberships
            </h1>
            <p className="text-gray-600 mt-1">
              Learn any subject 1:1 with a dedicated teacher. Pick a monthly, 3-month, 6-month, or yearly plan.
            </p>
          </div>

          <div className="inline-flex bg-gray-100 p-1 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setTab("browse")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                tab === "browse"
                  ? "bg-white text-[#304048] shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Browse Plans
            </button>
            {user && (
              <button
                type="button"
                onClick={() => setTab("my")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  tab === "my"
                    ? "bg-white text-[#304048] shadow-sm"
                    : "text-gray-600"
                }`}
              >
                My Memberships ({myMemberships.length})
              </button>
            )}
          </div>
        </div>

        {toastMsg && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {toastMsg}
            </span>
            <button
              type="button"
              onClick={() => setToastMsg(null)}
              className="text-xs underline"
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#44666C]" />
          </div>
        ) : tab === "browse" ? (
          <div className="space-y-6">
            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubject("ALL")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedSubject === "ALL"
                      ? "bg-[#44666C] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Subjects
                </button>
                {subjects.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSubject(String(s.id))}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      selectedSubject === String(s.id)
                        ? "bg-[#44666C] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}

            {filteredPlans.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-12 text-center text-gray-500">
                No membership plans available yet. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800">
                          {plan.specialization?.name}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          {plan.durationLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#304048]">
                          {plan.title}
                        </h3>
                        {plan.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {plan.description}
                          </p>
                        )}
                      </div>

                      <div className="text-3xl font-extrabold text-[#304048]">
                        ₹{plan.price.toLocaleString("en-IN")}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          / {plan.durationLabel}
                        </span>
                      </div>

                      <ul className="space-y-2 text-sm text-gray-700 pt-2 border-t border-gray-100">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong>{plan.classesPerWeek}</strong> live 1:1{" "}
                            {plan.classesPerWeek === 1 ? "class" : "classes"} per week
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong>{plan.classDurationMinutes} mins</strong> per session
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Flexible days scheduled by your teacher</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenEnroll(plan)}
                      className="w-full py-3 rounded-xl bg-[#44666C] hover:bg-[#365a62] text-white font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : myMemberships.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-12 text-center space-y-3">
            <GraduationCap className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800">
              No active memberships yet
            </h3>
            <p className="text-sm text-gray-500">
              Enroll in a 1-on-1 subject membership to start learning live.
            </p>
            <button
              type="button"
              onClick={() => setTab("browse")}
              className="px-5 py-2.5 rounded-xl bg-[#44666C] text-white text-sm font-semibold cursor-pointer"
            >
              Browse Membership Plans
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {myMemberships.map((m) => {
              const upcoming = (m.appointments || []).filter(
                (a) => a.status === "SCHEDULED" || a.status === "IN_PROGRESS",
              );
              const pct = Math.min(
                100,
                Math.round(
                  (m.weeklyProgress.classesThisWeek /
                    Math.max(1, m.classesPerWeek)) *
                    100,
                ),
              );

              return (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-[#304048]">
                          {m.specialization?.name} — {m.plan?.title}
                        </h3>
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
                      <p className="text-sm text-gray-600 mt-1">
                        Valid {formatShortDate(m.startDate)} –{" "}
                        {formatShortDate(m.endDate)} • {m.classDurationMinutes}{" "}
                        mins per class
                      </p>
                    </div>

                    <div className="text-sm font-medium text-gray-700 flex items-center gap-2 bg-gray-50 px-3.5 py-2 rounded-xl">
                      <UserCheck className="w-4 h-4 text-[#44666C]" />
                      {m.expert?.user?.name
                        ? `Teacher: ${m.expert.user.name}`
                        : "Teacher will be assigned shortly"}
                    </div>
                  </div>

                  {/* Weekly progress */}
                  <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-gray-700">
                        This week:{" "}
                        <strong>
                          {m.weeklyProgress.classesThisWeek} / {m.classesPerWeek}
                        </strong>{" "}
                        classes scheduled
                      </span>
                      <span className="text-gray-500">
                        {m.weeklyProgress.completedClasses} completed total
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-[#44666C] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Upcoming live classes */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Scheduled 1:1 Live Classes
                    </h4>
                    {upcoming.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">
                        No upcoming class scheduled yet. You&apos;ll get an email &amp; push notification as soon as your teacher schedules one.
                      </p>
                    ) : (
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
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/appointments/${apt.id}/video`)
                              }
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#44666C] hover:bg-[#365a62] text-white text-xs font-semibold cursor-pointer"
                            >
                              <Video className="w-4 h-4" />
                              Join 1:1 Class
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enroll Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#304048]">
              Enroll in {checkoutPlan.title}
            </h3>
            <p className="text-sm text-gray-600">
              {checkoutPlan.specialization?.name} • {checkoutPlan.durationLabel} •{" "}
              {checkoutPlan.classesPerWeek} classes/week ({checkoutPlan.classDurationMinutes}{" "}
              mins each)
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose Your 1:1 Teacher
                </label>
                <select
                  value={selectedExpertId}
                  onChange={(e) => setSelectedExpertId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                >
                  <option value="AUTO">Let Admin Assign Best Teacher</option>
                  {checkoutPlan.eligibleExperts.map((exp) => (
                    <option key={exp.id} value={String(exp.id)}>
                      {exp.name}
                      {exp.professionalTitle ? ` — ${exp.professionalTitle}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning Goals / Grade / Notes (optional)
                </label>
                <textarea
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="e.g., CBSE Class 10, prefer evening slots"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="text-lg font-bold text-[#304048]">
                Total: ₹{checkoutPlan.price.toLocaleString("en-IN")}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutPlan(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={enrolling}
                  onClick={handleConfirmEnroll}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#44666C] text-white text-sm font-semibold disabled:opacity-50"
                >
                  {enrolling && <Loader2 className="w-4 h-4 animate-spin" />}
                  {checkoutPlan.price > 0 ? "Pay & Enroll" : "Enroll Free"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
