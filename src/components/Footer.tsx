import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const linkedinURL = "https://www.linkedin.com/company/mindcurepath";
  const instagramURL = "https://www.instagram.com/mindcurepath";
  const twitterURL = "https://www.twitter.com/mindcurepath";
  const facebookURL = "https://www.facebook.com/mindcurepath";
  return (
    <div className="FOOTER mt-[60px] mb-[60px] max-w-[1350px] mx-auto border-t text-[#37445A] border-[hsl(0,0%,75%)] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between px-[20px] sm:px-[30px] md:px-[40px] py-[30px] md:py-[10px] gap-[30px]">
      <div className="COMPANY-LOGO flex justify-center md:justify-start">
        <img
          src="/images/footer/company_logo.png"
          alt={t("appName") + " Logo"}
          className="w-[150px] sm:w-[180px] md:w-[200px]"
        />
      </div>

      {/* Connect with us */}
      <div className="connect-with-us flex flex-col gap-[10px] mt-0 md:mt-[30px] items-center md:items-start">
        <h3 className="text-[0.9rem] font-semibold uppercase tracking-wide">
          {t("connectWithUs")}
        </h3>
        <div className="flex items-center gap-[17px]">
          <Instagram
            size={25}
            className="cursor-pointer"
            onClick={() => window.open(instagramURL, "_blank")}
          />
          <Linkedin
            size={25}
            className="cursor-pointer"
            onClick={() => window.open(linkedinURL, "_blank")}
          />
          <Twitter
            size={25}
            className="cursor-pointer"
            onClick={() => window.open(twitterURL, "_blank")}
          />
          <Facebook
            size={25}
            className="cursor-pointer"
            onClick={() => window.open(facebookURL, "_blank")}
          />
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter mt-0 md:mt-[30px] md:w-auto flex flex-col items-center md:items-start">
        <h3 className="text-[0.9rem] font-semibold uppercase tracking-wide">
          {t("newsletter")}
        </h3>
        <p className="text-[14px] font-light text-center md:text-left max-w-[300px] md:max-w-none">
          {t("stayUpToDate")}
        </p>

        <div className="gap-[10px] border border-[#6E82A0] mt-[20px] rounded-[25px] bg-input-bg flex items-center justify-between w-full md:max-w-[380px] px-[5px]">
          <input
            type="text"
            placeholder={t("enterYourEmailAddress")}
            className="rounded-[25px] px-[15px] sm:px-[20px] py-[12px] text-[14px] placeholder:text-input-placeholder w-full outline-none"
          />

          <button className="bg-[#404957] hover:bg-[#4b5667] transition-all duration-200 border border-[#798BA9] text-white rounded-full px-[12px] sm:px-[15px] py-[8px] text-[14px] cursor-pointer whitespace-nowrap shrink-0 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
            {t("subscribe")}
          </button>
        </div>
      </div>
    </div>
  );
}
