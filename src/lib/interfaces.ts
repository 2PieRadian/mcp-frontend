export type Role = "user" | "expert" | "admin";

export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface SelfAssessmentQuiz {
  questions: QuizQuestion[];
}
