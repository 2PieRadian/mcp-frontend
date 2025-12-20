import { Compass, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import useScrollToTop from "../../hooks/useScrollToTop";

interface EducationCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  index: number;
}

function EducationCard({
  title,
  subtitle,
  description,
  icon,
  gradientFrom,
  gradientTo,
  accentColor,
}: EducationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Convert title to route-friendly format
    const assessmentPath = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/assessments/education/${assessmentPath}`);
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

export default function Education() {
  useScrollToTop();
  const educationCards = [
    {
      title: "Path Finder",
      subtitle: "Life Direction & Clarity",
      description:
        "Discover your life path and gain clarity on your direction. Understand your strengths, decision-making patterns, and build a clear vision for your future.",
      icon: <Compass style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#7C3AED",
      gradientTo: "#8B5CF6",
      accentColor: "#A78BFA",
    },
    {
      title: "Career Planning",
      subtitle: "Professional Growth",
      description:
        "Evaluate your career readiness and planning skills. Discover your strengths, set clear goals, and build a structured path for professional success.",
      icon: <Briefcase style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#DC2626",
      gradientTo: "#EF4444",
      accentColor: "#F87171",
    },
    {
      title: "Academic",
      subtitle: "Study Habits & Performance",
      description:
        "Assess your academic habits, study patterns, and learning strategies. Identify areas for improvement and develop effective study techniques for better performance.",
      icon: <GraduationCap style={{ width: "100%", height: "100%" }} />,
      gradientFrom: "#0891B2",
      gradientTo: "#06B6D4",
      accentColor: "#22D3EE",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Education Self‑Assessment | MindCurePath Expert‑Verified Learning
          Insights
        </title>
        <meta
          name="description"
          content="Take the MindCurePath education self‑assessment to understand your academic habits, career planning, and life direction, and get expert‑verified guidance for your learning journey."
        />
        <link
          href="https://mindcurepath.com/assessments/education"
          rel="canonical"
        />
        <meta
          property="og:title"
          content="Education Self‑Assessment | MindCurePath"
        />
        <meta
          property="og:description"
          content="Discover your education profile across academic performance, career planning, and life direction with MindCurePath's expert‑verified assessment."
        />
        <meta
          property="og:url"
          content="https://mindcurepath.com/assessments/education"
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
                Education Assessment
              </span>
            </div>

            <h1
              className="font-bold text-[#1a2e35] mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
            >
              Discover Your Learning
              <br />
              <span className="text-[#44666C]">Journey</span>
            </h1>

            <p
              className="text-[#5a6c75] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)" }}
            >
              Take a personalized assessment to understand your educational
              needs and receive tailored guidance from certified experts.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.5rem,2vw,2.5rem)]">
            {educationCards.map((card, index) => (
              <EducationCard key={card.title} {...card} index={index} />
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-[clamp(2rem,5vw,3rem)] text-center">
            <p
              className="text-[#5a6c75]"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              All assessments are confidential and designed to provide insights
              for your educational journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
