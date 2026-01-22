import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Filter, X } from "lucide-react";

import type { FilterState } from "../../types/filters";

type ExpertsFiltersAndSearchProps = {
  filters: FilterState;
  searchInput: string;
  onFilterClick: () => void;
  onSearchChange: (searchName: string) => void;
  onRemoveFilter: (filterKey: keyof FilterState, value?: string) => void;
};

export default function ExpertsFiltersAndSearch({
  filters,
  searchInput,
  onFilterClick,
  onSearchChange,
  onRemoveFilter,
}: ExpertsFiltersAndSearchProps) {
  const { t } = useTranslation(["common", "experts"]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Build active filter labels
  const activeFilters: Array<{
    key: keyof FilterState;
    label: string;
    value?: string;
  }> = [];

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const priceLabel =
      filters.minPrice !== undefined && filters.maxPrice !== undefined
        ? `₹${filters.minPrice}-${filters.maxPrice}`
        : filters.minPrice !== undefined
          ? `${t("min", { ns: "common" })} ₹${filters.minPrice}`
          : `${t("max", { ns: "common" })} ₹${filters.maxPrice}`;
    activeFilters.push({ key: "minPrice", label: priceLabel });
  }

  if (filters.minRating !== undefined) {
    activeFilters.push({
      key: "minRating",
      label: `${t("rating", { ns: "common" })}: ${filters.minRating}+`,
    });
  }

  if (filters.minExperience !== undefined) {
    activeFilters.push({
      key: "minExperience",
      label: `${t("experience", { ns: "common" })}: ${
        filters.minExperience
      }+ ${t("yearsShort", { ns: "common" })}`,
    });
  }

  if (filters.languages && filters.languages.length > 0) {
    filters.languages.forEach((lang) => {
      activeFilters.push({
        key: "languages",
        label: t(lang, { ns: "experts" }),
        value: lang,
      });
    });
  }

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
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
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [activeFilters]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[15px] md:gap-0 mt-[25px] max-w-[1350px] mx-auto">
      <div className="flex items-center gap-[10px] flex-1 min-w-0 md:min-w-auto relative">
        <div
          className="flex items-center justify-center cursor-pointer p-[10px] bg-[#304048]/5 rounded-full hover:bg-[#304048]/10 transition-colors flex-shrink-0"
          onClick={onFilterClick}
        >
          <Filter className="text-[#304048]" size={20} />
        </div>

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-[10px] overflow-x-auto flex-1 min-w-0 scrollbar-hide"
        >
          <div className="flex items-center gap-[10px]">
            {activeFilters.length > 0 ? (
              activeFilters.map((filter, index) => (
                <div
                  key={`${filter.key}-${filter.value || index}`}
                  className="flex items-center gap-[5px] bg-[#E0ECEE] border border-[#133945] text-[#133945] pl-[15px] pr-[7px] py-[6px] rounded-full text-xs md:text-[14px] whitespace-nowrap flex-shrink-0"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => onRemoveFilter(filter.key, filter.value)}
                    className="hover:bg-[#bfd8df] rounded-full cursor-pointer p-[5px] transition-colors flex items-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-[hsl(0,0%,58%)] text-sm whitespace-nowrap font-light">
                {t("appliedFiltersPlaceholder", { ns: "common" })}
              </p>
            )}
          </div>
        </div>

        {showRightArrow && (
          <div
            onClick={scrollToRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-full aspect-square rounded-full bg-[hsl(0,0%,100%)] border border-[hsl(0,0%,70%)] cursor-pointer z-10 min-h-[32px]"
          >
            <ChevronRight size={16} className="text-gray-800" />
          </div>
        )}
      </div>

      <div className="border border-border-light rounded-full w-full md:w-auto flex-shrink-0">
        <input
          type="text"
          placeholder={t("search", { ns: "common" })}
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-[15px] py-[10px] rounded-full focus:outline-border-light text-border-light placeholder:text-border-light text-sm md:text-base"
        />
      </div>
    </div>
  );
}
