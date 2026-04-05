import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import RescheduleAppointmentModal from "../components/RescheduleAppointmentModal";
import ReviewModal from "../components/ReviewModal";
import { usePollingNow } from "../hooks/usePollingNow";
import { formatAppointmentStartsIn } from "../lib/appointmentStartsIn";
import {
  getMyAppointments,
  isTerminalAppointmentStatus,
  isScheduledAwaitingJoinInBookedWindow,
  userCompleteAppointment,
  userReportNoShow,
  postAppointmentJoinThenOpenMeet,
  ApiHttpError,
  type MyAppointment,
  type AppointmentStatus,
} from "../lib/api";
import {
  Calendar,
  Clock,
  Loader2,
  Video,
  Phone,
  MessageCircle,
  Copy,
  CheckCircle2,
  CalendarClock,
  Radio,
  UserX,
  Ban,
  MessageSquareText,
  Timer,
  Star,
  AlertCircle,
  Zap,
} from "lucide-react";

const MIN_SESSION_MINUTES = 5;

const STATUS_VALUES: ("" | AppointmentStatus)[] = [
  "",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
];
const STATUS_KEYS = [
  "dashboardFilterAll",
  "dashboardFilterScheduled",
  "dashboardFilterOngoing",
  "dashboardFilterCompleted",
] as const;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatAmount(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function getExpertInitial(name: string | null, email: string): string {
  if (name?.trim()) return name.trim().charAt(0).toUpperCase();
  if (email?.trim()) return email.trim().charAt(0).toUpperCase();
  return "E";
}

function CommunicationChip({ medium }: { medium: string }) {
  const { t } = useTranslation("common");
  const m = medium?.toUpperCase() || "";
  const labels: Record<string, string> = {
    VIDEO: t("dashboardModeVideo"),
    CALL: t("dashboardModeCall"),
    CHAT: t("dashboardModeChat"),
  };
  const label = labels[m] || medium;
  const iconClass = "w-4 h-4 shrink-0";
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
      {m === "VIDEO" && <Video className={iconClass} />}
      {m === "CALL" && <Phone className={iconClass} />}
      {(m === "CHAT" || !["VIDEO", "CALL"].includes(m)) && (
        <MessageCircle className={iconClass} />
      )}
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { t } = useTranslation("common");
  let label: string;
  let icon: ReactNode;
  let badge: string;
  let dot: string;

  switch (status) {
    case "SCHEDULED":
      label = t("dashboardFilterScheduled");
      icon = <CalendarClock className="w-3.5 h-3.5" />;
      badge = "bg-amber-50 text-amber-800 border border-amber-200";
      dot = "bg-amber-500";
      break;
    case "IN_PROGRESS":
      label = t("dashboardFilterOngoing");
      icon = <Radio className="w-3.5 h-3.5" />;
      badge = "bg-blue-50 text-blue-800 border border-blue-200";
      dot = "bg-blue-500";
      break;
    case "COMPLETED":
      label = t("dashboardFilterCompleted");
      icon = <CheckCircle2 className="w-3.5 h-3.5" />;
      badge = "bg-emerald-50 text-emerald-800 border border-emerald-200";
      dot = "bg-emerald-500";
      break;
    case "NO_SHOW":
      label = t("dashboardFilterNoShow");
      icon = <UserX className="w-3.5 h-3.5" />;
      badge = "bg-orange-50 text-orange-900 border border-orange-200";
      dot = "bg-orange-500";
      break;
    case "CANCELLED":
      label = t("dashboardFilterCancelled");
      icon = <Ban className="w-3.5 h-3.5" />;
      badge = "bg-gray-100 text-gray-700 border border-gray-200";
      dot = "bg-gray-400";
      break;
    default:
      label = String(status);
      icon = <CheckCircle2 className="w-3.5 h-3.5" />;
      badge = "bg-gray-100 text-gray-700 border border-gray-200";
      dot = "bg-gray-400";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {icon}
      {label}
    </span>
  );
}

function AppointmentCard({
  apt,
  nowMs,
  onOpenReschedule,
  onOpenReview,
  onStatusChange,
}: {
  apt: MyAppointment;
  nowMs: number;
  onOpenReschedule?: (apt: MyAppointment) => void;
  onOpenReview?: (apt: MyAppointment) => void;
  onStatusChange?: () => void;
}) {
  const { t } = useTranslation("common");
  const { user: authUser } = useAuth();
  const expertName =
    apt.expert?.user?.name ||
    apt.expert?.user?.email ||
    t("expertFallbackName");
  const initial = getExpertInitial(
    apt.expert?.user?.name ?? null,
    apt.expert?.user?.email ?? "",
  );
  const [copied, setCopied] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [reportingNoShow, setReportingNoShow] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [joiningSession, setJoiningSession] = useState(false);

  const showMeetActions =
    !!apt.meetLink && !isTerminalAppointmentStatus(apt.status);
  const isVideoSession = apt.communicationMedium?.toUpperCase() === "VIDEO";
  const showScheduledJoinHint = isScheduledAwaitingJoinInBookedWindow(
    apt.status,
    apt.startAt,
    apt.endAt,
  );
  const startsInLabel =
    apt.status === "SCHEDULED"
      ? formatAppointmentStartsIn(apt.startAt, nowMs, t)
      : null;
  const showReschedule =
    apt.status === "SCHEDULED" &&
    typeof apt.expert?.id === "number" &&
    apt.expert.id > 0 &&
    !!onOpenReschedule;

  const startAtMs = new Date(apt.startAt).getTime();
  const minGateMs = startAtMs + MIN_SESSION_MINUTES * 60 * 1000;
  const canResolve = nowMs >= minGateMs;
  const showSessionActions =
    (apt.status === "SCHEDULED" || apt.status === "IN_PROGRESS") &&
    nowMs >= startAtMs;

  const showReviewButton = apt.status === "COMPLETED" && !!onOpenReview;

  const handleMarkComplete = async () => {
    setCompleting(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await userCompleteAppointment(apt.id);
      if (res.unchanged) {
        setActionSuccess(t("sessionCompleteAlreadyDone"));
      } else {
        setActionSuccess(t("sessionCompleteSuccess"));
      }
      onStatusChange?.();
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setActionError(err.message);
      } else {
        setActionError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setCompleting(false);
      setShowCompleteModal(false);
    }
  };

  const handleReportNoShow = async () => {
    setReportingNoShow(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await userReportNoShow(apt.id);
      if (res.unchanged) {
        setActionSuccess(t("sessionNoShowAlreadyDone"));
      } else {
        setActionSuccess(t("sessionNoShowSuccess"));
      }
      onStatusChange?.();
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setActionError(err.message);
      } else {
        setActionError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setReportingNoShow(false);
      setShowNoShowModal(false);
    }
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
      <div className="p-5 sm:p-6">
        {/* Top row: Expert + Status */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full bg-[#44666C] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#304048] truncate">
                {expertName}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Appointment #{apt.id}
              </p>
            </div>
          </div>
          <StatusBadge status={apt.status} />
        </div>

        {/* Date & time block */}
        <div className="py-4 px-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 text-[#304048] font-medium">
              <Calendar className="w-5 h-5 text-[#44666C] shrink-0" />
              {formatDate(apt.startAt)}
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-gray-400 shrink-0" />
              {formatTime(apt.startAt)} – {formatTime(apt.endAt)}
            </span>
          </div>
          {startsInLabel ? (
            <div className="mt-3 pt-3 border-t border-gray-200/80 flex items-center gap-2 text-sm font-semibold text-[#44666C]">
              <Timer className="w-4 h-4 shrink-0 opacity-90" aria-hidden />
              <span>{startsInLabel}</span>
            </div>
          ) : null}
        </div>

        {/* Chips row: medium + amount + emergency */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <CommunicationChip medium={apt.communicationMedium} />
          {apt.amount > 0 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#E0ECEE] text-[#44666C] text-sm font-semibold">
              {formatAmount(apt.amount)}
            </span>
          )}
          {apt.isEmergency && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-sm font-semibold">
              <Zap className="w-3.5 h-3.5" />
              {t("emergencyBadge")}
            </span>
          )}
        </div>

        {apt.userConcern?.trim() ? (
          <div className="mt-4 rounded-xl border border-gray-100 bg-stone-50/80 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5 flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5" />
              {t("appointmentConcernYouShared")}
            </p>
            <p className="text-sm text-[#304048] leading-relaxed whitespace-pre-wrap">
              {apt.userConcern.trim()}
            </p>
          </div>
        ) : null}

        {showScheduledJoinHint ? (
          <div
            className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/90 px-4 py-3"
            role="status"
          >
            <p className="text-sm font-semibold text-emerald-800">
              {t("sessionHasStartedPleaseJoin")}
            </p>
          </div>
        ) : null}

        {/* Action feedback */}
        {actionError && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{actionError}</p>
          </div>
        )}
        {actionSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-sm text-emerald-700">{actionSuccess}</p>
          </div>
        )}

        {/* Row 1: Join Session + Copy Link (side by side) */}
        {showMeetActions ? (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={joiningSession || !authUser?.id}
                onClick={() => {
                  if (!authUser?.id || !apt.meetLink) return;
                  setJoiningSession(true);
                  void postAppointmentJoinThenOpenMeet(apt.id, apt.meetLink, {
                    participantId: authUser.id,
                    role: "USER",
                  })
                    .catch(() => {
                      window.open(
                        apt.meetLink!,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    })
                    .finally(() => setJoiningSession(false));
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#44666C] text-white rounded-xl font-semibold text-sm hover:bg-[#365a62] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {joiningSession ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Video className="w-4 h-4" />
                )}
                {isVideoSession
                  ? t("dashboardJoinVideoTracked")
                  : t("dashboardJoinSession")}
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(apt.meetLink!);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {t("expertAppointmentLinkCopied")}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t("dashboardCopyMeetingLink")}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}

        {/* Row 2: Session actions - Mark Complete, Expert Didn't Join, Reschedule */}
        {showSessionActions && !actionSuccess ? (
          <div className="mt-4 space-y-3">
            {!canResolve && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                {t("sessionCompleteTimeGateHint")}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowCompleteModal(true)}
                disabled={!canResolve || completing || reportingNoShow}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t("sessionActionMarkComplete")}
              </button>
              <button
                type="button"
                onClick={() => setShowNoShowModal(true)}
                disabled={!canResolve || completing || reportingNoShow}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-orange-300 text-orange-700 rounded-xl font-semibold text-sm hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserX className="w-4 h-4" />
                {t("sessionActionReportNoShow")}
              </button>
              {showReschedule && (
                <button
                  type="button"
                  onClick={() => onOpenReschedule?.(apt)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#44666C]/40 text-[#44666C] rounded-xl font-semibold text-sm hover:bg-[#E0ECEE]/80 transition-colors disabled:opacity-50"
                >
                  <CalendarClock className="w-4 h-4" />
                  {t("appointmentRescheduleButton")}
                </button>
              )}
            </div>
          </div>
        ) : null}

        {/* Reschedule for SCHEDULED appointments (before session starts) */}
        {!showSessionActions && showReschedule && !actionSuccess ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onOpenReschedule?.(apt)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#44666C]/40 text-[#44666C] rounded-xl font-semibold text-sm hover:bg-[#E0ECEE]/80 transition-colors disabled:opacity-50"
            >
              <CalendarClock className="w-4 h-4" />
              {t("appointmentRescheduleButton")}
            </button>
          </div>
        ) : null}

        {/* Review button for completed sessions */}
        {showReviewButton ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => onOpenReview?.(apt)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors shadow-sm"
            >
              <Star className="w-4 h-4" />
              {t("reviewWriteReviewButton")}
            </button>
          </div>
        ) : null}
      </div>

      {/* Confirmation Modal: Mark Complete */}
      {showCompleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !completing && setShowCompleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-[#304048]">
                {t("confirmMarkCompleteTitle")}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {t("confirmMarkCompleteMessage")}
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCompleteModal(false)}
                disabled={completing}
                className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleMarkComplete}
                disabled={completing}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {completing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("sessionActionMarkingComplete")}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    {t("confirm")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Expert Didn't Join */}
      {showNoShowModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !reportingNoShow && setShowNoShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <UserX className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-[#304048]">
                {t("confirmNoShowTitle")}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t("confirmNoShowMessage")}
            </p>
            <div
              className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950"
              role="alert"
            >
              <AlertCircle
                className="w-5 h-5 shrink-0 text-red-600 mt-0.5"
                aria-hidden
              />
              <p className="font-medium leading-relaxed">
                {t("confirmNoShowFalseReportWarning")}
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowNoShowModal(false)}
                disabled={reportingNoShow}
                className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleReportNoShow}
                disabled={reportingNoShow}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-semibold text-sm hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                {reportingNoShow ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("sessionActionReportingNoShow")}
                  </>
                ) : (
                  <>
                    <UserX className="w-4 h-4" />
                    {t("confirm")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Dashboard() {
  const nowMs = usePollingNow(1000);
  const { user, isLoading, refreshUserFromServer } = useAuth();
  const [appointments, setAppointments] = useState<MyAppointment[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"" | AppointmentStatus>("");
  const [rescheduleTarget, setRescheduleTarget] =
    useState<MyAppointment | null>(null);
  const [reviewTarget, setReviewTarget] = useState<MyAppointment | null>(null);
  const { t } = useTranslation("common");
  const dashboardSessionSynced = useRef(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyAppointments(statusFilter || undefined);
      setAppointments(res.appointments);
      setCount(res.count);
    } catch (e) {
      setError(t("dashboardFailedToLoadAppointments"));
      setAppointments([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, t]);

  useEffect(() => {
    if (user?.role === "EXPERT") return;
    if (!user) return;
    if (!dashboardSessionSynced.current) {
      dashboardSessionSynced.current = true;
      void refreshUserFromServer();
    }
    void fetchAppointments();
  }, [user, fetchAppointments, refreshUserFromServer]);

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "EXPERT") {
    return <Navigate to="/dashboard/expert" replace />;
  }

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 text-[#44666C] animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#304048] tracking-tight">
              {t("myAppointments")}
            </h1>
            <p className="text-gray-600 mt-1.5 sm:mt-2">
              {t("myAppointmentsSubtitle")}
            </p>
          </div>
          <Link
            to="/dashboard/urgent-requests"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm shrink-0"
          >
            <Zap className="w-4 h-4" />
            {t("urgentRequestsTab")}
          </Link>
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_VALUES.map((value, i) => (
            <button
              key={value || "all"}
              onClick={() => setStatusFilter(value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                statusFilter === value
                  ? "bg-[#44666C] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {t(STATUS_KEYS[i])}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#44666C] animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800">
            <p className="font-medium">{error}</p>
            <button
              onClick={fetchAppointments}
              className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
            >
              {t("dashboardTryAgain")}
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 sm:py-20 px-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#304048] mb-2">
              {t("dashboardNoAppointmentsYet")}
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {statusFilter
                ? t("dashboardNoAppointmentsFilter")
                : t("dashboardBookSessionHint")}
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {appointments.map((apt) => (
              <li key={apt.id}>
                <AppointmentCard
                  apt={apt}
                  nowMs={nowMs}
                  onOpenReschedule={setRescheduleTarget}
                  onOpenReview={setReviewTarget}
                  onStatusChange={fetchAppointments}
                />
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && count > 0 && (
          <p className="mt-6 text-sm text-gray-500 text-center">
            {t("dashboardAppointmentCount", { count })}
          </p>
        )}

        {rescheduleTarget ? (
          <RescheduleAppointmentModal
            isOpen={!!rescheduleTarget}
            onClose={() => setRescheduleTarget(null)}
            appointmentId={rescheduleTarget.id}
            expertId={rescheduleTarget.expert.id}
            onSuccess={() => void fetchAppointments()}
          />
        ) : null}

        {reviewTarget ? (
          <ReviewModal
            isOpen={!!reviewTarget}
            onClose={() => setReviewTarget(null)}
            appointmentId={reviewTarget.id}
            onSuccess={() => void fetchAppointments()}
          />
        ) : null}
      </div>
    </Layout>
  );
}
