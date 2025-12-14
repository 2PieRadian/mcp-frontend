import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Expert } from "../lib/constants/experts";
import type { FilterState } from "../types/filters";
import { defaultFilters } from "../types/filters";
import { BACKEND_URL } from "../lib/api";
import type {
  ExpertiseArea,
  ApiExpert,
  ApiResponse,
  ExpertiseData,
  SpecializationCacheEntry,
  ExpertFilters,
  ExpertsContextType,
} from "../types/experts";
import { createFilterKey } from "../types/experts";

const ExpertsContext = createContext<ExpertsContextType | undefined>(undefined);

const initialData: ExpertiseData = {
  unfilteredExperts: [],
  unfilteredApiExperts: [],
  totalCount: 0,
  totalPagesFromAPI: 0,
  loadedPages: new Set(),
  isFullyLoaded: false,
};

export function ExpertsProvider({ children }: { children: ReactNode }) {
  const [anxietyData, setAnxietyData] = useState<ExpertiseData>(initialData);
  const [coupleData, setCoupleData] = useState<ExpertiseData>(initialData);
  const [breakupData, setBreakupData] = useState<ExpertiseData>(initialData);
  const [lonelinessData, setLonelinessData] =
    useState<ExpertiseData>(initialData);
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New cache: Map<specialization, Map<filterKey, SpecializationCacheEntry>>
  const [specializationCache, setSpecializationCache] = useState<
    Map<string, Map<string, SpecializationCacheEntry>>
  >(new Map());

  const getDataForArea = useCallback(
    (area: ExpertiseArea): ExpertiseData => {
      switch (area) {
        case "anxiety":
          return anxietyData;
        case "couple":
          return coupleData;
        case "breakup":
          return breakupData;
        case "loneliness":
          return lonelinessData;
      }
    },
    [anxietyData, coupleData, breakupData, lonelinessData]
  );

  const setDataForArea = useCallback(
    (area: ExpertiseArea, data: ExpertiseData) => {
      switch (area) {
        case "anxiety":
          setAnxietyData(data);
          break;
        case "couple":
          setCoupleData(data);
          break;
        case "breakup":
          setBreakupData(data);
          break;
        case "loneliness":
          setLonelinessData(data);
          break;
      }
    },
    []
  );

  const mapApiExpertToExpert = useCallback((expert: ApiExpert): Expert => {
    const formattedName = expert.user.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Use specialization from expertSpecializations if available, otherwise use professionalTitle
    const specializationName =
      expert.expertSpecializations?.[0]?.specialization?.name ||
      expert.professionalTitle ||
      "General";

    const specialization = `${
      specializationName.charAt(0).toUpperCase() + specializationName.slice(1)
    } (${expert.yearsOfExperience}+ yrs of experience)`;

    const tags = expert.expertSpecializations
      ? expert.expertSpecializations
          .map((esp) => esp.specialization.name)
          .join(", ")
      : expert.expertiseAreas
      ? expert.expertiseAreas
          .map((area) => area.charAt(0).toUpperCase() + area.slice(1))
          .join(", ")
      : "";

    const languages = expert.user.languages
      ? expert.user.languages
          .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
          .join(", ")
      : "";

    return {
      id: expert.id,
      name: formattedName,
      image: expert.user.avatar || "/images/experts/expert_profile_img.png",
      rating: expert.rating,
      ratingCount: expert.totalReviews,
      specialization,
      tags,
      languages,
      nextSlot: "Available soon",
      price: expert.pricePerHour,
      // Store raw data for filtering
      yearsOfExperience: expert.yearsOfExperience,
      rawLanguages: expert.user.languages || [],
    } as Expert & { yearsOfExperience: number; rawLanguages: string[] };
  }, []);

  // Client-side filtering function
  const applyFilters = useCallback(
    (experts: Expert[], filterState: FilterState): Expert[] => {
      return experts.filter((expert) => {
        // Price filter
        if (
          filterState.minPrice !== undefined &&
          expert.price < filterState.minPrice
        ) {
          return false;
        }
        if (
          filterState.maxPrice !== undefined &&
          expert.price > filterState.maxPrice
        ) {
          return false;
        }

        // Rating filter
        if (
          filterState.minRating !== undefined &&
          expert.rating < filterState.minRating
        ) {
          return false;
        }

        // Experience filter
        if (filterState.minExperience !== undefined) {
          const experience = (expert as any).yearsOfExperience || 0;
          if (experience < filterState.minExperience) {
            return false;
          }
        }

        // Language filter
        if (filterState.languages && filterState.languages.length > 0) {
          const expertLanguages = ((expert as any).rawLanguages || []).map(
            (lang: string) => lang.toLowerCase()
          );
          const hasLanguage = filterState.languages.some((lang) =>
            expertLanguages.includes(lang.toLowerCase())
          );
          if (!hasLanguage) {
            return false;
          }
        }

        // Name search filter
        if (filterState.searchName) {
          const searchLower = filterState.searchName.toLowerCase();
          if (!expert.name.toLowerCase().startsWith(searchLower)) {
            return false;
          }
        }

        return true;
      });
    },
    []
  );

  // Get filtered experts for an area
  const getFilteredExperts = useCallback(
    (expertiseArea: ExpertiseArea): Expert[] => {
      const data = getDataForArea(expertiseArea);
      return applyFilters(data.unfilteredExperts, filters);
    },
    [getDataForArea, applyFilters, filters]
  );

  // Get total pages for filtered results (client-side)
  const getTotalPagesFiltered = useCallback(
    (expertiseArea: ExpertiseArea): number => {
      const data = getDataForArea(expertiseArea);
      const filtered = applyFilters(data.unfilteredExperts, filters);
      const EXPERTS_PER_PAGE = 25;
      return Math.ceil(filtered.length / EXPERTS_PER_PAGE) || 1;
    },
    [getDataForArea, applyFilters, filters]
  );

  // Get total pages from API (unfiltered) - use this for pagination
  const getTotalPages = useCallback(
    (expertiseArea: ExpertiseArea): number => {
      const data = getDataForArea(expertiseArea);
      return data.totalPagesFromAPI || 1;
    },
    [getDataForArea]
  );

  // Get total count from API
  const getTotalCount = useCallback(
    (expertiseArea: ExpertiseArea): number => {
      const data = getDataForArea(expertiseArea);
      return data.totalCount;
    },
    [getDataForArea]
  );

  // Get the next page number that needs to be fetched from API
  const getNextPageToFetch = useCallback(
    (
      expertiseArea: ExpertiseArea,
      currentFilteredPage: number
    ): number | null => {
      const data = getDataForArea(expertiseArea);
      const filtered = applyFilters(data.unfilteredExperts, filters);
      const EXPERTS_PER_PAGE = 25;
      const neededFilteredItems = currentFilteredPage * EXPERTS_PER_PAGE;

      // If we have enough filtered items, no need to fetch
      if (filtered.length >= neededFilteredItems) {
        return null;
      }

      // If all pages are loaded, no need to fetch
      if (data.isFullyLoaded) {
        return null;
      }

      // Find the next page that hasn't been loaded yet
      const totalPagesFromAPI = data.totalPagesFromAPI || 10; // Default to 10 if unknown
      for (let page = 1; page <= totalPagesFromAPI; page++) {
        if (!data.loadedPages.has(page)) {
          return page;
        }
      }

      return null;
    },
    [getDataForArea, applyFilters, filters]
  );

  const fetchExperts = useCallback(
    async (expertiseArea: ExpertiseArea, page: number) => {
      const currentData = getDataForArea(expertiseArea);

      // If this page is already loaded, don't fetch again
      if (currentData.loadedPages.has(page)) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const token = window.localStorage.getItem("auth:token");

        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        // Fetch without filters - get all experts for this expertise area
        const response = await fetch(
          `${BACKEND_URL}/api/v1/expert/get-experts?page=${page}&expertiseArea=${expertiseArea}`,
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please login to view experts.");
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch experts");
        }

        const data: ApiResponse = await response.json();

        // Map API response to Expert type
        const newExperts = (data.experts || []).map(mapApiExpertToExpert);

        // Update the data for this expertise area
        const updatedLoadedPages = new Set(currentData.loadedPages);
        updatedLoadedPages.add(page);

        // Append new experts to unfiltered list
        const totalPagesFromAPI =
          data.totalPages || currentData.totalPagesFromAPI;
        const totalCount = data.totalCount || currentData.totalCount;
        const updatedData: ExpertiseData = {
          unfilteredExperts: [...currentData.unfilteredExperts, ...newExperts],
          unfilteredApiExperts: [
            ...currentData.unfilteredApiExperts,
            ...(data.experts || []),
          ],
          totalCount,
          totalPagesFromAPI,
          loadedPages: updatedLoadedPages,
          isFullyLoaded: page >= totalPagesFromAPI,
        };

        setDataForArea(expertiseArea, updatedData);
      } catch (err: any) {
        console.error("Error fetching experts:", err);
        setError(err?.message || "Failed to load experts");
      } finally {
        setIsLoading(false);
      }
    },
    [getDataForArea, setDataForArea, mapApiExpertToExpert]
  );

  const setFilters = useCallback((newFilters: FilterState) => {
    setFiltersState(newFilters);
  }, []);

  const clearCache = useCallback(
    (area: ExpertiseArea) => {
      setDataForArea(area, initialData);
    },
    [setDataForArea]
  );

  // Get cached experts for a specialization + filter combination
  const getCachedExperts = useCallback(
    (specialization: string, filters?: ExpertFilters) => {
      const filterKey = createFilterKey(filters || {});
      const cacheForSpecialization = specializationCache.get(specialization);
      const cacheEntry = cacheForSpecialization?.get(filterKey);

      if (cacheEntry) {
        return {
          experts: cacheEntry.experts,
          apiExperts: cacheEntry.apiExperts,
          totalCount: cacheEntry.totalCount,
          totalPages: cacheEntry.totalPages,
          hasCache: true,
        };
      }

      return {
        experts: [],
        apiExperts: [],
        totalCount: 0,
        totalPages: 0,
        hasCache: false,
      };
    },
    [specializationCache]
  );

  // Fetch experts by specialization with filters (server-side filtering)
  const fetchExpertsBySpecialization = useCallback(
    async (
      specialization: string,
      page: number,
      filters?: {
        minPrice?: number;
        maxPrice?: number;
        minRating?: number;
        minExperience?: number;
        language?: string;
        searchName?: string;
      }
    ) => {
      const filterKey = createFilterKey(filters || {});
      const cacheForSpecialization = specializationCache.get(specialization);
      const cacheEntry = cacheForSpecialization?.get(filterKey);

      // Check if this page is already loaded for this specialization + filter combination
      if (cacheEntry && cacheEntry.loadedPages.has(page)) {
        console.log(
          `[Cache Hit] Specialization: ${specialization}, Filter: ${filterKey}, Page: ${page}`
        );
        return; // Already have this page cached
      }

      console.log(
        `[Cache Miss] Fetching - Specialization: ${specialization}, Filter: ${filterKey}, Page: ${page}`
      );

      setIsLoading(true);
      setError(null);

      try {
        const token = window.localStorage.getItem("auth:token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        // Build query parameters with filters
        const params = new URLSearchParams({
          page: page.toString(),
          specialization: specialization,
          ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
          ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
          ...(filters?.minRating && {
            minRating: filters.minRating.toString(),
          }),
          ...(filters?.minExperience && {
            minExperience: filters.minExperience.toString(),
          }),
          ...(filters?.language && {
            language: filters.language.toLowerCase(),
          }),
          ...(filters?.searchName && { name: filters.searchName }),
        });

        const response = await fetch(
          `${BACKEND_URL}/api/v1/expert/get-experts?${params.toString()}`,
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please login to view experts.");
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch experts");
        }

        const data: ApiResponse = await response.json();

        // Map API response to Expert type
        const newExperts = (data.experts || []).map(mapApiExpertToExpert);

        // Update cache
        setSpecializationCache((prev) => {
          const newCache = new Map(prev);
          const specCache = newCache.get(specialization) || new Map();
          const existingEntry = specCache.get(filterKey);

          // Merge new experts with existing ones (avoid duplicates)
          const existingExperts: Expert[] = existingEntry?.experts || [];
          const existingExpertIds = new Set<number>(
            existingExperts.map((e) => e.id)
          );
          const uniqueNewExperts = newExperts.filter(
            (e: Expert) => !existingExpertIds.has(e.id)
          );

          const updatedExperts = [
            ...(existingEntry?.experts || []),
            ...uniqueNewExperts,
          ];
          const updatedApiExperts = [
            ...(existingEntry?.apiExperts || []),
            ...(data.experts || []),
          ];

          const updatedLoadedPages = new Set<number>(
            existingEntry?.loadedPages || []
          );
          updatedLoadedPages.add(page);

          const updatedEntry: SpecializationCacheEntry = {
            experts: updatedExperts,
            apiExperts: updatedApiExperts,
            totalCount: data.totalCount || 0,
            totalPages: data.totalPages || 0,
            loadedPages: updatedLoadedPages,
            filterKey,
          };

          specCache.set(filterKey, updatedEntry);
          newCache.set(specialization, specCache);

          console.log(
            `[Cache Updated] Specialization: ${specialization}, Filter: ${filterKey}, Total Experts: ${updatedExperts.length}`
          );

          return newCache;
        });
      } catch (err: any) {
        console.error("Error fetching experts by specialization:", err);
        setError(err?.message || "Failed to load experts");
      } finally {
        setIsLoading(false);
      }
    },
    [specializationCache, mapApiExpertToExpert]
  );

  // Get expert by ID from all cached data (searches both old and new cache)
  const getExpertById = useCallback(
    (expertId: number): ApiExpert | null => {
      // First search in new specialization cache
      for (const [, filterCache] of specializationCache.entries()) {
        for (const cacheEntry of filterCache.values()) {
          const expert = cacheEntry.apiExperts.find(
            (exp) => exp.id === expertId
          );
          if (expert) {
            return expert;
          }
        }
      }

      // Fallback to old expertise area cache
      const allAreas: ExpertiseArea[] = [
        "anxiety",
        "couple",
        "breakup",
        "loneliness",
      ];
      for (const area of allAreas) {
        const data = getDataForArea(area);
        const expert = data.unfilteredApiExperts.find(
          (exp) => exp.id === expertId
        );
        if (expert) {
          return expert;
        }
      }
      return null;
    },
    [getDataForArea, specializationCache]
  );

  const value: ExpertsContextType = {
    filters,
    setFilters,
    anxietyData,
    coupleData,
    breakupData,
    lonelinessData,
    getFilteredExperts,
    getTotalPages,
    getTotalPagesFiltered,
    getTotalCount,
    getNextPageToFetch,
    fetchExperts,
    getExpertById,
    clearCache,
    fetchExpertsBySpecialization,
    getCachedExperts,
    isLoading,
    error,
  };

  return (
    <ExpertsContext.Provider value={value}>{children}</ExpertsContext.Provider>
  );
}

export function useExperts() {
  const context = useContext(ExpertsContext);

  if (context === undefined) {
    throw new Error("useExperts must be used within an ExpertsProvider");
  }
  return context;
}
