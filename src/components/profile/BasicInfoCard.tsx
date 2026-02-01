import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL, getAvatarUrl } from "../../lib/api";
import ProfileButton from "./ProfileButton";
import { useTranslation } from "react-i18next";

export default function BasicInfoCard() {
  const { user, login } = useAuth();
  const { t } = useTranslation("profile");
  const displayName = user?.name || user?.email || "";
  const [editingName, setEditingName] = useState(displayName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [nameError, setNameError] = useState<string | null>(null);

  const handleNameSave = async () => {
    const trimmed = editingName.trim();
    if (!trimmed) {
      setNameError(t("validation.nameRequired"));
      setNameStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setNameError(t("validation.notAuthenticated"));
      setNameStatus("error");
      return;
    }

    setNameStatus("saving");
    setNameError(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/profile/update-name`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: trimmed }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(data?.message || text || t("validation.failedUpdateName"));
      }

      const updatedUser = data.user;

      // Update auth context with new user data
      const avatarValue = updatedUser.avatar || updatedUser.avatarUrl;
      login({
        id: String(updatedUser.id),
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: getAvatarUrl(avatarValue),
        phoneNumber: updatedUser.phoneNumber || undefined,
        role: updatedUser.role,
        dateOfBirth: updatedUser.dateOfBirth || undefined,
        age: updatedUser.age != null ? Number(updatedUser.age) : user?.age,
        gender: updatedUser.gender || undefined,
        languages: updatedUser.languages,
        createdAt: updatedUser.createdAt,
      });

      setEditingName(updatedUser.name || "");
      setNameStatus("success");
      setIsEditingName(false);
    } catch (error: any) {
      console.error(error);
      setNameError(error?.message || t("validation.failedUpdateName"));
      setNameStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.basicInfo")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {t("labels.name")}
          </p>
          {isEditingName ? (
            <div className="flex flex-col gap-[6px] mt-[6px]">
              <input
                type="text"
                value={editingName}
                onChange={(e) => {
                  setEditingName(e.target.value);
                  if (nameStatus !== "idle") {
                    setNameStatus("idle");
                    setNameError(null);
                  }
                }}
                className="border border-gray-300 rounded-[10px] px-[12px] py-[8px] sm:py-[6px] bg-white placeholder:text-input-placeholder outline-none focus:border-gray-400 focus:shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full transition-all"
                style={{ fontSize: "16px" }}
                placeholder={t("placeholders.fullName")}
              />
              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                <ProfileButton
                  type="button"
                  onClick={handleNameSave}
                  disabled={nameStatus === "saving" || !editingName.trim()}
                  variant="primary"
                  className="px-[12px] sm:px-[14px]"
                >
                  {nameStatus === "saving" ? t("buttons.saving") : t("buttons.save")}
                </ProfileButton>
                <ProfileButton
                  type="button"
                  onClick={() => {
                    setEditingName(displayName);
                    setIsEditingName(false);
                    setNameStatus("idle");
                    setNameError(null);
                  }}
                  variant="secondary"
                >
                  {t("buttons.cancel")}
                </ProfileButton>
                {nameStatus === "success" && (
                  <span className="text-[14px] text-green-600">
                    {t("status.nameUpdated")}
                  </span>
                )}
                {nameError && (
                  <span className="text-[14px] text-red-600">{nameError}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <p
                className="font-medium truncate flex-1 min-w-0"
                style={{ fontSize: "16px" }}
              >
                {displayName}
              </p>
              <ProfileButton
                type="button"
                onClick={() => {
                  setEditingName(displayName);
                  setIsEditingName(true);
                  setNameStatus("idle");
                  setNameError(null);
                }}
                variant="secondary"
                className="shrink-0"
              >
                {t("buttons.edit")}
              </ProfileButton>
            </div>
          )}
        </div>
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {t("labels.role")}
          </p>
          <p className="font-medium text-[16px] sm:text-[17px]">
            {t(`roles.${user?.role || "USER"}` as const, {
              defaultValue: user?.role || "USER",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
