import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useAuth } from "../context/AuthContext";
import LoginRequiredModal from "../components/modals/LoginRequiredModal";
import { ArrowLeft, CheckCircle2, Clock, Shield } from "lucide-react";
import { renderAssessmentIcon } from "../lib/assessmentIcons";
import {
  ASSESSMENT_DISCLAIMER,
  getAssessmentBySlug,
} from "../lib/constants/assessmentCatalog";

export default function AssessmentIntro() {
  const navigate = useNavigate();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const { t } = useTranslation("quiz");
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const assessment = getAssessmentBySlug(assessmentType);

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#44666C] text-xl">{t("assessmentNotFound")}</p>
      </div>
    );
  }

  const startAssessment = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    navigate(`/assessments/${assessment.domain}/${assessment.slug}/questions`);
  };

  return (
    <>
      <Helmet>
        <title>{assessment.title} | MindCurePath</title>
        <meta name="description" content={assessment.description} />
        <link
          href={`https://mindcurepath.com/assessments/${assessment.domain}/${assessment.slug}`}
          rel="canonical"
        />
      </Helmet>

      <div className="min-h-screen bg-white px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />

        <div className="max-w-[1200px] mx-auto py-[clamp(1.5rem,4vw,3rem)]">
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-3xl p-[clamp(1.5rem,4vw,3rem)] mb-[clamp(1.5rem,3vw,3rem)]"
            style={{
              background: `linear-gradient(135deg, ${assessment.gradientFrom} 0%, ${assessment.gradientTo} 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <Link
              to={`/assessments/${assessment.domain}`}
              className="relative z-10 inline-flex items-center gap-2 text-white/90 hover:text-white mb-[clamp(1rem,2vw,1.5rem)] transition-colors duration-200 group cursor-pointer"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span className="text-[clamp(0.875rem,2vw,1rem)] font-medium">
                {t("backToAssessments")}
              </span>
            </Link>

            <div className="relative z-10">
              <div className="flex flex-row items-center gap-[clamp(1rem,3vw,2rem)] mb-[clamp(0.75rem,2vw,1rem)]">
                <div
                  className="w-[clamp(3.5rem,9vw,5rem)] h-[clamp(3.5rem,9vw,5rem)] rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl shrink-0"
                  style={{ backgroundColor: assessment.accentColor }}
                >
                  <div className="text-white" style={{ width: "60%", height: "60%" }}>
                    {renderAssessmentIcon(assessment.iconKey)}
                  </div>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p
                    className="font-semibold uppercase tracking-widest mb-[clamp(0.5rem,1.5vw,0.75rem)]"
                    style={{
                      color: assessment.accentColor,
                      fontSize: "clamp(12px, 1.5vw, 14px)",
                    }}
                  >
                    {assessment.subtitle}
                  </p>
                  <h1
                    className="text-white font-bold leading-tight"
                    style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
                  >
                    {assessment.title}
                  </h1>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed" style={{ fontSize: "16px" }}>
                {assessment.description}
              </p>
            </div>
          </div>

          <div className="mb-[clamp(1.5rem,3vw,3rem)]">
            <button
              onClick={startAssessment}
              className="w-full md:w-auto inline-block px-[clamp(2rem,5vw,3rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-[clamp(25px,30px,30px)] text-white font-semibold text-[clamp(1rem,2vw,1.125rem)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] text-center cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${assessment.gradientFrom} 0%, ${assessment.gradientTo} 100%)`,
              }}
            >
              {t("startAssessmentCta")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,3vw,2rem)] mb-[clamp(1.5rem,3vw,3rem)]">
            <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg">
              <h2 className="text-[#1a2e35] font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2">
                <CheckCircle2 className="text-[#44666C] w-5 h-5 md:w-7 md:h-7" />
                {t("whatYouLearnHeading")}
              </h2>
              <ul className="space-y-[clamp(0.75rem,1.5vw,0.875rem)]">
                {assessment.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-[clamp(0.75rem,1.5vw,0.875rem)]">
                    <div
                      className="w-[clamp(6px,0.5vw,8px)] h-[clamp(6px,0.5vw,8px)] rounded-full mt-[clamp(0.5rem,1vw,0.75rem)] shrink-0"
                      style={{ backgroundColor: assessment.accentColor }}
                    />
                    <span className="text-[#5a6c75] text-[clamp(0.875rem,2vw,1rem)] leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg">
              <h2 className="text-[#1a2e35] font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2">
                <Shield className="text-[#44666C] w-5 h-5 md:w-7 md:h-7" />
                {t("whatYouGetHeading")}
              </h2>
              <ul className="space-y-[clamp(0.75rem,1.5vw,0.875rem)]">
                {assessment.takeaways.map((item, index) => (
                  <li key={index} className="flex items-start gap-[clamp(0.75rem,1.5vw,0.875rem)]">
                    <div
                      className="w-[clamp(6px,0.5vw,8px)] h-[clamp(6px,0.5vw,8px)] rounded-full mt-[clamp(0.5rem,1vw,0.75rem)] shrink-0"
                      style={{ backgroundColor: assessment.accentColor }}
                    />
                    <span className="text-[#5a6c75] text-[clamp(0.875rem,2vw,1rem)] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg mb-[clamp(1.5rem,3vw,2rem)]">
            <div className="flex items-center gap-[clamp(0.75rem,1.5vw,0.875rem)] justify-start">
              <Clock className="text-[#44666C] w-5 h-5 md:w-6 md:h-6" />
              <div>
                <p className="text-[#1a2e35] font-semibold text-[clamp(1rem,2vw,1.125rem)]">
                  {t("assessmentDurationHeading")}
                </p>
                <p className="text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)]">
                  {t("assessmentDuration5to10")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#E0ECEE] rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] mb-[clamp(1.5rem,3vw,2rem)]">
            <h3 className="text-[#1a2e35] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)] mb-[clamp(0.75rem,1.5vw,1rem)]">
              {t("instructionsHeading")}
            </h3>
            <ul className="space-y-[clamp(0.5rem,1vw,0.625rem)] text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
              <li>- {t("instruction1")}</li>
              <li>- Be honest. This is for self-reflection, not diagnosis or professional advice.</li>
              <li>- {t("instruction3")}</li>
              <li>- {t("instruction4")}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] border border-[#E5E7EB]">
            <h3 className="text-[#1a2e35] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)] mb-2">
              Self-Reflection Disclaimer
            </h3>
            <p className="text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
              {ASSESSMENT_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
