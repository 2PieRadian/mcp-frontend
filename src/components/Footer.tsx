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
    <footer className="mt-10 w-full bg-gradient-to-br from-[#187360] via-[#115e4c] to-[#0d3f33] animate-gradient-x text-white pb-[40px] sm:pb-[30px] pt-[10px] relative overflow-hidden">
      <style>
        {`
          @keyframes blob-bounce {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(15vw, -15vh) scale(1.4); }
            66% { transform: translate(-10vw, 10vh) scale(0.8); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float-up {
            0% { transform: translateY(0) scale(0.8); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-800px) scale(1.2); opacity: 0; }
          }
          .animate-blob {
            animation: blob-bounce 18s infinite ease-in-out;
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
          }
          .animate-float {
            animation: float-up linear infinite;
            opacity: 0;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animation-delay-6000 { animation-delay: 6s; }
        `}
      </style>

      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Giant Blobs */}
        {/* <div className="absolute -top-[40%] -left-[20%] w-[100%] max-w-[1200px] aspect-square rounded-full bg-[#34d399] blur-[150px] opacity-40 animate-blob" />
        <div className="absolute top-[0%] -right-[30%] w-[120%] max-w-[1400px] aspect-square rounded-full bg-[#a7f3d0] blur-[180px] opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[50%] left-[10%] w-[110%] max-w-[1300px] aspect-square rounded-full bg-[#6ee7b7] blur-[160px] opacity-35 animate-blob animation-delay-4000" />
        <div className="absolute top-[20%] left-[30%] w-[90%] max-w-[1000px] aspect-square rounded-full bg-[#14b8a6] blur-[200px] opacity-30 animate-blob animation-delay-6000" /> */}

        {/* Mid-sized Floating Elements (approx 20px radius) */}
        {[...Array(25)].map((_, i) => {
          const size = 20 + (i % 25);
          const left = (i * 17) % 100;
          const delay = (i * 0.7) % 15;
          const duration = 15 + (i % 10);
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-float backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: "100%",
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}

        {/* Animated noise texture overlay for extra premium feel */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      <div className="relative z-10">
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
                  <p className="text-sm text-white sm:text-base leading-tight">
                    {t("footerTagline")}
                  </p>
                </div>
              </Link>

              {/* <p className="text-sm leading-relaxed text-white text-center lg:text-left sm:text-base max-w-[28ch]">
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerInstagram")}
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerLinkedIn")}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={xURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerX")}
                >
                  <XIcon size={18} />
                </a>
                <a
                  href={facebookURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerFacebook")}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={threadsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
                  aria-label={t("footerThreads")}
                >
                  <ThreadsIcon size={18} />
                </a>
              </div>

              {/* Language Switcher */}
              <div className="flex flex-col items-center lg:items-start gap-2 mt-[10px]">
                <span className="text-xs font-semibold tracking-wide text-white uppercase">
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
                <ul className="space-y-2 text-sm text-white">
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/about"
                    >
                      {t("about", { ns: "navigation" })}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/careers"
                    >
                      {t("careers", {
                        ns: "navigation",
                        defaultValue: "Careers",
                      })}
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
              <nav aria-label={t("support")} className="space-y-4 sm:space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  {t("support")}
                </h3>
                <ul className="space-y-2 text-sm text-white">
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
                  <li>
                    <Link
                      className="transition-colors duration-200 hover:text-white"
                      to="/delete-account"
                    >
                      {t("deleteAccount", { defaultValue: "Delete Account" })}
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
                <ul className="space-y-2 text-sm text-white">
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
            <p className="text-xs sm:text-sm text-white leading-relaxed text-center sm:text-left w-full">
              <span className="font-semibold text-white">
                {t("footerDisclaimerLabel")}
              </span>{" "}
              {t("footerDisclaimerText")}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-white/10 pt-5 sm:pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white text-center sm:text-left sm:text-base">
                  © {new Date().getFullYear()} {t("appName")}.{" "}
                  {t("allRightsReserved")}
                </p>
                <p className="text-xs text-center sm:text-left">
                  CIN: U62090UP2025PTC239472 | GSTIN: 09AAUCM0962Q1ZO
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-white sm:justify-end sm:gap-x-5 sm:text-base">
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/privacy-policy"
                >
                  {t("footerPrivacy")}
                </Link>
                <span className="text-white">•</span>
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/terms-and-conditions"
                >
                  {t("footerTerms")}
                </Link>
                <span className="text-white">•</span>
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
