import type { QuizQuestion } from "../interfaces";
import { getAssessmentBySlug } from "./assessmentCatalog";

function questionsFor(slug: string): QuizQuestion[] {
  return getAssessmentBySlug(slug)?.questions || [];
}

// Backward-compatible exports for older imports. New assessment pages use assessmentCatalog.ts.
export const ADHD_QUESTIONS = questionsFor("adhd");
export const DIET_QUESTIONS = questionsFor("diet");
export const RELATIONSHIP_QUESTIONS = questionsFor("relationship");
export const YOGA_QUESTIONS = questionsFor("yoga");
export const PATH_FINDER_QUESTIONS = questionsFor("path-finder");
export const CAREER_PLANNING_QUESTIONS = questionsFor("path-finder");
export const ACADEMIC_QUESTIONS = questionsFor("academic");
export const GST_TAXATION_QUESTIONS = questionsFor("gst-taxation");
export const FINANCIAL_PLANNING_QUESTIONS = questionsFor("financial-planning");
