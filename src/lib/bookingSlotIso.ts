import type { TimeSlot } from "../context/BookingContext";

/** Normalize "9:00" / "09:00" to HH:mm for ISO timestamps. */
export function toHhMm(time: string): string {
  const [h, m] = time.split(":").map((x) => Number(String(x).trim()));
  if (!Number.isFinite(h)) return "00:00";
  const mm = Number.isFinite(m) ? m : 0;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/**
 * Build UTC ISO instants for the API. Availability slots are wall-clock in Asia/Kolkata (IST),
 * so we use +05:30 regardless of the browser timezone.
 */
export function slotToISO(
  day: { year: number; month: number; date: number },
  slot: TimeSlot,
): { startAt: string; endAt: string } {
  const pad = (n: number) => String(n).padStart(2, "0");
  const datePrefix = `${day.year}-${pad(day.month)}-${pad(day.date)}`;
  const startClock = toHhMm(slot.startTime);
  const endClock = toHhMm(slot.endTime);
  const start = new Date(`${datePrefix}T${startClock}:00+05:30`);
  let end = new Date(`${datePrefix}T${endClock}:00+05:30`);
  if (Number.isNaN(start.getTime())) {
    const [sh, sm] = slot.startTime.split(":").map(Number);
    const [eh, em] = slot.endTime.split(":").map(Number);
    const fbS = new Date(day.year, day.month - 1, day.date, sh, sm, 0, 0);
    const fbE = new Date(day.year, day.month - 1, day.date, eh, em, 0, 0);
    return { startAt: fbS.toISOString(), endAt: fbE.toISOString() };
  }
  if (end.getTime() <= start.getTime()) {
    end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  }
  return { startAt: start.toISOString(), endAt: end.toISOString() };
}
