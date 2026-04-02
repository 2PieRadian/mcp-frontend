import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";
import { isJwtExpired, readInitialSessionUser } from "../lib/authSession";
import {
  clearAllAuthPersistence,
  clearAuthTokensAndUserCache,
} from "../lib/authStorage";

export type AuthUser = {
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
  /** Expert-only: whether emergency bookings are enabled. */
  emergencyAvailable?: boolean;
  /** Expert-only: bio text. */
  expertBio?: string | null;
};

function mapApiUserToAuthUser(
  u: Record<string, unknown> | null | undefined,
): AuthUser | null {
  if (!u || typeof u.email !== "string") return null;
  const avatarValue =
    (u.userUploadedAvatar as string) ||
    (u.avatar as string) ||
    (u.avatarUrl as string);
  const expert = u.expert as
    | {
        id?: number;
        emergencyAvailable?: boolean;
        bio?: string | null;
      }
    | undefined;
  const mapped: AuthUser = {
    id: u.id != null ? String(u.id) : undefined,
    expertId:
      typeof expert?.id === "number"
        ? expert.id
        : u.expertId != null
          ? Number(u.expertId)
          : undefined,
    email: u.email as string,
    name: (u.name as string) || undefined,
    avatarUrl: getAvatarUrl(avatarValue),
    phoneNumber: (u.phoneNumber as string) || undefined,
    role: u.role as AuthUser["role"],
    dateOfBirth: u.dateOfBirth as string | undefined,
    age: u.age != null ? Number(u.age) : undefined,
    gender: (u.gender as string) || undefined,
    languages: u.languages as string[] | undefined,
    createdAt: u.createdAt as string | undefined,
    hasPassword: u.hasPassword as boolean | undefined,
    googleId: (u.googleId as string) || undefined,
    emergencyAvailable:
      typeof expert?.emergencyAvailable === "boolean"
        ? expert.emergencyAvailable
        : (u.emergencyAvailable as boolean | undefined),
    expertBio:
      typeof expert?.bio === "string" || expert?.bio === null
        ? expert.bio
        : (u.expertBio as string | null | undefined),
  };
  return mapped;
}

type AuthContextValue = {
  user: AuthUser | null;
  /** False after first paint: session is hydrated from cache/JWT without /me. */
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUserAvatar: (avatarUrl: string) => void;
  /** Apply user from API (e.g. update-phone response) to context. */
  updateUserFromApi: (apiUser: Record<string, unknown>) => void;
  /** Fetch current user from /me (profile, dashboard, booking, etc.). */
  refreshUserFromServer: () => Promise<boolean>;
  /** Re-read JWT + cached user from storage (e.g. home mount) without calling /me. */
  syncSessionFromStorage: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const refreshAbortRef = useRef<AbortController | null>(null);

  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    return readInitialSessionUser() as AuthUser | null;
  });
  const [isLoading] = useState(false);

  const abortInFlightRefresh = useCallback(() => {
    refreshAbortRef.current?.abort();
    refreshAbortRef.current = null;
  }, []);

  const refreshUserFromServer = useCallback(async (): Promise<boolean> => {
    abortInFlightRefresh();
    const ac = new AbortController();
    refreshAbortRef.current = ac;
    const { signal } = ac;

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      if (!signal.aborted) setUser(null);
      return false;
    }
    if (isJwtExpired(token)) {
      if (!signal.aborted) {
        setUser(null);
        clearAuthTokensAndUserCache();
      }
      return false;
    }

    try {
      const endpoints = [
        `${BACKEND_URL}/api/v1/auth/me`,
        `${BACKEND_URL}/api/v1/me`,
      ];
      let lastError: unknown = null;

      for (const url of endpoints) {
        try {
          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            signal,
          });

          if (!response.ok) {
            lastError = new Error(
              `Failed to fetch current user (${response.status})`,
            );
            continue;
          }

          const data = await response.json();
          if (signal.aborted) return false;

          const u = data?.user ?? data;
          const mapped = mapApiUserToAuthUser(u);

          if (!mapped) {
            throw new Error("Invalid /me response: missing email");
          }

          setUser(mapped);
          window.localStorage.setItem("auth:user", JSON.stringify(mapped));
          return true;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") {
            return false;
          }
          lastError = err;
        }
      }

      throw lastError ?? new Error("Failed to fetch current user");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return false;
      }
      console.warn("Auth /me refresh failed; logging out.", error);
      if (!signal.aborted) {
        setUser(null);
        clearAuthTokensAndUserCache();
      }
      return false;
    }
  }, [abortInFlightRefresh]);

  const syncSessionFromStorage = useCallback(() => {
    setUser(readInitialSessionUser() as AuthUser | null);
  }, []);

  const login = useCallback(
    (nextUser: AuthUser) => {
      abortInFlightRefresh();
      setUser(nextUser);
      window.localStorage.setItem("auth:user", JSON.stringify(nextUser));
    },
    [abortInFlightRefresh],
  );

  const logout = useCallback(() => {
    abortInFlightRefresh();
    setUser(null);
    clearAllAuthPersistence();
  }, [abortInFlightRefresh]);

  const updateUserAvatar = (url: string) => {
    if (!user) return;

    const updatedUser = { ...user, avatarUrl: url };
    setUser(updatedUser);
    window.localStorage.setItem("auth:user", JSON.stringify(updatedUser));
  };

  const updateUserFromApi = (apiUser: Record<string, unknown>) => {
    const mapped = mapApiUserToAuthUser(apiUser);
    if (!mapped) return;
    setUser(mapped);
    window.localStorage.setItem("auth:user", JSON.stringify(mapped));
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    logout,
    updateUserAvatar,
    updateUserFromApi,
    refreshUserFromServer,
    syncSessionFromStorage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}
