import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ChangePasswordCard() {
  const { user, login } = useAuth();
  const hasPassword = user?.hasPassword !== false; // Default to true if not specified
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSetPassword = async () => {
    if (!newPassword) {
      setError("Password is required");
      setStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setStatus("error");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setError("You are not authenticated.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/profile/set-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(data?.message || text || "Failed to set password");
      }

      // Update user to indicate password is now set
      if (user) {
        login({
          ...user,
          hasPassword: true,
        });
      }

      setStatus("success");
      setIsEditing(false);
      setNewPassword("");
      setConfirmPassword("");
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Failed to set password");
      setStatus("error");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError("All fields are required");
      setStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setStatus("error");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      setStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setError("You are not authenticated.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/profile/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(data?.message || text || "Failed to change password");
      }

      setStatus("success");
      setIsEditing(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Failed to change password");
      setStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Password
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          {status === "success" && !isEditing && (
            <div className="mb-[8px] p-[8px] sm:p-[10px] bg-green-50 border border-green-200 rounded-[12px] sm:rounded-[16px]">
              <p className="text-[12px] sm:text-[13px] text-green-700 font-medium">
                Password was changed successfully
              </p>
            </div>
          )}
          {isEditing ? (
            <div className="flex flex-col gap-[10px] mt-[6px]">
              {hasPassword && (
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setError(null);
                    }
                  }}
                  placeholder="Current password"
                  className="border border-border-light rounded-full px-[12px] py-[8px] sm:py-[6px] text-[13px] sm:text-[14px] bg-white placeholder:text-input-placeholder outline-none focus:ring-2 focus:ring-primary/30 w-full"
                />
              )}
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                placeholder={hasPassword ? "New password" : "Password"}
                className="border border-border-light rounded-full px-[12px] py-[8px] sm:py-[6px] text-[13px] sm:text-[14px] bg-white placeholder:text-input-placeholder outline-none focus:ring-2 focus:ring-primary/30 w-full"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                placeholder={
                  hasPassword ? "Confirm new password" : "Confirm password"
                }
                className="border border-border-light rounded-full px-[12px] py-[8px] sm:py-[6px] text-[13px] sm:text-[14px] bg-white placeholder:text-input-placeholder outline-none focus:ring-2 focus:ring-primary/30 w-full"
              />
              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                <button
                  type="button"
                  onClick={
                    hasPassword ? handleChangePassword : handleSetPassword
                  }
                  disabled={
                    status === "saving" ||
                    (hasPassword && !currentPassword) ||
                    !newPassword ||
                    !confirmPassword
                  }
                  className="cursor-pointer bg-primary text-light-100 text-[11px] sm:text-xs font-medium rounded-full px-[12px] sm:px-[14px] py-[8px] sm:py-[6px] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "saving"
                    ? "Saving..."
                    : hasPassword
                    ? "Save"
                    : "Set Password"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setIsEditing(false);
                    setStatus("idle");
                    setError(null);
                  }}
                  className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[8px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                >
                  Cancel
                </button>
                {status === "success" && (
                  <span className="text-xs text-green-600">
                    {hasPassword ? "Password changed" : "Password set"}
                  </span>
                )}
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <p className="font-medium">
                {hasPassword ? "••••••••" : "Not Set Yet"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                }}
                className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[6px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] flex-shrink-0"
              >
                {hasPassword ? "Change" : "Set a Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
