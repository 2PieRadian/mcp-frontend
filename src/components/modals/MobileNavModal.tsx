import { useState, useEffect, lazy } from "react";
import { ChevronDown, Moon, X, UserCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = lazy(() => import("../LanguageSwitcher"));

interface MobileNavModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNavItem({
  textKey,
  onClick,
  to,
  ns = "navigation",
}: {
  textKey: string;
  onClick?: () => void;
  to?: string;
  ns?: string;
}) {
  const { t } = useTranslation(ns);
  return (
    <Link to={to || ""} onClick={onClick}>
      <div
        className="cursor-pointer text-light-text px-[25px] py-[12px] hover:bg-hover-bg rounded-full transition-colors duration-200 text-[16px]"
        onClick={onClick}
      >
        {t(textKey)}
      </div>
    </Link>
  );
}

export default function MobileNavModal({
  isOpen,
  onClose,
}: MobileNavModalProps) {
  const { t } = useTranslation(["common", "navigation"]);
  const { user } = useAuth();
  const location = useLocation();
  const [weHelpWithExpanded, setWeHelpWithExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative h-full bg-white flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center px-[25px] py-[20px] border-b border-gray-200 flex-shrink-0">
          <h1 className="text-[22px] font-semibold text-logo-heading">
            {t("appName", { ns: "common" })}
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-[20px] flex flex-col gap-[10px] overflow-y-auto flex-1">
          {/* We Help With - Expandable */}
          {user?.role !== "EXPERT" && (
            <div>
              <div
                className="flex items-center justify-between cursor-pointer px-[25px] py-[12px] hover:bg-hover-bg rounded-full transition-colors duration-200"
                onClick={() => setWeHelpWithExpanded(!weHelpWithExpanded)}
              >
                <span className="text-primary text-[16px]">
                  {t("weHelpWith", { ns: "navigation" })}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-primary transition-transform duration-200 ${
                    weHelpWithExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Nested list with animation */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  weHelpWithExpanded
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-[30px] pt-[10px] flex flex-col gap-[8px]">
                  <Link
                    to="/wellness-experts"
                    onClick={onClose}
                    className="px-[20px] py-[10px] text-[16px] text-primary rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t("wellnessExperts", { ns: "navigation" })}
                  </Link>
                  <Link
                    to="/education-experts"
                    onClick={onClose}
                    className="px-[20px] py-[10px] text-[16px] text-primary rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t("educationExperts", { ns: "navigation" })}
                  </Link>
                  <Link
                    to="/finance-experts"
                    onClick={onClose}
                    className="px-[20px] py-[10px] text-[16px] text-primary rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    {t("financeExperts", { ns: "navigation" })}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {user?.role !== "EXPERT" && (
            <MobileNavItem textKey="selfAssessment" to="/self-assessment" />
          )}
          {user?.role !== "EXPERT" && (
            <MobileNavItem textKey="findCounsellors" to="/find-counsellors" />
          )}
          <MobileNavItem textKey="articles" to="/articles" />
          {user?.role === "EXPERT" && (
            <>
              <MobileNavItem textKey="Home" to="/" onClick={onClose} />
              <MobileNavItem
                textKey="dashboard"
                to="/dashboard/expert"
                onClick={onClose}
              />
            </>
          )}
        </div>

        {/* Bottom section with login and icons */}
        <div className="p-[20px] border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
                <Moon size={20} className="text-primary" />
              </div>
            </div>

            {user ? (
              <Link
                to="/profile"
                className={`group p-[6px] rounded-full border border-border-light transition-colors flex items-center justify-center ${
                  location.pathname.startsWith("/profile")
                    ? "bg-border-light text-white"
                    : "hover:bg-border-light hover:text-white"
                }`}
                onClick={onClose}
                aria-label="Profile"
              >
                <UserCircle2
                  size={26}
                  className={`transition-colors ${
                    location.pathname.startsWith("/profile")
                      ? "text-white"
                      : "text-logo-heading group-hover:text-white"
                  }`}
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="border border-border-light text-primary transition-all duration-200 cursor-pointer rounded-full px-[20px] py-[8px] text-[15px] hover:bg-border-light hover:text-white"
                onClick={onClose}
              >
                {t("login", { ns: "common" })}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
