import { Brain, Apple, Heart, Flower2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";

interface WellnessCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  index: number;
}

function WellnessCard({
  title,
  subtitle,
  description,
  icon,
  gradientFrom,
  gradientTo,
  accentColor,
}: WellnessCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const assessmentPath = title.toLowerCase();
    navigate(`/assessments/wellness/${assessmentPath}`);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
      onClick={handleClick}
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
            fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
          }}
        >
          {subtitle}
        </p>

        {/* Title */}
        <h3
          className="font-bold text-white mb-[clamp(0.5rem,1.5vw,0.75rem)] leading-tight group-hover:translate-x-1 transition-transform duration-300"
          style={{ fontSize: "clamp(1.125rem, 3vw, 1.875rem)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-white/90 leading-relaxed mb-[clamp(0.75rem,2vw,1rem)] grow"
          style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
        >
          {description}
        </p>

        {/* CTA Button */}
        <div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-white font-semibold mt-auto group-hover:gap-3 transition-all duration-300">
          <span style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>
            Begin Assessment
          </span>

          <ArrowRight
            className="group-hover:translate-x-1 transition-transform duration-300"
            style={{
              width: "clamp(0.875rem, 2vw, 1rem)",
              height: "clamp(0.875rem, 2vw, 1rem)",
            }}
          />
        </div>

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
  const wellnessCards = [
    {
      title: "ADHD",
      subtitle: "Attention & Focus",
      description:
        "Understand your attention patterns and discover personalized strategies to enhance focus, manage distractions, and optimize your cognitive performance in daily life.",
      icon: <Brain style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#4F46E5",
      gradientTo: "#6366F1",
      accentColor: "#818CF8",
    },

    {
      title: "Diet",
      subtitle: "Nutrition & Wellness",
      description:
        "Evaluate your eating habits and receive evidence-based guidance to create a balanced nutrition plan that supports your health goals and lifestyle preferences.",
      icon: <Apple style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#059669",
      gradientTo: "#10B981",
      accentColor: "#34D399",
    },

    {
      title: "Relationship",
      subtitle: "Connection & Bonds",
      description:
        "Explore your relationship dynamics and communication patterns to build stronger, more meaningful connections with partners, family, and friends.",
      icon: <Heart style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#E11D48",
      gradientTo: "#F43F5E",
      accentColor: "#FB7185",
    },

    {
      title: "Yoga",
      subtitle: "Mind & Body Balance",
      description:
        "Assess your physical and mental alignment to find the perfect yoga practice that harmonizes your body, mind, and spirit for holistic well-being.",
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
                Wellness Assessment
              </span>
            </div>

            <h1
              className="font-bold text-[#1a2e35] mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
            >
              Discover Your Wellness
              <br />
              <span className="text-[#44666C]">Journey</span>
            </h1>

            <p
              className="text-[#5a6c75] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)" }}
            >
              Take a personalized assessment to understand your wellness needs
              and receive tailored guidance from certified experts.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.5rem,2vw,2.5rem)]">
            {wellnessCards.map((card, index) => (
              <WellnessCard key={card.title} {...card} index={index} />
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-[clamp(2rem,5vw,3rem)] text-center">
            <p
              className="text-[#5a6c75]"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              All assessments are confidential and designed to provide insights
              for your wellness journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
