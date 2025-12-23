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

  const getCategoryRoute = (categorySlug: string, expertType: string) =>
    `/${expertType}-experts/${categorySlug}`;

  return (
    <div
      ref={modalRef}
      className={`absolute top-[50px] ${
        navbarType === "landing" && "left-[50%] -translate-x-1/2 min-w-[800px]"
      } ${
        navbarType === "experts" && "left-[50px] w-full"
      } flex items-stretch justify-between gap-[20px] bg-navbar-dropdown-bg z-20 rounded-[10px] p-[10px]`}
    >
      <div className="flex flex-col text-white gap-[10px] flex-2">
        <Link
          to="/wellness-experts"
          className={`transition-all px-[15px] py-[7px] text-center text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
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
          className={`transition-all px-[15px] py-[7px] text-center text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
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
          className={`transition-all px-[15px] py-[7px] text-center text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "finance"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("finance")}
        >
          {t("financeExperts", { ns: "navigation" })}
        </Link>
      </div>

      <div className="flex-4 w-full bg-navbar-dropdown-right-outer-bg border border-navbar-dropdown-right-outer text-white p-[5px] rounded-[10px] flex max-h-[400px] overflow-y-auto">
        {hoveredExpert ? (
          <div className="grid grid-cols-2 gap-[5px] w-full h-full">
            {getCategories().map((category) => {
              const categoryRoute = getCategoryRoute(category.slug, hoveredExpert);

              return (
                <Link
                  key={category.slug}
                  to={categoryRoute}
                  className="group bg-navbar-dropdown-bg rounded-[10px] p-[12px] flex items-center justify-center text-center hover:bg-white hover:text-navbar-dropdown-bg transition-all cursor-pointer"
                >
                  <span className="text-[14px] leading-tight inline-block group-hover:scale-[1.1] transition-all">
                    {t(`${category.i18nKey}.title`, { ns: "experts" })}
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
