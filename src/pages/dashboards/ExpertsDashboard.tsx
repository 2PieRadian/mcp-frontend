import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../context/AuthContext";
import { useAvailability } from "../../context/AvailabilityContext";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import type { WeeklyAvailability, TabType } from "./types";
import {
  BACKEND_URL,
  getExpertAppointments,
  getExpertEarnings,
  type AppointmentStatus,
  type ExpertAppointment,
} from "../../lib/api";

const DashboardTabs = lazy(() => import("./components/DashboardTabs"));
const ExpertAppointmentsTab = lazy(
  () => import("./components/ExpertAppointmentsTab"),
);
const AvailabilityManagementTab = lazy(
  () => import("./components/AvailabilityManagementTab"),
);
const EarningsTab = lazy(() => import("./components/EarningsTab"));
const ExpertProfileTab = lazy(() => import("./components/ExpertProfileTab"));
const ExpertQualificationsTab = lazy(
  () => import("./components/ExpertQualificationsTab"),
);

export default function ExpertsDashboard() {
  const { t } = useTranslation("common");
  const { user, refreshUserFromServer } = useAuth();
  const {
    availability,
    isLoading: isAvailabilityLoading,
    error: availabilityError,
    refreshAvailability,
  } = useAvailability();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("sessions");
  const [expertAppointments, setExpertAppointments] = useState<
    ExpertAppointment[]
  >([]);
  const [expertAppointmentsCount, setExpertAppointmentsCount] = useState(0);
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<
    "" | AppointmentStatus
  >("SCHEDULED");
  const [localAvailability, setLocalAvailability] =
    useState<WeeklyAvailability>(availability);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [expertEarnings, setExpertEarnings] = useState<number | undefined>(
    undefined,
  );
  const [expertAppointmentsLoading, setExpertAppointmentsLoading] =
    useState(false);
  const [expertAppointmentsError, setExpertAppointmentsError] = useState<
    string | null
  >(null);
  const [earningsLoading, setEarningsLoading] = useState(false);
  const [earningsError, setEarningsError] = useState<string | null>(null);
  const [emergencyAvailable, setEmergencyAvailable] = useState<boolean>(
    user?.emergencyAvailable ?? false,
  );
  const [expertBio, setExpertBio] = useState<string | null>(
    user?.expertBio ?? null,
  );

  // Sync expert bio with user context
  useEffect(() => {
    if (user?.expertBio !== undefined) {
      setExpertBio(user.expertBio ?? null);
    }
  }, [user?.expertBio]);

  // Sync emergency availability with user context
  useEffect(() => {
    if (user?.emergencyAvailable !== undefined) {
      setEmergencyAvailable(user.emergencyAvailable);
    }
  }, [user?.emergencyAvailable]);

  // Sync local availability with context availability when it changes
  useEffect(() => {
    setLocalAvailability(availability);
  }, [availability]);

  // Check if user is EXPERT
  useEffect(() => {
    if (user?.role !== "EXPERT") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role !== "EXPERT") return;
    void refreshUserFromServer();
  }, [user?.role, refreshUserFromServer]);

  useEffect(() => {
    if (user?.role !== "EXPERT" || user.expertId == null) return;
    void refreshAvailability();
  }, [user?.role, user?.expertId, refreshAvailability]);

  const fetchExpertAppointments = useCallback(async () => {
    if (user?.role !== "EXPERT") return;
    setExpertAppointmentsLoading(true);
    setExpertAppointmentsError(null);
    try {
      const res = await getExpertAppointments(
        appointmentStatusFilter || undefined,
      );
      setExpertAppointments(res.appointments);
      setExpertAppointmentsCount(res.count);
    } catch {
      setExpertAppointmentsError(t("dashboardFailedToLoadAppointments"));
      setExpertAppointments([]);
      setExpertAppointmentsCount(0);
    } finally {
      setExpertAppointmentsLoading(false);
    }
  }, [user?.role, appointmentStatusFilter, t]);

  const fetchEarnings = useCallback(async () => {
    if (user?.role !== "EXPERT") return;
    setEarningsLoading(true);
    setEarningsError(null);
    try {
      const res = await getExpertEarnings();
      setExpertEarnings(res.earnings);
    } catch (e) {
      setEarningsError(t("dashboardFailedToLoadEarnings"));
      setExpertEarnings(undefined);
    } finally {
      setEarningsLoading(false);
    }
  }, [user?.role, t]);

  useEffect(() => {
    fetchExpertAppointments();
  }, [fetchExpertAppointments]);

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  const toggleTimeSlot = (day: string, slot: string) => {
    if (!isEditingAvailability) return;

    setLocalAvailability((prev) => {
      const daySlots = prev[day] || [];
      const isSelected = daySlots.includes(slot);
      return {
        ...prev,
        [day]: isSelected
          ? daySlots.filter((s) => s !== slot)
          : [...daySlots, slot],
      };
    });
  };

  const handleEditAvailability = () => {
    setIsEditingAvailability(true);
  };

  const handleCancelEditAvailability = () => {
    setLocalAvailability(availability);
    setIsEditingAvailability(false);
  };

  const handleSaveAvailability = async () => {
    if (!user?.expertId || user.role !== "EXPERT") return;

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      return;
    }

    const dayMapReverse: Record<string, string> = {
      Monday: "MONDAY",
      Tuesday: "TUESDAY",
      Wednesday: "WEDNESDAY",
      Thursday: "THURSDAY",
      Friday: "FRIDAY",
      Saturday: "SATURDAY",
      Sunday: "SUNDAY",
    };

    const bodySlots: Array<{
      dayOfWeek: string;
      startHour: number;
      endHour: number;
    }> = [];

    Object.entries(localAvailability).forEach(([day, slots]) => {
      const apiDayOfWeek = dayMapReverse[day];
      if (!apiDayOfWeek || !Array.isArray(slots) || slots.length === 0) {
        return;
      }

      const hours = slots
        .map((slot) => {
          const [start] = slot.split("-");
          const hour = parseInt(start.split(":")[0] || "", 10);
          return Number.isNaN(hour) ? null : hour;
        })
        .filter((h): h is number => h !== null)
        .sort((a, b) => a - b);

      if (hours.length === 0) return;

      let rangeStart = hours[0];
      let prevHour = hours[0];

      for (let i = 1; i < hours.length; i++) {
        const current = hours[i];
        if (current !== prevHour + 1) {
          bodySlots.push({
            dayOfWeek: apiDayOfWeek,
            startHour: rangeStart,
            endHour: prevHour + 1,
          });
          rangeStart = current;
        }
        prevHour = current;
      }

      bodySlots.push({
        dayOfWeek: apiDayOfWeek,
        startHour: rangeStart,
        endHour: prevHour + 1,
      });
    });

    setIsSavingAvailability(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/appointments/availability/${user.expertId}/weekly-slots`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ slots: bodySlots }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || t("dashboardFailedToUpdateAvailability"),
        );
      }

      setIsEditingAvailability(false);
      // Refresh availability from the server after successful save
      await refreshAvailability();
    } catch (error: any) {
      console.error("Error updating weekly availability:", error);
    } finally {
      setIsSavingAvailability(false);
    }
  };

  if (user?.role !== "EXPERT") {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-100 px-[16px] sm:px-[20px]">
      <ResponsiveNavbar />
      <div className="max-w-[1350px] mx-auto py-[30px] sm:py-[40px] pb-[80px] sm:pb-[100px]">
        <div className="mb-[30px]">
          <h1 className="text-[clamp(24px,5vw,32px)] font-bold text-logo-heading">
            {t("expertDashboardTitle")}
          </h1>
          <p className="text-[14px] sm:text-[16px] text-light-text mt-[8px]">
            {t("expertDashboardSubtitle")}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-8">{t("dashboardLoading")}</div>
          }
        >
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </Suspense>

        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <div>
            {activeTab === "sessions" && (
              <ExpertAppointmentsTab
                appointments={expertAppointments}
                count={expertAppointmentsCount}
                statusFilter={appointmentStatusFilter}
                onStatusFilterChange={setAppointmentStatusFilter}
                isLoading={expertAppointmentsLoading}
                error={expertAppointmentsError}
                onRefetch={fetchExpertAppointments}
              />
            )}

            {activeTab === "availability" && (
              <AvailabilityManagementTab
                availability={localAvailability}
                isEditing={isEditingAvailability}
                isLoading={isAvailabilityLoading}
                isSaving={isSavingAvailability}
                error={availabilityError}
                onEdit={handleEditAvailability}
                onSave={handleSaveAvailability}
                onCancel={handleCancelEditAvailability}
                onToggleSlot={toggleTimeSlot}
                emergencyAvailable={emergencyAvailable}
                onEmergencyToggle={setEmergencyAvailable}
              />
            )}

            {activeTab === "earnings" && (
              <EarningsTab
                totalEarnings={expertEarnings ?? 0}
                isLoading={earningsLoading}
                error={earningsError}
                onRefetch={fetchEarnings}
              />
            )}

            {activeTab === "qualifications" && <ExpertQualificationsTab />}

            {activeTab === "profile" && (
              <ExpertProfileTab
                initialBio={expertBio}
                onBioUpdated={setExpertBio}
              />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
