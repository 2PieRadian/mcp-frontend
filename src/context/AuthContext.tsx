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
  email: string;
  name?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  role?: "USER" | "EXPERT" | "ADMIN";
  dateOfBirth?: string;
  gender?: string;
  languages?: string[];
  createdAt?: string;
  hasPassword?: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUserAvatar: (avatarUrl: string) => void;
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

            const avatarValue =
              u?.userUploadedAvatar || u?.avatar || u?.avatarUrl;

            const mapped: AuthUser = {
              id: u?.id != null ? String(u.id) : undefined,
              email: u?.email,
              name: u?.name || undefined,
              avatarUrl: getAvatarUrl(avatarValue),
              phoneNumber: u?.phoneNumber || undefined,
              role: u?.role || undefined,
              dateOfBirth: u?.dateOfBirth || undefined,
              gender: u?.gender || undefined,
              languages: u?.languages || undefined,
              createdAt: u?.createdAt || undefined,
              hasPassword: u?.hasPassword ?? undefined,
            };

            if (!mapped.email) {
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

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    logout,
    updateUserAvatar,
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
