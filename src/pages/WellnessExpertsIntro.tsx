import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  Brain,
  Heart,
  Target,
  Zap,
  Users,
  Home,
  HeartOff,
  Wind,
  Moon,
  TrendingUp,
  Scale,
  Apple,
  Flower,
  type LucideIcon,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import {
  EXPERT_CATEGORIES,
  SPECIALIZATION_DESCRIPTIONS,
} from "../lib/constants/experts";

// Icon mapping for wellness specializations
const WELLNESS_ICONS: Record<string, LucideIcon> = {
  "Anxiety & Panic": Brain,
  "Depression Support": Heart,
  "OCD Support": Target,
  "ADHD Support": Zap,
  "Relationship Issues": Users,
  "Family Issues": Home,
  "Breakup Recovery": HeartOff,
  "Loneliness Support": Users,
  "Stress Management": Wind,
  "Sleep Problems": Moon,
  "Life Coaching": TrendingUp,
  "Weight Management": Scale,
  "Nutrition Guidance": Apple,
  "Yoga Therapy": Flower,
};

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  specialization: string;
  icon: LucideIcon;
}

function ExpertCategoryCard({
  title,
  description,
  specialization,
  exploreText,
  icon: Icon,
}: ExpertCategoryCardProps & { exploreText: string }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = specialization
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "and");
    navigate(`/wellness-experts/${slug}`, { state: { specialization } });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col justify-between bg-gradient-to-br from-white to-[#f8fafb] hover:from-[#f0f7fa] hover:to-white border-2 border-[#e0e7eb] hover:border-[#44666C] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md h-full"
    >
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#44666C]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#44666C] to-[#365a62] group-hover:scale-110 transition-transform duration-300">
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
        className="relative z-10 flex items-center justify-center gap-2 mt-auto bg-gradient-to-r from-[#44666C] to-[#365a62] hover:from-[#365a62] hover:to-[#2d4d54] text-white font-semibold rounded-xl py-3 px-5 text-sm transition-all duration-300 shadow-md hover:shadow-lg group-hover:gap-3 cursor-pointer"
      >
        <span>{exploreText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
}

export default function WellnessExpertsIntro() {
  const { t } = useTranslation(["common"]);

  const categories = EXPERT_CATEGORIES.wellness.map((specialization) => ({
    title: specialization,
    description:
      SPECIALIZATION_DESCRIPTIONS[specialization] ||
      "Get expert guidance and support.",
    specialization,
    icon: WELLNESS_ICONS[specialization] || Heart,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafb] to-white px-[20px]">
      <ResponsiveNavbar />

      <div className="max-w-[1350px] mx-auto pb-[80px]">
        {/* Hero Section */}
        <div className="relative mt-[40px] mb-[60px]">
          <div className="relative h-[240px] sm:h-[280px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/health/health.jpg"
              alt="Wellness and Health"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#44666C]/90 via-[#44666C]/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 lg:px-12 text-white">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">
                  Expert Wellness Support
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Your Journey to
                <br />
                Better Wellness
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl opacity-95 leading-relaxed">
                Connect with certified wellness experts who understand your
                unique needs and guide you toward a healthier, happier life.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-2 text-center">
            Choose Your Focus Area
          </h2>
          <p className="text-center text-[#5a6c75] text-lg mb-10">
            Choose the area where you need expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <ExpertCategoryCard
              key={category.specialization}
              title={category.title}
              description={category.description}
              specialization={category.specialization}
              icon={category.icon}
              exploreText={t("explore", { ns: "common" })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
