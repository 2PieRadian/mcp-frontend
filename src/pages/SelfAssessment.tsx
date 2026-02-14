import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SelfAssessmentNavbar from "../components/SelfAssessmentNavbar";
import useScrollToTop from "../hooks/useScrollToTop";

export default function SelfAssessment() {
  useScrollToTop();
  const { t } = useTranslation("sectors");

  return (
    <div className="self-assessment-page max-w-[1350px] mx-auto px-[25px]">
      <SelfAssessmentNavbar />

      <div className="self-assessment-intro min-h-[calc(100svh-76px)] flex flex-col items-center justify-center">
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-[clamp(30px,6vw,48px)] font-semibold">
            {t("selfAssessment.title")}
          </h1>

          <p className="text-[clamp(16px,3vw,20px)] text-light-text mt-[10px]">
            {t("selfAssessment.description")}
          </p>
        </div>

        <Link
          to="/self-assessment/questions"
          className="mt-[50px] bg-[#44666C] text-white px-[30px] py-[13px] rounded-[30px] text-[18px]"
        >
          {t("startAssessment", { ns: "common" })}
        </Link>
      </div>
    </div>
  );
}
