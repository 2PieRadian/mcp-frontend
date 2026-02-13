import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { BACKEND_URL } from "../lib/api";

export type TimeSlot = {
  availabilityId: number;
  startTime: string; // HH:mm format (e.g., "09:00")
  endTime: string; // HH:mm format (e.g., "10:00")
};

export type DayWithSlots = {
  day: string; // Day of week (e.g., "FRIDAY")
  date: number; // Day of month (1-31)
  month: number; // Month (1-12)
  year: number; // Full year (e.g., 2026)
  slots: TimeSlot[];
};

type BookingContextValue = {
  // Available days with slots (from single API call)
  daysWithSlots: DayWithSlots[];
  isLoading: boolean;
  error: string | null;
  fetchNext10Days: (expertId: number) => Promise<void>;

  // Current expert ID
  currentExpertId: number | null;
  setCurrentExpertId: (expertId: number | null) => void;

  // Clear cache
  clearCache: () => void;
};

const BookingContext = createContext<BookingContextValue | undefined>(
  undefined
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [daysWithSlots, setDaysWithSlots] = useState<DayWithSlots[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentExpertId, setCurrentExpertId] = useState<number | null>(null);

  const fetchNext10Days = useCallback(async (expertId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/appointments/availability/${expertId}/next-10-days`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to fetch availability"
        );
      }

      const data = await response.json();
      // API returns an array directly
      const days = Array.isArray(data) ? data : [];
      setDaysWithSlots(days);
    } catch (error: any) {
      console.error("Error fetching next 10 days:", error);
      setError(error?.message || "Unable to load availability");
      setDaysWithSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    setDaysWithSlots([]);
    setCurrentExpertId(null);
  }, []);

  const value: BookingContextValue = {
    daysWithSlots,
    isLoading,
    error,
    fetchNext10Days,
    currentExpertId,
    setCurrentExpertId,
    clearCache,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }

  return context;
}
