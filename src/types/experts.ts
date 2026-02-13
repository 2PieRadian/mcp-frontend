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
  earnings?: number;
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

// Cache entry for specialization + filter combination
export type SpecializationCacheEntry = {
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

  // Specialization-based methods
  fetchExpertsBySpecialization: (
    specialization: string,
    page: number,
    filters?: ExpertFilters
  ) => Promise<void>;
  getCachedExperts: (
    specialization: string,
    filters?: ExpertFilters
  ) => {
    apiExperts: ApiExpert[];
    totalCount: number;
    totalPages: number;
    hasCache: boolean;
  };
  getExpertById: (expertId: number) => ApiExpert | null;
  isLoading: boolean;
  error: string | null;
}
