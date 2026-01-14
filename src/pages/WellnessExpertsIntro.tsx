import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

// Soft, calming accent colors for each specialization
const WELLNESS_COLORS: Record<string, string> = {
  "Anxiety and Panic Attack Counsellor": "#7C9A92",
  "Depression Counsellor": "#9B8AA5",
  "OCD Counsellor": "#8BA4B4",
  "ADHD Counsellor": "#C4A77D",
  "Couple Counsellor": "#D4A5A5",
  "Family Counsellor": "#A5C4B8",
  "Breakup Recovery Expert": "#B8A5B5",
  "Loneliness Counsellor": "#A5B5C4",
  "Divorce / Separation Counsellor": "#B5A5A5",
  "Stress / Overthinking Expert": "#A5C4C4",
  Dietician: "#B5C4A5",
  "Yoga Expert": "#C4B5A5",
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
      style={{ animationDelay: `${index * 50}ms` }}
      className="group relative bg-white rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
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
          boxShadow: `0 8px 32px ${accentColor}20, 0 0 0 1px ${accentColor}40`,
        }}
      />

      <div className="relative p-6 h-full flex flex-col">
        {/* Icon with accent background */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${accentColor}15` }}
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
            backgroundColor: `${accentColor}10`,
            border: `1px solid ${accentColor}30`,
            color: "#1a2e35",
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

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-50 via-white to-stone-50/50">
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
        <div className="relative pt-16 pb-20 md:pt-20 md:pb-24 text-center overflow-hidden">
          {/* Organic background shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Soft gradient blobs */}
            <div
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #7C9A92 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -top-10 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #9B8AA5 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full opacity-15 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #A5C4B8 0%, transparent 70%)",
              }}
            />
          </div>

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
            <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              {t("wellnessExpertsSubtitle")}
            </p>
          </div>
        </div>

        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
            {t("expertsChooseHeading")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            {t("expertsChooseSubheading")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
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
        <div className="text-center mt-16 pt-8 border-t border-stone-100">
          <p className="text-stone-400 text-sm">
            Your journey to wellness begins with a single step
          </p>
        </div>
      </div>
    </div>
  );
}
