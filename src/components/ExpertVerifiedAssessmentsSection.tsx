import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function ExpertVerifiedAssessmentsSectionItem({
  id,
  title,
  subtitle,
  description,
  imageSrc,
  imageSize,
  rightImage,
  linkTo,
}: {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageSize: number;
  rightImage: boolean;
  linkTo: string;
}) {
  const { t } = useTranslation("common");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateImageSize = () => {
      if (imgRef.current) {
        if (window.innerWidth >= 768) {
          imgRef.current.style.maxWidth = `${imageSize}px`;
        } else {
          imgRef.current.style.maxWidth = "280px";
        }
      }
    };

    updateImageSize();
    window.addEventListener("resize", updateImageSize);
    return () => window.removeEventListener("resize", updateImageSize);
  }, [imageSize]);

  return (
    <div id={id} className="block w-full scroll-mt-[70px] md:scroll-mt-[90px]">
      <div
        className={`group relative flex flex-col md:flex-row ${
          rightImage ? "md:flex-row" : "md:flex-row-reverse"
        } overflow-hidden items-center justify-center gap-[32px] md:gap-[48px] bg-white rounded-[16px] md:rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)] px-[25px] py-[25px] md:px-[56px] md:py-[10px] border border-gray-100/60 md:hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.04)] md:hover:border-gray-200/80 transition-all duration-500 ease-out w-full md:hover:-translate-y-[2px]`}
      >
        {/* Shimmer effect on hover - DESKTOP ONLY */}
        <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[24px]">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 w-1/3"></div>
        </div>

        {/* Subtle background gradient on hover - DESKTOP ONLY */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-br from-gray-50/0 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"></div>

        {/* Corner accent dots - DESKTOP ONLY */}
        <div
          className={`hidden md:block absolute ${
            rightImage ? "top-4 right-4" : "top-4 left-4"
          } w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 delay-100`}
        ></div>
        <div
          className={`hidden md:block absolute ${
            rightImage ? "bottom-4 right-4" : "bottom-4 left-4"
          } w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 delay-200`}
        ></div>

        {/* Top accent line on hover - DESKTOP ONLY */}
        <div
          className={`hidden md:block absolute top-0 ${
            rightImage ? "left-0" : "right-0"
          } h-[3px] w-0 bg-linear-to-r from-primary/60 to-primary/30 transition-all duration-700 ease-out rounded-full group-hover:w-full`}
        ></div>

        {/* Bottom accent line on hover - DESKTOP ONLY */}
        <div
          className={`hidden md:block absolute bottom-0 ${
            rightImage ? "right-0" : "left-0"
          } h-[3px] w-0 bg-linear-to-r from-primary/30 to-primary/60 transition-all duration-700 ease-out delay-150 rounded-full group-hover:w-full`}
        ></div>

        {/* Animated border corners - DESKTOP ONLY */}
        <div
          className={`hidden md:block absolute ${
            rightImage ? "top-0 left-0" : "top-0 right-0"
          } w-6 h-6 border-t-2 border-l-2 border-primary/0 transition-all duration-500 rounded-tl-[16px] group-hover:border-primary/30`}
        ></div>
        <div
          className={`hidden md:block absolute ${
            rightImage ? "bottom-0 right-0" : "bottom-0 left-0"
          } w-6 h-6 border-b-2 border-r-2 border-primary/0 transition-all duration-500 delay-200 rounded-br-[16px] group-hover:border-primary/30`}
        ></div>

        <div className="left flex-1 w-full md:w-auto order-2 md:order-0 relative z-10 space-y-[16px] md:space-y-[18px]">
          <div className="space-y-[8px] md:space-y-[6px] relative">
            {/* Title with slide animation - DESKTOP ONLY */}
            <h1 className="text-[clamp(24px,4vw,32px)] font-bold text-primary leading-tight md:group-hover:text-primary/95 transition-all duration-300 relative inline-block">
              <span className="relative inline-block md:group-hover:translate-x-1 transition-transform duration-300">
                {title}
              </span>
              {/* Underline on hover - DESKTOP ONLY */}
              <span className="hidden md:block absolute bottom-0 left-0 h-[2px] w-0 bg-primary/40 transition-all duration-500 ease-out group-hover:w-full"></span>
            </h1>
            {/* Subtitle with fade and slide - DESKTOP ONLY */}
            <p className="text-[clamp(18px,2.5vw,22px)] font-medium text-[#12434a] transition-all duration-400 delay-75 md:group-hover:translate-x-1 md:group-hover:text-[#0f363c]">
              {subtitle}
            </p>
          </div>
          {/* Description */}
          <p className="text-[16px] leading-relaxed text-[#4F5B64] transition-colors duration-400 delay-100 relative md:group-hover:text-[#3d474d]">
            {description}
            {/* Decorative line on hover - DESKTOP ONLY */}
            <span className="hidden md:block absolute bottom-0 left-0 h-px w-0 bg-primary/20 transition-all duration-700 delay-200 group-hover:w-12"></span>
          </p>
          <Link
            to={linkTo}
            className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#ecf4f6] to-[#e8f2f5] text-primary border border-primary/25 cursor-pointer px-[20px] py-[12px] rounded-[20px] text-[16px] w-full md:w-auto hover:from-primary hover:to-primary/95 hover:text-white hover:border-primary hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-[2px] font-medium text-center relative overflow-hidden group/button mt-[24px] md:mt-[28px]"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
            <span className="relative z-10 group-hover/button:scale-105 transition-transform duration-300">
              {t("takeFreeAssessment", { ns: "common" })}
            </span>
            <svg
              className="w-4 h-4 relative z-10 opacity-70 group-hover/button:translate-x-1 group-hover/button:opacity-100 group-hover/button:scale-110 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            {/* Button pulse on hover */}
            <div className="absolute inset-0 bg-primary/10 rounded-[20px] opacity-0 group-hover/button:opacity-100 group-hover/button:scale-110 transition-all duration-500 -z-10"></div>
          </Link>
        </div>

        <div
          className={`right flex-1 w-full md:w-auto flex justify-center items-center order-1 md:order-0 relative z-10`}
        >
          <div className="relative group/image overflow-visible">
            {/* Circular background - ALWAYS VISIBLE (mobile + desktop) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-0 md:h-0 md:group-hover:w-[300px] md:group-hover:h-[300px] rounded-full bg-primary/10 transition-all duration-700 ease-out -z-20 pointer-events-none md:opacity-0 md:group-hover:opacity-100"></div>

            {/* Multiple glow layers - DESKTOP ONLY */}
            <div className="hidden md:block absolute inset-0 bg-linear-to-br from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl opacity-0 transition-opacity duration-700 -z-10 transform scale-125 group-hover:opacity-100 group-hover:scale-150"></div>
            <div className="hidden md:block absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-primary/6 rounded-full blur-2xl opacity-0 transition-opacity duration-700 delay-100 -z-10 transform scale-110 group-hover:opacity-60 group-hover:scale-130"></div>

            {/* Animated rings on hover - DESKTOP ONLY */}
            <div className="hidden md:block absolute inset-0 rounded-full border-2 border-primary/10 opacity-0 transition-opacity duration-500 -z-10 scale-110 group-hover:opacity-100 group-hover:scale-125"></div>
            <div className="hidden md:block absolute inset-0 rounded-full border border-primary/20 opacity-0 transition-opacity duration-700 delay-200 -z-10 scale-130 group-hover:opacity-100 group-hover:scale-145"></div>

            {/* Floating particles on hover - DESKTOP ONLY */}
            <div className="hidden md:block absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-primary/30 rounded-full opacity-0 transition-all duration-700 delay-300 group-hover:opacity-100 group-hover:translate-y-[-10px] group-hover:translate-x-[-5px]"></div>
            <div className="hidden md:block absolute top-3/4 right-1/4 w-1 h-1 bg-primary/40 rounded-full opacity-0 transition-all duration-700 delay-400 group-hover:opacity-100 group-hover:translate-y-[10px] group-hover:translate-x-[5px]"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1 h-1 bg-primary/25 rounded-full opacity-0 transition-all duration-700 delay-500 group-hover:opacity-100 group-hover:translate-x-[8px]"></div>

            {/* Image with floating animation - hover effects DESKTOP ONLY */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt={title}
              className="w-full object-cover animate-float-2 relative z-10 transition-all duration-500 ease-out md:group-hover:scale-105 md:group-hover:rotate-1"
              style={{ maxWidth: "280px" }}
            />

            {/* Image overlay gradient on hover - DESKTOP ONLY */}
            <div className="hidden md:block absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 rounded-full -z-5 group-hover:opacity-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertVerifiedAssessmentsSection() {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <div
      id="expert-verified-assessments"
      className="mt-[40px] md:mt-[70px] max-w-[1000px] mx-auto md:px-0 scroll-mt-[60px] md:scroll-mt-[80px]"
    >
      <div className="text-center space-y-[10px]">
        <h1 className="text-[clamp(24px,6vw,34px)] md:text-3xl font-bold text-center relative inline-block group/header">
          {t("expertVerifiedAssessments", { ns: "common" })}
        </h1>
        <div className="w-16 h-[2px] bg-linear-to-r from-transparent via-primary/40 to-transparent mx-auto rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
        <p className="text-[clamp(16px,2vw,17px)] max-w-[800px] mx-auto text-center text-[#4F5B64]">
          {t("takePreScreenerTests", { ns: "common" })}
        </p>
      </div>

      <div className="flex flex-col mt-[40px] md:mt-[70px] h-fit gap-[40px] md:gap-[48px]">
        <ExpertVerifiedAssessmentsSectionItem
          id="expert-verified-assessments-wellness"
          title={t("wellness", { ns: "common" })}
          subtitle={t("wellnessSubtitle", { ns: "common" })}
          description={t("wellnessDescription", { ns: "common" })}
          imageSrc="images/expert-verified-assessment/wellness.webp"
          imageSize={360}
          rightImage={true}
          linkTo="/assessments/wellness"
        />

        <ExpertVerifiedAssessmentsSectionItem
          id="expert-verified-assessments-education"
          title={t("education", { ns: "common" })}
          subtitle={t("educationSubtitle", { ns: "common" })}
          description={t("educationDescription", { ns: "common" })}
          imageSrc="images/expert-verified-assessment/education.webp"
          imageSize={360}
          rightImage={false}
          linkTo="/assessments/education"
        />

        <ExpertVerifiedAssessmentsSectionItem
          id="expert-verified-assessments-finance"
          title={t("finance", { ns: "common" })}
          subtitle={t("financeSubtitle", { ns: "common" })}
          description={t("financeDescription", { ns: "common" })}
          imageSrc="images/expert-verified-assessment/finance.webp"
          imageSize={360}
          rightImage={true}
          linkTo="/assessments/finance"
        />
      </div>
    </div>
  );
}
