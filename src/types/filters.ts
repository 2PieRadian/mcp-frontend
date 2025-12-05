export type FilterState = {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minExperience?: number;
  languages?: string[];
  searchName?: string;
};

export const defaultFilters: FilterState = {
  minPrice: undefined,
  maxPrice: undefined,
  minRating: undefined,
  minExperience: undefined,
  languages: [],
  searchName: undefined,
};

