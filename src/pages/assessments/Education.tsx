import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import { renderAssessmentIcon } from "../../lib/assessmentIcons";
import {
  getAssessmentsByDomain,
  type AssessmentCatalogItem,
} from "../../lib/constants/assessmentCatalog";

interface EducationCardProps {
  assessment: AssessmentCatalogItem;
  ctaLabel: string;
}

function EducationCard({ assessment, ctaLabel }: EducationCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${assessment.gradientFrom} 0%, ${assessment.gradientTo} 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 px-[clamp(20px,2.1vw,35px)] py-[clamp(25px,2.5vw,35px)] flex flex-col h-full min-h-[clamp(200px,25vw,260px)]">
        <div
          className="mb-[clamp(0.5rem,1.5vw,1rem)] w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300"
          style={{ backgroundColor: assessment.accentColor }}
        >
          <div
            className="text-white flex items-center justify-center"
            style={{
              width: "clamp(1rem, 2.5vw, 1.5rem)",
              height: "clamp(1rem, 2.5vw, 1.5rem)",
            }}
          >
            {renderAssessmentIcon(assessment.iconKey)}
          </div>
        </div>

        <p
          className="font-semibold uppercase tracking-wider mb-[clamp(0.25rem,1vw,0.5rem)] opacity-90"
          style={{
            color: assessment.accentColor,
            fontSize: "clamp(12px, 1.5vw, 14px)",
          }}
        >
          {assessment.subtitle}
        </p>

        <h3
          className="font-bold text-white mb-[clamp(0.5rem,1.5vw,0.75rem)] leading-tight group-hover:translate-x-1 transition-transform duration-300"
          style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          {assessment.title}
        </h3>

        <p
          className="text-white/90 leading-relaxed mb-[clamp(1.5rem,3vw,2rem)] grow"
          style={{ fontSize: "16px" }}
        >
          {assessment.description}
        </p>

        <Link
          to={`/assessments/${assessment.domain}/${assessment.slug}`}
          className="flex items-center justify-center gap-2 bg-white text-[#44666C] font-semibold px-[clamp(20px,3vw,28px)] py-[clamp(12px,2vw,16px)] rounded-xl mt-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 group/btn cursor-pointer"
        >
          <span style={{ fontSize: "16px" }}>{ctaLabel}</span>
          <ArrowRight
            className="group-hover/btn:translate-x-1 transition-transform duration-300"
            size={18}
          />
        </Link>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-500"
          style={{ backgroundColor: assessment.accentColor }}
        />
      </div>
    </div>
  );
}

export default function Education() {
  const { t } = useTranslation("quiz");
  const assessments = getAssessmentsByDomain("education");

  return (
    <>
      <Helmet>
        <title>Education Self-Assessment | MindCurePath Expert-Verified Learning Insights</title>
        <meta name="description" content="Take MindCurePath education self-reflections to explore study habits, career clarity, exam preparation, guidance readiness, and self-learning patterns." />
        <link href="https://mindcurepath.com/assessments/education" rel="canonical" />
        <meta property="og:title" content="Education Self-Assessment | MindCurePath" />
        <meta property="og:description" content="Discover education reflection tools across academic habits, career path clarity, mentoring, exam preparation, and self-learning." />
        <meta property="og:url" content="https://mindcurepath.com/assessments/education" />
      </Helmet>

      <div className="min-h-screen bg-white px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />

        <div className="max-w-[1000px] mx-auto py-[clamp(2rem,5vw,4rem)]">
          <div className="text-center mb-[clamp(2rem,5vw,4rem)]">
            <div className="inline-block mb-[clamp(0.75rem,2vw,1rem)]">
              <span
                className="font-semibold uppercase tracking-widest text-[#44666C] bg-[#E0ECEE] px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full"
                style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.875rem)" }}
              >
                {t("educationHeaderBadge")}
              </span>
            </div>

            <h1
              className="font-bold text-[#1a2e35] mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
              style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
            >
              {t("educationHeaderTitleLine1")}
              <br />
              <span className="text-[#44666C]">{t("educationHeaderTitleLine2")}</span>
            </h1>

            <p
              className="text-[#5a6c75] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(16px, 2.5vw, 20px)" }}
            >
              {t("educationHeaderSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.5rem,2vw,2.5rem)]">
            {assessments.map((assessment) => (
              <EducationCard
                key={assessment.slug}
                assessment={assessment}
                ctaLabel={t("beginAssessmentCta")}
              />
            ))}
          </div>

          <div className="mt-[clamp(2rem,5vw,3rem)] text-center">
            <p
              className="text-[#5a6c75]"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              {t("educationFooterNote")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
