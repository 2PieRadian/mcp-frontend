import { Check } from "lucide-react";

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type LanguageModalProps = {
  isOpen: boolean;
  availableLanguages: Language[];
  currentLanguageCode: string;
  onLanguageChange: (langCode: string) => void;
};

export default function LanguageModal({
  isOpen,
  availableLanguages,
  currentLanguageCode,
  onLanguageChange,
}: LanguageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[45px] right-0 bg-white rounded-[10px] shadow-lg border border-[hsl(0,0%,80%)] min-w-[180px] z-50 overflow-hidden">
      <div className="max-h-[300px] overflow-y-auto scrollbar-custom">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-full text-left px-[15px] py-[10px] hover:bg-[hsl(0,0%,96%)] cursor-pointer transition-colors flex items-center justify-between ${
              currentLanguageCode === lang.code ? "bg-[hsl(0,0%,95%)]" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#304048]">
                {lang.name}
              </span>
              <span className="text-xs text-gray-500">{lang.nativeName}</span>
            </div>
            {currentLanguageCode === lang.code && (
              <Check size={16} className="text-[#304048]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
