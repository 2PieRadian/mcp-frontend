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

interface FinanceCardProps {
  assessment: AssessmentCatalogItem;
  ctaLabel: string;
}

function FinanceCard({ assessment, ctaLabel }: FinanceCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg border border-stone-100 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
      style={
        {
          "--accent": assessment.accentColor,
        } as any
      }
    >
      <div className="relative z-10 px-[clamp(20px,2.1vw,35px)] py-[clamp(25px,2.5vw,35px)] flex flex-col h-full min-h-[clamp(200px,25vw,260px)]">
        <div
          className="mb-[clamp(0.5rem,1.5vw,1rem)] w-[clamp(2.5rem,6vw,3rem)] h-[clamp(2.5rem,6vw,3rem)] rounded-xl flex items-center justify-center shadow-md transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <div
            className="text-white flex items-center justify-center transition-colors duration-500"
            style={{
              width: "clamp(1rem, 2.5vw, 1.5rem)",
              height: "clamp(1rem, 2.5vw, 1.5rem)",
            }}
          >
            {renderAssessmentIcon(assessment.iconKey)}
          </div>
        </div>

        <p
          className="font-semibold uppercase tracking-wider mb-[clamp(0.25rem,1vw,0.5rem)] opacity-90 transition-colors duration-500"
          style={{
            color: "var(--accent)",
            fontSize: "clamp(12px, 1.5vw, 14px)",
          }}
        >
          {assessment.subtitle}
        </p>

        <h3
          className="font-bold mb-[clamp(0.5rem,1.5vw,0.75rem)] leading-tight group-hover:translate-x-1 transition-all duration-500 text-stone-800"
          style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          {assessment.title}
        </h3>

        <p
          className="leading-relaxed mb-[clamp(1.5rem,3vw,2rem)] grow transition-colors duration-500 text-stone-500"
          style={{ fontSize: "16px" }}
        >
          {assessment.description}
        </p>

        <Link
          to={`/assessments/${assessment.domain}/${assessment.slug}`}
          className="relative overflow-hidden flex items-center justify-center gap-2 font-semibold px-[clamp(20px,3vw,28px)] py-[clamp(12px,2vw,16px)] rounded-xl mt-auto transition-all duration-500 hover:scale-105 hover:shadow-lg group/btn cursor-pointer bg-[var(--accent)] text-white hover:opacity-95"
        >
          <span
            className="relative z-10 transition-colors duration-500 text-white"
            style={{ fontSize: "16px" }}
          >
            {ctaLabel}
          </span>
          <ArrowRight
            className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500 text-white"
            size={18}
          />
        </Link>
      </div>
    </div>
  );
}

export default function Finance() {
  const { t } = useTranslation("quiz");
  const assessments = getAssessmentsByDomain("finance");

  return (
    <>
      <Helmet>
        <title>
          Finance Self-Assessment | MindCurePath Expert-Verified Financial
          Insights
        </title>
        <meta
          name="description"
          content="Take MindCurePath finance self-reflections to explore planning, investment, tax, insurance, and business finance awareness for educational guidance."
        />
        <link
          href="https://mindcurepath.com/assessments/finance"
          rel="canonical"
        />
        <meta
          property="og:title"
          content="Finance Self-Assessment | MindCurePath"
        />
        <meta
          property="og:description"
          content="Discover finance reflection tools across financial planning, investments, GST and tax awareness, insurance, and business finance readiness."
        />
        <meta
          property="og:url"
          content="https://mindcurepath.com/assessments/finance"
        />
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
                {t("financeHeaderBadge")}
              </span>
            </div>

            <h1
              className="font-bold text-[#1a2e35] mb-[clamp(0.75rem,2vw,1rem)] leading-tight"
              style={{ fontSize: "clamp(30px, 5vw, 60px)" }}
            >
              {t("financeAssessHeaderTitleLine1")}
              <br />
              <span className="text-[#44666C]">
                {t("financeAssessHeaderTitleLine2")}
              </span>
            </h1>

            <p
              className="text-[#5a6c75] max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(16px, 2.5vw, 20px)" }}
            >
              {t("financeAssessHeaderSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.5rem,2vw,2.5rem)]">
            {assessments.map((assessment) => (
              <FinanceCard
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
              {t("financeFooterNote")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
