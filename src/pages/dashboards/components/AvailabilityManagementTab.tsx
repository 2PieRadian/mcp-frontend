import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Check,
  Zap,
  Loader2,
  Pencil,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";
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
  onCancel?: () => void;
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
  onCancel,
  onToggleSlot,
  emergencyAvailable = false,
  onEmergencyToggle,
}: AvailabilityManagementTabProps) {
  const { t } = useTranslation("common");
  const [emergencyToggling, setEmergencyToggling] = useState(false);
  const [emergencyError, setEmergencyError] = useState<string | null>(null);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const prevSavingRef = useRef(isSaving);

  useEffect(() => {
    if (prevSavingRef.current && !isSaving && !error) {
      setShowSavedFeedback(true);
      const timer = setTimeout(() => setShowSavedFeedback(false), 2500);
      return () => clearTimeout(timer);
    }
    prevSavingRef.current = isSaving;
  }, [isSaving, error]);

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
        setEmergencyError(
          err instanceof Error ? err.message : "Failed to update",
        );
      }
    } finally {
      setEmergencyToggling(false);
    }
  };

  return (
    <section
      className={`relative shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px] transition-all duration-300 ${
        isEditing
          ? "bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 ring-2 ring-teal-400/50 ring-offset-2"
          : "bg-[hsl(0,0%,97%)]"
      }`}
    >
      {/* Edit Mode Banner */}
      {isEditing && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-teal-500/30">
            <Pencil className="w-3.5 h-3.5" />
            <span>{t("availabilityEditMode")}</span>
          </div>
        </div>
      )}

      {/* Saved Feedback Toast */}
      {showSavedFeedback && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t("availabilitySaved")}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-[16px]">
        <div className="flex items-center gap-[10px]">
          <div
            className={`p-2 rounded-xl transition-colors duration-300 ${
              isEditing ? "bg-teal-100" : "bg-gray-100"
            }`}
          >
            <Calendar
              className={`w-5 h-5 transition-colors duration-300 ${
                isEditing ? "text-teal-600" : "text-primary"
              }`}
            />
          </div>
          <h2 className="text-[18px] sm:text-[22px] font-semibold text-logo-heading">
            {t("dashboardAvailabilityManagement")}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={onEdit}
              disabled={isLoading}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] sm:text-[14px] font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-500/25 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer transition-all duration-200"
            >
              <Pencil className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>{t("dashboardEditAvailability")}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] sm:text-[14px] font-medium bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>{t("cancel")}</span>
                </button>
              )}
              <button
                type="button"
                onClick={onSave}
                disabled={isSaving || isLoading}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] sm:text-[14px] font-semibold shadow-md transition-all duration-200 cursor-pointer disabled:cursor-not-allowed ${
                  isSaving
                    ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-400/25"
                    : "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02]"
                } disabled:opacity-70 disabled:hover:scale-100`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t("dashboardSavingChanges")}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{t("dashboardSaveChanges")}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <p
        className={`text-[13px] sm:text-[14px] mb-[20px] transition-colors duration-300 ${
          isEditing ? "text-teal-700" : "text-light-text"
        }`}
      >
        {isEditing
          ? t("availabilityEditHint")
          : t("dashboardSelectSlotsDescription")}
      </p>

      {error && (
        <div className="mb-[16px] text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <X className="w-4 h-4 shrink-0" />
          <span>{error}</span>
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
                    className={`relative p-[8px] rounded-[10px] text-[12px] transition-all duration-200 ${
                      isDisabled ? "cursor-default" : "cursor-pointer"
                    } ${
                      isSelected
                        ? isEditing
                          ? "text-white font-medium shadow-md shadow-teal-500/25 ring-2 ring-teal-300/50"
                          : "text-white font-medium shadow-sm"
                        : isEditing
                          ? "bg-white border-2 border-dashed border-gray-400 hover:border-teal-500 hover:bg-teal-50/50 hover:shadow-sm"
                          : "bg-gray-100/80 border border-gray-300"
                    }`}
                    style={
                      isSelected
                        ? {
                            background:
                              "linear-gradient(90deg, hsla(173, 100%, 37%, 1) 0%, hsla(161, 45%, 44%, 1) 100%)",
                          }
                        : undefined
                    }
                  >
                    {isSelected && (
                      <Check
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 drop-shadow-sm"
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
