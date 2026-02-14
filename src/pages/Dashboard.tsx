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
  User,
  Loader2,
  Video,
  Phone,
  MessageCircle,
  ExternalLink,
  Copy,
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

function formatAmount(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

function CommunicationIcon({ medium }: { medium: string }) {
  const m = medium?.toUpperCase() || "";
  if (m === "VIDEO") return <Video className="w-4 h-4" />;
  if (m === "CALL") return <Phone className="w-4 h-4" />;
  return <MessageCircle className="w-4 h-4" />;
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles: Record<AppointmentStatus, string> = {
    SCHEDULED: "bg-amber-100 text-amber-800",
    ONGOING: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#304048] mb-2">
          My appointments
        </h1>
        <p className="text-gray-600 mb-6">
          View and manage your booked sessions. Sorted by most recent first.
        </p>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value || "all"}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === opt.value
                  ? "bg-[#44666C] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
            <Calendar className="w-14 h-14 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No appointments yet</p>
            <p className="text-gray-500 text-sm mt-1">
              {statusFilter
                ? "No appointments match this filter."
                : "Book a session with an expert to see it here."}
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {appointments.map((apt) => (
              <li
                key={apt.id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="flex items-center gap-1.5 text-[#304048] font-semibold">
                        <User className="w-4 h-4 shrink-0 text-[#44666C]" />
                        {apt.expert?.user?.name || apt.expert?.user?.email || "Expert"}
                      </span>
                      <StatusBadge status={apt.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#44666C]" />
                        {formatDate(apt.startAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#44666C]" />
                        {formatTime(apt.startAt)} – {formatTime(apt.endAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <CommunicationIcon medium={apt.communicationMedium} />
                        {apt.communicationMedium}
                      </span>
                      {apt.amount > 0 && (
                        <span className="font-medium text-[#44666C]">
                          {formatAmount(apt.amount)}
                        </span>
                      )}
                    </div>
                    {apt.meetLink && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <a
                          href={apt.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#44666C] hover:underline font-medium text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Join meeting
                        </a>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(apt.meetLink!)}
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
                        >
                          <Copy className="w-4 h-4" /> Copy link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && count > 0 && (
          <p className="mt-4 text-sm text-gray-500">
            {count} appointment{count !== 1 ? "s" : ""} shown
          </p>
        )}
      </div>
    </Layout>
  );
}
