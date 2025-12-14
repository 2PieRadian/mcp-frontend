import { lazy, useEffect, useMemo, useRef } from "react";
import ExpertCardSkeleton from "../ExpertCardSkeleton";
import { useExperts } from "../../context/ExpertsContext";

const ExpertCard = lazy(() => import("../ExpertCard"));

type ExpertsCardsSectionProps = {
  specialization: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    minExperience?: number;
    language?: string;
    searchName?: string;
  };
};

const EXPERTS_PER_PAGE = 25;

export default function ExpertsCardsSection({
  specialization,
  currentPage,
  onPageChange,
  filters = {},
}: ExpertsCardsSectionProps) {
  const { fetchExpertsBySpecialization, getCachedExperts, isLoading, error } =
    useExperts();

  // Get cached experts for current specialization + filter combination
  const cachedData = useMemo(
    () => getCachedExperts(specialization, filters),
    [getCachedExperts, specialization, filters]
  );

  // Track previous specialization to detect changes
  const prevSpecializationRef = useRef<string>("");
  const prevFiltersRef = useRef<string>(JSON.stringify(filters));

  // Check if we need to fetch (specialization changed or filters changed)
  useEffect(() => {
    const specializationChanged =
      prevSpecializationRef.current !== specialization;

    prevSpecializationRef.current = specialization;
    prevFiltersRef.current = JSON.stringify(filters);

    // If specialization changed, reset to page 1
    if (specializationChanged) {
      onPageChange(1);
    }

    // Check cache first - only fetch if we don't have this page cached
    const cacheEntry = getCachedExperts(specialization, filters);
    const hasPageCached =
      cacheEntry.hasCache &&
      cacheEntry.experts.length >= currentPage * EXPERTS_PER_PAGE;

    if (!hasPageCached) {
      console.log(
        `[ExpertsCardsSection] Fetching page ${currentPage} for specialization "${specialization}" with filters:`,
        filters
      );
      fetchExpertsBySpecialization(specialization, currentPage, filters);
    } else {
      console.log(
        `[ExpertsCardsSection] Using cached data for specialization "${specialization}", page ${currentPage}`
      );
    }
  }, [
    specialization,
    currentPage,
    filters,
    fetchExpertsBySpecialization,
    getCachedExperts,
    onPageChange,
  ]);

  // Get experts for current page from cache, with matching ApiExpert data
  const expertsForCurrentPage = useMemo(() => {
    if (!cachedData.hasCache) {
      return [];
    }
    const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
    const endIndex = startIndex + EXPERTS_PER_PAGE;
    const experts = cachedData.experts
      .slice(startIndex, endIndex)
      .filter(Boolean);

    // Match each Expert with its corresponding ApiExpert
    return experts.map((expert) => {
      const apiExpert = cachedData.apiExperts.find(
        (api) => api.id === expert.id
      );
      return { expert, apiExpert };
    });
  }, [cachedData, currentPage]);

  const totalPages = cachedData.totalPages || 0;
  const totalCount = cachedData.totalCount || 0;

  // Check if current page is fully loaded (has enough experts for this page)
  const isCurrentPageLoaded = useMemo(() => {
    if (!cachedData.hasCache) {
      return false;
    }
    const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
    const endIndex = startIndex + EXPERTS_PER_PAGE;
    // Check if we have enough experts to fill this page
    return cachedData.experts.length >= endIndex;
  }, [cachedData, currentPage]);

  // Check if there's a next/previous page
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  // Show skeletons on initial load (no cache at all)
  if (isLoading && expertsForCurrentPage.length === 0 && !cachedData.hasCache) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <ExpertCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show skeletons when loading a new page that isn't cached yet
  if (isLoading && !isCurrentPageLoaded) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <ExpertCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="text-center py-[40px]">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (
    !isLoading &&
    expertsForCurrentPage.length === 0 &&
    cachedData.experts.length === 0
  ) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="text-center py-[40px]">
          <p className="text-gray-600">
            No experts found for this specialization.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1350px] mx-auto mt-[40px]">
      <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
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

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-[15px] mt-[40px]">
          <button
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage || isLoading}
            className={`px-[25px] py-[10px] rounded-[30px] text-[16px] font-medium transition-all duration-200 ${
              hasPreviousPage && !isLoading
                ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-[8px]">
            <span className="text-gray-600 text-sm">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
              {totalCount > 0 && (
                <span className="text-gray-400 ml-2">({totalCount} total)</span>
              )}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!hasNextPage || isLoading}
            className={`px-[25px] py-[10px] rounded-[30px] text-[16px] font-medium transition-all duration-200 ${
              hasNextPage && !isLoading
                ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
