import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Calendar,
  Clock,
  Loader2,
  Check,
  Phone,
  Video,
  MessageCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";
import {
  initiateAppointment,
  verifyPayment,
  type CommunicationMedium,
} from "../lib/api";
import { openRazorpayCheckout } from "../lib/razorpay";
import type { TimeSlot } from "../context/BookingContext";

type ConnectionType = "call" | "video" | "chat";

function toCommunicationMedium(c: ConnectionType): CommunicationMedium {
  return c === "call" ? "CALL" : c === "video" ? "VIDEO" : "CHAT";
}

/** Build ISO start/end from day (year, month 1-12, date) and slot (startTime/endTime "HH:mm"). */
function slotToISO(
  day: { year: number; month: number; date: number },
  slot: TimeSlot,
): { startAt: string; endAt: string } {
  const [sh, sm] = slot.startTime.split(":").map(Number);
  const [eh, em] = slot.endTime.split(":").map(Number);
  const start = new Date(day.year, day.month - 1, day.date, sh, sm, 0, 0);
  const end = new Date(day.year, day.month - 1, day.date, eh, em, 0, 0);
  return { startAt: start.toISOString(), endAt: end.toISOString() };
}

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  expertId: number;
  expertName: string;
  expertPrice: number;
  /** When true, show "Book Free Appointment"; when false, show "Book Appointment". */
  isFreeSessionAvailable?: boolean;
};

export default function BookingModal({
  isOpen,
  onClose,
  expertId,
  expertName,
  expertPrice,
  isFreeSessionAvailable = true,
}: BookingModalProps) {
  const {
    daysWithSlots,
    isLoading,
    error,
    fetchNext10Days,
    currentExpertId,
    setCurrentExpertId,
  } = useBooking();
  const { refreshUserFromServer } = useAuth();

  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [helpWith, setHelpWith] = useState("");
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(
    null,
  );
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isVisible = isOpen || isClosing;

  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    appointmentId: number;
    meetLink: string | null;
    medium: CommunicationMedium;
  } | null>(null);

  // Clear booking state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccessResult(null);
      setBookingError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    void refreshUserFromServer();
  }, [isOpen, refreshUserFromServer]);

  // GSAP open animation when isOpen becomes true
  useEffect(() => {
    if (!isOpen || !backdropRef.current || !panelRef.current) return;
    setIsClosing(false);
    document.body.style.overflow = "hidden";
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 0, y: 24, scale: 0.98 });
    gsap.to(backdropRef.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(panelRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isClosing || !backdropRef.current || !panelRef.current) return;
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 24,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setIsClosing(false);
        document.body.style.overflow = "unset";
      },
    });
  }, [isClosing]);

  // Fetch all days with slots when modal opens
  useEffect(() => {
    if (isOpen && expertId !== currentExpertId) {
      setCurrentExpertId(expertId);
      fetchNext10Days(expertId);
    }
  }, [isOpen, expertId, currentExpertId, fetchNext10Days, setCurrentExpertId]);

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  // Close modal on outside click (click on backdrop)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) handleClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const getDayName = (dayData: {
    year: number;
    month: number;
    date: number;
  }): string => {
    const date = new Date(dayData.year, dayData.month - 1, dayData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    if (dateOnly.getTime() === today.getTime()) return "Today";
    if (dateOnly.getTime() === tomorrow.getTime()) return "Tomorrow";
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[date.getDay()];
  };

  const getMonthName = (month: number, short: boolean = true): string => {
    const months = short
      ? [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]
      : [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
    return months[month - 1];
  };

  const formatTime = (
    timeString: string,
    dayData?: { year: number; month: number; date: number },
  ): string => {
    const [hours, minutes] = timeString.split(":").map(Number);
    if (dayData) {
      const dateTime = new Date(
        dayData.year,
        dayData.month - 1,
        dayData.date,
        hours,
        minutes,
      );
      return dateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateForDisplay = (dayData: {
    year: number;
    month: number;
    date: number;
  }): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[dayData.month - 1]} ${dayData.date}, ${dayData.year}`;
  };

  const selectedDayData =
    selectedDateIndex !== null ? daysWithSlots[selectedDateIndex] : null;

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedSlot(null);
  };

  const handleBook = async () => {
    if (
      selectedDateIndex === null ||
      selectedSlot === null ||
      !selectedDayData ||
      !connectionType
    )
      return;
    const slot = selectedDayData.slots.find(
      (s) => s.availabilityId === selectedSlot,
    );
    if (!slot) return;

    setBookingError(null);
    setBookingInProgress(true);

    try {
      const { startAt, endAt } = slotToISO(selectedDayData, slot);
      const medium = toCommunicationMedium(connectionType);
      const response = await initiateAppointment(
        expertId,
        startAt,
        endAt,
        medium,
      );

      if (response.type === "FREE") {
        setSuccessResult({
          appointmentId: response.appointmentId,
          meetLink: response.meetLink ?? null,
          medium,
        });
        setBookingInProgress(false);
      } else {
        openRazorpayCheckout({
          key: response.keyId,
          amount: response.amount,
          currency: response.currency,
          order_id: response.orderId,
          name: "MindCurePath",
          modal: {
            ondismiss: () => setBookingInProgress(false),
          },
          handler: async (res) => {
            try {
              const verified = await verifyPayment(
                res.razorpay_order_id,
                res.razorpay_payment_id,
                res.razorpay_signature,
              );
              setSuccessResult({
                appointmentId: verified.appointmentId,
                meetLink: verified.meetLink ?? null,
                medium,
              });
            } catch (err: unknown) {
              setBookingError(
                err instanceof Error
                  ? err.message
                  : "Payment verification failed",
              );
            } finally {
              setBookingInProgress(false);
            }
          },
        });
      }
    } catch (err: unknown) {
      setBookingError(
        err instanceof Error ? err.message : "Failed to initiate booking",
      );
      setBookingInProgress(false);
    }
  };

  const canBook =
    selectedDateIndex !== null &&
    selectedSlot !== null &&
    connectionType !== null;

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Full-screen modal panel */}
      <div
        ref={panelRef}
        className="absolute inset-0 sm:inset-2 md:inset-4 lg:inset-6 bg-white rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Single scroll container: header + content + footer */}
        <div className="overflow-y-auto flex-1 min-h-0 flex flex-col">
          {/* Header - no green */}
          <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center shrink-0 bg-white">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 bg-gray-100 rounded-xl shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#44666C]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-[#304048] truncate">
                  Schedule Your Session with {expertName}
                </h2>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X size={22} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {successResult ? (
              <div className="max-w-4xl mx-auto">
                <div className="text-center py-8 sm:py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <Check className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#304048] mb-2">
                    Booking confirmed
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your session with {expertName} is scheduled. Appointment #
                    {successResult.appointmentId}.
                  </p>
                  {successResult.meetLink ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 text-left max-w-lg mx-auto space-y-3">
                      <p className="text-sm font-medium text-gray-700">
                        Meeting link
                      </p>
                      {successResult.medium === "VIDEO" ? (
                        <Link
                          to={`/appointments/${successResult.appointmentId}/video`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#44666C] text-white hover:bg-[#365a62] font-semibold text-sm w-full sm:w-auto justify-center"
                        >
                          <Video className="w-4 h-4" />
                          Join video (tracked)
                        </Link>
                      ) : null}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href={successResult.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 truncate text-[#44666C] hover:underline font-medium"
                        >
                          {successResult.meetLink}
                        </a>
                        <div className="flex gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                successResult!.meetLink!,
                              );
                            }}
                            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" /> Copy
                          </button>
                          <a
                            href={successResult.meetLink!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg bg-[#44666C] text-white hover:bg-[#365a62] flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" /> Open
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Your expert will share the meeting link before the
                      session.
                    </p>
                  )}
                  <button
                    onClick={handleClose}
                    className="mt-8 px-6 py-2.5 bg-[#44666C] text-white rounded-xl hover:bg-[#365a62] font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8">
                {bookingError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                    {bookingError}
                  </div>
                )}
                {/* What would you like help with? */}
                <section>
                  <h3 className="text-[#304048] font-semibold text-lg mb-1">
                    What would you like help with?
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Share a few details so we can better understand your
                    situation.
                  </p>
                  <textarea
                    value={helpWith}
                    onChange={(e) => setHelpWith(e.target.value)}
                    placeholder="Describe your concern or what you'd like to work on..."
                    className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44666C] focus:ring-2 focus:ring-[#44666C]/20 outline-none resize-y text-[#304048] placeholder-gray-400"
                    rows={4}
                  />
                </section>

                {/* Select Date */}
                <section>
                  <h3 className="font-semibold text-[#304048] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#44666C]" />
                    Select Date
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <Loader2 className="w-8 h-8 text-[#44666C] animate-spin" />
                      <span className="ml-3 text-gray-600">
                        Loading dates...
                      </span>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-red-600 mb-4 text-base">{error}</p>
                      <button
                        onClick={() => fetchNext10Days(expertId)}
                        className="px-6 py-2.5 bg-[#44666C] text-white rounded-xl hover:bg-[#365a62] transition-colors cursor-pointer font-medium"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : daysWithSlots.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        No available dates
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        This expert hasn't configured their availability yet.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto pb-2 -mx-1 px-1">
                      <div className="flex gap-3 min-w-max">
                        {daysWithSlots.map((dayData, index) => {
                          const isSelected = selectedDateIndex === index;
                          return (
                            <button
                              key={`${dayData.year}-${dayData.month}-${dayData.date}`}
                              onClick={() => handleDateSelect(index)}
                              className={`relative shrink-0 w-[140px] sm:w-[160px] text-center p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-[#44666C] bg-[#E0ECEE] shadow-lg ring-2 ring-[#44666C]/20"
                                  : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-[#44666C] rounded-full p-1">
                                  <Check
                                    className="w-3 h-3 text-white"
                                    strokeWidth={3}
                                  />
                                </div>
                              )}
                              <p
                                className={`uppercase tracking-wider mb-2 font-semibold text-sm ${isSelected ? "text-[#44666C]" : "text-gray-500"}`}
                              >
                                {getDayName(dayData)}
                              </p>
                              <p
                                className={`text-xl font-bold mb-2 ${isSelected ? "text-[#44666C]" : "text-[#304048]"}`}
                              >
                                {dayData.date}
                              </p>
                              <div className="border-t border-gray-200 pt-2 space-y-0.5">
                                <p
                                  className={`text-sm font-medium ${isSelected ? "text-[#44666C]" : "text-gray-600"}`}
                                >
                                  {getMonthName(dayData.month, true)}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  {dayData.year}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>

                {/* Select Time */}
                <section>
                  <h3 className="font-semibold text-[#304048] mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#44666C]" />
                    Select Time
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <Loader2 className="w-8 h-8 text-[#44666C] animate-spin" />
                      <span className="ml-3 text-gray-600">
                        Loading times...
                      </span>
                    </div>
                  ) : selectedDateIndex === null ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        Select a date to see available times
                      </p>
                    </div>
                  ) : !selectedDayData || selectedDayData.slots.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-gray-600">
                        No available slots for this date
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto pb-2 -mx-1 px-1">
                      <div className="flex gap-3 min-w-max">
                        {selectedDayData.slots.map((slot) => {
                          const isSelected =
                            selectedSlot === slot.availabilityId;
                          return (
                            <button
                              key={slot.availabilityId}
                              onClick={() =>
                                setSelectedSlot(slot.availabilityId)
                              }
                              className={`relative shrink-0 min-w-[160px] sm:min-w-[180px] text-left p-4 pr-10 rounded-xl border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-[#44666C] bg-[#E0ECEE] shadow-md"
                                  : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-[#44666C] rounded-full p-1 pointer-events-none">
                                  <Check
                                    className="w-3 h-3 text-white"
                                    strokeWidth={3}
                                  />
                                </div>
                              )}
                              <p className="font-semibold text-[#304048] text-base leading-tight">
                                {formatTime(slot.startTime, selectedDayData)}
                                <span className="font-normal text-gray-500 mx-1.5">
                                  to
                                </span>
                                {formatTime(slot.endTime, selectedDayData)}
                              </p>
                              <p className="text-gray-500 text-sm mt-2">
                                1 hr session
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>

                {/* How would you like to connect? */}
                <section className="pb-8 sm:pb-10">
                  <h3 className="font-semibold text-[#304048] mb-4">
                    How would you like to connect?
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        {
                          id: "call" as ConnectionType,
                          label: "Call",
                          icon: Phone,
                        },
                        {
                          id: "video" as ConnectionType,
                          label: "Video",
                          icon: Video,
                        },
                        {
                          id: "chat" as ConnectionType,
                          label: "Chat",
                          icon: MessageCircle,
                        },
                      ] as const
                    ).map(({ id, label, icon: Icon }) => {
                      const isSelected = connectionType === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setConnectionType(id)}
                          className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#44666C] bg-[#E0ECEE] shadow-md"
                              : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`p-2.5 rounded-xl ${isSelected ? "bg-[#44666C] text-white" : "bg-gray-100 text-gray-600"}`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span
                            className={`font-medium text-sm sm:text-base ${isSelected ? "text-[#44666C]" : "text-gray-700"}`}
                          >
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Policy Notice */}
                  <div className="mt-[30px] p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-[13px] text-amber-800">
                      <span className="font-semibold">Payment Policy:</span> All
                      payments are non-refundable. By booking, you agree to our
                      cancellation and refund policy. Please ensure your
                      availability before confirming.
                    </p>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer - pricing and booking (hidden when success) */}
          {!successResult && (
            <div className="border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 bg-gray-50 shrink-0 mt-auto">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0 flex-1 flex items-center justify-between gap-4">
                  {selectedDateIndex !== null &&
                    selectedSlot !== null &&
                    selectedDayData && (
                      <>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base min-w-0">
                          <span className="font-semibold text-[#304048]">
                            {formatDateForDisplay(selectedDayData)}
                          </span>
                          {selectedDayData.slots.find(
                            (s) => s.availabilityId === selectedSlot,
                          ) && (
                            <>
                              <span className="text-gray-400 shrink-0">·</span>
                              <span className="text-gray-700">
                                {formatTime(
                                  selectedDayData.slots.find(
                                    (s) => s.availabilityId === selectedSlot,
                                  )!.startTime,
                                  selectedDayData,
                                )}{" "}
                                –{" "}
                                {formatTime(
                                  selectedDayData.slots.find(
                                    (s) => s.availabilityId === selectedSlot,
                                  )!.endTime,
                                  selectedDayData,
                                )}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-gray-500 text-sm sm:text-base">
                            Price:{" "}
                          </span>
                          <span className="text-[#44666C] font-bold text-xl sm:text-2xl">
                            ₹{expertPrice}
                          </span>
                        </div>
                      </>
                    )}
                </div>
                <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBook}
                    disabled={!canBook || bookingInProgress}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#44666C] text-white rounded-xl hover:bg-[#365a62] disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {bookingInProgress ? (
                      <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                    ) : (
                      <Calendar className="w-4 h-4 shrink-0" />
                    )}
                    {bookingInProgress
                      ? "Booking…"
                      : isFreeSessionAvailable
                        ? "Book Free Appointment"
                        : "Book Appointment"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
