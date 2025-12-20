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

// Diet Assessment Questions
export const DIET_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of food do you prefer most often?",
    options: [
      { text: "Equal mix of home food and outside food", score: 2 },
      { text: "Homemade balanced meals", score: 4 },
      { text: "Mostly fast food or processed food", score: 1 },
      { text: "Mostly home-cooked but sometimes fast food", score: 3 },
    ],
  },
  {
    id: 2,
    question: "How often do you eat fruits and vegetables?",
    options: [
      { text: "Rarely or never", score: 1 },
      { text: "1–2 times a week", score: 2 },
      { text: "4–5 times a week", score: 3 },
      { text: "Daily (2–3 servings)", score: 4 },
    ],
  },
  {
    id: 3,
    question: "How often do you consume fried or junk food?",
    options: [
      { text: "Almost daily", score: 1 },
      { text: "2–3 times a week", score: 2 },
      { text: "Once a week", score: 3 },
      { text: "Rarely", score: 4 },
    ],
  },
  {
    id: 4,
    question: "How much water do you drink per day?",
    options: [
      { text: "1–1.5 litres", score: 2 },
      { text: "More than 2.5 litres", score: 4 },
      { text: "Less than 1 litre", score: 1 },
      { text: "1.5–2.5 litres", score: 3 },
    ],
  },
  {
    id: 5,
    question: "How often do you eat breakfast?",
    options: [
      { text: "Rarely or never", score: 1 },
      { text: "Occasionally", score: 2 },
      { text: "4–5 times a week", score: 3 },
      { text: "Every day", score: 4 },
    ],
  },
  {
    id: 6,
    question: "At what time do you usually eat your meals?",
    options: [
      { text: "No fixed schedule", score: 1 },
      { text: "Often skip or delay meals", score: 2 },
      { text: "Slightly irregular but mostly on time", score: 3 },
      { text: "Fixed routine every day", score: 4 },
    ],
  },
  {
    id: 7,
    question: "How many meals do you usually have in a day?",
    options: [
      { text: "Eat randomly, no pattern", score: 1 },
      { text: "3 meals only", score: 3 },
      { text: "2 main meals", score: 2 },
      { text: "3 main meals + 2 small snacks", score: 4 },
    ],
  },
  {
    id: 8,
    question: "How many cups of tea/coffee/soft drinks do you consume daily?",
    options: [
      { text: "More than 5 cups", score: 1 },
      { text: "4–5 cups", score: 2 },
      { text: "2–3 cups", score: 3 },
      { text: "None or 1 cup", score: 4 },
    ],
  },
  {
    id: 9,
    question: "Do you consume alcohol or sugary drinks?",
    options: [
      { text: "Regularly (almost daily)", score: 1 },
      { text: "Frequently (weekly)", score: 2 },
      { text: "Occasionally (once or twice a month)", score: 3 },
      { text: "Never", score: 4 },
    ],
  },
  {
    id: 10,
    question: "Do you eat while watching TV or using a phone?",
    options: [
      { text: "Always", score: 1 },
      { text: "Often", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Never", score: 4 },
    ],
  },
  {
    id: 11,
    question: "How often do you crave sweets or fried snacks?",
    options: [
      { text: "Daily", score: 1 },
      { text: "Often", score: 2 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 4 },
    ],
  },
  {
    id: 12,
    question: "How would you describe your physical activity level?",
    options: [
      { text: "Sedentary (no regular exercise)", score: 1 },
      { text: "Lightly active (1–2 days/week)", score: 2 },
      { text: "Moderately active (3–4 days/week)", score: 3 },
      { text: "Very active (exercise 5–7 days/week)", score: 4 },
    ],
  },
  {
    id: 13,
    question: "How many hours of sleep do you get daily?",
    options: [
      { text: "4–5 hours", score: 2 },
      { text: "6–7 hours", score: 3 },
      { text: "Less than 4 hours", score: 1 },
      { text: "7–8 hours", score: 4 },
    ],
  },
  {
    id: 14,
    question: "How do you feel after meals?",
    options: [
      { text: "Always tired or uncomfortable", score: 1 },
      { text: "Normal but slightly heavy sometimes", score: 3 },
      { text: "Often bloated or sleepy", score: 2 },
      { text: "Energetic and satisfied", score: 4 },
    ],
  },
  {
    id: 15,
    question: "What is your main goal?",
    options: [
      { text: "Lose weight", score: 3 },
      { text: "Maintain healthy lifestyle", score: 4 },
      { text: "Manage medical condition", score: 2 },
      { text: "Gain weight", score: 1 },
    ],
  },
];

// Relationship Assessment Questions
export const RELATIONSHIP_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When your partner is online but not replying, you…",
    options: [
      { text: "Think they must be busy.", score: 4 },
      { text: "Keep checking again & again.", score: 1 },
      { text: "Reply late yourself also.", score: 3 },
      { text: "Feel a little uneasy but wait.", score: 2 },
    ],
  },
  {
    id: 2,
    question: "If your partner cancels a plan last minute, you…",
    options: [
      { text: "Feel bad but adjust.", score: 2 },
      { text: "Stay totally calm — happens sometimes.", score: 4 },
      { text: "Ask reason and understand.", score: 3 },
      { text: "Get upset and think they don't care.", score: 1 },
    ],
  },
  {
    id: 3,
    question: "When your partner is talking to someone attractive, you…",
    options: [
      { text: "Trust them fully.", score: 4 },
      { text: "Notice but don't react.", score: 2 },
      { text: "Ask casually who it was.", score: 3 },
      { text: "Feel jealous and overthink.", score: 1 },
    ],
  },
  {
    id: 4,
    question: "If they forget to call or text you back, you…",
    options: [
      { text: "Remind them lightly.", score: 3 },
      { text: "Understand they got busy.", score: 4 },
      { text: "Think 'they are losing interest.'", score: 1 },
      { text: "Get irritated but let it go.", score: 2 },
    ],
  },
  {
    id: 5,
    question: "When you have a small fight, you…",
    options: [
      { text: "Try to resolve it calmly.", score: 4 },
      { text: "Feel sad but talk later.", score: 2 },
      { text: "Take time to cool down.", score: 3 },
      { text: "Fear breakup immediately.", score: 1 },
    ],
  },
  {
    id: 6,
    question: "When your partner asks for personal space, you…",
    options: [
      { text: "Feel uneasy but allow it.", score: 2 },
      { text: "Ask 'how long?' but stay calm.", score: 3 },
      { text: "Give space without issue.", score: 4 },
      { text: "Feel insecure or rejected.", score: 1 },
    ],
  },
  {
    id: 7,
    question: "How often do you check their phone or social media?",
    options: [
      { text: "Rarely.", score: 3 },
      { text: "Never — no need.", score: 4 },
      { text: "Many times a day.", score: 1 },
      { text: "Sometimes when doubtful.", score: 2 },
    ],
  },
  {
    id: 8,
    question: "When your partner posts pictures without you, you…",
    options: [
      { text: "Think it's normal.", score: 4 },
      { text: "Ask curiously.", score: 3 },
      { text: "Feel left out or insecure.", score: 1 },
      { text: "Wonder why but stay quiet.", score: 2 },
    ],
  },
  {
    id: 9,
    question: "If they go out with friends, you…",
    options: [
      { text: "Don't worry — their time.", score: 4 },
      { text: "Text once to check.", score: 3 },
      { text: "Feel uneasy but control yourself.", score: 2 },
      { text: "Call/text repeatedly.", score: 1 },
    ],
  },
  {
    id: 10,
    question: "How often do you need reassurance like 'Do you still love me?'",
    options: [
      { text: "Rarely.", score: 3 },
      { text: "Almost never.", score: 4 },
      { text: "Every day or very often.", score: 1 },
      { text: "Sometimes.", score: 2 },
    ],
  },
  {
    id: 11,
    question: "During arguments, you usually…",
    options: [
      { text: "Try to discuss and fix things.", score: 4 },
      { text: "Stay quiet and avoid conflict.", score: 2 },
      { text: "Take a break and talk later.", score: 3 },
      { text: "Cry, panic, or think they'll leave.", score: 1 },
    ],
  },
  {
    id: 12,
    question: "If your partner is in a bad mood, you…",
    options: [
      { text: "Overthink whole day.", score: 2 },
      { text: "Understand it happens.", score: 4 },
      { text: "Assume it's because of you.", score: 1 },
      { text: "Check once, then give space.", score: 3 },
    ],
  },
  {
    id: 13,
    question: "When partner compliments others, you…",
    options: [
      { text: "Feel insecure or jealous.", score: 1 },
      { text: "Feel normal.", score: 4 },
      { text: "Compare yourself a little.", score: 2 },
      { text: "Ask playfully about it.", score: 3 },
    ],
  },
  {
    id: 14,
    question: "How often do you replay your chats to check tone/content?",
    options: [
      { text: "Rarely.", score: 3 },
      { text: "Very often.", score: 1 },
      { text: "Sometimes.", score: 2 },
      { text: "Never.", score: 4 },
    ],
  },
  {
    id: 15,
    question: "How emotionally safe do you feel with them daily?",
    options: [
      { text: "Mostly safe.", score: 3 },
      { text: "Sometimes safe, sometimes not.", score: 2 },
      { text: "Fully safe and secure.", score: 4 },
      { text: "Mostly unsafe or scared to lose them.", score: 1 },
    ],
  },
];

// Yoga Assessment Questions
export const YOGA_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How often do you stretch or do yoga in a week?",
    options: [
      { text: "Maybe once or twice.", score: 3 },
      { text: "Never at all.", score: 1 },
      { text: "Almost daily.", score: 4 },
      { text: "Only when body pain hits.", score: 2 },
    ],
  },
  {
    id: 2,
    question: "Your breathing awareness during the day is…",
    options: [
      { text: "Rarely think about it.", score: 2 },
      { text: "Often stay aware and breathe calmly.", score: 4 },
      { text: "Sometimes take deep breaths intentionally.", score: 3 },
      { text: "Hardly notice my breathing.", score: 1 },
    ],
  },
  {
    id: 3,
    question: "During routine tasks (bending, lifting), you feel…",
    options: [
      { text: "Slight stiffness sometimes.", score: 2 },
      { text: "Very stiff or tight.", score: 1 },
      { text: "Very flexible and free.", score: 4 },
      { text: "Mostly comfortable.", score: 3 },
    ],
  },
  {
    id: 4,
    question: "When stress builds up, you usually…",
    options: [
      { text: "Ignore it till it gets worse.", score: 2 },
      { text: "Use meditation/relaxation techniques.", score: 4 },
      { text: "Try to breathe slowly.", score: 3 },
      { text: "Get irritated or overwhelmed.", score: 1 },
    ],
  },
  {
    id: 5,
    question: "Your posture while sitting or using phone is…",
    options: [
      { text: "I try but forget often.", score: 2 },
      { text: "Mostly slouched.", score: 1 },
      { text: "Mindful and straight almost always.", score: 4 },
      { text: "Mixed—sometimes good, sometimes not.", score: 3 },
    ],
  },
  {
    id: 6,
    question: "How regularly do you meditate?",
    options: [
      { text: "Very rarely.", score: 2 },
      { text: "Whenever I remember.", score: 3 },
      { text: "Don't meditate at all.", score: 1 },
      { text: "Regularly with focus.", score: 4 },
    ],
  },
  {
    id: 7,
    question:
      "How well do you notice your body's signals (pain, tension, fatigue)?",
    options: [
      { text: "Realize only when it gets serious.", score: 1 },
      { text: "Catch early signs easily.", score: 4 },
      { text: "Sometimes confused about signals.", score: 2 },
      { text: "Notice most signals.", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Your energy levels on a normal day are…",
    options: [
      { text: "Generally fine, with few low moments.", score: 3 },
      { text: "Mostly low or drained.", score: 1 },
      { text: "Quite stable throughout.", score: 4 },
      { text: "Up and down frequently.", score: 2 },
    ],
  },
  {
    id: 9,
    question:
      "How often do you do any form of relaxation (Shavasana, deep rest)?",
    options: [
      { text: "Rarely remember to do it.", score: 2 },
      { text: "Very regularly.", score: 4 },
      { text: "Sometimes when feeling heavy.", score: 3 },
      { text: "Never.", score: 1 },
    ],
  },
  {
    id: 10,
    question: "Your daily eating pattern is…",
    options: [
      { text: "Random—skip meals or overeat.", score: 1 },
      { text: "Balanced in many meals.", score: 3 },
      { text: "Mindful, slow and balanced.", score: 4 },
      { text: "Not perfect but manageable.", score: 2 },
    ],
  },
  {
    id: 11,
    question: "While walking, exercising or climbing stairs, your breath is…",
    options: [
      { text: "I become aware sometimes.", score: 3 },
      { text: "Very controlled and smooth.", score: 4 },
      { text: "Notice only when breathless.", score: 2 },
      { text: "Not noticed at all.", score: 1 },
    ],
  },
  {
    id: 12,
    question: "Your overall wellness routine (sleep, food, activity) is…",
    options: [
      { text: "A bit irregular.", score: 2 },
      { text: "Well-maintained and mindful.", score: 4 },
      { text: "Not consistent at all.", score: 1 },
      { text: "Somewhat stable.", score: 3 },
    ],
  },
  {
    id: 13,
    question: "When you sit for long hours, you…",
    options: [
      { text: "Sit straight most of the time.", score: 4 },
      { text: "Stay slouched till back hurts.", score: 1 },
      { text: "Try but fail to sit straight.", score: 2 },
      { text: "Adjust posture a few times.", score: 3 },
    ],
  },
  {
    id: 14,
    question: "How easy is it for you to calm your thoughts?",
    options: [
      { text: "Slightly difficult.", score: 2 },
      { text: "Quite easy with practice.", score: 4 },
      { text: "Manageable sometimes.", score: 3 },
      { text: "Very difficult.", score: 1 },
    ],
  },
  {
    id: 15,
    question: "How connected do you feel with your body and mind?",
    options: [
      { text: "Strongly connected.", score: 4 },
      { text: "Slightly aware.", score: 2 },
      { text: "Don't feel connected at all.", score: 1 },
      { text: "Somewhat connected.", score: 3 },
    ],
  },
];
