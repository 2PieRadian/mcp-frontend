import { Link, useParams } from "react-router-dom";
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
};

export default function AssessmentResult() {
  useScrollToTop();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const params = new URLSearchParams(window.location.search);
  const totalScore = parseInt(params.get("score") || "0");

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

      <div className="min-h-screen bg-linear-to-b px-[20px] from-[#f8fafb] via-white to-[#f0f7fa]">
        <ResponsiveNavbar />

        <div className="max-w-[1350px] mx-auto py-[clamp(2rem,5vw,4rem)]">
          {/* Header */}
          <div className="mb-[clamp(2rem,4vw,3rem)]">
            <Link
              to={`/assessments/wellness/${assessmentType}`}
              className="inline-flex items-center gap-2 text-[#5a6c75] hover:text-[#44666C] transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Assessment</span>
            </Link>
            <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[#1a2e35]">
              {data.title} - Results
            </h1>
            <p className="text-[#5a6c75] mt-2 text-[clamp(0.875rem,2vw,1rem)]">
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
                  <p className="text-white/80 text-xs font-medium mb-2 uppercase tracking-wide">
                    Your Assessment Result
                  </p>
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-white text-[clamp(3rem,7vw,5rem)] font-bold leading-none">
                      {totalScore}
                    </span>
                    <span className="text-white/70 text-[clamp(1.25rem,3vw,1.75rem)] font-medium">
                      out of {maxScore}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs mb-4">
                    Based on your responses to {maxScore / 4} questions
                  </p>
                </div>

                {/* Score Level Explanation */}
                <div className="mb-6 text-center">
                  <div
                    className="inline-block px-4 py-2 rounded-full mb-3"
                    style={{ backgroundColor: data.accentColor + "30" }}
                  >
                    <p className="text-white text-sm font-semibold">
                      {interpretation.category} Level
                    </p>
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed px-2">
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
                  </p>
                </div>

                {/* Progress Bar Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 text-xs font-medium">
                      Score Percentage
                    </span>
                    <span className="text-white text-sm font-bold">
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-white/70 text-xs mt-2 text-center">
                    This percentage shows how your score compares to the maximum
                    possible score
                  </p>
                </div>

                {/* Bottom Info Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">
                      Questions Answered
                    </p>
                    <p className="text-white text-xl font-bold">
                      {maxScore / 4}
                    </p>
                    <p className="text-white/60 text-[10px] mt-1">
                      All questions completed
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">
                      Points Per Question
                    </p>
                    <p className="text-white text-xl font-bold">4</p>
                    <p className="text-white/60 text-[10px] mt-1">
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
                      className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-3"
                      style={{ backgroundColor: data.accentColor }}
                    >
                      {interpretation.category} Level
                    </div>
                    <h3
                      className="text-[clamp(1.1rem,2.5vw,1.3rem)] font-bold mb-2"
                      style={{ color: data.gradientFrom }}
                    >
                      {interpretation.title}
                    </h3>
                    <p className="text-[#5a6c75] leading-relaxed text-[clamp(0.875rem,2vw,1rem)]">
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
                  <h3 className="text-[#1a2e35] font-semibold text-lg">
                    Recommendation
                  </h3>
                </div>
                <p className="text-[#5a6c75] leading-relaxed text-[clamp(0.875rem,2vw,1rem)] pl-8 mb-4">
                  {interpretation.recommendation}
                </p>
                <Link
                  to={getExpertsPageUrl(data.domain)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg w-full group"
                  style={{
                    background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
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
              <h3 className="text-[#1a2e35] font-semibold text-lg">
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
                      <span className="font-medium text-[#1a2e35]">
                        {range.range}:{" "}
                      </span>
                      <span className="text-[#5a6c75] text-sm">
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
              to={`/assessments/wellness/${assessmentType}/questions`}
              className="flex-1 text-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 100%)`,
              }}
            >
              Retake Assessment
            </Link>
            <Link
              to="/assessments/wellness"
              className="flex-1 text-center px-6 py-3 rounded-xl bg-white border border-[#E5E7EB] text-[#44666C] font-medium hover:bg-[#F9FAFB] transition-colors"
            >
              View All Assessments
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
