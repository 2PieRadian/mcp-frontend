import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useScreen } from "../context/ScreenContext";
import { ADHD_QUESTIONS } from "../lib/constants/assessments";
import type { QuizOption } from "../lib/interfaces";
import useScrollToTop from "../hooks/useScrollToTop";

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
          : "bg-[#D8E1E2] hover:bg-[#c4d2d3] text-[#44666C]"
      } transition-colors duration-200`}
      onClick={() => onClick(option)}
    >
      {option.text}
    </div>
  );
}

export default function AssessmentQuestions() {
  useScrollToTop();
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { assessmentType } = useParams<{ assessmentType: string }>();
  const { screenWidth } = useScreen();

  // Get questions based on assessment type (for now only ADHD)
  const questions = assessmentType === "adhd" ? ADHD_QUESTIONS : ADHD_QUESTIONS;
  const totalQuestions = questions.length;

  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

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
      `/assessments/wellness/${assessmentType}/result?score=${totalScore}`
    );
  }

  const canGoNext =
    currentSelectedOption !== null && currentQuestion < totalQuestions;
  const canGoPrevious = currentQuestion > 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="self-assessment-questions-page max-w-[1350px] mx-auto px-[25px]">
      <ResponsiveNavbar />
      <h1 className="text-[20px] font-semibold text-[#44666C] mt-[30px]">
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
              ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
                ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
                ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t("next")}
          </button>
        )}
      </div>
    </div>
  );
}
