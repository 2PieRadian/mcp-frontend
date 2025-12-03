import { useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import type { UpcomingSession, WeeklyAvailability, TabType } from "./types";

const ResponsiveNavbar = lazy(() => import("../../components/ResponsiveNavbar"));
const DashboardTabs = lazy(() => import("./components/DashboardTabs"));
const UpcomingSessionsTab = lazy(() => import("./components/UpcomingSessionsTab"));
const AvailabilityManagementTab = lazy(() => import("./components/AvailabilityManagementTab"));
const EarningsTab = lazy(() => import("./components/EarningsTab"));

export default function ExpertsDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("sessions");
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>(
    []
  );
  const [availability, setAvailability] = useState<WeeklyAvailability>({});
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

    setAvailability({
      Monday: ["09:00-10:00", "14:00-15:00", "16:00-17:00"],
      Tuesday: ["10:00-11:00", "15:00-16:00"],
      Wednesday: ["09:00-10:00", "11:00-12:00", "14:00-15:00"],
      Thursday: ["10:00-11:00", "13:00-14:00", "16:00-17:00"],
      Friday: ["09:00-10:00", "15:00-16:00"],
      Saturday: ["10:00-11:00", "14:00-15:00"],
      Sunday: [],
    });

    setTotalEarnings(125000);
    setMonthlyEarnings(25000);
  }, []);

  const toggleTimeSlot = (day: string, slot: string) => {
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

  if (user?.role !== "EXPERT") {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-100 px-[20px]">
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

        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div>
          {activeTab === "sessions" && (
            <UpcomingSessionsTab sessions={upcomingSessions} />
          )}

          {activeTab === "availability" && (
            <AvailabilityManagementTab
              availability={availability}
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
      </div>
    </div>
  );
}
