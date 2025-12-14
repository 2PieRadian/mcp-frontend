import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL, getAvatarUrl } from "../../lib/api";

const COMMON_LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Sanskrit",
  "Konkani",
  "Manipuri",
  "Sindhi",
  "Kashmiri",
  "Bodo",
  "Dogri",
  "Maithili",
  "Santali",
];

export default function LanguagesCard() {
  const { user, login } = useAuth();
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
      setError("Please select at least one language");
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
        throw new Error(data?.message || text || "Failed to update languages");
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
      setError(error?.message || "Failed to update languages");
      setStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Languages You Speak
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          {isEditing ? (
            <div className="flex flex-col gap-[6px] mt-[6px]">
              <div className="max-h-[200px] overflow-y-auto space-y-[8px]">
                {COMMON_LANGUAGES.map((language) => (
                  <label
                    key={language}
                    className="flex items-center gap-[8px] cursor-pointer hover:bg-hover-bg/30 rounded-full px-[8px] py-[4px] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => handleLanguageToggle(language)}
                      className="w-[16px] h-[16px] cursor-pointer accent-primary"
                    />
                    <span className="text-[13px] sm:text-[14px]">
                      {language}
                    </span>
                  </label>
                ))}
              </div>

              {/* Custom language input */}
              <div className="flex items-center gap-[8px] mt-[8px] pt-[8px] border-t border-border-light">
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
                  placeholder="Add custom language"
                  className="flex-1 border border-border-light rounded-full px-[12px] py-[6px] text-[13px] sm:text-[14px] bg-input-bg placeholder:text-input-placeholder outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={handleAddCustomLanguage}
                  disabled={!customLanguage.trim()}
                  className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[12px] py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Selected languages display */}
              {selectedLanguages.length > 0 && (
                <div className="mt-[8px] pt-[8px] border-t border-border-light">
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-[6px]">
                    Selected Languages:
                  </p>
                  <div className="flex flex-wrap gap-[6px]">
                    {selectedLanguages.map((language) => (
                      <span
                        key={language}
                        className="inline-flex items-center gap-[6px] bg-primary/10 text-primary px-[10px] py-[4px] rounded-full text-[12px] sm:text-[13px]"
                      >
                        {language}
                        <button
                          type="button"
                          onClick={() => handleRemoveLanguage(language)}
                          className="hover:text-red-600 transition-colors text-[16px] sm:text-[18px] font-bold leading-none w-[20px] h-[20px] flex items-center justify-center hover:bg-red-100 rounded-full"
                          aria-label={`Remove ${language}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap mt-[8px]">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={
                    status === "saving" || selectedLanguages.length === 0
                  }
                  className="cursor-pointer bg-primary text-light-100 text-[11px] sm:text-xs font-medium rounded-full px-[12px] sm:px-[14px] py-[8px] sm:py-[6px] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "saving" ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLanguages(user?.languages || []);
                    setIsEditing(false);
                    setStatus("idle");
                    setError(null);
                    setCustomLanguage("");
                  }}
                  className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[8px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                  style={{ cursor: "pointer" }}
                >
                  Cancel
                </button>
                {status === "success" && (
                  <span className="text-xs text-green-600">
                    Languages updated
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
                        className="inline-block bg-[hsl(187,73%,24%)] text-white px-[10px] py-[4px] rounded-full text-[12px] sm:text-[13px]"
                      >
                        {language}
                      </span>
                    )) || []}
                  </div>
                ) : (
                  <p className="font-medium text-gray-500">Not Set</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedLanguages(user?.languages || []);
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                  setCustomLanguage("");
                }}
                className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[6px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] flex-shrink-0"
              >
                {hasLanguages ? "Edit" : "Set"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
