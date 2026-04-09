import { useState, useEffect } from "react";
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
  const [showMainText, setShowMainText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainText(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const descriptionVisibleForCard = (index: number) => hoveredCardIndex === index;

  const handleCardMouseEnter = (index: number) => {
    setHoveredCardIndex(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  const renderStaggeredText = (text: string, baseDelay: number = 0, delayStep: number = 0.015) => {
    let charIndex = 0;
    return (text || "").split(" ").map((word, wIndex, array) => {
      const wordNode = (
        <span key={`word-${wIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char, cIndex) => {
            const delay = baseDelay + charIndex * delayStep;
            charIndex++;
            return (
              <span
                key={`char-${cIndex}`}
                className="inline-block opacity-0 animate-letter-reveal"
                style={{ animationDelay: `${delay}s` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
      charIndex++; // space takes one delay step

      return (
        <span key={`wrap-${wIndex}`}>
          {wordNode}
          {wIndex < array.length - 1 && " "}
        </span>
      );
    });
  };

  return (
    <div className="relative w-full bg-[#fcfdfe] overflow-hidden min-h-[90vh] flex items-center">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes letter-reveal {
          0% { opacity: 0; transform: translateY(-30px); filter: blur(4px); }
          50% { opacity: 1; filter: blur(0); }
          65% { transform: translateY(6px); }
          80% { transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fade-out {
          0% { opacity: 1; filter: blur(0); }
          100% { opacity: 0; filter: blur(4px); }
        }
        .animate-letter-reveal {
          animation: letter-reveal 0.7s ease-out forwards;
        }
        .fade-out-welcome {
          animation: fade-out 0.5s ease-out forwards;
          animation-delay: 2.5s;
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Animated Glowing Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-[#0ea5e9]/20 to-[#06b6d4]/10 blur-[80px] md:blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-[#10b981]/20 to-[#059669]/10 blur-[80px] md:blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-[#f59e0b]/20 to-[#d97706]/10 blur-[80px] md:blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1350px] mx-auto py-[70px] md:py-[80px] px-[16px] lg:px-[40px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[50px] lg:gap-[80px]">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-7 md:space-y-4 max-w-[650px]">
            {/* Main Heading */}
            <div className="min-h-[140px] md:min-h-[180px] flex items-center justify-center lg:justify-start">
              {!showMainText ? (
                <h1 className="text-[clamp(40px,5vw,60px)] font-extrabold leading-[1.2] text-[#083a57] tracking-tight fade-out-welcome">
                  {renderStaggeredText("Welcome to MindCurePath", 0, 0.04)}
                </h1>
              ) : (
                <h1 className="text-[clamp(40px,5vw,60px)] font-extrabold leading-[1.2] text-[#083a57] tracking-tight">
                  <span className="inline-block w-full">
                    {renderStaggeredText(t("discoverYourPath"), 0, 0.035)}
                  </span>
                  {t("betterLiving") && (
                    <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#10b981]">
                      <span
                        className="inline-block opacity-0 animate-letter-reveal"
                        style={{ animationDelay: `${(t("discoverYourPath")?.length || 0) * 0.035}s` }}
                      >
                        {t("betterLiving")}
                      </span>
                    </span>
                  )}
                </h1>
              )}
            </div>

            {/* Subheading */}
            <p className="text-[clamp(16px,2vw,20px)] text-[#4F5B64] leading-relaxed max-w-[600px] mx-auto lg:mx-0 font-medium">
              {t("heroSubheading")}
            </p>

            {/* Key Points */}
            <div className="flex flex-row gap-3 md:gap-4 justify-center lg:justify-start flex-wrap">
              <div className="inline-flex items-center px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/50 shadow-sm cursor-default hover:bg-white transition-colors duration-300">
                <span className="text-[12px] md:text-[14px] font-bold text-[#0ea5e9]">
                  ✓ {t("scienceBacked")}
                </span>
              </div>
              <div className="inline-flex items-center px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/50 shadow-sm cursor-default hover:bg-white transition-colors duration-300">
                <span className="text-[12px] md:text-[14px] font-bold text-[#10b981]">
                  ✓ {t("expertVerifiedAssessmentsBadge")}
                </span>
              </div>
              <div className="inline-flex items-center px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/50 shadow-sm cursor-default hover:bg-white transition-colors duration-300">
                <span className="text-[12px] md:text-[14px] font-bold text-[#f59e0b]">
                  ✓ {t("freeAssessments")}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-[16px] justify-center lg:justify-start pt-[10px]">
              <Link
                to="/choose-experts"
                className="group relative inline-flex items-center whitespace-nowrap justify-center gap-2 px-[32px] py-[16px] bg-gradient-to-r from-[#083a57] to-[#0c5c8a] text-white rounded-[24px] font-bold text-[16px] md:text-[18px] hover:shadow-[0_12px_24px_rgba(8,58,87,0.25)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-[24px]"></div>
                <span className="relative z-10">{t("findYourExpert")}</span>
              </Link>

              <a
                href="#expert-verified-assessments"
                onClick={(e) => smoothScrollToHash(e, "#expert-verified-assessments")}
                className="inline-flex mb-[40px] sm:mb-[0] items-center whitespace-nowrap justify-center px-[32px] py-[16px] bg-white/60 backdrop-blur-md text-[#083a57] rounded-[24px] font-bold text-[16px] md:text-[18px] border border-gray-200 md:border-[2px] md:border-white hover:bg-white hover:text-[#0ea5e9] transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
              >
                {t("startFreeAssessment")}
              </a>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          {!showCardsBelow && (
            <div className="flex-1 relative w-full max-w-[440px] lg:max-w-[480px] min-h-[460px] lg:min-h-[500px]">
              {/* Floating cards – row 1: Wellness + Education; row 2: Finance centered */}
              <div className="relative w-full h-full" aria-hidden>
                {/* Card 1 – Wellness */}
                <div
                  className={`group hero-card-float-1 absolute left-0 lg:left-0 top-[20px] z-10 w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] group-hover:z-40 ${descriptionVisibleForCard(0) ? "hero-card-wrapper-active" : ""}`}
                  onMouseEnter={() => handleCardMouseEnter(0)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Link
                    to="/wellness-experts"
                    className="hero-card-link group w-full h-full rounded-[40px] px-5 pt-5 pb-7 lg:px-6 lg:pt-6 lg:pb-9 flex flex-col items-center justify-center text-center shadow-[0_15px_40px_rgba(14,165,233,0.15)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:z-40 cursor-pointer overflow-hidden bg-white/70 backdrop-blur-xl border border-white hover:border-[#0ea5e9]/50"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#0ea5e9]/10 to-transparent" />
                    <div
                      className={`hero-card-fill pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] origin-center transition-transform duration-500 ease-in-out group-hover:scale-[1.7] ${descriptionVisibleForCard(0) ? "scale-[1.7]" : "scale-0"}`}
                    />
                    <div className="hero-card-content relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-500 ease-in-out group-hover:text-white">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-500">
                        <HeartPulse className="w-7 h-7 lg:w-8 lg:h-8 text-[#0ea5e9] group-hover:text-white transition-colors duration-500 ease-in-out" />
                      </div>
                      <h3 className="font-extrabold text-[#083a57] group-hover:text-white text-lg lg:text-xl mb-1 leading-tight transition-colors duration-500 ease-in-out tracking-tight">
                        {t("wellness")}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${descriptionVisibleForCard(0) ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                          }`}
                      >
                        <p className="text-[#083a57]/80 group-hover:text-white/90 text-sm font-medium leading-snug transition-colors duration-500 ease-in-out">
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
                    className="hero-card-link group w-full h-full rounded-[40px] px-5 pt-5 pb-7 lg:px-6 lg:pt-6 lg:pb-9 flex flex-col items-center justify-center text-center shadow-[0_15px_40px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:z-40 cursor-pointer overflow-hidden bg-white/70 backdrop-blur-xl border border-white hover:border-[#10b981]/50"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#10b981]/10 to-transparent" />
                    <div
                      className={`hero-card-fill pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#10b981] to-[#059669] origin-center transition-transform duration-500 ease-in-out group-hover:scale-[1.7] ${descriptionVisibleForCard(1) ? "scale-[1.7]" : "scale-0"}`}
                    />
                    <div className="hero-card-content relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-500 ease-in-out group-hover:text-white">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-500">
                        <BookOpenText className="w-7 h-7 lg:w-8 lg:h-8 text-[#10b981] group-hover:text-white transition-colors duration-500 ease-in-out" />
                      </div>
                      <h3 className="font-extrabold text-[#064a36] group-hover:text-white text-lg lg:text-xl mb-1 leading-tight transition-colors duration-500 ease-in-out tracking-tight">
                        {t("education")}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${descriptionVisibleForCard(1) ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                          }`}
                      >
                        <p className="text-[#064a36]/80 group-hover:text-white/90 text-sm font-medium leading-snug transition-colors duration-500 ease-in-out">
                          {t("planCareerEducational")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card 3 – Finance */}
                <div
                  className={`group hero-card-float-3 absolute left-[110px] lg:left-[120px] top-[220px] lg:top-[230px] z-30 w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] group-hover:z-40 ${descriptionVisibleForCard(2) ? "hero-card-wrapper-active" : ""}`}
                  onMouseEnter={() => handleCardMouseEnter(2)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Link
                    to="/finance-experts"
                    className="hero-card-link group w-full h-full rounded-[40px] px-5 pt-5 pb-7 lg:px-6 lg:pt-6 lg:pb-9 flex flex-col items-center justify-center text-center shadow-[0_15px_40px_rgba(245,158,11,0.15)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:z-40 cursor-pointer overflow-hidden bg-white/70 backdrop-blur-xl border border-white hover:border-[#f59e0b]/50"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#f59e0b]/10 to-transparent" />
                    <div
                      className={`hero-card-fill pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#f59e0b] to-[#d97706] origin-center transition-transform duration-500 ease-in-out group-hover:scale-[1.7] ${descriptionVisibleForCard(2) ? "scale-[1.7]" : "scale-0"}`}
                    />
                    <div className="hero-card-content relative z-10 flex flex-col items-center justify-center text-center transition-colors duration-500 ease-in-out group-hover:text-white">
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-500">
                        <TrendingUp className="w-7 h-7 lg:w-8 lg:h-8 text-[#f59e0b] group-hover:text-white transition-colors duration-500 ease-in-out" />
                      </div>
                      <h3 className="font-extrabold text-[#6a3e06] group-hover:text-white text-lg lg:text-xl mb-1 leading-tight transition-colors duration-500 ease-in-out tracking-tight">
                        {t("finance")}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${descriptionVisibleForCard(2) ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                          }`}
                      >
                        <p className="text-[#6a3e06]/80 group-hover:text-white/90 text-sm font-medium leading-snug transition-colors duration-500 ease-in-out">
                          {t("buildFinancialFoundation")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-20">
          {showCardsBelow && <ChooseYourPath />}
        </div>
      </div>
    </div>
  );
}
