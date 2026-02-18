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
  subtitle: string;
  description: string;
  gradient: string;
  iconBg: string;
  hoverGradient: string;
  accentColor: string;
  delay: number;
  exploreExpertsText: string;
}

function CategoryCard({
  to,
  icon,
  title,
  subtitle,
  description,
  gradient,
  iconBg,
  hoverGradient,
  accentColor,
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
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
        }
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
      className="group relative block opacity-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`relative overflow-hidden rounded-3xl transition-all duration-500 transform-gpu ${isActive ? "scale-[1.02] shadow-2xl" : "shadow-lg hover:shadow-xl"
          }`}
        style={{
          background: isActive ? hoverGradient : gradient,
          minHeight: "320px",
        }}
      >
        {/* Decorative background elements */}
        <div
          className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl transition-all duration-700 ${isActive ? "opacity-40 scale-125" : "opacity-20"
            }`}
          style={{ background: accentColor }}
        />

        <div
          className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl transition-all duration-700 ${isActive ? "opacity-30 scale-110" : "opacity-10"
            }`}
          style={{ background: accentColor }}
        />

        {/* Animated border glow */}
        <div
          className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
            }`}
          style={{
            boxShadow: `inset 0 0 0 2px ${accentColor}40, 0 0 60px ${accentColor}30`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-6 transition-all duration-500 ${isActive ? "scale-110 rotate-3" : ""
              }`}
            style={{ background: iconBg }}
          >
            <div
              className={`transition-transform duration-500 ${isActive ? "scale-110" : ""
                }`}
            >
              {icon}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              {title}
            </h2>
            <p className="text-white/70 text-sm md:text-base font-medium italic">
              "{subtitle}"
            </p>
          </div>

          {/* Description */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed grow">
            {description}
          </p>

          {/* CTA */}
          <div
            className={`mt-6 inline-flex items-center gap-2 text-white font-semibold transition-all duration-300 ${isActive ? "translate-x-2" : ""
              }`}
          >
            <span>{exploreExpertsText}</span>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 ${isActive ? "bg-white/30 scale-110" : ""
                }`}
            >
              <ArrowRight
                className={`w-4 h-4 text-white transition-transform duration-300 ${isActive ? "translate-x-0.5" : ""
                  }`}
              />
            </div>
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
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const exploreExpertsText = t("exploreExperts");

  const categories = [
    {
      to: "/wellness-experts",
      icon: <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("wellness"),
      subtitle: t("wellnessSubtitle"),
      description: t("wellnessDescription"),
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
      hoverGradient: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      accentColor: "#38bdf8",
      delay: 0.1,
      exploreExpertsText,
    },
    {
      to: "/education-experts",
      icon: <BookOpenText className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("education"),
      subtitle: t("educationSubtitle"),
      description: t("educationDescription"),
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
      hoverGradient: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      accentColor: "#34d399",
      delay: 0.25,
      exploreExpertsText,
    },
    {
      to: "/finance-experts",
      icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("finance"),
      subtitle: t("financeSubtitle"),
      description: t("financeDescription"),
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
      hoverGradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      accentColor: "#fbbf24",
      delay: 0.4,
      exploreExpertsText,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
      {/* Navbar */}
      <div className="w-full bg-white/80 backdrop-blur-sm px-[16px] sm:px-[20px] sticky top-0 z-50 border-b border-slate-100">
        <ResponsiveNavbar />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-[16px] sm:px-[20px] py-12 md:py-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 tracking-tight">
            {t("chooseExpertCategoryTitle")}
          </h1>

          {/* Subtitle */}
          <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("chooseExpertCategorySubtitle")}
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.to} {...category} />
          ))}
        </div>

        {/* Bottom decorative section */}
        <div className="text-center mt-16 md:mt-20">
          <div className="inline-flex items-center gap-3 text-stone-400">
            <div className="w-12 h-px bg-stone-200" />
            <span className="text-sm">{t("chooseExpertCategoryFooter")}</span>
            <div className="w-12 h-px bg-stone-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
