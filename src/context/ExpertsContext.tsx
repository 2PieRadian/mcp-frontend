import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { FilterState } from "../types/filters";
import { defaultFilters } from "../types/filters";
import { BACKEND_URL } from "../lib/api";
import type {
  ApiExpert,
  ApiResponse,
  SpecializationCacheEntry,
  ExpertFilters,
  ExpertsContextType,
} from "../types/experts";
import { createFilterKey } from "../types/experts";

const ExpertsContext = createContext<ExpertsContextType | undefined>(undefined);

export function ExpertsProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache: Map<specialization, Map<filterKey, SpecializationCacheEntry>>
  const [specializationCache, setSpecializationCache] = useState<
    Map<string, Map<string, SpecializationCacheEntry>>
  >(new Map());

  const setFilters = useCallback((newFilters: FilterState) => {
    setFiltersState(newFilters);
  }, []);

  // Get cached experts for a specialization + filter combination
  const getCachedExperts = useCallback(
    (specialization: string, filters?: ExpertFilters) => {
      const filterKey = createFilterKey(filters || {});
      const cacheForSpecialization = specializationCache.get(specialization);
      const cacheEntry = cacheForSpecialization?.get(filterKey);

      if (cacheEntry) {
        return {
          apiExperts: cacheEntry.apiExperts,
          totalCount: cacheEntry.totalCount,
          totalPages: cacheEntry.totalPages,
          hasCache: true,
        };
      }

      return {
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
    async (specialization: string, page: number, filters?: ExpertFilters) => {
      const filterKey = createFilterKey(filters || {});
      const cacheForSpecialization = specializationCache.get(specialization);
      const cacheEntry = cacheForSpecialization?.get(filterKey);

      // Check if this page is already loaded for this specialization + filter combination
      if (cacheEntry && cacheEntry.loadedPages.has(page)) {
        return; // Already have this page cached
      }

      setIsLoading(true);
      setError(null);

      try {
        const token =
          window.localStorage.getItem("auth:token") ||
          window.localStorage.getItem("token");
        const headers: HeadersInit = {
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        // Build query parameters (API: page, minPrice, maxPrice, minRating, minExperience, language, specialization, domain, professionalTitle, name)
        const params = new URLSearchParams({
          page: page.toString(),
          specialization: specialization,
          ...(filters?.minPrice != null && {
            minPrice: filters.minPrice.toString(),
          }),
          ...(filters?.maxPrice != null && {
            maxPrice: filters.maxPrice.toString(),
          }),
          ...(filters?.minRating != null && {
            minRating: filters.minRating.toString(),
          }),
          ...(filters?.minExperience != null && {
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

        // Update cache
        setSpecializationCache((prev) => {
          const newCache = new Map(prev);
          const specCache = newCache.get(specialization) || new Map();
          const existingEntry = specCache.get(filterKey);

          // Merge new experts with existing ones (avoid duplicates)
          const existingExpertIds = new Set<number>(
            (existingEntry?.apiExperts || []).map((e: ApiExpert) => e.id)
          );
          const uniqueNewExperts = (data.experts || []).filter(
            (e: ApiExpert) => !existingExpertIds.has(e.id)
          );

          const updatedEntry: SpecializationCacheEntry = {
            apiExperts: [
              ...(existingEntry?.apiExperts || []),
              ...uniqueNewExperts,
            ],
            totalCount: data.totalCount || 0,
            totalPages: data.totalPages || 0,
            loadedPages: new Set([...(existingEntry?.loadedPages || []), page]),
            filterKey,
          };

          specCache.set(filterKey, updatedEntry);
          newCache.set(specialization, specCache);

          return newCache;
        });
      } catch (err: any) {
        console.error("Error fetching experts by specialization:", err);
        setError(err?.message || "Failed to load experts");
      } finally {
        setIsLoading(false);
      }
    },
    [specializationCache]
  );

  // Get expert by ID from cache
  const getExpertById = useCallback(
    (expertId: number): ApiExpert | null => {
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
      return null;
    },
    [specializationCache]
  );

  const value: ExpertsContextType = {
    filters,
    setFilters,
    fetchExpertsBySpecialization,
    getCachedExperts,
    getExpertById,
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
