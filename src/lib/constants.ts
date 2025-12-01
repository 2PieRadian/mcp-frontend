import type { QuizQuestion } from "./interfaces";

export const SELF_ASSESSMENT_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "When I meet new people, I usually feel",
    options: [
      { text: "Quiet but polite", score: 3 },
      { text: "Very confident and outgoing", score: 4 },
      { text: "Friendly and open", score: 2 },
      { text: "Nervous and avoid talking", score: 1 },
    ],
  },
  {
    id: 2,
    question: "When someone needs help, I",
    options: [
      { text: "Ignore it unless told", score: 1 },
      { text: "Help only if it's convenient", score: 3 },
      { text: "Always offer help immediately", score: 2 },
      { text: "Try to help when I can", score: 4 },
    ],
  },
  {
    id: 3,
    question: "I prefer spending my free time —",
    options: [
      { text: "Mostly with friends or family", score: 4 },
      { text: "Mostly alone", score: 2 },
      { text: "Alone only", score: 1 },
      { text: "With both friends and alone time equally", score: 3 },
    ],
  },
  {
    id: 4,
    question: "If someone disagrees with me, I",
    options: [
      { text: "Get angry", score: 1 },
      { text: "Stop talking to them", score: 2 },
      { text: "Listen but feel uncomfortable", score: 3 },
      { text: "Stay calm and discuss peacefully", score: 4 },
    ],
  },
  {
    id: 5,
    question: "I can identify my feelings —",
    options: [
      { text: "Hardly ever", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Most of the time", score: 3 },
      { text: "Almost always", score: 4 },
    ],
  },
  {
    id: 6,
    question: "When I am upset, I",
    options: [
      { text: "Lose control", score: 1 },
      { text: "Stay quiet but angry", score: 2 },
      { text: "Try to calm myself", score: 3 },
      { text: "Handle emotions calmly", score: 4 },
    ],
  },
  {
    id: 7,
    question: "When someone hurts me, I",
    options: [
      { text: "Never forgive", score: 1 },
      { text: "Forgive slowly", score: 2 },
      { text: "Forgive after some time", score: 3 },
      { text: "Forgive quickly", score: 4 },
    ],
  },
  {
    id: 8,
    question: "I express gratitude —",
    options: [
      { text: "Rarely", score: 1 },
      { text: "Occasionally", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },
  {
    id: 9,
    question: "Before making decisions, I",
    options: [
      { text: "Think a little", score: 2 },
      { text: "Act without thinking", score: 1 },
      { text: "Think carefully and evaluate all sides", score: 4 },
      { text: "Analyze options", score: 3 },
    ],
  },
  {
    id: 10,
    question: "When plans fail, I",
    options: [
      { text: "Try to adjust", score: 3 },
      { text: "Stay calm and find a new plan", score: 4 },
      { text: "Feel bad but give up", score: 2 },
      { text: "Get upset easily", score: 1 },
    ],
  },
  {
    id: 11,
    question: "When I get feedback, I",
    options: [
      { text: "Ignore it", score: 2 },
      { text: "Think about it", score: 3 },
      { text: "Learn and improve from it", score: 4 },
      { text: "Feel angry or hurt", score: 1 },
    ],
  },
  {
    id: 12,
    question: "When I am under pressure, I",
    options: [
      { text: "Handle pressure well", score: 4 },
      { text: "Feel helpless", score: 2 },
      { text: "Panic", score: 1 },
      { text: "Stay calm sometimes", score: 3 },
    ],
  },
  {
    id: 13,
    question: "After failure, I",
    options: [
      { text: "Feel low for long", score: 2 },
      { text: "Quit", score: 1 },
      { text: "Try again confidently", score: 4 },
      { text: "Try again after a break", score: 3 },
    ],
  },
  {
    id: 14,
    question: "I view problems as",
    options: [
      { text: "Difficult situations", score: 2 },
      { text: "Challenges to face", score: 3 },
      { text: "Chances to learn", score: 4 },
      { text: "Bad luck", score: 1 },
    ],
  },
  {
    id: 15,
    question: "I show kindness in daily life",
    options: [
      { text: "Often", score: 3 },
      { text: "Very rarely", score: 1 },
      { text: "Occasionally", score: 2 },
      { text: "Always", score: 4 },
    ],
  },
];

export const WHY_CHOOSE_US_SECTION = [
  {
    id: 1,
    title: "Expert Therapists",
    description:
      "Understand what drives your behavior and thoughts with intelligent mood tracking.",
    callToAction: "Find your match",
    image: "experts_therapists.png",
  },
  {
    id: 2,
    title: "24/7 Accessibility",
    description:
      "Access therapy and mental Wellness tools anytime, anywhere through our mobile or desktop.",
    callToAction: "Start your journey",
    image: "accessibility.png",
  },
  {
    id: 3,
    title: "Complete Privacy",
    description:
      "Your conversations and data are completely secure with end-to-end encryption and HIPAA compliance.",
    callToAction: "Learn more",
    image: "privacy.png",
  },
  {
    id: 4,
    title: "Progress Tracking",
    description:
      "Monitor your mental Wellness journey with detailed insights and personalized progress reports.",
    callToAction: "View Demo",
    image: "progress.png",
  },
  {
    id: 5,
    title: "Affordable Care",
    description:
      "Quality mental Wellness care shouldn't break the bank. Flexible pricing plans to suit your budget.",
    callToAction: "View Pricing",
    image: "care.png",
  },
  {
    id: 6,
    title: "Community Support",
    description:
      "Join supportive community groups and connect with others on similar mental Wellness journeys.",
    callToAction: "Join Community",
    image: "support.png",
  },
];

export const REVIEWS = [
  {
    id: 1,
    name: "Sarah M.",
    review:
      "After my first session, I felt like a weight was lifted off my shoulders. I'm so grateful to have found this app!",
    rating: 5,
  },
  {
    id: 2,
    name: "John D.",
    review:
      "Saw you guys on Shark Tank and immediately downloaded the app. Have been taking therapy since then - going great. Feels so light after every session!",
    rating: 5,
  },
  {
    id: 3,
    name: "James L.",
    review:
      "I used to constantly feel like I'm not enough but my therapist is awesome - she made me believe in myself. It's been life changing!",
    rating: 5,
  },
];

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

export const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Dr. Christian Buehner",
    image: "/images/experts/expert_profile_img.png",
    rating: 4.8,
    ratingCount: 30,
    specialization: "Counselling Psychologist (2+ yrs of experience)",
    tags: "Anxiety, Relationship, Procrastination and Time Management",
    languages: "English, German",
    nextSlot: "Tue, Nov 12, 10:00 AM - 11:00 AM",
    price: 1500,
  },
  {
    id: 2,
    name: "Dr. Aisha Kapoor",
    image: "/images/experts/expert_profile_img.png",
    rating: 4.9,
    ratingCount: 42,
    specialization: "Clinical Psychologist (5+ yrs of experience)",
    tags: "Depression, Stress, Burnout",
    languages: "English, Hindi",
    nextSlot: "Wed, Nov 13, 2:00 PM - 3:00 PM",
    price: 1800,
  },
  {
    id: 3,
    name: "Dr. Miguel Santos",
    image: "/images/experts/expert_profile_img.png",
    rating: 4.7,
    ratingCount: 25,
    specialization: "Therapist (3+ yrs of experience)",
    tags: "Self-esteem, Motivation, Life Coaching",
    languages: "English, Spanish",
    nextSlot: "Thu, Nov 14, 9:30 AM - 10:30 AM",
    price: 1200,
  },
  {
    id: 4,
    name: "Dr. Priya Nair",
    image: "/images/experts/expert_profile_img.png",
    rating: 5.0,
    ratingCount: 60,
    specialization: "Psychiatrist (7+ yrs of experience)",
    tags: "Mood Disorders, ADHD, Sleep",
    languages: "English, Malayalam, Hindi",
    nextSlot: "Fri, Nov 15, 11:00 AM - 12:00 PM",
    price: 2200,
  },
  {
    id: 5,
    name: "Dr. Arjun Mehta",
    image: "/images/experts/expert_profile_img.png",
    rating: 4.6,
    ratingCount: 19,
    specialization: "Counsellor (2+ yrs of experience)",
    tags: "Work Anxiety, Communication, Anger",
    languages: "English, Hindi",
    nextSlot: "Sat, Nov 16, 4:00 PM - 5:00 PM",
    price: 1000,
  },
  {
    id: 6,
    name: "Dr. Sana Qureshi",
    image: "/images/experts/expert_profile_img.png",
    rating: 4.8,
    ratingCount: 34,
    specialization: "Family Therapist (4+ yrs of experience)",
    tags: "Relationships, Parenting, Conflict Resolution",
    languages: "English, Urdu",
    nextSlot: "Sun, Nov 17, 1:00 PM - 2:00 PM",
    price: 1600,
  },
];
