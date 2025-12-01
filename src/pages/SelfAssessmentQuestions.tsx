import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SelfAssessmentNavbar from "../components/SelfAssessmentNavbar";
import { SELF_ASSESSMENT_QUIZ } from "../lib/constants";
import type { QuizOption } from "../lib/interfaces";
import { useScreen } from "../context/ScreenContext";

function OptionItem({
  option,
  onClick,
  selectedOption,
  originalOption,
}: {
  option: QuizOption & { originalText?: string; originalIndex?: number };
  onClick: (option: QuizOption) => void;
  selectedOption:
    | (QuizOption & { originalText?: string; originalIndex?: number })
    | null;
  originalOption: QuizOption;
}) {
  // Compare based on original text or by checking if this is the selected option
  const isSelected =
    selectedOption &&
    ((option.originalText &&
      selectedOption.originalText &&
      option.originalText === selectedOption.originalText) ||
      (option.originalIndex !== undefined &&
        selectedOption.originalIndex !== undefined &&
        option.originalIndex === selectedOption.originalIndex) ||
      option.text === selectedOption.text);

  return (
    <div
      className={`option-item text-[16px] cursor-pointer py-[15px] px-[25px] rounded-[25px] ${
        isSelected
          ? "bg-[#44666C] text-white"
          : "bg-[#D8E1E2] hover:bg-[#c4d2d3] text-[#44666C]"
      } transition-colors duration-200`}
      onClick={() => onClick(originalOption)}
    >
      {option.text}
    </div>
  );
}

export default function SelfAssessmentQuestions() {
  const { t } = useTranslation(["common", "quiz"]);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const totalQuestions: number = SELF_ASSESSMENT_QUIZ.length;
  const { screenWidth } = useScreen();

  const currentSelectedOption = answers[currentQuestion] || null;

  // Get translated question and options
  const getQuestionText = (questionId: number): string => {
    const questionKey = `questions.q${questionId}`;
    return (
      t(`${questionKey}.question`, { ns: "quiz" }) ||
      SELF_ASSESSMENT_QUIZ[questionId - 1].question
    );
  };

  const getOptionText = (questionId: number, optionIndex: number): string => {
    const questionKey = `questions.q${questionId}.options.option${
      optionIndex + 1
    }`;
    const translated = t(questionKey, { ns: "quiz" });
    if (translated && translated !== questionKey) {
      return translated;
    }
    // Fallback to original text
    return SELF_ASSESSMENT_QUIZ[questionId - 1].options[optionIndex].text;
  };

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
    navigate(`/self-assessment/result?score=${totalScore}`);
  }

  const canGoNext =
    currentSelectedOption !== null && currentQuestion < totalQuestions;
  const canGoPrevious = currentQuestion > 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  // Create translated options for current question - display translated text but keep original for comparison
  const currentQuizQuestion = SELF_ASSESSMENT_QUIZ[currentQuestion - 1];
  const translatedOptions = currentQuizQuestion.options.map(
    (option, index) => ({
      ...option,
      text: getOptionText(currentQuestion, index),
      originalText: option.text, // Keep original for comparison
      originalIndex: index,
    })
  );

  // Find which translated option corresponds to the selected option
  const getSelectedTranslatedOption = () => {
    if (!currentSelectedOption) return null;
    const selectedIndex = currentQuizQuestion.options.findIndex(
      (opt) => opt.text === currentSelectedOption.text
    );
    if (selectedIndex >= 0) {
      return translatedOptions[selectedIndex];
    }
    return null;
  };

  const selectedTranslatedOption = getSelectedTranslatedOption();

  return (
    <div className="self-assessment-questions-page max-w-[1350px] mx-auto px-[25px]">
      <SelfAssessmentNavbar />
      <h1 className="text-[20px] font-semibold text-[#44666C] mt-[30px]">
        {t("question", { ns: "common" })} {currentQuestion}{" "}
        {t("of", { ns: "common" })} {totalQuestions}
      </h1>
      {/* Create a progress bar here */}
      <div className="w-full h-[12px] bg-[#D9D9D9] rounded-[10px] mt-[14px]">
        <div
          className="h-full bg-[#44666C] rounded-[10px] transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* <div className="text-[16px] font-medium text-[#44666C] mt-[14px]">
        Total Score: {calculateTotalScore()} / {totalQuestions * 4}
      </div> */}

      {/* Question Text Here*/}
      <h2 className="question-text text-[24px] font-medium text-[#44666C] mt-[50px]">
        {getQuestionText(currentQuestion)}
      </h2>

      {/* Options Here */}
      <div
        className={`options-container ${
          screenWidth <= 800 ? "grid grid-cols-1" : "grid grid-cols-2"
        } gap-[20px] mt-[20px]`}
      >
        {translatedOptions.map((translatedOption, index) => (
          <OptionItem
            key={index}
            option={translatedOption}
            onClick={handleOptionClick}
            selectedOption={selectedTranslatedOption}
            originalOption={currentQuizQuestion.options[index]}
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
          {t("previous", { ns: "common" })}
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
            {t("finish", { ns: "common" })}
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
            {t("next", { ns: "common" })}
          </button>
        )}
      </div>
    </div>
  );
}
