import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getAssessmentsByDomain,
  type AssessmentDomain,
} from "../../lib/constants/assessmentCatalog";

interface SelfAssmentsModalProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  navbarType: "landing" | "experts";
}

export default function SelfAssmentsModal({
  modalRef,
  navbarType = "experts",
}: SelfAssmentsModalProps) {
  const { t } = useTranslation(["navigation", "common", "quiz"]);
  const [hoveredDomain, setHoveredDomain] =
    useState<AssessmentDomain>("wellness");

  const getDomainRoute = (domain: AssessmentDomain) => `/assessments/${domain}`;
  const getAssessmentRoute = (domain: AssessmentDomain, slug: string) =>
    `/assessments/${domain}/${slug}`;
  const assessments = getAssessmentsByDomain(hoveredDomain);

  return (
    <div
      ref={modalRef}
      className={`absolute top-[50px] ${
        navbarType === "landing" && "left-[50%] -translate-x-1/2 min-w-[800px]"
      } ${
        navbarType === "experts" && "left-[50px] w-full"
      } flex items-stretch justify-between gap-[20px] bg-navbar-dropdown-bg z-20 rounded-[10px] p-[10px]`}
    >
      {/* Left column */}
      <div className="flex flex-col text-white gap-[10px] flex-2">
        <Link
          to={getDomainRoute("wellness")}
          className={`transition-all px-[15px] py-[7px] text-center text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredDomain === "wellness"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredDomain("wellness")}
        >
          {t("common:wellnessAssessments")}
        </Link>
        <Link
          to={getDomainRoute("education")}
          className={`transition-all px-[15px] py-[7px] text-center text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredDomain === "education"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredDomain("education")}
        >
          {t("common:educationAssessments")}
        </Link>
        <Link
          to={getDomainRoute("finance")}
          className={`transition-all px-[15px] py-[7px] text-center text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredDomain === "finance"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredDomain("finance")}
        >
          {t("common:financeAssessments")}
        </Link>
      </div>

      {/* Right column */}
      <div className="flex-4 w-full bg-navbar-dropdown-right-outer-bg border border-navbar-dropdown-right-outer text-white p-[5px] rounded-[10px] flex max-h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-[8px] w-full h-full">
          <div className="grid grid-cols-2 gap-[5px] w-full">
            {assessments.map((assessment) => (
              <Link
                key={`${hoveredDomain}:${assessment.slug}`}
                to={getAssessmentRoute(hoveredDomain, assessment.slug)}
                className="group bg-navbar-dropdown-bg rounded-[10px] px-[13px] py-[13px] flex items-center justify-center text-center hover:bg-white hover:text-navbar-dropdown-bg transition-all cursor-pointer"
              >
                <span className="text-[14px] leading-tight inline-block group-hover:scale-[1.04] transition-all">
                  {assessment.title}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-xs text-white/60 text-center pt-2">
            {t("common:selectAssessment")}
          </div>
        </div>
      </div>
    </div>
  );
}
