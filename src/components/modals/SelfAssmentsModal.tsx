import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type AssessmentDomain = "wellness" | "education" | "finance";

interface SelfAssmentsModalProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  navbarType: "landing" | "experts";
}

const ASSESSMENTS: Record<
  AssessmentDomain,
  { label: string; slug: string }[]
> = {
  wellness: [
    { label: "ADHD", slug: "adhd" },
    { label: "Diet", slug: "diet" },
    { label: "Relationship", slug: "relationship" },
    { label: "Yoga", slug: "yoga" },
  ],
  education: [
    { label: "Path Finder", slug: "path-finder" },
    { label: "Career planning", slug: "career-planning" },
    { label: "Academic", slug: "academic" },
  ],
  finance: [
    { label: "GST & taxation", slug: "gst-taxation" },
    { label: "Financial planning", slug: "financial-planning" },
  ],
};

export default function SelfAssmentsModal({
  modalRef,
  navbarType = "experts",
}: SelfAssmentsModalProps) {
  const { t } = useTranslation(["navigation", "common"]);
  const [hoveredDomain, setHoveredDomain] = useState<AssessmentDomain>(
    "wellness"
  );

  const getDomainRoute = (domain: AssessmentDomain) => `/assessments/${domain}`;
  const getAssessmentRoute = (domain: AssessmentDomain, slug: string) =>
    `/assessments/${domain}/${slug}`;

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
          Wellness Assessments
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
          Education Assessments
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
          Finance Assessments
        </Link>
      </div>

      {/* Right column */}
      <div className="flex-4 w-full bg-navbar-dropdown-right-outer-bg border border-navbar-dropdown-right-outer text-white p-[5px] rounded-[10px] flex max-h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-[8px] w-full h-full">
          <div className="grid grid-cols-2 gap-[5px] w-full">
            {ASSESSMENTS[hoveredDomain].map((a) => (
              <Link
                key={`${hoveredDomain}:${a.slug}`}
                to={getAssessmentRoute(hoveredDomain, a.slug)}
                className="group bg-navbar-dropdown-bg rounded-[10px] p-[12px] flex items-center justify-center text-center hover:bg-white hover:text-navbar-dropdown-bg transition-all cursor-pointer"
              >
                <span className="text-[14px] leading-tight inline-block group-hover:scale-[1.1] transition-all">
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-xs text-white/60 text-center pt-2">
            {t("selectAssessment", {
              ns: "common",
              defaultValue: "Select an assessment to start.",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


