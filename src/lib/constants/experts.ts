export const EXPERT_CATEGORIES = {
  wellness: ["Therapists", "Yoga Experts", "Dieticians"],
  education: [
    "Academic Counsellor",
    "Career Planning Specialist",
    "Path Finder Consultant",
  ],
  finance: [
    "Investment counsellor",
    "Financial Expert",
    "GST & Taxation Expert",
  ],
};

export type Expert = {
  id: number;
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  specialization: string;
  tags: string;
  languages: string;
  nextSlot: string;
  price: number;
};
