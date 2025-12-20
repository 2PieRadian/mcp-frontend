import { Helmet } from "react-helmet-async";
import { useParams, Link, useLocation } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import {
  Brain,
  Apple,
  Heart,
  Flower2,
  CheckCircle2,
  Clock,
  Shield,
  Compass,
  Briefcase,
  GraduationCap,
  Receipt,
  Wallet,
} from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop";

interface AssessmentInfo {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  benefits: string[];
  duration: string;
  whatYouGet: string[];
}

const assessmentData: Record<string, AssessmentInfo> = {
  adhd: {
    title: "ADHD Assessment",
    subtitle: "Attention & Focus",
    description:
      "Understand your attention patterns and discover personalized strategies to enhance focus, manage distractions, and optimize your cognitive performance in daily life.",
    icon: <Brain style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#4F46E5",
    gradientTo: "#6366F1",
    accentColor: "#818CF8",
    benefits: [
      "Identify attention patterns and focus challenges",
      "Discover personalized strategies for better concentration",
      "Understand your cognitive performance strengths",
      "Get expert-verified insights and recommendations",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Comprehensive attention and focus analysis",
      "Personalized improvement strategies",
      "Expert-verified recommendations",
      "Actionable insights for daily life",
    ],
  },
  diet: {
    title: "Diet Assessment",
    subtitle: "Nutrition & Wellness",
    description:
      "Evaluate your eating habits and receive evidence-based guidance to create a balanced nutrition plan that supports your health goals and lifestyle preferences.",
    icon: <Apple style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#059669",
    gradientTo: "#10B981",
    accentColor: "#34D399",
    benefits: [
      "Evaluate your current eating habits",
      "Receive evidence-based nutrition guidance",
      "Create a balanced nutrition plan",
      "Align your diet with health goals",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Comprehensive nutrition analysis",
      "Personalized dietary recommendations",
      "Evidence-based guidance",
      "Actionable meal planning tips",
    ],
  },
  relationship: {
    title: "Relationship Assessment",
    subtitle: "Connection & Bonds",
    description:
      "Explore your relationship dynamics and communication patterns to build stronger, more meaningful connections with partners, family, and friends.",
    icon: <Heart style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#E11D48",
    gradientTo: "#F43F5E",
    accentColor: "#FB7185",
    benefits: [
      "Understand relationship dynamics",
      "Improve communication patterns",
      "Build stronger connections",
      "Enhance emotional intelligence",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Relationship pattern analysis",
      "Communication improvement strategies",
      "Personalized connection tips",
      "Expert-verified insights",
    ],
  },
  yoga: {
    title: "Yoga Assessment",
    subtitle: "Mind & Body Balance",
    description:
      "Assess your physical and mental alignment to find the perfect yoga practice that harmonizes your body, mind, and spirit for holistic well-being.",
    icon: <Flower2 style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#0D9488",
    gradientTo: "#14B8A6",
    accentColor: "#2DD4BF",
    benefits: [
      "Assess physical and mental alignment",
      "Find the perfect yoga practice for you",
      "Harmonize body, mind, and spirit",
      "Achieve holistic well-being",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Personalized yoga practice recommendations",
      "Mind-body alignment analysis",
      "Holistic wellness insights",
      "Expert-guided practice suggestions",
    ],
  },
  "path-finder": {
    title: "Path Finder Assessment",
    subtitle: "Life Direction & Clarity",
    description:
      "Discover your life path and gain clarity on your direction. Understand your strengths, decision-making patterns, and build a clear vision for your future.",
    icon: <Compass style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#7C3AED",
    gradientTo: "#8B5CF6",
    accentColor: "#A78BFA",
    benefits: [
      "Gain clarity on your life direction",
      "Understand your strengths and decision-making",
      "Build a clear vision for your future",
      "Get personalized guidance for your path",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Life direction analysis",
      "Self-awareness assessment",
      "Personalized path-finding insights",
      "Expert-verified recommendations",
    ],
  },
  "career-planning": {
    title: "Career Planning Assessment",
    subtitle: "Professional Growth",
    description:
      "Evaluate your career readiness and planning skills. Discover your strengths, set clear goals, and build a structured path for professional success.",
    icon: <Briefcase style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#DC2626",
    gradientTo: "#EF4444",
    accentColor: "#F87171",
    benefits: [
      "Evaluate your career readiness",
      "Set clear professional goals",
      "Build structured career planning",
      "Develop professional growth strategies",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Career readiness analysis",
      "Professional goal setting guidance",
      "Structured career planning insights",
      "Expert-verified career recommendations",
    ],
  },
  academic: {
    title: "Academic Assessment",
    subtitle: "Study Habits & Performance",
    description:
      "Assess your academic habits, study patterns, and learning strategies. Identify areas for improvement and develop effective study techniques for better performance.",
    icon: <GraduationCap style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#0891B2",
    gradientTo: "#06B6D4",
    accentColor: "#22D3EE",
    benefits: [
      "Assess your study habits and patterns",
      "Identify areas for academic improvement",
      "Develop effective study techniques",
      "Enhance learning and performance",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Comprehensive academic habit analysis",
      "Personalized study strategy recommendations",
      "Performance improvement insights",
      "Expert-verified academic guidance",
    ],
  },
  "gst-taxation": {
    title: "GST & Taxation Assessment",
    subtitle: "Tax Compliance & Planning",
    description:
      "Evaluate your GST and taxation knowledge, compliance practices, and tax planning skills. Get expert guidance to improve your tax management and avoid penalties.",
    icon: <Receipt style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    accentColor: "#FBBF24",
    benefits: [
      "Evaluate your GST and tax compliance",
      "Understand your tax knowledge gaps",
      "Improve tax planning and record-keeping",
      "Avoid penalties with better compliance",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Comprehensive tax compliance analysis",
      "Personalized tax planning recommendations",
      "GST and taxation knowledge assessment",
      "Expert-verified tax guidance",
    ],
  },
  "financial-planning": {
    title: "Financial Planning Assessment",
    subtitle: "Wealth & Future Planning",
    description:
      "Assess your financial planning skills, savings habits, and investment knowledge. Discover areas for improvement and build a secure financial future with expert guidance.",
    icon: <Wallet style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    accentColor: "#34D399",
    benefits: [
      "Assess your financial planning skills",
      "Evaluate savings and investment habits",
      "Identify areas for financial improvement",
      "Build a secure financial future",
    ],
    duration: "5-10 minutes",
    whatYouGet: [
      "Comprehensive financial planning analysis",
      "Personalized financial strategy recommendations",
      "Savings and investment insights",
      "Expert-verified financial guidance",
    ],
  },
};

export default function AssessmentIntro() {
  useScrollToTop();
  const location = useLocation();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const data = assessmentData[assessmentType || ""];

  // Determine domain from pathname
  const domain = location.pathname.includes("/assessments/education/")
    ? "education"
    : location.pathname.includes("/assessments/finance/")
    ? "finance"
    : "wellness";

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#44666C] text-xl">Assessment not found</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data.title} | MindCurePath</title>
        <meta name="description" content={data.description} />
        <link
          href={`https://mindcurepath.com/assessments/${domain}/${assessmentType}`}
          rel="canonical"
        />
      </Helmet>

      <div className="min-h-screen bg-linear-to-b from-[#f8fafb] via-white to-[#f0f7fa] px-[20px]">
        <ResponsiveNavbar />

        <div className="max-w-[1200px] mx-auto py-[clamp(1.5rem,4vw,3rem)]">
          {/* Hero Section */}
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-3xl p-[clamp(1.5rem,4vw,3rem)] mb-[clamp(1.5rem,3vw,3rem)]"
            style={{
              background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-[clamp(1rem,3vw,2rem)]">
              <div
                className="w-[clamp(3.5rem,9vw,5rem)] h-[clamp(3.5rem,9vw,5rem)] rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: data.accentColor }}
              >
                <div
                  className="text-white"
                  style={{ width: "60%", height: "60%" }}
                >
                  {data.icon}
                </div>
              </div>

              <div className="flex-1 text-left">
                <p
                  className="font-semibold uppercase tracking-widest mb-[clamp(0.5rem,1.5vw,0.75rem)]"
                  style={{
                    color: data.accentColor,
                    fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
                  }}
                >
                  {data.subtitle}
                </p>
                <h1
                  className="text-white font-bold mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
                  style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
                >
                  {data.title}
                </h1>
                <p
                  className="text-white/90 leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)" }}
                >
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          {/* Start Assessment Button */}
          <div className="mb-[clamp(1.5rem,3vw,3rem)]">
            <Link
              to={`/assessments/${domain}/${assessmentType}/questions`}
              className="w-full md:w-auto inline-block px-[clamp(2rem,5vw,3rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-[clamp(25px,30px,30px)] text-white font-semibold text-[clamp(1rem,2vw,1.125rem)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] text-center"
              style={{
                background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
              }}
            >
              Start Assessment
            </Link>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,3vw,2rem)] mb-[clamp(1.5rem,3vw,3rem)]">
            {/* Benefits Section */}
            <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg">
              <h2 className="text-[#1a2e35] font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2">
                <CheckCircle2 className="text-[#44666C] w-5 h-5 md:w-7 md:h-7" />
                What You'll Learn
              </h2>
              <ul className="space-y-[clamp(0.75rem,1.5vw,0.875rem)]">
                {data.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-[clamp(0.75rem,1.5vw,0.875rem)]"
                  >
                    <div
                      className="w-[clamp(6px,0.5vw,8px)] h-[clamp(6px,0.5vw,8px)] rounded-full mt-[clamp(0.5rem,1vw,0.75rem)] shrink-0"
                      style={{ backgroundColor: data.accentColor }}
                    />
                    <span className="text-[#5a6c75] text-[clamp(0.875rem, 2vw, 1rem)] leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Get Section */}
            <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg">
              <h2 className="text-[#1a2e35] font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2">
                <Shield className="text-[#44666C] w-5 h-5 md:w-7 md:h-7" />
                What You'll Get
              </h2>
              <ul className="space-y-[clamp(0.75rem,1.5vw,0.875rem)]">
                {data.whatYouGet.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-[clamp(0.75rem,1.5vw,0.875rem)]"
                  >
                    <div
                      className="w-[clamp(6px,0.5vw,8px)] h-[clamp(6px,0.5vw,8px)] rounded-full mt-[clamp(0.5rem,1vw,0.75rem)] shrink-0"
                      style={{ backgroundColor: data.accentColor }}
                    />
                    <span className="text-[#5a6c75] text-[clamp(0.875rem, 2vw, 1rem)] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg mb-[clamp(1.5rem,3vw,2rem)]">
            <div className="flex items-center gap-[clamp(0.75rem,1.5vw,0.875rem)] justify-start">
              <Clock className="text-[#44666C] w-5 h-5 md:w-6 md:h-6" />
              <div>
                <p className="text-[#1a2e35] font-semibold text-[clamp(1rem,2vw,1.125rem)]">
                  Assessment Duration
                </p>
                <p className="text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)]">
                  {data.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#E0ECEE] rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)]">
            <h3 className="text-[#1a2e35] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)] mb-[clamp(0.75rem,1.5vw,1rem)]">
              Instructions
            </h3>
            <ul className="space-y-[clamp(0.5rem,1vw,0.625rem)] text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
              <li>
                • Select the option that feels most like you in everyday life.
              </li>
              <li>
                • Be honest — this is for self-reflection only, not diagnosis.
              </li>
              <li>• Take your time and answer thoughtfully.</li>
              <li>• All responses are confidential and secure.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
