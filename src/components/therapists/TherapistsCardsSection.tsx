import { lazy, useEffect, useMemo } from "react";
import { useExperts } from "../../context/ExpertsContext";
import ExpertCardSkeleton from "../ExpertCardSkeleton";

const ExpertCard = lazy(() => import("../ExpertCard"));

type TherapistsCardsSectionProps = {
  selectedOption: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

// Map selected option to API format
const mapOptionToExpertiseArea = (
  option: string
): "anxiety" | "couple" | "breakup" | "loneliness" => {
  const optionLower = option.toLowerCase();
  if (optionLower === "anxiety") return "anxiety";
  if (optionLower === "couple") return "couple";
  if (optionLower === "breakup") return "breakup";
  if (optionLower === "loneliness") return "loneliness";
  return "anxiety"; // default fallback
};

const EXPERTS_PER_PAGE = 25;

export default function TherapistsCardsSection({
  selectedOption,
  currentPage,
  onPageChange,
}: TherapistsCardsSectionProps) {
  const expertiseArea = mapOptionToExpertiseArea(selectedOption);
  const {
    getFilteredExperts,
    getTotalPages,
    getTotalCount,
    fetchExperts,
    isLoading,
    error,
    anxietyData,
    coupleData,
    breakupData,
    lonelinessData,
  } = useExperts();

  // Get data for current area
  const currentData = useMemo(() => {
    switch (expertiseArea) {
      case "anxiety":
        return anxietyData;
      case "couple":
        return coupleData;
      case "breakup":
        return breakupData;
      case "loneliness":
        return lonelinessData;
    }
  }, [expertiseArea, anxietyData, coupleData, breakupData, lonelinessData]);

  // Get total pages from API (for pagination buttons) - use this for navigation
  const totalPages = useMemo(
    () => getTotalPages(expertiseArea),
    [getTotalPages, expertiseArea]
  );

  // Get total count from API
  const totalCount = useMemo(
    () => getTotalCount(expertiseArea),
    [getTotalCount, expertiseArea]
  );

  // Get filtered experts - this is instant, no API call needed
  const filteredExperts = useMemo(
    () => getFilteredExperts(expertiseArea),
    [getFilteredExperts, expertiseArea]
  );

  // Calculate which experts to show for the current page (from filtered results)
  // Match each Expert with its corresponding ApiExpert from cache
  const expertsForCurrentPage = useMemo(() => {
    const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
    const endIndex = startIndex + EXPERTS_PER_PAGE;
    const experts = filteredExperts.slice(startIndex, endIndex);

    // Match each Expert with its corresponding ApiExpert
    return experts.map((expert) => {
      const apiExpert = currentData.unfilteredApiExperts.find(
        (api) => api.id === expert.id
      );
      return { expert, apiExpert };
    });
  }, [filteredExperts, currentPage, currentData.unfilteredApiExperts]);

  // Fetch the current page if not loaded - use size to avoid unnecessary re-runs
  useEffect(() => {
    if (currentPage > 0 && !currentData.loadedPages.has(currentPage)) {
      fetchExperts(expertiseArea, currentPage);
    }
    // Only depend on page number and expertise area, not the Set object itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertiseArea, currentPage, currentData.loadedPages.size, fetchExperts]);

  // Prefetch next page if available
  useEffect(() => {
    if (
      currentPage < totalPages &&
      !currentData.loadedPages.has(currentPage + 1)
    ) {
      fetchExperts(expertiseArea, currentPage + 1);
    }
  }, [
    expertiseArea,
    currentPage,
    totalPages,
    currentData.loadedPages,
    fetchExperts,
  ]);

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

  if (
    isLoading &&
    expertsForCurrentPage.length === 0 &&
    filteredExperts.length === 0
  ) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
          {/* Show 4 skeleton cards for initial load */}
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

  // Show message if no experts found at all
  if (
    !isLoading &&
    expertsForCurrentPage.length === 0 &&
    filteredExperts.length === 0
  ) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="text-center py-[40px]">
          <p className="text-gray-600">No experts found.</p>
        </div>
      </div>
    );
  }

  // Show message if current page has no results but there are filtered results on other pages
  if (
    !isLoading &&
    expertsForCurrentPage.length === 0 &&
    filteredExperts.length > 0 &&
    currentPage > 1
  ) {
    return (
      <div className="max-w-[1350px] mx-auto mt-[40px]">
        <div className="text-center py-[40px]">
          <p className="text-gray-600 text-lg mb-4">
            Nothing found in page {currentPage}
          </p>
          <button
            onClick={handlePreviousPage}
            className="px-[30px] py-[12px] bg-[#44666C] text-white rounded-[30px] text-[16px] font-medium hover:bg-[#365a62] transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
          >
            Go to Prev Page
          </button>
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

      {/* Pagination Controls - Show if we have data or totalPages from API */}
      {(totalPages > 0 || totalCount > 0) && (
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
