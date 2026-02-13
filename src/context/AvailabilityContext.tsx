import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { BACKEND_URL } from "../lib/api";
import type { WeeklyAvailability } from "../pages/dashboards/types";

type AvailabilityContextValue = {
  availability: WeeklyAvailability;
  isLoading: boolean;
  error: string | null;
  fetchAvailability: () => Promise<void>;
  refreshAvailability: () => Promise<void>;
};

const AvailabilityContext = createContext<AvailabilityContextValue | undefined>(
  undefined
);

export function AvailabilityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<WeeklyAvailability>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    if (!user?.expertId || user.role !== "EXPERT") {
      setAvailability({});
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setAvailability({});
      return;
    }

    setIsLoading(true);
    setError(null);

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

        // Parse startTime which is in "HH:mm" format (e.g., "09:00")
        const [hourStr, minuteStr] = slot.startTime.split(":");
        const hour = parseInt(hourStr || "", 10);

        if (Number.isNaN(hour) || hour < 0 || hour > 23) return;

        // Only include slots that start at the top of the hour (00 minutes)
        // This matches the UI which shows hourly slots
        if (minuteStr !== "00") return;

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
      setError(error?.message || "Unable to load weekly availability");
      setAvailability({});
    } finally {
      setIsLoading(false);
    }
  }, [user?.expertId, user?.role]);

  const refreshAvailability = useCallback(async () => {
    await fetchAvailability();
  }, [fetchAvailability]);

  // Fetch availability when user changes or when component mounts
  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const value: AvailabilityContextValue = {
    availability,
    isLoading,
    error,
    fetchAvailability,
    refreshAvailability,
  };

  return (
    <AvailabilityContext.Provider value={value}>
      {children}
    </AvailabilityContext.Provider>
  );
}

export function useAvailability() {
  const context = useContext(AvailabilityContext);

  if (context === undefined) {
    throw new Error(
      "useAvailability must be used within an AvailabilityProvider"
    );
  }

  return context;
}
