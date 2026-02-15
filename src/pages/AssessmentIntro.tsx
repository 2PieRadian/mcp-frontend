import { Helmet } from "react-helmet-async";
import { useParams, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  ArrowLeft,
} from "lucide-react";

interface AssessmentInfo {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  benefitsKeys: string[];
  durationKey: string;
  whatYouGetKeys: string[];
}

const assessmentData: Record<string, AssessmentInfo> = {
  adhd: {
    titleKey: "assessmentIntroAdhdTitle",
    subtitleKey: "assessmentIntroAdhdSubtitle",
    descriptionKey: "assessmentIntroAdhdDescription",
    icon: <Brain style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#4F46E5",
    gradientTo: "#6366F1",
    accentColor: "#818CF8",
    benefitsKeys: [
      "assessmentIntroAdhdLearn1",
      "assessmentIntroAdhdLearn2",
      "assessmentIntroAdhdLearn3",
      "assessmentIntroAdhdLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroAdhdGet1",
      "assessmentIntroAdhdGet2",
      "assessmentIntroAdhdGet3",
      "assessmentIntroAdhdGet4",
    ],
  },
  diet: {
    titleKey: "assessmentIntroDietTitle",
    subtitleKey: "assessmentIntroDietSubtitle",
    descriptionKey: "assessmentIntroDietDescription",
    icon: <Apple style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#059669",
    gradientTo: "#10B981",
    accentColor: "#34D399",
    benefitsKeys: [
      "assessmentIntroDietLearn1",
      "assessmentIntroDietLearn2",
      "assessmentIntroDietLearn3",
      "assessmentIntroDietLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroDietGet1",
      "assessmentIntroDietGet2",
      "assessmentIntroDietGet3",
      "assessmentIntroDietGet4",
    ],
  },
  relationship: {
    titleKey: "assessmentIntroRelationshipTitle",
    subtitleKey: "assessmentIntroRelationshipSubtitle",
    descriptionKey: "assessmentIntroRelationshipDescription",
    icon: <Heart style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#E11D48",
    gradientTo: "#F43F5E",
    accentColor: "#FB7185",
    benefitsKeys: [
      "assessmentIntroRelationshipLearn1",
      "assessmentIntroRelationshipLearn2",
      "assessmentIntroRelationshipLearn3",
      "assessmentIntroRelationshipLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroRelationshipGet1",
      "assessmentIntroRelationshipGet2",
      "assessmentIntroRelationshipGet3",
      "assessmentIntroRelationshipGet4",
    ],
  },
  yoga: {
    titleKey: "assessmentIntroYogaTitle",
    subtitleKey: "assessmentIntroYogaSubtitle",
    descriptionKey: "assessmentIntroYogaDescription",
    icon: <Flower2 style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#0D9488",
    gradientTo: "#14B8A6",
    accentColor: "#2DD4BF",
    benefitsKeys: [
      "assessmentIntroYogaLearn1",
      "assessmentIntroYogaLearn2",
      "assessmentIntroYogaLearn3",
      "assessmentIntroYogaLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroYogaGet1",
      "assessmentIntroYogaGet2",
      "assessmentIntroYogaGet3",
      "assessmentIntroYogaGet4",
    ],
  },
  "path-finder": {
    titleKey: "assessmentIntroPathFinderTitle",
    subtitleKey: "assessmentIntroPathFinderSubtitle",
    descriptionKey: "assessmentIntroPathFinderDescription",
    icon: <Compass style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#7C3AED",
    gradientTo: "#8B5CF6",
    accentColor: "#A78BFA",
    benefitsKeys: [
      "assessmentIntroPathFinderLearn1",
      "assessmentIntroPathFinderLearn2",
      "assessmentIntroPathFinderLearn3",
      "assessmentIntroPathFinderLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroPathFinderGet1",
      "assessmentIntroPathFinderGet2",
      "assessmentIntroPathFinderGet3",
      "assessmentIntroPathFinderGet4",
    ],
  },
  "career-planning": {
    titleKey: "assessmentIntroCareerPlanningTitle",
    subtitleKey: "assessmentIntroCareerPlanningSubtitle",
    descriptionKey: "assessmentIntroCareerPlanningDescription",
    icon: <Briefcase style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#DC2626",
    gradientTo: "#EF4444",
    accentColor: "#F87171",
    benefitsKeys: [
      "assessmentIntroCareerPlanningLearn1",
      "assessmentIntroCareerPlanningLearn2",
      "assessmentIntroCareerPlanningLearn3",
      "assessmentIntroCareerPlanningLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroCareerPlanningGet1",
      "assessmentIntroCareerPlanningGet2",
      "assessmentIntroCareerPlanningGet3",
      "assessmentIntroCareerPlanningGet4",
    ],
  },
  academic: {
    titleKey: "assessmentIntroAcademicTitle",
    subtitleKey: "assessmentIntroAcademicSubtitle",
    descriptionKey: "assessmentIntroAcademicDescription",
    icon: <GraduationCap style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#0891B2",
    gradientTo: "#06B6D4",
    accentColor: "#22D3EE",
    benefitsKeys: [
      "assessmentIntroAcademicLearn1",
      "assessmentIntroAcademicLearn2",
      "assessmentIntroAcademicLearn3",
      "assessmentIntroAcademicLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroAcademicGet1",
      "assessmentIntroAcademicGet2",
      "assessmentIntroAcademicGet3",
      "assessmentIntroAcademicGet4",
    ],
  },
  "gst-taxation": {
    titleKey: "assessmentIntroGstTaxationTitle",
    subtitleKey: "assessmentIntroGstTaxationSubtitle",
    descriptionKey: "assessmentIntroGstTaxationDescription",
    icon: <Receipt style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    accentColor: "#FBBF24",
    benefitsKeys: [
      "assessmentIntroGstTaxationLearn1",
      "assessmentIntroGstTaxationLearn2",
      "assessmentIntroGstTaxationLearn3",
      "assessmentIntroGstTaxationLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroGstTaxationGet1",
      "assessmentIntroGstTaxationGet2",
      "assessmentIntroGstTaxationGet3",
      "assessmentIntroGstTaxationGet4",
    ],
  },
  "financial-planning": {
    titleKey: "assessmentIntroFinancialPlanningTitle",
    subtitleKey: "assessmentIntroFinancialPlanningSubtitle",
    descriptionKey: "assessmentIntroFinancialPlanningDescription",
    icon: <Wallet style={{ width: "100%", height: "100%" }} />,
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    accentColor: "#34D399",
    benefitsKeys: [
      "assessmentIntroFinancialPlanningLearn1",
      "assessmentIntroFinancialPlanningLearn2",
      "assessmentIntroFinancialPlanningLearn3",
      "assessmentIntroFinancialPlanningLearn4",
    ],
    durationKey: "assessmentDuration5to10",
    whatYouGetKeys: [
      "assessmentIntroFinancialPlanningGet1",
      "assessmentIntroFinancialPlanningGet2",
      "assessmentIntroFinancialPlanningGet3",
      "assessmentIntroFinancialPlanningGet4",
    ],
  },
};

export default function AssessmentIntro() {
  const location = useLocation();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const { t } = useTranslation("quiz");
  const data = assessmentData[assessmentType || ""];
  const title = data ? t(data.titleKey) : "";
  const description = data ? t(data.descriptionKey) : "";

  // Determine domain from pathname
  const domain = location.pathname.includes("/assessments/education/")
    ? "education"
    : location.pathname.includes("/assessments/finance/")
      ? "finance"
      : "wellness";

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#44666C] text-xl">{t("assessmentNotFound")}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{title} | MindCurePath</title>
        <meta name="description" content={description} />
        <link
          href={`https://mindcurepath.com/assessments/${domain}/${assessmentType}`}
          rel="canonical"
        />
      </Helmet>

      <div className="min-h-screen bg-white px-[16px] sm:px-[20px]">
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

            {/* Back Button */}
            <Link
              to={`/assessments/${domain}`}
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
                  style={{ backgroundColor: data.accentColor }}
                >
                  <div
                    className="text-white"
                    style={{ width: "60%", height: "60%" }}
                  >
                    {data.icon}
                  </div>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <p
                    className="font-semibold uppercase tracking-widest mb-[clamp(0.5rem,1.5vw,0.75rem)]"
                    style={{
                      color: data.accentColor,
                      fontSize: "clamp(12px, 1.5vw, 14px)",
                    }}
                  >
                    {t(data.subtitleKey)}
                  </p>
                  <h1
                    className="text-white font-bold leading-tight"
                    style={{ fontSize: "clamp(24px, 4vw, 32px)" }}
                  >
                    {title}
                  </h1>
                </div>
              </div>
              <p
                className="text-white/90 leading-relaxed"
                style={{ fontSize: "16px" }}
              >
                {description}
              </p>
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
              {t("startAssessmentCta")}
            </Link>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,3vw,2rem)] mb-[clamp(1.5rem,3vw,3rem)]">
            {/* Benefits Section */}
            <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg">
              <h2 className="text-[#1a2e35] font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2">
                <CheckCircle2 className="text-[#44666C] w-5 h-5 md:w-7 md:h-7" />
                {t("whatYouLearnHeading")}
              </h2>
              <ul className="space-y-[clamp(0.75rem,1.5vw,0.875rem)]">
                {data.benefitsKeys.map((benefitKey, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-[clamp(0.75rem,1.5vw,0.875rem)]"
                  >
                    <div
                      className="w-[clamp(6px,0.5vw,8px)] h-[clamp(6px,0.5vw,8px)] rounded-full mt-[clamp(0.5rem,1vw,0.75rem)] shrink-0"
                      style={{ backgroundColor: data.accentColor }}
                    />
                    <span className="text-[#5a6c75] text-[clamp(0.875rem, 2vw, 1rem)] leading-relaxed">
                      {t(benefitKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You Get Section */}
            <div className="bg-white rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)] shadow-lg">
              <h2 className="text-[#1a2e35] font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-[clamp(1rem,2vw,1.5rem)] flex items-center gap-2">
                <Shield className="text-[#44666C] w-5 h-5 md:w-7 md:h-7" />
                {t("whatYouGetHeading")}
              </h2>
              <ul className="space-y-[clamp(0.75rem,1.5vw,0.875rem)]">
                {data.whatYouGetKeys.map((itemKey, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-[clamp(0.75rem,1.5vw,0.875rem)]"
                  >
                    <div
                      className="w-[clamp(6px,0.5vw,8px)] h-[clamp(6px,0.5vw,8px)] rounded-full mt-[clamp(0.5rem,1vw,0.75rem)] shrink-0"
                      style={{ backgroundColor: data.accentColor }}
                    />
                    <span className="text-[#5a6c75] text-[clamp(0.875rem, 2vw, 1rem)] leading-relaxed">
                      {t(itemKey)}
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
                  {t("assessmentDurationHeading")}
                </p>
                <p className="text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)]">
                  {t(data.durationKey)}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#E0ECEE] rounded-xl md:rounded-2xl p-[clamp(1.25rem,3vw,2rem)]">
            <h3 className="text-[#1a2e35] font-bold text-[clamp(1.125rem,2.5vw,1.25rem)] mb-[clamp(0.75rem,1.5vw,1rem)]">
              {t("instructionsHeading")}
            </h3>
            <ul className="space-y-[clamp(0.5rem,1vw,0.625rem)] text-[#5a6c75] text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed">
              <li>• {t("instruction1")}</li>
              <li>• {t("instruction2")}</li>
              <li>• {t("instruction3")}</li>
              <li>• {t("instruction4")}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
