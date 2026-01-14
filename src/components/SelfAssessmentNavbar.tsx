import { Moon, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SelfAssessmentNavbar() {
  const { t } = useTranslation(["common", "navigation"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="auth-navbar max-w-[1350px] mx-auto flex gap-4 justify-between items-center py-[16px] sm:py-[20px] relative">
      <div className="flex items-center gap-4">
        <Link to="/">
          <h1 className="text-[clamp(14px,4vw,20px)] font-medium text-logo-heading">
            {t("appName", { ns: "common" })}
          </h1>
        </Link>
        <p className="text-[20px] text-logo-heading">&bull;</p>
        <p className="text-[clamp(14px,4vw,20px)] whitespace-nowrap font-medium text-logo-heading">
          {t("selfAssessment", { ns: "navigation" })}
        </p>
      </div>

      {/* Desktop Logos */}
      <div className="hidden sm:flex items-center gap-2">
        <LanguageSwitcher />

        <div className="p-[8px] rounded-full cursor-pointer">
          <Moon size={20} color="#40555E" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden relative">
        <div
          className="p-[8px] rounded-full cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={28} color="#40555E" className="cursor-pointer" />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-300 py-2 z-50">
            <LanguageSwitcher />
            <div className="p-3 hover:bg-light-100 cursor-pointer flex items-center gap-3">
              <Moon size={18} color="#40555E" />
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
