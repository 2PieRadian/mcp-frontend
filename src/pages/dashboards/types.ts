export type WeeklyAvailability = {
  [key: string]: string[];
};

export type TabType =
  | "sessions"
  | "urgent"
  | "availability"
  | "earnings"
  | "qualifications"
  | "profile";
