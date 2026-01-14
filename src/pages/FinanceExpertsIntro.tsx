import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  PieChart,
  Receipt,
  Shield,
  Landmark,
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

// Professional, trustworthy accent colors for finance
const FINANCE_COLORS: Record<string, string> = {
  "Investment Expert": "#5B7B6A",
  "GST and Tax Expert": "#7B6A5B",
  "Financial Planner": "#6A5B7B",
  "Insurance Expert": "#5B6A7B",
  "Business Finance Consultant": "#7B5B6A",
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
    navigate(`/finance-experts/${specializationSlug}`, {
      state: { specialization: specializationValue },
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{ animationDelay: `${index * 100}ms` }}
      className="group relative cursor-pointer transition-all duration-500 animate-[fadeInUp_0.7s_ease-out_forwards] opacity-0 hover:-translate-y-1"
    >
      {/* Card container */}
      <div
        className="relative rounded-2xl h-full overflow-hidden transition-all duration-500"
        style={{
          border: `1px solid ${accentColor}30`,
        }}
      >
        {/* Background fill animation */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out origin-top scale-y-0 group-hover:scale-y-100"
          style={{ backgroundColor: accentColor }}
        />

        {/* Accent line at top (visible by default) */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{ backgroundColor: accentColor }}
        />

        {/* White background (fades out on hover) */}
        <div className="absolute inset-0 bg-white transition-opacity duration-500 group-hover:opacity-0" />

        <div className="relative z-10 p-6 pt-8 h-full flex flex-col">
          {/* Icon */}
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-white/20"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <Icon
                className="w-5 h-5 transition-colors duration-500 group-hover:text-white"
                style={{ color: accentColor }}
              />
            </div>
            <ArrowRight className="w-5 h-5 text-stone-300 transition-all duration-500 group-hover:text-white group-hover:translate-x-1" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-stone-800 mb-3 leading-snug transition-colors duration-500 group-hover:text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-stone-500 leading-relaxed mb-6 line-clamp-3 grow transition-colors duration-500 group-hover:text-white/80">
            {description}
          </p>

          {/* CTA */}
          <div className="text-sm font-medium transition-colors duration-500">
            <span
              className="transition-colors duration-500 group-hover:text-white"
              style={{ color: accentColor }}
            >
              {exploreText} →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinanceExpertsIntro() {
  useScrollToTop();
  const { t } = useTranslation(["common", "experts"]);

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

      <ResponsiveNavbar />

      <div className="max-w-6xl mx-auto px-5 pb-24">
        {/* Hero Section - Clean & Professional */}
        <div className="pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center">
                <Landmark className="w-7 h-7 text-[#5B7B6A]" />
              </div>
            </div>

            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-stone-200 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5B7B6A]" />
              <span className="text-xs font-semibold tracking-wide text-stone-600 uppercase">
                {t("financeHeroBadge")}
              </span>
            </div> */}

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

        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
            {t("financeChooseHeading")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            {t("financeChooseSubheading")}
          </p>
        </div>

        {/* Categories Grid */}
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
              exploreText={t("explore", { ns: "common" })}
            />
          ))}
        </div>

        {/* Meaningful footer */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="text-lg md:text-xl text-stone-600 font-light italic leading-relaxed mb-4">
              "Financial peace isn't about being rich. It's about having a plan,
              making informed decisions, and knowing you're not alone on this
              journey."
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
