import { Brain, Apple, Heart, Flower2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import useScrollToTop from "../../hooks/useScrollToTop";

interface WellnessCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  index: number;
  ctaLabel: string;
  linkTo: string;
}

function WellnessCard({
  title,
  subtitle,
  description,
  icon,
  gradientFrom,
  gradientTo,
  accentColor,
  ctaLabel,
  linkTo,
}: WellnessCardProps) {
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
          <span style={{ fontSize: "16px" }}>{ctaLabel}</span>
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

export default function Wellness() {
  useScrollToTop();
  const { t } = useTranslation("quiz");
  const wellnessCards = [
    {
      slug: "adhd",
      titleKey: "wellnessCardAdhdTitle",
      subtitleKey: "wellnessCardAdhdSubtitle",
      descriptionKey: "wellnessCardAdhdDescription",
      icon: <Brain style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#4F46E5",
      gradientTo: "#6366F1",
      accentColor: "#818CF8",
    },

    {
      slug: "diet",
      titleKey: "wellnessCardDietTitle",
      subtitleKey: "wellnessCardDietSubtitle",
      descriptionKey: "wellnessCardDietDescription",
      icon: <Apple style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#059669",
      gradientTo: "#10B981",
      accentColor: "#34D399",
    },

    {
      slug: "relationship",
      titleKey: "wellnessCardRelationshipTitle",
      subtitleKey: "wellnessCardRelationshipSubtitle",
      descriptionKey: "wellnessCardRelationshipDescription",
      icon: <Heart style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#E11D48",
      gradientTo: "#F43F5E",
      accentColor: "#FB7185",
    },

    {
      slug: "yoga",
      titleKey: "wellnessCardYogaTitle",
      subtitleKey: "wellnessCardYogaSubtitle",
      descriptionKey: "wellnessCardYogaDescription",
      icon: <Flower2 style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#0D9488",
      gradientTo: "#14B8A6",
      accentColor: "#2DD4BF",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Wellness Self‑Assessment | MindCurePath Expert‑Verified Health
          Insights
        </title>
        <meta
          name="description"
          content="Take the MindCurePath wellness self‑assessment to understand ADHD, diet, relationships, and mind‑body balance, and get expert‑verified guidance for your health journey."
        />
        <link
          href="https://mindcurepath.com/assessments/wellness"
          rel="canonical"
        />
        <meta
          property="og:title"
          content="Wellness Self‑Assessment | MindCurePath"
        />
        <meta
          property="og:description"
          content="Discover your wellness profile across attention, nutrition, relationships, and yoga‑based mind‑body balance with MindCurePath's expert‑verified assessment."
        />
        <meta
          property="og:url"
          content="https://mindcurepath.com/assessments/wellness"
        />
      </Helmet>

      <div className="min-h-screen bg-white px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />

        <div className="max-w-[1000px] mx-auto py-[clamp(2rem,5vw,4rem)]">
          {/* Header Section */}
          <div className="text-center mb-[clamp(2rem,5vw,4rem)]">
            <div className="inline-block mb-[clamp(0.75rem,2vw,1rem)]">
              <span
                className="font-semibold uppercase tracking-widest text-[#44666C] bg-[#E0ECEE] px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full"
                style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.875rem)" }}
              >
                {t("wellnessHeaderBadge")}
              </span>
            </div>

            <h1
              className="font-bold text-[#1a2e35] mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
              style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
            >
              {t("wellnessHeaderTitleLine1")}
              <br />
              <span className="text-[#44666C]">
                {t("wellnessHeaderTitleLine2")}
              </span>
            </h1>

            <p
              className="text-[#5a6c75] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(16px, 2.5vw, 20px)" }}
            >
              {t("wellnessHeaderSubtitle")}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.5rem,2vw,2.5rem)]">
            {wellnessCards.map((card, index) => (
              <WellnessCard
                key={card.slug}
                title={t(card.titleKey)}
                subtitle={t(card.subtitleKey)}
                description={t(card.descriptionKey)}
                icon={card.icon}
                gradientFrom={card.gradientFrom}
                gradientTo={card.gradientTo}
                accentColor={card.accentColor}
                index={index}
                ctaLabel={t("beginAssessmentCta")}
                linkTo={`/assessments/wellness/${card.slug}`}
              />
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-[clamp(2rem,5vw,3rem)] text-center">
            <p
              className="text-[#5a6c75]"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              {t("wellnessFooterNote")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
