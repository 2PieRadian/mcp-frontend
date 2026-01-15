import { BadgeCheck, TrendingUp, BookOpenText } from "lucide-react";
import { useScreen } from "../context/ScreenContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChooseYourPath from "./ChooseYourPath";

export default function HeroSection() {
  const { t } = useTranslation("common");
  const { screenWidth } = useScreen();
  const showCardsBelow = screenWidth < 1024;

  return (
    <div className="relative w-full bg-white">
      {/* Content Container */}
      <div className="max-w-[1350px] mx-auto py-[70px] md:py-[90px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[80px]">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#ecf4f6] rounded-full border border-primary/20 animate-badge-pulse">
              <BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary">
                {t("expertVerifiedAssessmentsBadge")}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[clamp(45px,5vw,55px)] font-bold leading-[1.1] text-primary tracking-tight">
              {t("discoverYourPath")}
              <span className="block mt-2 text-[hsl(190,40%,29%)]">
                {t("betterLiving")}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-[clamp(16px,2.5vw,20px)] text-[#4F5B64] leading-relaxed max-w-[600px] mx-auto lg:mx-0">
              {t("heroSubheading")}
            </p>

            {/* Key Points */}
            <div className="flex flex-row gap-2 md:gap-3 justify-center lg:justify-start overflow-x-auto">
              <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#ecf4f6] rounded-full border border-primary/10">
                <span className="text-[10px] md:text-[12px] font-medium text-primary">
                  {t("scienceBacked")}
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#ecf4f6] rounded-full border border-primary/10">
                <span className="text-[10px] md:text-[12px] font-medium text-primary">
                  {t("expertVerifiedAssessmentsBadge")}
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#ecf4f6] rounded-full border border-primary/10">
                <span className="text-[10px] md:text-[12px] font-medium text-primary">
                  {t("freeAssessments")}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-[10px] justify-center lg:justify-start pt-[30px]">
              <a
                href="#choose-your-path"
                className="group inline-flex items-center whitespace-nowrap justify-center gap-2 px-[25px] py-[12px] bg-primary text-white rounded-[16px] font-medium text-[16px] hover:bg-[hsl(187,73%,18%)] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                Choose Your Path
              </a>

              <a
                href="#expert-verified-assessments"
                className="inline-flex items-center whitespace-nowrap justify-center px-[25px] py-[12px] bg-transparent text-primary rounded-[16px] font-medium text-[16px] border border-gray-300 hover:bg-[#ecf4f6] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
              >
                {t("startFreeAssessment")}
              </a>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          {!showCardsBelow && (
            <div className="flex-1 relative w-full max-w-[500px] lg:max-w-[600px]">
              {/* Floating Cards Preview */}
              <div className="relative h-[400px] lg:h-[500px]">
                {/* Card 1 - Wellness */}
                <Link
                  to="/wellness-experts"
                  className="group absolute top-0 right-0 w-[200px] lg:w-[240px] bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-lg animate-float-1 border border-gray-100 hover:border-primary/30 hover:scale-[1.05] hover:shadow-xl transition-all duration-300 cursor-pointer block text-center overflow-hidden"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#0ea5e9] to-[#06b6d4] rounded-[12px] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="/images/health/yoga.png"
                      alt="Wellness"
                      className="w-8 h-8 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#0ea5e9] transition-colors duration-300">
                    {t("wellness")}
                  </h3>
                  <p className="text-[#4F5B64] text-sm leading-relaxed mb-0">
                    {t("assessMentalHealth")}
                  </p>
                </Link>

                {/* Card 2 - Education */}
                <Link
                  to="/education-experts"
                  className="group absolute top-[120px] left-0 w-[200px] lg:w-[240px] bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-lg animate-float-2 border border-gray-100 hover:border-primary/30 hover:scale-[1.05] hover:shadow-xl transition-all duration-300 cursor-pointer block text-center overflow-hidden"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#10b981] to-[#059669] rounded-[12px] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <BookOpenText className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#10b981] transition-colors duration-300">
                    {t("education")}
                  </h3>
                  <p className="text-[#4F5B64] text-sm leading-relaxed mb-0">
                    {t("planCareerEducational")}
                  </p>
                </Link>

                {/* Card 3 - Finance */}
                <Link
                  to="/finance-experts"
                  className="group absolute top-[240px] right-[40px] w-[200px] lg:w-[240px] bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-lg animate-float-3 border border-gray-100 hover:border-primary/30 hover:scale-[1.05] hover:shadow-xl transition-all duration-300 cursor-pointer block text-center overflow-hidden"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#f59e0b] to-[#d97706] rounded-[12px] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#f59e0b] transition-colors duration-300">
                    {t("finance")}
                  </h3>
                  <p className="text-[#4F5B64] text-sm leading-relaxed mb-0">
                    {t("buildFinancialFoundation")}
                  </p>
                </Link>
              </div>
            </div>
          )}

          {showCardsBelow && <ChooseYourPath />}
        </div>
      </div>
    </div>
  );
}
