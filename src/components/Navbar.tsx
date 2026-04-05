import { ChevronDown, UserCircle2, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WeHelpWith from "./modals/WeHelpWith";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import { loginPathWithRedirect } from "../lib/loginRedirect";
import MobileNavModal from "./modals/MobileNavModal";
import SelfAssmentsModal from "./modals/SelfAssmentsModal";

const textColor = "hsl(194,57%,17%)";

function NavbarItem({
  textKey,
  link,
  isActive = false,
}: {
  textKey: string;
  link: string;
  isActive?: boolean;
}) {
  const { t } = useTranslation("navigation");
  return (
    <Link
      to={link}
      className={`cursor-pointer text-light-text px-[15px] py-[5px] hover:bg-hover-bg rounded-full transition-colors duration-200 ${
        isActive ? "bg-hover-bg" : ""
      }`}
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
  const [selfAssessmentsModalOpen, setSelfAssessmentsModalOpen] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarItemRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const assessmentsModalRef = useRef<HTMLDivElement>(null);
  const assessmentsItemRef = useRef<HTMLDivElement>(null);
  const assessmentsTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Only one dropdown at a time
    setSelfAssessmentsModalOpen(false);
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

  const handleAssessmentsMouseEnter = () => {
    if (assessmentsTimeoutRef.current) {
      clearTimeout(assessmentsTimeoutRef.current);
      assessmentsTimeoutRef.current = null;
    }
    // Only one dropdown at a time
    setWeHelpWithModalOpen(false);
    setSelfAssessmentsModalOpen(true);
  };

  const handleAssessmentsMouseLeave = () => {
    assessmentsTimeoutRef.current = setTimeout(() => {
      setSelfAssessmentsModalOpen(false);
    }, 100);
  };

  const handleAssessmentsModalMouseEnter = () => {
    if (assessmentsTimeoutRef.current) {
      clearTimeout(assessmentsTimeoutRef.current);
      assessmentsTimeoutRef.current = null;
    }
  };

  const handleAssessmentsModalMouseLeave = () => {
    setSelfAssessmentsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (assessmentsTimeoutRef.current) {
        clearTimeout(assessmentsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="w-full bg-white">
        <div className="navbar max-w-[1350px] mx-auto flex justify-between items-center py-[16px] sm:py-[20px]">
          {/* Logo and App Name */}
          <div className="flex items-start gap-[8px] sm:gap-[10px] min-w-0 flex-1 sm:flex-initial pt-[2px]">
            <Link to="/" className="self-center">
              <img
                src="/images/navbar/logo.png"
                alt={t("appName") + " Logo"}
                className="w-[40px] sm:w-[52px] shrink-0"
              />
            </Link>
            <Link to="/" className="flex flex-col min-w-0">
              <span className="text-[18px] sm:text-[22px] font-semibold text-logo-heading cursor-pointer truncate">
                {t("appName") === "MindCurePath" ? (
                  <>
                    Mind<span className="text-[#62af9b]">Cure</span>Path
                  </>
                ) : (
                  t("appName")
                )}
              </span>
              <span className="text-[10px] sm:text-[12px] text-cure-color leading-tight mt-[-2px]">
                Guided by experts, driven by care, healing every mind
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div
            className={`hidden lg:flex items-center text-[13px] relative ${
              user?.role === "EXPERT" ? "gap-5" : "gap-[2px]"
            }`}
          >
            {selfAssessmentsModalOpen && user?.role !== "EXPERT" && (
              <div
                onMouseEnter={handleAssessmentsModalMouseEnter}
                onMouseLeave={handleAssessmentsModalMouseLeave}
              >
                <SelfAssmentsModal
                  modalRef={assessmentsModalRef}
                  navbarType="landing"
                />
              </div>
            )}
            {weHelpWithModalOpen && user?.role !== "EXPERT" && (
              <div
                onMouseEnter={handleModalMouseEnter}
                onMouseLeave={handleModalMouseLeave}
              >
                <WeHelpWith modalRef={modalRef} navbarType="landing" />
              </div>
            )}

            {user?.role !== "EXPERT" && user && (
              <NavbarItem
                textKey="dashboard"
                link="/dashboard"
                isActive={location.pathname === "/dashboard"}
              />
            )}
            {user?.role !== "EXPERT" && (
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
            )}
            {user?.role !== "EXPERT" && (
              <div ref={assessmentsItemRef}>
                <NavbarItemIcon
                  textKey="selfAssessment"
                  icon={
                    <ChevronDown
                      size={15}
                      className={`text-light-text transition-transform duration-200 ${
                        selfAssessmentsModalOpen ? "rotate-180" : ""
                      }`}
                    />
                  }
                  onMouseEnter={handleAssessmentsMouseEnter}
                  onMouseLeave={handleAssessmentsMouseLeave}
                  isActive={selfAssessmentsModalOpen}
                />
              </div>
            )}
            {user?.role === "EXPERT" && (
              <>
                <NavbarItem
                  textKey="Home"
                  link="/"
                  isActive={location.pathname === "/"}
                />
                <NavbarItem
                  textKey="dashboard"
                  link="/dashboard/expert"
                  isActive={location.pathname.startsWith("/dashboard")}
                />
              </>
            )}
            {user?.role !== "EXPERT" && (
              <NavbarItem textKey="findCounsellors" link="/find-counsellors" />
            )}
            <NavbarItem textKey="articles" link="/articles" />
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-[15px] shrink-0">
            {/* Desktop Language Switcher - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <LanguageSwitcher />
            </div>

            {/* Profile/Login - Always visible */}
            {user ? (
              user.avatarUrl ? (
                <Link
                  to="/profile"
                  className={`group flex items-center justify-center shrink-0 ${
                    location.pathname.startsWith("/profile") ? "" : ""
                  }`}
                  aria-label="Profile"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name || "Profile"}
                    className="w-[25px] h-[25px] sm:w-[33px] sm:h-[33px] rounded-full border border-gray-400 object-cover transition-transform duration-200 hover:scale-110 cursor-pointer"
                  />
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className={`group p-[6px] rounded-full border border-border-light transition-colors flex items-center justify-center shrink-0 ${
                    location.pathname.startsWith("/profile")
                      ? "bg-border-light text-white"
                      : "hover:bg-border-light hover:text-white"
                  }`}
                  aria-label="Profile"
                >
                  <UserCircle2
                    size={32}
                    className={`sm:w-[40px] sm:h-[40px] transition-colors ${
                      location.pathname.startsWith("/profile")
                        ? "text-white"
                        : "text-logo-heading group-hover:text-white"
                    }`}
                  />
                </Link>
              )
            ) : (
              <Link
                to={loginPathWithRedirect(location.pathname, location.search)}
                className={`border border-border-light text-[${textColor}] transition-all duration-200 cursor-pointer rounded-full px-[14px] sm:px-[20px] py-[6px] text-[13px] sm:text-[15px] bg-primary text-white hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]`}
              >
                {t("login")}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuTriggerRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden rounded-full cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={28} color={textColor} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Modal */}
      <MobileNavModal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuTriggerRef={mobileMenuTriggerRef}
      />
    </>
  );
}
