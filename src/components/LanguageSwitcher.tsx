import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages as LanguagesIcon, ChevronDown } from "lucide-react";
import LanguageModal from "./modals/LanguageModal";

const availableLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "he", name: "Hinglish", nativeName: "Hinglish" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    availableLanguages.find((lang) => lang.code === i18n.language) ||
    availableLanguages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-[12px] py-[6px] bg-[hsl(0,0%,98%)] border border-[#304048]/30 rounded-full cursor-pointer hover:bg-light-200 transition-colors flex items-center gap-[8px]"
        aria-label="Change language"
      >
        <LanguagesIcon size={20} className="text-[#304048]" />
        <span className="text-sm font-medium text-[#304048]">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#304048] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <LanguageModal
        isOpen={isOpen}
        availableLanguages={availableLanguages}
        currentLanguageCode={i18n.language}
        onLanguageChange={changeLanguage}
      />
    </div>
  );
}
