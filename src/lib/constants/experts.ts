export type ExpertDomain = "wellness" | "education" | "finance";

export type ExpertSpecialization = {
  /** Stable identifier used in URLs (do NOT translate) */
  slug: string;
  /** Canonical value used by API/backend (currently English) */
  value: string;
  /** i18n key base inside `experts.json` */
  i18nKey: `specializations.${string}`;
};

export const EXPERT_CATEGORIES: Record<ExpertDomain, ExpertSpecialization[]> = {
  wellness: [
    {
      slug: "anxiety-and-panic-attack-counsellor",
      value: "Anxiety and Panic Attack Counsellor",
      i18nKey: "specializations.anxiety-and-panic-attack-counsellor",
    },
    {
      slug: "depression-counsellor",
      value: "Depression Counsellor",
      i18nKey: "specializations.depression-counsellor",
    },
    {
      slug: "ocd-counsellor",
      value: "OCD Counsellor",
      i18nKey: "specializations.ocd-counsellor",
    },
    {
      slug: "adhd-counsellor",
      value: "ADHD Counsellor",
      i18nKey: "specializations.adhd-counsellor",
    },
    {
      slug: "couple-counsellor",
      value: "Couple Counsellor",
      i18nKey: "specializations.couple-counsellor",
    },
    {
      slug: "family-counsellor",
      value: "Family Counsellor",
      i18nKey: "specializations.family-counsellor",
    },
    {
      slug: "breakup-recovery-expert",
      value: "Breakup Recovery Expert",
      i18nKey: "specializations.breakup-recovery-expert",
    },
    {
      slug: "loneliness-counsellor",
      value: "Loneliness Counsellor",
      i18nKey: "specializations.loneliness-counsellor",
    },
    {
      slug: "divorce-separation-counsellor",
      value: "Divorce / Separation Counsellor",
      i18nKey: "specializations.divorce-separation-counsellor",
    },
    {
      slug: "stress-overthinking-expert",
      value: "Stress / Overthinking Expert",
      i18nKey: "specializations.stress-overthinking-expert",
    },
    {
      slug: "dietician",
      value: "Dietician",
      i18nKey: "specializations.dietician",
    },
    {
      slug: "yoga-expert",
      value: "Yoga Expert",
      i18nKey: "specializations.yoga-expert",
    },
  ],
  education: [
    {
      slug: "career-path-finder",
      value: "Career Path Finder",
      i18nKey: "specializations.career-path-finder",
    },
    {
      slug: "academic-counsellor",
      value: "Academic Counsellor",
      i18nKey: "specializations.academic-counsellor",
    },
    {
      slug: "achievers",
      value: "Achievers",
      i18nKey: "specializations.achievers",
    },
    {
      slug: "aspirants",
      value: "Aspirants",
      i18nKey: "specializations.aspirants",
    },
    {
      slug: "academic-scholars",
      value: "Academic Scholars",
      i18nKey: "specializations.academic-scholars",
    },
    {
      slug: "educator",
      value: "Educator",
      i18nKey: "specializations.educator",
    },
  ],
  finance: [
    {
      slug: "investment-expert",
      value: "Investment Expert",
      i18nKey: "specializations.investment-expert",
    },
    {
      slug: "gst-and-tax-expert",
      value: "GST and Tax Expert",
      i18nKey: "specializations.gst-and-tax-expert",
    },
    {
      slug: "financial-planner",
      value: "Financial Planner",
      i18nKey: "specializations.financial-planner",
    },
    {
      slug: "insurance-expert",
      value: "Insurance Expert",
      i18nKey: "specializations.insurance-expert",
    },
    {
      slug: "business-finance-consultant",
      value: "Business Finance Consultant",
      i18nKey: "specializations.business-finance-consultant",
    },
  ],
};

export const ALL_EXPERT_SPECIALIZATIONS: ExpertSpecialization[] = [
  ...EXPERT_CATEGORIES.wellness,
  ...EXPERT_CATEGORIES.education,
  ...EXPERT_CATEGORIES.finance,
];

export function getSpecializationBySlug(
  slug: string
): ExpertSpecialization | undefined {
  return ALL_EXPERT_SPECIALIZATIONS.find((s) => s.slug === slug);
}

export function getSpecializationByValue(
  value: string
): ExpertSpecialization | undefined {
  return ALL_EXPERT_SPECIALIZATIONS.find((s) => s.value === value);
}

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
