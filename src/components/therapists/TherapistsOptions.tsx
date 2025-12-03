import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type TherapistsOptionsProps = {
  options: string[];
  selectedOption: string;
  sector: string;
  categoryBasePath?: string;
  isTherapistTopicsPage: boolean;
};

export default function TherapistsOptions({
  options,
  selectedOption,
  sector,
  categoryBasePath,
  isTherapistTopicsPage,
}: TherapistsOptionsProps) {
  const { t } = useTranslation("experts");

  const getCategoryRoute = (category: string, expertType: string) => {
    const normalizedBase =
      categoryBasePath?.replace(/\/$/, "") || `/${expertType}-experts`;
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    return `${normalizedBase}/${categorySlug}`;
  };

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
    <div className="max-w-[1350px] mx-auto flex py-[4px] rounded-[30px] items-center justify-between gap-[7px] sm:gap-[10px]">
      {options.map((option) => {
        const route = getCategoryRoute(option, sector);
        const isSelected = selectedOption === option;
        const translationKey = getTranslationKey(option);
        const translatedOption = t(translationKey) || option;
        const label = isTherapistTopicsPage ? option : translatedOption;

        return (
          <div
            key={option}
            className={`bg-[hsl(0,0%,97%)] w-full rounded-[30px] shadow-l transform transition-all duration-200 hover:-translate-y-[-4px] active:translate-y-[6px] ${
              isSelected ? "shadow-[0_10px_24px_rgba(0,0,0,0.25)]" : ""
            }`}
          >
            <Link
              key={option}
              to={route}
              className={`flex flex-1 w-full items-center cursor-pointer justify-center rounded-[30px] py-[10px] text-[11px] sm:text-sm md:text-base ${
                isSelected
                  ? "bg-[hsl(172,17%,34%)] text-white"
                  : "text-[#304048]"
              }`}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
