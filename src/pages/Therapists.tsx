import { useState, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EXPERT_CATEGORIES } from "../lib/constants";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

const TherapistsHeroSection = lazy(() => import("../components/therapists/TherapistsHeroSection"));
const TherapistsTitle = lazy(() => import("../components/therapists/TherapistsTitle"));
const TherapistsOptions = lazy(() => import("../components/therapists/TherapistsOptions"));
const TherapistsFilterModal = lazy(() => import("../components/therapists/TherapistsFilterModal"));
const TherapistsFiltersAndSearch = lazy(() => import("../components/therapists/TherapistsFiltersAndSearch"));
const TherapistsCardsSection = lazy(() => import("../components/therapists/TherapistsCardsSection"));

const THERAPIST_TOPICS = ["Anxiety", "Couple", "Breakup", "Loneliness"];

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

export default function Therapists() {
  const location = useLocation();
  const { t } = useTranslation(["common", "experts"]);

  // Extract sector from path (e.g., "/wellness-experts/therapists" -> "wellness")
  const getSectorFromPath = (path: string): string => {
    if (path.startsWith("/wellness-experts")) return "wellness";
    if (path.startsWith("/education-experts")) return "education";
    if (path.startsWith("/finance-experts")) return "finance";
    return "wellness";
  };

  const getCurrentCategoryFromPath = (
    path: string,
    categories: string[],
    isTherapistTopicsPage: boolean
  ): string => {
    if (!categories.length) return "";

    if (isTherapistTopicsPage) {
      const base = "/wellness-experts/therapists";
      const remainder = path
        .slice(base.length)
        .replace(/^\/+/, "")
        .split("/")[0];

      if (!remainder) {
        return categories[0];
      }

      const matchingTopic = categories.find(
        (category) => slugify(category) === remainder
      );
      return matchingTopic || categories[0];
    }

    const lastSegment = path.split("/").filter(Boolean).pop() || "";
    const matchingCategory = categories.find(
      (category) => slugify(category) === lastSegment
    );
    return matchingCategory || categories[0];
  };

  const sector = getSectorFromPath(location.pathname);
  const isTherapistTopicsPage = location.pathname.startsWith(
    "/wellness-experts/therapists"
  );

  const baseCategories =
    EXPERT_CATEGORIES[sector as keyof typeof EXPERT_CATEGORIES] || [];
  const categories = isTherapistTopicsPage ? THERAPIST_TOPICS : baseCategories;

  const categoryBasePath = isTherapistTopicsPage
    ? "/wellness-experts/therapists"
    : `/${sector}-experts`;

  const currentCategory = getCurrentCategoryFromPath(
    location.pathname,
    categories,
    isTherapistTopicsPage
  );

  const [selectedOption, setSelectedOption] = useState<string>(currentCategory);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([
    t("price", { ns: "common" }),
    t("age", { ns: "common" }),
    t("hindi", { ns: "experts" }),
  ]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState<string[]>([]);

  // Update selected option when route changes
  useEffect(() => {
    setSelectedOption(currentCategory);
  }, [currentCategory]);

  // Available filters - you can modify this list as needed
  const availableFilters = [
    t("price", { ns: "common" }),
    t("age", { ns: "common" }),
    t("hindi", { ns: "experts" }),
    t("english", { ns: "experts" }),
    t("experience", { ns: "common" }),
    t("rating", { ns: "common" }),
  ];

  // Initialize temp filters with applied filters when modal opens
  useEffect(() => {
    if (isFilterModalOpen) {
      setTempSelectedFilters([...appliedFilters]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterModalOpen]);

  const removeFilter = (filter: string) => {
    setAppliedFilters(appliedFilters.filter((f) => f !== filter));
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters([...tempSelectedFilters]);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="px-[20px] mb-[80px]">
      <ResponsiveNavbar />

      <TherapistsHeroSection />

      <TherapistsTitle sector={sector} />

      <TherapistsOptions
        options={categories}
        selectedOption={selectedOption}
        sector={sector}
        categoryBasePath={categoryBasePath}
        isTherapistTopicsPage={isTherapistTopicsPage}
      />

      <TherapistsFiltersAndSearch
        appliedFilters={appliedFilters}
        removeFilter={removeFilter}
        onFilterClick={handleOpenFilterModal}
      />

      <TherapistsFilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        availableFilters={availableFilters}
        selectedFilters={tempSelectedFilters}
        setSelectedFilters={setTempSelectedFilters}
        onApply={handleApplyFilters}
      />

      <TherapistsCardsSection />
    </div>
  );
}
