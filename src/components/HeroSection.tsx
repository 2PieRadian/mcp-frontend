import { useState, useRef, useEffect } from "react";
import { TrendingUp, BookOpenText, HeartPulse } from "lucide-react";
import { useScreen } from "../context/ScreenContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChooseYourPath from "./ChooseYourPath";

function smoothScrollToHash(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
  e.preventDefault();
  const el = document.getElementById(hash.replace("#", ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = hash;
  }
}

export default function HeroSection() {
  const { t } = useTranslation("common");
  const { screenWidth } = useScreen();
  const showCardsBelow = screenWidth < 1024;
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [autoHoverIndex, setAutoHoverIndex] = useState<number | null>(null);
  const autoHoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const descriptionVisibleForCard = (index: number) =>
    hoveredCardIndex === index || (hoveredCardIndex === null && autoHoverIndex === index);

  const stopAutoHover = () => {
    if (autoHoverIntervalRef.current) {
      clearInterval(autoHoverIntervalRef.current);
      autoHoverIntervalRef.current = null;
    }
    setAutoHoverIndex(null);
  };

  const handleChooseYourPathClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollToHash(e, "#choose-your-path");
    if (!showCardsBelow) {
      stopAutoHover();
      setHoveredCardIndex(null);
      setAutoHoverIndex(0);
      autoHoverIntervalRef.current = setInterval(() => {
        setAutoHoverIndex((prev) => (prev === null ? 0 : (prev + 1) % 3));
      }, 2000);
    }
  };

  const handleCardMouseEnter = (index: number) => {
    stopAutoHover();
    setHoveredCardIndex(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  useEffect(() => {
    return () => {
      if (autoHoverIntervalRef.current) clearInterval(autoHoverIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full bg-white">
      {/* Content Container */}
      <div className="max-w-[1350px] mx-auto py-[70px] md:py-[90px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[80px]">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Main Heading */}
            <h1 className="text-[clamp(45px,5vw,55px)] font-bold leading-[1.1] text-[hsl(187,55%,28%)] tracking-tight">
              {t("discoverYourPath")}
              <span className="block mt-2 text-[hsl(190,35%,36%)]">
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
                onClick={handleChooseYourPathClick}
                className="group inline-flex items-center whitespace-nowrap justify-center gap-2 px-[25px] py-[12px] bg-[hsl(187,55%,28%)] text-white rounded-[16px] font-medium text-[16px] hover:bg-[hsl(187,55%,22%)] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                {t("findYourExpert")}
              </a>

              <a
                href="#expert-verified-assessments"
                onClick={(e) => smoothScrollToHash(e, "#expert-verified-assessments")}
                className="inline-flex items-center whitespace-nowrap justify-center px-[25px] py-[12px] bg-transparent text-primary rounded-[16px] font-medium text-[16px] border border-gray-300 hover:bg-[#ecf4f6] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
              >
                {t("startFreeAssessment")}
              </a>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          {!showCardsBelow && (
            <div className="flex-1 relative w-full max-w-[440px] lg:max-w-[480px] min-h-[420px] lg:min-h-[460px]">
              {/* Floating cards – row 1: Wellness + Education; row 2: Finance centered */}
              <div className="relative w-full h-full" aria-hidden>
                {/* Card 1 – Wellness (wrapper has float; Link has scale/rotate transition) */}
                <div
                  className={`group hero-card-float-1 absolute left-0 lg:left-0 top-0 z-10 w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] group-hover:z-40 ${descriptionVisibleForCard(0) ? "hero-card-wrapper-active" : ""}`}
                  onMouseEnter={() => handleCardMouseEnter(0)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Link
                    to="/wellness-experts"
                    className="hero-card-link group w-full h-full rounded-full px-5 pt-5 pb-7 lg:px-6 lg:pt-6 lg:pb-9 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:z-40 cursor-pointer overflow-hidden bg-white/55 backdrop-blur-md border-2 border-[#0ea5e9]/35"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-[#0ea5e9]/28 via-[#06b6d4]/18 to-[#06b6d4]/12" />
                    <div
                      className={`hero-card-fill pointer-events-none absolute inset-0 rounded-full bg-[#0ea5e9] origin-center transition-transform duration-500 ease-in-out group-hover:scale-150 ${descriptionVisibleForCard(0) ? "scale-150" : "scale-0"}`}
                    />
                    <div className="hero-card-content relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-500 ease-in-out group-hover:text-white">
                      <HeartPulse className="w-10 h-10 lg:w-12 lg:h-12 text-[#083a57] group-hover:text-white mb-3 lg:mb-4 shrink-0 transition-colors duration-500 ease-in-out" />
                      <h3 className="font-bold text-[#083a57] group-hover:text-white text-base lg:text-lg mb-1 leading-tight transition-colors duration-500 ease-in-out">
                        {t("wellness")}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${descriptionVisibleForCard(0) ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <p className="text-[#083a57]/90 group-hover:text-white/95 text-xs lg:text-sm leading-snug transition-colors duration-500 ease-in-out">
                          {t("assessMentalHealth")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card 2 – Education */}
                <div
                  className={`group hero-card-float-2 absolute left-[220px] lg:left-[240px] top-0 z-20 w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] group-hover:z-40 ${descriptionVisibleForCard(1) ? "hero-card-wrapper-active" : ""}`}
                  onMouseEnter={() => handleCardMouseEnter(1)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Link
                    to="/education-experts"
                    className="hero-card-link group w-full h-full rounded-full px-5 pt-5 pb-7 lg:px-6 lg:pt-6 lg:pb-9 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:z-40 cursor-pointer overflow-hidden bg-white/55 backdrop-blur-md border-2 border-[#10b981]/35"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-[#10b981]/28 via-[#059669]/18 to-[#059669]/12" />
                    <div
                      className={`hero-card-fill pointer-events-none absolute inset-0 rounded-full bg-[#10b981] origin-center transition-transform duration-500 ease-in-out group-hover:scale-150 ${descriptionVisibleForCard(1) ? "scale-150" : "scale-0"}`}
                    />
                    <div className="hero-card-content relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-500 ease-in-out group-hover:text-white">
                      <BookOpenText className="w-10 h-10 lg:w-12 lg:h-12 text-[#064a36] group-hover:text-white mb-3 lg:mb-4 shrink-0 transition-colors duration-500 ease-in-out" />
                      <h3 className="font-bold text-[#064a36] group-hover:text-white text-base lg:text-lg mb-1 leading-tight transition-colors duration-500 ease-in-out">
                        {t("education")}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${descriptionVisibleForCard(1) ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <p className="text-[#064a36]/90 group-hover:text-white/95 text-xs lg:text-sm leading-snug transition-colors duration-500 ease-in-out">
                          {t("planCareerEducational")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card 3 – Finance (below, centered between card 1 and 2) */}
                <div
                  className={`group hero-card-float-3 absolute left-[110px] lg:left-[120px] top-[200px] lg:top-[210px] z-30 w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] group-hover:z-40 ${descriptionVisibleForCard(2) ? "hero-card-wrapper-active" : ""}`}
                  onMouseEnter={() => handleCardMouseEnter(2)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Link
                    to="/finance-experts"
                    className="hero-card-link group w-full h-full rounded-full px-5 pt-5 pb-7 lg:px-6 lg:pt-6 lg:pb-9 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:z-40 cursor-pointer overflow-hidden bg-white/55 backdrop-blur-md border-2 border-[#f59e0b]/40"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-[#f59e0b]/28 via-[#d97706]/18 to-[#d97706]/12" />
                    <div
                      className={`hero-card-fill pointer-events-none absolute inset-0 rounded-full bg-[#f59e0b] origin-center transition-transform duration-500 ease-in-out group-hover:scale-150 ${descriptionVisibleForCard(2) ? "scale-150" : "scale-0"}`}
                    />
                    <div className="hero-card-content relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-500 ease-in-out group-hover:text-white">
                      <TrendingUp className="w-10 h-10 lg:w-12 lg:h-12 text-[#6a3e06] group-hover:text-white mb-3 lg:mb-4 shrink-0 transition-colors duration-500 ease-in-out" />
                      <h3 className="font-bold text-[#6a3e06] group-hover:text-white text-base lg:text-lg mb-1 leading-tight transition-colors duration-500 ease-in-out">
                        {t("finance")}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${descriptionVisibleForCard(2) ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <p className="text-[#6a3e06]/90 group-hover:text-white/95 text-xs lg:text-sm leading-snug transition-colors duration-500 ease-in-out">
                          {t("buildFinancialFoundation")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {showCardsBelow && <ChooseYourPath />}
        </div>
      </div>
    </div>
  );
}
