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

type ExpertiseArea = "anxiety" | "couple" | "breakup" | "loneliness";

type ApiUser = {
  id: number;
  email: string;
  name: string;
  languages: string[];
  avatar?: string;
};

type ApiExpert = {
  id: number;
  userId: number;
  professionalTitle: string;
  yearsOfExperience: number;
  expertiseAreas: string[];
  bio: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  user: ApiUser;
};

type ApiResponse = {
  message: string;
  count: number;
  totalCount: number; // Total count in DB
  page?: number;
  limitPerPage?: number;
  totalPages: number; // Total pages available from API
  experts: ApiExpert[];
};

type ExpertiseData = {
  unfilteredExperts: Expert[]; // All experts from API (no filters)
  unfilteredApiExperts: ApiExpert[]; // Store full API expert data for details page
  totalCount: number; // Total count from API
  totalPagesFromAPI: number; // Total pages available from API
  loadedPages: Set<number>; // Pages that have been fetched from API
  isFullyLoaded: boolean; // True if all pages are loaded
};

interface ExpertsContextType {
  // Filter state
  filters: FilterState;
  setFilters: (filters: FilterState) => void;

  // Data for each expertise area
  anxietyData: ExpertiseData;
  coupleData: ExpertiseData;
  breakupData: ExpertiseData;
  lonelinessData: ExpertiseData;

  // Computed filtered data
  getFilteredExperts: (expertiseArea: ExpertiseArea) => Expert[];
  getTotalPages: (expertiseArea: ExpertiseArea) => number; // Returns API totalPages for pagination
  getTotalPagesFiltered: (expertiseArea: ExpertiseArea) => number; // Returns filtered pages count
  getTotalCount: (expertiseArea: ExpertiseArea) => number; // Returns API totalCount
  getNextPageToFetch: (
    expertiseArea: ExpertiseArea,
    currentFilteredPage: number
  ) => number | null;

  // Actions
  fetchExperts: (expertiseArea: ExpertiseArea, page: number) => Promise<void>;
  getExpertById: (expertId: number) => ApiExpert | null; // Get full expert data by ID
  isLoading: boolean;
  error: string | null;
  clearCache: (expertiseArea: ExpertiseArea) => void;
}

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

    const specialization = `${
      expert.professionalTitle.charAt(0).toUpperCase() +
      expert.professionalTitle.slice(1)
    } (${expert.yearsOfExperience}+ yrs of experience)`;

    const tags = expert.expertiseAreas
      .map((area) => area.charAt(0).toUpperCase() + area.slice(1))
      .join(", ");

    const languages = expert.user.languages
      .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
      .join(", ");

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
      rawLanguages: expert.user.languages,
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

  // Get expert by ID from all cached data
  const getExpertById = useCallback(
    (expertId: number): ApiExpert | null => {
      // Search through all expertise areas
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
    [getDataForArea]
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
    isLoading,
    error,
    clearCache,
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
