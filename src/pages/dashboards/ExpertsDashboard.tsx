import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import type { UpcomingSession, WeeklyAvailability, TabType } from "./types";
import useScrollToTop from "../../hooks/useScrollToTop";
import { BACKEND_URL } from "../../lib/api";

const DashboardTabs = lazy(() => import("./components/DashboardTabs"));
const UpcomingSessionsTab = lazy(
  () => import("./components/UpcomingSessionsTab")
);
const AvailabilityManagementTab = lazy(
  () => import("./components/AvailabilityManagementTab")
);
const EarningsTab = lazy(() => import("./components/EarningsTab"));

export default function ExpertsDashboard() {
  useScrollToTop();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("sessions");
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>(
    []
  );
  const [availability, setAvailability] = useState<WeeklyAvailability>({});
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null
  );
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);

  // Check if user is EXPERT
  useEffect(() => {
    if (user?.role !== "EXPERT") {
      navigate("/");
    }
  }, [user, navigate]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setUpcomingSessions([
      {
        id: "1",
        meetLink: "https://meet.google.com/abc-defg-hij",
        duration: 60,
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        userReason: "Need guidance on career transition and skill development",
        user: {
          id: "user1",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: undefined,
        },
        amountPaid: 1500,
      },
      {
        id: "2",
        meetLink: "https://meet.google.com/xyz-uvwx-rst",
        duration: 45,
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(
          Date.now() + 24 * 60 * 60 * 1000 + 45 * 60 * 1000
        ).toISOString(),
        userReason: "Financial planning for retirement",
        user: {
          id: "user2",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: undefined,
        },
        amountPaid: 2000,
      },
    ]);

    setTotalEarnings(125000);
    setMonthlyEarnings(25000);
  }, []);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!user?.expertId || user.role !== "EXPERT") return;

      const token = window.localStorage.getItem("auth:token");
      if (!token) {
        setAvailability({});
        return;
      }

      setIsAvailabilityLoading(true);
      setAvailabilityError(null);

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/appointments/availability/${user.expertId}/weekly-slots`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Failed to load weekly availability"
          );
        }

        const data = await response.json();
        const slots = Array.isArray(data?.slots) ? data.slots : [];

        const dayMap: Record<string, string> = {
          MONDAY: "Monday",
          TUESDAY: "Tuesday",
          WEDNESDAY: "Wednesday",
          THURSDAY: "Thursday",
          FRIDAY: "Friday",
          SATURDAY: "Saturday",
          SUNDAY: "Sunday",
        };

        const nextAvailability: WeeklyAvailability = {};

        slots.forEach((slot: any) => {
          if (!slot?.dayOfWeek || !slot?.startTime) return;

          const apiDay = String(slot.dayOfWeek).toUpperCase();
          const uiDay = dayMap[apiDay];
          if (!uiDay) return;

          if (!slot.isAvailable) return;

          const startDate = new Date(slot.startTime);
          const hour = startDate.getUTCHours();
          if (Number.isNaN(hour) || hour < 0 || hour > 23) return;

          const startHourStr = hour.toString().padStart(2, "0");
          const endHourStr = (hour + 1).toString().padStart(2, "0");
          const label = `${startHourStr}:00-${endHourStr}:00`;

          if (!nextAvailability[uiDay]) {
            nextAvailability[uiDay] = [];
          }
          if (!nextAvailability[uiDay].includes(label)) {
            nextAvailability[uiDay].push(label);
          }
        });

        setAvailability(nextAvailability);
      } catch (error: any) {
        console.error("Error fetching weekly availability:", error);
        setAvailabilityError(
          error?.message || "Unable to load weekly availability"
        );
      } finally {
        setIsAvailabilityLoading(false);
      }
    };

    fetchAvailability();
  }, [user]);

  const toggleTimeSlot = (day: string, slot: string) => {
    if (!isEditingAvailability) return;

    setAvailability((prev) => {
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

  const handleSaveAvailability = async () => {
    if (!user?.expertId || user.role !== "EXPERT") return;

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setAvailabilityError("You must be logged in to update availability.");
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

    Object.entries(availability).forEach(([day, slots]) => {
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
    setAvailabilityError(null);

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
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to update weekly availability"
        );
      }

      setIsEditingAvailability(false);
    } catch (error: any) {
      console.error("Error updating weekly availability:", error);
      setAvailabilityError(
        error?.message || "Unable to update weekly availability"
      );
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
      <div className="max-w-[1350px] mx-auto py-[30px] sm:py-[40px]">
        <div className="mb-[30px]">
          <h1 className="text-[clamp(24px,5vw,32px)] font-bold text-logo-heading">
            Expert Dashboard
          </h1>
          <p className="text-[14px] sm:text-[16px] text-light-text mt-[8px]">
            Manage your sessions, availability, and earnings
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </Suspense>

        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <div>
            {activeTab === "sessions" && (
              <UpcomingSessionsTab sessions={upcomingSessions} />
            )}

            {activeTab === "availability" && (
              <AvailabilityManagementTab
                availability={availability}
                isEditing={isEditingAvailability}
                isLoading={isAvailabilityLoading}
                isSaving={isSavingAvailability}
                error={availabilityError}
                onEdit={handleEditAvailability}
                onSave={handleSaveAvailability}
                onToggleSlot={toggleTimeSlot}
              />
            )}

            {activeTab === "earnings" && (
              <EarningsTab
                totalEarnings={totalEarnings}
                monthlyEarnings={monthlyEarnings}
              />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
