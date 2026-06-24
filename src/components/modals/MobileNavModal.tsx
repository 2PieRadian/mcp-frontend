import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X,
  BookOpen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { loginPathWithRedirect } from "../../lib/loginRedirect";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import {
  getAssessmentsByDomain,
  type AssessmentDomain,
} from "../../lib/constants/assessmentCatalog";
import { EXPERT_CATEGORIES } from "../../lib/constants/experts";

function isMobileNavActive(to: string, pathname: string): boolean {
  if (to === "/") return pathname === "/";
  if (to === "/dashboard" || to === "/dashboard/expert") {
    return pathname === to;
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

interface MobileNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuTriggerRef?: React.RefObject<HTMLElement | null>;
}

function MobileNavItem({
  textKey,
  onClick,
  to,
  ns = "navigation",
  label,
}: {
  textKey: string;
  onClick?: () => void;
  to?: string;
  ns?: string;
  label?: string;
}) {
  const { t } = useTranslation(ns);
  const location = useLocation();
  const active = to ? isMobileNavActive(to, location.pathname) : false;

  return (
    <div className="border-b border-[#F0F0F0] bg-white">
      <Link to={to || ""} onClick={onClick} className="block px-5">
        <div className="flex cursor-pointer items-center justify-between py-[18px] transition-colors">
          <span
            className={`text-[17px] font-bold tracking-tight ${active ? "text-cure-color" : "text-[#1A1A1A]"}`}
          >
            {label ?? t(textKey)}
          </span>
        </div>
      </Link>
    </div>
  );
}

const ASSESSMENT_DOMAINS: AssessmentDomain[] = [
  "wellness",
  "education",
  "finance",
];

export default function MobileNavModal({
  isOpen,
  onClose,
  menuTriggerRef,
}: MobileNavModalProps) {
  const { t, i18n } = useTranslation([
    "common",
    "navigation",
    "quiz",
    "experts",
  ]);
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

  const restoreScrollLock = () => {
    const body = document.body;
    const html = document.documentElement;
    const prev = scrollLockRef.current;

    html.style.overflow = prev?.htmlOverflow ?? "";
    body.style.overflow = prev?.bodyOverflow ?? "";
    body.style.position = prev?.bodyPosition || "";
    body.style.top = prev?.bodyTop ?? "";
    body.style.width = prev?.bodyWidth ?? "";

    if (typeof prev?.scrollY === "number") {
      window.scrollTo(0, prev.scrollY);
    }

    scrollLockRef.current = null;
  };

  const forceUnlockBody = () => {
    const body = document.body;
    const html = document.documentElement;

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

  useEffect(() => {
    return () => {
      restoreScrollLock();
      forceUnlockBody();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isOpen) {
        forceUnlockBody();
      }
    };

    const handlePageShow = (e: PageTransitionEvent) => {
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
    const id = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);
    return () => window.clearTimeout(id);
  }, [isOpen]);

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

  useEffect(() => {
    if (!expertCategoriesRef.current) return;
    const element = expertCategoriesRef.current;
    if (weHelpWithExpanded) {
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
  }, [weHelpWithExpanded]);

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
      className={`fixed inset-0 z-70 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={isOpen ? onClose : undefined}
      />

      <div
        className={`absolute inset-y-0 left-0 w-screen flex flex-col bg-white shadow-2xl transform-gpu transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#F0F0F0] bg-white px-5 py-[14px]">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img
              src="/images/navbar/logo.png"
              alt={`${t("appName", { ns: "common" })} Logo`}
              className="h-10 w-10 object-contain"
            />
            <span className="text-[22px] font-bold tracking-tight text-logo-heading">
              {t("appName", { ns: "common" }) === "MindCurePath" ? (
                <>
                  Mind<span className="text-cure-color">Cure</span>Path
                </>
              ) : (
                t("appName", { ns: "common" })
              )}
            </span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="shrink-0 p-1 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={26} strokeWidth={1.5} className="text-[#1A1A1A]" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-white pt-1">
          {user?.role !== "EXPERT" && user && (
            <MobileNavItem
              textKey="dashboard"
              to="/dashboard"
              onClick={onClose}
            />
          )}

          {/* Expert Categories */}
          {user?.role !== "EXPERT" && (
            <div className="border-b border-[#F0F0F0] bg-white">
              <div
                className="flex cursor-pointer items-center justify-between py-[18px] px-5 transition-colors"
                onClick={() => {
                  setWeHelpWithExpanded(!weHelpWithExpanded);
                  setSelfAssessmentExpanded(false);
                }}
              >
                <span
                  className={`text-[17px] font-bold tracking-tight ${weHelpWithExpanded ? "text-cure-color" : "text-[#1A1A1A]"}`}
                >
                  {t("expertCategories", { ns: "navigation" })}
                </span>
                {weHelpWithExpanded ? (
                  <ChevronUp
                    size={20}
                    strokeWidth={2.5}
                    className="text-[#1A1A1A]"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    className="text-[#1A1A1A]"
                  />
                )}
              </div>

              <div
                ref={expertCategoriesRef}
                className="overflow-hidden bg-[#F7F8F9]"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="px-5 py-5">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 border-b border-[#E0E2E6] pb-2 mb-4">
                      <BookOpen
                        size={14}
                        strokeWidth={2.5}
                        className="text-[#6B7280]"
                      />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
                        {t("expertCategoriesHint", { ns: "navigation" })}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link
                        to="/wellness-experts"
                        onClick={onClose}
                        className="text-[14px] font-bold text-[#1A1A1A]"
                      >
                        {t("wellnessExperts", { ns: "navigation" })}
                      </Link>
                      <Link
                        to="/education-experts"
                        onClick={onClose}
                        className="text-[14px] font-bold text-[#1A1A1A]"
                      >
                        {t("educationExperts", { ns: "navigation" })}
                      </Link>
                      <div className="ml-4 flex flex-col gap-3">
                        {EXPERT_CATEGORIES.education.map((category) => (
                          <Link
                            key={category.slug}
                            to={`/education-experts/${category.slug}`}
                            onClick={onClose}
                            className="text-[13px] font-semibold text-[#4B5563]"
                          >
                            {t(`${category.i18nKey}.title`, { ns: "experts" })}
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/finance-experts"
                        onClick={onClose}
                        className="text-[14px] font-bold text-[#1A1A1A]"
                      >
                        {t("financeExperts", { ns: "navigation" })}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 pt-4">
                    <Link
                      to="/choose-expert-category"
                      onClick={onClose}
                      className="flex items-center gap-2 text-[13px] font-bold text-[#1A1A1A]"
                    >
                      <span>See all categories</span>
                      <div className="rounded-full border border-[#1A1A1A] p-0.5">
                        <ChevronRight size={12} strokeWidth={3} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Self Assessment */}
          {user?.role !== "EXPERT" && (
            <div className="border-b border-[#F0F0F0] bg-white">
              <div
                className="flex cursor-pointer items-center justify-between py-[18px] px-5 transition-colors"
                onClick={() => {
                  setSelfAssessmentExpanded(!selfAssessmentExpanded);
                  setWeHelpWithExpanded(false);
                }}
              >
                <span
                  className={`text-[17px] font-bold tracking-tight ${selfAssessmentExpanded ? "text-cure-color" : "text-[#1A1A1A]"}`}
                >
                  {t("selfAssessment", { ns: "navigation" })}
                </span>
                {selfAssessmentExpanded ? (
                  <ChevronUp
                    size={20}
                    strokeWidth={2.5}
                    className="text-[#1A1A1A]"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    className="text-[#1A1A1A]"
                  />
                )}
              </div>

              <div
                ref={selfAssessmentRef}
                className="overflow-hidden bg-[#F7F8F9]"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="px-5 py-5">
                  <div className="flex items-center gap-2 border-b border-[#E0E2E6] pb-2 mb-4">
                    <BookOpen
                      size={14}
                      strokeWidth={2.5}
                      className="text-[#6B7280]"
                    />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
                      {t("selfAssessmentHint", { ns: "navigation" })}
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    {ASSESSMENT_DOMAINS.map((domain) => (
                      <div key={domain} className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
                          {t(
                            `common:${domain === "wellness" ? "wellnessAssessments" : domain === "education" ? "educationAssessments" : "financeAssessments"}`,
                          )}
                        </span>
                        <div className="flex flex-col gap-3 pl-1">
                          {getAssessmentsByDomain(domain).map((assessment) => (
                            <Link
                              key={`${domain}:${assessment.slug}`}
                              to={`/assessments/${domain}/${assessment.slug}`}
                              onClick={onClose}
                              className="text-[14px] font-bold text-[#1A1A1A]"
                            >
                              {assessment.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E0E2E6]">
                    <Link
                      to="/self-assessment"
                      onClick={onClose}
                      className="flex items-center gap-2 text-[13px] font-bold text-[#1A1A1A]"
                    >
                      <span>See all assessments</span>
                      <div className="rounded-full border border-[#1A1A1A] p-0.5">
                        <ChevronRight size={12} strokeWidth={3} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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

          <MobileNavItem
            textKey="careers"
            label="Careers"
            to="/careers"
            onClick={onClose}
          />
          <MobileNavItem textKey="about" to="/about" onClick={onClose} />
          <MobileNavItem textKey="articles" to="/articles" onClick={onClose} />

          {/* Profile / Login */}
          <div className="bg-white">
            {user ? (
              <Link
                to="/profile"
                onClick={onClose}
                className="block px-5 py-[18px]"
              >
                <span className="text-[17px] font-bold tracking-tight text-[#1A1A1A]">
                  {t("profile", { ns: "navigation" })}
                </span>
              </Link>
            ) : (
              <Link
                to={loginPathWithRedirect(location.pathname, location.search)}
                onClick={onClose}
                className="block px-5 py-[18px]"
              >
                <span className="text-[17px] font-bold tracking-tight text-[#1A1A1A]">
                  {t("login", { ns: "common" })}
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Language Selector */}
        <div className="shrink-0 bg-white pb-4">
          <div className="border-t border-[#F0F0F0]">
            <div
              className="flex cursor-pointer items-center justify-between py-[16px] px-5 transition-colors"
              onClick={() => setLanguageExpanded(!languageExpanded)}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
                  {t("footerLanguage", { ns: "common" })}
                </span>
                <span className="text-[15px] font-bold tracking-tight text-[#1A1A1A]">
                  {currentLanguage.nativeName} (
                  {currentLanguage.code.toUpperCase()})
                </span>
              </div>
              {languageExpanded ? (
                <ChevronUp
                  size={20}
                  strokeWidth={2.5}
                  className="text-[#1A1A1A]"
                />
              ) : (
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  className="text-[#1A1A1A]"
                />
              )}
            </div>

            <div
              className={`transition-all duration-300 ease-in-out scrollbar-hide bg-[#F7F8F9] ${
                languageExpanded
                  ? "max-h-[240px] overflow-y-auto opacity-100"
                  : "max-h-0 overflow-hidden opacity-0"
              }`}
            >
              <div className="flex flex-col gap-4 px-5 py-5 border-t border-[#E0E2E6]">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-left text-[14px] ${
                      i18n.language === lang.code
                        ? "font-bold text-cure-color"
                        : "font-bold text-[#4B5563]"
                    }`}
                  >
                    {lang.name} — {lang.nativeName}
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
