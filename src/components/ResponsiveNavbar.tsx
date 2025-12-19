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
        <div className="navbar max-w-[1350px] mx-auto flex justify-between items-center py-[12px] sm:py-[20px] px-0">
          <div className="flex items-center gap-[8px] sm:gap-[10px] min-w-0 flex-1 sm:flex-initial">
            <Link
              to="/"
              className="text-[18px] sm:text-[22px] font-semibold text-logo-heading cursor-pointer truncate"
            >
              {t("appName")}
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-[6px] sm:gap-2 shrink-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-[8px] bg-light-100 rounded-full cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={20} className="text-primary" />
            </button>

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
