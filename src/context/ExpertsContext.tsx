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
          const existingExpertIds = new Set<number>(
            (existingEntry?.experts || []).map((e: Expert) => e.id)
          );
          const uniqueNewExperts = newExperts.filter(
            (e: Expert) => !existingExpertIds.has(e.id)
          );

          const updatedEntry: SpecializationCacheEntry = {
            experts: [...(existingEntry?.experts || []), ...uniqueNewExperts],
            apiExperts: [
              ...(existingEntry?.apiExperts || []),
              ...(data.experts || []),
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
    [specializationCache, mapApiExpertToExpert]
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
