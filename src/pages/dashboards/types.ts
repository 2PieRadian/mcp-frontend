export type UpcomingSession = {
  id: string;
  meetLink: string;
  duration: number;
  startTime: string;
  endTime: string;
  userReason: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  amountPaid: number;
};

export type WeeklyAvailability = {
  [key: string]: string[];
};

export type TabType = "sessions" | "availability" | "earnings";
