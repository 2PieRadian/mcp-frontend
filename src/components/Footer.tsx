import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

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
        <div className="flex flex-col items-center gap-[20px] lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-x-[20px] lg:gap-y-[20px]">
          <div className="w-full flex flex-col items-center gap-[20px] md:flex-row md:flex-wrap md:items-stretch md:justify-center lg:contents">
            {/* Company Logo Section */}
            <div className="relative flex flex-col items-center justify-center gap-[16px] sm:gap-[18px] w-fit mx-auto lg:mx-0 shrink-0 group rounded-3xl px-[18px] py-[18px] sm:px-[20px] sm:py-[20px]">
              {/* Decorative frame around logo */}
              <div className="relative">
                <div className="absolute -inset-3 bg-linear-to-br from-[#e0f2fe]/20 via-transparent to-[#f0f9ff]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative flex justify-center transition-transform duration-500 group-hover:scale-105">
                  <img
                    src="/images/footer/company_logo.png"
                    alt={t("appName") + " Logo"}
                    className="relative w-[150px] sm:w-[170px] lg:w-[185px] h-auto z-10"
                  />
                </div>
              </div>
            </div>

            {/* Connect with us Section */}
            <div className="relative flex flex-col gap-[18px] sm:gap-[20px] items-center lg:items-start w-full max-w-[520px] lg:max-w-none lg:flex-[0_0_280px] min-w-0 rounded-3xl px-[18px] py-[18px] sm:px-[20px] sm:py-[20px]">
              {/* Section header with decorative line */}
              <div className="flex flex-col items-start gap-3 w-full text-left">
                <div className="flex items-center gap-3 w-full justify-start">
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold uppercase tracking-widest text-[#1e293b] relative">
                    {t("connectWithUs")}
                    <span className="absolute -bottom-[8px] left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#94a3b8] to-transparent"></span>
                  </h3>
                  <div className="h-px flex-1 max-w-12 bg-linear-to-l from-transparent via-[#cbd5e1] to-transparent md:from-transparent md:via-transparent md:to-[#cbd5e1]"></div>
                </div>
                <p className="text-[13px] sm:text-[14px] text-[#64748b] font-light leading-relaxed text-left max-w-[280px] sm:max-w-none mt-[10px]">
                  Follow us for updates and mental wellness tips
                </p>
              </div>

              {/* Social Icons with enhanced styling */}
              <div className="flex flex-wrap items-center justify-start gap-[12px] sm:gap-[14px]">
                <a
                  href={instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#e1306c]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(225,48,108,0.2)] active:scale-95 hover:rotate-3"
                  aria-label="Instagram"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#e1306c]/0 to-[#e1306c]/0 group-hover:from-[#e1306c]/10 group-hover:to-[#fd1d1d]/10 transition-all duration-300"></div>
                  <Instagram
                    size={22}
                    className="relative z-10 text-[#64748b] group-hover:text-[#e1306c] transition-all duration-300"
                  />
                </a>
                <a
                  href={linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#0077b5]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,119,181,0.2)] active:scale-95 hover:rotate-3"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#0077b5]/0 to-[#0077b5]/0 group-hover:from-[#0077b5]/10 group-hover:to-[#0077b5]/10 transition-all duration-300"></div>
                  <Linkedin
                    size={22}
                    className="relative z-10 text-[#64748b] group-hover:text-[#0077b5] transition-all duration-300"
                  />
                </a>
                <a
                  href={xURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#111827]/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(17,24,39,0.18)] active:scale-95 hover:rotate-3"
                  aria-label="X"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#111827]/0 to-[#111827]/0 group-hover:from-[#111827]/6 group-hover:to-[#111827]/10 transition-all duration-300"></div>
                  <XIcon
                    size={22}
                    className="relative z-10 text-[#64748b] group-hover:text-[#111827] transition-all duration-300"
                  />
                </a>
                <a
                  href={facebookURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#1877f2]/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(24,119,242,0.2)] active:scale-95 hover:rotate-3"
                  aria-label="Facebook"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#1877f2]/0 to-[#1877f2]/0 group-hover:from-[#1877f2]/10 group-hover:to-[#1877f2]/10 transition-all duration-300"></div>
                  <Facebook
                    size={22}
                    className="relative z-10 text-[#64748b] group-hover:text-[#1877f2] transition-all duration-300"
                  />
                </a>
                <a
                  href={threadsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-2xl bg-linear-to-br from-white to-[#f8fafb] border border-[#e2e8f0] hover:border-[#111827]/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(17,24,39,0.18)] active:scale-95 hover:rotate-3"
                  aria-label="Threads"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#111827]/0 to-[#111827]/0 group-hover:from-[#111827]/6 group-hover:to-[#111827]/10 transition-all duration-300"></div>
                  <ThreadsIcon
                    size={22}
                    className="relative z-10 text-[#64748b] group-hover:text-[#111827] transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="relative flex flex-col items-center lg:items-start gap-[18px] sm:gap-[20px] w-full max-w-[620px] lg:max-w-none lg:flex-1 lg:min-w-[360px] lg:ml-auto min-w-0 rounded-3xl px-[18px] py-[18px] sm:px-[20px] sm:py-[20px]">
            {/* Section header with decorative line */}
            <div className="flex flex-col items-start gap-3 w-full text-left">
              <div className="flex items-center gap-3 w-full justify-start">
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold uppercase tracking-widest text-[#1e293b] relative">
                    {t("newsletter")}
                    <span className="absolute -bottom-[8px] left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#94a3b8] to-transparent"></span>
                  </h3>
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] mt-[10px] font-light text-[#64748b] leading-relaxed text-left mb-2 max-w-[340px] sm:max-w-none">
                {t("stayUpToDate")}
              </p>
            </div>

            {/* Enhanced Newsletter Input */}
            <div className="w-full flex flex-col min-[420px]:flex-row gap-[14px] min-[420px]:gap-[10px] items-stretch min-[420px]:items-center">
              <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-[#cbd5e1] via-[#e2e8f0] to-[#cbd5e1] rounded-[32px] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                <div className="relative border border-[#cbd5e1] rounded-[30px] sm:rounded-[32px] bg-white shadow-sm hover:shadow-md transition-all duration-300 focus-within:border-[#94a3b8] focus-within:shadow-lg focus-within:ring-2 focus-within:ring-[#cbd5e1]/20 overflow-hidden">
                  <input
                    type="email"
                    placeholder={t("enterYourEmailAddress")}
                    className="w-full rounded-[30px] sm:rounded-[32px] px-[16px] sm:px-[20px] py-[13px] sm:py-[15px] text-[13px] sm:text-[14px] placeholder:text-[#94a3b8] placeholder:font-light text-[#1e293b] outline-none bg-transparent"
                  />
                </div>
              </div>

              <button className="relative group bg-linear-to-r from-[#404957] via-[#475569] to-[#404957] hover:from-[#475569] hover:via-[#525c6f] hover:to-[#475569] active:from-[#374151] active:via-[#404957] active:to-[#374151] transition-all duration-300 border border-[#64748b] text-white rounded-[30px] sm:rounded-[32px] px-[22px] sm:px-[26px] py-[13px] sm:py-[15px] text-[13px] sm:text-[14px] font-medium cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center min-w-[110px] sm:min-w-[130px] overflow-hidden">
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

          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[14px] lg:gap-[24px]">
            <p className="text-[12px] sm:text-[13px] text-[#94a3b8] font-light text-center lg:text-left flex items-center gap-2">
              <span>
                © {new Date().getFullYear()} {t("appName")}. All rights
                reserved.
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-[24px] gap-y-[10px] text-[12px] sm:text-[13px] text-[#94a3b8]">
              <a
                href="#"
                className="relative hover:text-[#64748b] transition-colors duration-200 font-light group"
              >
                Privacy Policy
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#cbd5e1] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
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
