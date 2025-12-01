import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpertsHeroSection from "../components/ExpertsHeroSection";
import { Filter, X, ChevronRight } from "lucide-react";
import { EXPERTS, EXPERT_CATEGORIES } from "../lib/constants";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ExpertCard from "../components/ExpertCard";

function ExpertsTitle({ sector }: { sector: string }) {
  const { t } = useTranslation("common");
  const sectorTitles: Record<string, string> = {
    wellness: t("wellnessSector"),
    education: t("educationSector"),
    finance: t("financeSector"),
  };

  return (
    <div className="max-w-[1350px] mx-auto">
      <h1 className="text-white text-[16px] md:text-[20px] font-medium bg-[#304048] text-center py-[10px] rounded-[30px] my-[10px]">
        {sectorTitles[sector] || t("expertSector")}
      </h1>
    </div>
  );
}

function Options({
  options,
  selectedOption,
  sector,
}: {
  options: string[];
  selectedOption: string;
  sector: string;
}) {
  const { t } = useTranslation("experts");
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
    <div className="max-w-[1350px] mx-auto flex items-center justify-between gap-[10px]">
      {options.map((option) => {
        const route = getCategoryRoute(option, sector);
        const isSelected = selectedOption === option;
        const translationKey = getTranslationKey(option);
        const translatedOption = t(translationKey) || option;

        return (
          <Link
            key={option}
            to={route}
            className={`flex flex-1 w-full items-center cursor-pointer justify-center rounded-[30px] py-[10px] text-sm md:text-base ${
              isSelected
                ? "bg-[#304048] text-white"
                : "bg-light-100 text-[#304048] hover:bg-[#304048]/20"
            }`}
          >
            {translatedOption}
          </Link>
        );
      })}
    </div>
  );
}

function FilterModal({
  isOpen,
  onClose,
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  availableFilters: string[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  onApply: () => void;
}) {
  const { t } = useTranslation("common");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[100px]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-[15px] shadow-lg max-w-[500px] w-full mx-[20px] max-h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-[25px] pb-[20px] border-b border-gray-200 flex-shrink-0">
          <h2 className="text-[20px] font-semibold text-[#304048]">
            {t("selectFilters", { ns: "common" })}
          </h2>
          <button
            onClick={onClose}
            className="p-[5px] hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-[#304048] cursor-pointer" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-[25px] py-[20px]">
          {/* Filter List */}
          <div className="flex flex-col gap-[10px] mb-[20px]">
            {availableFilters.map((filter) => (
              <label
                key={filter}
                className="flex items-center gap-[10px] cursor-pointer p-[10px] hover:bg-gray-50 rounded-[10px] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="w-[18px] h-[18px] cursor-pointer accent-[#304048]"
                />
                <span className="text-[14px] text-[#304048]">{filter}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button - Fixed */}
        <div className="p-[25px] pt-[20px] border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onApply}
            className="w-full bg-[#304048] text-white py-[12px] rounded-[10px] font-medium hover:bg-[#304048]/90 transition-colors"
          >
            {t("apply", { ns: "common" })}
          </button>
        </div>
      </div>
    </div>
  );
}

function FiltersAndSearch({
  appliedFilters,
  removeFilter,
  onFilterClick,
}: {
  appliedFilters: string[];
  removeFilter: (filter: string) => void;
  onFilterClick: () => void;
}) {
  const { t } = useTranslation("common");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      // Show arrow if not scrolled to the end (with small threshold for rounding)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scrollToRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check initial state
      checkScrollPosition();

      // Check on scroll
      container.addEventListener("scroll", checkScrollPosition);

      // Check on resize
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [appliedFilters]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[15px] md:gap-0 mt-[25px] max-w-[1350px] mx-auto">
      {/* Filters */}
      <div className="flex items-center gap-[10px] flex-1 min-w-0 md:min-w-auto relative">
        <div
          className="flex items-center justify-center cursor-pointer p-[10px] bg-[#304048]/17 rounded-full hover:bg-[#304048]/25 transition-colors flex-shrink-0"
          onClick={onFilterClick}
        >
          <Filter className="text-[#304048]" size={20} />
        </div>

        {/* Applied Filters - Scrollable */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-[10px] overflow-x-auto flex-1 min-w-0 scrollbar-hide"
        >
          <div className="flex items-center gap-[10px]">
            {appliedFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center gap-[5px] bg-[#E0ECEE] border border-[#133945] text-[#133945] pl-[15px] pr-[7px] py-[6px] rounded-full text-xs md:text-[14px] whitespace-nowrap flex-shrink-0"
              >
                <span>{filter}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:bg-[#bfd8df] rounded-full cursor-pointer p-[5px] transition-colors flex items-center"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Indicator */}
        {showRightArrow && (
          <div
            onClick={scrollToRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-full aspect-square rounded-full bg-[hsl(0,0%,100%)] border border-[hsl(0,0%,70%)] cursor-pointer z-10 min-h-[32px]"
          >
            <ChevronRight size={16} className="text-gray-800" />
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="border border-border-light rounded-full w-full md:w-auto flex-shrink-0">
        <input
          type="text"
          placeholder={t("search", { ns: "common" })}
          className="w-full px-[15px] py-[10px] rounded-full focus:outline-border-light text-border-light placeholder:text-border-light text-sm md:text-base"
        />
      </div>
    </div>
  );
}

function ExpertsCardsSection() {
  return (
    <div className="max-w-[1350px] mx-auto mt-[40px]">
      <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
        {EXPERTS.map((expert) => (
          <ExpertCard
            key={expert.id}
            name={expert.name}
            image={expert.image}
            rating={expert.rating}
            ratingCount={expert.ratingCount}
            specialization={expert.specialization}
            tags={expert.tags}
            languages={expert.languages}
            nextSlot={expert.nextSlot}
            price={expert.price}
          />
        ))}
      </div>
    </div>
  );
}

export default function Experts() {
  const location = useLocation();
  const { t } = useTranslation(["common", "experts"]);

  // Extract sector from path (e.g., "/wellness-experts/therapists" -> "wellness")
  const getSectorFromPath = (path: string): string => {
    if (path.startsWith("/wellness-experts")) return "wellness";
    if (path.startsWith("/education-experts")) return "education";
    if (path.startsWith("/finance-experts")) return "finance";
    return "wellness"; // default
  };

  // Extract current category from path (e.g., "/wellness-experts/therapists" -> "Therapists")
  const getCurrentCategoryFromPath = (path: string, sector: string): string => {
    const categories =
      EXPERT_CATEGORIES[sector as keyof typeof EXPERT_CATEGORIES] || [];
    const pathParts = path.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    // Find matching category by converting slug back to title case
    const matchingCategory = categories.find((cat) => {
      const slug = cat.toLowerCase().replace(/\s+/g, "-");
      return slug === lastPart;
    });

    return matchingCategory || categories[0] || "";
  };

  const sector = getSectorFromPath(location.pathname);
  const categories =
    EXPERT_CATEGORIES[sector as keyof typeof EXPERT_CATEGORIES] || [];
  const currentCategory = getCurrentCategoryFromPath(location.pathname, sector);

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

      <ExpertsHeroSection />

      <ExpertsTitle sector={sector} />

      <Options
        options={categories}
        selectedOption={selectedOption}
        sector={sector}
      />

      <FiltersAndSearch
        appliedFilters={appliedFilters}
        removeFilter={removeFilter}
        onFilterClick={handleOpenFilterModal}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        availableFilters={availableFilters}
        selectedFilters={tempSelectedFilters}
        setSelectedFilters={setTempSelectedFilters}
        onApply={handleApplyFilters}
      />

      <ExpertsCardsSection />
    </div>
  );
}
