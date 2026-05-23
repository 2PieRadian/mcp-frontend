import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
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

/** Active state for top-level nav items (dashboard is exact; articles allows detail routes). */
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
  /** Focus returns here when the drawer closes (avoids focus inside aria-hidden). */
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
    <Link to={to || ""} onClick={onClick} className="block">
      <div
        className={`cursor-pointer rounded-xl px-4 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-200 border shadow-sm ${
          active
            ? "bg-[hsl(173,35%,92%)] border-cure-color/35 text-logo-heading ring-1 ring-cure-color/25"
            : "border-slate-200 bg-white text-logo-heading hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.99]"
        }`}
      >
        {label ?? t(textKey)}
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
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={isOpen ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        className={`absolute inset-y-0 left-0 w-screen flex flex-col bg-white shadow-2xl transform-gpu transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header: logo, brand, close */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex min-w-0 flex-1 items-start gap-3 pt-0.5"
          >
            <img
              src="/images/navbar/logo.png"
              alt={`${t("appName", { ns: "common" })} Logo`}
              className="h-11 w-11 shrink-0 self-center object-contain"
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[20px] font-semibold leading-tight text-logo-heading">
                {t("appName", { ns: "common" }) === "MindCurePath" ? (
                  <>
                    Mind<span className="text-cure-color">Cure</span>Path
                  </>
                ) : (
                  t("appName", { ns: "common" })
                )}
              </span>
              <span className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-cure-color">
                Guided by experts, driven by care, healing every mind
              </span>
            </div>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 ring-1 ring-transparent transition-colors duration-200 hover:bg-slate-100 hover:ring-slate-200"
            aria-label="Close"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 p-5">
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
            <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <div
                className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3.5 transition-colors duration-200 ${
                  weHelpWithExpanded
                    ? "bg-slate-100 shadow-inner"
                    : "hover:bg-slate-50"
                }`}
                onClick={() => {
                  setWeHelpWithExpanded(!weHelpWithExpanded);
                  setSelfAssessmentExpanded(false);
                }}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[15px] font-semibold text-logo-heading leading-tight">
                    {t("expertCategories", { ns: "navigation" })}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  strokeWidth={2.25}
                  className={`shrink-0 text-primary transition-transform duration-200 ${
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
                <div className="mx-1 mb-2 mt-1 rounded-xl border border-slate-200 bg-slate-100 p-2 shadow-inner">
                  <p className="px-2 pb-2 pt-1 text-[11px] font-medium leading-snug text-slate-500">
                    {t("expertCategoriesHint", { ns: "navigation" })}
                  </p>
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/wellness-experts"
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-transparent bg-white px-3 py-2.5 text-[13px] font-medium text-slate-600 shadow-sm transition-all hover:border-cure-color/25 hover:bg-white hover:text-logo-heading hover:shadow-md active:scale-[0.99]"
                    >
                      <span>{t("wellnessExperts", { ns: "navigation" })}</span>
                      <ChevronRight
                        size={16}
                        className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cure-color"
                      />
                    </Link>
                    <Link
                      to="/education-experts"
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-transparent bg-white px-3 py-2.5 text-[13px] font-medium text-slate-600 shadow-sm transition-all hover:border-cure-color/25 hover:bg-white hover:text-logo-heading hover:shadow-md active:scale-[0.99]"
                    >
                      <span>{t("educationExperts", { ns: "navigation" })}</span>
                      <ChevronRight
                        size={16}
                        className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cure-color"
                      />
                    </Link>
                    <Link
                      to="/finance-experts"
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-transparent bg-white px-3 py-2.5 text-[13px] font-medium text-slate-600 shadow-sm transition-all hover:border-cure-color/25 hover:bg-white hover:text-logo-heading hover:shadow-md active:scale-[0.99]"
                    >
                      <span>{t("financeExperts", { ns: "navigation" })}</span>
                      <ChevronRight
                        size={16}
                        className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cure-color"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user?.role !== "EXPERT" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <div
                className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3.5 transition-colors duration-200 ${
                  selfAssessmentExpanded
                    ? "bg-slate-100 shadow-inner"
                    : "hover:bg-slate-50"
                }`}
                onClick={() => {
                  setSelfAssessmentExpanded(!selfAssessmentExpanded);
                  setWeHelpWithExpanded(false);
                }}
              >
                <span className="text-[15px] font-semibold text-logo-heading leading-tight pr-2">
                  {t("selfAssessment", { ns: "navigation" })}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2.25}
                  className={`shrink-0 text-primary transition-transform duration-200 ${
                    selfAssessmentExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                ref={selfAssessmentRef}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="mx-1 mb-2 mt-1 rounded-xl border border-slate-200 bg-slate-100 p-2 shadow-inner">
                  <p className="px-2 pb-2 pt-1 text-[11px] font-medium leading-snug text-slate-500">
                    {t("selfAssessmentHint", { ns: "navigation" })}
                  </p>
                  <div className="flex flex-col gap-3">
                    {(
                      Object.keys(MOBILE_ASSESSMENTS) as AssessmentDomain[]
                    ).map((domain) => (
                      <div key={domain} className="relative">
                        <div
                          className="mb-1.5 flex items-center gap-2 border-b border-slate-200 pb-1.5 pl-1"
                          aria-hidden
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cure-color" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-cure-color">
                            {t(
                              `common:${
                                domain === "wellness"
                                  ? "wellnessAssessments"
                                  : domain === "education"
                                    ? "educationAssessments"
                                    : "financeAssessments"
                              }`,
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 pl-0.5">
                          {MOBILE_ASSESSMENTS[domain].map((a) => (
                            <Link
                              key={`${domain}:${a.slug}`}
                              to={`/assessments/${domain}/${a.slug}`}
                              onClick={onClose}
                              className="group flex items-center justify-between gap-2 rounded-lg border border-transparent bg-white px-3 py-2.5 text-[13px] font-medium text-slate-600 shadow-sm transition-all hover:border-cure-color/25 hover:bg-white hover:text-logo-heading hover:shadow-md active:scale-[0.99]"
                            >
                              <span className="leading-snug">
                                {t(`quiz:${a.labelKey}`)}
                              </span>
                              <ChevronRight
                                size={16}
                                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cure-color"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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

          <MobileNavItem
            textKey="careers"
            label="Careers"
            to="/careers"
            onClick={onClose}
          />
          <MobileNavItem textKey="articles" to="/articles" onClick={onClose} />

          {/* Profile/Login — same visual weight as other primary links */}
          {user ? (
            <Link to="/profile" onClick={onClose} className="block">
              <div
                className={`rounded-xl px-4 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-200 border shadow-sm ${
                  location.pathname.startsWith("/profile")
                    ? "bg-[hsl(173,35%,92%)] border-cure-color/35 text-logo-heading ring-1 ring-cure-color/25"
                    : "border-slate-200 bg-white text-logo-heading hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.99]"
                }`}
              >
                {t("profile", { ns: "navigation" })}
              </div>
            </Link>
          ) : (
            <Link
              to={loginPathWithRedirect(location.pathname, location.search)}
              onClick={onClose}
              className="block rounded-xl border border-primary/25 bg-primary px-4 py-3.5 text-center text-[15px] font-semibold text-white shadow-md shadow-primary/20 transition-all hover:brightness-105 active:scale-[0.99]"
            >
              {t("login", { ns: "common" })}
            </Link>
          )}
        </div>

        {/* Bottom: language — nested list style matches expandable sections */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
          <div className="rounded-2xl border border-slate-200 bg-slate-100 p-1">
            <div
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 transition-colors ${
                languageExpanded ? "bg-white shadow-inner" : "hover:bg-slate-50"
              }`}
              onClick={() => setLanguageExpanded(!languageExpanded)}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                  <LanguagesIcon size={20} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {t("footerLanguage", { ns: "common" })}
                  </p>
                  <p className="truncate text-[14px] font-semibold text-logo-heading">
                    {currentLanguage.nativeName}
                  </p>
                </div>
              </div>
              {languageExpanded ? (
                <ChevronDown
                  size={18}
                  strokeWidth={2.25}
                  className="shrink-0 text-primary transition-transform duration-200"
                />
              ) : (
                <ChevronUp
                  size={18}
                  strokeWidth={2.25}
                  className="shrink-0 text-primary transition-transform duration-200"
                />
              )}
            </div>

            <div
              className={`transition-all duration-300 ease-in-out scrollbar-hide ${
                languageExpanded
                  ? "max-h-[220px] overflow-y-auto opacity-100"
                  : "max-h-0 overflow-hidden opacity-0"
              }`}
            >
              <div className="mt-1 space-y-1 border-t border-slate-200 px-2 pb-2 pt-2">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-[13px] transition-all ${
                      i18n.language === lang.code
                        ? "border-cure-color/40 bg-white font-semibold text-logo-heading shadow-sm ring-1 ring-cure-color/20"
                        : "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-logo-heading"
                    }`}
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-medium">{lang.name}</span>
                      <span className="truncate text-[11px] text-slate-500">
                        {lang.nativeName}
                      </span>
                    </div>
                    {i18n.language === lang.code && (
                      <Check size={16} className="shrink-0 text-cure-color" />
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
