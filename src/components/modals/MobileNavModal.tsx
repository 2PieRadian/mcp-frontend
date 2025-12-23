import { useState, useEffect } from "react";
import {
  ChevronDown,
  X,
  Languages as LanguagesIcon,
  Check,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

interface MobileNavModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNavItem({
  textKey,
  onClick,
  to,
  ns = "navigation",
}: {
  textKey: string;
  onClick?: () => void;
  to?: string;
  ns?: string;
}) {
  const { t } = useTranslation(ns);
  return (
    <Link to={to || ""} onClick={onClick}>
      <div
        className="cursor-pointer text-light-text px-[25px] py-[12px] hover:bg-hover-bg rounded-full transition-colors duration-200 text-[16px]"
        onClick={onClick}
      >
        {t(textKey)}
      </div>
    </Link>
  );
}

export default function MobileNavModal({
  isOpen,
  onClose,
}: MobileNavModalProps) {
  const { t, i18n } = useTranslation(["common", "navigation"]);
  const { user } = useAuth();
  const location = useLocation();
  const [weHelpWithExpanded, setWeHelpWithExpanded] = useState(false);
  const [languageExpanded, setLanguageExpanded] = useState(false);

  const availableLanguages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  ];

  const currentLanguage =
    availableLanguages.find((lang) => lang.code === i18n.language) ||
    availableLanguages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLanguageExpanded(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative h-full bg-white flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center px-[25px] py-[20px] border-b border-gray-200 shrink-0">
          <h1 className="text-[22px] font-semibold text-logo-heading">
            {t("appName", { ns: "common" }) === "MindCurePath" ? (
              <>
                Mind<span className="text-[#119c95]">Cure</span>Path
              </>
            ) : (
              t("appName", { ns: "common" })
            )}
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-[20px] flex flex-col gap-[10px] overflow-y-auto flex-1">
          {/* We Help With - Expandable */}
          {user?.role !== "EXPERT" && (
            <div>
              <div
                className="flex items-center justify-between cursor-pointer px-[25px] py-[12px] hover:bg-hover-bg rounded-full transition-colors duration-200"
                onClick={() => setWeHelpWithExpanded(!weHelpWithExpanded)}
              >
                <span className="text-primary text-[16px]">
                  {t("expertCategories", { ns: "navigation" })}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-primary transition-transform duration-200 ${
                    weHelpWithExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Nested list with animation */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  weHelpWithExpanded
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-[30px] pt-[10px] flex flex-col gap-[8px]">
                  <Link
                    to="/wellness-experts"
                    onClick={onClose}
                    className="px-[20px] py-[10px] text-[16px] text-primary rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t("wellnessExperts", { ns: "navigation" })}
                  </Link>
                  <Link
                    to="/education-experts"
                    onClick={onClose}
                    className="px-[20px] py-[10px] text-[16px] text-primary rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t("educationExperts", { ns: "navigation" })}
                  </Link>
                  <Link
                    to="/finance-experts"
                    onClick={onClose}
                    className="px-[20px] py-[10px] text-[16px] text-primary rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t("financeExperts", { ns: "navigation" })}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {user?.role !== "EXPERT" && (
            <MobileNavItem textKey="selfAssessment" to="/self-assessment" />
          )}
          {user?.role !== "EXPERT" && (
            <MobileNavItem textKey="findCounsellors" to="/find-counsellors" />
          )}
          {user?.role === "EXPERT" && (
            <>
              <MobileNavItem textKey="Home" to="/" onClick={onClose} />
              <MobileNavItem
                textKey="dashboard"
                to="/dashboard/expert"
                onClick={onClose}
              />
            </>
          )}

          {/* Profile/Login */}
          {user ? (
            <Link
              to="/profile"
              className={`group px-[25px] py-[12px] flex items-center gap-[12px] rounded-full transition-colors ${
                location.pathname.startsWith("/profile")
                  ? "bg-hover-bg"
                  : "hover:bg-hover-bg"
              }`}
              onClick={onClose}
            >
              <span className="text-light-text text-[16px]">
                {t("profile", { ns: "navigation" })}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-[25px] py-[12px] text-primary transition-all duration-200 cursor-pointer rounded-full text-[16px] hover:bg-hover-bg"
              onClick={onClose}
            >
              {t("login", { ns: "common" })}
            </Link>
          )}
        </div>

        {/* Bottom section with language switcher only */}
        <div className="p-[20px] border-t border-gray-200 shrink-0">
          {/* Language Switcher - Expandable */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer px-[12px] py-[8px] hover:bg-gray-50 rounded-full transition-colors duration-200"
              onClick={() => setLanguageExpanded(!languageExpanded)}
            >
              <div className="flex items-center gap-2">
                <LanguagesIcon size={20} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  {currentLanguage.nativeName}
                </span>
              </div>
              <ChevronDown
                size={15}
                className={`text-primary transition-transform duration-200 ${
                  languageExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Language list with animation */}
            <div
              className={`transition-all duration-300 ease-in-out scrollbar-hide ${
                languageExpanded
                  ? "max-h-[200px] opacity-100 overflow-y-auto"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="pl-[30px] pt-[8px] flex flex-col gap-[4px]">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-[15px] py-[8px] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      i18n.language === lang.code ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#304048]">
                        {lang.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lang.nativeName}
                      </span>
                    </div>
                    {i18n.language === lang.code && (
                      <Check size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
