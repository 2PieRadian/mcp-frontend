import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL, getAvatarUrl } from "../../lib/api";
import ProfileButton from "./ProfileButton";
import { useTranslation } from "react-i18next";

const MIN_AGE = 1;
const MAX_AGE = 150;

export default function AgeCard() {
  const { user, login } = useAuth();
  const { t } = useTranslation("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [ageInput, setAgeInput] = useState(() =>
    user?.age != null ? String(user.age) : "",
  );
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const raw = ageInput.trim();
    if (!raw) {
      setError(t("validation.ageRequired"));
      setStatus("error");
      return;
    }

    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      setError(t("validation.ageRequired"));
      setStatus("error");
      return;
    }
    if (parsed < MIN_AGE || parsed > MAX_AGE) {
      setError(t("validation.ageOutOfRange"));
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
        `${BACKEND_URL}/api/v1/profile/update-age`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ age: parsed }),
        },
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(
          data?.message || text || t("validation.failedUpdateAge"),
        );
      }

      const updatedUser = data.user;

      const avatarValue = updatedUser.avatar || updatedUser.avatarUrl;
      const newAge =
        updatedUser.age != null ? Number(updatedUser.age) : undefined;

      login({
        id: String(updatedUser.id),
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: getAvatarUrl(avatarValue),
        phoneNumber: updatedUser.phoneNumber || undefined,
        role: updatedUser.role,
        dateOfBirth: updatedUser.dateOfBirth || undefined,
        age: newAge,
        gender: updatedUser.gender || undefined,
        languages: updatedUser.languages,
        createdAt: updatedUser.createdAt,
      });

      setStatus("success");
      setIsEditing(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t("validation.failedUpdateAge");
      setError(message);
      setStatus("error");
    }
  };

  const displayAge =
    user?.age != null && !Number.isNaN(user.age) ? String(user.age) : null;

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.age")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          {isEditing ? (
            <div className="flex flex-col gap-[6px] mt-[6px]">
              <input
                type="number"
                min={MIN_AGE}
                max={MAX_AGE}
                value={ageInput}
                onChange={(e) => {
                  setAgeInput(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                placeholder={t("placeholders.enterAge")}
                className="border border-gray-300 rounded-[10px] px-[12px] py-[8px] sm:py-[6px] bg-white placeholder:text-input-placeholder outline-none focus:border-gray-400 focus:shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full transition-all"
                style={{ fontSize: "16px" }}
                aria-label={t("sections.age")}
              />
              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                <ProfileButton
                  type="button"
                  onClick={handleSave}
                  disabled={
                    status === "saving" ||
                    !ageInput.trim() ||
                    Number.isNaN(parseInt(ageInput.trim(), 10)) ||
                    (() => {
                      const n = parseInt(ageInput.trim(), 10);
                      return n < MIN_AGE || n > MAX_AGE;
                    })()
                  }
                  variant="primary"
                  className="px-[12px] sm:px-[14px]"
                >
                  {status === "saving"
                    ? t("buttons.saving")
                    : t("buttons.save")}
                </ProfileButton>
                <ProfileButton
                  type="button"
                  onClick={() => {
                    setAgeInput(
                      user?.age != null ? String(user.age) : "",
                    );
                    setIsEditing(false);
                    setStatus("idle");
                    setError(null);
                  }}
                  variant="secondary"
                >
                  {t("buttons.cancel")}
                </ProfileButton>
                {status === "success" && (
                  <span className="text-[14px] text-green-600">
                    {t("status.ageUpdated")}
                  </span>
                )}
                {error && (
                  <span className="text-[14px] text-red-600">{error}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <p className="font-medium">
                {displayAge ?? t("values.notSetYet")}
              </p>
              <ProfileButton
                type="button"
                onClick={() => {
                  setAgeInput(
                    user?.age != null ? String(user.age) : "",
                  );
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                }}
                variant="secondary"
                className="shrink-0"
              >
                {displayAge ? t("buttons.edit") : t("buttons.set")}
              </ProfileButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
