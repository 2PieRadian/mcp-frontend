import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircleCheck } from "lucide-react";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const token = searchParams.get("token");
      const success = searchParams.get("success");

      if (!token || success !== "true") {
        setStatus("error");
        setErrorMessage(
          "Authentication failed. Missing token or invalid response."
        );
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      try {
        window.localStorage.setItem("auth:token", token);

        // Fetch user data from the backend using the token
        // We'll try a common endpoint pattern - adjust if your backend uses a different one
        const response = await fetch("http://localhost:3000/api/v1/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
          // If the /me endpoint doesn't exist, we'll decode the JWT as fallback
          if (response.status === 404) {
            // Fallback: Decode JWT to get user info (basic implementation)
            const userData = decodeJWT(token);
            if (userData) {
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
              setTimeout(() => navigate("/"), 1500);
              return;
            }
          }

          const errorText = isJson
            ? (await response.json()).message
            : await response.text();
          throw new Error(errorText || "Failed to fetch user data");
        }

        // Parse user data from successful response
        const data = isJson ? await response.json() : null;
        const user = data?.user || data; // Handle both { user: {...} } and direct user object

        // Update AuthContext with user data
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

        // Step 8: Mark as successful and redirect to home page
        setStatus("success");
        setTimeout(() => navigate("/"), 1500);
      } catch (error: any) {
        console.error("OAuth callback error:", error);
        setStatus("error");
        setErrorMessage(error?.message || "Failed to complete authentication");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, login]);

  // Helper function to decode JWT (basic implementation - not for production security)
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

  // Step 9: Render appropriate UI based on status
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-light-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-light-text">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-light-100 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="text-red-600 text-4xl mb-4">✕</div>
          <h2 className="text-2xl font-bold text-logo-heading mb-2">
            Authentication Failed
          </h2>
          <p className="text-light-text mb-4">{errorMessage}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-100 flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <CircleCheck className="text-green-600 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-logo-heading mb-2">
          Authentication Successful!
        </h2>
        <p className="text-light-text mb-4">
          You have been successfully logged in.
        </p>
        <p className="text-sm text-gray-500">Redirecting to home page...</p>
      </div>
    </div>
  );
}
