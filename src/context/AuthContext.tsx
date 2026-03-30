import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";
import { isJwtExpired, readInitialSessionUser } from "../lib/authSession";

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
};

function mapApiUserToAuthUser(u: Record<string, unknown> | null | undefined): AuthUser | null {
  if (!u || typeof u.email !== "string") return null;
  const avatarValue =
    (u.userUploadedAvatar as string) || (u.avatar as string) || (u.avatarUrl as string);
  const mapped: AuthUser = {
    id: u.id != null ? String(u.id) : undefined,
    expertId:
      typeof (u as { expert?: { id: number } }).expert?.id === "number"
        ? (u as { expert: { id: number } }).expert.id
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
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    return readInitialSessionUser() as AuthUser | null;
  });
  const [isLoading] = useState(false);

  const refreshUserFromServer = useCallback(async (): Promise<boolean> => {
    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setUser(null);
      return false;
    }
    if (isJwtExpired(token)) {
      setUser(null);
      window.localStorage.removeItem("auth:user");
      window.localStorage.removeItem("auth:token");
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
          });

          if (!response.ok) {
            lastError = new Error(
              `Failed to fetch current user (${response.status})`,
            );
            continue;
          }

          const data = await response.json();
          const u = data?.user ?? data;
          const mapped = mapApiUserToAuthUser(u);

          if (!mapped) {
            throw new Error("Invalid /me response: missing email");
          }

          setUser(mapped);
          window.localStorage.setItem("auth:user", JSON.stringify(mapped));
          return true;
        } catch (err) {
          lastError = err;
        }
      }

      throw lastError ?? new Error("Failed to fetch current user");
    } catch (error) {
      console.warn("Auth /me refresh failed; logging out.", error);
      setUser(null);
      window.localStorage.removeItem("auth:user");
      window.localStorage.removeItem("auth:token");
      return false;
    }
  }, []);

  const login = (user: AuthUser) => {
    setUser(user);
    window.localStorage.setItem("auth:user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("auth:user");
    window.localStorage.removeItem("auth:token");
  };

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
