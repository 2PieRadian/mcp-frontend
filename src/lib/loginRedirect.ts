/** Session key so Google OAuth can return to the same page without backend changes. */
export const LOGIN_REDIRECT_SESSION_KEY = "mcp:postLoginRedirect";

/**
 * Only allow in-app paths (open-redirect safe).
 */
export function normalizePostLoginPath(
  raw: string | null | undefined,
  fallback = "/",
): string {
  if (!raw || typeof raw !== "string") return fallback;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return fallback;
  return t || fallback;
}

export function getReturnPathFromLoginLocation(
  searchParams: URLSearchParams,
  locationState: unknown,
  fallback = "/",
): string {
  const fromQuery =
    searchParams.get("redirect") || searchParams.get("returnTo");
  const fromState =
    locationState &&
    typeof locationState === "object" &&
    locationState !== null &&
    "from" in locationState &&
    typeof (locationState as { from?: unknown }).from === "string"
      ? (locationState as { from: string }).from
      : null;
  return normalizePostLoginPath(fromQuery || fromState, fallback);
}

export function rememberRedirectForOAuth(path: string): void {
  const safe = normalizePostLoginPath(path, "/");
  if (safe === "/") {
    sessionStorage.removeItem(LOGIN_REDIRECT_SESSION_KEY);
    return;
  }
  sessionStorage.setItem(LOGIN_REDIRECT_SESSION_KEY, safe);
}

export function consumeStoredOAuthRedirect(fallback = "/"): string {
  const raw = sessionStorage.getItem(LOGIN_REDIRECT_SESSION_KEY);
  sessionStorage.removeItem(LOGIN_REDIRECT_SESSION_KEY);
  return normalizePostLoginPath(raw, fallback);
}

/** Use on "Log in" links so post-login return matches the current page. */
export function loginPathWithRedirect(pathname: string, search: string): string {
  if (pathname === "/login") return "/login";
  return `/login?redirect=${encodeURIComponent(`${pathname}${search}`)}`;
}
