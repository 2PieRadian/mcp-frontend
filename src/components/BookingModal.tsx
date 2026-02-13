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

  const formatDate = (dayData: { year: number; month: number; date: number }): string => {
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

    // Format as "Mon, Feb 14" using the date parts
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekday = weekdays[date.getDay()];
    const monthName = months[date.getMonth()];
    return `${weekday}, ${monthName} ${date.getDate()}`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden transform transition-all"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-[#44666C] to-[#365a62] px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Book Appointment</h2>
              <p className="text-sm text-white/80">{expertName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchNext10Days(expertId)}
                className="px-4 py-2 bg-[#44666C] text-white rounded-lg hover:bg-[#365a62] transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#44666C] animate-spin" />
              <span className="ml-3 text-gray-600">Loading availability...</span>
            </div>
          ) : daysWithSlots.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">
                No available dates
              </p>
              <p className="text-gray-500 text-sm">
                This expert hasn't configured their availability yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Date Selection - Horizontal Scrollable */}
              <div>
                <h3 className="text-lg font-semibold text-[#304048] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select Date
                </h3>
                <div className="overflow-x-auto pb-2 -mx-2 px-2">
                  <div className="flex gap-3 min-w-max">
                    {daysWithSlots.map((dayData, index) => {
                      const isSelected = selectedDateIndex === index;
                      return (
                        <button
                          key={`${dayData.year}-${dayData.month}-${dayData.date}`}
                          onClick={() => handleDateSelect(index)}
                          className={`shrink-0 w-[180px] text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#44666C] bg-[#E0ECEE] shadow-md"
                              : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-[#304048]">
                                {formatDate(dayData)}
                              </p>
                              {isSelected && (
                                <Check className="w-5 h-5 text-[#44666C] shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {formatDateForDisplay(dayData)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Slots - Horizontal Scrollable */}
              <div>
                <h3 className="text-lg font-semibold text-[#304048] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Select Time
                </h3>
                {selectedDateIndex === null ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Select a date to see available times</p>
                  </div>
                ) : !selectedDayData || selectedDayData.slots.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No available slots for this date</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto pb-2 -mx-2 px-2">
                    <div className="flex gap-3 min-w-max">
                      {selectedDayData.slots.map((slot) => {
                        const isSelected = selectedSlot === slot.availabilityId;
                        return (
                          <button
                            key={slot.availabilityId}
                            onClick={() => setSelectedSlot(slot.availabilityId)}
                            className={`shrink-0 w-[160px] text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#44666C] bg-[#E0ECEE] shadow-md"
                                : "border-gray-200 hover:border-[#44666C]/50 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-[#304048] text-sm">
                                  {formatTime(slot.startTime, selectedDayData)}
                                </p>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-[#44666C] shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600">
                                {formatTime(slot.endTime, selectedDayData)}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
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
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              {selectedDateIndex !== null && selectedSlot !== null && selectedDayData && (
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-[#304048]">
                    {formatDateForDisplay(selectedDayData)} at{" "}
                    {selectedDayData.slots.find(
                      (s) => s.availabilityId === selectedSlot
                    ) && (
                      <>
                        {formatTime(
                          selectedDayData.slots.find(
                            (s) => s.availabilityId === selectedSlot
                          )!.startTime,
                          selectedDayData
                        )}{" "}
                        -{" "}
                        {formatTime(
                          selectedDayData.slots.find(
                            (s) => s.availabilityId === selectedSlot
                          )!.endTime,
                          selectedDayData
                        )}
                      </>
                    )}
                  </p>
                  <p className="text-gray-500">₹{expertPrice} per hour</p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={selectedDateIndex === null || selectedSlot === null}
                className="px-6 py-2 bg-[#44666C] text-white rounded-lg hover:bg-[#365a62] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer font-medium flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
