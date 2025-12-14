import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  Calculator,
  TrendingUp,
  Shield,
  ChartLine,
  PieChart,
  Target,
  AlertCircle,
  ArrowDown,
  Star,
  FileText,
  Receipt,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import {
  EXPERT_CATEGORIES,
  SPECIALIZATION_DESCRIPTIONS,
} from "../lib/constants/experts";

// Icon mapping for finance specializations
const FINANCE_ICONS: Record<string, LucideIcon> = {
  Budgeting: Calculator,
  "Income Planning": TrendingUp,
  "Emergency Fund": Shield,
  "Beginner Investing": ChartLine,
  "Mutual Funds": PieChart,
  "Investment Planning": Target,
  "Loan Stress": AlertCircle,
  "Debt Repayment": ArrowDown,
  "Credit Score": Star,
  "Tax Planning": FileText,
  "GST Guidance": Receipt,
  "Financial Planning": Target,
  "Insurance Planning": Shield,
  "Retirement Planning": Calendar,
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
    navigate(`/finance-experts/${slug}`, { state: { specialization } });
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
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex items-center justify-center gap-2 mt-auto bg-gradient-to-r from-[#44666C] to-[#365a62] hover:from-[#365a62] hover:to-[#2d4d54] text-white font-semibold rounded-xl py-3 px-5 text-sm transition-all duration-300 shadow-md hover:shadow-lg group-hover:gap-3"
      >
        <span>{exploreText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
}

export default function FinanceExpertsIntro() {
  const { t } = useTranslation(["common"]);

  const categories = EXPERT_CATEGORIES.finance.map((specialization) => ({
    title: specialization,
    description:
      SPECIALIZATION_DESCRIPTIONS[specialization] ||
      "Get expert guidance and support.",
    specialization,
    icon: FINANCE_ICONS[specialization] || TrendingUp,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafb] to-white">
      <ResponsiveNavbar />

      <div className="max-w-[1350px] mx-auto px-[20px] pb-[80px]">
        {/* Hero Section */}
        <div className="relative mt-[40px] mb-[60px]">
          <div className="relative h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/finance/finance.jpg"
              alt="Financial Planning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#44666C]/90 via-[#44666C]/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-12 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                  Expert Financial Guidance
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Build Your Financial
                <br />
                Future With Confidence
              </h1>
              <p className="text-lg md:text-xl max-w-2xl opacity-95 leading-relaxed">
                Get expert financial advice from certified professionals who
                help you make smart decisions and achieve your financial goals.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-2 text-center">
            Explore Our Specializations
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
