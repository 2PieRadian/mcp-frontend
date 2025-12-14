export const EXPERT_CATEGORIES = {
  wellness: [
    "Anxiety & Panic",
    "Depression Support",
    "OCD Support",
    "ADHD Support",
    "Relationship Issues",
    "Family Issues",
    "Breakup Recovery",
    "Loneliness Support",
    "Stress Management",
    "Sleep Problems",
    "Life Coaching",
    "Weight Management",
    "Nutrition Guidance",
    "Yoga Therapy",
  ],
  education: [
    "Career Confusion",
    "Career Planning",
    "Career Change",
    "Academic Guidance",
    "Exam Stress",
    "Study Skills",
    "Time Management",
    "Communication Skills",
    "Resume & Interviews",
    "Internship Guidance",
    "Higher Studies",
  ],
  finance: [
    "Budgeting",
    "Income Planning",
    "Emergency Fund",
    "Beginner Investing",
    "Mutual Funds",
    "Investment Planning",
    "Loan Stress",
    "Debt Repayment",
    "Credit Score",
    "Tax Planning",
    "GST Guidance",
    "Financial Planning",
    "Insurance Planning",
    "Retirement Planning",
  ],
};

// Specialization descriptions
export const SPECIALIZATION_DESCRIPTIONS: Record<string, string> = {
  // Wellness
  "Anxiety & Panic":
    "Get professional support to manage anxiety and panic attacks with evidence-based techniques.",
  "Depression Support":
    "Find compassionate experts who specialize in treating depression and mood disorders.",
  "OCD Support":
    "Work with specialists trained in OCD treatment and cognitive behavioral therapy.",
  "ADHD Support":
    "Get personalized strategies and support for managing ADHD symptoms effectively.",
  "Relationship Issues":
    "Navigate relationship challenges with expert guidance and communication tools.",
  "Family Issues":
    "Resolve family conflicts and improve relationships with professional family therapy.",
  "Breakup Recovery":
    "Heal from breakups and build resilience with supportive counseling.",
  "Loneliness Support":
    "Overcome feelings of isolation and build meaningful connections.",
  "Stress Management":
    "Learn effective techniques to manage stress and improve your well-being.",
  "Sleep Problems":
    "Address sleep issues with evidence-based interventions and lifestyle changes.",
  "Life Coaching":
    "Achieve your personal and professional goals with structured coaching support.",
  "Weight Management":
    "Get personalized guidance for sustainable weight management and healthy habits.",
  "Nutrition Guidance":
    "Receive expert nutrition advice tailored to your health goals and lifestyle.",
  "Yoga Therapy":
    "Experience therapeutic yoga sessions for physical and mental wellness.",

  // Education
  "Career Confusion":
    "Get clarity on your career path with expert guidance and assessment tools.",
  "Career Planning":
    "Create a strategic career plan aligned with your skills and aspirations.",
  "Career Change":
    "Navigate career transitions smoothly with professional support and planning.",
  "Academic Guidance":
    "Improve your academic performance with personalized study strategies.",
  "Exam Stress":
    "Manage exam anxiety and perform your best with proven stress-reduction techniques.",
  "Study Skills":
    "Develop effective study habits and learning strategies for academic success.",
  "Time Management":
    "Master time management skills to balance studies and personal life effectively.",
  "Communication Skills":
    "Enhance your communication abilities for academic and professional success.",
  "Resume & Interviews":
    "Craft compelling resumes and ace interviews with expert preparation.",
  "Internship Guidance":
    "Find and secure the right internship opportunities for your career goals.",
  "Higher Studies":
    "Get guidance on choosing the right higher education path and institutions.",

  // Finance
  Budgeting:
    "Learn to create and stick to a budget that works for your financial situation.",
  "Income Planning":
    "Optimize your income streams and plan for financial growth.",
  "Emergency Fund":
    "Build a solid emergency fund to protect yourself from financial surprises.",
  "Beginner Investing":
    "Start your investment journey with expert guidance on the basics.",
  "Mutual Funds":
    "Understand mutual funds and build a diversified investment portfolio.",
  "Investment Planning":
    "Create a comprehensive investment strategy aligned with your goals.",
  "Loan Stress":
    "Manage loan repayments and reduce financial stress with expert advice.",
  "Debt Repayment":
    "Develop a strategic plan to pay off debt efficiently and regain financial freedom.",
  "Credit Score":
    "Improve your credit score and understand how to maintain good credit health.",
  "Tax Planning":
    "Optimize your tax strategy and maximize savings with professional guidance.",
  "GST Guidance":
    "Navigate GST compliance and understand tax implications for your business.",
  "Financial Planning":
    "Create a comprehensive financial plan for your short and long-term goals.",
  "Insurance Planning":
    "Choose the right insurance coverage to protect your financial future.",
  "Retirement Planning":
    "Plan for a secure retirement with expert financial advice and strategies.",
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
