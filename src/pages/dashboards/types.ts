export type WeeklyAvailability = {
  [key: string]: string[];
};

export type TabType =
  | "sessions"
  | "liveClasses"
  | "urgent"
  | "availability"
  | "earnings"
  | "qualifications"
  | "profile";
