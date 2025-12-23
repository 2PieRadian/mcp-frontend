import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import useScrollToTop from "../hooks/useScrollToTop";
import { useExperts } from "../context/ExpertsContext";
import ExpertCard from "../components/ExpertCard";
import ExpertCardSkeleton from "../components/ExpertCardSkeleton";
import { EXPERT_CATEGORIES, getSpecializationByValue } from "../lib/constants/experts";
import type { FilterState } from "../types/filters";
import {
  SlidersHorizontal,
  DollarSign,
  Star,
  Award,
  Globe,
  Filter,
  Search,
} from "lucide-react";

const EXPERTS_PER_PAGE = 25;
const AVAILABLE_LANGUAGES = [
  "English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Bengali",
  "Assamese",
  "Kannada",
  "Malayalam",
  "Tamil",
  "Telugu",
];

export default function FindCounsellors() {
  useScrollToTop();
  const { t } = useTranslation(["common", "navigation", "experts"]);
  const { fetchExpertsBySpecialization, getCachedExperts, isLoading, error } =
    useExperts();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >(null);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    minExperience: undefined,
    languages: [],
    searchName: undefined,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Get all specializations based on selected domain
  const availableSpecializations = useMemo(() => {
    if (!selectedDomain) {
      return [
        ...EXPERT_CATEGORIES.wellness,
        ...EXPERT_CATEGORIES.education,
        ...EXPERT_CATEGORIES.finance,
      ];
    }
    return (
      EXPERT_CATEGORIES[selectedDomain as keyof typeof EXPERT_CATEGORIES] || []
    );
  }, [selectedDomain]);

  // Build API filters
  const apiFilters = useMemo(() => {
    const apiFilter: any = {
      ...filters,
      language:
        filters.languages && filters.languages.length > 0
          ? filters.languages[0]
          : undefined,
    };
    if (searchQuery) {
      apiFilter.searchName = searchQuery;
    }
    return apiFilter;
  }, [filters, searchQuery]);

  // Fetch experts when filters or specialization changes
  useEffect(() => {
    if (!selectedSpecialization) return;

    const cacheEntry = getCachedExperts(selectedSpecialization, apiFilters);
    const hasPageCached =
      cacheEntry.hasCache &&
      cacheEntry.experts.length >= currentPage * EXPERTS_PER_PAGE;

    if (!hasPageCached) {
      fetchExpertsBySpecialization(
        selectedSpecialization,
        currentPage,
        apiFilters
      );
    }
  }, [
    selectedSpecialization,
    currentPage,
    apiFilters,
    fetchExpertsBySpecialization,
    getCachedExperts,
  ]);

  // Get experts for current page
  const cachedData = useMemo(
    () => getCachedExperts(selectedSpecialization || "", apiFilters),
    [getCachedExperts, selectedSpecialization, apiFilters]
  );

  const expertsForCurrentPage = useMemo(() => {
    if (!cachedData.hasCache || !selectedSpecialization) {
      return [];
    }
    const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
    const endIndex = startIndex + EXPERTS_PER_PAGE;
    const experts = cachedData.experts
      .slice(startIndex, endIndex)
      .filter(Boolean);

    return experts.map((expert) => {
      const apiExpert = cachedData.apiExperts.find(
        (api) => api.id === expert.id
      );
      return { expert, apiExpert };
    });
  }, [cachedData, currentPage, selectedSpecialization]);

  const totalPages = cachedData.totalPages || 0;
  const totalCount = cachedData.totalCount || 0;

  const handleDomainChange = (domain: string | null) => {
    setSelectedDomain(domain);
    setSelectedSpecialization(null);
    setCurrentPage(1);
  };

  const handleSpecializationChange = (specialization: string | null) => {
    setSelectedSpecialization(specialization);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleLanguageToggle = (language: string) => {
    setFilters((prev) => {
      const currentLanguage =
        prev.languages && prev.languages.length > 0 ? prev.languages[0] : null;
      const newLanguages = currentLanguage === language ? [] : [language];
      return { ...prev, languages: newLanguages };
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      minExperience: undefined,
      languages: [],
      searchName: undefined,
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined ||
    filters.minExperience !== undefined ||
    (filters.languages && filters.languages.length > 0) ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-white px-[20px]">
      <ResponsiveNavbar />

      <div className="max-w-[1400px] mx-auto px-[20px] md:px-[40px] py-[40px] md:py-[60px]">
        {/* Header */}
        <div className="mb-[30px] md:mb-[40px]">
          <h1 className="text-[clamp(28px,5vw,36px)] font-bold text-primary mb-[8px]">
            {t("findCounsellors", { ns: "navigation" })}
          </h1>
          <p className="text-[#4F5B64] text-[clamp(14px,2vw,16px)]">
            Find the perfect expert across wellness, education, and finance
            domains
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-[24px] md:gap-[32px]">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm sticky top-[100px] flex flex-col max-h-[calc(100vh-120px)]">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-[24px] md:p-[28px] pb-[20px] border-b border-gray-200 shrink-0">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[40px] h-[40px] bg-[#ecf4f6] rounded-[12px] flex items-center justify-center">
                    <Filter className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-[20px] font-bold text-primary">
                    Filters
                  </h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[14px] text-primary hover:text-[#365a62] font-medium transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide px-[24px] md:px-[28px] py-[24px] space-y-[24px]">
                {/* Search */}
                <div>
                  <label className="block text-[14px] font-semibold text-primary mb-[12px]">
                    Search by Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search experts..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-[36px] pr-[12px] py-[10px] border border-gray-300 rounded-[12px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Domain Filter */}
                <div>
                  <label className="block text-[14px] font-semibold text-primary mb-[12px]">
                    Domain
                  </label>
                  <div className="space-y-[8px]">
                    {["wellness", "education", "finance"].map((domain) => (
                      <button
                        key={domain}
                        onClick={() =>
                          handleDomainChange(
                            selectedDomain === domain ? null : domain
                          )
                        }
                        className={`w-full text-left px-[14px] py-[10px] rounded-[10px] border transition-all text-[14px] font-medium ${
                          selectedDomain === domain
                            ? "bg-[#ecf4f6] border-primary text-primary"
                            : "bg-white border-gray-200 text-[#4F5B64] hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {domain.charAt(0).toUpperCase() + domain.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specialization Filter */}
                <div>
                  <label className="block text-[14px] font-semibold text-primary mb-[12px]">
                    Specialization
                  </label>
                  <div className="space-y-[8px] max-h-[300px] overflow-y-auto scrollbar-hide">
                    {availableSpecializations.map((spec) => (
                      <button
                        key={spec.slug}
                        onClick={() =>
                          handleSpecializationChange(
                            selectedSpecialization === spec.value ? null : spec.value
                          )
                        }
                        className={`w-full text-left px-[14px] py-[10px] rounded-[10px] border transition-all text-[14px] font-medium ${
                          selectedSpecialization === spec.value
                            ? "bg-[#ecf4f6] border-primary text-primary"
                            : "bg-white border-gray-200 text-[#4F5B64] hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {t(`${spec.i18nKey}.title`, { ns: "experts" })}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <label className="text-[14px] font-semibold text-primary">
                      Price (₹ per hour)
                    </label>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "minPrice",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="flex-1 px-[12px] py-[10px] border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[14px]"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        handleFilterChange(
                          "maxPrice",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="flex-1 px-[12px] py-[10px] border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <label className="text-[14px] font-semibold text-primary">
                      Minimum Rating
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="0.0 - 5.0"
                    value={filters.minRating || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "minRating",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="w-full px-[12px] py-[10px] border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[14px]"
                  />
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <Award className="w-4 h-4 text-primary" />
                    <label className="text-[14px] font-semibold text-primary">
                      Minimum Experience (Years)
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    placeholder="Years"
                    value={filters.minExperience || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "minExperience",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="w-full px-[12px] py-[10px] border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-[14px]"
                  />
                </div>

                {/* Languages */}
                <div>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <Globe className="w-4 h-4 text-primary" />
                    <label className="text-[14px] font-semibold text-primary">
                      Languages
                    </label>
                  </div>
                  <div className="space-y-[8px] max-h-[200px] overflow-y-auto scrollbar-hide">
                    {AVAILABLE_LANGUAGES.map((lang) => {
                      const isSelected =
                        filters.languages?.includes(lang) || false;
                      return (
                        <label
                          key={lang}
                          className="flex items-center gap-[10px] cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="language"
                            checked={isSelected}
                            onChange={() => handleLanguageToggle(lang)}
                            className="w-4 h-4 border-gray-300 text-primary focus:ring-primary/20 cursor-pointer"
                          />
                          <span className="text-[14px] text-[#4F5B64] group-hover:text-primary transition-colors">
                            {lang}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {!selectedSpecialization ? (
              <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-[40px] md:p-[60px] text-center">
                <SlidersHorizontal className="w-16 h-16 text-gray-300 mx-auto mb-[20px]" />
                <h3 className="text-[20px] font-semibold text-primary mb-[8px]">
                  Select a Specialization
                </h3>
                <p className="text-[#4F5B64] text-[14px]">
                  Choose a domain and specialization from the filters to view
                  available experts
                </p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="mb-[24px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px]">
                  <div>
                    <h2 className="text-[20px] font-bold text-primary mb-[4px]">
                      {(() => {
                        const spec = selectedSpecialization
                          ? getSpecializationByValue(selectedSpecialization)
                          : undefined;
                        return spec
                          ? t(`${spec.i18nKey}.title`, { ns: "experts" })
                          : selectedSpecialization;
                      })()}
                    </h2>
                    {totalCount > 0 && (
                      <p className="text-[14px] text-[#4F5B64]">
                        {totalCount} {totalCount === 1 ? "expert" : "experts"}{" "}
                        found
                      </p>
                    )}
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && expertsForCurrentPage.length === 0 && (
                  <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <ExpertCardSkeleton key={index} />
                    ))}
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-[16px] p-[24px] text-center">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* No Results */}
                {!isLoading &&
                  !error &&
                  expertsForCurrentPage.length === 0 &&
                  cachedData.experts.length === 0 && (
                    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm p-[40px] md:p-[60px] text-center">
                      <p className="text-[#4F5B64] text-[16px]">
                        No experts found for this specialization and filters.
                      </p>
                    </div>
                  )}

                {/* Experts Grid */}
                {expertsForCurrentPage.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px] mb-[40px]">
                      {expertsForCurrentPage.map(({ expert, apiExpert }) => (
                        <ExpertCard
                          key={expert.id}
                          id={expert.id}
                          name={expert.name}
                          image={expert.image}
                          rating={expert.rating}
                          ratingCount={expert.ratingCount}
                          specialization={expert.specialization}
                          tags={expert.tags}
                          languages={expert.languages}
                          nextSlot={expert.nextSlot}
                          price={expert.price}
                          expertData={apiExpert}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-[15px]">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1 || isLoading}
                          className={`px-[25px] py-[10px] rounded-[30px] text-[16px] font-medium transition-all duration-200 ${
                            currentPage > 1 && !isLoading
                              ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                          }`}
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-[8px]">
                          <span className="text-gray-600 text-sm">
                            Page{" "}
                            <span className="font-medium">{currentPage}</span>{" "}
                            of <span className="font-medium">{totalPages}</span>
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages || isLoading}
                          className={`px-[25px] py-[10px] rounded-[30px] text-[16px] font-medium transition-all duration-200 ${
                            currentPage < totalPages && !isLoading
                              ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
