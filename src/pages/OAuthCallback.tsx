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
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * 1️⃣ MAIN OAUTH VERIFICATION EFFECT
   * Runs once when page loads
   */
  useEffect(() => {
    const token = searchParams.get("token");
    const success = searchParams.get("success");

    if (!token || success !== "true") {
      setStatus("error");
      setErrorMessage(
        "Authentication failed. Missing token or invalid response."
      );
      return;
    }

    const verifyOAuth = async () => {
      try {
        // Save token
        localStorage.setItem("auth:token", token);

        // Fetch user
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

        // Save user in auth context
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
   * 2️⃣ REDIRECTION EFFECT (STATE-DRIVEN)
   */
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (status === "error") {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  /**
   * 3️⃣ UI RENDERING
   */

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold mb-3">Authentication Failed</h2>
          <p className="mb-6">{errorMessage}</p>
          <p className="text-sm">Redirecting to login…</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold mb-3">Welcome Back!</h2>
          <p className="mb-6">You've been successfully logged in.</p>
          <p className="text-sm">Redirecting to home page…</p>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-[#f8fafb] flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg border p-8">
        <h2 className="text-2xl font-bold mb-3">Completing Authentication</h2>
        <p>Please wait while we verify your credentials…</p>
      </div>
    </div>
  );
}
