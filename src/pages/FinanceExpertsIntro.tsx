import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  PieChart,
  Receipt,
  Shield,
  type LucideIcon,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import useScrollToTop from "../hooks/useScrollToTop";
import { EXPERT_CATEGORIES } from "../lib/constants/experts";

// Icon mapping for finance specializations
const FINANCE_ICONS: Record<string, LucideIcon> = {
  "Business Finance Consultant": Calculator,
  "Investment Expert": TrendingUp,
  "GST and Tax Expert": Receipt,
  "Financial Planner": PieChart,
  "Insurance Expert": Shield,
};

// Bright + trustworthy finance palette (confidence, alertness, planning, safety, drive)
const FINANCE_COLORS: Record<string, string> = {
  "Investment Expert": "#0EA5E9", // sky (trust / growth)
  "GST and Tax Expert": "#F59E0B", // amber (attention / clarity)
  "Financial Planner": "#8B5CF6", // violet (strategy / planning)
  "Insurance Expert": "#22C55E", // green (safety)
  "Business Finance Consultant": "#F43F5E", // rose (drive)
};

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  specializationValue: string;
  specializationSlug: string;
  icon: LucideIcon;
  accentColor: string;
  index: number;
}

function ExpertCategoryCard({
  title,
  description,
  specializationValue,
  specializationSlug,
  icon: Icon,
  accentColor,
}: ExpertCategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/finance-experts/${specializationSlug}`, {
      state: { specialization: specializationValue },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
    >
      {/* Card container */}
      <div
        className="relative rounded-2xl h-full overflow-hidden transition-all duration-500"
        style={
          {
            border: `1px solid ${accentColor}30`,
            ["--accent" as any]: accentColor,
          } as CSSProperties
        }
      >
        {/* Background fill animation */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out origin-top scale-y-0 group-hover:scale-y-100"
          style={{ backgroundColor: accentColor }}
        />

        {/* White background (fades out on hover) */}
        <div className="absolute inset-0 bg-white transition-opacity duration-500 group-hover:opacity-0" />

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Icon */}
          <div className="flex items-start justify-between mb-5">
            <Icon className="w-7 h-7 relative z-20 transition-transform duration-500 group-hover:scale-110 text-(--accent) group-hover:text-white" />
            <span className="relative z-20 inline-flex items-center justify-center rounded-[10px] p-1 transition-all duration-500 bg-transparent border border-transparent group-hover:bg-white group-hover:border-white/90 group-hover:translate-x-1 group-hover:scale-110">
              <ArrowRight className="w-5 h-5 text-(--accent)" />
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-stone-800 mb-3 leading-snug transition-colors duration-500 group-hover:text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-stone-500 leading-relaxed mb-0 line-clamp-3 transition-colors duration-500 group-hover:text-white/80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FinanceExpertsIntro() {
  useScrollToTop();
  const { t } = useTranslation(["common", "experts"]);

  // Section refs for stagger animation
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const sectionHeadingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const categories = EXPERT_CATEGORIES.finance.map((spec) => ({
    title: t(`${spec.i18nKey}.title`, { ns: "experts" }),
    description:
      t(`${spec.i18nKey}.description`, { ns: "experts" }) ||
      t("financeFallbackDescription"),
    specializationValue: spec.value,
    specializationSlug: spec.slug,
    icon: FINANCE_ICONS[spec.value] || TrendingUp,
    accentColor: FINANCE_COLORS[spec.value] || "#5B7B6A",
  }));

  // Simple stagger animation on mount
  useEffect(() => {
    const sections = [
      heroSectionRef.current,
      sectionHeadingRef.current,
      cardsRef.current,
      footerRef.current,
    ].filter(Boolean);

    if (sections.length === 0) return;

    // Set initial state
    gsap.set(sections, { opacity: 0, y: 30 });

    // Stagger fade in
    gsap.to(sections, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="w-full bg-white px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-6xl mx-auto px-[16px] sm:px-[20px] pb-24">
        {/* Hero Section - Elegant & Trustworthy */}
        <div ref={heroSectionRef}>
          <div className="relative pt-20 pb-24 overflow-hidden">
            {/* Subtle geometric patterns */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Growth chart line */}
              <svg
                className="absolute top-8 right-8 w-32 h-24 text-[#0EA5E9]/10"
                viewBox="0 0 128 96"
                fill="none"
              >
                <path
                  d="M10 86 L30 70 L50 75 L70 45 L90 50 L110 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="86" r="2" fill="currentColor" />
                <circle cx="30" cy="70" r="2" fill="currentColor" />
                <circle cx="50" cy="75" r="2" fill="currentColor" />
                <circle cx="70" cy="45" r="2" fill="currentColor" />
                <circle cx="90" cy="50" r="2" fill="currentColor" />
                <circle cx="110" cy="20" r="2" fill="currentColor" />
              </svg>

              {/* Security shield pattern */}
              <svg
                className="absolute bottom-8 left-8 w-24 h-32 text-[#10B981]/10"
                viewBox="0 0 96 128"
                fill="none"
              >
                <path
                  d="M48 8 C35 8 25 18 25 30 L25 48 C25 68 35 78 48 88 C61 78 71 68 71 48 L71 30 C71 18 61 8 48 8 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M35 48 L45 58 L61 42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Floating dollar/pie chart elements */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#F59E0B]/20 animate-pulse" />
              <div
                className="absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-[#8B5CF6]/15 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-2/3 left-1/2 w-2 h-2 rounded-full bg-[#F43F5E]/20 animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {/* Decorative growth line above title */}
              <div className="flex justify-center mb-8">
                <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
                  <path
                    d="M4 4 Q30 1 60 4 T116 4"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.6" />
                      <stop
                        offset="50%"
                        stopColor="#10B981"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Main heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-5 tracking-tight leading-tight">
                {t("financeHeroTitle")}
              </h1>

              {/* Subtitle */}
              <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                {t("financeHeroSubtitle")}
              </p>

              {/* Stats row */}
              <div className="flex items-center justify-center gap-8 md:gap-12 pt-6 border-t border-stone-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5B7B6A]">100%</div>
                  <div className="text-xs text-stone-500 mt-1">Verified</div>
                </div>
                <div className="w-px h-8 bg-stone-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5B7B6A]">24/7</div>
                  <div className="text-xs text-stone-500 mt-1">Support</div>
                </div>
                <div className="w-px h-8 bg-stone-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5B7B6A]">Safe</div>
                  <div className="text-xs text-stone-500 mt-1">& Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div
          ref={sectionHeadingRef}
          className="section-heading text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
            {t("expertsChooseHeading")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            {t("expertsChooseSubheading")}
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={cardsRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category, index) => (
              <ExpertCategoryCard
                key={category.specializationSlug}
                title={category.title}
                description={category.description}
                specializationValue={category.specializationValue}
                specializationSlug={category.specializationSlug}
                icon={category.icon}
                accentColor={category.accentColor}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Meaningful footer */}
        <div
          ref={footerRef}
          className="meaningful-footer mt-20 pt-12 border-t border-stone-200"
        >
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="text-lg md:text-xl text-stone-600 font-light italic leading-relaxed mb-4">
              "{t("financeQuote")}"
            </blockquote>
            <p className="text-sm text-stone-400">
              We connect you with verified experts who understand your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
