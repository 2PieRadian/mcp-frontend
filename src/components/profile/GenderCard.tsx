import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL, getAvatarUrl } from "../../lib/api";
import ProfileButton from "./ProfileButton";
import { useTranslation } from "react-i18next";

export default function GenderCard() {
  const { user, login } = useAuth();
  const { t } = useTranslation("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGender, setSelectedGender] = useState(user?.gender || "");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const getGenderLabel = (value?: string) => {
    if (!value) return t("values.notSet");
    return t(`genderOptions.${value}` as const, { defaultValue: value });
  };

  const handleSave = async () => {
    if (!selectedGender) {
      setError(t("validation.selectGender"));
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
        `${BACKEND_URL}/api/v1/profile/update-gender`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gender: selectedGender }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(data?.message || text || t("validation.failedUpdateGender"));
      }

      const updatedUser = data.user;

      // Update auth context
      const avatarValue = updatedUser.avatar || updatedUser.avatarUrl;
      login({
        id: String(updatedUser.id),
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: getAvatarUrl(avatarValue),
        phoneNumber: updatedUser.phoneNumber || undefined,
        role: updatedUser.role,
        dateOfBirth: updatedUser.dateOfBirth || undefined,
        gender: updatedUser.gender || undefined,
        languages: updatedUser.languages,
        createdAt: updatedUser.createdAt,
      });

      setStatus("success");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || t("validation.failedUpdateGender"));
      setStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.gender")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          {isEditing ? (
            <div className="flex flex-col gap-[6px] mt-[6px]">
              <select
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                className="border border-gray-300 rounded-[10px] px-[12px] py-[8px] sm:py-[6px] bg-white outline-none focus:border-gray-400 focus:shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full transition-all"
                style={{ fontSize: "16px" }}
              >
                <option value="">{t("placeholders.selectGender")}</option>
                <option value="male">{t("genderOptions.male")}</option>
                <option value="female">{t("genderOptions.female")}</option>
                <option value="other">{t("genderOptions.other")}</option>
                <option value="prefer-not-to-say">
                  {t("genderOptions.prefer-not-to-say")}
                </option>
              </select>
              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                <ProfileButton
                  type="button"
                  onClick={handleSave}
                  disabled={status === "saving" || !selectedGender}
                  variant="primary"
                  className="px-[12px] sm:px-[14px]"
                >
                  {status === "saving" ? t("buttons.saving") : t("buttons.save")}
                </ProfileButton>
                <ProfileButton
                  type="button"
                  onClick={() => {
                    setSelectedGender(user?.gender || "");
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
                    {t("status.genderUpdated")}
                  </span>
                )}
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <p className="font-medium capitalize">
                {getGenderLabel(user?.gender)}
              </p>
              <ProfileButton
                type="button"
                onClick={() => {
                  setSelectedGender(user?.gender || "");
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                }}
                variant="secondary"
                className="shrink-0"
              >
                {user?.gender ? t("buttons.edit") : t("buttons.set")}
              </ProfileButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
