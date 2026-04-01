import { useEffect, useState } from "react";
import { X, Calendar, Clock, Loader2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBooking } from "../context/BookingContext";
import {
  rescheduleAppointment,
  ApiHttpError,
} from "../lib/api";
import { slotToISO } from "../lib/bookingSlotIso";

type RescheduleAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: number;
  expertId: number;
  onSuccess: () => void;
};

export default function RescheduleAppointmentModal({
  isOpen,
  onClose,
  appointmentId,
  expertId,
  onSuccess,
}: RescheduleAppointmentModalProps) {
  const { t } = useTranslation("common");
  const {
    daysWithSlots,
    isLoading,
    error,
    fetchNext10Days,
    setCurrentExpertId,
  } = useBooking();

  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setActionError(null);
    setSelectedDateIndex(null);
    setSelectedSlot(null);
    setCurrentExpertId(expertId);
    void fetchNext10Days(expertId);
  }, [isOpen, expertId, fetchNext10Days, setCurrentExpertId]);

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

  const selectedDayData =
    selectedDateIndex !== null ? daysWithSlots[selectedDateIndex] : null;

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedSlot(null);
  };

  const handleConfirm = async () => {
    if (
      selectedDateIndex === null ||
      selectedSlot === null ||
      !selectedDayData
    )
      return;
    const slot = selectedDayData.slots.find(
      (s) => s.availabilityId === selectedSlot,
    );
    if (!slot) return;

    setActionError(null);
    setSaving(true);
    try {
      const { startAt, endAt } = slotToISO(selectedDayData, slot);
      await rescheduleAppointment(appointmentId, startAt, endAt);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof ApiHttpError && err.status === 409) {
        void fetchNext10Days(expertId);
      }
      setActionError(
        err instanceof Error ? err.message : t("rescheduleFailedGeneric"),
      );
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canConfirm =
    selectedDateIndex !== null &&
    selectedSlot !== null &&
    !isLoading &&
    !saving;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="reschedule-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2
            id="reschedule-modal-title"
            className="text-lg font-bold text-[#304048]"
          >
            {t("rescheduleAppointmentTitle")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-6 text-sm text-gray-600">
            {t("rescheduleAppointmentSubtitle")}
          </p>

          {actionError ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 whitespace-pre-wrap">
              {actionError}
            </div>
          ) : null}

          <section className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#304048]">
              <Calendar className="h-5 w-5 text-[#44666C]" />
              {t("rescheduleSelectDate")}
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#44666C]" />
                <span className="ml-3 text-gray-600">
                  {t("rescheduleLoadingAvailability")}
                </span>
              </div>
            ) : error ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
                <p className="mb-4 text-base text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={() => fetchNext10Days(expertId)}
                  className="cursor-pointer rounded-xl bg-[#44666C] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#365a62]"
                >
                  {t("dashboardTryAgain")}
                </button>
              </div>
            ) : daysWithSlots.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
                <Calendar className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                <p className="font-medium text-gray-600">
                  {t("rescheduleNoSlots")}
                </p>
              </div>
            ) : (
              <div className="-mx-1 overflow-x-auto px-1 pb-2">
                <div className="flex min-w-max gap-3">
                  {daysWithSlots.map((dayData, index) => {
                    const isSelected = selectedDateIndex === index;
                    return (
                      <button
                        key={`${dayData.year}-${dayData.month}-${dayData.date}`}
                        type="button"
                        onClick={() => handleDateSelect(index)}
                        className={`relative w-[140px] shrink-0 rounded-xl border-2 p-5 text-center transition-all sm:w-[160px] ${
                          isSelected
                            ? "border-[#44666C] bg-[#E0ECEE] shadow-lg ring-2 ring-[#44666C]/20"
                            : "cursor-pointer border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                        }`}
                      >
                        {isSelected ? (
                          <div className="absolute right-2 top-2 rounded-full bg-[#44666C] p-1">
                            <Check
                              className="h-3 w-3 text-white"
                              strokeWidth={3}
                            />
                          </div>
                        ) : null}
                        <p
                          className={`mb-2 text-sm font-semibold uppercase tracking-wider ${isSelected ? "text-[#44666C]" : "text-gray-500"}`}
                        >
                          {getDayName(dayData)}
                        </p>
                        <p
                          className={`mb-2 text-xl font-bold ${isSelected ? "text-[#44666C]" : "text-[#304048]"}`}
                        >
                          {dayData.date}
                        </p>
                        <p
                          className={`text-sm font-medium ${isSelected ? "text-[#44666C]" : "text-gray-600"}`}
                        >
                          {dayData.month}/{dayData.year}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <section className="pb-4">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#304048]">
              <Clock className="h-5 w-5 text-[#44666C]" />
              {t("rescheduleSelectTime")}
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#44666C]" />
              </div>
            ) : selectedDateIndex === null ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center text-gray-600">
                {t("reschedulePickDateFirst")}
              </div>
            ) : !selectedDayData || selectedDayData.slots.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center text-gray-600">
                {t("rescheduleNoSlotsThisDay")}
              </div>
            ) : (
              <div className="-mx-1 overflow-x-auto px-1 pb-2">
                <div className="flex min-w-max gap-3">
                  {selectedDayData.slots.map((slot) => {
                    const isSelected =
                      selectedSlot === slot.availabilityId;
                    return (
                      <button
                        key={slot.availabilityId}
                        type="button"
                        onClick={() =>
                          setSelectedSlot(slot.availabilityId)
                        }
                        className={`relative min-w-[160px] rounded-xl border-2 p-4 pr-10 text-left transition-all sm:min-w-[180px] ${
                          isSelected
                            ? "border-[#44666C] bg-[#E0ECEE] shadow-md"
                            : "cursor-pointer border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                        }`}
                      >
                        {isSelected ? (
                          <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-[#44666C] p-1">
                            <Check
                              className="h-3 w-3 text-white"
                              strokeWidth={3}
                            />
                          </div>
                        ) : null}
                        <p className="text-base font-semibold leading-tight text-[#304048]">
                          {formatTime(slot.startTime, selectedDayData)}
                          <span className="mx-1.5 font-normal text-gray-500">
                            to
                          </span>
                          {formatTime(slot.endTime, selectedDayData)}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {t("rescheduleOneHourSession")}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-gray-100 bg-gray-50/80 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-50"
          >
            {t("rescheduleCancel")}
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={!canConfirm}
            className="rounded-xl bg-[#44666C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#365a62] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("rescheduleSaving")}
              </span>
            ) : (
              t("rescheduleConfirm")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
