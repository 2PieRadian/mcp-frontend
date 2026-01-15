import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Brain,
  Heart,
  Target,
  Zap,
  Users,
  Home,
  HeartOff,
  Wind,
  Scale,
  Apple,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import useScrollToTop from "../hooks/useScrollToTop";
import { EXPERT_CATEGORIES } from "../lib/constants/experts";

// Icon mapping for wellness specializations
const WELLNESS_ICONS: Record<string, LucideIcon> = {
  "Anxiety and Panic Attack Counsellor": Brain,
  "Depression Counsellor": Heart,
  "OCD Counsellor": Target,
  "ADHD Counsellor": Zap,
  "Couple Counsellor": Users,
  "Family Counsellor": Home,
  "Breakup Recovery Expert": HeartOff,
  "Loneliness Counsellor": Users,
  "Divorce / Separation Counsellor": Scale,
  "Stress / Overthinking Expert": Wind,
  Dietician: Apple,
  "Yoga Expert": Flower2,
};

// Catchy (but still wellness-friendly) accent colors for each specialization
const WELLNESS_COLORS: Record<string, string> = {
  // Bright colors with simple “color psychology” cues (calm, growth, energy, empathy)
  "Anxiety and Panic Attack Counsellor": "#14B8A6", // teal (calm / grounding)
  "Depression Counsellor": "#A78BFA", // violet (support / reflection)
  "OCD Counsellor": "#6366F1", // indigo (clarity / structure)
  "ADHD Counsellor": "#F97316", // orange (energy / action)
  "Couple Counsellor": "#F43F5E", // rose (connection / love)
  "Family Counsellor": "#22C55E", // green (care / stability)
  "Breakup Recovery Expert": "#EC4899", // pink (healing / compassion)
  "Loneliness Counsellor": "#06B6D4", // cyan (openness / connection)
  "Divorce / Separation Counsellor": "#EF4444", // red (strength / courage)
  "Stress / Overthinking Expert": "#F59E0B", // amber (warmth / relief)
  Dietician: "#84CC16", // lime (fresh / health)
  "Yoga Expert": "#8B5CF6", // purple (mind-body balance)
};

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  specializationValue: string;
  specializationSlug: string;
  icon: LucideIcon;
  accentColor: string;
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
    navigate(`/wellness-experts/${specializationSlug}`, {
      state: { specialization: specializationValue },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer transition-all duration-500 hover:-translate-y-1"
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
          {/* Icon + Arrow */}
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

export default function WellnessExpertsIntro() {
  useScrollToTop();
  const { t } = useTranslation(["common", "experts"]);

  // Section refs for stagger animation
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const sectionHeadingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const categories = EXPERT_CATEGORIES.wellness.map((spec) => ({
    title: t(`${spec.i18nKey}.title`, { ns: "experts" }),
    description:
      t(`${spec.i18nKey}.description`, { ns: "experts" }) ||
      t("expertsFallbackDescription"),
    specializationValue: spec.value,
    specializationSlug: spec.slug,
    icon: WELLNESS_ICONS[spec.value] || Heart,
    accentColor: WELLNESS_COLORS[spec.value] || "#7C9A92",
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
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes waveFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 40;
          }
        }
        .wave-underline path {
          stroke-dasharray: 10 10;
          animation: waveFlow 2s linear infinite;
        }
      `}</style>

      <div className="w-full bg-white px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-6xl mx-auto px-[16px] sm:px-[20px] pb-24">
        {/* Hero Section - Organic & Calming (no badge) */}
        <div ref={heroSectionRef}>
          <div className="relative pt-16 pb-20 md:pt-20 md:pb-24 text-center overflow-hidden">
            {/* Decorative botanical line art */}
            <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
              <svg width="60" height="180" viewBox="0 0 60 180" fill="none">
                <path
                  d="M30 180 C30 180 30 100 30 60 C30 30 10 10 30 0"
                  stroke="#7C9A92"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M30 120 C30 120 50 100 55 80"
                  stroke="#7C9A92"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M30 90 C30 90 10 70 5 50"
                  stroke="#7C9A92"
                  strokeWidth="1"
                  fill="none"
                />
                <ellipse
                  cx="55"
                  cy="75"
                  rx="8"
                  ry="12"
                  stroke="#7C9A92"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(30 55 75)"
                />
                <ellipse
                  cx="5"
                  cy="45"
                  rx="8"
                  ry="12"
                  stroke="#7C9A92"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(-30 5 45)"
                />
              </svg>
            </div>
            <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
              <svg
                width="60"
                height="180"
                viewBox="0 0 60 180"
                fill="none"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  d="M30 180 C30 180 30 100 30 60 C30 30 10 10 30 0"
                  stroke="#9B8AA5"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M30 120 C30 120 50 100 55 80"
                  stroke="#9B8AA5"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M30 90 C30 90 10 70 5 50"
                  stroke="#9B8AA5"
                  strokeWidth="1"
                  fill="none"
                />
                <ellipse
                  cx="55"
                  cy="75"
                  rx="8"
                  ry="12"
                  stroke="#9B8AA5"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(30 55 75)"
                />
                <ellipse
                  cx="5"
                  cy="45"
                  rx="8"
                  ry="12"
                  stroke="#9B8AA5"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(-30 5 45)"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Main heading with decorative elements */}
              <div className="relative inline-block">
                {/* Small decorative leaves */}
                <span className="absolute -left-6 -top-2 text-[#7C9A92]/40 text-2xl hidden md:block">
                  ✿
                </span>
                <span className="absolute -right-6 -bottom-1 text-[#9B8AA5]/40 text-xl hidden md:block">
                  ❋
                </span>

                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-5 tracking-tight leading-tight">
                  {t("wellnessExpertsTitleLine1")}
                  <br />
                  <span className="relative">
                    <span className="relative z-10 text-[#7C9A92]">
                      {t("wellnessExpertsTitleLine2")}
                    </span>
                    {/* Underline decoration */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#7C9A92]/20 wave-underline"
                      viewBox="0 0 200 12"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 8 Q50 0 100 8 T200 8"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
                {t("wellnessExpertsSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div ref={sectionHeadingRef} className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
            {t("expertsChooseHeading")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            {t("expertsChooseSubheading")}
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={cardsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {categories.map((category) => (
              <ExpertCategoryCard
                key={category.specializationSlug}
                title={category.title}
                description={category.description}
                specializationValue={category.specializationValue}
                specializationSlug={category.specializationSlug}
                icon={category.icon}
                accentColor={category.accentColor}
              />
            ))}
          </div>
        </div>

        {/* Bottom decorative text */}
        <div
          ref={footerRef}
          className="text-center mt-16 pt-8 border-t border-stone-100"
        >
          <p className="text-stone-400 text-sm">
            Your journey to wellness begins with a single step
          </p>
        </div>
      </div>
    </div>
  );
}
