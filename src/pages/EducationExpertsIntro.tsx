import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Compass,
  Target,
  BookOpen,
  Brain,
  GraduationCap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import useScrollToTop from "../hooks/useScrollToTop";
import { EXPERT_CATEGORIES } from "../lib/constants/experts";

// Icon mapping for education specializations
const EDUCATION_ICONS: Record<string, LucideIcon> = {
  "Career Path Finder": Compass,
  "Academic Counsellor": BookOpen,
  Achievers: Target,
  Aspirants: Brain,
  "Academic Scholars": GraduationCap,
};

// Warm, inspiring accent colors for education
const EDUCATION_COLORS: Record<string, string> = {
  "Career Path Finder": "#6B8E7D",
  "Academic Counsellor": "#7D8EAB",
  Achievers: "#AB8E7D",
  Aspirants: "#8E7DAB",
  "Academic Scholars": "#7DAB8E",
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
    navigate(`/education-experts/${specializationSlug}`, {
      state: { specialization: specializationValue },
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative bg-white rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
    >
      {/* Card background effects */}
      <div
        className="absolute inset-0 rounded-3xl border border-stone-100 group-hover:border-transparent transition-all duration-300"
        style={{ boxShadow: `0 2px 8px rgba(0,0,0,0.03)` }}
      />
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          boxShadow: `0 12px 40px ${accentColor}18, 0 0 0 1px ${accentColor}30`,
        }}
      />

      <div className="relative p-7 h-full flex flex-col">
        {/* Icon container */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <Icon
            className="w-6 h-6 transition-colors duration-300"
            style={{ color: accentColor }}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-stone-800 mb-3 leading-tight tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-500 leading-relaxed mb-8 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-medium transition-all duration-300 group-hover:gap-3"
          style={{
            backgroundColor: `${accentColor}10`,
            color: accentColor,
          }}
        >
          <span>{exploreText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export default function EducationExpertsIntro() {
  useScrollToTop();
  const { t } = useTranslation(["common", "experts"]);

  const categories = EXPERT_CATEGORIES.education.map((spec) => ({
    title: t(`${spec.i18nKey}.title`, { ns: "experts" }),
    description:
      t(`${spec.i18nKey}.description`, { ns: "experts" }) ||
      t("expertsFallbackDescription"),
    specializationValue: spec.value,
    specializationSlug: spec.slug,
    icon: EDUCATION_ICONS[spec.value] || GraduationCap,
    accentColor: EDUCATION_COLORS[spec.value] || "#6B8E7D",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-stone-50/50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="w-full bg-white px-[20px]">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-5xl mx-auto px-[20px] pb-24">
        {/* Hero Section */}
        <div className="pt-14 pb-20 text-center">
          {/* Decorative icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6B8E7D]/15 to-[#7D8EAB]/15 flex items-center justify-center">
                <Lightbulb className="w-9 h-9 text-[#6B8E7D]" />
              </div>
              {/* Decorative dots */}
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#AB8E7D]"
                style={{ animation: "pulse-soft 2s infinite" }}
              />
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#7D8EAB]"
                style={{ animation: "pulse-soft 2s infinite 0.5s" }}
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6B8E7D]/10 to-[#7D8EAB]/10 mb-8">
            <span className="text-xs font-semibold tracking-wider text-[#6B8E7D] uppercase">
              {t("educationExpertsBadge")}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-5 tracking-tight">
            {t("educationExpertsTitleLine1")}
            <br />
            <span className="bg-gradient-to-r from-[#6B8E7D] to-[#7D8EAB] bg-clip-text text-transparent">
              {t("educationExpertsTitleLine2")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t("educationExpertsSubtitle")}
          </p>
        </div>

        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
            {t("expertsChooseHeading")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            {t("expertsChooseSubheading")}
          </p>
        </div>

        {/* Categories Grid - Larger cards for education */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Inspirational footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-stone-50 border border-stone-100">
            <GraduationCap className="w-4 h-4 text-[#6B8E7D]" />
            <p className="text-stone-500 text-sm font-medium">
              Every expert was once a beginner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
