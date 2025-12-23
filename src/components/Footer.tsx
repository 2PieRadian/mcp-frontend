import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const linkedinURL = "https://www.linkedin.com/company/mindcurepath";
  const instagramURL = "https://www.instagram.com/mindcurepath";
  const twitterURL = "https://www.twitter.com/mindcurepath";
  const facebookURL = "https://www.facebook.com/mindcurepath";

  return (
    <footer className="relative w-full overflow-hidden mt-[70px]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-[#f8fafb] to-[#f1f5f9]">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-linear-to-br from-[#e0f2fe] to-transparent rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-linear-to-tl from-[#f0f9ff] to-transparent rounded-full blur-3xl opacity-20"></div>

        {/* Decorative dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Beautiful Top Decorative Wave */}
      <div className="relative h-[80px] sm:h-[100px] overflow-hidden">
        {/* Flowing wave pattern */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z"
            fill="url(#waveGradient)"
            className="animate-wave"
          />
          <path
            d="M0,60 Q200,30 400,60 T800,60 T1200,60 L1200,100 L0,100 Z"
            fill="url(#waveGradient2)"
            opacity="0.6"
            className="animate-wave-delayed"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="waveGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating decorative elements */}
        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#cbd5e1]/40 animate-float"></div>
        <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#94a3b8]/30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-[50%] -translate-y-1/2 w-3 h-3 rounded-full bg-[#cbd5e1]/30 animate-float"></div>
        <div className="absolute top-1/2 left-[70%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#94a3b8]/40 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-[90%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#cbd5e1]/35 animate-float"></div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
        }
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        .animate-wave-delayed {
          animation: wave 10s ease-in-out infinite reverse;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>

      <div className="relative max-w-[1350px] mx-auto px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[60px] sm:py-[70px] md:py-[80px]">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-[50px] sm:gap-[60px] md:gap-[70px] lg:gap-[90px]">
          {/* Company Logo Section */}
          <div className="relative flex flex-col items-center md:items-start gap-[24px] sm:gap-[28px] w-full md:w-auto group">
            {/* Decorative frame around logo */}
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-br from-[#e0f2fe]/20 via-transparent to-[#f0f9ff]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative flex justify-center md:justify-start transition-transform duration-500 group-hover:scale-105">
                <div className="relative">
                  {/* Decorative corner accents */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#cbd5e1] rounded-tl-lg opacity-50"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#cbd5e1] rounded-tr-lg opacity-50"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#cbd5e1] rounded-bl-lg opacity-50"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#cbd5e1] rounded-br-lg opacity-50"></div>

                  <img
                    src="/images/footer/company_logo.png"
                    alt={t("appName") + " Logo"}
                    className="relative w-[180px] sm:w-[220px] md:w-[250px] lg:w-[280px] z-10"
                  />
                </div>
              </div>
            </div>

            {/* Decorative star icons */}
            <div className="hidden md:flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 text-[#cbd5e1] fill-[#cbd5e1]/30 animate-pulse" />
              <div className="h-px w-12 bg-linear-to-r from-transparent via-[#cbd5e1] to-transparent"></div>
              <Star
                className="w-4 h-4 text-[#cbd5e1] fill-[#cbd5e1]/30 animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>

          {/* Connect with us Section */}
          <div className="relative flex flex-col gap-[20px] sm:gap-[24px] items-center md:items-start w-full md:w-auto">
            {/* Section header with decorative line */}
            <div className="flex flex-col items-center md:items-start gap-3 w-full">
              <div className="flex items-center gap-3 w-full justify-center md:justify-start">
                <div className="h-px w-8 bg-linear-to-r from-transparent via-[#cbd5e1] to-transparent md:from-[#cbd5e1]"></div>
                <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold uppercase tracking-widest text-[#1e293b] relative">
                  {t("connectWithUs")}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#94a3b8] to-transparent"></span>
                </h3>
                <div className="h-px flex-1 max-w-12 bg-linear-to-l from-transparent via-[#cbd5e1] to-transparent md:from-transparent md:via-transparent md:to-[#cbd5e1]"></div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#64748b] font-light leading-relaxed text-center md:text-left max-w-[280px] sm:max-w-none">
                Follow us for updates and mental wellness tips
              </p>
            </div>

            {/* Social Icons with enhanced styling */}
            <div className="flex items-center gap-[16px] sm:gap-[20px] md:gap-[18px]">
              <a
                href={instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#e1306c]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(225,48,108,0.2)] active:scale-95 hover:rotate-3"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#e1306c]/0 to-[#e1306c]/0 group-hover:from-[#e1306c]/10 group-hover:to-[#fd1d1d]/10 transition-all duration-300"></div>
                <Instagram
                  size={24}
                  className="relative z-10 text-[#64748b] group-hover:text-[#e1306c] transition-all duration-300"
                />
              </a>
              <a
                href={linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#0077b5]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,119,181,0.2)] active:scale-95 hover:rotate-3"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#0077b5]/0 to-[#0077b5]/0 group-hover:from-[#0077b5]/10 group-hover:to-[#0077b5]/10 transition-all duration-300"></div>
                <Linkedin
                  size={24}
                  className="relative z-10 text-[#64748b] group-hover:text-[#0077b5] transition-all duration-300"
                />
              </a>
              <a
                href={twitterURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#1da1f2]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(29,161,242,0.2)] active:scale-95 hover:rotate-3"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#1da1f2]/0 to-[#1da1f2]/0 group-hover:from-[#1da1f2]/10 group-hover:to-[#1da1f2]/10 transition-all duration-300"></div>
                <Twitter
                  size={24}
                  className="relative z-10 text-[#64748b] group-hover:text-[#1da1f2] transition-all duration-300"
                />
              </a>
              <a
                href={facebookURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#1877f2]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(24,119,242,0.2)] active:scale-95 hover:rotate-3"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#1877f2]/0 to-[#1877f2]/0 group-hover:from-[#1877f2]/10 group-hover:to-[#1877f2]/10 transition-all duration-300"></div>
                <Facebook
                  size={24}
                  className="relative z-10 text-[#64748b] group-hover:text-[#1877f2] transition-all duration-300"
                />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="relative flex flex-col items-center md:items-start gap-[20px] sm:gap-[24px] w-full md:w-auto md:max-w-[420px] lg:max-w-[450px]">
            {/* Section header with decorative line */}
            <div className="flex flex-col items-center md:items-start gap-3 w-full">
              <div className="flex items-center gap-3 w-full justify-center md:justify-start">
                <div className="h-px w-8 bg-linear-to-r from-transparent via-[#cbd5e1] to-transparent md:from-[#cbd5e1]"></div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#94a3b8]" />
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold uppercase tracking-widest text-[#1e293b] relative">
                    {t("newsletter")}
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#94a3b8] to-transparent"></span>
                  </h3>
                </div>
                <div className="h-px flex-1 max-w-12 bg-linear-to-l from-transparent via-[#cbd5e1] to-transparent md:from-transparent md:via-transparent md:to-[#cbd5e1]"></div>
              </div>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] font-light text-[#64748b] leading-relaxed text-center md:text-left mb-2 max-w-[340px] sm:max-w-none">
                {t("stayUpToDate")}
              </p>
            </div>

            {/* Enhanced Newsletter Input */}
            <div className="w-full flex flex-col sm:flex-row gap-[14px] sm:gap-[10px] items-stretch sm:items-center">
              <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-[#cbd5e1] via-[#e2e8f0] to-[#cbd5e1] rounded-[32px] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                <div className="relative border border-[#cbd5e1] rounded-[30px] sm:rounded-[32px] bg-white shadow-sm hover:shadow-md transition-all duration-300 focus-within:border-[#94a3b8] focus-within:shadow-lg focus-within:ring-2 focus-within:ring-[#cbd5e1]/20 overflow-hidden">
                  <input
                    type="email"
                    placeholder={t("enterYourEmailAddress")}
                    className="w-full rounded-[30px] sm:rounded-[32px] px-[20px] sm:px-[24px] py-[16px] sm:py-[18px] text-[14px] sm:text-[15px] placeholder:text-[#94a3b8] placeholder:font-light text-[#1e293b] outline-none bg-transparent"
                  />
                </div>
              </div>

              <button className="relative group bg-linear-to-r from-[#404957] via-[#475569] to-[#404957] hover:from-[#475569] hover:via-[#525c6f] hover:to-[#475569] active:from-[#374151] active:via-[#404957] active:to-[#374151] transition-all duration-300 border border-[#64748b] text-white rounded-[30px] sm:rounded-[32px] px-[28px] sm:px-[32px] py-[16px] sm:py-[18px] text-[14px] sm:text-[15px] font-medium cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center min-w-[130px] sm:min-w-[150px] overflow-hidden">
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10">{t("subscribe")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="relative mt-[60px] sm:mt-[70px] md:mt-[80px] pt-[35px] sm:pt-[40px]">
          {/* Decorative separator */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
            <div className="h-px w-full max-w-[200px] bg-linear-to-r from-transparent via-[#cbd5e1] to-transparent"></div>
            <div className="mx-4 w-2 h-2 rounded-full bg-[#cbd5e1]"></div>
            <div className="h-px w-full max-w-[200px] bg-linear-to-l from-transparent via-[#cbd5e1] to-transparent"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-[18px] sm:gap-[24px]">
            <p className="text-[12px] sm:text-[13px] text-[#94a3b8] font-light text-center sm:text-left flex items-center gap-2">
              <span>
                © {new Date().getFullYear()} {t("appName")}. All rights
                reserved.
              </span>
            </p>
            <div className="flex items-center gap-[24px] sm:gap-[28px] text-[12px] sm:text-[13px] text-[#94a3b8]">
              <a
                href="#"
                className="relative hover:text-[#64748b] transition-colors duration-200 font-light group"
              >
                Privacy Policy
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#cbd5e1] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
              <span className="text-[#cbd5e1]">•</span>
              <a
                href="#"
                className="relative hover:text-[#64748b] transition-colors duration-200 font-light group"
              >
                Terms of Service
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#cbd5e1] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
