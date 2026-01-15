import { useState } from "react";
import { Menu, UserCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import MobileNavModal from "./modals/MobileNavModal";
import { useScreen } from "../context/ScreenContext";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const textColor = "hsl(194,57%,17%)";

export default function ResponsiveNavbar() {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { screenWidth } = useScreen();

  if (screenWidth <= 1140) {
    return (
      <>
        {/* Mobile Header */}
        <div className="w-full bg-white">
          <div className="navbar max-w-[1350px] mx-auto flex justify-between items-center py-[16px] sm:py-[20px]">
            <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
              <Link to="/">
                <img
                  src="/images/navbar/logo.png"
                  alt={t("appName") + " Logo"}
                  className="w-[44px] sm:w-[75px] shrink-0"
                />
              </Link>
              <Link to="/" className="flex flex-col min-w-0">
                <span className="text-[20px] sm:text-[22px] font-semibold text-logo-heading cursor-pointer leading-none truncate">
                  {t("appName") === "MindCurePath" ? (
                    <>
                      Mind<span className="text-cure-color">Cure</span>Path
                    </>
                  ) : (
                    t("appName")
                  )}
                </span>
                <span className="mt-1 text-[9px] sm:text-[12px] text-cure-color leading-snug">
                  Guided by experts, driven by care, healing every mind
                </span>
              </Link>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-[7px] shrink-0">
              {/* Profile/Login Button */}
              {user ? (
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-full cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={30} className="text-primary" />
              </button>
            </div>
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

  // Desktop Navbar
  return <Navbar />;
}
