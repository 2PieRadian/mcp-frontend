import type { QuizQuestion } from "../interfaces";

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
