import { useState, useEffect, lazy, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useExperts } from "../context/ExpertsContext";
import type { FilterState } from "../types/filters";
import { EXPERT_CATEGORIES } from "../lib/constants/experts";

const ExpertsHeroSection = lazy(
  () => import("../components/ExpertsHeroSection")
);
const ExpertsTitle = lazy(() => import("../components/ExpertsTitle"));
const TherapistsFilterModal = lazy(
  () => import("../components/therapists/TherapistsFilterModal")
);
const TherapistsFiltersAndSearch = lazy(
  () => import("../components/therapists/TherapistsFiltersAndSearch")
);
const ExpertsCardsSection = lazy(
  () => import("../components/experts/ExpertsCardsSection")
);

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

// Map slugs to actual specialization names
const slugToSpecialization = (slug: string): string => {
  // Get all specializations and find matching one
  const allSpecializations = [
    ...EXPERT_CATEGORIES.wellness,
    ...EXPERT_CATEGORIES.education,
    ...EXPERT_CATEGORIES.finance,
  ];

  const matching = allSpecializations.find((spec) => slugify(spec) === slug);

  return (
    matching ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/And/g, "&")
  );
};

export default function TherapistsContent() {
  const location = useLocation();
  const { filters, setFilters } = useExperts();

  // Get specialization from path or state
  const getSpecialization = (): string => {
    // First check if passed via state
    const state = location.state as { specialization?: string } | null;
    if (state?.specialization) {
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

  return (
    <div className="px-[20px] mb-[80px]">
      <ResponsiveNavbar />

      <ExpertsHeroSection
        subtitle="Expert guidance and support"
        title="Find the right expert for your needs."
        description="Connect with certified experts who understand you, your culture, and your pace. Begin at your comfort level, one conversation at a time."
        badgeText="100% private & secure sessions"
        badgeDescription="Verified experts · Online sessions · Flexible slots"
        imageSrc="/images/therapists/therapists-1.png"
        imageAlt="Online expert session illustration"
        imageSize={420}
        maxWidth={420}
      />

      <ExpertsTitle specialization={specialization} />

      <TherapistsFiltersAndSearch
        filters={filters}
        searchInput={searchInput}
        onFilterClick={handleOpenFilterModal}
        onSearchChange={handleSearchChange}
        onRemoveFilter={handleRemoveFilter}
      />

      <TherapistsFilterModal
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
        filters={{
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          minRating: filters.minRating,
          minExperience: filters.minExperience,
          language: filters.languages?.[0],
          searchName: filters.searchName,
        }}
      />
    </div>
  );
}
