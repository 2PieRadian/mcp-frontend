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
