import type { Expert } from "../lib/constants/experts";

export type ExpertiseArea = "anxiety" | "couple" | "breakup" | "loneliness";

export type ApiUser = {
  id: number;
  email: string;
  name: string;
  languages: string[];
  avatar?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
};

export type ApiExpert = {
  id: number;
  userId: number;
  professionalTitle: string;
  yearsOfExperience: number;
  expertiseAreas?: string[];
  bio: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  user: ApiUser;
  expertSpecializations?: Array<{
    specialization: {
      name: string;
      domain: {
        name: string;
      };
    };
  }>;
};

export type ApiResponse = {
  message: string;
  count: number;
  totalCount: number; // Total count in DB
  page?: number;
  limitPerPage?: number;
  totalPages: number; // Total pages available from API
  experts: ApiExpert[];
};

export type ExpertiseData = {
  unfilteredExperts: Expert[]; // All experts from API (no filters)
  unfilteredApiExperts: ApiExpert[]; // Store full API expert data for details page
  totalCount: number; // Total count from API
  totalPagesFromAPI: number; // Total pages available from API
  loadedPages: Set<number>; // Pages that have been fetched from API
  isFullyLoaded: boolean; // True if all pages are loaded
};

// Cache entry for specialization + filter combination
export type SpecializationCacheEntry = {
  experts: Expert[];
  apiExperts: ApiExpert[];
  totalCount: number;
  totalPages: number;
  loadedPages: Set<number>; // Pages loaded for this cache entry
  filterKey: string; // The filter combination used
};

export type ExpertFilters = {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minExperience?: number;
  language?: string;
  searchName?: string;
};

// Helper to create a consistent filter key
export const createFilterKey = (filters: ExpertFilters): string => {
  const sorted = {
    minPrice: filters.minPrice ?? null,
    maxPrice: filters.maxPrice ?? null,
    minRating: filters.minRating ?? null,
    minExperience: filters.minExperience ?? null,
    language: filters.language ?? null,
    searchName: filters.searchName ?? null,
  };
  return JSON.stringify(sorted);
};

export interface ExpertsContextType {
  // Filter state
  filters: import("./filters").FilterState;
  setFilters: (filters: import("./filters").FilterState) => void;

  // Data for each expertise area (legacy - kept for backward compatibility)
  anxietyData: ExpertiseData;
  coupleData: ExpertiseData;
  breakupData: ExpertiseData;
  lonelinessData: ExpertiseData;

  // Computed filtered data (legacy)
  getFilteredExperts: (expertiseArea: ExpertiseArea) => Expert[];
  getTotalPages: (expertiseArea: ExpertiseArea) => number;
  getTotalPagesFiltered: (expertiseArea: ExpertiseArea) => number;
  getTotalCount: (expertiseArea: ExpertiseArea) => number;
  getNextPageToFetch: (
    expertiseArea: ExpertiseArea,
    currentFilteredPage: number
  ) => number | null;

  // Legacy actions
  fetchExperts: (expertiseArea: ExpertiseArea, page: number) => Promise<void>;
  getExpertById: (expertId: number) => ApiExpert | null;
  clearCache: (expertiseArea: ExpertiseArea) => void;

  // New specialization-based methods
  fetchExpertsBySpecialization: (
    specialization: string,
    page: number,
    filters?: ExpertFilters
  ) => Promise<void>;
  getCachedExperts: (
    specialization: string,
    filters?: ExpertFilters
  ) => {
    experts: Expert[];
    apiExperts: ApiExpert[];
    totalCount: number;
    totalPages: number;
    hasCache: boolean;
  };
  isLoading: boolean;
  error: string | null;
}
