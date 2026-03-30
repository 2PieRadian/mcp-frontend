import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
  Languages as LanguagesIcon,
  Check,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { loginPathWithRedirect } from "../../lib/loginRedirect";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

interface MobileNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Focus returns here when the drawer closes (avoids focus inside aria-hidden). */
  menuTriggerRef?: React.RefObject<HTMLElement | null>;
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

type AssessmentDomain = "wellness" | "education" | "finance";

const MOBILE_ASSESSMENTS: Record<
  AssessmentDomain,
  { labelKey: string; slug: string }[]
> = {
  wellness: [
    { labelKey: "wellnessCardAdhdTitle", slug: "adhd" },
    { labelKey: "wellnessCardDietTitle", slug: "diet" },
    { labelKey: "wellnessCardRelationshipTitle", slug: "relationship" },
    { labelKey: "wellnessCardYogaTitle", slug: "yoga" },
  ],
  education: [
    { labelKey: "educationCardPathFinderTitle", slug: "path-finder" },
    { labelKey: "educationCardCareerPlanningTitle", slug: "career-planning" },
    { labelKey: "educationCardAcademicTitle", slug: "academic" },
  ],
  finance: [
    { labelKey: "financeCardGstTitle", slug: "gst-taxation" },
    { labelKey: "financeCardPlanningTitle", slug: "financial-planning" },
  ],
};

export default function MobileNavModal({
  isOpen,
  onClose,
  menuTriggerRef,
}: MobileNavModalProps) {
  const { t, i18n } = useTranslation(["common", "navigation", "quiz"]);
  const { user } = useAuth();
  const location = useLocation();
  const [weHelpWithExpanded, setWeHelpWithExpanded] = useState(false);
  const [selfAssessmentExpanded, setSelfAssessmentExpanded] = useState(false);
  const [languageExpanded, setLanguageExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const expertCategoriesRef = useRef<HTMLDivElement | null>(null);
  const selfAssessmentRef = useRef<HTMLDivElement | null>(null);
  const scrollLockRef = useRef<{
    scrollY: number;
    bodyOverflow: string;
    bodyPosition: string;
    bodyTop: string;
    bodyWidth: string;
    htmlOverflow: string;
  } | null>(null);

  const availableLanguages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  ];

  const currentLanguage =
    availableLanguages.find((lang) => lang.code === i18n.language) ||
    availableLanguages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLanguageExpanded(false);
  };

  // Restore body/html so the page is never left stuck (e.g. after navigation with menu open)
  const restoreScrollLock = () => {
    const body = document.body;
    const html = document.documentElement;
    const prev = scrollLockRef.current;

    // Always reset these styles regardless of whether we have saved values
    // This ensures we never leave the page in a stuck state
    html.style.overflow = prev?.htmlOverflow ?? "";
    body.style.overflow = prev?.bodyOverflow ?? "";
    body.style.position = prev?.bodyPosition || "";
    body.style.top = prev?.bodyTop ?? "";
    body.style.width = prev?.bodyWidth ?? "";

    // Restore scroll position
    if (typeof prev?.scrollY === "number") {
      window.scrollTo(0, prev.scrollY);
    }

    scrollLockRef.current = null;
  };

  // Force unlock body styles - used as a safety fallback
  const forceUnlockBody = () => {
    const body = document.body;
    const html = document.documentElement;

    // If body is in fixed position (locked state), force unlock
    if (body.style.position === "fixed") {
      const scrollY = Math.abs(parseInt(body.style.top || "0", 10));
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    }
  };

  // Robust scroll lock for mobile (prevents background page scroll, including iOS)
  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      const html = document.documentElement;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      scrollLockRef.current = {
        scrollY,
        bodyOverflow: body.style.overflow,
        bodyPosition: body.style.position,
        bodyTop: body.style.top,
        bodyWidth: body.style.width,
        htmlOverflow: html.style.overflow,
      };

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";

      return () => {
        restoreScrollLock();
      };
    }
  }, [isOpen]);

  // Unmount safeguard: always restore body when modal is removed (e.g. route change, resize to desktop)
  useEffect(() => {
    return () => {
      restoreScrollLock();
      // Extra safety: force unlock if body is still stuck
      forceUnlockBody();
    };
  }, []);

  // Handle page refresh/navigation - ensure body is unlocked when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isOpen) {
        forceUnlockBody();
      }
    };

    const handlePageShow = (e: PageTransitionEvent) => {
      // bfcache restoration (back/forward navigation)
      if (e.persisted && !isOpen) {
        forceUnlockBody();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when drawer opens for better keyboard UX
    const id = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(id);
  }, [isOpen]);

  // When closed, nothing inside the aria-hidden wrapper may retain focus (browser a11y warning).
  useLayoutEffect(() => {
    if (isOpen) return;
    const root = rootRef.current;
    const active = document.activeElement;
    if (!root || !active || !root.contains(active)) return;
    if (active instanceof HTMLElement) {
      if (menuTriggerRef?.current) {
        menuTriggerRef.current.focus();
      } else {
        active.blur();
      }
    }
  }, [isOpen, menuTriggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // GSAP animation for Expert Categories
  useEffect(() => {
    if (!expertCategoriesRef.current) return;

    const element = expertCategoriesRef.current;

    if (weHelpWithExpanded) {
      // Measure the content height by temporarily setting to auto
      const heightBefore = element.style.height;
      element.style.height = "auto";
      const targetHeight = element.scrollHeight;
      element.style.height = heightBefore;

      // Animate from 0 to measured height
      gsap.to(element, {
        height: targetHeight,
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // Animate to 0
      gsap.to(element, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [weHelpWithExpanded]);

  // GSAP animation for Self Assessment
  useEffect(() => {
    if (!selfAssessmentRef.current) return;

    const element = selfAssessmentRef.current;

    if (selfAssessmentExpanded) {
      const heightBefore = element.style.height;
      element.style.height = "auto";
      const targetHeight = element.scrollHeight;
      element.style.height = heightBefore;

      gsap.to(element, {
        height: targetHeight,
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(element, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [selfAssessmentExpanded]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop with blur effect */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={isOpen ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        className={`absolute inset-y-0 left-0 w-screen bg-white flex flex-col shadow-2xl transform-gpu transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center px-[25px] py-[20px] border-b border-gray-200 shrink-0">
          <h1 className="text-[22px] font-semibold text-logo-heading">
            {t("appName", { ns: "common" }) === "MindCurePath" ? (
              <>
                Mind<span className="text-[#62af9b]">Cure</span>Path
              </>
            ) : (
              t("appName", { ns: "common" })
            )}
          </h1>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-[20px] flex flex-col gap-[10px] overflow-y-auto flex-1">
          {/* Dashboard - first for logged-in non-expert users */}
          {user?.role !== "EXPERT" && user && (
            <MobileNavItem
              textKey="dashboard"
              to="/dashboard"
              onClick={onClose}
            />
          )}
          {/* We Help With - Expandable */}
          {user?.role !== "EXPERT" && (
            <div>
              <div
                className={`flex items-center justify-between cursor-pointer px-[20px] py-[14px] rounded-[16px] transition-colors duration-200 border ${
                  weHelpWithExpanded
                    ? "bg-gray-50 border-gray-200"
                    : "border-transparent hover:bg-hover-bg"
                }`}
                onClick={() => {
                  setWeHelpWithExpanded(!weHelpWithExpanded);
                  setSelfAssessmentExpanded(false);
                }}
              >
                <span className="text-primary text-[16px]">
                  {t("expertCategories", { ns: "navigation" })}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-primary transition-transform duration-200 ${
                    weHelpWithExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Nested list with GSAP animation */}
              <div
                ref={expertCategoriesRef}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="mt-[10px] ml-[18px] pl-[14px] border-l border-gray-200 flex flex-col gap-[6px] pb-[2px]">
                  <Link
                    to="/wellness-experts"
                    onClick={onClose}
                    className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">
                      {t("wellnessExperts", { ns: "navigation" })}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                  <Link
                    to="/education-experts"
                    onClick={onClose}
                    className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">
                      {t("educationExperts", { ns: "navigation" })}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                  <Link
                    to="/finance-experts"
                    onClick={onClose}
                    className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">
                      {t("financeExperts", { ns: "navigation" })}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {user?.role !== "EXPERT" && (
            <div>
              <div
                className={`flex items-center justify-between cursor-pointer px-[20px] py-[14px] rounded-[16px] transition-colors duration-200 border ${
                  selfAssessmentExpanded
                    ? "bg-gray-50 border-gray-200"
                    : "border-transparent hover:bg-hover-bg"
                }`}
                onClick={() => {
                  setSelfAssessmentExpanded(!selfAssessmentExpanded);
                  setWeHelpWithExpanded(false);
                }}
              >
                <span className="text-primary text-[16px]">
                  {t("selfAssessment", { ns: "navigation" })}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-primary transition-transform duration-200 ${
                    selfAssessmentExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                ref={selfAssessmentRef}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="mt-[10px] ml-[18px] pl-[14px] border-l border-gray-200 flex flex-col gap-[6px] pb-[2px]">
                  {(Object.keys(MOBILE_ASSESSMENTS) as AssessmentDomain[]).map(
                    (domain) => (
                      <div key={domain}>
                        <div className="text-[13px] font-medium text-gray-500 mt-3 first:mt-1 px-[14px] py-[4px]">
                          {t(
                            `common:${
                              domain === "wellness"
                                ? "wellnessAssessments"
                                : domain === "education"
                                  ? "educationAssessments"
                                  : "financeAssessments"
                            }`,
                          )}
                        </div>
                        {MOBILE_ASSESSMENTS[domain].map((a) => (
                          <Link
                            key={`${domain}:${a.slug}`}
                            to={`/assessments/${domain}/${a.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between px-[14px] py-[10px] text-[15px] text-[#304048] rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                          >
                            <span className="font-medium">
                              {t(`quiz:${a.labelKey}`)}
                            </span>
                            <ChevronRight size={16} className="text-gray-400" />
                          </Link>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
          {user?.role !== "EXPERT" && (
            <MobileNavItem textKey="findCounsellors" to="/find-counsellors" />
          )}
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

          <MobileNavItem textKey="articles" to="/articles" onClick={onClose} />

          {/* Profile/Login */}
          {user ? (
            <Link
              to="/profile"
              className={`group px-[25px] py-[12px] flex items-center gap-[12px] rounded-full transition-colors ${
                location.pathname.startsWith("/profile")
                  ? "bg-hover-bg"
                  : "hover:bg-hover-bg"
              }`}
              onClick={onClose}
            >
              <span className="text-light-text text-[16px]">
                {t("profile", { ns: "navigation" })}
              </span>
            </Link>
          ) : (
            <Link
              to={loginPathWithRedirect(location.pathname, location.search)}
              className="px-[25px] py-[12px] text-primary transition-all duration-200 cursor-pointer rounded-full text-[16px] hover:bg-hover-bg"
              onClick={onClose}
            >
              {t("login", { ns: "common" })}
            </Link>
          )}
        </div>

        {/* Bottom section with language switcher only */}
        <div className="p-[20px] border-t border-gray-200 shrink-0">
          {/* Language Switcher - Expandable */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer px-[12px] py-[8px] hover:bg-gray-50 rounded-full transition-colors duration-200"
              onClick={() => setLanguageExpanded(!languageExpanded)}
            >
              <div className="flex items-center gap-2">
                <LanguagesIcon size={20} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  {currentLanguage.nativeName}
                </span>
              </div>
              <ChevronDown
                size={15}
                className={`text-primary transition-transform duration-200 ${
                  languageExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Language list with animation */}
            <div
              className={`transition-all duration-300 ease-in-out scrollbar-hide ${
                languageExpanded
                  ? "max-h-[200px] opacity-100 overflow-y-auto"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="pl-[30px] pt-[8px] flex flex-col gap-[4px]">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-[15px] py-[8px] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      i18n.language === lang.code ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#304048]">
                        {lang.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lang.nativeName}
                      </span>
                    </div>
                    {i18n.language === lang.code && (
                      <Check size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
