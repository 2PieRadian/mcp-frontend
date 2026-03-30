import { getAvatarUrl } from "./api";

/** Minimal user shape for navbar / instant hydration (matches AuthUser fields we persist). */
export type HydratedAuthUser = {
  id?: string;
  expertId?: number;
  email: string;
  name?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  role?: "USER" | "EXPERT" | "ADMIN";
  dateOfBirth?: string;
  age?: number;
  gender?: string;
  languages?: string[];
  createdAt?: string;
  hasPassword?: boolean;
  googleId?: string;
};

function decodeBase64Url(segment: string): string {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  const padded =
    base64 + (pad === 2 ? "==" : pad === 3 ? "=" : "");
  const binary = atob(padded);
  try {
    return decodeURIComponent(
      Array.from(binary, (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(
        "",
      ),
    );
  } catch {
    return binary;
  }
}

export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const json = decodeBase64Url(parts[1]);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  const p = parseJwtPayload(token);
  if (!p) return true;
  const exp = p.exp;
  if (typeof exp !== "number") return false;
  return Date.now() / 1000 >= exp - 30;
}

function readCachedAuthUser(): HydratedAuthUser | null {
  const raw = window.localStorage.getItem("auth:user");
  if (!raw) return null;
  try {
    const u = JSON.parse(raw) as Partial<HydratedAuthUser>;
    if (!u || typeof u.email !== "string" || !u.email.trim()) return null;
    return u as HydratedAuthUser;
  } catch {
    return null;
  }
}

function authUserFromJwtPayload(p: Record<string, unknown>): HydratedAuthUser | null {
  const email =
    typeof p.email === "string"
      ? p.email
      : typeof p.userEmail === "string"
        ? p.userEmail
        : "";
  if (!email.trim()) return null;

  const idRaw = p.sub ?? p.userId ?? p.id;
  const id = idRaw != null ? String(idRaw) : undefined;

  const roleRaw = p.role;
  const role =
    roleRaw === "USER" || roleRaw === "EXPERT" || roleRaw === "ADMIN"
      ? roleRaw
      : undefined;

  const avatarRaw =
    (typeof p.picture === "string" && p.picture) ||
    (typeof p.avatarUrl === "string" && p.avatarUrl) ||
    (typeof p.avatar === "string" && p.avatar) ||
    undefined;

  const expertIdRaw = p.expertId;
  let expertId: number | undefined;
  if (typeof expertIdRaw === "number" && Number.isFinite(expertIdRaw)) {
    expertId = expertIdRaw;
  } else if (typeof expertIdRaw === "string") {
    const n = Number(expertIdRaw);
    if (Number.isFinite(n)) expertId = n;
  }

  return {
    id,
    email: email.trim(),
    name: typeof p.name === "string" ? p.name : undefined,
    avatarUrl: getAvatarUrl(avatarRaw ?? null),
    role,
    expertId,
    phoneNumber: typeof p.phoneNumber === "string" ? p.phoneNumber : undefined,
  };
}

/**
 * Restore session for instant UI (navbar avatar) without calling the API.
 * Order: cached `auth:user` → JWT claims → null (and token cleared if unusable).
 */
export function readInitialSessionUser(): HydratedAuthUser | null {
  const token = window.localStorage.getItem("auth:token");
  if (!token) {
    window.localStorage.removeItem("auth:user");
    return null;
  }

  if (isJwtExpired(token)) {
    window.localStorage.removeItem("auth:token");
    window.localStorage.removeItem("auth:user");
    return null;
  }

  const cached = readCachedAuthUser();
  if (cached) return cached;

  const payload = parseJwtPayload(token);
  if (payload) {
    const fromJwt = authUserFromJwtPayload(payload);
    if (fromJwt) return fromJwt;
  }

  window.localStorage.removeItem("auth:token");
  window.localStorage.removeItem("auth:user");
  return null;
}
