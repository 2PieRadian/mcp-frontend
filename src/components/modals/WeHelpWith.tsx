import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EXPERT_CATEGORIES } from "../../lib/constants/experts";

interface WeHelpWithProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  navbarType: "landing" | "experts";
}

export default function WeHelpWith({
  modalRef,
  navbarType = "experts",
}: WeHelpWithProps) {
  const { t } = useTranslation(["navigation", "experts", "common"]);
  const [hoveredExpert, setHoveredExpert] = useState<
    "wellness" | "education" | "finance"
  >("wellness");

  const getCategories = () => {
    if (!hoveredExpert) return [];
    return EXPERT_CATEGORIES[hoveredExpert];
  };

  const getCategoryRoute = (category: string, expertType: string) => {
    const baseRoute = `/${expertType}-experts`;
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    return `${baseRoute}/${categorySlug}`;
  };

  // Map category keys to translation keys
  const getTranslationKey = (category: string): string => {
    const categoryMap: Record<string, string> = {
      Therapists: "therapists",
      "Yoga Experts": "yogaExperts",
      Dieticians: "dieticians",
      "Academic Counsellor": "academicCounsellor",
      "Career Planning Specialist": "careerPlanningSpecialist",
      "Path Finder Consultant": "pathFinderConsultant",
      "Investment counsellor": "investmentCounsellor",
      "Financial Expert": "financialExpert",
      "GST & Taxation Expert": "gstTaxationExpert",
    };
    return categoryMap[category] || category;
  };

  return (
    <div
      ref={modalRef}
      className={`absolute top-[50px] ${
        navbarType === "landing" && "left-[50%] -translate-x-1/2 min-w-[570px]"
      } ${
        navbarType === "experts" && "left-[50px] w-full"
      } flex items-stretch justify-between gap-[20px] bg-navbar-dropdown-bg z-20 rounded-[10px] p-[10px]`}
    >
      <div className="flex flex-col text-white gap-[10px] flex-2">
        <Link
          to="/wellness-experts"
          className={`transition-all px-[15px] py-[7px] text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "wellness"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("wellness")}
        >
          {t("wellnessExperts", { ns: "navigation" })}
        </Link>
        <Link
          to="/education-experts"
          className={`transition-all px-[15px] py-[7px] text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "education"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("education")}
        >
          {t("educationExperts", { ns: "navigation" })}
        </Link>
        <Link
          to="/finance-experts"
          className={`transition-all px-[15px] py-[7px] text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "finance"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("finance")}
        >
          {t("financeExperts", { ns: "navigation" })}
        </Link>
      </div>

      <div className="flex-3 w-full bg-navbar-dropdown-right-outer-bg border border-navbar-dropdown-right-outer text-white p-[5px] rounded-[10px] flex">
        {hoveredExpert ? (
          <div className="grid grid-cols-2 gap-[5px] w-full h-full">
            {getCategories().map((category, index) => {
              const categoryRoute = getCategoryRoute(category, hoveredExpert);

              const translationKey = getTranslationKey(category);
              const translatedCategory =
                t(translationKey, { ns: "experts" }) || category;

              const isMultiLine = translatedCategory.length > 15;

              return (
                <Link
                  key={index}
                  to={categoryRoute}
                  className={`group bg-navbar-dropdown-bg rounded-[10px] p-[15px] flex items-center justify-center text-center hover:bg-white hover:text-navbar-dropdown-bg transition-all cursor-pointer ${
                    isMultiLine ? "col-span-2" : ""
                  }`}
                >
                  <span className="text-[13px] inline-block group-hover:scale-[1.3] transition-all">
                    {translatedCategory}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center text-gray-400">
            {t("hoverOverExpertCategory", { ns: "common" })}
          </div>
        )}
      </div>
    </div>
  );
}
