import { useState, useEffect, lazy, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { EXPERT_CATEGORIES } from "../lib/constants/experts";
import { THERAPIST_TOPICS } from "../lib/constants/therapists";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useExperts } from "../context/ExpertsContext";
import type { FilterState } from "../types/filters";

const ExpertsHeroSection = lazy(
  () => import("../components/ExpertsHeroSection")
);
const ExpertsTitle = lazy(() => import("../components/ExpertsTitle"));
const TherapistsOptions = lazy(
  () => import("../components/therapists/TherapistsOptions")
);
const TherapistsFilterModal = lazy(
  () => import("../components/therapists/TherapistsFilterModal")
);
const TherapistsFiltersAndSearch = lazy(
  () => import("../components/therapists/TherapistsFiltersAndSearch")
);
const TherapistsCardsSection = lazy(
  () => import("../components/therapists/TherapistsCardsSection")
);

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

export default function TherapistsContent() {
  const location = useLocation();
  const { filters, setFilters } = useExperts();

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Sync search input with filters
  useEffect(() => {
    setSearchInput(filters.searchName || "");
  }, [filters.searchName]);

  // Update selected option when route changes and reset page to 1
  useEffect(() => {
    setSelectedOption(currentCategory);
    setCurrentPage(1); // Reset to first page when category changes
  }, [currentCategory]);

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
        subtitle="Trusted mental health support"
        title="You're safe here — healing starts now."
        description="Connect with certified therapists who understand you, your culture, and your pace. Begin at your comfort level, one conversation at a time."
        badgeText="100% private & secure sessions"
        badgeDescription="Verified Indian therapists · Online counselling · Flexible slots"
        imageSrc="/images/therapists/therapists-1.png"
        imageAlt="Online therapy session illustration"
        imageSize={420}
        maxWidth={420}
      />

      <ExpertsTitle sector={sector} />

      <TherapistsOptions
        options={categories}
        selectedOption={selectedOption}
        sector={sector}
        categoryBasePath={categoryBasePath}
        isTherapistTopicsPage={isTherapistTopicsPage}
      />

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

      <TherapistsCardsSection
        selectedOption={selectedOption}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
