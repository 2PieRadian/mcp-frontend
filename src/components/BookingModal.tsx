import { useState, useEffect, useRef } from "react";
import { X, Calendar, Clock, Loader2, Check } from "lucide-react";
import { useBooking } from "../context/BookingContext";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  expertId: number;
  expertName: string;
  expertPrice: number;
};

export default function BookingModal({
  isOpen,
  onClose,
  expertId,
  expertName,
  expertPrice,
}: BookingModalProps) {
  const {
    daysWithSlots,
    isLoading,
    error,
    fetchNext10Days,
    currentExpertId,
    setCurrentExpertId,
  } = useBooking();

  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch all days with slots when modal opens
  useEffect(() => {
    if (isOpen && expertId !== currentExpertId) {
      setCurrentExpertId(expertId);
      fetchNext10Days(expertId);
    }
  }, [isOpen, expertId, currentExpertId, fetchNext10Days, setCurrentExpertId]);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getDayName = (dayData: { year: number; month: number; date: number }): string => {
    // Create a date object from year, month, date
    const date = new Date(dayData.year, dayData.month - 1, dayData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Compare dates (using local timezone for user-friendly display)
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    if (dateOnly.getTime() === today.getTime()) {
      return "Today";
    }

    if (dateOnly.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }

    // Return day of week
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[date.getDay()];
  };

  const getMonthName = (month: number, short: boolean = true): string => {
    const months = short
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month - 1];
  };

  const formatTime = (
    timeString: string,
    dayData?: { year: number; month: number; date: number }
  ): string => {
    // timeString is in HH:mm format (e.g., "09:00")
    const [hours, minutes] = timeString.split(":").map(Number);

    // If dayData is provided, combine them for display
    if (dayData) {
      const dateTime = new Date(dayData.year, dayData.month - 1, dayData.date, hours, minutes);
      return dateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Just format the time string (HH:mm -> 12-hour format)
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateForDisplay = (dayData: { year: number; month: number; date: number }): string => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[dayData.month - 1];
    return `${monthName} ${dayData.date}, ${dayData.year}`;
  };

  const selectedDayData =
    selectedDateIndex !== null ? daysWithSlots[selectedDateIndex] : null;

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedSlot(null); // Reset slot selection when date changes
  };

  const handleBook = () => {
    if (selectedDateIndex === null || selectedSlot === null || !selectedDayData) return;

    const slot = selectedDayData.slots.find(
      (s) => s.availabilityId === selectedSlot
    );

    if (slot) {
      // TODO: Implement actual booking logic
      console.log("Booking slot:", {
        expertId,
        dayData: selectedDayData,
        slot,
      });
      alert(
        `Booking functionality coming soon!\n\nSelected: ${formatDateForDisplay(selectedDayData)} at ${formatTime(slot.startTime, selectedDayData)} - ${formatTime(slot.endTime, selectedDayData)}`
      );
      // onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden transform transition-all"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-[#44666C] to-[#365a62] px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-white truncate" style={{ fontSize: 'clamp(16px, 1rem, 20px)' }}>Book Appointment</h2>
              <p className="text-sm text-white/80 truncate" style={{ fontSize: '14px' }}>{expertName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close"
          >
            <X size={20} className="sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-6">
          {error ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-red-600 mb-4 px-2" style={{ fontSize: '16px' }}>{error}</p>
              <button
                onClick={() => fetchNext10Days(expertId)}
                className="px-4 sm:px-6 py-2.5 sm:py-2 bg-[#44666C] text-white rounded-lg hover:bg-[#365a62] transition-colors cursor-pointer font-medium"
                style={{ fontSize: '16px' }}
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#44666C] animate-spin" />
              <span className="ml-3 text-gray-600" style={{ fontSize: '16px' }}>Loading availability...</span>
            </div>
          ) : daysWithSlots.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-600 mb-2 font-medium" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                No available dates
              </p>
              <p className="text-gray-500 px-4" style={{ fontSize: '16px' }}>
                This expert hasn't configured their availability yet.
              </p>
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              {/* Date Selection - Horizontal Scrollable */}
              <div>
                <h3 className="font-semibold text-[#304048] mb-3 sm:mb-4 flex items-center gap-2" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Select Date
                </h3>
                <div className="overflow-x-auto pb-2 -mx-1 sm:-mx-2 px-1 sm:px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div className="flex gap-2.5 sm:gap-3 min-w-max">
                    {daysWithSlots.map((dayData, index) => {
                      const isSelected = selectedDateIndex === index;
                      return (
                        <button
                          key={`${dayData.year}-${dayData.month}-${dayData.date}`}
                          onClick={() => handleDateSelect(index)}
                          className={`relative shrink-0 w-[140px] sm:w-[160px] text-center p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer ${isSelected
                            ? "border-[#44666C] bg-[#E0ECEE] shadow-lg ring-2 ring-[#44666C]/20"
                            : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50 active:bg-gray-100"
                            }`}
                        >
                          {/* Checkmark in top-right corner */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#44666C] rounded-full p-1 shadow-sm">
                              <Check className="w-3 h-3 text-white shrink-0" strokeWidth={3} />
                            </div>
                          )}

                          <div className="flex flex-col items-center">
                            {/* Day of week */}
                            <p className={`uppercase tracking-wider mb-3 ${isSelected ? 'text-[#44666C]' : 'text-gray-500'}`} style={{ fontSize: '14px', fontWeight: '600' }}>
                              {getDayName(dayData)}
                            </p>

                            {/* Date number - prominent */}
                            <div className="mb-3">
                              <span className={`font-bold ${isSelected ? 'text-[#44666C]' : 'text-[#304048]'}`} style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                                {dayData.date}
                              </span>
                            </div>

                            {/* Month and year separator */}
                            <div className="border-t border-gray-200 pt-3 w-full space-y-1">
                              <p className={`font-medium ${isSelected ? 'text-[#44666C]' : 'text-gray-600'}`} style={{ fontSize: '14px' }}>
                                {getMonthName(dayData.month, true)}
                              </p>
                              <p className="text-gray-500" style={{ fontSize: '14px' }}>
                                {dayData.year}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Slots - Horizontal Scrollable */}
              <div>
                <h3 className="font-semibold text-[#304048] mb-3 sm:mb-4 flex items-center gap-2" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  Select Time
                </h3>
                {selectedDateIndex === null ? (
                  <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-gray-600 px-4" style={{ fontSize: '16px' }}>Select a date to see available times</p>
                  </div>
                ) : !selectedDayData || selectedDayData.slots.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-gray-600 px-4" style={{ fontSize: '16px' }}>No available slots for this date</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto pb-2 -mx-1 sm:-mx-2 px-1 sm:px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <div className="flex gap-2.5 sm:gap-3 min-w-max">
                      {selectedDayData.slots.map((slot) => {
                        const isSelected = selectedSlot === slot.availabilityId;
                        return (
                          <button
                            key={slot.availabilityId}
                            onClick={() => setSelectedSlot(slot.availabilityId)}
                            className={`relative shrink-0 w-[140px] sm:w-[160px] text-left p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${isSelected
                              ? "border-[#44666C] bg-[#E0ECEE] shadow-md"
                              : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50 active:bg-gray-100"
                              }`}
                          >
                            {/* Checkmark in top-right corner */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#44666C] rounded-full p-1 shadow-sm">
                                <Check className="w-3 h-3 text-white shrink-0" strokeWidth={3} />
                              </div>
                            )}

                            <div className="flex flex-col pr-6">
                              <p className="font-semibold text-[#304048] mb-1" style={{ fontSize: '16px' }}>
                                {formatTime(slot.startTime, selectedDayData)}
                              </p>
                              <p className="text-gray-600 leading-tight" style={{ fontSize: '14px' }}>
                                {formatTime(slot.endTime, selectedDayData)}
                              </p>
                              <p className="text-gray-500 mt-1" style={{ fontSize: '14px' }}>
                                1 hour
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 sm:px-6 py-4 bg-gray-50 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              {selectedDateIndex !== null && selectedSlot !== null && selectedDayData && (
                <div className="space-y-2">
                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#44666C] shrink-0" />
                    <p className="font-semibold text-[#304048]" style={{ fontSize: '16px' }}>
                      {formatDateForDisplay(selectedDayData)}
                    </p>
                  </div>

                  {/* Time */}
                  {selectedDayData.slots.find(
                    (s) => s.availabilityId === selectedSlot
                  ) && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#44666C] shrink-0" />
                        <p className="text-gray-700" style={{ fontSize: '16px' }}>
                          {formatTime(
                            selectedDayData.slots.find(
                              (s) => s.availabilityId === selectedSlot
                            )!.startTime,
                            selectedDayData
                          )}{" "}
                          <span className="text-gray-400 mx-1">-</span>{" "}
                          {formatTime(
                            selectedDayData.slots.find(
                              (s) => s.availabilityId === selectedSlot
                            )!.endTime,
                            selectedDayData
                          )}
                        </p>
                      </div>
                    )}

                  {/* Price */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-gray-500" style={{ fontSize: '14px' }}>Price:</span>
                    <p className="text-[#44666C] font-bold" style={{ fontSize: 'clamp(20.8px, 1.3rem, 27px)' }}>
                      ₹{expertPrice}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer font-medium"
                style={{ fontSize: '16px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={selectedDateIndex === null || selectedSlot === null}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-2 bg-[#44666C] text-white rounded-lg hover:bg-[#365a62] active:bg-[#2d4d54] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer font-medium flex items-center justify-center gap-2"
                style={{ fontSize: '16px' }}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
