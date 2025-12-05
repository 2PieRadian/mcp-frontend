import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from "../lib/api";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessedRef.current) {
      return;
    }

    // Extract values once to avoid dependency issues
    const token = searchParams.get("token");
    const success = searchParams.get("success");

    // If no token/success, don't process
    if (!token || success !== "true") {
      hasProcessedRef.current = true;
      setStatus("error");
      setErrorMessage(
        "Authentication failed. Missing token or invalid response."
      );
      navigate("/login", { replace: true });
      return;
    }

    let isMounted = true;

    const handleOAuthCallback = async () => {
      try {
        window.localStorage.setItem("auth:token", token);

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
          if (response.status === 404) {
            const userData = decodeJWT(token);
            if (userData && isMounted && !hasProcessedRef.current) {
              hasProcessedRef.current = true;
              login({
                id: String(userData.id || ""),
                email: userData.email || "",
                name: userData.name || undefined,
                avatarUrl: userData.avatar || undefined,
                phoneNumber: userData.phoneNumber || undefined,
                role: userData.role || undefined,
                dateOfBirth: userData.dateOfBirth || undefined,
                languages: userData.languages || undefined,
                createdAt: userData.createdAt || undefined,
              });
              setStatus("success");

              // Show success UI for 3 seconds before redirecting
              setTimeout(() => {
                if (isMounted) {
                  navigate("/", { replace: true });
                }
              }, 3000);
              return;
            }
          }

          const errorText = isJson
            ? (await response.json()).message
            : await response.text();
          throw new Error(errorText || "Failed to fetch user data");
        }

        const data = isJson ? await response.json() : null;
        const user = data?.user || data;

        if (!isMounted || hasProcessedRef.current) return;
        hasProcessedRef.current = true;

        login({
          id: String(user.id),
          email: user.email,
          name: user.name || undefined,
          avatarUrl: user.avatar || undefined,
          phoneNumber: user.phoneNumber || undefined,
          role: user.role || undefined,
          dateOfBirth: user.dateOfBirth || undefined,
          gender: user.gender || undefined,
          languages: user.languages || undefined,
          createdAt: user.createdAt || undefined,
          hasPassword: user.hasPassword ?? false, // OAuth users typically don't have passwords initially
        });

        setStatus("success");

        // Show success UI for 3 seconds before redirecting
        setTimeout(() => {
          if (isMounted) {
            navigate("/", { replace: true });
          }
        }, 2000);
      } catch (error: any) {
        if (!isMounted || hasProcessedRef.current) return;
        hasProcessedRef.current = true;
        console.error("OAuth callback error:", error);
        setStatus("error");
        setErrorMessage(error?.message || "Failed to complete authentication");
        navigate("/login", { replace: true });
      }
    };

    handleOAuthCallback();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const decodeJWT = (token: string): any => {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  };

  if (status === "error") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-red-100 p-10 animate-fade-in animate-float-card">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-50 flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(239,68,68,0.2)]">
            <svg
              className="w-14 h-14 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Authentication Failed
          </h2>
          <p className="text-gray-600 mb-8 text-lg font-medium">
            {errorMessage}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent"></div>
            <span>Redirecting to login page...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-10 animate-fade-in animate-float-card">
          {/* Success Icon with Animation */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-60"></div>
            <div className="absolute inset-0 rounded-full bg-green-50 animate-pulse"></div>
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(34,197,94,0.3)]">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-8 text-lg font-medium">
            You've been successfully logged in.
          </p>

          {/* Loading Indicator */}
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#44666C] border-t-transparent"></div>
              <span>Redirecting to home page...</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#44666C] via-[#365a62] to-[#44666C] rounded-full animate-progress shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-10 animate-float-card">
        <div className="w-24 h-24 mx-auto mb-8">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-[#44666C] border-t-transparent shadow-lg"></div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Completing Authentication
        </h2>
        <p className="text-gray-600 text-lg font-medium">
          Please wait while we verify your credentials...
        </p>
      </div>
    </div>
  );
}
