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
      slug: "anxiety-and-panic",
      value: "Anxiety and Panic Attack Counsellor",
      i18nKey: "specializations.anxiety-and-panic",
    },
    {
      slug: "depression-support",
      value: "Depression Counsellor",
      i18nKey: "specializations.depression-support",
    },
    {
      slug: "ocd-support",
      value: "OCD Counsellor",
      i18nKey: "specializations.ocd-support",
    },
    {
      slug: "adhd-support",
      value: "ADHD Counsellor",
      i18nKey: "specializations.adhd-support",
    },
    {
      slug: "relationship-issues",
      value: "Couple Counsellor",
      i18nKey: "specializations.relationship-issues",
    },
    {
      slug: "family-issues",
      value: "Family Counsellor",
      i18nKey: "specializations.family-issues",
    },
    {
      slug: "breakup-recovery",
      value: "Breakup Recovery Expert",
      i18nKey: "specializations.breakup-recovery",
    },
    {
      slug: "loneliness-support",
      value: "Loneliness Counsellor",
      i18nKey: "specializations.loneliness-support",
    },
    {
      slug: "sleep-problems",
      value: "Divorce / Separation Counsellor",
      i18nKey: "specializations.sleep-problems",
    },
    {
      slug: "stress-management",
      value: "Stress / Overthinking Expert",
      i18nKey: "specializations.stress-management",
    },
    {
      slug: "nutrition-guidance",
      value: "Dietician",
      i18nKey: "specializations.nutrition-guidance",
    },
    {
      slug: "yoga-therapy",
      value: "Yoga Expert",
      i18nKey: "specializations.yoga-therapy",
    },
  ],
  education: [
    {
      slug: "career-confusion",
      value: "Career Path Finder",
      i18nKey: "specializations.career-confusion",
    },
    {
      slug: "academic-guidance",
      value: "Academic Counsellor",
      i18nKey: "specializations.academic-guidance",
    },
    {
      slug: "exam-stress",
      value: "Achievers",
      i18nKey: "specializations.exam-stress",
    },
    {
      slug: "study-skills",
      value: "Aspirants",
      i18nKey: "specializations.study-skills",
    },
    {
      slug: "higher-studies",
      value: "Academic Scholars",
      i18nKey: "specializations.higher-studies",
    },
  ],
  finance: [
    {
      slug: "income-planning",
      value: "Business Finance Consultant",
      i18nKey: "specializations.income-planning",
    },
    {
      slug: "investment-planning",
      value: "Investment Expert",
      i18nKey: "specializations.investment-planning",
    },
    {
      slug: "gst-guidance",
      value: "GST and Tax Expert",
      i18nKey: "specializations.gst-guidance",
    },
    {
      slug: "financial-planning",
      value: "Financial Planner",
      i18nKey: "specializations.financial-planning",
    },
    {
      slug: "insurance-planning",
      value: "Insurance Expert",
      i18nKey: "specializations.insurance-planning",
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
