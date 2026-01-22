import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";
import useScrollToTop from "../hooks/useScrollToTop";

export default function OAuthCallback() {
  useScrollToTop();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * 🔹 OAuth verification (runs once on load)
   */
  useEffect(() => {
    const token = searchParams.get("token");
    const success = searchParams.get("success");

    if (!token || success !== "true") {
      setStatus("error");
      setErrorMessage(
        "Authentication failed. Missing token or invalid response.",
      );
      return;
    }

    const verifyOAuth = async () => {
      try {
        localStorage.setItem("auth:token", token);

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to fetch user data");
        }

        const data = await response.json();
        const user = data.user ?? data;

        const avatarValue = user.userUploadedAvatar || user.avatar || "";

        login({
          id: String(user.id),
          email: user.email,
          name: user.name || undefined,
          avatarUrl: getAvatarUrl(avatarValue),
          phoneNumber: user.phoneNumber || undefined,
          role: user.role || undefined,
          dateOfBirth: user.dateOfBirth || undefined,
          gender: user.gender || undefined,
          languages: user.languages || undefined,
          createdAt: user.createdAt || undefined,
          hasPassword: user.hasPassword ?? false,
        });

        setStatus("success");
      } catch (error: any) {
        console.error("OAuth verification failed:", error);
        localStorage.removeItem("auth:token");

        setStatus("error");
        setErrorMessage(error?.message || "Failed to verify authentication.");
      }
    };

    verifyOAuth();
  }, [searchParams, login]);

  /**
   * 🔹 Redirect AFTER status changes (this fixes the bug)
   */
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);

      return () => clearTimeout(t);
    }

    if (status === "error") {
      const t = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  /**
   * 🔹 UI (UNCHANGED)
   */

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e35] mb-3">
            Authentication Failed
          </h2>
          <p className="text-[#5a6c75] mb-6" style={{ fontSize: "16px" }}>
            {errorMessage}
          </p>
          <div
            className="flex items-center justify-center gap-2 text-[#5a6c75]"
            style={{ fontSize: "14px" }}
          >
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#44666C] border-t-transparent"></div>
            <span>Redirecting to login page...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[#1a2e35] mb-3">
            Welcome Back!
          </h2>
          <p className="text-[#5a6c75] mb-6" style={{ fontSize: "16px" }}>
            You've been successfully logged in.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div
              className="flex items-center justify-center gap-2 text-[#5a6c75]"
              style={{ fontSize: "14px" }}
            >
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#44666C] border-t-transparent"></div>
              <span>Redirecting to home page...</span>
            </div>

            <div className="w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#44666C] rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-3 border-[#44666C] border-t-transparent"></div>
        </div>
        <h2 className="text-2xl font-bold text-[#1a2e35] mb-3">
          Completing Authentication
        </h2>
        <p className="text-[#5a6c75]" style={{ fontSize: "16px" }}>
          Please wait while we verify your credentials...
        </p>
      </div>
    </div>
  );
}
