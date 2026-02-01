import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL, getAvatarUrl } from "../../lib/api";
import ProfileButton from "./ProfileButton";
import { useTranslation } from "react-i18next";

const COMMON_LANGUAGES: Array<{ value: string; labelKey: string }> = [
  { value: "English", labelKey: "languageLabels.english" },
  { value: "Hindi", labelKey: "languageLabels.hindi" },
  { value: "Bengali", labelKey: "languageLabels.bengali" },
  { value: "Telugu", labelKey: "languageLabels.telugu" },
  { value: "Marathi", labelKey: "languageLabels.marathi" },
  { value: "Tamil", labelKey: "languageLabels.tamil" },
  { value: "Gujarati", labelKey: "languageLabels.gujarati" },
  { value: "Urdu", labelKey: "languageLabels.urdu" },
  { value: "Kannada", labelKey: "languageLabels.kannada" },
  { value: "Odia", labelKey: "languageLabels.odia" },
  { value: "Malayalam", labelKey: "languageLabels.malayalam" },
  { value: "Punjabi", labelKey: "languageLabels.punjabi" },
  { value: "Assamese", labelKey: "languageLabels.assamese" },
  { value: "Sanskrit", labelKey: "languageLabels.sanskrit" },
  { value: "Konkani", labelKey: "languageLabels.konkani" },
  { value: "Manipuri", labelKey: "languageLabels.manipuri" },
  { value: "Sindhi", labelKey: "languageLabels.sindhi" },
  { value: "Kashmiri", labelKey: "languageLabels.kashmiri" },
  { value: "Bodo", labelKey: "languageLabels.bodo" },
  { value: "Dogri", labelKey: "languageLabels.dogri" },
  { value: "Maithili", labelKey: "languageLabels.maithili" },
  { value: "Santali", labelKey: "languageLabels.santali" }
];

export default function LanguagesCard() {
  const { user, login } = useAuth();
  const { t } = useTranslation("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    user?.languages || []
  );
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [customLanguage, setCustomLanguage] = useState("");

  const hasLanguages = user?.languages && user.languages.length > 0;

  const getLanguageLabel = (value: string) => {
    const found = COMMON_LANGUAGES.find((l) => l.value === value);
    return found ? t(found.labelKey) : value;
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((lang) => lang !== language);
      } else {
        return [...prev, language];
      }
    });
    if (status !== "idle") {
      setStatus("idle");
      setError(null);
    }
  };

  const handleAddCustomLanguage = () => {
    const trimmed = customLanguage.trim();
    if (trimmed && !selectedLanguages.includes(trimmed)) {
      setSelectedLanguages((prev) => [...prev, trimmed]);
      setCustomLanguage("");
    }
  };

  const handleRemoveLanguage = (language: string) => {
    setSelectedLanguages((prev) => prev.filter((lang) => lang !== language));
    if (status !== "idle") {
      setStatus("idle");
      setError(null);
    }
  };

  const handleSave = async () => {
    // Filter out empty strings and trim
    const filteredLanguages = selectedLanguages
      .map((lang) => lang.trim())
      .filter((lang) => lang.length > 0);

    if (filteredLanguages.length === 0) {
      setError(t("validation.selectAtLeastOneLanguage"));
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
        `${BACKEND_URL}/api/v1/profile/update-languages`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ languages: filteredLanguages }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(
          data?.message || text || t("validation.failedUpdateLanguages")
        );
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
        age: updatedUser.age != null ? Number(updatedUser.age) : user?.age,
        gender: updatedUser.gender || undefined,
        languages: updatedUser.languages,
        createdAt: updatedUser.createdAt,
      });

      setStatus("success");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || t("validation.failedUpdateLanguages"));
      setStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.languages")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px] overflow-hidden">
          {isEditing ? (
            <div className="flex flex-col gap-[6px] mt-[6px]">
              <div className="max-h-[200px] overflow-y-auto overflow-x-hidden pr-[4px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[6px] min-w-0">
                  {COMMON_LANGUAGES.map((language) => (
                    <label
                      key={language.value}
                      className="flex items-center gap-[8px] cursor-pointer hover:bg-hover-bg/30 rounded-full px-[8px] py-[4px] transition-colors min-w-0"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(language.value)}
                        onChange={() => handleLanguageToggle(language.value)}
                        className="w-[16px] h-[16px] cursor-pointer accent-primary shrink-0"
                      />
                      <span className="text-[16px] sm:text-[17px] truncate min-w-0">
                        {t(language.labelKey)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom language input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[8px] mt-[8px] pt-[8px] border-t border-border-light">
                <input
                  type="text"
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomLanguage();
                    }
                  }}
                  placeholder={t("placeholders.customLanguage")}
                  className="flex-1 min-w-0 border border-border-light rounded-full px-[12px] py-[6px] bg-input-bg placeholder:text-input-placeholder outline-none focus:ring-2 focus:ring-primary/30"
                  style={{ fontSize: "16px" }}
                />
                <ProfileButton
                  type="button"
                  onClick={handleAddCustomLanguage}
                  disabled={!customLanguage.trim()}
                  variant="secondary"
                  className="px-[12px] shrink-0"
                >
                  {t("buttons.add")}
                </ProfileButton>
              </div>

              {/* Selected languages display */}
              {selectedLanguages.length > 0 && (
                <div className="mt-[8px] pt-[8px] border-t border-border-light">
                  <p className="text-[14px] sm:text-[15px] text-gray-500 mb-[6px]">
                    {t("labels.selectedLanguages")}
                  </p>
                  <div className="flex flex-wrap gap-[6px] overflow-x-auto">
                    {selectedLanguages.map((language) => (
                      <span
                        key={language}
                        className="inline-flex items-center gap-[6px] bg-primary/10 text-primary px-[10px] py-[4px] rounded-full text-[14px] sm:text-[15px] shrink-0"
                      >
                        <span className="whitespace-nowrap">
                          {getLanguageLabel(language)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLanguage(language)}
                          className="hover:text-red-600 transition-colors text-[16px] sm:text-[18px] font-bold leading-none w-[20px] h-[20px] flex items-center justify-center hover:bg-red-100 rounded-full shrink-0"
                          aria-label={t("languages.removeAria", {
                            language: getLanguageLabel(language),
                          })}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap mt-[8px]">
                <ProfileButton
                  type="button"
                  onClick={handleSave}
                  disabled={
                    status === "saving" || selectedLanguages.length === 0
                  }
                  variant="primary"
                  className="px-[12px] sm:px-[14px]"
                >
                  {status === "saving" ? t("buttons.saving") : t("buttons.save")}
                </ProfileButton>
                <ProfileButton
                  type="button"
                  onClick={() => {
                    setSelectedLanguages(user?.languages || []);
                    setIsEditing(false);
                    setStatus("idle");
                    setError(null);
                    setCustomLanguage("");
                  }}
                  variant="secondary"
                >
                  {t("buttons.cancel")}
                </ProfileButton>
                {status === "success" && (
                  <span className="text-xs text-green-600">
                    {t("status.languagesUpdated")}
                  </span>
                )}
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <div className="flex-1 min-w-0">
                {hasLanguages ? (
                  <div className="flex flex-wrap gap-[6px]">
                    {user?.languages?.map((language, index) => (
                      <span
                        key={index}
                        className="inline-block bg-[hsl(187,73%,24%)] text-white px-[10px] py-[4px] rounded-full text-[14px] sm:text-[15px]"
                      >
                        {getLanguageLabel(language)}
                      </span>
                    )) || []}
                  </div>
                ) : (
                  <p className="font-medium text-[16px] text-gray-500">
                    {t("values.notSet")}
                  </p>
                )}
              </div>
              <ProfileButton
                type="button"
                onClick={() => {
                  setSelectedLanguages(user?.languages || []);
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                  setCustomLanguage("");
                }}
                variant="secondary"
                className="shrink-0"
              >
                {hasLanguages ? t("buttons.edit") : t("buttons.set")}
              </ProfileButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
