import { useEffect, useState } from "react";

/** Reusable “current time” for countdown-style UI; updates on an interval. */
export function usePollingNow(intervalMs = 30_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}
