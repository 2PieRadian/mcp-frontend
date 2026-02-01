import { Check } from "lucide-react";

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type LanguageModalProps = {
  isOpen: boolean;
  variant?: "default" | "footer";
  availableLanguages: Language[];
  currentLanguageCode: string;
  onLanguageChange: (langCode: string) => void;
};

export default function LanguageModal({
  isOpen,
  variant = "default",
  availableLanguages,
  currentLanguageCode,
  onLanguageChange,
}: LanguageModalProps) {
  if (!isOpen) return null;

  const isFooter = variant === "footer";

  return (
    <div
      className={`absolute top-[45px] right-0 rounded-[10px] shadow-lg min-w-[180px] z-50 overflow-hidden ${
        isFooter
          ? "bg-[#0f1d32] border border-white/10"
          : "bg-white border border-[hsl(0,0%,80%)]"
      }`}
    >
      <div className="max-h-[300px] overflow-y-auto scrollbar-custom">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-full text-left px-[15px] py-[10px] cursor-pointer transition-colors flex items-center justify-between ${
              isFooter
                ? `hover:bg-white/10 ${currentLanguageCode === lang.code ? "bg-white/10" : ""}`
                : `hover:bg-[hsl(0,0%,96%)] ${currentLanguageCode === lang.code ? "bg-[hsl(0,0%,95%)]" : ""}`
            }`}
          >
            <div className="flex flex-col">
              <span
                className={`text-sm font-medium ${isFooter ? "text-slate-200" : "text-[#304048]"}`}
              >
                {lang.name}
              </span>
              <span
                className={`text-xs ${isFooter ? "text-slate-400" : "text-gray-500"}`}
              >
                {lang.nativeName}
              </span>
            </div>
            {currentLanguageCode === lang.code && (
              <Check
                size={16}
                className={isFooter ? "text-slate-200" : "text-[#304048]"}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
