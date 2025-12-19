import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { ArrowLeft, CheckCircle2, TrendingUp, BookOpen } from "lucide-react";

const assessmentData: Record<
  string,
  {
    title: string;
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
    gradientFrom: "#059669",
    gradientTo: "#10B981",
    accentColor: "#34D399",
    lightBg: "#ECFDF5",
    getInterpretation: (score: number) => {
      return {
        category: "Analysis",
        title: "Nutrition Assessment Complete",
        description: "Your dietary patterns have been analyzed.",
        recommendation:
          "Consult with a nutritionist for personalized guidance.",
      };
    },
  },
  relationship: {
    title: "Relationship Assessment",
    gradientFrom: "#E11D48",
    gradientTo: "#F43F5E",
    accentColor: "#FB7185",
    lightBg: "#FEF2F2",
    getInterpretation: (score: number) => {
      return {
        category: "Analysis",
        title: "Relationship Assessment Complete",
        description: "Your relationship patterns have been analyzed.",
        recommendation: "Consider relationship counseling for deeper insights.",
      };
    },
  },
  yoga: {
    title: "Yoga Assessment",
    gradientFrom: "#0D9488",
    gradientTo: "#14B8A6",
    accentColor: "#2DD4BF",
    lightBg: "#F0FDFA",
    getInterpretation: (score: number) => {
      return {
        category: "Analysis",
        title: "Yoga Assessment Complete",
        description: "Your mind-body alignment has been assessed.",
        recommendation:
          "Explore personalized yoga practices with a certified instructor.",
      };
    },
  },
};

export default function AssessmentResult() {
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const params = new URLSearchParams(window.location.search);
  const totalScore = parseInt(params.get("score") || "0");
  const maxScore = 40; // 10 questions × 4 max score

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

        <div className="w-full mx-auto py-[clamp(2rem,5vw,4rem)]">
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
              Assessment Complete
            </h1>
            <p className="text-[#5a6c75] mt-2 text-[clamp(0.875rem,2vw,1rem)]">
              Your results are ready
            </p>
          </div>

          {/* Score Card */}
          <div
            className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] mb-6 relative overflow-hidden"
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wide">
                    Your Score
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-white text-[clamp(3rem,6vw,4.5rem)] font-bold">
                      {totalScore}
                    </span>
                    <span className="text-white/70 text-[clamp(1.25rem,3vw,1.75rem)] font-medium">
                      / {maxScore}
                    </span>
                  </div>
                  <div className="mt-3 w-full md:w-[200px] h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-2"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    {interpretation.category}
                  </div>
                  <p className="text-white/90 text-[clamp(0.875rem,2vw,1rem)]">
                    {percentage}% Complete
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interpretation Card */}
          <div
            className="rounded-2xl p-[clamp(1.5rem,3vw,2rem)] mb-6 border"
            style={{
              backgroundColor: data.lightBg,
              borderColor: data.accentColor + "30",
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: data.accentColor + "20" }}
              >
                <CheckCircle2 size={24} style={{ color: data.accentColor }} />
              </div>
              <div className="flex-1">
                <h2
                  className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold mb-2"
                  style={{ color: data.gradientFrom }}
                >
                  {interpretation.title}
                </h2>
                <p className="text-[#5a6c75] leading-relaxed text-[clamp(0.875rem,2vw,1rem)]">
                  {interpretation.description}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] mb-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp
                size={20}
                className="mt-1"
                style={{ color: data.accentColor }}
              />
              <h3 className="text-[#1a2e35] font-semibold text-lg">
                Recommendation
              </h3>
            </div>
            <p className="text-[#5a6c75] leading-relaxed text-[clamp(0.875rem,2vw,1rem)] pl-8">
              {interpretation.recommendation}
            </p>
          </div>

          {/* Score Guide */}
          <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] mb-6 border border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} style={{ color: data.accentColor }} />
              <h3 className="text-[#1a2e35] font-semibold text-lg">
                Score Interpretation
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: data.gradientFrom }}
                />
                <div className="flex-1">
                  <span className="font-medium text-[#1a2e35]">10–18: </span>
                  <span className="text-[#5a6c75] text-sm">
                    Unlikely to have ADHD symptoms
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: data.accentColor }}
                />
                <div className="flex-1">
                  <span className="font-medium text-[#1a2e35]">19–27: </span>
                  <span className="text-[#5a6c75] text-sm">
                    Mild attention or impulsivity traits
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: data.gradientTo }}
                />
                <div className="flex-1">
                  <span className="font-medium text-[#1a2e35]">28–34: </span>
                  <span className="text-[#5a6c75] text-sm">
                    Moderate ADHD-like patterns
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: data.gradientFrom }}
                />
                <div className="flex-1">
                  <span className="font-medium text-[#1a2e35]">35–40: </span>
                  <span className="text-[#5a6c75] text-sm">
                    Strong indicators — professional assessment recommended
                  </span>
                </div>
              </div>
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
