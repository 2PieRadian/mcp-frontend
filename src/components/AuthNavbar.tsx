import {
  Moon,
  Menu,
  Languages as LanguagesIcon,
  ChevronDown,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AuthNavbar() {
  const { t, i18n } = useTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <div className="auth-navbar w-full max-w-[1350px] mx-auto flex justify-between items-center py-[20px] relative">
      <Link to="/">
        <h1 className="text-[22px] font-semibold text-logo-heading">
          {t("appName") === "MindCurePath" ? (
            <>
              Mind<span className="text-[#119c95]">Cure</span>Path
            </>
          ) : (
            t("appName")
          )}
        </h1>
      </Link>

      {/* Desktop Logos */}
      <div className="hidden sm:flex items-center gap-2">
        <LanguageSwitcher />

        <div className="p-[8px] rounded-full cursor-pointer">
          <Moon size={20} color="hsl(194, 57%, 17%)" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden relative">
        <div
          className="p-[8px] rounded-full cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={28} color="hsl(194, 57%, 17%)" />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {/* Language Switcher - Expandable */}
            <div>
              <div
                className="p-3 hover:bg-light-100 cursor-pointer flex items-center justify-between"
                onClick={() => setLanguageExpanded(!languageExpanded)}
              >
                <div className="flex items-center gap-3">
                  <LanguagesIcon size={18} color="hsl(194, 57%, 17%)" />
                  <span className="text-logo-heading">
                    {currentLanguage.nativeName}
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-logo-heading transition-transform duration-200 ${
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
                <div className="pt-1 flex flex-col">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-[10px] cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between ${
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
                        <Check size={14} className="text-[#304048]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 hover:bg-light-100 cursor-pointer flex items-center gap-3">
              <Moon size={18} color="hsl(194, 57%, 17%)" />
              <span className="text-logo-heading">Color Scheme</span>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
