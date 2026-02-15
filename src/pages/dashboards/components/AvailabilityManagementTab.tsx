import { useTranslation } from "react-i18next";
import { Calendar, Check } from "lucide-react";
import type { WeeklyAvailability } from "../types";

type AvailabilityManagementTabProps = {
  availability: WeeklyAvailability;
  onToggleSlot: (day: string, slot: string) => void;
  isEditing: boolean;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  onEdit: () => void;
  onSave: () => void;
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const nextHour = hour + 1;
  const nextHourFormatted = nextHour.toString().padStart(2, "0");
  return `${hour.toString().padStart(2, "0")}:00-${nextHourFormatted}:00`;
});

export default function AvailabilityManagementTab({
  availability,
  isEditing,
  isLoading,
  isSaving,
  error,
  onEdit,
  onSave,
  onToggleSlot,
}: AvailabilityManagementTabProps) {
  const { t } = useTranslation("common");
  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex items-center justify-between gap-[10px] mb-[16px]">
        <div className="flex items-center gap-[10px]">
          <Calendar className="text-primary w-6 h-6" />
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
            {t("dashboardAvailabilityManagement")}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={onEdit}
              disabled={isLoading}
              className="px-[14px] py-[8px] rounded-full text-[13px] sm:text-[14px] font-medium bg-primary text-white shadow-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
            >
              {t("dashboardEditAvailability")}
            </button>
          ) : (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || isLoading}
              className="px-[14px] py-[8px] rounded-full text-[13px] sm:text-[14px] font-medium bg-primary text-white shadow-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
            >
              {isSaving ? t("dashboardSavingChanges") : t("dashboardSaveChanges")}
            </button>
          )}
        </div>
      </div>

      <p className="text-[13px] sm:text-[14px] text-light-text mb-[20px]">
        {t("dashboardSelectSlotsDescription")}
      </p>

      {error && (
        <div className="mb-[16px] text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-[8px] px-[10px] py-[8px]">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-[8px] mb-[12px]">
            <div className="font-semibold text-[13px] text-gray-600 p-[8px]">
              Time
            </div>
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="font-semibold text-[13px] text-gray-600 p-[8px] text-center"
              >
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {timeSlots.map((slot) => (
            <div key={slot} className="grid grid-cols-8 gap-[8px] mb-[8px]">
              <div className="text-[12px] text-light-text p-[8px] flex items-center">
                {slot}
              </div>
              {daysOfWeek.map((day) => {
                const isSelected = availability[day]?.includes(slot) || false;
                const isDisabled = !isEditing || isLoading;
                return (
                  <button
                    key={`${day}-${slot}`}
                    type="button"
                    onClick={() => {
                      if (isDisabled) return;
                      onToggleSlot(day, slot);
                    }}
                    disabled={isDisabled}
                    className={`relative p-[8px] rounded-[8px] text-[12px] transition-all duration-200 cursor-pointer ${isSelected
                      ? "bg-primary/88 text-white font-medium shadow-sm"
                      : "bg-white border border-border-light/30 hover:bg-primary/10"
                      }`}
                  >
                    {isSelected && (
                      <Check
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
