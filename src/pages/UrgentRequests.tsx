import { useState, useEffect, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { usePollingNow } from "../hooks/usePollingNow";
import {
  getMyUrgentRequests,
  getUrgentRequest,
  initiateUrgentPayment,
  verifyUrgentPayment,
  ApiHttpError,
  type UrgentRequest,
  type UrgentRequestStatus,
} from "../lib/api";
import { openRazorpayCheckout } from "../lib/razorpay";
import {
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Calendar,
  CreditCard,
  Zap,
  ChevronRight,
  ExternalLink,
  Copy,
  RefreshCw,
} from "lucide-react";

type UrgentStatusFilter = "" | UrgentRequestStatus | "EXPIRED_GROUP";

const STATUS_FILTERS: UrgentStatusFilter[] = [
  "",
  "PENDING",
  "APPROVED",
  "PAYMENT_COMPLETED",
  "REJECTED",
  "EXPIRED_GROUP",
];

const STATUS_FILTER_KEYS = [
  "dashboardFilterAll",
  "urgentRequestStatusPending",
  "urgentRequestStatusApproved",
  "urgentRequestStatusPaymentCompleted",
  "urgentRequestStatusRejected",
  "urgentRequestStatusExpired",
] as const;

function formatCountdown(seconds: number): string {
  if (seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function StatusBadge({ status }: { status: UrgentRequestStatus }) {
  const { t } = useTranslation("common");

  const config: Record<
    UrgentRequestStatus,
    { bg: string; text: string; icon: typeof CheckCircle2; label: string }
  > = {
    PENDING: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      icon: Clock,
      label: t("urgentRequestStatusPending"),
    },
    APPROVED: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: CheckCircle2,
      label: t("urgentRequestStatusApproved"),
    },
    PAYMENT_COMPLETED: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      icon: CheckCircle2,
      label: t("urgentRequestStatusPaymentCompleted"),
    },
    REJECTED: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: XCircle,
      label: t("urgentRequestStatusRejected"),
    },
    EXPIRED: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      icon: Clock,
      label: t("urgentRequestStatusExpired"),
    },
    PAYMENT_EXPIRED: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      icon: AlertCircle,
      label: t("urgentRequestStatusPaymentExpired"),
    },
  };

  const c = config[status];
  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {c.label}
    </span>
  );
}

function UrgentRequestCard({
  request,
  nowMs,
  onPayNow,
  onRefresh,
}: {
  request: UrgentRequest;
  nowMs: number;
  onPayNow: (req: UrgentRequest) => void;
  onRefresh: () => void;
}) {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const paymentExpiresMs = request.paymentExpiresAt
    ? new Date(request.paymentExpiresAt).getTime()
    : 0;
  const paymentSecondsLeft =
    paymentExpiresMs > 0
      ? Math.max(0, Math.floor((paymentExpiresMs - nowMs) / 1000))
      : 0;

  const expertName =
    request.assignedExpert?.user.name ||
    request.expert?.user.name ||
    t("urgentRequestAnyExpert");

  const handleCopyPhone = () => {
    if (request.companyPhone) {
      void navigator.clipboard.writeText(request.companyPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#304048]">
                {t("urgentRequestTitle")}
              </h3>
              <p className="text-sm text-gray-500">#{request.id}</p>
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {/* Expert info */}
        <div className="py-3 px-4 rounded-xl bg-gray-50 border border-gray-100 mb-4">
          <p className="text-xs text-gray-500 mb-1">
            {request.assignedExpert
              ? t("urgentRequestAssignedExpert")
              : t("urgentRequestRequestedExpert")}
          </p>
          <p className="font-semibold text-[#304048]">{expertName}</p>
        </div>

        {/* Reason if provided */}
        {request.reason && (
          <div className="mb-4 p-3 bg-stone-50 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Your reason</p>
            <p className="text-sm text-gray-700">{request.reason}</p>
          </div>
        )}

        {/* Company phone if available and not expired */}
        {request.companyPhone &&
          !request.contactExpired &&
          request.status === "PENDING" && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-xs text-green-700 mb-2">
                {t("urgentRequestCompanyPhone")}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xl font-bold text-green-900 tracking-wide">
                  {request.companyPhone}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${request.companyPhone}`}
                    className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {request.contactRemainingSeconds != null &&
                request.contactRemainingSeconds > 0 && (
                  <p className="text-xs text-green-600 mt-2">
                    {t("urgentRequestContactExpires")}:{" "}
                    {formatCountdown(request.contactRemainingSeconds)}
                  </p>
                )}
            </div>
          )}

        {/* Payment info for approved requests */}
        {request.status === "APPROVED" && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {t("urgentRequestBaseAmount")}
                </span>
                <span>₹{request.baseAmount ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {t("urgentRequestEmergencySurcharge")}
                </span>
                <span>₹{request.emergencySurcharge ?? 300}</span>
              </div>
              <div className="flex justify-between font-bold text-amber-900 pt-2 border-t border-amber-200">
                <span>{t("urgentRequestTotalToPay")}</span>
                <span>₹{request.totalAmount ?? 0}</span>
              </div>
            </div>

            {paymentSecondsLeft > 0 && (
              <div className="flex items-center gap-2 mt-3 text-amber-700 text-sm">
                <Clock className="w-4 h-4" />
                <span>
                  {t("urgentRequestPaymentExpires")}:{" "}
                  <strong>{formatCountdown(paymentSecondsLeft)}</strong>
                </span>
              </div>
            )}

            <button
              onClick={() => onPayNow(request)}
              disabled={paymentSecondsLeft <= 0}
              className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              {t("urgentRequestPayNow")} - ₹{request.totalAmount ?? 0}
            </button>
          </div>
        )}

        {/* Appointment info for completed requests */}
        {request.status === "PAYMENT_COMPLETED" && request.appointment && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Session scheduled</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(request.appointment.startAt)}
                </p>
              </div>
            </div>
            {request.appointment.meetLink && (
              <a
                href={request.appointment.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Join Session
              </a>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
          <span>{formatDate(request.createdAt)}</span>
          <button
            onClick={onRefresh}
            className="flex items-center gap-1 text-[#44666C] hover:text-[#365a62] font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    </article>
  );
}

export default function UrgentRequests() {
  const nowMs = usePollingNow(1000);
  const { user, isLoading } = useAuth();
  const { t } = useTranslation("common");

  const [requests, setRequests] = useState<UrgentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<UrgentStatusFilter>("");
  const [payingRequestId, setPayingRequestId] = useState<number | null>(null);
  // payingRequestId is tracked for potential future UI use (e.g. disabling buttons)
  void payingRequestId;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (statusFilter === "EXPIRED_GROUP") {
        const [expiredRes, paymentExpiredRes] = await Promise.all([
          getMyUrgentRequests("EXPIRED", 1, 50),
          getMyUrgentRequests("PAYMENT_EXPIRED", 1, 50),
        ]);

        const merged = [...expiredRes.requests, ...paymentExpiredRes.requests];
        const deduped = Array.from(
          new Map(merged.map((req) => [req.id, req])).values(),
        ).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setRequests(deduped);
      } else {
        const res = await getMyUrgentRequests(statusFilter || undefined, 1, 50);
        setRequests(res.requests);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (user && user.role !== "EXPERT") {
      void fetchRequests();
    }
  }, [user, fetchRequests]);

  const handlePayNow = async (request: UrgentRequest) => {
    setPayingRequestId(request.id);
    setError(null);

    try {
      const response = await initiateUrgentPayment(request.id);

      const razorpayKey =
        response.keyId ||
        (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined);

      if (!razorpayKey) {
        setError(t("bookingRazorpayKeyMissing"));
        setPayingRequestId(null);
        return;
      }

      openRazorpayCheckout({
        key: razorpayKey,
        amount: response.amount,
        currency: response.currency,
        order_id: response.orderId,
        name: "MindCurePath",
        description: t("emergencyPaymentTitle"),
        modal: {
          ondismiss: () => {
            setPayingRequestId(null);
          },
        },
        handler: async (res) => {
          try {
            await verifyUrgentPayment(
              request.id,
              res.razorpay_order_id,
              res.razorpay_payment_id,
              res.razorpay_signature,
            );
            void fetchRequests();
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "Payment verification failed",
            );
          } finally {
            setPayingRequestId(null);
          }
        },
      });
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Payment failed");
      }
      setPayingRequestId(null);
    }
  };

  const handleRefreshRequest = async (id: number) => {
    try {
      const updated = await getUrgentRequest(id);
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      // Ignore
    }
  };

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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#304048] tracking-tight">
              {t("urgentRequestsTab")}
            </h1>
          </div>
          <p className="text-gray-600 mt-1.5 sm:mt-2">
            {t("urgentRequestsEmptyDescription")}
          </p>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 mt-3 text-sm text-[#44666C] hover:text-[#365a62] font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to appointments
          </Link>
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_FILTERS.map((value, i) => (
            <button
              key={value || "all"}
              onClick={() => setStatusFilter(value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                statusFilter === value
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {t(STATUS_FILTER_KEYS[i])}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{error}</p>
              <button
                onClick={fetchRequests}
                className="mt-2 text-sm text-red-700 underline hover:no-underline"
              >
                {t("dashboardTryAgain")}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {t("urgentRequestsEmpty")}
            </h3>
            <p className="text-gray-500 text-sm">
              {t("urgentRequestsEmptyDescription")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <UrgentRequestCard
                key={request.id}
                request={request}
                nowMs={nowMs}
                onPayNow={handlePayNow}
                onRefresh={() => handleRefreshRequest(request.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
