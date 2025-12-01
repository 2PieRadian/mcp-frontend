import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SelfAssessmentNavbar from "../components/SelfAssessmentNavbar";
import { SELF_ASSESSMENT_QUIZ } from "../lib/constants";

export default function SelfAssessmentResult() {
  const { t } = useTranslation("common");
  // Get score from URL params or state (for now, using mock data)
  const params = new URLSearchParams(window.location.search);
  const totalScore = parseInt(params.get("score") || "0");
  const maxScore = SELF_ASSESSMENT_QUIZ.length * 4;

  const getInterpretation = (score: number) => {
    if (score >= 45) {
      return {
        title: t("excellentEmotionalBalance"),
        description: t("continueNurturing"),
        color: "#10B981", // Green
      };
    } else if (score >= 30) {
      return {
        title: t("generallyHealthy"),
        description: t("goodFoundation"),
        color: "#3B82F6", // Blue
      };
    } else if (score >= 15) {
      return {
        title: t("averageNeedsImprovement"),
        description: t("roomForGrowth"),
        color: "#F59E0B", // Amber
      };
    } else {
      return {
        title: t("lowBehaviouralAdaptability"),
        description: t("needsAttention"),
        color: "#EF4444", // Red
      };
    }
  };

  const interpretation = getInterpretation(totalScore);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="self-assessment-result-page max-w-[1350px] mx-auto px-[25px]">
      <SelfAssessmentNavbar />

      <div className="mt-[50px] mb-[50px]">
        {/* Main Container - Side by Side Layout */}
        <div className="flex flex-col [@media(min-width:900px)]:flex-row [@media(min-width:900px)]:items-start [@media(min-width:900px)]:gap-[40px]">
          {/* Left Column - Assessment Complete, Score, Ring */}
          <div className="max-w-[500px] [@media(min-width:900px)]:max-w-none [@media(min-width:900px)]:flex-1 mx-auto">
            {/* Congratulations Header */}
            <div className="text-center">
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#44666C]">
                {t("assessmentComplete")}
              </h1>
              <p className="text-[18px] text-[#6B7280] mt-[10px]">
                {t("personalizedAssessment")}
              </p>
            </div>

            {/* Score Display and Progress Ring */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-[30px] md:gap-[50px] mt-[50px]">
              {/* Score Display */}
              <div className="inline-block bg-[#F3F4F6] rounded-full px-[40px] py-[20px]">
                <div className="text-[48px] md:text-[64px] font-bold text-[#44666C]">
                  {totalScore}
                </div>
                <div className="text-[18px] text-[#6B7280] mt-[5px]">
                  {t("outOf")} {maxScore}
                </div>
              </div>

              {/* Progress Ring */}
              <div className="relative w-[200px] h-[200px]">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke={interpretation.color}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 90 * (1 - percentage / 100)
                    }`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[36px] font-bold text-[#44666C]">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Save Result Button */}
            <div className="mt-[40px] flex justify-center">
              <Link
                to="/login"
                className="px-[40px] py-[12px] bg-[#44666C] text-white rounded-[30px] text-[18px] font-medium hover:bg-[#365a62] transition-colors duration-200 inline-block"
              >
                {t("saveAssessmentResult")}
              </Link>
            </div>
          </div>

          {/* Right Column - Interpretation Card, Score Guide, Action Buttons */}
          <div className="[@media(min-width:900px)]:flex-1 mt-[50px] [@media(min-width:900px)]:mt-0">
            {/* Interpretation Card */}
            <div
              className="rounded-[20px] p-[40px] text-white"
              style={{ backgroundColor: interpretation.color }}
            >
              <h2 className="text-[24px] font-bold mb-[15px]">
                {interpretation.title}
              </h2>
              <p className="text-[16px] opacity-95 leading-relaxed">
                {interpretation.description}
              </p>
            </div>

            {/* Score Range Reference */}
            <div className="mt-[40px] bg-[#F9FAFB] rounded-[15px] p-[30px] border border-[#E5E7EB]">
              <h3 className="text-[20px] font-semibold text-[#44666C] mb-[20px]">
                {t("scoreInterpretationGuide")}
              </h3>
              <div className="space-y-[15px]">
                <div className="flex items-start gap-[15px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#10B981] mt-[6px] flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-[#1F2937]">
                      45-60 {t("points")}:
                    </span>
                    <p className="text-[#6B7280]">
                      {t("excellentEmotionalBalance")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[15px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#3B82F6] mt-[6px] flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-[#1F2937]">
                      30-44 {t("points")}:
                    </span>
                    <p className="text-[#6B7280]">{t("generallyHealthy")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-[15px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#F59E0B] mt-[6px] flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-[#1F2937]">
                      15-29 {t("points")}:
                    </span>
                    <p className="text-[#6B7280]">
                      {t("averageNeedsImprovement")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[15px]">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#EF4444] mt-[6px] flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-[#1F2937]">
                      {t("below", { defaultValue: "Below" })} 15 {t("points")}:
                    </span>
                    <p className="text-[#6B7280]">
                      {t("lowBehaviouralAdaptability")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-[15px] mt-[50px]">
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-[40px] py-[15px] rounded-[30px] cursor-pointer text-[18px] font-medium bg-[#E5E7EB] text-[#4B5563] hover:bg-[#D1D5DB] transition-colors duration-200"
              >
                {t("retakeAssessment")}
              </button>
              <Link
                to="/"
                className="flex-1 text-center px-[40px] py-[15px] rounded-[30px] text-[18px] font-medium bg-[#44666C] text-white hover:bg-[#365a62] transition-colors duration-200"
              >
                {t("goToHomepage")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
