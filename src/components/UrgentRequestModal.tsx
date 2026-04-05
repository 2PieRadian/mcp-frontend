import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Loader2,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Calendar,
  CreditCard,
  ExternalLink,
  Copy,
} from "lucide-react";
import gsap from "gsap";
import {
  initiateUrgentRequest,
  verifyUrgentRequestFee,
  initiateUrgentPayment,
  verifyUrgentPayment,
  getUrgentRequest,
  postAppointmentJoinThenOpenMeet,
  isTerminalAppointmentStatus,
  ApiHttpError,
  type UrgentRequest,
  type VerifyUrgentPaymentResponse,
} from "../lib/api";
import { openRazorpayCheckout } from "../lib/razorpay";
import { useAuth } from "../context/AuthContext";

type UrgentRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  expertId: number;
  expertName: string;
  /** Called when urgent request flow completes with an appointment. */
  onAppointmentCreated?: (appointmentId: number) => void;
};

type ModalStep =
  | "initiate"
  | "paying_request_fee"
  | "call_company"
  | "awaiting_approval"
  | "approved"
  | "paying_session"
  | "success"
  | "rejected"
  | "expired";

function formatCountdown(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function UrgentRequestModal({
  isOpen,
  onClose,
  expertId,
  expertName,
  onAppointmentCreated,
}: UrgentRequestModalProps) {
  const { t } = useTranslation("common");
  const { user: authUser } = useAuth();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isVisible = isOpen || isClosing;

  const [step, setStep] = useState<ModalStep>("initiate");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [urgentRequest, setUrgentRequest] = useState<UrgentRequest | null>(
    null,
  );
  const [companyPhone, setCompanyPhone] = useState<string | null>(null);
  const [contactCountdown, setContactCountdown] = useState(0);
  const [paymentCountdown, setPaymentCountdown] = useState(0);
  const [appointmentResult, setAppointmentResult] =
    useState<VerifyUrgentPaymentResponse | null>(null);
  const [joiningSession, setJoiningSession] = useState(false);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("initiate");
      setReason("");
      setError(null);
      setUrgentRequest(null);
      setCompanyPhone(null);
      setContactCountdown(0);
      setPaymentCountdown(0);
      setAppointmentResult(null);
    }
  }, [isOpen]);

  // GSAP animations
  useEffect(() => {
    if (!isOpen || !backdropRef.current || !panelRef.current) return;
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
    );
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!backdropRef.current || !panelRef.current) {
      onClose();
      return;
    }
    setIsClosing(true);
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setIsClosing(false);
        onClose();
      },
    });
  }, [onClose]);

  // Contact countdown timer
  useEffect(() => {
    if (contactCountdown <= 0) return;
    const timer = setInterval(() => {
      setContactCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [contactCountdown]);

  // Payment countdown timer
  useEffect(() => {
    if (paymentCountdown <= 0) return;
    const timer = setInterval(() => {
      setPaymentCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStep("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentCountdown]);

  // Poll for status updates while awaiting approval
  const pollStatus = useCallback(async () => {
    if (!urgentRequest) return;
    try {
      const updated = await getUrgentRequest(urgentRequest.id);
      setUrgentRequest(updated);

      if (updated.status === "APPROVED") {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        setStep("approved");
        if (updated.paymentExpiresAt) {
          const expiresMs = new Date(updated.paymentExpiresAt).getTime();
          const nowMs = Date.now();
          const remainingSecs = Math.max(
            0,
            Math.floor((expiresMs - nowMs) / 1000),
          );
          setPaymentCountdown(remainingSecs);
        }
      } else if (updated.status === "REJECTED") {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        setStep("rejected");
      } else if (
        updated.status === "EXPIRED" ||
        updated.status === "PAYMENT_EXPIRED"
      ) {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        setStep("expired");
      }

      if (updated.contactRemainingSeconds != null) {
        setContactCountdown(updated.contactRemainingSeconds);
      }
      if (updated.companyPhone) {
        setCompanyPhone(updated.companyPhone);
      }
    } catch {
      // Ignore polling errors
    }
  }, [urgentRequest]);

  useEffect(() => {
    if (step === "awaiting_approval" && urgentRequest) {
      pollIntervalRef.current = setInterval(pollStatus, 5000);
      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      };
    }
  }, [step, urgentRequest, pollStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const handleInitiateRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await initiateUrgentRequest(expertId, reason);

      const legacyPaidFee =
        response.requestFeeRequired === true ||
        (response.requestFeeRequired !== false &&
          Boolean(response.orderId) &&
          response.amount != null &&
          Boolean(response.currency));

      if (!legacyPaidFee) {
        const phone = response.companyPhone;
        if (!phone?.trim()) {
          setError(t("urgentRequestMissingCompanyPhone"));
          setLoading(false);
          return;
        }
        const seconds = response.contactValiditySeconds ?? 0;
        setCompanyPhone(phone);
        setContactCountdown(seconds);
        setUrgentRequest({
          id: response.requestId,
          status: "PENDING",
          statusMessage: response.userStatus ?? response.message ?? "",
          contactExpired: false,
          contactRemainingSeconds: seconds,
          companyPhone: phone,
          createdAt: new Date().toISOString(),
          expiresAt: response.expiresAt,
        });
        setStep("call_company");
        setLoading(false);
        return;
      }

      setStep("paying_request_fee");

      const razorpayKey =
        response.keyId ||
        (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined);

      if (!razorpayKey) {
        setError(t("bookingRazorpayKeyMissing"));
        setStep("initiate");
        setLoading(false);
        return;
      }

      openRazorpayCheckout({
        key: razorpayKey,
        amount: response.amount!,
        currency: response.currency!,
        order_id: response.orderId!,
        name: "MindCurePath",
        description: t("urgentRequestTitle"),
        modal: {
          ondismiss: () => {
            setStep("initiate");
            setLoading(false);
          },
        },
        handler: async (res) => {
          try {
            const verified = await verifyUrgentRequestFee(
              res.razorpay_order_id,
              res.razorpay_payment_id,
              res.razorpay_signature,
              { expertId, reason },
            );

            setCompanyPhone(verified.companyPhone);
            setContactCountdown(verified.contactValiditySeconds);
            setUrgentRequest({
              id: verified.requestId,
              status: "PENDING",
              statusMessage: verified.userStatus,
              contactExpired: false,
              contactRemainingSeconds: verified.contactValiditySeconds,
              companyPhone: verified.companyPhone,
              createdAt: new Date().toISOString(),
            });
            setStep("call_company");
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "Payment verification failed",
            );
            setStep("initiate");
          } finally {
            setLoading(false);
          }
        },
      });
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Request failed");
      }
      setLoading(false);
    }
  };

  const handleProceedToAwait = () => {
    setStep("awaiting_approval");
  };

  const handlePaySession = async () => {
    if (!urgentRequest) return;

    setLoading(true);
    setError(null);

    try {
      const response = await initiateUrgentPayment(urgentRequest.id);
      setStep("paying_session");

      const razorpayKey =
        response.keyId ||
        (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined);

      if (!razorpayKey) {
        setError(t("bookingRazorpayKeyMissing"));
        setStep("approved");
        setLoading(false);
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
            setStep("approved");
            setLoading(false);
          },
        },
        handler: async (res) => {
          try {
            const verified = await verifyUrgentPayment(
              urgentRequest.id,
              res.razorpay_order_id,
              res.razorpay_payment_id,
              res.razorpay_signature,
            );

            setAppointmentResult(verified);
            setStep("success");
            onAppointmentCreated?.(verified.appointment.id);
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "Payment verification failed",
            );
            setStep("approved");
          } finally {
            setLoading(false);
          }
        },
      });
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Payment failed");
      }
      setLoading(false);
    }
  };

  const handleCopyPhone = () => {
    if (companyPhone) {
      void navigator.clipboard.writeText(companyPhone);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{t("urgentRequestTitle")}</h2>
                <p className="text-sm text-white/90">{expertName}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Step: Initiate */}
          {step === "initiate" && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                {t("urgentRequestSubtitle")}
              </p>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-medium text-emerald-900">
                  {t("urgentRequestNoFeeNote")}
                </p>
                <p className="text-xs text-emerald-800/90 mt-1">
                  {t("urgentRequestNoFeeDetail")}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("urgentRequestReasonLabel")}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  maxLength={1000}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none text-sm"
                  placeholder={t("urgentRequestReasonPlaceholder")}
                />
              </div>

              <button
                onClick={handleInitiateRequest}
                disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                {loading
                  ? t("urgentRequestInitiating")
                  : t("urgentRequestSubmitFree")}
              </button>
            </div>
          )}

          {/* Step: Paying request fee */}
          {step === "paying_request_fee" && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Processing payment...</p>
            </div>
          )}

          {/* Step: Call company */}
          {step === "call_company" && companyPhone && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  {t("urgentRequestCallNow")}
                </h3>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs text-green-700 mb-2">
                  {t("urgentRequestCompanyPhone")}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-900 tracking-wide">
                    {companyPhone}
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {contactCountdown > 0 ? (
                <div className="flex items-center justify-center gap-2 text-amber-700 bg-amber-50 rounded-xl p-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {t("urgentRequestContactExpires")}:{" "}
                    <strong>{formatCountdown(contactCountdown)}</strong>
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-red-700 bg-red-50 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">
                    {t("urgentRequestContactExpired")}
                  </span>
                </div>
              )}

              <a
                href={`tel:${companyPhone}`}
                className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-center transition-colors"
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Call Now
              </a>

              <button
                onClick={handleProceedToAwait}
                className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                I've made the call
              </button>
            </div>
          )}

          {/* Step: Awaiting approval */}
          {step === "awaiting_approval" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {t("urgentRequestAwaitingApproval")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  We'll notify you once your request is reviewed.
                </p>
              </div>

              {companyPhone && contactCountdown > 0 && (
                <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                  <p className="font-medium mb-1">
                    {t("urgentRequestCompanyPhone")}
                  </p>
                  <p className="font-mono text-lg">{companyPhone}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t("urgentRequestContactExpires")}:{" "}
                    {formatCountdown(contactCountdown)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step: Approved - pay session */}
          {step === "approved" && urgentRequest && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  {t("urgentRequestApproved")}
                </h3>
              </div>

              {urgentRequest.assignedExpert && (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">
                    {t("urgentRequestAssignedExpert")}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {urgentRequest.assignedExpert.user.name}
                  </p>
                </div>
              )}

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t("urgentRequestBaseAmount")}
                  </span>
                  <span>₹{urgentRequest.baseAmount ?? 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t("urgentRequestEmergencySurcharge")}
                  </span>
                  <span>₹{urgentRequest.emergencySurcharge ?? 300}</span>
                </div>
                <div className="flex justify-between font-bold text-amber-900 pt-2 border-t border-amber-200">
                  <span>{t("urgentRequestTotalToPay")}</span>
                  <span>₹{urgentRequest.totalAmount ?? 0}</span>
                </div>
              </div>

              {paymentCountdown > 0 && (
                <div className="flex items-center justify-center gap-2 text-amber-700 bg-amber-50 rounded-xl p-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {t("urgentRequestPaymentExpires")}:{" "}
                    <strong>{formatCountdown(paymentCountdown)}</strong>
                  </span>
                </div>
              )}

              <button
                onClick={handlePaySession}
                disabled={loading || paymentCountdown <= 0}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
                {t("urgentRequestPayNow")}{" "}
                <span className="tabular-nums">
                  ₹{urgentRequest.totalAmount ?? 0}
                </span>
              </button>
            </div>
          )}

          {/* Step: Paying session */}
          {step === "paying_session" && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Processing payment...</p>
            </div>
          )}

          {/* Step: Success */}
          {step === "success" && appointmentResult && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  {t("urgentRequestPaymentVerified")}
                </h3>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {appointmentResult.appointmentDate}
                    </p>
                    <p className="text-sm text-gray-700">
                      {appointmentResult.appointmentTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <p className="text-sm font-medium text-amber-700">
                    {t("urgentRequestSessionStarts", {
                      minutes: appointmentResult.sessionStartsIn,
                    })}
                  </p>
                </div>

                {appointmentResult.appointment.meetLink &&
                  !isTerminalAppointmentStatus(
                    appointmentResult.appointment.status,
                  ) && (
                    <button
                      type="button"
                      disabled={joiningSession || !authUser?.id}
                      onClick={() => {
                        const apt = appointmentResult.appointment;
                        const link = apt.meetLink!;
                        if (!authUser?.id) return;
                        setJoiningSession(true);
                        void postAppointmentJoinThenOpenMeet(apt.id, link, {
                          participantId: authUser.id,
                          role: "USER",
                        })
                          .catch(() => {
                            window.open(link, "_blank", "noopener,noreferrer");
                          })
                          .finally(() => setJoiningSession(false));
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {joiningSession ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      {t("urgentRequestJoinMeeting")}
                    </button>
                  )}
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {/* Step: Rejected */}
          {step === "rejected" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {t("urgentRequestRejected")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your request fee will be refunded.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {/* Step: Expired */}
          {step === "expired" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {t("urgentRequestExpired")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  The payment window has expired.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
