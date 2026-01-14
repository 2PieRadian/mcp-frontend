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
  Flower,
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
  "Yoga Expert": Flower,
};

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  specializationValue: string;
  specializationSlug: string;
  icon: LucideIcon;
}

function ExpertCategoryCard({
  title,
  description,
  specializationValue,
  specializationSlug,
  exploreText,
  icon: Icon,
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
      className="group relative flex flex-col justify-between bg-linear-to-br from-white to-[#f8fafb] hover:from-[#f0f7fa] hover:to-white border-2 border-[#e0e7eb] hover:border-[#44666C] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md h-full"
    >
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-[#44666C]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#44666C] to-[#365a62] group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-xl font-bold text-[#1a2e35] mb-3 group-hover:text-[#44666C] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[15px] text-[#5a6c75] leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="relative z-10 flex items-center justify-center gap-2 mt-auto bg-linear-to-r from-[#44666C] to-[#365a62] hover:from-[#365a62] hover:to-[#2d4d54] text-white font-semibold rounded-xl py-3 px-5 text-sm transition-all duration-300 shadow-md hover:shadow-lg group-hover:gap-3 cursor-pointer"
      >
        <span>{exploreText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
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
  }));

  return (
    <div className="min-h-screen bg-white px-[20px]">
      <ResponsiveNavbar />

      <div className="max-w-[1350px] mx-auto pb-[80px]">
        {/* Hero Section */}
        <div className="relative mt-[40px] mb-[60px]">
          <div className="relative h-[240px] sm:h-[280px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/health/health.webp"
              alt="Wellness and Health"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#44666C]/90 via-[#44666C]/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 lg:px-12 text-white">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">
                  {t("wellnessExpertsBadge")}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                {t("wellnessExpertsTitleLine1")}
                <br />
                {t("wellnessExpertsTitleLine2")}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl opacity-95 leading-relaxed">
                {t("wellnessExpertsSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-2 text-center">
            {t("expertsChooseHeading")}
          </h2>
          <p className="text-center text-[#5a6c75] text-lg mb-10">
            {t("expertsChooseSubheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <ExpertCategoryCard
              key={category.specializationSlug}
              title={category.title}
              description={category.description}
              specializationValue={category.specializationValue}
              specializationSlug={category.specializationSlug}
              icon={category.icon}
              exploreText={t("explore", { ns: "common" })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
