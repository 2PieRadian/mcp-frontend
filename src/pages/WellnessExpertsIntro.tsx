import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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
  "Anxiety and Panic Attack Counsellor": "#0EA5E9", // sky
  "Depression Counsellor": "#8B5CF6", // violet
  "OCD Counsellor": "#6366F1", // indigo
  "ADHD Counsellor": "#F59E0B", // amber
  "Couple Counsellor": "#F43F5E", // rose
  "Family Counsellor": "#10B981", // emerald
  "Breakup Recovery Expert": "#EC4899", // pink
  "Loneliness Counsellor": "#06B6D4", // cyan
  "Divorce / Separation Counsellor": "#FB7185", // coral/rose
  "Stress / Overthinking Expert": "#14B8A6", // teal
  Dietician: "#84CC16", // lime
  "Yoga Expert": "#A78BFA", // purple
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
  exploreText,
  icon: Icon,
  accentColor,
  index,
}: ExpertCategoryCardProps & { exploreText: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/wellness-experts/${specializationSlug}`, {
      state: { specialization: specializationValue },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1"
    >
      {/* Subtle border with accent color on hover */}
      <div
        className="absolute inset-0 rounded-2xl border border-stone-200 group-hover:border-transparent transition-colors duration-300"
        style={{
          boxShadow: `0 1px 3px rgba(0,0,0,0.04)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 10px 36px ${accentColor}33, 0 0 0 1px ${accentColor}55`,
        }}
      />

      <div className="relative p-6 h-full flex flex-col">
        {/* Icon with accent background */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${accentColor}26` }}
        >
          <Icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: accentColor }}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-stone-800 mb-2 leading-snug tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-500 leading-relaxed mb-6 line-clamp-3 grow">
          {description}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:gap-3"
          style={{
            backgroundColor: `${accentColor}1F`,
            border: `1px solid ${accentColor}55`,
            color: "#13232A",
          }}
        >
          <span>{exploreText}</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: accentColor }}
          />
        </button>
      </div>
    </div>
  );
}

export default function WellnessExpertsIntro() {
  useScrollToTop();
  const { t } = useTranslation(["common", "experts"]);

  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
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

  // GSAP animations on mount and scroll
  useEffect(() => {
    const tl = gsap.timeline();

    // Initial load animations - fast, no dead time (small overlaps)
    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.55"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.45"
      )
      .fromTo(
        sectionHeadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.35"
      );

    // Animate cards with stagger - AFTER section heading completes (quick gap)
    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
        },
        "+=0.05"
      );
    }

    // Scroll-triggered animations
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
      `}</style>

      <div className="w-full bg-white px-[20px]">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-6xl mx-auto px-[20px] pb-24">
        {/* Hero Section - Organic & Calming (no badge) */}
        <div
          ref={heroRef}
          className="relative pt-16 pb-20 md:pt-20 md:pb-24 text-center overflow-hidden"
        >
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

              <h1
                ref={headingRef}
                className="text-4xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-5 tracking-tight leading-tight"
              >
                {t("wellnessExpertsTitleLine1")}
                <br />
                <span className="relative">
                  <span className="relative z-10 text-[#7C9A92]">
                    {t("wellnessExpertsTitleLine2")}
                  </span>
                  {/* Underline decoration */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#7C9A92]/20"
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
            <p
              ref={subtitleRef}
              className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4"
            >
              {t("wellnessExpertsSubtitle")}
            </p>
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
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
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
              exploreText={t("explore", { ns: "common" })}
            />
          ))}
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
