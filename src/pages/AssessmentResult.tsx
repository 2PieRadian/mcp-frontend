import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Info, TrendingUp } from "lucide-react";
import {
  ASSESSMENT_DISCLAIMER,
  getAssessmentBySlug,
  getAssessmentMaxScore,
  getScoreInterpretation,
  getScoreRanges,
} from "../lib/constants/assessmentCatalog";

export default function AssessmentResult() {
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const params = new URLSearchParams(window.location.search);
  const totalScore = parseInt(params.get("score") || "0");
  const assessment = getAssessmentBySlug(assessmentType);

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#44666C] text-xl">Assessment not found</p>
      </div>
    );
  }

  const maxScore = getAssessmentMaxScore(assessment);
  const interpretation = getScoreInterpretation(assessment, totalScore);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const scoreRanges = getScoreRanges(assessment);
  const expertsPageUrl = `/${assessment.domain}-experts`;

  return (
    <>
      <Helmet>
        <title>{assessment.title} Results | MindCurePath</title>
        <meta
          name="description"
          content={`Your ${assessment.title} results: ${interpretation.category}`}
        />
      </Helmet>

      <div className="min-h-screen bg-linear-to-b px-[16px] sm:px-[20px] from-[#f8fafb] via-white to-[#f0f7fa]">
        <ResponsiveNavbar />

        <div className="max-w-[1350px] mx-auto py-[clamp(2rem,5vw,4rem)]">
          <div className="mb-[clamp(2rem,4vw,3rem)]">
            <Link
              to={`/assessments/${assessment.domain}/${assessment.slug}`}
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
              {assessment.title} - Results
            </h1>
            <p className="text-[#5a6c75] mt-2" style={{ fontSize: "16px" }}>
              Your reflection is complete. Review this as supportive guidance, not a diagnosis or professional decision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div
              className="rounded-2xl p-[clamp(1.5rem,3vw,2.5rem)] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${assessment.gradientFrom} 0%, ${assessment.gradientTo} 100%)`,
              }}
            >
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="mb-6 text-center">
                  <p
                    className="text-white/80 font-medium mb-2 uppercase tracking-wide"
                    style={{ fontSize: "12px" }}
                  >
                    Your Reflection Score
                  </p>
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-white text-[clamp(3rem,7vw,5rem)] font-bold leading-none">
                      {totalScore}
                    </span>
                    <span
                      className="text-white/70 font-medium"
                      style={{ fontSize: "clamp(20px,3vw,28px)" }}
                    >
                      out of {maxScore}
                    </span>
                  </div>
                  <p className="text-white/80 mb-4" style={{ fontSize: "14px" }}>
                    Higher scores indicate more reported support needs in this reflection.
                  </p>
                </div>

                <div className="mb-6 text-center">
                  <div
                    className="inline-block px-4 py-2 rounded-full mb-3"
                    style={{ backgroundColor: assessment.accentColor + "30" }}
                  >
                    <p className="text-white font-semibold" style={{ fontSize: "14px" }}>
                      {interpretation.category}
                    </p>
                  </div>
                  <p className="text-white/90 leading-relaxed px-2" style={{ fontSize: "14px" }}>
                    {interpretation.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 font-medium" style={{ fontSize: "14px" }}>
                      Score Percentage
                    </span>
                    <span className="text-white font-bold" style={{ fontSize: "16px" }}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-white/70 mb-1" style={{ fontSize: "14px" }}>
                      Questions Answered
                    </p>
                    <p className="text-white font-bold" style={{ fontSize: "24px" }}>
                      {assessment.questions.length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 mb-1" style={{ fontSize: "14px" }}>
                      Points Per Question
                    </p>
                    <p className="text-white font-bold" style={{ fontSize: "24px" }}>
                      1-4
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div
                className="rounded-2xl p-[clamp(1.5rem,3vw,2rem)] border flex-1"
                style={{
                  backgroundColor: assessment.lightBg,
                  borderColor: assessment.accentColor + "30",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{ backgroundColor: assessment.accentColor + "20" }}
                  >
                    <CheckCircle2 size={24} style={{ color: assessment.accentColor }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="inline-block px-4 py-2 rounded-full text-white font-semibold mb-3"
                      style={{
                        backgroundColor: assessment.accentColor,
                        fontSize: "14px",
                      }}
                    >
                      {interpretation.category}
                    </div>
                    <h3
                      className="font-bold mb-2"
                      style={{
                        color: assessment.gradientFrom,
                        fontSize: "clamp(20px,2.5vw,24px)",
                      }}
                    >
                      {interpretation.title}
                    </h3>
                    <p className="text-[#5a6c75] leading-relaxed" style={{ fontSize: "16px" }}>
                      {interpretation.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] border border-[#E5E7EB] shadow-sm flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp
                    size={20}
                    className="mt-1 shrink-0"
                    style={{ color: assessment.accentColor }}
                  />
                  <h3 className="text-[#1a2e35] font-semibold" style={{ fontSize: "20px" }}>
                    Supportive Next Step
                  </h3>
                </div>
                <p className="text-[#5a6c75] leading-relaxed pl-8 mb-4" style={{ fontSize: "16px" }}>
                  {interpretation.recommendation}
                </p>
                <Link
                  to={expertsPageUrl}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg w-full group"
                  style={{
                    background: `linear-gradient(135deg, ${assessment.gradientFrom} 0%, ${assessment.gradientTo} 100%)`,
                    fontSize: "16px",
                  }}
                >
                  View {assessment.domain === "wellness" ? "Wellness" : assessment.domain === "education" ? "Education" : "Finance"} Experts
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] mb-6 border border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} style={{ color: assessment.accentColor }} />
              <h3 className="text-[#1a2e35] font-semibold" style={{ fontSize: "20px" }}>
                Score Interpretation
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoreRanges.map((range, index) => {
                const colors = [
                  assessment.gradientFrom,
                  assessment.accentColor,
                  assessment.gradientTo,
                  assessment.gradientFrom,
                  assessment.accentColor,
                ];
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <div className="flex-1">
                      <span className="font-medium text-[#1a2e35]" style={{ fontSize: "16px" }}>
                        {range.range}:{" "}
                      </span>
                      <span className="text-[#5a6c75]" style={{ fontSize: "14px" }}>
                        {range.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-[clamp(1.5rem,3vw,2rem)] mb-6 border border-[#E5E7EB]">
            <div className="flex items-start gap-3">
              <Info size={20} className="mt-1 shrink-0" style={{ color: assessment.accentColor }} />
              <div>
                <h3 className="text-[#1a2e35] font-semibold mb-2" style={{ fontSize: "20px" }}>
                  Self-Reflection Disclaimer
                </h3>
                <p className="text-[#5a6c75] leading-relaxed" style={{ fontSize: "16px" }}>
                  {ASSESSMENT_DISCLAIMER}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/assessments/${assessment.domain}/${assessment.slug}/questions`}
              className="flex-1 text-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${assessment.gradientFrom} 0%, ${assessment.gradientTo} 100%)`,
                fontSize: "16px",
              }}
            >
              Retake Assessment
            </Link>
            <Link
              to={`/assessments/${assessment.domain}`}
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
