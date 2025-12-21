import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const linkedinURL = "https://www.linkedin.com/company/mindcurepath";
  const instagramURL = "https://www.instagram.com/mindcurepath";
  const twitterURL = "https://www.twitter.com/mindcurepath";
  const facebookURL = "https://www.facebook.com/mindcurepath";
  
  return (
    <footer className="w-full bg-gradient-to-b from-white to-[#f8fafb] border-t border-[hsl(0,0%,85%)] shadow-[0_-2px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1350px] mx-auto px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[50px] sm:py-[60px] md:py-[70px]">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-[40px] sm:gap-[50px] md:gap-[60px] lg:gap-[80px]">
          
          {/* Company Logo Section */}
          <div className="flex flex-col items-center md:items-start gap-[20px] sm:gap-[24px] w-full md:w-auto">
            <div className="flex justify-center md:justify-start transition-transform duration-300 hover:scale-105">
              <img
                src="/images/footer/company_logo.png"
                alt={t("appName") + " Logo"}
                className="w-[180px] sm:w-[220px] md:w-[250px] lg:w-[280px]"
              />
            </div>
          </div>

          {/* Connect with us Section */}
          <div className="flex flex-col gap-[16px] sm:gap-[20px] items-center md:items-start w-full md:w-auto">
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold uppercase tracking-[0.08em] text-[#2d3748] mb-[4px] sm:mb-[6px]">
              {t("connectWithUs")}
            </h3>
            <p className="text-[13px] sm:text-[14px] text-[#6b7280] font-light leading-relaxed text-center md:text-left mb-[8px] sm:mb-[12px] max-w-[250px] sm:max-w-none">
              Follow us for updates and mental wellness tips
            </p>
            <div className="flex items-center gap-[20px] sm:gap-[24px] md:gap-[20px]">
              <a
                href={instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-br from-[#f8fafb] to-[#e8edf0] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
                aria-label="Instagram"
              >
                <Instagram
                  size={22}
                  className="text-[#6b7280] group-hover:text-[#e1306c] transition-colors duration-300"
                />
              </a>
              <a
                href={linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-br from-[#f8fafb] to-[#e8edf0] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
                aria-label="LinkedIn"
              >
                <Linkedin
                  size={22}
                  className="text-[#6b7280] group-hover:text-[#0077b5] transition-colors duration-300"
                />
              </a>
              <a
                href={twitterURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-br from-[#f8fafb] to-[#e8edf0] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
                aria-label="Twitter"
              >
                <Twitter
                  size={22}
                  className="text-[#6b7280] group-hover:text-[#1da1f2] transition-colors duration-300"
                />
              </a>
              <a
                href={facebookURL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-br from-[#f8fafb] to-[#e8edf0] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
                aria-label="Facebook"
              >
                <Facebook
                  size={22}
                  className="text-[#6b7280] group-hover:text-[#1877f2] transition-colors duration-300"
                />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col items-center md:items-start gap-[16px] sm:gap-[20px] w-full md:w-auto md:max-w-[400px] lg:max-w-[420px]">
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold uppercase tracking-[0.08em] text-[#2d3748] mb-[4px] sm:mb-[6px]">
              {t("newsletter")}
            </h3>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] font-light text-[#6b7280] leading-relaxed text-center md:text-left mb-[4px] sm:mb-[8px] max-w-[320px] sm:max-w-none">
              {t("stayUpToDate")}
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-[12px] sm:gap-[8px] items-stretch sm:items-center">
              <div className="flex-1 border border-[#cbd5e1] rounded-[28px] sm:rounded-[30px] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 focus-within:border-[#94a3b8] focus-within:shadow-md overflow-hidden">
                <input
                  type="email"
                  placeholder={t("enterYourEmailAddress")}
                  className="w-full rounded-[28px] sm:rounded-[30px] px-[18px] sm:px-[22px] py-[14px] sm:py-[16px] text-[14px] sm:text-[15px] placeholder:text-[#94a3b8] placeholder:font-light text-[#2d3748] outline-none bg-transparent"
                />
              </div>

              <button className="bg-gradient-to-r from-[#404957] to-[#4a5568] hover:from-[#4a5568] hover:to-[#525c6f] active:from-[#374151] active:to-[#404957] transition-all duration-300 border border-[#64748b] text-white rounded-[28px] sm:rounded-[30px] px-[24px] sm:px-[28px] py-[14px] sm:py-[16px] text-[14px] sm:text-[15px] font-medium cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center min-w-[120px] sm:min-w-[140px]">
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-[50px] sm:mt-[60px] md:mt-[70px] pt-[30px] sm:pt-[35px] border-t border-[#e2e8f0]">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-[16px] sm:gap-[20px]">
            <p className="text-[12px] sm:text-[13px] text-[#94a3b8] font-light text-center sm:text-left">
              © {new Date().getFullYear()} {t("appName")}. All rights reserved.
            </p>
            <div className="flex items-center gap-[20px] sm:gap-[24px] text-[12px] sm:text-[13px] text-[#94a3b8]">
              <a href="#" className="hover:text-[#64748b] transition-colors duration-200 font-light">
                Privacy Policy
              </a>
              <span className="text-[#cbd5e1]">•</span>
              <a href="#" className="hover:text-[#64748b] transition-colors duration-200 font-light">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
