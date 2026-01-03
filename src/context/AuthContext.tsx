import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type AuthUser = {
  id?: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  userUploadedAvatar?: string;
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

  // On first load, try to hydrate user from localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("auth:user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      // ignore parse errors and start with empty user
      console.error("Failed to parse stored auth user", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (nextUser: AuthUser) => {
    setUser(nextUser);
    window.localStorage.setItem("auth:user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("auth:user");
    window.localStorage.removeItem("auth:token");
  };

  const updateUserAvatar = (avatarUrl: string) => {
    if (!user) return;

    const updatedUser = { ...user, userUploadedAvatar: avatarUrl };
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
