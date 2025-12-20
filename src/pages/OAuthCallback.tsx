import { useEffect, useState, useRef } from "react";
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

        console.log("--------------------------------");
        console.log(contentType);
        console.log(isJson);
        console.log("Token: ", token);
        console.log("Response: ", response);
        console.log("--------------------------------");

        if (!response.ok) {
          const errorText = isJson
            ? (await response.json()).message
            : await response.text();
          throw new Error(errorText || "Failed to fetch user data");
        }

        const data = isJson ? await response.json() : null;
        const user = data?.user || data;

        if (!isMounted || hasProcessedRef.current) return;
        hasProcessedRef.current = true;

        const avatarValue = user.avatar || user.avatarUrl;

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
          hasPassword: user.hasPassword ?? false, // OAuth users typically don't have passwords initially
        });

        setStatus("success");

        setTimeout(() => {
          if (isMounted) {
            navigate("/", { replace: true });
          }
        }, 1500);
      } catch (error: any) {
        if (!isMounted || hasProcessedRef.current) return;
        hasProcessedRef.current = true;

        console.error("OAuth verification failed:", error);

        // Clear the token since /me failed
        window.localStorage.removeItem("auth:token");

        setStatus("error");
        setErrorMessage(
          error?.message || "Failed to verify authentication. Please try again."
        );
        navigate("/login", { replace: true });
      }
    };

    handleOAuthCallback();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {/* Success Icon */}
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

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-[#1a2e35] mb-3">
            Welcome Back!
          </h2>
          <p className="text-[#5a6c75] mb-6" style={{ fontSize: "16px" }}>
            You've been successfully logged in.
          </p>

          {/* Loading Indicator */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="flex items-center justify-center gap-2 text-[#5a6c75]"
              style={{ fontSize: "14px" }}
            >
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#44666C] border-t-transparent"></div>
              <span>Redirecting to home page...</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#44666C] rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
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
