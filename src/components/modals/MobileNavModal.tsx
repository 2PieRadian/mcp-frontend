import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollLockRef = useRef<{
    scrollY: number;
    bodyOverflow: string;
    bodyPosition: string;
    bodyTop: string;
    bodyWidth: string;
    htmlOverflow: string;
  } | null>(null);

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

  // Robust scroll lock for mobile (prevents background page scroll, including iOS)
  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      const html = document.documentElement;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      scrollLockRef.current = {
        scrollY,
        bodyOverflow: body.style.overflow,
        bodyPosition: body.style.position,
        bodyTop: body.style.top,
        bodyWidth: body.style.width,
        htmlOverflow: html.style.overflow,
      };

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";

      return () => {
        const prev = scrollLockRef.current;
        if (!prev) return;

        html.style.overflow = prev.htmlOverflow;
        body.style.overflow = prev.bodyOverflow;
        body.style.position = prev.bodyPosition;
        body.style.top = prev.bodyTop;
        body.style.width = prev.bodyWidth;
        window.scrollTo(0, prev.scrollY);
        scrollLockRef.current = null;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when drawer opens for better keyboard UX
    const id = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop with blur effect */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={isOpen ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        className={`absolute inset-y-0 left-0 w-screen bg-white flex flex-col shadow-2xl transform-gpu transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close"
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
                className={`flex items-center justify-between cursor-pointer px-[20px] py-[14px] rounded-[16px] transition-colors duration-200 border ${
                  weHelpWithExpanded
                    ? "bg-gray-50 border-gray-200"
                    : "border-transparent hover:bg-hover-bg"
                }`}
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
                <div className="mt-[10px] ml-[18px] pl-[14px] border-l border-gray-200 flex flex-col gap-[6px] pb-[2px]">
                  <Link
                    to="/wellness-experts"
                    onClick={onClose}
                    className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">
                      {t("wellnessExperts", { ns: "navigation" })}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                  <Link
                    to="/education-experts"
                    onClick={onClose}
                    className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">
                      {t("educationExperts", { ns: "navigation" })}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                  <Link
                    to="/finance-experts"
                    onClick={onClose}
                    className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">
                      {t("financeExperts", { ns: "navigation" })}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
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
