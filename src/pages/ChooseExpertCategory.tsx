import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { HeartPulse, BookOpenText, TrendingUp, ArrowRight } from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

interface CategoryCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  exploreExpertsText: string;
}

function CategoryCard({
  to,
  icon,
  title,
  description,
  delay,
  exploreExpertsText,
}: CategoryCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
        },
      );
    }
  }, [delay]);

  const handleTouchStart = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsTapped(true);
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsTapped(false), 300);
  };

  const isActive = isHovered || isTapped;

  return (
    <Link
      ref={cardRef}
      to={to}
      className="group block opacity-0 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`relative bg-white rounded-[2rem] p-8 md:p-10 h-full flex flex-col transition-all duration-300 border border-slate-100 ${
          isActive
            ? "shadow-xl -translate-y-1"
            : "shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        }`}
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#f0f9f4] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#0f172a] mb-3">{title}</h2>

        {/* Underline */}
        <div className="w-8 h-[2px] bg-[#2d7f5e] mb-5 transition-all duration-300 group-hover:w-12"></div>

        {/* Description */}
        <p className="text-slate-500 text-[15px] leading-relaxed flex-grow mb-8 font-medium">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3 text-[#2d7f5e] font-bold text-sm mt-auto">
          <span>{exploreExpertsText}</span>
          <div
            className={`w-8 h-8 rounded-full bg-[#f0f9f4] flex items-center justify-center transition-all duration-300 ${isActive ? "bg-[#e2f1e9]" : ""}`}
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ChooseExpertCategory() {
  const { t } = useTranslation("common");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }
  }, []);

  const exploreExpertsText = t("exploreExperts");

  const categories = [
    {
      to: "/wellness-experts",
      icon: <HeartPulse className="w-7 h-7 text-[#2d7f5e]" strokeWidth={2.5} />,
      title: t("wellness"),
      description: t("wellnessDescription"),
      delay: 0.1,
      exploreExpertsText,
    },
    {
      to: "/education-experts",
      icon: (
        <BookOpenText className="w-7 h-7 text-[#2d7f5e]" strokeWidth={2.5} />
      ),
      title: t("education"),
      description: t("educationDescription"),
      delay: 0.25,
      exploreExpertsText,
    },
    {
      to: "/finance-experts",
      icon: <TrendingUp className="w-7 h-7 text-[#2d7f5e]" strokeWidth={2.5} />,
      title: t("finance"),
      description: t("financeDescription"),
      delay: 0.4,
      exploreExpertsText,
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Abstract wave background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 250 C 300 250, 400 150, 720 150 C 1040 150, 1140 250, 1440 250 L 1440 350 C 1140 350, 1040 250, 720 250 C 400 250, 300 350, 0 350 Z"
            stroke="#eef2f6"
            strokeWidth="1"
            fill="none"
            className="opacity-60"
          />
          <path
            d="M0 270 C 300 270, 400 170, 720 170 C 1040 170, 1140 270, 1440 270 L 1440 370 C 1140 370, 1040 270, 720 270 C 400 270, 300 370, 0 370 Z"
            stroke="#eef2f6"
            strokeWidth="1"
            fill="none"
            className="opacity-50"
          />
          <path
            d="M0 290 C 300 290, 400 190, 720 190 C 1040 190, 1140 290, 1440 290 L 1440 390 C 1140 390, 1040 290, 720 290 C 400 290, 300 390, 0 390 Z"
            stroke="#eef2f6"
            strokeWidth="1"
            fill="none"
            className="opacity-40"
          />
          <path
            d="M0 310 C 300 310, 400 210, 720 210 C 1040 210, 1140 310, 1440 310 L 1440 410 C 1140 410, 1040 310, 720 310 C 400 310, 300 410, 0 410 Z"
            stroke="#eef2f6"
            strokeWidth="1"
            fill="none"
            className="opacity-30"
          />
        </svg>
      </div>

      {/* Navbar */}
      <div className="w-full bg-white/80 backdrop-blur-sm px-[16px] sm:px-[20px] sticky top-0 z-50">
        <ResponsiveNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-[16px] sm:px-[20px] py-16 md:py-24 relative z-10 w-full flex flex-col justify-center">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] mb-6 tracking-tight leading-tight">
            {(() => {
              const text = t("chooseExpertCategoryTitle");
              const parts = text.split(/(guidance)/i);
              return (
                <div className="flex flex-col md:inline-block">
                  {parts.map((part, i) =>
                    part.toLowerCase() === "guidance" ? (
                      <span key={i} className="text-[#2d7f5e]">
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </div>
              );
            })()}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            {t("chooseExpertCategorySubtitle")}
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {categories.map((category) => (
            <CategoryCard key={category.to} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}
