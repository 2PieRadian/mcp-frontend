import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  Loader2,
  Video,
  Phone,
  MessageCircle,
  ExternalLink,
  Copy,
  CheckCircle2,
  CalendarClock,
  Radio,
  User,
  XCircle,
  UserX,
  Ban,
} from "lucide-react";
import {
  isTerminalAppointmentStatus,
  type ExpertAppointment,
  type AppointmentStatus,
} from "../../../lib/api";

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

function durationMinutes(startAt: string, endAt: string): number {
  const a = new Date(startAt).getTime();
  const b = new Date(endAt).getTime();
  return Math.max(0, Math.round((b - a) / (60 * 1000)));
}

function getClientInitial(name: string | null, email: string): string {
  if (name?.trim()) return name.trim().charAt(0).toUpperCase();
  if (email?.trim()) return email.trim().charAt(0).toUpperCase();
  return "?";
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
    case "FAILED":
      label = t("dashboardFilterFailed");
      icon = <XCircle className="w-3.5 h-3.5" />;
      badge = "bg-red-50 text-red-800 border border-red-200";
      dot = "bg-red-500";
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

function ExpertAppointmentCard({ apt }: { apt: ExpertAppointment }) {
  const { t } = useTranslation("common");
  const client = apt.user;
  const displayName =
    client?.name?.trim() ||
    client?.email ||
    t("expertAppointmentClientFallback");
  const initial = client
    ? getClientInitial(client.name, client.email)
    : "?";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (apt.meetLink) {
      void navigator.clipboard.writeText(apt.meetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mins = durationMinutes(apt.startAt, apt.endAt);
  const showMeetActions =
    !!apt.meetLink && !isTerminalAppointmentStatus(apt.status);
  const isVideoSession =
    apt.communicationMedium?.toUpperCase() === "VIDEO";

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {client?.avatarUrl ? (
              <img
                src={client.avatarUrl}
                alt=""
                className="w-12 h-12 rounded-full object-cover shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#44666C] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
                {client ? initial : <User className="w-6 h-6 opacity-90" />}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                {t("expertAppointmentClientLabel")}
              </p>
              <h3 className="text-lg font-bold text-[#304048] truncate">
                {displayName}
              </h3>
              {client?.email && client.name?.trim() ? (
                <p className="text-sm text-gray-500 mt-0.5 truncate">
                  {client.email}
                </p>
              ) : null}
              <p className="text-sm text-gray-500 mt-0.5">
                {t("expertAppointmentNumber", { id: apt.id })}
              </p>
            </div>
          </div>
          <StatusBadge status={apt.status} />
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 px-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="flex items-center gap-2 text-[#304048] font-medium">
            <Calendar className="w-5 h-5 text-[#44666C] shrink-0" />
            {formatDate(apt.startAt)}
          </span>
          <span className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />
            {formatTime(apt.startAt)} – {formatTime(apt.endAt)}
          </span>
          <span className="text-sm text-gray-600">
            {t("dashboardDuration")}: {mins} {t("expertAppointmentMinutesShort")}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <CommunicationChip medium={apt.communicationMedium} />
          {apt.appointmentType ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
              {apt.appointmentType}
            </span>
          ) : null}
          {apt.amount > 0 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#E0ECEE] text-[#44666C] text-sm font-semibold">
              {formatAmount(apt.amount)}
            </span>
          )}
        </div>

        {showMeetActions && (
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
            {isVideoSession ? (
              <Link
                to={`/appointments/${apt.id}/video`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#44666C] text-white rounded-xl font-semibold text-sm hover:bg-[#365a62] transition-colors shadow-sm"
              >
                <Video className="w-4 h-4" />
                {t("dashboardJoinVideoTracked")}
              </Link>
            ) : (
              <a
                href={apt.meetLink!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#44666C] text-white rounded-xl font-semibold text-sm hover:bg-[#365a62] transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {t("dashboardJoinSession")}
              </a>
            )}
            <a
              href={apt.meetLink!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t("dashboardOpenMeetingTab")}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {t("expertAppointmentLinkCopied")}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {t("expertAppointmentCopyLink")}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

type ExpertAppointmentsTabProps = {
  appointments: ExpertAppointment[];
  count: number;
  statusFilter: "" | AppointmentStatus;
  onStatusFilterChange: (v: "" | AppointmentStatus) => void;
  isLoading?: boolean;
  error?: string | null;
  onRefetch?: () => void;
};

export default function ExpertAppointmentsTab({
  appointments,
  count,
  statusFilter,
  onStatusFilterChange,
  isLoading = false,
  error = null,
  onRefetch,
}: ExpertAppointmentsTabProps) {
  const { t } = useTranslation("common");

  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <Calendar className="text-primary w-6 h-6" />
        <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
          {t("tabUpcomingSessions")}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_VALUES.map((value, i) => (
          <button
            key={value || "all"}
            type="button"
            onClick={() => onStatusFilterChange(value)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === value
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-light-text border border-border-light/40 hover:bg-primary/10"
            }`}
          >
            {t(STATUS_KEYS[i])}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-[40px]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-[40px]">
          <p className="text-red-600 mb-3">{error}</p>
          {onRefetch && (
            <button
              type="button"
              onClick={onRefetch}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90"
            >
              {t("dashboardTryAgain")}
            </button>
          )}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-[40px] px-4 rounded-2xl bg-white/60 border border-border-light/20">
          <p className="text-light-text">{t("expertAppointmentsEmpty")}</p>
          {statusFilter ? (
            <p className="text-sm text-gray-500 mt-2">
              {t("dashboardNoAppointmentsFilter")}
            </p>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-5">
          {appointments.map((apt) => (
            <li key={apt.id}>
              <ExpertAppointmentCard apt={apt} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !error && count > 0 && (
        <p className="mt-6 text-sm text-gray-500 text-center">
          {t("dashboardAppointmentCount", { count })}
        </p>
      )}
    </section>
  );
}
