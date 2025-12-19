import type { QuizQuestion } from "../interfaces";

// ADHD Assessment Questions
export const ADHD_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      "Do you find it difficult to stay focused on one task for a long time?",
    options: [
      { text: "I manage fine most of the time.", score: 1 },
      { text: "I usually stay focused unless it's boring.", score: 2 },
      { text: "I try but often drift off midway.", score: 3 },
      { text: "I lose focus quickly — my mind keeps jumping.", score: 4 },
    ],
  },
  {
    id: 2,
    question:
      "Do you get easily distracted by small things (like sounds, phone, or people)?",
    options: [
      { text: "Distractions hardly affect me.", score: 1 },
      { text: "Rarely — I'm pretty good at tuning things out.", score: 2 },
      {
        text: "Sometimes I get distracted, but I can get back on track.",
        score: 3,
      },
      { text: "Even a tiny noise or notification breaks my focus.", score: 4 },
    ],
  },
  {
    id: 3,
    question: "Do you struggle to organize your work or daily routine?",
    options: [
      { text: "I plan and manage things smoothly.", score: 1 },
      {
        text: "I'm usually organized, but mess happens occasionally.",
        score: 2,
      },
      { text: "I make to-do lists but still get behind sometimes.", score: 3 },
      { text: "I often start things but forget to finish them.", score: 4 },
    ],
  },
  {
    id: 4,
    question:
      "Do you tend to say or do things without thinking (act impulsively)?",
    options: [
      { text: "I usually think before acting.", score: 1 },
      { text: "I rarely do that unless I'm stressed.", score: 2 },
      { text: "I sometimes blurt things out and regret later.", score: 3 },
      { text: "I often react before thinking.", score: 4 },
    ],
  },
  {
    id: 5,
    question:
      "Do you feel restless while sitting (tapping, moving, or needing to get up)?",
    options: [
      { text: "I sit comfortably most of the time.", score: 1 },
      { text: "Only once in a while, not a big issue.", score: 2 },
      { text: "Sometimes I do that when I'm bored or anxious.", score: 3 },
      {
        text: "I can't sit still for long — I keep moving or fidgeting.",
        score: 4,
      },
    ],
  },
  {
    id: 6,
    question:
      "Do you often forget important things (keys, phone, meetings, dates)?",
    options: [
      { text: "I'm generally very mindful and don't forget.", score: 1 },
      { text: "It happens rarely — mostly I keep track.", score: 2 },
      { text: "Sometimes I forget, but I usually remember later.", score: 3 },
      { text: "I misplace things or forget plans quite often.", score: 4 },
    ],
  },
  {
    id: 7,
    question:
      "Do you find it difficult to follow instructions or complete multi-step tasks?",
    options: [
      { text: "I do fine with instructions.", score: 1 },
      { text: "I can follow steps but need focus.", score: 2 },
      { text: "Sometimes I need reminders to stay on track.", score: 3 },
      {
        text: "I get lost in the middle or skip steps accidentally.",
        score: 4,
      },
    ],
  },
  {
    id: 8,
    question:
      "Do you struggle to control your energy (too active or suddenly tired)?",
    options: [
      { text: "I'm mostly steady and calm.", score: 1 },
      { text: "Occasionally I feel that, but mostly balanced.", score: 2 },
      {
        text: "Sometimes I'm hyper, sometimes drained — depends on the day.",
        score: 3,
      },
      {
        text: "My energy keeps switching — full power to zero fast.",
        score: 4,
      },
    ],
  },
  {
    id: 9,
    question: "Do you tend to avoid boring or repetitive tasks?",
    options: [
      { text: "I push through even if it's boring.", score: 1 },
      { text: "I do them but with zero interest.", score: 2 },
      { text: "I start them but lose motivation halfway.", score: 3 },
      { text: "I delay them till the last minute or skip them.", score: 4 },
    ],
  },
  {
    id: 10,
    question:
      "Do you find it hard to control your emotions (easily frustrated, irritated, or overwhelmed)?",
    options: [
      { text: "I stay mostly calm and steady.", score: 1 },
      { text: "I lose patience sometimes, but not often.", score: 2 },
      { text: "I manage okay, but some days it's tough.", score: 3 },
      { text: "I get overwhelmed fast — small things hit hard.", score: 4 },
    ],
  },
];
