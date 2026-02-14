import { useState, useEffect, lazy, useCallback, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useExperts } from "../context/ExpertsContext";
import type { FilterState } from "../types/filters";
import {
  getSpecializationBySlug,
  getSpecializationByValue,
} from "../lib/constants/experts";
import useScrollToTop from "../hooks/useScrollToTop";
import { useTranslation } from "react-i18next";

const ExpertsHeroSection = lazy(
  () => import("../components/ExpertsHeroSection")
);
const ExpertsTitle = lazy(() => import("../components/ExpertsTitle"));
const ExpertsFilterModal = lazy(
  () => import("../components/filters/ExpertsFilterModal")
);
const ExpertsFiltersAndSearch = lazy(
  () => import("../components/filters/ExpertsFiltersAndSearch")
);
const ExpertsCardsSection = lazy(
  () => import("../components/experts/ExpertsCardsSection")
);

const slugToSpecialization = (slug: string): string => {
  const matching = getSpecializationBySlug(slug);
  if (matching) return matching.value;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/And/g, "&");
};

export default function ExpertsContent() {
  useScrollToTop();
  const location = useLocation();
  const { filters, setFilters } = useExperts();
  const { t } = useTranslation(["common", "experts"]);

  // Get specialization from path or state
  const getSpecialization = (): string => {
    // First check if passed via state
    const state = location.state as { specialization?: string } | null;
    if (state?.specialization) {
      // State might be a slug or a backend value; normalize to backend value
      const fromSlug = getSpecializationBySlug(state.specialization);
      if (fromSlug) return fromSlug.value;
      const fromValue = getSpecializationByValue(state.specialization);
      if (fromValue) return fromValue.value;
      return state.specialization;
    }

    // Otherwise extract from URL
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length >= 2) {
      const slug = pathSegments[pathSegments.length - 1];
      return slugToSpecialization(slug);
    }

    return "";
  };

  const specialization = getSpecialization();
  const specializationDisplay = useMemo(() => {
    // specialization is the backend/API "value" (English). For display, prefer i18n title when we can.
    const fromValue = getSpecializationByValue(specialization);
    if (fromValue) return t(`${fromValue.i18nKey}.title`, { ns: "experts" });

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const slug =
      pathSegments.length >= 2 ? pathSegments[pathSegments.length - 1] : "";
    const fromSlug = getSpecializationBySlug(slug);
    if (fromSlug) return t(`${fromSlug.i18nKey}.title`, { ns: "experts" });

    return specialization;
  }, [location.pathname, specialization, t]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Sync search input with filters
  useEffect(() => {
    setSearchInput(filters.searchName || "");
  }, [filters.searchName]);

  // Reset page when specialization changes
  useEffect(() => {
    setCurrentPage(1);
  }, [specialization]);

  // Handle search with debouncing - only reset page when search input actually changes
  const prevSearchInputRef = useRef(searchInput);
  useEffect(() => {
    // Only update filters and reset page if search input actually changed
    if (prevSearchInputRef.current !== searchInput) {
      prevSearchInputRef.current = searchInput;
      const timer = setTimeout(() => {
        setFilters({ ...filters, searchName: searchInput || undefined });
        setCurrentPage(1);
      }, 300); // Debounce search by 300ms

      return () => clearTimeout(timer);
    }
  }, [searchInput, filters, setFilters]); // Only depend on searchInput, not filters

  const handleFiltersChange = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      setCurrentPage(1); // Reset to first page when filters change
    },
    [setFilters]
  );

  const handleRemoveFilter = useCallback(
    (filterKey: keyof FilterState, value?: string) => {
      const updated = { ...filters };
      if (filterKey === "minPrice" || filterKey === "maxPrice") {
        updated.minPrice = undefined;
        updated.maxPrice = undefined;
      } else if (filterKey === "languages" && value) {
        // Remove specific language
        updated.languages = (filters.languages || []).filter(
          (lang) => lang !== value
        );
      } else if (filterKey === "languages") {
        // Remove all languages
        updated.languages = [];
      } else if (filterKey === "searchName") {
        updated.searchName = undefined;
        setSearchInput("");
      } else {
        (updated as any)[filterKey] = undefined;
      }
      setFilters(updated);
      setCurrentPage(1);
    },
    [filters, setFilters]
  );

  const handleSearchChange = useCallback((searchName: string) => {
    setSearchInput(searchName);
  }, []);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
  };

  const cardsFilters = useMemo(
    () => ({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      minExperience: filters.minExperience,
      language: filters.languages?.[0],
      searchName: filters.searchName,
    }),
    [
      filters.minPrice,
      filters.maxPrice,
      filters.minRating,
      filters.minExperience,
      filters.languages,
      filters.searchName,
    ]
  );

  return (
    <div className="px-[16px] sm:px-[20px] pb-[80px] sm:pb-[100px]">
      <ResponsiveNavbar />

      <ExpertsHeroSection
        subtitle={t("listingHero.subtitle", { ns: "experts" })}
        title={t("listingHero.title", { ns: "experts" })}
        description={t("listingHero.description", { ns: "experts" })}
        badgeText={t("listingHero.badgeText", { ns: "experts" })}
        badgeDescription={t("listingHero.badgeDescription", { ns: "experts" })}
        imageSrc="/images/therapists/therapists-1.png"
        imageAlt={t("listingHero.imageAlt", { ns: "experts" })}
        imageSize={420}
        maxWidth={420}
      />

      <ExpertsTitle specialization={specializationDisplay} />

      <ExpertsFiltersAndSearch
        filters={filters}
        searchInput={searchInput}
        onFilterClick={handleOpenFilterModal}
        onSearchChange={handleSearchChange}
        onRemoveFilter={handleRemoveFilter}
      />

      <ExpertsFilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApply={handleApplyFilters}
      />

      <ExpertsCardsSection
        specialization={specialization}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        filters={cardsFilters}
      />
    </div>
  );
}
