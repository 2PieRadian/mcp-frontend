import { ChevronDown, Moon, UserCircle2, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WeHelpWith from "./modals/WeHelpWith";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import MobileNavModal from "./modals/MobileNavModal";

const textColor = "hsl(194,57%,17%)";

function NavbarItem({ textKey, link }: { textKey: string; link: string }) {
  const { t } = useTranslation("navigation");
  return (
    <Link
      to={link}
      className="cursor-pointer text-light-text px-[15px] py-[5px] hover:bg-hover-bg rounded-full transition-colors duration-200"
    >
      {t(textKey)}
    </Link>
  );
}

function NavbarItemIcon({
  textKey,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive = false,
}: {
  textKey: string;
  icon: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
}) {
  const { t } = useTranslation("navigation");
  return (
    <div
      className={`px-[12px] py-[5px] flex items-center gap-[5px] rounded-full cursor-pointer hover:bg-hover-bg transition-colors duration-200 ${
        isActive ? "bg-hover-bg" : ""
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className="text-light-text">{t(textKey)}</p>
      {icon}
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const location = useLocation();
  const [weHelpWithModalOpen, setWeHelpWithModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarItemRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setWeHelpWithModalOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow moving to modal
    timeoutRef.current = setTimeout(() => {
      setWeHelpWithModalOpen(false);
    }, 100);
  };

  const handleModalMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleModalMouseLeave = () => {
    setWeHelpWithModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="navbar max-w-[1350px] mx-auto flex justify-between items-center py-[12px] sm:py-[20px] px-0">
        {/* Logo and App Name */}
        <div className="flex items-center gap-[8px] sm:gap-[10px] min-w-0 flex-1 sm:flex-initial">
        <img
          src="/images/navbar/logo.png"
          alt={t("appName") + " Logo"}
            className="w-[45px] sm:w-[60px] flex-shrink-0"
        />
        <Link
          to="/"
            className="text-[18px] sm:text-[22px] font-semibold text-logo-heading cursor-pointer truncate"
        >
          {t("appName") === "MindCurePath" ? (
            <>
              Mind<span className="text-[#45c2c7]">Cure</span>Path
            </>
          ) : (
            t("appName")
          )}
        </Link>
      </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-[2px] text-[13px] relative">
        {weHelpWithModalOpen && (
          <div
            onMouseEnter={handleModalMouseEnter}
            onMouseLeave={handleModalMouseLeave}
          >
            <WeHelpWith modalRef={modalRef} navbarType="landing" />
          </div>
        )}

        <div ref={navbarItemRef}>
          <NavbarItemIcon
            textKey="weHelpWith"
            icon={
              <ChevronDown
                size={15}
                className={`text-light-text transition-transform duration-200 ${
                  weHelpWithModalOpen ? "rotate-180" : ""
                }`}
              />
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isActive={weHelpWithModalOpen}
          />
        </div>
        <NavbarItem textKey="selfAssessment" link="/self-assessment" />
        <NavbarItem textKey="findCounsellors" link="/find-counsellors" />
        <NavbarItem textKey="articles" link="/articles" />
        {user?.role === "EXPERT" && (
          <NavbarItem textKey="dashboard" link="/dashboard/expert" />
        )}
      </div>

        {/* Right side controls */}
        <div className="flex items-center gap-[6px] sm:gap-2 flex-shrink-0">
          {/* Desktop Language Switcher and Moon - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2">
        <LanguageSwitcher />
        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Moon size={20} color={textColor} />
        </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="sm:hidden p-[8px] bg-light-100 rounded-full cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={20} color={textColor} />
          </button>

          {/* Profile/Login - Always visible */}
          {user ? (
            <Link
              to="/profile"
              className={`group p-[6px] rounded-full border border-border-light transition-colors flex items-center justify-center flex-shrink-0 ${
                location.pathname.startsWith("/profile")
                  ? "bg-border-light text-white"
                  : "hover:bg-border-light hover:text-white"
              }`}
              aria-label="Profile"
            >
              <UserCircle2
                size={22}
                className={`sm:w-[26px] sm:h-[26px] transition-colors ${
                  location.pathname.startsWith("/profile")
                    ? "text-white"
                    : "text-logo-heading group-hover:text-white"
                }`}
              />
            </Link>
          ) : (
        <Link
          to="/login"
              className={`border border-border-light text-[${textColor}] transition-all duration-200 cursor-pointer rounded-full px-[14px] sm:px-[20px] py-[6px] text-[13px] sm:text-[15px] bg-primary text-white hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]`}
        >
          {t("login")}
        </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Modal */}
      <MobileNavModal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
