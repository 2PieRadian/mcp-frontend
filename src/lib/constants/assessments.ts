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

// Path Finder Assessment Questions
export const PATH_FINDER_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you think about your future life direction, you…",
    options: [
      { text: "Have many thoughts but no clarity.", score: 2 },
      { text: "Don't think about it much.", score: 1 },
      { text: "Have a clear idea where you want to go.", score: 4 },
      { text: "Have a basic direction but unsure about steps.", score: 3 },
    ],
  },
  {
    id: 2,
    question: "When making an important decision, you…",
    options: [
      { text: "Ask others to decide for you.", score: 2 },
      { text: "Think too much and get stuck.", score: 1 },
      { text: "Decide logically after comparing options.", score: 4 },
      { text: "Decide slowly but eventually choose right.", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How well do you understand your own strengths?",
    options: [
      { text: "Very well, I use them often.", score: 4 },
      { text: "Somewhat aware but not fully.", score: 3 },
      { text: "Not sure about them.", score: 2 },
      { text: "No idea at all.", score: 1 },
    ],
  },
  {
    id: 4,
    question: "When you face a new challenge, you…",
    options: [
      { text: "Avoid it because of fear.", score: 1 },
      { text: "Try but get anxious.", score: 2 },
      { text: "Take it head-on and learn quickly.", score: 4 },
      { text: "Handle it slowly but steadily.", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Your ability to plan things ahead is…",
    options: [
      { text: "Strong; you plan steps clearly.", score: 4 },
      { text: "Moderate; you plan sometimes.", score: 3 },
      { text: "Weak; plans rarely work.", score: 2 },
      { text: "Very low; you avoid planning.", score: 1 },
    ],
  },
  {
    id: 6,
    question: "When something unexpected happens, you…",
    options: [
      { text: "Adapt quickly.", score: 4 },
      { text: "Take time but adjust.", score: 3 },
      { text: "Get stressed and confused.", score: 2 },
      { text: "Feel stuck and lost.", score: 1 },
    ],
  },
  {
    id: 7,
    question: "How often do you take initiative in life?",
    options: [
      { text: "Very often; you start things yourself.", score: 4 },
      { text: "Sometimes when needed.", score: 3 },
      { text: "Rarely.", score: 2 },
      { text: "Almost never.", score: 1 },
    ],
  },
  {
    id: 8,
    question: "When you imagine your ideal life, you…",
    options: [
      { text: "Can visualize it clearly.", score: 4 },
      { text: "Have a rough idea.", score: 3 },
      { text: "Get confused.", score: 2 },
      { text: "Can't imagine anything specific.", score: 1 },
    ],
  },
  {
    id: 9,
    question: "How do you handle multiple responsibilities?",
    options: [
      { text: "Manage them well.", score: 4 },
      { text: "Manage okay but sometimes struggle.", score: 3 },
      { text: "Get overwhelmed often.", score: 2 },
      { text: "Avoid taking responsibilities.", score: 1 },
    ],
  },
  {
    id: 10,
    question: "Your motivation levels are…",
    options: [
      { text: "Very strong and consistent.", score: 4 },
      { text: "Good but fluctuate.", score: 3 },
      { text: "Low most of the time.", score: 2 },
      { text: "Very low; struggle to start.", score: 1 },
    ],
  },
  {
    id: 11,
    question: "When you fail at something, you…",
    options: [
      { text: "Try again with a better plan.", score: 4 },
      { text: "Feel bad but continue later.", score: 3 },
      { text: "Lose confidence.", score: 2 },
      { text: "Give up easily.", score: 1 },
    ],
  },
  {
    id: 12,
    question: "How well do you explore new opportunities?",
    options: [
      { text: "Actively explore and try new things.", score: 4 },
      { text: "Explore sometimes.", score: 3 },
      { text: "Rarely explore.", score: 2 },
      { text: "Avoid new things.", score: 1 },
    ],
  },
  {
    id: 13,
    question: "Your self-awareness is…",
    options: [
      { text: "High; you regularly reflect on yourself.", score: 4 },
      { text: "Moderate; sometimes reflect.", score: 3 },
      { text: "Low; you don't think deeply.", score: 2 },
      { text: "Very low; rarely reflect.", score: 1 },
    ],
  },
  {
    id: 14,
    question: "When someone gives guidance, you…",
    options: [
      { text: "Use it effectively.", score: 4 },
      { text: "Consider it sometimes.", score: 3 },
      { text: "Ignore most advice.", score: 2 },
      { text: "Depend completely on others' advice.", score: 1 },
    ],
  },
  {
    id: 15,
    question: "How confident are you about finding your right path?",
    options: [
      { text: "Very confident.", score: 4 },
      { text: "Somewhat confident.", score: 3 },
      { text: "Doubtful.", score: 2 },
      { text: "Not confident at all.", score: 1 },
    ],
  },
];

// GST & Taxation Assessment Questions
export const GST_TAXATION_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When it comes to GST filing, you…",
    options: [
      { text: "File regularly without reminders.", score: 4 },
      { text: "File but sometimes delay.", score: 3 },
      { text: "Often forget or skip deadlines.", score: 2 },
      { text: "Don't file unless someone forces you.", score: 1 },
    ],
  },
  {
    id: 2,
    question: "Your understanding of GST rules is…",
    options: [
      { text: "Clear and updated.", score: 4 },
      { text: "Basic but workable.", score: 3 },
      { text: "Very limited.", score: 2 },
      { text: "Almost zero.", score: 1 },
    ],
  },
  {
    id: 3,
    question: "When receiving an invoice, you…",
    options: [
      { text: "Check GST details properly.", score: 4 },
      { text: "Check sometimes.", score: 3 },
      { text: "Rarely check.", score: 2 },
      { text: "Never check GST details.", score: 1 },
    ],
  },
  {
    id: 4,
    question: "When a new GST update comes, you…",
    options: [
      { text: "Read and understand it.", score: 4 },
      { text: "Hear about it from others.", score: 3 },
      { text: "Ignore unless it affects you.", score: 2 },
      { text: "Never follow updates.", score: 1 },
    ],
  },
  {
    id: 5,
    question: "Your knowledge of input tax credit (ITC) is…",
    options: [
      { text: "Very good; you claim correctly.", score: 4 },
      { text: "Basic; you try but sometimes miss.", score: 3 },
      { text: "Slight idea only.", score: 2 },
      { text: "No idea.", score: 1 },
    ],
  },
  {
    id: 6,
    question: "When a tax-related document is needed, you…",
    options: [
      { text: "Have everything well-organized.", score: 4 },
      { text: "Can find things after some effort.", score: 3 },
      { text: "Search everywhere and get stressed.", score: 2 },
      { text: "Don't maintain documents.", score: 1 },
    ],
  },
  {
    id: 7,
    question: "For income tax planning, you…",
    options: [
      { text: "Plan early with proper calculations.", score: 4 },
      { text: "Decide slowly after thinking.", score: 3 },
      { text: "Plan at the last moment.", score: 2 },
      { text: "Don't plan at all.", score: 1 },
    ],
  },
  {
    id: 8,
    question: "Your awareness of tax-saving options (80C, 80D, etc.) is…",
    options: [
      { text: "Strong; you use them effectively.", score: 4 },
      { text: "Moderate understanding.", score: 3 },
      { text: "Very limited knowledge.", score: 2 },
      { text: "No awareness.", score: 1 },
    ],
  },
  {
    id: 9,
    question: "When you receive your salary/business income, you…",
    options: [
      { text: "Record everything properly.", score: 4 },
      { text: "Maintain basic notes.", score: 3 },
      { text: "Rarely track it.", score: 2 },
      { text: "Don't track income at all.", score: 1 },
    ],
  },
  {
    id: 10,
    question: "When you need to calculate tax, you…",
    options: [
      { text: "Calculate accurately.", score: 4 },
      { text: "Try but need help.", score: 3 },
      { text: "Get confused.", score: 2 },
      { text: "Cannot calculate at all.", score: 1 },
    ],
  },
  {
    id: 11,
    question: "Your compliance with due dates (GST, TDS, ITR) is…",
    options: [
      { text: "Always on time.", score: 4 },
      { text: "Mostly on time.", score: 3 },
      { text: "Frequently delayed.", score: 2 },
      { text: "Usually missed.", score: 1 },
    ],
  },
  {
    id: 12,
    question: "If a tax notice arrives, you…",
    options: [
      { text: "Understand the issue and respond.", score: 4 },
      { text: "Ask someone and respond.", score: 3 },
      { text: "Panic and delay action.", score: 2 },
      { text: "Ignore it.", score: 1 },
    ],
  },
  {
    id: 13,
    question: "Your record-keeping for business or profession is…",
    options: [
      { text: "Very systematic.", score: 4 },
      { text: "Good but not perfect.", score: 3 },
      { text: "Disorganized.", score: 2 },
      { text: "Non-existent.", score: 1 },
    ],
  },
  {
    id: 14,
    question: "How well do you understand your own tax liability?",
    options: [
      { text: "Very clear.", score: 4 },
      { text: "Somewhat clear.", score: 3 },
      { text: "Confusing.", score: 2 },
      { text: "No idea at all.", score: 1 },
    ],
  },
  {
    id: 15,
    question: "How confident are you in managing GST & taxation?",
    options: [
      { text: "Very confident.", score: 4 },
      { text: "Fairly confident.", score: 3 },
      { text: "Not very confident.", score: 2 },
      { text: "No confidence at all.", score: 1 },
    ],
  },
];

// Financial Planning Assessment Questions
export const FINANCIAL_PLANNING_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you manage your monthly expenses?",
    options: [
      { text: "No tracking at all.", score: 1 },
      { text: "Track sometimes.", score: 3 },
      { text: "Track everything clearly.", score: 4 },
      { text: "Mostly guess-based.", score: 2 },
    ],
  },
  {
    id: 2,
    question: "When you receive income, you…",
    options: [
      { text: "Spend first, save whatever is left.", score: 2 },
      { text: "Save first, spend later.", score: 4 },
      { text: "Don't think about saving.", score: 1 },
      { text: "Divide roughly between needs & savings.", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Your emergency fund status is…",
    options: [
      { text: "Fully maintained (3–6 months expenses).", score: 4 },
      { text: "No emergency fund.", score: 1 },
      { text: "Just starting.", score: 2 },
      { text: "Partially saved.", score: 3 },
    ],
  },
  {
    id: 4,
    question: "When unexpected expenses arise, you…",
    options: [
      { text: "Struggle and borrow.", score: 2 },
      { text: "Cannot manage without help.", score: 1 },
      { text: "Manage with some difficulty.", score: 3 },
      { text: "Handle easily due to planning.", score: 4 },
    ],
  },
  {
    id: 5,
    question: "Your investment habit is…",
    options: [
      { text: "Rarely invest.", score: 2 },
      { text: "Regular with a clear plan.", score: 4 },
      { text: "Do not invest at all.", score: 1 },
      { text: "Invest sometimes.", score: 3 },
    ],
  },
  {
    id: 6,
    question:
      "Your knowledge about financial products (FD, SIP, insurance, etc.) is…",
    options: [
      { text: "No knowledge.", score: 1 },
      { text: "Basic understanding.", score: 3 },
      { text: "Very limited.", score: 2 },
      { text: "Good and updated.", score: 4 },
    ],
  },
  {
    id: 7,
    question: "When planning big goals (house, education, marriage), you…",
    options: [
      { text: "Leave it for later.", score: 2 },
      { text: "Don't think about future goals.", score: 1 },
      { text: "Think about it but don't plan fully.", score: 3 },
      { text: "Create a financial plan.", score: 4 },
    ],
  },
  {
    id: 8,
    question: "Your debt/loan management is…",
    options: [
      { text: "Often delayed.", score: 2 },
      { text: "Very disciplined and timely.", score: 4 },
      { text: "Manageable with minor delays.", score: 3 },
      { text: "Out of control.", score: 1 },
    ],
  },
  {
    id: 9,
    question: "How often do you review your financial status?",
    options: [
      { text: "Occasionally.", score: 3 },
      { text: "Monthly.", score: 4 },
      { text: "Never.", score: 1 },
      { text: "Rarely.", score: 2 },
    ],
  },
  {
    id: 10,
    question: "Your insurance planning (life/health) is…",
    options: [
      { text: "Minimal coverage.", score: 2 },
      { text: "Somewhat covered.", score: 3 },
      { text: "No insurance at all.", score: 1 },
      { text: "Well covered and updated.", score: 4 },
    ],
  },
  {
    id: 11,
    question: "When it comes to long-term wealth, you…",
    options: [
      { text: "Never thought about it.", score: 1 },
      { text: "Have clear strategies.", score: 4 },
      { text: "Have some idea.", score: 3 },
      { text: "Unsure about it.", score: 2 },
    ],
  },
  {
    id: 12,
    question: "Your spending behavior is…",
    options: [
      { text: "Impulsive most of the time.", score: 1 },
      { text: "Controlled and mindful.", score: 4 },
      { text: "Mostly balanced.", score: 3 },
      { text: "Impulsive sometimes.", score: 2 },
    ],
  },
  {
    id: 13,
    question: "For retirement planning, you…",
    options: [
      { text: "Not planning at all.", score: 1 },
      { text: "Already planning or investing.", score: 4 },
      { text: "Thinking about it.", score: 3 },
      { text: "Not sure where to start.", score: 2 },
    ],
  },
  {
    id: 14,
    question: "How well do you manage financial documents?",
    options: [
      { text: "Somewhat organized.", score: 3 },
      { text: "Nothing is documented.", score: 1 },
      { text: "Poorly managed.", score: 2 },
      { text: "Very organized.", score: 4 },
    ],
  },
  {
    id: 15,
    question: "Your overall confidence in financial planning is…",
    options: [
      { text: "Very confident.", score: 4 },
      { text: "No confidence.", score: 1 },
      { text: "Somewhat confident.", score: 3 },
      { text: "Not very confident.", score: 2 },
    ],
  },
];

// Career Planning Assessment Questions
export const CAREER_PLANNING_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you think about your future career, you…",
    options: [
      { text: "Feel confused about what to choose.", score: 2 },
      { text: "Don't think much about it.", score: 1 },
      { text: "Explore options and research actively.", score: 4 },
      { text: "Have a rough idea but not sure.", score: 3 },
    ],
  },
  {
    id: 2,
    question: "While choosing a career, what matters most to you?",
    options: [
      { text: "Something stable and secure.", score: 3 },
      { text: "Don't know what matters yet.", score: 1 },
      { text: "Something aligned with your skills/interests.", score: 4 },
      { text: "Choose whatever others suggest.", score: 2 },
    ],
  },
  {
    id: 3,
    question: "How often do you work on improving your skills?",
    options: [
      { text: "Rarely, only when needed.", score: 1 },
      { text: "Sometimes but not consistently.", score: 2 },
      { text: "Regularly with a plan.", score: 4 },
      { text: "Whenever you remember.", score: 3 },
    ],
  },
  {
    id: 4,
    question: "When you face difficulty in career decisions, you…",
    options: [
      { text: "Avoid deciding.", score: 1 },
      { text: "Get confused but try slowly.", score: 2 },
      { text: "Collect information and decide logically.", score: 4 },
      { text: "Ask others to decide for you.", score: 3 },
    ],
  },
  {
    id: 5,
    question: "How clear are you about your strengths and weaknesses?",
    options: [
      { text: "Very clear, I know both well.", score: 4 },
      { text: "Somewhat clear.", score: 3 },
      { text: "Not really aware.", score: 2 },
      { text: "No idea at all.", score: 1 },
    ],
  },
  {
    id: 6,
    question: "When someone asks about your career plan, you…",
    options: [
      { text: "Explain it confidently.", score: 4 },
      { text: "Give a basic answer.", score: 3 },
      { text: "Change topics because unsure.", score: 2 },
      { text: "Have nothing to say.", score: 1 },
    ],
  },
  {
    id: 7,
    question: "Your daily habits towards career growth are…",
    options: [
      { text: "Very structured and consistent.", score: 4 },
      { text: "Moderate but improving.", score: 3 },
      { text: "Irregular.", score: 2 },
      { text: "Almost none.", score: 1 },
    ],
  },
  {
    id: 8,
    question: "When new opportunities come, you…",
    options: [
      { text: "Feel nervous and avoid them.", score: 1 },
      { text: "Think a lot and delay.", score: 2 },
      { text: "Evaluate and take action.", score: 4 },
      { text: "Try only if someone pushes you.", score: 3 },
    ],
  },
  {
    id: 9,
    question: "How well do you understand the job market in your field?",
    options: [
      { text: "Very well, keep yourself updated.", score: 4 },
      { text: "Know some things.", score: 3 },
      { text: "Very little knowledge.", score: 2 },
      { text: "No awareness.", score: 1 },
    ],
  },
  {
    id: 10,
    question: "How often do you take feedback for improvement?",
    options: [
      { text: "Rarely, I avoid feedback.", score: 1 },
      { text: "Sometimes but irregular.", score: 2 },
      { text: "Often and apply it.", score: 4 },
      { text: "Only when necessary.", score: 3 },
    ],
  },
  {
    id: 11,
    question: "When you fail in something career-related, you…",
    options: [
      { text: "Lose motivation easily.", score: 1 },
      { text: "Feel bad but try again.", score: 3 },
      { text: "Analyse mistakes and improve.", score: 4 },
      { text: "Ignore it and move on.", score: 2 },
    ],
  },
  {
    id: 12,
    question: "Your networking or professional connections are…",
    options: [
      { text: "Strong and growing.", score: 4 },
      { text: "Basic, limited circle.", score: 3 },
      { text: "Very few connections.", score: 2 },
      { text: "None.", score: 1 },
    ],
  },
  {
    id: 13,
    question: "When learning something new for your career, you…",
    options: [
      { text: "Learn comfortably and enjoy it.", score: 4 },
      { text: "Try but get stuck sometimes.", score: 2 },
      { text: "Learn slowly but steadily.", score: 3 },
      { text: "Avoid difficult things.", score: 1 },
    ],
  },
  {
    id: 14,
    question: "Are your long-term goals clear?",
    options: [
      { text: "Yes, clear with planning.", score: 4 },
      { text: "Somewhat clear.", score: 3 },
      { text: "Slightly clear but confusing.", score: 2 },
      { text: "Not clear at all.", score: 1 },
    ],
  },
  {
    id: 15,
    question: "How confident do you feel about your future career?",
    options: [
      { text: "Very confident and positive.", score: 4 },
      { text: "Sometimes confident, sometimes not.", score: 3 },
      { text: "Only a little confident.", score: 2 },
      { text: "Often feel you won't do well.", score: 1 },
    ],
  },
];

// Academic Assessment Questions
export const ACADEMIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you sit to study, you usually…",
    options: [
      { text: "Get distracted quickly and switch tasks.", score: 1 },
      { text: "Start slowly but then focus well.", score: 3 },
      { text: "Stay fully focused without trouble.", score: 4 },
      { text: "Try studying but keep thinking about other things.", score: 2 },
    ],
  },
  {
    id: 2,
    question: "Before exams, you…",
    options: [
      { text: "Study last minute and panic a bit.", score: 1 },
      { text: "Stay calm and revise normally.", score: 4 },
      { text: "Try revising but keep getting stressed.", score: 2 },
      { text: "Follow a pre-made plan or schedule.", score: 3 },
    ],
  },
  {
    id: 3,
    question: "When you don't understand a topic, you…",
    options: [
      { text: "Leave it and hope it won't come.", score: 1 },
      { text: "Search online or ask someone.", score: 3 },
      { text: "Try again patiently until you get it.", score: 4 },
      { text: "Feel frustrated and move on.", score: 2 },
    ],
  },
  {
    id: 4,
    question: "How is your daily study consistency?",
    options: [
      { text: "Study only when exams are near.", score: 1 },
      { text: "Some days good, some days skipped.", score: 2 },
      { text: "Mostly regular, minor gaps.", score: 3 },
      { text: "Very consistent almost every day.", score: 4 },
    ],
  },
  {
    id: 5,
    question: "When you get low marks, you…",
    options: [
      { text: "Lose motivation completely.", score: 1 },
      { text: "Feel bad but try again.", score: 3 },
      { text: "Analyse mistakes and plan better.", score: 4 },
      { text: "Ignore it and move on.", score: 2 },
    ],
  },
  {
    id: 6,
    question: "While studying, your phone usage is…",
    options: [
      { text: "Constantly checking messages/social media.", score: 1 },
      { text: "Sometimes using it but controlled.", score: 3 },
      { text: "Only using it for study.", score: 4 },
      { text: "Trying to avoid but failing often.", score: 2 },
    ],
  },
  {
    id: 7,
    question: "When you have multiple subjects to study, you…",
    options: [
      { text: "Get confused about where to start.", score: 2 },
      { text: "Start with the easiest one.", score: 3 },
      { text: "Follow a planned order.", score: 4 },
      { text: "Delay studying altogether.", score: 1 },
    ],
  },
  {
    id: 8,
    question: "During lectures/classes, you…",
    options: [
      { text: "Listen actively and take notes.", score: 4 },
      { text: "Understand but don't write anything.", score: 3 },
      { text: "Get bored or distracted often.", score: 1 },
      { text: "Try listening but lose focus.", score: 2 },
    ],
  },
  {
    id: 9,
    question: "If you miss a class or lesson, you…",
    options: [
      { text: "Ignore the missed topic.", score: 1 },
      { text: "Ask a friend for notes.", score: 3 },
      { text: "Cover it immediately on your own.", score: 4 },
      { text: "Plan to study but delay it.", score: 2 },
    ],
  },
  {
    id: 10,
    question: "Your revision habit is…",
    options: [
      { text: "Hardly revise; only study once.", score: 1 },
      { text: "Revise only before exams.", score: 2 },
      { text: "Revise regularly on weekly basis.", score: 4 },
      { text: "Revise whenever you feel needed.", score: 3 },
    ],
  },
  {
    id: 11,
    question: "When you feel sleepy while studying, you…",
    options: [
      { text: "Sleep and drop studying fully.", score: 1 },
      { text: "Take a short break and continue.", score: 3 },
      { text: "Try switching subjects/methods.", score: 4 },
      { text: "Force yourself but don't learn much.", score: 2 },
    ],
  },
  {
    id: 12,
    question: "Group studying for you is…",
    options: [
      { text: "Mostly gossip and distraction.", score: 1 },
      { text: "Sometimes useful, sometimes not.", score: 3 },
      { text: "Very productive.", score: 4 },
      { text: "Stressful or confusing.", score: 2 },
    ],
  },
  {
    id: 13,
    question: "When you get a difficult assignment, you…",
    options: [
      { text: "Stress out and delay it.", score: 1 },
      { text: "Do it bit by bit.", score: 3 },
      { text: "Complete it calmly with planning.", score: 4 },
      { text: "Try but get irritated.", score: 2 },
    ],
  },
  {
    id: 14,
    question: "How often do you set academic goals (daily/weekly)?",
    options: [
      { text: "Never.", score: 1 },
      { text: "Sometimes.", score: 2 },
      { text: "Often.", score: 3 },
      { text: "Almost always with tracking.", score: 4 },
    ],
  },
  {
    id: 15,
    question: "How confident do you feel academically?",
    options: [
      { text: "Very confident and improving.", score: 4 },
      { text: "Sometimes confident, sometimes not.", score: 3 },
      { text: "Not confident most of the time.", score: 2 },
      { text: "Often feel you won't do well.", score: 1 },
    ],
  },
];
