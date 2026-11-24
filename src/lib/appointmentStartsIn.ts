import type { TFunction } from "i18next";

/**
 * Human “Starts in …” line when startAt is in the future (relative to nowMs).
 * Includes hours, minutes, and seconds. Returns null once the session has started or if invalid.
 */
export function formatAppointmentStartsIn(
  startAt: string,
  nowMs: number,
  t: TFunction<"common">,
): string | null {
  const startMs = new Date(startAt).getTime();
  if (!Number.isFinite(startMs)) return null;
  const diffMs = startMs - nowMs;
  if (diffMs <= 0) return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  if (totalSeconds < 1) {
    return t("appointmentStartsInImminent");
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return t("appointmentStartsInHMS", { hours, minutes, seconds });
  }
  if (minutes > 0) {
    return t("appointmentStartsInMS", { minutes, seconds });
  }
  return t("appointmentStartsInSecondsOnly", { seconds });
}

/**
 * Formats "Meeting will start at X to Y" based on startAt and endAt.
 * e.g., "Meeting will start at 10:00 AM to 10:30 AM"
 */
export function formatMeetingSchedule(startAt: string, endAt: string): string {
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) {
    return "Meeting will start soon";
  }

  const startTime = startDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = endDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const isToday = new Date().toDateString() === startDate.toDateString();
  if (isToday) {
    return `Meeting will start at ${startTime} to ${endTime}`;
  }

  const dateStr = startDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return `Meeting will start at ${startTime} to ${endTime} (${dateStr})`;
}

/**
 * Returns true if current time is strictly before (startAt - 5 minutes).
 */
export function isBeforeFiveMinBeforeStart(startAt: string, nowMs: number = Date.now()): boolean {
  const startMs = new Date(startAt).getTime();
  if (!Number.isFinite(startMs)) return false;
  return nowMs < startMs - 5 * 60 * 1000;
}

