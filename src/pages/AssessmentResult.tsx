import { Link, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop";

const assessmentData: Record<
  string,
  {
    title: string;
    domain: "wellness" | "education" | "finance";
    gradientFrom: string;
    gradientTo: string;
    accentColor: string;
    lightBg: string;
    getInterpretation: (score: number) => {
      category: string;
      title: string;
      description: string;
      recommendation: string;
    };
  }
> = {
  adhd: {
    title: "ADHD Assessment",
    domain: "wellness",
    gradientFrom: "#4F46E5",
    gradientTo: "#6366F1",
    accentColor: "#818CF8",
    lightBg: "#EEF2FF",
    getInterpretation: (score: number) => {
      if (score >= 10 && score <= 18) {
        return {
          category: "Low",
          title: "Unlikely to have ADHD symptoms",
          description:
            "Your responses suggest minimal attention or focus challenges. You likely manage daily tasks and maintain focus well.",
          recommendation:
            "Continue maintaining healthy routines and focus strategies. If you experience occasional challenges, consider mindfulness practices.",
        };
      } else if (score >= 19 && score <= 27) {
        return {
          category: "Mild",
          title: "Mild attention or impulsivity traits",
          description:
            "You may experience occasional difficulties with focus, organization, or impulse control. These patterns are manageable but worth addressing.",
          recommendation:
            "Consider implementing time management techniques, breaking tasks into smaller steps, and exploring focus-enhancing strategies.",
        };
      } else if (score >= 28 && score <= 34) {
        return {
          category: "Moderate",
          title: "Moderate ADHD-like patterns",
          description:
            "Your responses indicate noticeable patterns in attention, organization, or impulse control that may impact daily functioning.",
          recommendation:
            "Self-management strategies and professional evaluation may be helpful. Consider consulting with a healthcare professional for personalized guidance.",
        };
      } else {
        return {
          category: "High",
          title: "Strong indicators — professional assessment recommended",
          description:
            "Your responses suggest significant patterns consistent with ADHD symptoms. These patterns may be affecting multiple areas of your life.",
          recommendation:
            "We recommend consulting with a qualified healthcare professional or ADHD specialist for a comprehensive evaluation and personalized treatment plan.",
        };
      }
    },
  },
  diet: {
    title: "Diet Assessment",
    domain: "wellness",
    gradientFrom: "#059669",
    gradientTo: "#10B981",
    accentColor: "#34D399",
    lightBg: "#ECFDF5",
    getInterpretation: (score: number) => {
      if (score >= 51 && score <= 60) {
        return {
          category: "Excellent",
          title: "Excellent eating & lifestyle habits",
          description:
            "Your responses indicate excellent dietary habits and lifestyle choices. You maintain a balanced approach to nutrition and wellness.",
          recommendation:
            "Continue maintaining your healthy routines. Consider consulting with a nutritionist for advanced optimization and personalized meal planning.",
        };
      } else if (score >= 41 && score <= 50) {
        return {
          category: "Good",
          title: "Good habits; minor improvements needed",
          description:
            "You have good dietary habits overall, with some areas that could benefit from minor adjustments to optimize your nutrition.",
          recommendation:
            "Focus on the areas that scored lower. Consider consulting with a nutritionist for personalized guidance on making small improvements.",
        };
      } else if (score >= 31 && score <= 40) {
        return {
          category: "Average",
          title: "Average; dietary correction recommended",
          description:
            "Your responses suggest average dietary habits. There are several areas where improvements could significantly benefit your health and wellness.",
          recommendation:
            "Consider making structured changes to your eating habits. Consulting with a nutritionist can help you create a personalized plan for better nutrition.",
        };
      } else {
      return {
          category: "Needs Improvement",
          title: "Poor habits; needs structured nutrition counselling",
          description:
            "Your responses indicate that your current dietary habits may need significant improvement. Structured guidance can help you build healthier eating patterns.",
        recommendation:
            "We strongly recommend consulting with a qualified nutritionist for comprehensive dietary counseling and a structured plan to improve your nutrition habits.",
      };
      }
    },
  },
  relationship: {
    title: "Relationship Assessment",
    domain: "wellness",
    gradientFrom: "#E11D48",
    gradientTo: "#F43F5E",
    accentColor: "#FB7185",
    lightBg: "#FEF2F2",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Secure",
          title: "Secure Relationship Traits",
          description:
            "Your responses indicate secure relationship traits. You demonstrate trust, healthy communication, and emotional stability in your relationships.",
          recommendation:
            "Continue nurturing your healthy relationship patterns. Consider relationship counseling to further strengthen your connection and communication skills.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Healthy",
          title: "Mostly Healthy Relationship",
          description:
            "Your responses show mostly healthy relationship patterns. You have good foundations with some areas that could benefit from attention.",
          recommendation:
            "Focus on areas where you feel less secure. Consider relationship counseling to address specific concerns and strengthen your bond.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Moderate",
          title: "Mild–Moderate Insecurity",
          description:
            "Your responses indicate mild to moderate relationship insecurity. These patterns may be affecting your emotional well-being and relationship satisfaction.",
          recommendation:
            "Consider relationship counseling to address insecurities and build healthier relationship patterns. Professional guidance can help you develop better communication and trust.",
        };
      } else {
      return {
          category: "High Anxiety",
          title: "High Relationship Anxiety",
          description:
            "Your responses suggest high levels of relationship anxiety. These patterns may be significantly impacting your emotional well-being and relationship dynamics.",
          recommendation:
            "We strongly recommend consulting with a relationship counselor or therapist. Professional support can help you address anxiety, build security, and develop healthier relationship patterns.",
        };
      }
    },
  },
  yoga: {
    title: "Yoga Assessment",
    domain: "wellness",
    gradientFrom: "#0D9488",
    gradientTo: "#14B8A6",
    accentColor: "#2DD4BF",
    lightBg: "#F0FDFA",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Excellent",
          title: "Excellent Yogic Lifestyle",
          description:
            "Your responses indicate an excellent yogic lifestyle. You demonstrate strong mind-body connection, regular practice, and mindful living.",
          recommendation:
            "Continue your excellent practice. Consider exploring advanced yoga techniques or becoming a certified instructor to deepen your journey.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Good",
          title: "Good Yoga Practice",
          description:
            "Your responses show a good yoga practice. You have a solid foundation with room for growth in specific areas of yogic living.",
          recommendation:
            "Focus on areas that scored lower, such as regular practice, meditation, or body awareness. Consider working with a certified yoga instructor for personalized guidance.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Average",
          title: "Average / Needs Improvement",
          description:
            "Your responses suggest an average level of yogic discipline. There are several areas where incorporating yoga practices could significantly benefit your well-being.",
          recommendation:
            "Consider starting a regular yoga practice with a certified instructor. Focus on building consistency in stretching, breathing awareness, and mindfulness practices.",
        };
      } else {
        return {
          category: "Weak",
          title: "Weak Yogic Discipline",
          description:
            "Your responses indicate weak yogic discipline. Your mind-body connection and wellness routines may need significant improvement for better health and balance.",
          recommendation:
            "We recommend starting a structured yoga practice with a certified instructor. Begin with basic poses, breathing exercises, and mindfulness to build a strong foundation for yogic living.",
        };
      }
    },
  },
  "path-finder": {
    title: "Path Finder Assessment",
    domain: "education",
    gradientFrom: "#7C3AED",
    gradientTo: "#8B5CF6",
    accentColor: "#A78BFA",
    lightBg: "#F3E8FF",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Clear",
          title: "Clear Life Path Finder",
          description:
            "Your responses indicate strong clarity, self-awareness, direction, and decision-making abilities. You have a clear vision of your life path.",
          recommendation:
            "Continue building on your strengths. Consider mentoring others or exploring advanced opportunities to further your growth.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Good",
          title: "Good Path Awareness",
          description:
            "You know your direction but need minor refinement. You have a good foundation with some areas that could benefit from more clarity.",
          recommendation:
            "Focus on areas where you feel less certain. Consider working with a career counselor or life coach to refine your path.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Moderate",
          title: "Moderate Clarity",
          description:
            "Your responses show some confusion and inconsistent planning. There are several areas where you could benefit from structured guidance.",
          recommendation:
            "Consider working with a career counselor or life coach for structured guidance. Focus on building self-awareness and decision-making skills.",
        };
      } else {
        return {
          category: "Needs Guidance",
          title: "Lost / Confused Path",
          description:
            "Your responses indicate very unclear direction. You may benefit significantly from structured guidance and self-discovery activities.",
          recommendation:
            "We strongly recommend working with a career counselor or life coach for comprehensive guidance. Focus on self-discovery, building clarity, and developing decision-making skills.",
        };
      }
    },
  },
  "career-planning": {
    title: "Career Planning Assessment",
    domain: "education",
    gradientFrom: "#DC2626",
    gradientTo: "#EF4444",
    accentColor: "#F87171",
    lightBg: "#FEF2F2",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Excellent",
          title: "Excellent Career Readiness",
          description:
            "Your responses show clear goals, strong planning, and active skill building. You demonstrate excellent career readiness and direction.",
          recommendation:
            "Continue your excellent career development. Consider exploring advanced opportunities, networking, and mentoring others in your field.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Good",
          title: "Good Career Direction",
          description:
            "You have a mostly clear career path with minor gaps. Your foundation is solid with some areas that could benefit from more focus.",
          recommendation:
            "Address the areas where you scored lower. Consider working with a career counselor to refine your career plan and fill any gaps.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Average",
          title: "Average / Needs More Clarity",
          description:
            "Your responses indicate confusion, irregular efforts, and limited planning. There are several areas where structured career planning could help significantly.",
          recommendation:
            "Consider working with a career counselor for structured career planning. Focus on building clarity, setting goals, and developing consistent career-building habits.",
        };
      } else {
        return {
          category: "Unclear",
          title: "Unclear & Unplanned Career Path",
          description:
            "Your responses show low clarity and low confidence about your career path. Structured planning and guidance are strongly recommended.",
          recommendation:
            "We strongly recommend working with a career counselor for comprehensive career planning. Focus on self-assessment, exploring options, and building a structured career development plan.",
        };
      }
    },
  },
  academic: {
    title: "Academic Assessment",
    domain: "education",
    gradientFrom: "#0891B2",
    gradientTo: "#06B6D4",
    accentColor: "#22D3EE",
    lightBg: "#ECFEFF",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Excellent",
          title: "Excellent Academic Habits",
          description:
            "Your responses indicate excellent academic habits. You are focused, consistent, and self-driven in your studies.",
          recommendation:
            "Continue maintaining your excellent study habits. Consider mentoring other students or exploring advanced academic opportunities.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Strong",
          title: "Strong Student",
          description:
            "You have good academic habits overall with minor issues. Your foundation is solid with some areas that could be improved.",
          recommendation:
            "Focus on the areas that scored lower. Consider working with an academic counselor or tutor to refine your study strategies.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Average",
          title: "Average / Needs Improvement",
          description:
            "Your responses show irregular study patterns, distractions, and inconsistency. There are several areas where improvement could significantly benefit your academic performance.",
          recommendation:
            "Consider working with an academic counselor or tutor for structured study planning. Focus on building consistency, reducing distractions, and developing better study habits.",
        };
      } else {
        return {
          category: "Weak",
          title: "Weak Study Patterns",
          description:
            "Your responses indicate high distraction, poor planning, and weak study patterns. Structured academic support is strongly recommended.",
          recommendation:
            "We strongly recommend working with an academic counselor or tutor for comprehensive study planning. Focus on building focus, creating study schedules, and developing effective learning strategies.",
        };
      }
    },
  },
  "gst-taxation": {
    title: "GST & Taxation Assessment",
    domain: "finance",
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    accentColor: "#FBBF24",
    lightBg: "#FFFBEB",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Expert",
          title: "GST & Taxation Expert",
          description:
            "Your responses indicate clear knowledge, strong compliance, and excellent handling of GST and taxation matters. You demonstrate expert-level understanding.",
          recommendation:
            "Continue maintaining your excellent compliance. Consider helping others or consulting as a tax advisor to share your expertise.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Good",
          title: "Good Tax Awareness",
          description:
            "You have mostly disciplined tax practices with minor gaps. Your foundation is solid with some areas that could benefit from more attention.",
          recommendation:
            "Focus on areas where you scored lower. Consider working with a tax consultant to refine your tax planning and compliance practices.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Basic",
          title: "Basic / Needs Improvement",
          description:
            "Your responses show confusion, irregular filing, and low planning. There are several areas where structured tax guidance could help significantly.",
          recommendation:
            "Consider working with a tax consultant for structured tax planning and compliance. Focus on building better record-keeping, understanding tax rules, and improving compliance habits.",
        };
      } else {
        return {
          category: "High Risk",
          title: "Poor Compliance / High Risk",
          description:
            "Your responses indicate weak awareness and poor compliance. This poses a high risk of penalties and legal issues. Immediate professional guidance is strongly recommended.",
          recommendation:
            "We strongly recommend working with a qualified tax consultant immediately. Focus on building compliance, understanding tax obligations, and creating a structured system to avoid penalties and legal issues.",
        };
      }
    },
  },
  "financial-planning": {
    title: "Financial Planning Assessment",
    domain: "finance",
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    accentColor: "#34D399",
    lightBg: "#ECFDF5",
    getInterpretation: (score: number) => {
      if (score >= 55 && score <= 60) {
        return {
          category: "Excellent",
          title: "Excellent Financial Planner",
          description:
            "Your responses indicate strong savings, investments, discipline, and future-readiness. You demonstrate excellent financial planning skills.",
          recommendation:
            "Continue your excellent financial planning. Consider exploring advanced investment strategies or becoming a financial advisor to help others.",
        };
      } else if (score >= 45 && score <= 54) {
        return {
          category: "Good",
          title: "Good Financial Planning",
          description:
            "You have mostly balanced financial planning with minor areas to improve. Your foundation is solid with some gaps that could be addressed.",
          recommendation:
            "Focus on the areas that scored lower. Consider working with a financial planner to refine your financial strategy and fill any gaps.",
        };
      } else if (score >= 30 && score <= 44) {
        return {
          category: "Average",
          title: "Average / Needs Improvement",
          description:
            "Your responses show irregular planning, low investments, and poor tracking. There are several areas where structured financial planning could significantly benefit you.",
          recommendation:
            "Consider working with a financial planner for structured financial planning. Focus on building savings habits, creating investment plans, and developing better financial tracking.",
        };
      } else {
      return {
          category: "Weak",
          title: "Weak Financial Discipline",
          description:
            "Your responses indicate high spending, low savings, and weak financial discipline. Serious financial planning is required to build a secure financial future.",
        recommendation:
            "We strongly recommend working with a financial planner for comprehensive financial planning. Focus on building emergency funds, controlling spending, creating savings habits, and developing a structured financial plan.",
      };
      }
    },
  },
};

export default function AssessmentResult() {
  useScrollToTop();
  const location = useLocation();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const params = new URLSearchParams(window.location.search);
  const totalScore = parseInt(params.get("score") || "0");

  // Determine domain from pathname
  const domain = location.pathname.includes("/assessments/education/")
    ? "education"
    : location.pathname.includes("/assessments/finance/")
    ? "finance"
    : "wellness";

  // Calculate max score based on assessment type
  const getMaxScore = (type: string | undefined) => {
    switch (type) {
      case "adhd":
        return 40; // 10 questions × 4
      case "diet":
        return 60; // 15 questions × 4
      case "relationship":
        return 60; // 15 questions × 4
      case "yoga":
        return 60; // 15 questions × 4
      case "path-finder":
        return 60; // 15 questions × 4
      case "career-planning":
        return 60; // 15 questions × 4
      case "academic":
        return 60; // 15 questions × 4
      case "gst-taxation":
        return 60; // 15 questions × 4
      case "financial-planning":
        return 60; // 15 questions × 4
      default:
        return 40;
    }
  };
  const maxScore = getMaxScore(assessmentType);

  const data = assessmentData[assessmentType || ""];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#44666C] text-xl">Assessment not found</p>
      </div>
    );
  }

  const interpretation = data.getInterpretation(totalScore);
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Get experts page URL based on domain
  const getExpertsPageUrl = (domain: string) => {
    return `/${domain}-experts`;
  };

  // Get score interpretation ranges based on assessment type
  const getScoreRanges = () => {
    switch (assessmentType) {
      case "adhd":
        return [
          { range: "10–18", label: "Unlikely to have ADHD symptoms" },
          { range: "19–27", label: "Mild attention or impulsivity traits" },
          { range: "28–34", label: "Moderate ADHD-like patterns" },
          {
            range: "35–40",
            label: "Strong indicators — professional assessment recommended",
          },
        ];
      case "diet":
        return [
          { range: "51–60", label: "Excellent eating & lifestyle habits" },
          { range: "41–50", label: "Good habits; minor improvements needed" },
          { range: "31–40", label: "Average; dietary correction recommended" },
          {
            range: "Below 30",
            label: "Poor habits; needs structured nutrition counselling",
          },
        ];
      case "relationship":
        return [
          { range: "55–60", label: "Secure Relationship Traits" },
          { range: "45–54", label: "Mostly Healthy Relationship" },
          { range: "30–44", label: "Mild–Moderate Insecurity" },
          { range: "15–29", label: "High Relationship Anxiety" },
        ];
      case "yoga":
        return [
          { range: "55–60", label: "Excellent Yogic Lifestyle" },
          { range: "45–54", label: "Good Yoga Practice" },
          { range: "30–44", label: "Average / Needs Improvement" },
          { range: "15–29", label: "Weak Yogic Discipline" },
        ];
      case "path-finder":
        return [
          { range: "55–60", label: "Clear Life Path Finder" },
          { range: "45–54", label: "Good Path Awareness" },
          { range: "30–44", label: "Moderate Clarity" },
          { range: "15–29", label: "Lost / Confused Path" },
        ];
      case "career-planning":
        return [
          { range: "55–60", label: "Excellent Career Readiness" },
          { range: "45–54", label: "Good Career Direction" },
          { range: "30–44", label: "Average / Needs More Clarity" },
          { range: "15–29", label: "Unclear & Unplanned Career Path" },
        ];
      case "academic":
        return [
          { range: "55–60", label: "Excellent Academic Habits" },
          { range: "45–54", label: "Strong Student" },
          { range: "30–44", label: "Average / Needs Improvement" },
          { range: "15–29", label: "Weak Study Patterns" },
        ];
      case "gst-taxation":
        return [
          { range: "55–60", label: "GST & Taxation Expert" },
          { range: "45–54", label: "Good Tax Awareness" },
          { range: "30–44", label: "Basic / Needs Improvement" },
          { range: "15–29", label: "Poor Compliance / High Risk" },
        ];
      case "financial-planning":
        return [
          { range: "55–60", label: "Excellent Financial Planner" },
          { range: "45–54", label: "Good Financial Planning" },
          { range: "30–44", label: "Average / Needs Improvement" },
          { range: "15–29", label: "Weak Financial Discipline" },
        ];
      default:
        return [
          { range: "10–18", label: "Low indicators" },
          { range: "19–27", label: "Mild indicators" },
          { range: "28–34", label: "Moderate indicators" },
          { range: "35–40", label: "High indicators" },
        ];
    }
  };
  const scoreRanges = getScoreRanges();

  return (
    <>
      <Helmet>
        <title>{data.title} Results | MindCurePath</title>
        <meta
          name="description"
          content={`Your ${data.title} results: ${interpretation.title}`}
        />
      </Helmet>

      <div className="min-h-screen bg-linear-to-b px-[16px] sm:px-[20px] from-[#f8fafb] via-white to-[#f0f7fa]">
        <ResponsiveNavbar />

        <div className="max-w-[1350px] mx-auto py-[clamp(2rem,5vw,4rem)]">
          {/* Header */}
          <div className="mb-[clamp(2rem,4vw,3rem)]">
            <Link
              to={`/assessments/${domain}/${assessmentType}`}
              className="inline-flex items-center gap-2 text-[#5a6c75] hover:text-[#44666C] transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              <span className="font-medium" style={{ fontSize: "14px" }}>
                Back to Assessment
              </span>
            </Link>
            <h1
              className="font-bold text-[#1a2e35]"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              {data.title} - Results
            </h1>
            <p className="text-[#5a6c75] mt-2" style={{ fontSize: "16px" }}>
              Your assessment is complete and results are ready
            </p>
          </div>

          {/* Score Card and Right Panel - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left: Score Card */}
          <div
              className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            <div className="relative z-10">
                {/* Score Display */}
                <div className="mb-6 text-center">
                  <p
                    className="text-white/80 font-medium mb-2 uppercase tracking-wide"
                    style={{ fontSize: "12px" }}
                  >
                    Your Assessment Result
                  </p>
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-white text-[clamp(3rem,7vw,5rem)] font-bold leading-none">
                      {totalScore}
                    </span>
                    <span
                      className="text-white/70 font-medium"
                      style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
                    >
                      out of {maxScore}
                    </span>
                  </div>
                  <p
                    className="text-white/80 mb-4"
                    style={{ fontSize: "14px" }}
                  >
                    Based on your responses to {maxScore / 4} questions
                  </p>
                </div>

                {/* Score Level Explanation */}
                <div className="mb-6 text-center">
                  <div
                    className="inline-block px-4 py-2 rounded-full mb-3"
                    style={{ backgroundColor: data.accentColor + "30" }}
                  >
                    <p
                      className="text-white font-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      {interpretation.category} Level
                    </p>
                  </div>
                  <p
                    className="text-white/90 leading-relaxed px-2"
                    style={{ fontSize: "14px" }}
                  >
                    {interpretation.category === "Low" &&
                      "Your score shows minimal indicators. This suggests you have good control and management in this area."}
                    {interpretation.category === "Mild" &&
                      "Your score indicates some indicators are present. These are manageable with awareness and simple strategies."}
                    {interpretation.category === "Moderate" &&
                      "Your score shows noticeable patterns. Consider implementing strategies or seeking guidance for better management."}
                    {interpretation.category === "High" &&
                      "Your score indicates strong patterns. Professional evaluation and support are recommended for comprehensive understanding."}
                    {interpretation.category === "Analysis" &&
                      "Your assessment has been completed and analyzed. Review your results below for personalized insights."}
                    {interpretation.category === "Excellent" &&
                      "Your score indicates excellent performance in this area. You demonstrate strong habits and understanding."}
                    {interpretation.category === "Good" &&
                      "Your score shows good performance with minor areas for improvement. You have a solid foundation."}
                    {interpretation.category === "Average" &&
                      "Your score indicates average performance. There are several areas where improvement could benefit you significantly."}
                    {interpretation.category === "Needs Improvement" &&
                      "Your score suggests areas that need improvement. Structured guidance can help you build better habits."}
                    {interpretation.category === "Secure" &&
                      "Your score shows secure relationship traits. You demonstrate trust, healthy communication, and emotional stability."}
                    {interpretation.category === "Healthy" &&
                      "Your score indicates mostly healthy relationship patterns. You have good foundations with some areas that could benefit from attention."}
                    {interpretation.category === "High Anxiety" &&
                      "Your score suggests high levels of relationship anxiety. Professional support can help you address anxiety and build security."}
                    {interpretation.category === "Clear" &&
                      "Your score indicates strong clarity, self-awareness, direction, and decision-making abilities. You have a clear vision of your path."}
                    {interpretation.category === "Needs Guidance" &&
                      "Your score indicates very unclear direction. Structured guidance and self-discovery activities can help significantly."}
                    {interpretation.category === "Unclear" &&
                      "Your score shows low clarity and confidence. Structured planning and guidance are strongly recommended."}
                    {interpretation.category === "Strong" &&
                      "Your score shows good performance overall with minor issues. Your foundation is solid with some areas that could be improved."}
                    {interpretation.category === "Weak" &&
                      "Your score indicates weak patterns that need significant improvement. Structured support is strongly recommended."}
                    {interpretation.category === "Expert" &&
                      "Your score indicates expert-level knowledge and compliance. You demonstrate excellent understanding and handling of tax matters."}
                    {interpretation.category === "Basic" &&
                      "Your score shows basic understanding with areas needing improvement. Structured tax guidance can help significantly."}
                    {interpretation.category === "High Risk" &&
                      "Your score indicates poor compliance and high risk. Immediate professional guidance is strongly recommended to avoid penalties."}
                  </p>
                </div>

                {/* Progress Bar Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-white/90 font-medium"
                      style={{ fontSize: "14px" }}
                    >
                      Score Percentage
                    </span>
                    <span
                      className="text-white font-bold"
                      style={{ fontSize: "16px" }}
                    >
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p
                    className="text-white/70 mt-2 text-center"
                    style={{ fontSize: "12px" }}
                  >
                    This percentage shows how your score compares to the maximum
                    possible score
                  </p>
                </div>

                {/* Bottom Info Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p
                      className="text-white/70 mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      Questions Answered
                    </p>
                    <p
                      className="text-white font-bold"
                      style={{ fontSize: "24px" }}
                    >
                      {maxScore / 4}
                    </p>
                    <p
                      className="text-white/60 mt-1"
                      style={{ fontSize: "12px" }}
                    >
                      All questions completed
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-white/70 mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      Points Per Question
                    </p>
                    <p
                      className="text-white font-bold"
                      style={{ fontSize: "24px" }}
                    >
                      4
                    </p>
                    <p
                      className="text-white/60 mt-1"
                      style={{ fontSize: "12px" }}
                    >
                      Maximum points possible
                  </p>
                </div>
              </div>
            </div>
          </div>

            {/* Right: Two Vertical Divs */}
            <div className="flex flex-col gap-6">
              {/* First Div: Category Indicator */}
          <div
                className="rounded-2xl p-[clamp(1.5rem,3vw,2rem)] border flex-1"
            style={{
              backgroundColor: data.lightBg,
              borderColor: data.accentColor + "30",
            }}
          >
                <div className="flex items-start gap-3 mb-3">
              <div
                    className="p-2 rounded-lg shrink-0"
                style={{ backgroundColor: data.accentColor + "20" }}
              >
                    <CheckCircle2
                      size={24}
                      style={{ color: data.accentColor }}
                    />
              </div>
              <div className="flex-1">
                    <div
                      className="inline-block px-4 py-2 rounded-full text-white font-semibold mb-3"
                      style={{
                        backgroundColor: data.accentColor,
                        fontSize: "14px",
                      }}
                    >
                      {interpretation.category} Level
                    </div>
                    <h3
                      className="font-bold mb-2"
                      style={{
                        color: data.gradientFrom,
                        fontSize: "clamp(20px, 2.5vw, 24px)",
                      }}
                >
                  {interpretation.title}
                    </h3>
                    <p
                      className="text-[#5a6c75] leading-relaxed"
                      style={{ fontSize: "16px" }}
                    >
                  {interpretation.description}
                </p>
              </div>
            </div>
          </div>

              {/* Second Div: Recommendation */}
              <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] border border-[#E5E7EB] shadow-sm flex-1">
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp
                size={20}
                    className="mt-1 shrink-0"
                style={{ color: data.accentColor }}
              />
                  <h3
                    className="text-[#1a2e35] font-semibold"
                    style={{ fontSize: "20px" }}
                  >
                Recommendation
              </h3>
            </div>
                <p
                  className="text-[#5a6c75] leading-relaxed pl-8 mb-4"
                  style={{ fontSize: "16px" }}
                >
              {interpretation.recommendation}
            </p>
                <Link
                  to={getExpertsPageUrl(data.domain)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg w-full group"
                  style={{
                    background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
                    fontSize: "16px",
                  }}
                >
                  View{" "}
                  {data.domain === "wellness"
                    ? "Wellness"
                    : data.domain === "education"
                    ? "Education"
                    : "Finance"}{" "}
                  Experts
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Score Guide - Full Width */}
          <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] mb-6 border border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} style={{ color: data.accentColor }} />
              <h3
                className="text-[#1a2e35] font-semibold"
                style={{ fontSize: "20px" }}
              >
                Score Interpretation
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoreRanges.map((range, index) => {
                const colors = [
                  data.gradientFrom,
                  data.accentColor,
                  data.gradientTo,
                  data.gradientFrom,
                ];
                return (
                  <div key={index} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                />
                <div className="flex-1">
                      <span
                        className="font-medium text-[#1a2e35]"
                        style={{ fontSize: "16px" }}
                      >
                        {range.range}:{" "}
                  </span>
                      <span
                        className="text-[#5a6c75]"
                        style={{ fontSize: "14px" }}
                      >
                        {range.label}
                  </span>
                </div>
              </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/assessments/${domain}/${assessmentType}/questions`}
              className="flex-1 text-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
                fontSize: "16px",
              }}
            >
              Retake Assessment
            </Link>
            <Link
              to={`/assessments/${domain}`}
              className="flex-1 text-center px-6 py-3 rounded-xl bg-white border border-[#E5E7EB] text-[#44666C] font-medium hover:bg-[#F9FAFB] transition-colors"
              style={{ fontSize: "16px" }}
            >
              View All Assessments
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
