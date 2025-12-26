import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
  const linkedinURL = "https://www.linkedin.com/company/mindcurepath";
  const instagramURL = "https://www.instagram.com/mindcurepath/";
  const xURL = "https://x.com/mindcurepath";
  const facebookURL = "https://www.facebook.com/profile.php?id=61585370654255";
  const threadsURL = "https://www.threads.net/@mindcurepath";

  return (
    <footer className="mt-16 w-full bg-linear-to-b from-[#0b1220] via-[#0a1528] to-[#08101f] text-slate-200">
      <div className="border-t border-white/10">
        <div
          className="mx-auto max-w-7xl py-10 sm:py-12 md:py-14 lg:py-16"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <div className="flex flex-col gap-12 sm:gap-16">
            {/* Brand Section */}
            <div className="flex flex-col items-center space-y-5 md:space-y-6">
              <Link
                to="/"
                className="group flex flex-col items-center gap-3 md:gap-4 text-center transition-opacity hover:opacity-90"
              >
                <img
                  src="/images/footer/company_logo.png"
                  alt={`${t("appName")} Logo`}
                  className="h-14 w-auto sm:h-16 md:h-18 lg:h-20"
                  loading="lazy"
                />

                <div className="space-y-1.5 md:space-y-2">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    MindCurePath
                  </h2>
                  <p className="text-base text-slate-300 sm:text-lg md:text-xl leading-tight">
                    Guided by experts, driven by care, healing every mind
                  </p>
                </div>
              </Link>

              <p className="text-base leading-relaxed text-slate-400 max-w-[32ch] sm:max-w-[36ch] text-center sm:text-lg">
                {t("footerTagline", {
                  defaultValue:
                    "Mental wellness tools, expert-backed assessments, and guidance—built for clarity and care.",
                })}
              </p>

              {/* Social Links */}
              <div
                aria-label={t("connectWithUs")}
                className="flex flex-wrap items-center justify-center gap-2.5 py-6 sm:gap-3 sm:py-4 md:gap-3 md:py-0"
              >
                <a
                  href={instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="sm:w-[24px] sm:h-[24px]" />
                </a>
                <a
                  href={linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} className="sm:w-[24px] sm:h-[24px]" />
                </a>
                <a
                  href={xURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="X"
                >
                  <XIcon size={20} className="sm:w-[24px] sm:h-[24px]" />
                </a>
                <a
                  href={facebookURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="sm:w-[24px] sm:h-[24px]" />
                </a>
                <a
                  href={threadsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label="Threads"
                >
                  <ThreadsIcon size={20} className="sm:w-[24px] sm:h-[24px]" />
                </a>
              </div>
            </div>

            {/* Links and Newsletter Container */}
            <div className="flex flex-col gap-12 sm:flex-row sm:gap-10 sm:items-start md:gap-16 lg:gap-12">
              {/* Navigation Links */}
              <div className="flex flex-row justify-center gap-[10%] sm:justify-start sm:gap-10">
                {/* Quick Links */}
                <nav
                  aria-label={t("quickLinks", { defaultValue: "Quick links" })}
                  className="space-y-3 sm:space-y-4"
                >
                  <h3 className="text-lg font-semibold tracking-wide text-white uppercase">
                    {t("quickLinks", { defaultValue: "Quick links" })}
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5 text-base text-slate-300">
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/"
                      >
                        {t("home", { defaultValue: "Home" })}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/assessments"
                      >
                        {t("assessments", { defaultValue: "Assessments" })}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/experts"
                      >
                        {t("experts", { defaultValue: "Experts" })}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/about"
                      >
                        {t("about", { defaultValue: "About" })}
                      </Link>
                    </li>
                  </ul>
                </nav>

                {/* Support */}
                <nav
                  aria-label={t("support", { defaultValue: "Support" })}
                  className="space-y-3 sm:space-y-4"
                >
                  <h3 className="text-lg font-semibold tracking-wide text-white uppercase">
                    {t("support", { defaultValue: "Support" })}
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5 text-base text-slate-300">
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/contact"
                      >
                        {t("contact", { defaultValue: "Contact" })}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/faq"
                      >
                        {t("faq", { defaultValue: "FAQ" })}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="transition-colors duration-200 hover:text-white"
                        to="/help"
                      >
                        {t("helpCenter", { defaultValue: "Help Center" })}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Newsletter */}
              <div className="space-y-3 sm:space-y-4 sm:flex-1">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-wide text-white uppercase">
                    {t("newsletter")}
                  </h3>
                  <p className="text-base leading-6 text-slate-300">
                    {t("stayUpToDate")}
                  </p>
                </div>

                <form
                  className="flex flex-col gap-2.5 sm:gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <label className="sr-only" htmlFor="footer-email">
                    {t("enterYourEmailAddress")}
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("enterYourEmailAddress")}
                    className="h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-white/20 focus:bg-white/10 focus:ring-2 focus:ring-white/20 sm:h-14 sm:px-5"
                  />
                  <button
                    type="submit"
                    className="h-12 rounded-lg bg-white px-5 text-base font-semibold text-[#0b1220] transition-all duration-200 hover:bg-slate-100 active:bg-white/90 sm:h-14 sm:px-6"
                  >
                    {t("subscribe")}
                  </button>
                </form>
                <p className="text-base text-slate-400">
                  {t("newsletterNote", {
                    defaultValue: "No spam. Unsubscribe anytime.",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-white/10 pt-5 sm:mt-10 sm:pt-6 md:mt-12 md:pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="text-base text-slate-400">
                © {new Date().getFullYear()} {t("appName")}.{" "}
                {t("allRightsReserved", {
                  defaultValue: "All rights reserved.",
                })}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-base text-slate-400 sm:gap-x-6">
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/privacy"
                >
                  {t("privacyPolicy", { defaultValue: "Privacy Policy" })}
                </Link>
                <Link
                  className="transition-colors duration-200 hover:text-white"
                  to="/terms"
                >
                  {t("termsOfService", { defaultValue: "Terms of Service" })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
