/**
 * Parse a Jitsi Meet URL into domain + room name for JitsiMeetExternalAPI.
 * Example: https://meet.jit.si/mindcure-abc → domain meet.jit.si, room mindcure-abc
 */
export function parseJitsiMeetLink(
  meetLink: string,
): { domain: string; roomName: string } | null {
  try {
    const u = new URL(meetLink.trim());
    const domain = u.hostname;
    const segments = u.pathname.split("/").filter(Boolean);
    if (!domain || segments.length === 0) return null;
    const roomName = decodeURIComponent(segments.join("/"));
    if (!roomName) return null;
    return { domain, roomName };
  } catch {
    return null;
  }
}

export function jitsiExternalApiScriptUrl(domain: string): string {
  return `https://${domain}/external_api.js`;
}
