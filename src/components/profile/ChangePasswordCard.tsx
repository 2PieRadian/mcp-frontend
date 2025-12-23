import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../lib/api";
import { Eye, EyeOff } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { useTranslation } from "react-i18next";

export default function ChangePasswordCard() {
  const { user, login } = useAuth();
  const { t } = useTranslation("profile");
  const hasPassword = user?.hasPassword !== false; // Default to true if not specified
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSetPassword = async () => {
    if (!newPassword) {
      setError(t("validation.passwordRequired"));
      setStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("validation.passwordsDoNotMatch"));
      setStatus("error");
      return;
    }

    if (newPassword.length < 6) {
      setError(t("validation.passwordMinLength"));
      setStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setError(t("validation.notAuthenticated"));
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/profile/set-password`,
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
        throw new Error(data?.message || text || t("validation.failedSetPassword"));
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
      setError(error?.message || t("validation.failedSetPassword"));
      setStatus("error");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError(t("validation.allFieldsRequired"));
      setStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("validation.newPasswordsDoNotMatch"));
      setStatus("error");
      return;
    }

    if (newPassword.length < 6) {
      setError(t("validation.newPasswordMinLength"));
      setStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setError(t("validation.notAuthenticated"));
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/profile/change-password`,
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
        throw new Error(
          data?.message || text || t("validation.failedChangePassword")
        );
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
      setError(error?.message || t("validation.failedChangePassword"));
      setStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.password")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          {status === "success" && !isEditing && (
            <div className="mb-[8px] p-[8px] sm:p-[10px] bg-green-50 border border-green-200 rounded-[12px] sm:rounded-[16px]">
              <p className="text-[12px] sm:text-[13px] text-green-700 font-medium">
                {t("status.passwordChangedSuccess")}
              </p>
            </div>
          )}
          {isEditing ? (
            <div className="flex flex-col gap-[10px] mt-[6px]">
              {hasPassword && (
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (status !== "idle") {
                        setStatus("idle");
                        setError(null);
                      }
                    }}
                    placeholder={t("placeholders.currentPassword")}
                    className="border border-gray-300 rounded-[10px] px-[12px] pr-[40px] py-[8px] sm:py-[6px] bg-white placeholder:text-input-placeholder outline-none focus:border-gray-400 focus:shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full transition-all"
                    style={{ fontSize: "16px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label={
                      showCurrentPassword
                        ? t("password.hideAria")
                        : t("password.showAria")
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              )}
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setError(null);
                    }
                  }}
                  placeholder={
                    hasPassword ? t("placeholders.newPassword") : t("placeholders.password")
                  }
                  className="border border-gray-300 rounded-[10px] px-[12px] pr-[40px] py-[8px] sm:py-[6px] bg-white placeholder:text-input-placeholder outline-none focus:border-gray-400 focus:shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full transition-all"
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label={
                    showNewPassword ? t("password.hideAria") : t("password.showAria")
                  }
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setError(null);
                    }
                  }}
                  placeholder={
                    hasPassword
                      ? t("placeholders.confirmNewPassword")
                      : t("placeholders.confirmPassword")
                  }
                  className="border border-gray-300 rounded-[10px] px-[12px] pr-[40px] py-[8px] sm:py-[6px] bg-white placeholder:text-input-placeholder outline-none focus:border-gray-400 focus:shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full transition-all"
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label={
                    showConfirmPassword
                      ? t("password.hideAria")
                      : t("password.showAria")
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                <ProfileButton
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
                  variant="primary"
                  className="px-[12px] sm:px-[14px]"
                >
                  {status === "saving"
                    ? t("buttons.saving")
                    : hasPassword
                    ? t("buttons.save")
                    : t("password.setPassword")}
                </ProfileButton>
                <ProfileButton
                  type="button"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setShowCurrentPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                    setIsEditing(false);
                    setStatus("idle");
                    setError(null);
                  }}
                  variant="secondary"
                >
                  {t("buttons.cancel")}
                </ProfileButton>
                {status === "success" && (
                  <span className="text-xs text-green-600">
                    {hasPassword ? t("status.passwordChanged") : t("status.passwordSet")}
                  </span>
                )}
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <p className="font-medium">
                {hasPassword ? t("values.maskedPassword") : t("values.notSetYet")}
              </p>
              <ProfileButton
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                }}
                variant="secondary"
                className="shrink-0"
              >
                {hasPassword ? t("buttons.change") : t("password.setAPassword")}
              </ProfileButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
