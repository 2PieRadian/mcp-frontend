import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import {
  getMyAppointments,
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
  ExternalLink,
  Copy,
  CheckCircle2,
  CalendarClock,
  Radio,
} from "lucide-react";

const STATUS_OPTIONS: { value: "" | AppointmentStatus; label: string }[] = [
  { value: "", label: "All" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
];

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
  const m = medium?.toUpperCase() || "";
  const labels: Record<string, string> = { VIDEO: "Video", CALL: "Call", CHAT: "Chat" };
  const label = labels[m] || medium;
  const iconClass = "w-4 h-4 shrink-0";
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
      {m === "VIDEO" && <Video className={iconClass} />}
      {m === "CALL" && <Phone className={iconClass} />}
      {(m === "CHAT" || !["VIDEO", "CALL"].includes(m)) && <MessageCircle className={iconClass} />}
      {label}
    </span>
  );
}

const STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; icon: React.ReactNode; badge: string; dot: string }
> = {
  SCHEDULED: {
    label: "Scheduled",
    icon: <CalendarClock className="w-3.5 h-3.5" />,
    badge: "bg-amber-50 text-amber-800 border border-amber-200",
    dot: "bg-amber-500",
  },
  ONGOING: {
    label: "Ongoing",
    icon: <Radio className="w-3.5 h-3.5" />,
    badge: "bg-blue-50 text-blue-800 border border-blue-200",
    dot: "bg-blue-500",
  },
  COMPLETED: {
    label: "Completed",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    badge: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    dot: "bg-emerald-500",
  },
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.COMPLETED;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.icon}
      {config.label}
    </span>
  );
}

function AppointmentCard({ apt }: { apt: MyAppointment }) {
  const expertName = apt.expert?.user?.name || apt.expert?.user?.email || "Expert";
  const initial = getExpertInitial(
    apt.expert?.user?.name ?? null,
    apt.expert?.user?.email ?? ""
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (apt.meetLink) {
      navigator.clipboard.writeText(apt.meetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100"
    >
      <div className="p-5 sm:p-6">
        {/* Top row: Expert + Status */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full bg-[#44666C] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#304048] truncate">{expertName}</h3>
              <p className="text-sm text-gray-500 mt-0.5">Appointment #{apt.id}</p>
            </div>
          </div>
          <StatusBadge status={apt.status} />
        </div>

        {/* Date & time block */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 px-4 rounded-xl bg-gray-50 border border-gray-100">
          <span className="flex items-center gap-2 text-[#304048] font-medium">
            <Calendar className="w-5 h-5 text-[#44666C] shrink-0" />
            {formatDate(apt.startAt)}
          </span>
          <span className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />
            {formatTime(apt.startAt)} – {formatTime(apt.endAt)}
          </span>
        </div>

        {/* Chips row: medium + amount */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <CommunicationChip medium={apt.communicationMedium} />
          {apt.amount > 0 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#E0ECEE] text-[#44666C] text-sm font-semibold">
              {formatAmount(apt.amount)}
            </span>
          )}
        </div>

        {/* Meeting link CTA */}
        {apt.meetLink && apt.status !== "COMPLETED" && (
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <a
              href={apt.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#44666C] text-white rounded-xl font-semibold text-sm hover:bg-[#365a62] transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Join meeting
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy link
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [appointments, setAppointments] = useState<MyAppointment[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"" | AppointmentStatus>("");

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyAppointments(
        statusFilter || undefined
      );
      setAppointments(res.appointments);
      setCount(res.count);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load appointments");
      setAppointments([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (user?.role === "EXPERT") return;
    if (!user) return;
    fetchAppointments();
  }, [user, fetchAppointments]);

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
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#304048] tracking-tight">
            My appointments
          </h1>
          <p className="text-gray-600 mt-1.5 sm:mt-2">
            View and manage your booked sessions. Sorted by most recent first.
          </p>
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value || "all"}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${statusFilter === opt.value
                  ? "bg-[#44666C] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                }`}
            >
              {opt.label}
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
              Try again
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 sm:py-20 px-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#304048] mb-2">No appointments yet</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {statusFilter
                ? "No appointments match this filter. Try another or clear the filter."
                : "Book a session with an expert from Find Counsellors to see your appointments here."}
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {appointments.map((apt) => (
              <li key={apt.id}>
                <AppointmentCard apt={apt} />
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && count > 0 && (
          <p className="mt-6 text-sm text-gray-500 text-center">
            {count} appointment{count !== 1 ? "s" : ""} shown
          </p>
        )}
      </div>
    </Layout>
  );
}
