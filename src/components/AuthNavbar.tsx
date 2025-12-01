import { Moon, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AuthNavbar() {
  const { t } = useTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="auth-navbar w-full max-w-[1350px] mx-auto flex justify-between items-center py-[20px] relative">
      <Link to="/">
        <h1 className="text-[22px] font-semibold text-logo-heading">
          {t("appName")}
        </h1>
      </Link>

      {/* Desktop Logos */}
      <div className="hidden sm:flex items-center gap-2">
        <LanguageSwitcher />

        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Moon size={20} color="hsl(194, 57%, 17%)" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden relative">
        <div
          className="p-[8px] bg-light-100 rounded-full cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={20} color="hsl(194, 57%, 17%)" />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <LanguageSwitcher />
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
