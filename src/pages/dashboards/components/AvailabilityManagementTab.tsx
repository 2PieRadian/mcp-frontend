import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Check, Zap, Loader2 } from "lucide-react";
import type { WeeklyAvailability } from "../types";
import { toggleEmergencyAvailability, ApiHttpError } from "../../../lib/api";

type AvailabilityManagementTabProps = {
  availability: WeeklyAvailability;
  onToggleSlot: (day: string, slot: string) => void;
  isEditing: boolean;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  onEdit: () => void;
  onSave: () => void;
  emergencyAvailable?: boolean;
  onEmergencyToggle?: (enabled: boolean) => void;
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
  emergencyAvailable = false,
  onEmergencyToggle,
}: AvailabilityManagementTabProps) {
  const { t } = useTranslation("common");
  const [emergencyToggling, setEmergencyToggling] = useState(false);
  const [emergencyError, setEmergencyError] = useState<string | null>(null);

  const handleEmergencyToggle = async () => {
    if (emergencyToggling) return;
    setEmergencyToggling(true);
    setEmergencyError(null);
    try {
      const res = await toggleEmergencyAvailability(!emergencyAvailable);
      onEmergencyToggle?.(res.expert.emergencyAvailable);
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setEmergencyError(err.message);
      } else {
        setEmergencyError(err instanceof Error ? err.message : "Failed to update");
      }
    } finally {
      setEmergencyToggling(false);
    }
  };

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

      {/* Emergency Availability Toggle */}
      <div className="mb-[20px] p-[16px] bg-white border border-amber-200 rounded-[12px]">
        <div className="flex items-start gap-[12px]">
          <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {t("emergencyToggleLabel")}
                </h3>
                <p className="text-[13px] text-gray-600 mt-1">
                  {t("emergencyToggleDescription")}
                </p>
              </div>
              <button
                type="button"
                onClick={handleEmergencyToggle}
                disabled={emergencyToggling || isLoading}
                className={`relative shrink-0 w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 ${
                  emergencyAvailable ? "bg-amber-500" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={emergencyAvailable}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 flex items-center justify-center ${
                    emergencyAvailable ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {emergencyToggling && (
                    <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                  )}
                </span>
              </button>
            </div>
            {emergencyError && (
              <p className="mt-2 text-[12px] text-red-600">{emergencyError}</p>
            )}
            {emergencyAvailable && !emergencyError && (
              <p className="mt-2 text-[12px] text-amber-700 font-medium">
                {t("emergencyToggleEnabled")}
              </p>
            )}
          </div>
        </div>
      </div>

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
