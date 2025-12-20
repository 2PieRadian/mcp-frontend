import { Receipt, Wallet, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import useScrollToTop from "../../hooks/useScrollToTop";

interface FinanceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  index: number;
}

function FinanceCard({
  title,
  subtitle,
  description,
  icon,
  gradientFrom,
  gradientTo,
  accentColor,
}: FinanceCardProps) {
  // Map title to assessment route path
  const titleToPath: Record<string, string> = {
    "GST & Taxation": "gst-taxation",
    "Financial Planning": "financial-planning",
  };
  const assessmentPath =
    titleToPath[title] ||
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "");
  const linkTo = `/assessments/finance/${assessmentPath}`;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-[clamp(20px,2.1vw,35px)] py-[clamp(25px,2.5vw,35px)] flex flex-col h-full min-h-[clamp(200px,25vw,260px)]">
        {/* Icon Container */}
        <div
          className="mb-[clamp(0.5rem,1.5vw,1rem)] w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300"
          style={{ backgroundColor: accentColor }}
        >
          <div
            className="text-white flex items-center justify-center"
            style={{
              width: "clamp(1rem, 2.5vw, 1.5rem)",
              height: "clamp(1rem, 2.5vw, 1.5rem)",
            }}
          >
            {icon}
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="font-semibold uppercase tracking-wider mb-[clamp(0.25rem,1vw,0.5rem)] opacity-90"
          style={{
            color: accentColor,
            fontSize: "clamp(12px, 1.5vw, 14px)",
          }}
        >
          {subtitle}
        </p>

        {/* Title */}
        <h3
          className="font-bold text-white mb-[clamp(0.5rem,1.5vw,0.75rem)] leading-tight group-hover:translate-x-1 transition-transform duration-300"
          style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-white/90 leading-relaxed mb-[clamp(1.5rem,3vw,2rem)] grow"
          style={{ fontSize: "16px" }}
        >
          {description}
        </p>

        {/* CTA Button */}
        <Link
          to={linkTo}
          className="flex items-center justify-center gap-2 bg-white text-[#44666C] font-semibold px-[clamp(20px,3vw,28px)] py-[clamp(12px,2vw,16px)] rounded-xl mt-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 group/btn cursor-pointer"
        >
          <span style={{ fontSize: "16px" }}>Begin Assessment</span>
          <ArrowRight
            className="group-hover/btn:translate-x-1 transition-transform duration-300"
            size={18}
          />
        </Link>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-500"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}

export default function Finance() {
  useScrollToTop();
  const financeCards = [
    {
      title: "GST & Taxation",
      subtitle: "Tax Compliance & Planning",
      description:
        "Evaluate your GST and taxation knowledge, compliance practices, and tax planning skills. Get expert guidance to improve your tax management and avoid penalties.",
      icon: <Receipt style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#F59E0B",
      gradientTo: "#D97706",
      accentColor: "#FBBF24",
    },
    {
      title: "Financial Planning",
      subtitle: "Wealth & Future Planning",
      description:
        "Assess your financial planning skills, savings habits, and investment knowledge. Discover areas for improvement and build a secure financial future with expert guidance.",
      icon: <Wallet style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#10B981",
      gradientTo: "#059669",
      accentColor: "#34D399",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Finance Self‑Assessment | MindCurePath Expert‑Verified Financial
          Insights
        </title>
        <meta
          name="description"
          content="Take the MindCurePath finance self‑assessment to understand your tax compliance, financial planning, and wealth management, and get expert‑verified guidance for your financial journey."
        />
        <link
          href="https://mindcurepath.com/assessments/finance"
          rel="canonical"
        />
        <meta
          property="og:title"
          content="Finance Self‑Assessment | MindCurePath"
        />
        <meta
          property="og:description"
          content="Discover your finance profile across tax compliance and financial planning with MindCurePath's expert‑verified assessment."
        />
        <meta
          property="og:url"
          content="https://mindcurepath.com/assessments/finance"
        />
      </Helmet>

      <div className="min-h-screen bg-linear-to-b from-[#f8fafb] via-white to-[#f0f7fa] px-[20px]">
        <ResponsiveNavbar />

        <div className="max-w-[1000px] mx-auto py-[clamp(2rem,5vw,4rem)]">
          {/* Header Section */}
          <div className="text-center mb-[clamp(2rem,5vw,4rem)]">
            <div className="inline-block mb-[clamp(0.75rem,2vw,1rem)]">
              <span
                className="font-semibold uppercase tracking-widest text-[#44666C] bg-[#E0ECEE] px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full"
                style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.875rem)" }}
              >
                Finance Assessment
              </span>
            </div>

            <h1
              className="font-bold text-[#1a2e35] mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
              style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
            >
              Discover Your Financial
              <br />
              <span className="text-[#44666C]">Journey</span>
            </h1>

            <p
              className="text-[#5a6c75] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(16px, 2.5vw, 20px)" }}
            >
              Take a personalized assessment to understand your financial needs
              and receive tailored guidance from certified experts.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.5rem,2vw,2.5rem)]">
            {financeCards.map((card, index) => (
              <FinanceCard key={card.title} {...card} index={index} />
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-[clamp(2rem,5vw,3rem)] text-center">
            <p
              className="text-[#5a6c75]"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              All assessments are confidential and designed to provide insights
              for your financial journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
