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
      value: "Anxiety & Panic",
      i18nKey: "specializations.anxiety-and-panic",
    },
    {
      slug: "depression-support",
      value: "Depression Support",
      i18nKey: "specializations.depression-support",
    },
    {
      slug: "ocd-support",
      value: "OCD Support",
      i18nKey: "specializations.ocd-support",
    },
    {
      slug: "adhd-support",
      value: "ADHD Support",
      i18nKey: "specializations.adhd-support",
    },
    {
      slug: "relationship-issues",
      value: "Relationship Issues",
      i18nKey: "specializations.relationship-issues",
    },
    {
      slug: "family-issues",
      value: "Family Issues",
      i18nKey: "specializations.family-issues",
    },
    {
      slug: "breakup-recovery",
      value: "Breakup Recovery",
      i18nKey: "specializations.breakup-recovery",
    },
    {
      slug: "loneliness-support",
      value: "Loneliness Support",
      i18nKey: "specializations.loneliness-support",
    },
    {
      slug: "stress-management",
      value: "Stress Management",
      i18nKey: "specializations.stress-management",
    },
    {
      slug: "sleep-problems",
      value: "Sleep Problems",
      i18nKey: "specializations.sleep-problems",
    },
    {
      slug: "life-coaching",
      value: "Life Coaching",
      i18nKey: "specializations.life-coaching",
    },
    {
      slug: "weight-management",
      value: "Weight Management",
      i18nKey: "specializations.weight-management",
    },
    {
      slug: "nutrition-guidance",
      value: "Nutrition Guidance",
      i18nKey: "specializations.nutrition-guidance",
    },
    {
      slug: "yoga-therapy",
      value: "Yoga Therapy",
      i18nKey: "specializations.yoga-therapy",
    },
  ],
  education: [
    {
      slug: "career-confusion",
      value: "Career Confusion",
      i18nKey: "specializations.career-confusion",
    },
    {
      slug: "career-planning",
      value: "Career Planning",
      i18nKey: "specializations.career-planning",
    },
    {
      slug: "career-change",
      value: "Career Change",
      i18nKey: "specializations.career-change",
    },
    {
      slug: "academic-guidance",
      value: "Academic Guidance",
      i18nKey: "specializations.academic-guidance",
    },
    {
      slug: "exam-stress",
      value: "Exam Stress",
      i18nKey: "specializations.exam-stress",
    },
    {
      slug: "study-skills",
      value: "Study Skills",
      i18nKey: "specializations.study-skills",
    },
    {
      slug: "time-management",
      value: "Time Management",
      i18nKey: "specializations.time-management",
    },
    {
      slug: "communication-skills",
      value: "Communication Skills",
      i18nKey: "specializations.communication-skills",
    },
    {
      slug: "resume-and-interviews",
      value: "Resume & Interviews",
      i18nKey: "specializations.resume-and-interviews",
    },
    {
      slug: "internship-guidance",
      value: "Internship Guidance",
      i18nKey: "specializations.internship-guidance",
    },
    {
      slug: "higher-studies",
      value: "Higher Studies",
      i18nKey: "specializations.higher-studies",
    },
  ],
  finance: [
    {
      slug: "budgeting",
      value: "Budgeting",
      i18nKey: "specializations.budgeting",
    },
    {
      slug: "income-planning",
      value: "Income Planning",
      i18nKey: "specializations.income-planning",
    },
    {
      slug: "emergency-fund",
      value: "Emergency Fund",
      i18nKey: "specializations.emergency-fund",
    },
    {
      slug: "beginner-investing",
      value: "Beginner Investing",
      i18nKey: "specializations.beginner-investing",
    },
    {
      slug: "mutual-funds",
      value: "Mutual Funds",
      i18nKey: "specializations.mutual-funds",
    },
    {
      slug: "investment-planning",
      value: "Investment Planning",
      i18nKey: "specializations.investment-planning",
    },
    {
      slug: "loan-stress",
      value: "Loan Stress",
      i18nKey: "specializations.loan-stress",
    },
    {
      slug: "debt-repayment",
      value: "Debt Repayment",
      i18nKey: "specializations.debt-repayment",
    },
    {
      slug: "credit-score",
      value: "Credit Score",
      i18nKey: "specializations.credit-score",
    },
    {
      slug: "tax-planning",
      value: "Tax Planning",
      i18nKey: "specializations.tax-planning",
    },
    {
      slug: "gst-guidance",
      value: "GST Guidance",
      i18nKey: "specializations.gst-guidance",
    },
    {
      slug: "financial-planning",
      value: "Financial Planning",
      i18nKey: "specializations.financial-planning",
    },
    {
      slug: "insurance-planning",
      value: "Insurance Planning",
      i18nKey: "specializations.insurance-planning",
    },
    {
      slug: "retirement-planning",
      value: "Retirement Planning",
      i18nKey: "specializations.retirement-planning",
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
