import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useScreen } from "../context/ScreenContext";
import { useAuth } from "../context/AuthContext";
import LoginRequiredModal from "../components/modals/LoginRequiredModal";
import { ArrowLeft, AlertTriangle, X } from "lucide-react";
import {
  ADHD_QUESTIONS,
  DIET_QUESTIONS,
  RELATIONSHIP_QUESTIONS,
  YOGA_QUESTIONS,
  PATH_FINDER_QUESTIONS,
  CAREER_PLANNING_QUESTIONS,
  ACADEMIC_QUESTIONS,
  GST_TAXATION_QUESTIONS,
  FINANCIAL_PLANNING_QUESTIONS,
} from "../lib/constants/assessments";
import type { QuizOption } from "../lib/interfaces";

function OptionItem({
  option,
  onClick,
  selectedOption,
}: {
  option: QuizOption;
  onClick: (option: QuizOption) => void;
  selectedOption: QuizOption | null;
}) {
  const isSelected = selectedOption && option.text === selectedOption.text;

  return (
    <div
      className={`option-item text-[16px] cursor-pointer py-[15px] px-[25px] rounded-[25px] ${
        isSelected
          ? "bg-[#44666C] text-white"
          : "bg-[#f2f8f9] hover:bg-[#dae7e7] text-[#44666C]"
      } transition-colors duration-200`}
      onClick={() => onClick(option)}
    >
      {option.text}
    </div>
  );
}

export default function AssessmentQuestions() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const { screenWidth } = useScreen();
  const { user } = useAuth();

  // Determine domain from pathname
  const domain = location.pathname.includes("/assessments/education/")
    ? "education"
    : location.pathname.includes("/assessments/finance/")
    ? "finance"
    : "wellness";

  // Get questions based on assessment type
  const getQuestions = () => {
    switch (assessmentType) {
      case "adhd":
        return ADHD_QUESTIONS;
      case "diet":
        return DIET_QUESTIONS;
      case "relationship":
        return RELATIONSHIP_QUESTIONS;
      case "yoga":
        return YOGA_QUESTIONS;
      case "path-finder":
        return PATH_FINDER_QUESTIONS;
      case "career-planning":
        return CAREER_PLANNING_QUESTIONS;
      case "academic":
        return ACADEMIC_QUESTIONS;
      case "gst-taxation":
        return GST_TAXATION_QUESTIONS;
      case "financial-planning":
        return FINANCIAL_PLANNING_QUESTIONS;
      default:
        return ADHD_QUESTIONS;
    }
  };
  const questions = getQuestions();
  const totalQuestions = questions.length;

  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [showBackModal, setShowBackModal] = useState<boolean>(false);

  const currentSelectedOption = answers[currentQuestion] || null;
  const currentQuizQuestion = questions[currentQuestion - 1];

  const calculateTotalScore = (): number => {
    return Object.values(answers).reduce(
      (sum, option) => sum + option.score,
      0
    );
  };

  function handleOptionClick(option: QuizOption) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  }

  function handleNextQuestion() {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handlePreviousQuestion() {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleFinish() {
    const totalScore = calculateTotalScore();
    // Navigate to results page with score as URL parameter
    navigate(
      `/assessments/${domain}/${assessmentType}/result?score=${totalScore}`
    );
  }

  const canGoNext =
    currentSelectedOption !== null && currentQuestion < totalQuestions;
  const canGoPrevious = currentQuestion > 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  const handleBackClick = () => {
    setShowBackModal(true);
  };

  const handleConfirmBack = () => {
    navigate(`/assessments/${domain}/${assessmentType}`);
  };

  const handleCancelBack = () => {
    setShowBackModal(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <ResponsiveNavbar />
        <LoginRequiredModal
          isOpen={true}
          onClose={() => navigate(`/assessments/${domain}/${assessmentType}`)}
        />
      </div>
    );
  }

  return (
    <div className="self-assessment-questions-page max-w-[1350px] mx-auto px-[25px] pb-[70px] sm:pb-[90px]">
      <ResponsiveNavbar />
      <button
        onClick={handleBackClick}
        className="inline-flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mt-[30px] mb-[20px] transition-colors duration-200 group cursor-pointer"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform duration-200"
        />
        <span className="text-[16px] font-medium">Back to Assessment</span>
      </button>
      <h1 className="text-[20px] font-semibold text-[#44666C]">
        {t("question")} {currentQuestion} {t("of")} {totalQuestions}
      </h1>
      {/* Progress bar */}
      <div className="w-full h-[12px] bg-[#D9D9D9] rounded-[10px] mt-[14px]">
        <div
          className="h-full bg-[#44666C] rounded-[10px] transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Question Text */}
      <h2 className="question-text text-[24px] font-medium text-[#44666C] mt-[50px]">
        {currentQuizQuestion.question}
      </h2>

      {/* Options */}
      <div
        className={`options-container ${
          screenWidth <= 800 ? "grid grid-cols-1" : "grid grid-cols-2"
        } gap-[20px] mt-[20px]`}
      >
        {currentQuizQuestion.options.map((option, index) => (
          <OptionItem
            key={index}
            option={option}
            onClick={handleOptionClick}
            selectedOption={currentSelectedOption}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[50px] mb-[30px]">
        <button
          onClick={handlePreviousQuestion}
          disabled={!canGoPrevious}
          className={`px-[40px] py-[12px] rounded-[30px] text-[18px] font-medium transition-all duration-200 ${
            canGoPrevious
              ? "bg-[#f2f8f9] text-[#44666C] border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#dae7e7] cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              : "bg-[#f8fbfb] text-gray-400 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] cursor-not-allowed opacity-60"
          }`}
        >
          {t("previous")}
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleFinish}
            disabled={!currentSelectedOption}
            className={`px-[40px] py-[12px] rounded-[30px] text-[18px] font-medium transition-all duration-200 ${
              currentSelectedOption
                ? "bg-[#f2f8f9] text-[#44666C] border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#dae7e7] cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                : "bg-[#f8fbfb] text-gray-400 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] cursor-not-allowed opacity-60"
            }`}
          >
            {t("finish")}
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={!canGoNext}
            className={`px-[40px] py-[12px] rounded-[30px] text-[18px] font-medium transition-all duration-200 ${
              canGoNext
                ? "bg-[#f2f8f9] text-[#44666C] border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#dae7e7] cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                : "bg-[#f8fbfb] text-gray-400 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] cursor-not-allowed opacity-60"
            }`}
          >
            {t("next")}
          </button>
        )}
      </div>

      {/* Back Confirmation Modal */}
      {showBackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCancelBack}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={handleCancelBack}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} className="text-amber-600" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#1a2e35] mb-3">
                Leave Assessment?
              </h2>
              <p className="text-[#5a6c75] leading-relaxed">
                You will lose your progress in this assessment. All your answers
                will be discarded and you'll need to start over.
              </p>
            </div>

            {/* Progress Info */}
            <div className="bg-[#f8fafb] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#44666C]">
                  Progress
                </span>
                <span className="text-sm font-semibold text-[#44666C]">
                  {currentQuestion} of {totalQuestions} questions
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#44666C] rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentQuestion / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelBack}
                className="flex-1 px-6 py-3 rounded-xl font-medium text-[#44666C] bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap cursor-pointer"
              >
                Continue Assessment
              </button>
              <button
                onClick={handleConfirmBack}
                className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-[#44666C] hover:bg-[#365a62] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap cursor-pointer"
              >
                Leave Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
