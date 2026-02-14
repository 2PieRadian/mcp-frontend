import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";

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
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUserAvatar: (avatarUrl: string) => void;
  /** Apply user from API (e.g. update-phone response) to context. */
  updateUserFromApi: (apiUser: Record<string, unknown>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, validate token by calling /me and only then set the user.
  useEffect(() => {
    const token = window.localStorage.getItem("auth:token");

    if (!token) {
      // No token -> not logged in
      setUser(null);
      setIsLoading(false);
      return;
    }

    const fetchMe = async () => {
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
                `Failed to fetch current user (${response.status})`
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
            return;
          } catch (err) {
            lastError = err;
          }
        }

        throw lastError ?? new Error("Failed to fetch current user");
      } catch (error) {
        // Token is missing/invalid/expired or user doesn't exist -> treat as logged out
        console.warn("Auth /me validation failed; logging out.", error);
        setUser(null);
        window.localStorage.removeItem("auth:user");
        window.localStorage.removeItem("auth:token");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
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
