import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

function XIcon({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M18.9 2H22L14.95 10.06 23.25 22H16.8l-5.06-7.19L5.45 22H2.35l7.64-8.74L1.05 2H7.7l4.58 6.53L18.9 2Zm-1.09 18.2h1.72L6.77 3.7H4.92L17.81 20.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ThreadsIcon({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12.001 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75-4.366-9.75-9.75-9.75Zm0 2.2c2.43 0 4.52 1.088 5.917 2.938l-1.664 1.06c-1.07-1.36-2.505-2.06-4.253-2.06-2.495 0-4.255 1.495-4.255 3.634 0 1.931 1.268 3.158 3.77 3.65l1.152.229c1.378.275 2.037.65 2.037 1.44 0 .93-.955 1.563-2.378 1.563-1.577 0-2.8-.662-3.787-2.03l-1.67 1.03c1.32 1.964 3.237 2.99 5.49 2.99 2.657 0 4.85-1.38 4.85-3.717 0-2.023-1.395-3.15-3.95-3.66l-1.13-.224c-1.41-.282-1.88-.63-1.88-1.39 0-.86.8-1.497 2.155-1.497 1.3 0 2.334.52 3.153 1.586l1.61-1.08c.474.7.798 1.51.93 2.392.09.6.096 1.194.036 1.78-.178 1.716-.972 3.134-2.334 4.106-1.205.86-2.764 1.31-4.48 1.31-3.93 0-6.83-2.95-6.83-6.95 0-4.058 2.98-6.95 7.35-6.95Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation("common");
  const linkedinURL = "https://www.linkedin.com/company/mindcurepath-official";
  const instagramURL = "https://www.instagram.com/mindcurepath/";
  const xURL = "https://x.com/mindcurepath";
  const facebookURL = "https://www.facebook.com/profile.php?id=61585370654255";
  const threadsURL = "https://www.threads.net/@mindcurepath";

  return (
    <footer className="mt-10 w-full bg-linear-to-b from-[#0b1220] via-[#0a1528] to-[#08101f] text-slate-200 pb-[30px] pt-[10px]">
      <div>
        <div className="mx-auto max-w-7xl py-10 sm:py-12 md:py-14 lg:py-16 px-5 sm:px-6 lg:px-8">
          {/* Main Footer Content - Single row on desktop */}
          <div className="flex flex-col gap-12 sm:gap-14 lg:flex-row lg:gap-12 lg:justify-between">
            {/* Brand Section */}
            <div className="flex flex-col items-center lg:items-start space-y-5 sm:space-y-4 lg:max-w-xs">
              <Link
                to="/"
                className="group flex flex-col items-center lg:items-start gap-3 text-center lg:text-left transition-opacity hover:opacity-90"
              >
                <img
                  src="/images/footer/company_logo.png"
                  alt={`${t("appName")} Logo`}
                  className="h-24 w-auto lg:h-28"
                  loading="lazy"
                />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    {t("appName")}
                  </h2>
                  <p className="text-sm text-slate-300 sm:text-base leading-tight">
                    {t("footerTagline")}
                  </p>
                </div>
              </Link>

              {/* <p className="text-sm leading-relaxed text-slate-400 text-center lg:text-left sm:text-base max-w-[28ch]">
                {t("footerTagline", {
                  defaultValue:
                    "Mental wellness tools and expert-backed guidance.",
                })}
              </p> */}

              {/* Social Links */}
              <div
                aria-label={t("connectWithUs")}
                className="flex items-center gap-2"
              >
                <a
                  href={instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerInstagram")}
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerLinkedIn")}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={xURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerX")}
                >
                  <XIcon size={18} />
                </a>
                <a
                  href={facebookURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerFacebook")}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={threadsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerThreads")}
                >
                  <ThreadsIcon size={18} />
                </a>
              </div>

              {/* Language Switcher */}
              <div className="flex flex-col items-center lg:items-start gap-2 mt-[10px]">
                <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  {t("footerLanguage")}
                </span>
                <LanguageSwitcher variant="footer" />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-8 lg:flex lg:gap-12">
              {/* Quick Links */}
              <nav
                aria-label={t("quickLinks")}
                className="space-y-4 sm:space-y-3"
              >
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  {t("quickLinks")}
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/self-assessment"
                    >
                      {t("selfAssessment", { ns: "navigation" })}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/assessments/wellness"
                    >
                      {t("wellnessAssessments")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/assessments/education"
                    >
                      {t("educationAssessments")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/assessments/finance"
                    >
                      {t("financeAssessments")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/find-counsellors"
                    >
                      {t("findCounsellors", { ns: "navigation" })}
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Support */}
              <nav
                aria-label={t("support")}
                className="space-y-4 sm:space-y-3"
              >
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  {t("support")}
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/contact"
                    >
                      {t("contact")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/faq"
                    >
                      {t("faq")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/help"
                    >
                      {t("helpCenter")}
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Legal */}
              <nav
                aria-label={t("legal")}
                className="space-y-4 sm:space-y-3 col-span-2 sm:col-span-1"
              >
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  {t("legal")}
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/privacy-policy"
                    >
                      {t("privacyPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/terms-and-conditions"
                    >
                      {t("termsAndConditions")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/terms-of-use"
                    >
                      {t("termsOfUse")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8 w-full">
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center sm:text-left w-full">
              <span className="font-semibold text-slate-300">{t("footerDisclaimerLabel")}</span>{" "}
              {t("footerDisclaimerText")}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-white/10 pt-5 sm:pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400 text-center sm:text-left sm:text-base">
                © {new Date().getFullYear()} {t("appName")}.{" "}
                {t("allRightsReserved")}
              </p>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-slate-400 sm:justify-end sm:gap-x-5 sm:text-base">
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/privacy-policy"
                >
                  {t("footerPrivacy")}
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/terms-and-conditions"
                >
                  {t("footerTerms")}
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/terms-of-use"
                >
                  {t("footerUsePolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
