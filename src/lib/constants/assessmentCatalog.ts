import type { QuizQuestion } from "../interfaces";

export type AssessmentDomain = "wellness" | "education" | "finance";
export type AssessmentIconKey =
  | "brain"
  | "apple"
  | "heart"
  | "flower"
  | "compass"
  | "briefcase"
  | "graduation"
  | "receipt"
  | "wallet";

export interface AssessmentCatalogItem {
  slug: string;
  domain: AssessmentDomain;
  title: string;
  subtitle: string;
  description: string;
  focus: string;
  iconKey: AssessmentIconKey;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  lightBg: string;
  benefits: string[];
  takeaways: string[];
  questions: QuizQuestion[];
}

export interface ScoreInterpretation {
  category: string;
  title: string;
  description: string;
  recommendation: string;
}

export const ASSESSMENT_DISCLAIMER =
  "This assessment is for self-reflection and educational purposes only. It is not a medical diagnosis, mental health evaluation, financial advice, legal advice, or a substitute for professional guidance.";

export const ASSESSMENTS: AssessmentCatalogItem[] = [
  {
    "slug": "anxiety-panic",
    "domain": "wellness",
    "title": "Anxiety and Panic Attack",
    "subtitle": "Anxiety patterns & coping",
    "description": "Reflect on anxiety-related feelings, body sensations, triggers, and coping patterns in daily situations.",
    "focus": "anxiety and panic-like feelings",
    "iconKey": "brain",
    "gradientFrom": "#4F46E5",
    "gradientTo": "#6366F1",
    "accentColor": "#818CF8",
    "lightBg": "#EEF2FF",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you experience anxiety in daily life?",
        "options": [
          {
            "text": "Often feel anxious",
            "score": 3
          },
          {
            "text": "Rarely feel anxious",
            "score": 1
          },
          {
            "text": "Almost always feel anxious",
            "score": 4
          },
          {
            "text": "Sometimes feel anxious",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You suddenly feel your heart racing and shortness of breath. What do you do?",
        "options": [
          {
            "text": "I feel panicked and find it hard to stay grounded",
            "score": 4
          },
          {
            "text": "I stay calm and practice breathing techniques",
            "score": 1
          },
          {
            "text": "I feel confused and don't know what to do",
            "score": 3
          },
          {
            "text": "I try to manage but feel uneasy",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You are in a stressful situation (exam/interview). What happens?",
        "options": [
          {
            "text": "I feel slightly anxious but manage",
            "score": 2
          },
          {
            "text": "I feel overwhelmed or panicked",
            "score": 4
          },
          {
            "text": "I handle it calmly",
            "score": 1
          },
          {
            "text": "I feel very anxious and distracted",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How well do you understand your anxiety triggers?",
        "options": [
          {
            "text": "I have no idea about triggers",
            "score": 4
          },
          {
            "text": "I clearly understand my triggers",
            "score": 1
          },
          {
            "text": "I feel confused about triggers",
            "score": 3
          },
          {
            "text": "I have some idea",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You notice intense panic-like feelings starting. What do you do?",
        "options": [
          {
            "text": "I try but struggle to control it",
            "score": 2
          },
          {
            "text": "I feel overwhelmed and find it hard to respond calmly",
            "score": 4
          },
          {
            "text": "I use coping techniques and calm myself",
            "score": 1
          },
          {
            "text": "I feel overwhelmed and scared",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You experience repeated anxious thoughts. What happens?",
        "options": [
          {
            "text": "I feel stuck in overthinking",
            "score": 3
          },
          {
            "text": "I manage thoughts effectively",
            "score": 1
          },
          {
            "text": "I feel completely trapped and distressed",
            "score": 4
          },
          {
            "text": "I try but they come back",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do physical symptoms occur?",
        "options": [
          {
            "text": "Occasionally",
            "score": 2
          },
          {
            "text": "Very frequently or intensely",
            "score": 4
          },
          {
            "text": "Never or very rarely",
            "score": 1
          },
          {
            "text": "Frequently",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You are in public and feel anxious. What do you do?",
        "options": [
          {
            "text": "I feel panicked and want to leave immediately",
            "score": 4
          },
          {
            "text": "I feel uncomfortable but manage",
            "score": 2
          },
          {
            "text": "I stay calm and continue",
            "score": 1
          },
          {
            "text": "I feel the urge to leave",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You avoid situations due to fear or anxiety. What happens?",
        "options": [
          {
            "text": "I always avoid",
            "score": 4
          },
          {
            "text": "I don't avoid situations",
            "score": 1
          },
          {
            "text": "I often avoid",
            "score": 3
          },
          {
            "text": "I avoid sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How well do you manage stress in your life?",
        "options": [
          {
            "text": "Poorly",
            "score": 3
          },
          {
            "text": "Very well",
            "score": 1
          },
          {
            "text": "Very poorly",
            "score": 4
          },
          {
            "text": "Moderately well",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You feel anxious without any clear reason. What do you do?",
        "options": [
          {
            "text": "I feel panicked and unsure how to cope",
            "score": 4
          },
          {
            "text": "I calm myself and move on",
            "score": 1
          },
          {
            "text": "I feel confused and worried",
            "score": 3
          },
          {
            "text": "I try but feel uneasy",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You try relaxation techniques. What happens?",
        "options": [
          {
            "text": "They don't help much",
            "score": 3
          },
          {
            "text": "They work effectively",
            "score": 1
          },
          {
            "text": "They don't work at all",
            "score": 4
          },
          {
            "text": "They help a little",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you seek help or talk about your anxiety?",
        "options": [
          {
            "text": "I rarely share",
            "score": 3
          },
          {
            "text": "I openly seek help when needed",
            "score": 1
          },
          {
            "text": "I never seek help",
            "score": 4
          },
          {
            "text": "I sometimes talk about it",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You think about future uncertainties. What happens?",
        "options": [
          {
            "text": "I feel intense fear or panic-like feelings",
            "score": 4
          },
          {
            "text": "I stay calm and realistic",
            "score": 1
          },
          {
            "text": "I overthink and feel anxious",
            "score": 3
          },
          {
            "text": "I feel slightly worried",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your mental state, what feels closest?",
        "options": [
          {
            "text": "I feel frequently anxious and stressed",
            "score": 3
          },
          {
            "text": "I feel calm and in control",
            "score": 1
          },
          {
            "text": "I feel overwhelmed with anxiety",
            "score": 4
          },
          {
            "text": "I feel slightly anxious but manageable",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "low-mood",
    "domain": "wellness",
    "title": "Depression",
    "subtitle": "Mood, energy & daily functioning",
    "description": "Reflect on recent mood, motivation, energy, connection, and hopefulness without treating the result as a diagnosis.",
    "focus": "low mood and daily functioning",
    "iconKey": "heart",
    "gradientFrom": "#7C3AED",
    "gradientTo": "#8B5CF6",
    "accentColor": "#A78BFA",
    "lightBg": "#F3E8FF",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "Over the past two weeks, how often have you felt low or sad without a clear reason?",
        "options": [
          {
            "text": "Often",
            "score": 3
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Almost every day",
            "score": 4
          },
          {
            "text": "Sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You wake up in the morning with no urgent tasks. How do you usually feel?",
        "options": [
          {
            "text": "I feel motivated to start my day",
            "score": 1
          },
          {
            "text": "I feel very low and want to stay in bed",
            "score": 4
          },
          {
            "text": "I feel slightly unmotivated but get up",
            "score": 2
          },
          {
            "text": "I feel tired and struggle to begin",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You planned to meet friends, but the time arrives. What do you do?",
        "options": [
          {
            "text": "I go and enjoy normally",
            "score": 1
          },
          {
            "text": "I feel low but still go",
            "score": 2
          },
          {
            "text": "I cancel because I don't feel like going",
            "score": 3
          },
          {
            "text": "I avoid and isolate myself completely",
            "score": 4
          }
        ]
      },
      {
        "id": 4,
        "question": "How interested are you in activities you usually enjoy?",
        "options": [
          {
            "text": "Moderately less interested",
            "score": 3
          },
          {
            "text": "Fully interested",
            "score": 1
          },
          {
            "text": "Not interested at all",
            "score": 4
          },
          {
            "text": "Slightly less interested",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You receive appreciation for your work. How do you feel?",
        "options": [
          {
            "text": "I feel no happiness",
            "score": 4
          },
          {
            "text": "I feel happy and proud",
            "score": 1
          },
          {
            "text": "I feel slightly happy",
            "score": 2
          },
          {
            "text": "I feel it doesn't matter much",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You have a small failure (like missing a deadline). What is your reaction?",
        "options": [
          {
            "text": "I move on easily",
            "score": 1
          },
          {
            "text": "I feel a bit upset but recover",
            "score": 2
          },
          {
            "text": "I overthink and feel stressed",
            "score": 3
          },
          {
            "text": "I feel deeply negative and blame myself",
            "score": 4
          }
        ]
      },
      {
        "id": 7,
        "question": "How is your energy level during the day?",
        "options": [
          {
            "text": "Slightly low",
            "score": 2
          },
          {
            "text": "Very low most of the time",
            "score": 4
          },
          {
            "text": "Normal",
            "score": 1
          },
          {
            "text": "Often tired",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You are sitting alone with free time. What usually happens?",
        "options": [
          {
            "text": "I enjoy the time peacefully",
            "score": 1
          },
          {
            "text": "I feel slightly bored or low",
            "score": 2
          },
          {
            "text": "I start overthinking negative thoughts",
            "score": 3
          },
          {
            "text": "I feel very low or empty",
            "score": 4
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: A close person doesn't respond to your message. What do you think?",
        "options": [
          {
            "text": "I assume they are busy",
            "score": 1
          },
          {
            "text": "I feel slightly concerned",
            "score": 2
          },
          {
            "text": "I overthink and feel ignored",
            "score": 3
          },
          {
            "text": "I feel rejected and very low",
            "score": 4
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you feel very self-critical or guilty without a strong reason?",
        "options": [
          {
            "text": "Sometimes",
            "score": 2
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Never",
            "score": 1
          },
          {
            "text": "Often",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You have to complete a simple daily task (like cleaning or replying to emails). What happens?",
        "options": [
          {
            "text": "I complete it easily",
            "score": 1
          },
          {
            "text": "I delay but eventually do it",
            "score": 2
          },
          {
            "text": "I struggle and feel burdened",
            "score": 3
          },
          {
            "text": "I avoid it completely",
            "score": 4
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You think about your future. What feeling comes up most strongly?",
        "options": [
          {
            "text": "I feel hopeful",
            "score": 1
          },
          {
            "text": "I feel slightly uncertain",
            "score": 2
          },
          {
            "text": "I feel negative",
            "score": 3
          },
          {
            "text": "I feel hopeless",
            "score": 4
          }
        ]
      },
      {
        "id": 13,
        "question": "How is your sleep pattern recently?",
        "options": [
          {
            "text": "Often disturbed",
            "score": 3
          },
          {
            "text": "Normal and restful",
            "score": 1
          },
          {
            "text": "Very highly disturbed",
            "score": 4
          },
          {
            "text": "Slightly disturbed",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You are in a social gathering. How do you usually feel?",
        "options": [
          {
            "text": "I feel comfortable and engaged",
            "score": 1
          },
          {
            "text": "I feel slightly withdrawn",
            "score": 2
          },
          {
            "text": "I feel disconnected",
            "score": 3
          },
          {
            "text": "I feel very uncomfortable and want to leave",
            "score": 4
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: You reflect on your life overall. Which thought matches you most?",
        "options": [
          {
            "text": "I feel positive and satisfied",
            "score": 1
          },
          {
            "text": "I feel okay but not very satisfied",
            "score": 2
          },
          {
            "text": "I often feel life lacks meaning",
            "score": 3
          },
          {
            "text": "I feel life feels hard to find meaning in",
            "score": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "repetitive-thoughts-behaviors",
    "domain": "wellness",
    "title": "OCD",
    "subtitle": "Repeated thoughts & routines",
    "description": "Reflect on unwanted repeated thoughts, checking, cleaning, ordering, and how much these patterns affect your day.",
    "focus": "repetitive thoughts and behaviors",
    "iconKey": "brain",
    "gradientFrom": "#0D9488",
    "gradientTo": "#14B8A6",
    "accentColor": "#2DD4BF",
    "lightBg": "#F0FDFA",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you experience repeated unwanted thoughts (e.g., doubts, fears)?",
        "options": [
          {
            "text": "Often",
            "score": 3
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You lock the door and leave home. What do you usually do next?",
        "options": [
          {
            "text": "I repeatedly go back even after checking",
            "score": 4
          },
          {
            "text": "I check once more just to be sure",
            "score": 2
          },
          {
            "text": "I trust it's locked and move on",
            "score": 1
          },
          {
            "text": "I feel unsure and check multiple times",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You touch something you feel might be dirty. What is your reaction?",
        "options": [
          {
            "text": "I feel anxious until I clean it",
            "score": 3
          },
          {
            "text": "I don't worry much",
            "score": 1
          },
          {
            "text": "I feel extreme discomfort and must clean immediately",
            "score": 4
          },
          {
            "text": "I feel slightly uncomfortable",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you feel the need to repeat certain actions (like washing, checking)?",
        "options": [
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Sometimes",
            "score": 2
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Often",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You arrange items (like books or clothes). What happens if they are disturbed?",
        "options": [
          {
            "text": "I feel uncomfortable and fix it",
            "score": 3
          },
          {
            "text": "I don't mind",
            "score": 1
          },
          {
            "text": "I feel very anxious until everything is perfectly arranged",
            "score": 4
          },
          {
            "text": "I notice but ignore it",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You have a thought that something bad might happen. How do you respond?",
        "options": [
          {
            "text": "I keep thinking about it",
            "score": 3
          },
          {
            "text": "I ignore it easily",
            "score": 1
          },
          {
            "text": "I feel intense fear and try to neutralize it",
            "score": 4
          },
          {
            "text": "I feel slightly worried",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How much time do repetitive thoughts or behaviors take in your day?",
        "options": [
          {
            "text": "A moderate amount",
            "score": 3
          },
          {
            "text": "Very little",
            "score": 1
          },
          {
            "text": "A significant amount",
            "score": 4
          },
          {
            "text": "Almost none",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You send an important message/email. What do you do afterward?",
        "options": [
          {
            "text": "I recheck multiple times",
            "score": 3
          },
          {
            "text": "I don't think about it again",
            "score": 1
          },
          {
            "text": "I feel compelled to repeatedly review it",
            "score": 4
          },
          {
            "text": "I check once for mistakes",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You are performing a daily routine (like getting ready). What happens if interrupted?",
        "options": [
          {
            "text": "I feel uneasy and restart parts of it",
            "score": 3
          },
          {
            "text": "I continue normally",
            "score": 1
          },
          {
            "text": "I feel strong discomfort and must restart fully",
            "score": 4
          },
          {
            "text": "I feel slightly annoyed",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you feel distress if things are not done in a specific way?",
        "options": [
          {
            "text": "Sometimes",
            "score": 2
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Often",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You think you may have made a mistake at work or study. What do you do?",
        "options": [
          {
            "text": "I double-check once",
            "score": 2
          },
          {
            "text": "I feel extreme anxiety and cannot relax until sure",
            "score": 4
          },
          {
            "text": "I move on without worry",
            "score": 1
          },
          {
            "text": "I repeatedly check and doubt myself",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You have a thought that feels inappropriate or disturbing. What is your reaction?",
        "options": [
          {
            "text": "I feel very distressed and try to suppress it",
            "score": 4
          },
          {
            "text": "I ignore it easily",
            "score": 1
          },
          {
            "text": "I keep thinking about it",
            "score": 3
          },
          {
            "text": "I feel slightly uncomfortable",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do these thoughts or behaviors interfere with your daily life?",
        "options": [
          {
            "text": "Frequently",
            "score": 3
          },
          {
            "text": "Never",
            "score": 1
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You are about to leave for an important event. What do you do before leaving?",
        "options": [
          {
            "text": "I check things once",
            "score": 2
          },
          {
            "text": "I feel stuck in repeated checking and delay leaving",
            "score": 4
          },
          {
            "text": "I leave without worry",
            "score": 1
          },
          {
            "text": "I check repeatedly",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: You try to resist a repetitive urge (like checking or cleaning). What happens?",
        "options": [
          {
            "text": "I struggle and give in sometimes",
            "score": 3
          },
          {
            "text": "I can resist easily",
            "score": 1
          },
          {
            "text": "I feel unable to resist and must act",
            "score": 4
          },
          {
            "text": "I resist with slight discomfort",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "relationship",
    "domain": "wellness",
    "title": "Couple Fights & Relationship Issues",
    "subtitle": "Conflict & communication",
    "description": "Reflect on disagreement patterns, emotional safety, communication, and repair in a close relationship.",
    "focus": "couple communication and conflict patterns",
    "iconKey": "heart",
    "gradientFrom": "#E11D48",
    "gradientTo": "#F43F5E",
    "accentColor": "#FB7185",
    "lightBg": "#FEF2F2",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do small disagreements turn into arguments between you and your partner?",
        "options": [
          {
            "text": "Rarely, we usually resolve things calmly without escalation",
            "score": 1
          },
          {
            "text": "Often, even small issues become arguments quickly",
            "score": 3
          },
          {
            "text": "Sometimes, depending on mood and situation",
            "score": 2
          },
          {
            "text": "Almost always, minor things frequently turn into serious conflicts",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: Your partner forgets something important (like a plan or promise). How do you react?",
        "options": [
          {
            "text": "I feel hurt and bring it up calmly to understand their side",
            "score": 2
          },
          {
            "text": "I react strongly and express frustration immediately",
            "score": 3
          },
          {
            "text": "I ignore it completely even if it bothers me internally",
            "score": 4
          },
          {
            "text": "I understand it could be a mistake and discuss it peacefully",
            "score": 1
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: During an argument, your partner raises their voice. What do you usually do?",
        "options": [
          {
            "text": "I try to stay calm and de-escalate the situation",
            "score": 1
          },
          {
            "text": "I also raise my voice and argue back strongly",
            "score": 4
          },
          {
            "text": "I feel uncomfortable and shut down without responding much",
            "score": 3
          },
          {
            "text": "I respond emotionally but try to control myself",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How comfortable are you in expressing your feelings to your partner?",
        "options": [
          {
            "text": "Very comfortable, I openly share my thoughts and emotions",
            "score": 1
          },
          {
            "text": "Slightly hesitant but I still try to communicate",
            "score": 2
          },
          {
            "text": "I find it difficult and often avoid expressing myself",
            "score": 3
          },
          {
            "text": "I rarely express and keep things bottled up",
            "score": 4
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: Your partner criticizes something about you. What is your usual reaction?",
        "options": [
          {
            "text": "I feel attacked and respond defensively or angrily",
            "score": 4
          },
          {
            "text": "I listen and try to understand their perspective calmly",
            "score": 1
          },
          {
            "text": "I feel hurt but discuss it later in a composed way",
            "score": 2
          },
          {
            "text": "I take it personally and keep thinking about it for long",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You both have different opinions on an important decision. What happens?",
        "options": [
          {
            "text": "We discuss and try to find a middle ground",
            "score": 1
          },
          {
            "text": "It turns into a heated argument most of the time",
            "score": 4
          },
          {
            "text": "We avoid the topic to prevent conflict",
            "score": 3
          },
          {
            "text": "We discuss but sometimes struggle to agree",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do past issues come up again in current arguments?",
        "options": [
          {
            "text": "Rarely, we focus on the present issue only",
            "score": 1
          },
          {
            "text": "Sometimes, especially during emotional moments",
            "score": 2
          },
          {
            "text": "Often, past issues are repeatedly brought up",
            "score": 3
          },
          {
            "text": "Almost always, old problems dominate new arguments",
            "score": 4
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: After a fight, how do you usually behave?",
        "options": [
          {
            "text": "I try to resolve things and communicate clearly",
            "score": 1
          },
          {
            "text": "I stay distant and avoid interaction for a while",
            "score": 3
          },
          {
            "text": "I expect my partner to come and fix things",
            "score": 4
          },
          {
            "text": "I take time to cool down and then talk",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: Your partner is upset but not expressing it clearly. What do you do?",
        "options": [
          {
            "text": "I ignore it and wait for them to speak first",
            "score": 3
          },
          {
            "text": "I gently ask and try to understand their feelings",
            "score": 1
          },
          {
            "text": "I assume things and react based on my assumptions",
            "score": 4
          },
          {
            "text": "I notice it but hesitate to bring it up",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do misunderstandings happen due to poor communication?",
        "options": [
          {
            "text": "Rarely, we communicate clearly",
            "score": 1
          },
          {
            "text": "Sometimes, but we resolve them",
            "score": 2
          },
          {
            "text": "Often, communication gaps create issues",
            "score": 3
          },
          {
            "text": "Very frequently, it causes major problems",
            "score": 4
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You feel your partner is not giving enough attention. What do you do?",
        "options": [
          {
            "text": "I calmly express my needs and expectations",
            "score": 1
          },
          {
            "text": "I feel upset and react emotionally",
            "score": 3
          },
          {
            "text": "I withdraw and stop expressing my feelings",
            "score": 4
          },
          {
            "text": "I hint indirectly but don't clearly communicate",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: During a disagreement, your partner tries to explain their side. What is your response?",
        "options": [
          {
            "text": "I listen carefully and try to understand",
            "score": 1
          },
          {
            "text": "I interrupt and focus on proving my point",
            "score": 4
          },
          {
            "text": "I listen but feel defensive internally",
            "score": 2
          },
          {
            "text": "I lose interest and disengage from the conversation",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you feel emotionally disconnected from your partner?",
        "options": [
          {
            "text": "Rarely, we feel connected most of the time",
            "score": 1
          },
          {
            "text": "Sometimes, depending on circumstances",
            "score": 2
          },
          {
            "text": "Often, I feel distant emotionally",
            "score": 3
          },
          {
            "text": "Almost always, the connection feels weak",
            "score": 4
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: A serious conflict happens between you both. What is your usual approach?",
        "options": [
          {
            "text": "I focus on solving the issue together calmly",
            "score": 1
          },
          {
            "text": "I get overwhelmed and react emotionally",
            "score": 3
          },
          {
            "text": "I avoid dealing with it directly",
            "score": 4
          },
          {
            "text": "I try to solve it but struggle to stay calm",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: You reflect on your relationship overall. What feels closest to your experience?",
        "options": [
          {
            "text": "We handle conflicts maturely and grow together",
            "score": 1
          },
          {
            "text": "We face some issues but try to improve",
            "score": 2
          },
          {
            "text": "Conflicts affect us often and create stress",
            "score": 3
          },
          {
            "text": "Conflicts are frequent and hard to resolve",
            "score": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "adhd",
    "domain": "wellness",
    "title": "ADHD",
    "subtitle": "Focus, organization & impulsivity",
    "description": "Reflect on focus, organization, restlessness, forgetfulness, and daily task patterns without using the result as a diagnosis.",
    "focus": "attention, focus, organization, and impulse patterns",
    "iconKey": "brain",
    "gradientFrom": "#4F46E5",
    "gradientTo": "#6366F1",
    "accentColor": "#818CF8",
    "lightBg": "#EEF2FF",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you find it difficult to stay focused on a task?",
        "options": [
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Often",
            "score": 3
          },
          {
            "text": "Sometimes",
            "score": 2
          },
          {
            "text": "Almost always",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You start an important task (study/work). What usually happens?",
        "options": [
          {
            "text": "I struggle a lot to continue and leave it unfinished",
            "score": 4
          },
          {
            "text": "I complete it with full focus",
            "score": 1
          },
          {
            "text": "I lose focus sometimes but finish it",
            "score": 2
          },
          {
            "text": "I get distracted quickly and switch tasks",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You are in a conversation. What is your usual behavior?",
        "options": [
          {
            "text": "I get distracted frequently",
            "score": 3
          },
          {
            "text": "I stay fully attentive",
            "score": 1
          },
          {
            "text": "I often miss important parts completely",
            "score": 4
          },
          {
            "text": "I lose track occasionally",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you forget daily tasks (appointments, chores)?",
        "options": [
          {
            "text": "Often",
            "score": 3
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You are given multiple tasks at once. What do you do?",
        "options": [
          {
            "text": "I feel extremely overwhelmed and avoid them",
            "score": 4
          },
          {
            "text": "I organize and complete them",
            "score": 1
          },
          {
            "text": "I struggle to manage and delay tasks",
            "score": 3
          },
          {
            "text": "I feel slightly overwhelmed",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You are working on something repetitive. What happens?",
        "options": [
          {
            "text": "I get distracted and lose focus",
            "score": 3
          },
          {
            "text": "I stay focused throughout",
            "score": 1
          },
          {
            "text": "I cannot continue and leave it",
            "score": 4
          },
          {
            "text": "I feel slightly bored but continue",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do you act impulsively without thinking?",
        "options": [
          {
            "text": "Sometimes",
            "score": 2
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Often",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You are waiting in a queue. What is your reaction?",
        "options": [
          {
            "text": "I feel extremely restless and frustrated",
            "score": 4
          },
          {
            "text": "I wait patiently",
            "score": 1
          },
          {
            "text": "I feel very impatient",
            "score": 3
          },
          {
            "text": "I feel slightly restless",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You are listening to instructions. What usually happens?",
        "options": [
          {
            "text": "I miss important parts",
            "score": 3
          },
          {
            "text": "I understand everything clearly",
            "score": 1
          },
          {
            "text": "I struggle to follow completely",
            "score": 4
          },
          {
            "text": "I miss small details",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you misplace items (keys, phone, wallet)?",
        "options": [
          {
            "text": "Sometimes",
            "score": 2
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Rarely",
            "score": 1
          },
          {
            "text": "Often",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You are working on a long task. What happens over time?",
        "options": [
          {
            "text": "I cannot continue for long",
            "score": 4
          },
          {
            "text": "I stay consistent",
            "score": 1
          },
          {
            "text": "I get distracted frequently",
            "score": 3
          },
          {
            "text": "I lose focus occasionally",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You have to sit still for a long time (meeting/class). What do you feel?",
        "options": [
          {
            "text": "Slightly restless",
            "score": 2
          },
          {
            "text": "Extremely uncomfortable and unable to sit",
            "score": 4
          },
          {
            "text": "Comfortable",
            "score": 1
          },
          {
            "text": "Very restless",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you interrupt others while they are speaking?",
        "options": [
          {
            "text": "Often",
            "score": 3
          },
          {
            "text": "Never",
            "score": 1
          },
          {
            "text": "Almost always",
            "score": 4
          },
          {
            "text": "Sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You plan your day. What usually happens?",
        "options": [
          {
            "text": "I struggle to follow it",
            "score": 3
          },
          {
            "text": "I follow the plan properly",
            "score": 1
          },
          {
            "text": "I don't follow it at all",
            "score": 4
          },
          {
            "text": "I miss a few things",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: You are doing something important, but distractions (phone, noise) are present. What happens?",
        "options": [
          {
            "text": "I get distracted often",
            "score": 3
          },
          {
            "text": "I stay focused",
            "score": 1
          },
          {
            "text": "I cannot focus at all",
            "score": 4
          },
          {
            "text": "I get distracted sometimes",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "family-communication",
    "domain": "wellness",
    "title": "Family Fights and Issues",
    "subtitle": "Family roles & boundaries",
    "description": "Reflect on family disagreements, expectations, boundaries, communication gaps, and emotional pressure.",
    "focus": "family communication and conflict patterns",
    "iconKey": "heart",
    "gradientFrom": "#EA580C",
    "gradientTo": "#F97316",
    "accentColor": "#FDBA74",
    "lightBg": "#FFF7ED",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do disagreements in your family arise due to differences in responsibilities (like household work, financial contribution, or expectations)?",
        "options": [
          {
            "text": "Rarely, roles and expectations are mostly clear",
            "score": 1
          },
          {
            "text": "Often, these issues create tension regularly",
            "score": 3
          },
          {
            "text": "Sometimes, depending on situations",
            "score": 2
          },
          {
            "text": "Almost always, these topics lead to repeated conflicts",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: A family member compares you with someone else (relative, sibling, or neighbor). What do you do?",
        "options": [
          {
            "text": "I feel deeply hurt and react strongly or argue",
            "score": 4
          },
          {
            "text": "I stay calm and express my feelings respectfully",
            "score": 1
          },
          {
            "text": "I feel uncomfortable but don't respond much",
            "score": 3
          },
          {
            "text": "I try to respond but feel emotionally affected",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: There is a disagreement about financial decisions in the family. How do you react?",
        "options": [
          {
            "text": "I try to understand all perspectives and discuss calmly",
            "score": 1
          },
          {
            "text": "I feel stressed and avoid getting involved",
            "score": 3
          },
          {
            "text": "I get emotional and argue strongly for my opinion",
            "score": 4
          },
          {
            "text": "I share my opinion but feel slightly uncomfortable",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do expectations from family (career, behavior, lifestyle) create pressure or conflict?",
        "options": [
          {
            "text": "Sometimes, but manageable",
            "score": 2
          },
          {
            "text": "Rarely, expectations are realistic",
            "score": 1
          },
          {
            "text": "Almost always, it leads to tension",
            "score": 4
          },
          {
            "text": "Often, it becomes a source of stress",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: A family member interferes in your personal decisions (career, relationships, etc.). What do you do?",
        "options": [
          {
            "text": "I feel frustrated and react strongly",
            "score": 3
          },
          {
            "text": "I calmly set boundaries and explain my choices",
            "score": 1
          },
          {
            "text": "I feel helpless and avoid confrontation",
            "score": 4
          },
          {
            "text": "I try to explain but feel emotionally affected",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: During a family gathering, a sensitive topic is brought up (past mistake or conflict). What is your response?",
        "options": [
          {
            "text": "I get defensive and react emotionally",
            "score": 4
          },
          {
            "text": "I handle it calmly and try to move the conversation forward",
            "score": 1
          },
          {
            "text": "I feel uncomfortable and stay quiet",
            "score": 3
          },
          {
            "text": "I respond but feel slightly uneasy",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do generational differences (values, thinking, lifestyle) lead to misunderstandings in your family?",
        "options": [
          {
            "text": "Rarely, we respect each other's views",
            "score": 1
          },
          {
            "text": "Sometimes, but we manage it",
            "score": 2
          },
          {
            "text": "Often, it creates tension",
            "score": 3
          },
          {
            "text": "Almost always, it causes repeated conflicts",
            "score": 4
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: A family member does not support your decision. What do you do?",
        "options": [
          {
            "text": "I try to convince them calmly with reasoning",
            "score": 1
          },
          {
            "text": "I feel hurt and withdraw emotionally",
            "score": 3
          },
          {
            "text": "I argue strongly to prove my point",
            "score": 4
          },
          {
            "text": "I explain but feel slightly discouraged",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You are blamed for something that wasn't fully your fault. How do you react?",
        "options": [
          {
            "text": "I calmly clarify the situation",
            "score": 1
          },
          {
            "text": "I feel upset and react emotionally",
            "score": 3
          },
          {
            "text": "I stay silent but feel hurt internally",
            "score": 4
          },
          {
            "text": "I try to explain but feel uncomfortable",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do communication gaps (not listening properly, assumptions) create conflicts in your family?",
        "options": [
          {
            "text": "Rarely, communication is clear",
            "score": 1
          },
          {
            "text": "Often, it leads to repeated issues",
            "score": 3
          },
          {
            "text": "Sometimes, but manageable",
            "score": 2
          },
          {
            "text": "Very frequently, it causes major conflicts",
            "score": 4
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: A family member ignores your opinion during a discussion. What do you do?",
        "options": [
          {
            "text": "I calmly express my point again",
            "score": 1
          },
          {
            "text": "I feel frustrated and react emotionally",
            "score": 3
          },
          {
            "text": "I stop participating and withdraw",
            "score": 4
          },
          {
            "text": "I try again but feel slightly discouraged",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: There is tension in the house, but no one is addressing it openly. What is your approach?",
        "options": [
          {
            "text": "I take initiative and try to talk it out calmly",
            "score": 1
          },
          {
            "text": "I feel uncomfortable and avoid the situation",
            "score": 3
          },
          {
            "text": "I get irritated and react impulsively",
            "score": 4
          },
          {
            "text": "I wait and hope things settle down on their own",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you feel that your views are not respected in family decisions?",
        "options": [
          {
            "text": "Rarely, I feel heard and respected",
            "score": 1
          },
          {
            "text": "Sometimes, but manageable",
            "score": 2
          },
          {
            "text": "Often, I feel ignored",
            "score": 3
          },
          {
            "text": "Almost always, I feel unheard",
            "score": 4
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: A serious misunderstanding happens between you and a family member. What do you do?",
        "options": [
          {
            "text": "I try to resolve it calmly and directly",
            "score": 1
          },
          {
            "text": "I feel overwhelmed and react emotionally",
            "score": 3
          },
          {
            "text": "I avoid discussing it and let it remain unresolved",
            "score": 4
          },
          {
            "text": "I try to resolve but struggle to stay calm",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you think about your family environment overall, what feels closest to your experience?",
        "options": [
          {
            "text": "It is supportive and understanding despite occasional issues",
            "score": 1
          },
          {
            "text": "It has some issues but we try to improve",
            "score": 2
          },
          {
            "text": "It is often stressful due to repeated conflicts",
            "score": 3
          },
          {
            "text": "It feels tense and conflicts are hard to resolve",
            "score": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "breakup-recovery",
    "domain": "wellness",
    "title": "Breakup Issues and Recovery",
    "subtitle": "Healing & emotional support",
    "description": "Reflect on memories, emotional triggers, support, hopefulness, and recovery after a relationship ending.",
    "focus": "breakup recovery and emotional adjustment",
    "iconKey": "heart",
    "gradientFrom": "#BE123C",
    "gradientTo": "#E11D48",
    "accentColor": "#FB7185",
    "lightBg": "#FFF1F2",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you think about your past relationship in your daily life?",
        "options": [
          {
            "text": "Often, it still comes to my mind frequently",
            "score": 3
          },
          {
            "text": "Rarely, I have mostly moved forward",
            "score": 1
          },
          {
            "text": "Almost always, it dominates my thinking",
            "score": 4
          },
          {
            "text": "Sometimes, but I can manage my thoughts",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You see something that reminds you of your ex (place, song, memory). What happens?",
        "options": [
          {
            "text": "I feel overwhelmed and get stuck in those memories",
            "score": 4
          },
          {
            "text": "I notice it but stay emotionally stable",
            "score": 1
          },
          {
            "text": "I feel slightly emotional but move on quickly",
            "score": 2
          },
          {
            "text": "I feel low and keep thinking about it for a while",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: Your ex reaches out or you see their update on social media. How do you react?",
        "options": [
          {
            "text": "I feel deeply affected and struggle to stay stable",
            "score": 4
          },
          {
            "text": "I stay calm and don't feel affected much",
            "score": 1
          },
          {
            "text": "I feel emotionally triggered and keep thinking about it",
            "score": 3
          },
          {
            "text": "I feel slightly disturbed but control my reaction",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you feel emotionally low because of the breakup?",
        "options": [
          {
            "text": "Often, it impacts my mood",
            "score": 3
          },
          {
            "text": "Rarely, I feel emotionally stable",
            "score": 1
          },
          {
            "text": "Almost always, it affects me deeply",
            "score": 4
          },
          {
            "text": "Sometimes, but I recover quickly",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You are alone with your thoughts at night. What usually happens?",
        "options": [
          {
            "text": "I feel slightly emotional but manage it",
            "score": 2
          },
          {
            "text": "I feel deeply upset and struggle to control my emotions",
            "score": 4
          },
          {
            "text": "I feel calm and don't think much about the past",
            "score": 1
          },
          {
            "text": "I start overthinking and feel low",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: Someone talks about relationships or love around you. What is your response?",
        "options": [
          {
            "text": "I feel strongly affected and emotionally disturbed",
            "score": 4
          },
          {
            "text": "I feel normal and engage in the conversation",
            "score": 1
          },
          {
            "text": "I feel uneasy and avoid the topic",
            "score": 3
          },
          {
            "text": "I feel slightly uncomfortable but manage",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do you blame yourself for the breakup?",
        "options": [
          {
            "text": "Often, I keep thinking about my mistakes",
            "score": 3
          },
          {
            "text": "Rarely, I have accepted things",
            "score": 1
          },
          {
            "text": "Almost always, I feel responsible and guilty",
            "score": 4
          },
          {
            "text": "Sometimes, but I try to stay balanced",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You see your ex happy or moving on. What do you feel?",
        "options": [
          {
            "text": "I feel hurt and keep thinking about it",
            "score": 3
          },
          {
            "text": "I accept it and focus on my own life",
            "score": 1
          },
          {
            "text": "I feel deeply upset and emotionally disturbed",
            "score": 4
          },
          {
            "text": "I feel slightly affected but stay composed",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You try to focus on your work or studies. What happens?",
        "options": [
          {
            "text": "I cannot focus at all because of emotional distress",
            "score": 4
          },
          {
            "text": "I stay focused without much distraction",
            "score": 1
          },
          {
            "text": "I struggle to concentrate due to thoughts",
            "score": 3
          },
          {
            "text": "I get distracted sometimes but manage",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you feel hopeful about your future (relationships or life)?",
        "options": [
          {
            "text": "Not hopeful at all",
            "score": 4
          },
          {
            "text": "Very hopeful and positive",
            "score": 1
          },
          {
            "text": "Often doubtful about the future",
            "score": 3
          },
          {
            "text": "Slightly hopeful but uncertain",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: Friends or family try to support you. What is your reaction?",
        "options": [
          {
            "text": "I feel disconnected and don't engage much",
            "score": 3
          },
          {
            "text": "I accept support and feel better",
            "score": 1
          },
          {
            "text": "I avoid support and isolate myself",
            "score": 4
          },
          {
            "text": "I listen but don't fully open up",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You think about starting something new (hobby, goal, or relationship). What do you feel?",
        "options": [
          {
            "text": "I feel unsure and lack motivation",
            "score": 3
          },
          {
            "text": "I feel motivated and open to new beginnings",
            "score": 1
          },
          {
            "text": "I feel completely unready and resistant",
            "score": 4
          },
          {
            "text": "I feel slightly hesitant but willing",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you check your ex's social media or updates?",
        "options": [
          {
            "text": "Often, even if it affects me",
            "score": 3
          },
          {
            "text": "Rarely or never",
            "score": 1
          },
          {
            "text": "Almost always, I feel compelled to check",
            "score": 4
          },
          {
            "text": "Sometimes out of curiosity",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You reflect on the breakup. What is your usual mindset?",
        "options": [
          {
            "text": "I feel deeply hurt and unable to move on",
            "score": 4
          },
          {
            "text": "I see it as a learning experience and growth",
            "score": 1
          },
          {
            "text": "I feel stuck in negative thoughts",
            "score": 3
          },
          {
            "text": "I feel mixed emotions but try to move forward",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you think about your current emotional state, what feels closest?",
        "options": [
          {
            "text": "I feel emotionally affected often",
            "score": 3
          },
          {
            "text": "I feel stable and mostly recovered",
            "score": 1
          },
          {
            "text": "I feel deeply affected and struggling",
            "score": 4
          },
          {
            "text": "I feel better but still healing",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "loneliness-connection",
    "domain": "wellness",
    "title": "Loneliness",
    "subtitle": "Belonging & social support",
    "description": "Reflect on social connection, belonging, support-seeking, and moments of isolation in daily life.",
    "focus": "loneliness, connection, and social support",
    "iconKey": "heart",
    "gradientFrom": "#2563EB",
    "gradientTo": "#3B82F6",
    "accentColor": "#93C5FD",
    "lightBg": "#EFF6FF",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you feel lonely even when you are around people?",
        "options": [
          {
            "text": "Sometimes, depending on the situation",
            "score": 2
          },
          {
            "text": "Almost always, I feel alone even in groups",
            "score": 4
          },
          {
            "text": "Rarely, I generally feel connected",
            "score": 1
          },
          {
            "text": "Often, I still feel disconnected from others",
            "score": 3
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You are in a group conversation, but no one directly involves you. What do you do?",
        "options": [
          {
            "text": "I try to join in and engage with others",
            "score": 1
          },
          {
            "text": "I feel disconnected and stop trying to engage",
            "score": 3
          },
          {
            "text": "I feel ignored and withdraw silently",
            "score": 4
          },
          {
            "text": "I feel slightly uncomfortable but stay present",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You have free time with no plans. How do you usually feel?",
        "options": [
          {
            "text": "I feel deeply empty and emotionally low",
            "score": 4
          },
          {
            "text": "I feel slightly bored but manage",
            "score": 2
          },
          {
            "text": "I enjoy my own company peacefully",
            "score": 1
          },
          {
            "text": "I feel lonely and wish for company",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you feel that no one truly understands you?",
        "options": [
          {
            "text": "Often, I feel misunderstood",
            "score": 3
          },
          {
            "text": "Rarely, I feel understood",
            "score": 1
          },
          {
            "text": "Almost always, I feel no one understands me",
            "score": 4
          },
          {
            "text": "Sometimes, but it doesn't affect me much",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You message or call someone and they don't respond. What is your reaction?",
        "options": [
          {
            "text": "I feel rejected and deeply affected",
            "score": 4
          },
          {
            "text": "I assume they are busy and don't overthink",
            "score": 1
          },
          {
            "text": "I feel hurt and keep thinking about it",
            "score": 3
          },
          {
            "text": "I feel slightly ignored but move on",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You see others enjoying time with friends or family. What do you feel?",
        "options": [
          {
            "text": "I feel slightly left out but manage",
            "score": 2
          },
          {
            "text": "I feel deeply isolated and emotionally affected",
            "score": 4
          },
          {
            "text": "I feel happy for them and content with myself",
            "score": 1
          },
          {
            "text": "I feel lonely and wish I had the same",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do you avoid social interactions even when you feel lonely?",
        "options": [
          {
            "text": "Often, I avoid even when I want connection",
            "score": 3
          },
          {
            "text": "Rarely, I try to connect with others",
            "score": 1
          },
          {
            "text": "Almost always, I isolate myself",
            "score": 4
          },
          {
            "text": "Sometimes, depending on my mood",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You attend a social gathering. What is your usual experience?",
        "options": [
          {
            "text": "I feel completely out of place and want to leave",
            "score": 4
          },
          {
            "text": "I feel comfortable and connect easily",
            "score": 1
          },
          {
            "text": "I feel slightly awkward but adjust",
            "score": 2
          },
          {
            "text": "I feel disconnected and struggle to engage",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You share something personal with someone. What happens next?",
        "options": [
          {
            "text": "I feel misunderstood or ignored",
            "score": 3
          },
          {
            "text": "I feel heard and understood",
            "score": 1
          },
          {
            "text": "I regret sharing and feel more alone",
            "score": 4
          },
          {
            "text": "I feel somewhat heard but not fully",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you feel emotionally distant from people close to you?",
        "options": [
          {
            "text": "Sometimes, but manageable",
            "score": 2
          },
          {
            "text": "Almost always, I feel disconnected",
            "score": 4
          },
          {
            "text": "Rarely, I feel emotionally connected",
            "score": 1
          },
          {
            "text": "Often, I feel distant",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You try to make plans with someone but they cancel. What do you feel?",
        "options": [
          {
            "text": "I feel hurt and think about it often",
            "score": 3
          },
          {
            "text": "I understand and don't take it personally",
            "score": 1
          },
          {
            "text": "I feel rejected and deeply upset",
            "score": 4
          },
          {
            "text": "I feel slightly disappointed but okay",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are scrolling social media and see others enjoying life. What happens?",
        "options": [
          {
            "text": "I feel lonely and compare myself",
            "score": 3
          },
          {
            "text": "I feel neutral and continue normally",
            "score": 1
          },
          {
            "text": "I feel deeply isolated and emotionally low",
            "score": 4
          },
          {
            "text": "I feel slightly left out",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you feel that you don't have someone you can truly rely on?",
        "options": [
          {
            "text": "Often, I feel I lack support",
            "score": 3
          },
          {
            "text": "Rarely, I have supportive people",
            "score": 1
          },
          {
            "text": "Almost always, I feel completely alone",
            "score": 4
          },
          {
            "text": "Sometimes, but I manage",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You spend a whole day without meaningful interaction. How do you feel?",
        "options": [
          {
            "text": "I feel slightly lonely but okay",
            "score": 2
          },
          {
            "text": "I feel deeply isolated and emotionally drained",
            "score": 4
          },
          {
            "text": "I feel fine and comfortable alone",
            "score": 1
          },
          {
            "text": "I feel noticeably lonely and low",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you think about your social and emotional life overall, what feels closest?",
        "options": [
          {
            "text": "I feel deeply lonely and disconnected most of the time",
            "score": 4
          },
          {
            "text": "I feel somewhat connected but not fully",
            "score": 2
          },
          {
            "text": "I feel connected and satisfied",
            "score": 1
          },
          {
            "text": "I often feel lonely despite some connections",
            "score": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "relationship-decision",
    "domain": "wellness",
    "title": "Decision on Divorce / Separation (Stay or Not)",
    "subtitle": "Safety, respect & clarity",
    "description": "Reflect on safety, respect, trust, communication, and the need for professional support when considering major relationship decisions.",
    "focus": "relationship safety, respect, and decision clarity",
    "iconKey": "heart",
    "gradientFrom": "#DB2777",
    "gradientTo": "#EC4899",
    "accentColor": "#F9A8D4",
    "lightBg": "#FDF2F8",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How would you describe the overall health of your relationship right now?",
        "options": [
          {
            "text": "It has issues but still has positive aspects",
            "score": 2
          },
          {
            "text": "It feels extremely unsafe, disrespectful, or emotionally harmful",
            "score": 4
          },
          {
            "text": "It feels stable with manageable issues",
            "score": 1
          },
          {
            "text": "It has frequent conflicts affecting peace",
            "score": 3
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You and your partner argue repeatedly over the same issue. What happens?",
        "options": [
          {
            "text": "We avoid discussing it to prevent conflict",
            "score": 2
          },
          {
            "text": "It turns into intense fights without resolution",
            "score": 4
          },
          {
            "text": "We try to resolve it calmly and work on it",
            "score": 1
          },
          {
            "text": "We argue often but sometimes manage to settle",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You feel emotionally neglected in your relationship. What is your experience?",
        "options": [
          {
            "text": "I feel hurt but still see some effort",
            "score": 3
          },
          {
            "text": "I rarely feel neglected and feel valued",
            "score": 1
          },
          {
            "text": "I feel completely ignored and disconnected",
            "score": 4
          },
          {
            "text": "I communicate and we try to improve things",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How safe and respected do you feel in your relationship?",
        "options": [
          {
            "text": "I feel disrespected frequently",
            "score": 3
          },
          {
            "text": "I feel fully respected and safe",
            "score": 1
          },
          {
            "text": "I feel unsafe or disrespected most of the time",
            "score": 4
          },
          {
            "text": "I feel mostly respected with minor issues",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: When serious problems arise, how do you both handle them?",
        "options": [
          {
            "text": "We try but struggle to find solutions",
            "score": 2
          },
          {
            "text": "Problems are ignored and never resolved",
            "score": 3
          },
          {
            "text": "We work together to solve them maturely",
            "score": 1
          },
          {
            "text": "It leads to intense emotional conflict",
            "score": 4
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You imagine your future with your partner. What do you feel?",
        "options": [
          {
            "text": "I feel negative and unhappy about the future",
            "score": 4
          },
          {
            "text": "I feel slightly doubtful but open",
            "score": 2
          },
          {
            "text": "I feel hopeful and positive",
            "score": 1
          },
          {
            "text": "I feel uncertain and confused",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do you feel emotionally drained because of this relationship?",
        "options": [
          {
            "text": "Often, it affects my mental state",
            "score": 3
          },
          {
            "text": "Rarely, I feel emotionally balanced",
            "score": 1
          },
          {
            "text": "Almost always, I feel exhausted",
            "score": 4
          },
          {
            "text": "Sometimes, but manageable",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: Your partner hurts you emotionally. What happens afterward?",
        "options": [
          {
            "text": "The issue repeats without improvement",
            "score": 3
          },
          {
            "text": "We talk and try to repair the issue",
            "score": 1
          },
          {
            "text": "I feel deeply hurt and nothing changes",
            "score": 4
          },
          {
            "text": "We try but resolution is partial",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You try to communicate your needs. What is your partner's response?",
        "options": [
          {
            "text": "They partially understand but struggle",
            "score": 2
          },
          {
            "text": "They ignore or dismiss my feelings",
            "score": 4
          },
          {
            "text": "They listen and try to understand",
            "score": 1
          },
          {
            "text": "They listen but don't act much",
            "score": 3
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you feel genuinely happy in this relationship?",
        "options": [
          {
            "text": "Often unhappy with occasional good moments",
            "score": 3
          },
          {
            "text": "Most of the time",
            "score": 1
          },
          {
            "text": "Rarely, happiness is missing",
            "score": 4
          },
          {
            "text": "Sometimes, but inconsistent",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You think about a major relationship decision. What thought comes first?",
        "options": [
          {
            "text": "It feels like the only way to find peace",
            "score": 4
          },
          {
            "text": "I consider it but still hesitate",
            "score": 2
          },
          {
            "text": "It feels unnecessary as things can improve",
            "score": 1
          },
          {
            "text": "I feel confused and unsure",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: Your partner makes an effort to improve. What is your reaction?",
        "options": [
          {
            "text": "I feel it's too late to fix things",
            "score": 4
          },
          {
            "text": "I feel slightly hopeful but cautious",
            "score": 2
          },
          {
            "text": "I appreciate it and feel hopeful",
            "score": 1
          },
          {
            "text": "I feel unsure if it will last",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How much trust exists in your relationship?",
        "options": [
          {
            "text": "Trust issues exist frequently",
            "score": 3
          },
          {
            "text": "Strong trust exists",
            "score": 1
          },
          {
            "text": "Trust is completely broken",
            "score": 4
          },
          {
            "text": "Trust is weak but not completely broken",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You think about different paths forward. What feels closer?",
        "options": [
          {
            "text": "I feel confused between both options",
            "score": 3
          },
          {
            "text": "A major change feels necessary for peace",
            "score": 4
          },
          {
            "text": "Staying feels right with effort",
            "score": 1
          },
          {
            "text": "I lean toward a major change but feel unsure",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect deeply, what conclusion feels closest?",
        "options": [
          {
            "text": "The relationship is struggling significantly",
            "score": 3
          },
          {
            "text": "The relationship is worth working on",
            "score": 1
          },
          {
            "text": "The relationship feels harmful and needs professional support",
            "score": 4
          },
          {
            "text": "The relationship has both hope and issues",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "stress-overthinking",
    "domain": "wellness",
    "title": "Stress / Overthinking",
    "subtitle": "Stress load & thought patterns",
    "description": "Reflect on stress load, repeated thoughts, sleep impact, decision pressure, and coping habits.",
    "focus": "stress and overthinking patterns",
    "iconKey": "brain",
    "gradientFrom": "#9333EA",
    "gradientTo": "#A855F7",
    "accentColor": "#D8B4FE",
    "lightBg": "#FAF5FF",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you find yourself overthinking small situations?",
        "options": [
          {
            "text": "Almost always, I can't stop thinking",
            "score": 4
          },
          {
            "text": "Sometimes, but I manage it",
            "score": 2
          },
          {
            "text": "Rarely, I can let things go easily",
            "score": 1
          },
          {
            "text": "Often, I keep thinking repeatedly",
            "score": 3
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You send an important message and don't get a reply. What happens?",
        "options": [
          {
            "text": "I stay calm and assume they are busy",
            "score": 1
          },
          {
            "text": "I feel anxious and keep checking repeatedly",
            "score": 4
          },
          {
            "text": "I think about it often and feel distracted",
            "score": 3
          },
          {
            "text": "I feel slightly uneasy but move on",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You have an upcoming important event. What is your mindset?",
        "options": [
          {
            "text": "I feel extremely stressed and overthink outcomes",
            "score": 4
          },
          {
            "text": "I feel calm and confident",
            "score": 1
          },
          {
            "text": "I feel worried and think about all possibilities",
            "score": 3
          },
          {
            "text": "I feel slightly stressed but stay prepared",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you replay past conversations or mistakes in your mind?",
        "options": [
          {
            "text": "Rarely, I move on quickly",
            "score": 1
          },
          {
            "text": "Frequently, I keep thinking about them",
            "score": 3
          },
          {
            "text": "Sometimes, but I control it",
            "score": 2
          },
          {
            "text": "Almost always, I get stuck in thoughts",
            "score": 4
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You make a small mistake at work/study. What do you do?",
        "options": [
          {
            "text": "I learn from it and move on",
            "score": 1
          },
          {
            "text": "I feel deeply stressed and keep overthinking it",
            "score": 4
          },
          {
            "text": "I feel slightly bothered but manage",
            "score": 2
          },
          {
            "text": "I think about it for some time",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You are trying to sleep at night. What usually happens?",
        "options": [
          {
            "text": "I overthink and take time to sleep",
            "score": 3
          },
          {
            "text": "I fall asleep peacefully",
            "score": 1
          },
          {
            "text": "I cannot sleep due to continuous thoughts",
            "score": 4
          },
          {
            "text": "I feel slightly restless but sleep eventually",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do you feel mentally exhausted due to overthinking?",
        "options": [
          {
            "text": "Sometimes, but manageable",
            "score": 2
          },
          {
            "text": "Almost always, I feel exhausted",
            "score": 4
          },
          {
            "text": "Rarely, I feel mentally relaxed",
            "score": 1
          },
          {
            "text": "Often, it drains my energy",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You face an uncertain situation (like waiting for results). What is your reaction?",
        "options": [
          {
            "text": "I feel extremely anxious and cannot relax",
            "score": 4
          },
          {
            "text": "I feel calm and accept uncertainty",
            "score": 1
          },
          {
            "text": "I feel stressed and keep thinking about it",
            "score": 3
          },
          {
            "text": "I feel slightly anxious but manage",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: Someone says something negative about you. What happens next?",
        "options": [
          {
            "text": "I keep overthinking and feel affected",
            "score": 3
          },
          {
            "text": "I ignore it and move on",
            "score": 1
          },
          {
            "text": "I feel deeply hurt and cannot stop thinking",
            "score": 4
          },
          {
            "text": "I think about it for some time",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you imagine worst-case scenarios?",
        "options": [
          {
            "text": "Sometimes, but I manage",
            "score": 2
          },
          {
            "text": "Almost always, I expect the worst",
            "score": 4
          },
          {
            "text": "Rarely, I stay realistic",
            "score": 1
          },
          {
            "text": "Often, I think negatively",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You have multiple tasks to complete. What is your experience?",
        "options": [
          {
            "text": "I feel extremely stressed and unable to focus",
            "score": 4
          },
          {
            "text": "I handle them calmly",
            "score": 1
          },
          {
            "text": "I feel overwhelmed and distracted",
            "score": 3
          },
          {
            "text": "I feel slightly stressed but manage",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are relaxing, but thoughts suddenly come. What do you do?",
        "options": [
          {
            "text": "I stay relaxed and ignore them",
            "score": 1
          },
          {
            "text": "I start thinking and lose relaxation",
            "score": 3
          },
          {
            "text": "I get completely consumed by thoughts",
            "score": 4
          },
          {
            "text": "I feel slightly distracted",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you find it difficult to focus because of overthinking?",
        "options": [
          {
            "text": "Often, it affects my focus",
            "score": 3
          },
          {
            "text": "Rarely, I stay focused",
            "score": 1
          },
          {
            "text": "Almost always, I cannot concentrate",
            "score": 4
          },
          {
            "text": "Sometimes, but manageable",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You are waiting for an important decision/result. What do you feel?",
        "options": [
          {
            "text": "I feel slightly anxious",
            "score": 2
          },
          {
            "text": "I feel extremely anxious and restless",
            "score": 4
          },
          {
            "text": "I stay calm and patient",
            "score": 1
          },
          {
            "text": "I feel stressed and think constantly",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your mental state, what feels closest?",
        "options": [
          {
            "text": "I feel frequently stressed and overthinking",
            "score": 3
          },
          {
            "text": "I feel calm and balanced",
            "score": 1
          },
          {
            "text": "I feel constantly overwhelmed",
            "score": 4
          },
          {
            "text": "I feel slightly stressed sometimes",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "diet",
    "domain": "wellness",
    "title": "Diet Habits and Lifestyle",
    "subtitle": "Food, routine & energy",
    "description": "Reflect on meals, hydration, cravings, activity, sleep, and routine patterns that shape everyday wellness.",
    "focus": "eating habits and lifestyle routines",
    "iconKey": "apple",
    "gradientFrom": "#059669",
    "gradientTo": "#10B981",
    "accentColor": "#34D399",
    "lightBg": "#ECFDF5",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How would you describe your daily eating pattern?",
        "options": [
          {
            "text": "I eat balanced meals with proper nutrition",
            "score": 1
          },
          {
            "text": "I eat irregularly and often skip meals",
            "score": 4
          },
          {
            "text": "I eat somewhat balanced but inconsistent meals",
            "score": 3
          },
          {
            "text": "I eat regularly but sometimes miss nutrition balance",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You feel hungry between meals. What do you usually choose?",
        "options": [
          {
            "text": "I eat fruits or healthy snacks",
            "score": 1
          },
          {
            "text": "I go for junk food like chips or fast food",
            "score": 4
          },
          {
            "text": "I sometimes choose healthy, sometimes unhealthy",
            "score": 3
          },
          {
            "text": "I eat whatever is easily available",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You are busy with work/study. How do you manage meals?",
        "options": [
          {
            "text": "I skip meals or delay eating",
            "score": 4
          },
          {
            "text": "I manage to eat on time with proper planning",
            "score": 1
          },
          {
            "text": "I eat but not always on time",
            "score": 2
          },
          {
            "text": "I eat quickly without focusing on quality",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you consume junk or processed food?",
        "options": [
          {
            "text": "Very frequently, almost daily",
            "score": 4
          },
          {
            "text": "Rarely, I avoid it mostly",
            "score": 1
          },
          {
            "text": "Occasionally, a few times a week",
            "score": 3
          },
          {
            "text": "Sometimes, but not regularly",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You feel stressed or emotional. What is your eating behavior?",
        "options": [
          {
            "text": "I overeat or eat unhealthy comfort food",
            "score": 4
          },
          {
            "text": "I maintain control and eat normally",
            "score": 1
          },
          {
            "text": "I eat slightly more than usual",
            "score": 2
          },
          {
            "text": "I lose control sometimes and eat poorly",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You attend a party or outing. What do you choose?",
        "options": [
          {
            "text": "I overeat unhealthy food without control",
            "score": 4
          },
          {
            "text": "I balance enjoyment with healthy choices",
            "score": 2
          },
          {
            "text": "I choose mostly healthy options",
            "score": 1
          },
          {
            "text": "I eat more unhealthy than usual",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How often do you drink enough water daily?",
        "options": [
          {
            "text": "I drink very little water",
            "score": 4
          },
          {
            "text": "I drink adequate water consistently",
            "score": 1
          },
          {
            "text": "I drink water but not regularly",
            "score": 2
          },
          {
            "text": "I sometimes forget and drink less",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You plan your meals for the day. What usually happens?",
        "options": [
          {
            "text": "I don't plan and eat randomly",
            "score": 4
          },
          {
            "text": "I plan and follow a balanced diet",
            "score": 1
          },
          {
            "text": "I plan but don't always follow it",
            "score": 3
          },
          {
            "text": "I try to plan but inconsistently",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You feel full but food is still left. What do you do?",
        "options": [
          {
            "text": "I stop eating and save it for later",
            "score": 1
          },
          {
            "text": "I continue eating out of habit",
            "score": 3
          },
          {
            "text": "I force myself to finish everything",
            "score": 4
          },
          {
            "text": "I eat a little more even if not hungry",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you include fruits and vegetables in your meals?",
        "options": [
          {
            "text": "Rarely, almost none",
            "score": 4
          },
          {
            "text": "Daily in good quantity",
            "score": 1
          },
          {
            "text": "Occasionally, not regularly",
            "score": 3
          },
          {
            "text": "Sometimes, but not enough",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You are craving something unhealthy. What do you do?",
        "options": [
          {
            "text": "I give in immediately",
            "score": 4
          },
          {
            "text": "I control and choose a healthier option",
            "score": 1
          },
          {
            "text": "I sometimes control, sometimes give in",
            "score": 3
          },
          {
            "text": "I try to resist but often fail",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You eat while watching TV or using your phone. What happens?",
        "options": [
          {
            "text": "I overeat without realizing",
            "score": 4
          },
          {
            "text": "I eat mindfully without distractions",
            "score": 1
          },
          {
            "text": "I eat slightly more than needed",
            "score": 2
          },
          {
            "text": "I lose track of how much I eat",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you feel your diet affects your energy levels?",
        "options": [
          {
            "text": "I feel low energy frequently",
            "score": 4
          },
          {
            "text": "I feel energetic most of the time",
            "score": 1
          },
          {
            "text": "I feel inconsistent energy levels",
            "score": 3
          },
          {
            "text": "I feel slightly low sometimes",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You decide to improve your diet. What happens?",
        "options": [
          {
            "text": "I stick to it consistently",
            "score": 1
          },
          {
            "text": "I start but give up quickly",
            "score": 4
          },
          {
            "text": "I try but struggle to maintain",
            "score": 3
          },
          {
            "text": "I follow it partially",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your eating habits overall, what feels closest?",
        "options": [
          {
            "text": "My diet is healthy and well-balanced",
            "score": 1
          },
          {
            "text": "My diet is mostly unhealthy",
            "score": 4
          },
          {
            "text": "My diet has both good and bad habits",
            "score": 3
          },
          {
            "text": "My diet is somewhat healthy but needs improvement",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "yoga",
    "domain": "wellness",
    "title": "Yoga Practice and Lifestyle",
    "subtitle": "Movement, breath & mindfulness",
    "description": "Reflect on stretching, breath awareness, posture, relaxation, meditation, and mind-body connection.",
    "focus": "yoga practice and mind-body awareness",
    "iconKey": "flower",
    "gradientFrom": "#0D9488",
    "gradientTo": "#14B8A6",
    "accentColor": "#2DD4BF",
    "lightBg": "#F0FDFA",
    "benefits": [
      "Notice patterns in your thoughts, feelings, habits, and relationships.",
      "Identify areas where extra support or reflection may help.",
      "Use non-judgmental insights to prepare for a counseling conversation.",
      "Receive supportive next steps without diagnosis or labels."
    ],
    "takeaways": [
      "A private self-reflection summary",
      "Supportive score interpretation",
      "Counseling-oriented guidance",
      "A reminder that this is not a medical diagnosis"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you practice yoga in your routine?",
        "options": [
          {
            "text": "Occasionally, not very regular",
            "score": 3
          },
          {
            "text": "Daily with consistency and discipline",
            "score": 1
          },
          {
            "text": "Rarely or almost never",
            "score": 4
          },
          {
            "text": "A few times a week but not consistent",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You wake up in the morning. What is your approach to yoga?",
        "options": [
          {
            "text": "I skip it most days",
            "score": 4
          },
          {
            "text": "I do it sometimes depending on mood",
            "score": 2
          },
          {
            "text": "I follow my yoga routine regularly",
            "score": 1
          },
          {
            "text": "I think about doing it but rarely act",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You feel stressed after a long day. What do you do?",
        "options": [
          {
            "text": "I try light stretching or relaxation sometimes",
            "score": 2
          },
          {
            "text": "I ignore it and stay stressed",
            "score": 4
          },
          {
            "text": "I practice yoga or breathing exercises to relax",
            "score": 1
          },
          {
            "text": "I think about yoga but don't do it",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How aware are you of proper yoga techniques and postures?",
        "options": [
          {
            "text": "I know a little but not enough",
            "score": 3
          },
          {
            "text": "I have good knowledge and practice correctly",
            "score": 1
          },
          {
            "text": "I have no knowledge at all",
            "score": 4
          },
          {
            "text": "I know basic techniques",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You have limited time in your day. What happens to your yoga practice?",
        "options": [
          {
            "text": "I postpone it frequently",
            "score": 3
          },
          {
            "text": "I still make time and adjust my schedule",
            "score": 1
          },
          {
            "text": "I completely skip it",
            "score": 4
          },
          {
            "text": "I reduce time but still try a little",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You experience body stiffness or fatigue. What is your reaction?",
        "options": [
          {
            "text": "I ignore it and do nothing",
            "score": 4
          },
          {
            "text": "I stretch sometimes but not regularly",
            "score": 2
          },
          {
            "text": "I practice yoga to improve flexibility",
            "score": 1
          },
          {
            "text": "I feel it but don't take action",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How consistent is your breathing awareness (pranayama)?",
        "options": [
          {
            "text": "I rarely focus on it",
            "score": 3
          },
          {
            "text": "I practice regularly with focus",
            "score": 1
          },
          {
            "text": "I never pay attention to breathing",
            "score": 4
          },
          {
            "text": "I try occasionally",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You join a yoga session or class. What is your involvement?",
        "options": [
          {
            "text": "I actively participate and follow instructions",
            "score": 1
          },
          {
            "text": "I participate but lose focus often",
            "score": 3
          },
          {
            "text": "I feel disconnected and uninterested",
            "score": 4
          },
          {
            "text": "I try to follow but with limited attention",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You miss your yoga practice for a few days. What happens next?",
        "options": [
          {
            "text": "I delay restarting and lose routine",
            "score": 3
          },
          {
            "text": "I restart immediately with discipline",
            "score": 1
          },
          {
            "text": "I stop completely for long periods",
            "score": 4
          },
          {
            "text": "I try to get back slowly",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How do you feel after practicing yoga?",
        "options": [
          {
            "text": "I don't feel any difference",
            "score": 4
          },
          {
            "text": "I feel refreshed, calm, and energized",
            "score": 1
          },
          {
            "text": "I feel some improvement but not always",
            "score": 3
          },
          {
            "text": "I feel slightly better",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You are learning a new yoga posture. What is your approach?",
        "options": [
          {
            "text": "I attempt but without full effort",
            "score": 2
          },
          {
            "text": "I give up quickly if it feels difficult",
            "score": 4
          },
          {
            "text": "I practice patiently and improve gradually",
            "score": 1
          },
          {
            "text": "I try but feel inconsistent",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You feel mentally distracted during yoga. What do you do?",
        "options": [
          {
            "text": "I stop and lose interest",
            "score": 4
          },
          {
            "text": "I refocus and continue mindfully",
            "score": 1
          },
          {
            "text": "I continue but without concentration",
            "score": 3
          },
          {
            "text": "I try to focus but struggle",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How much has yoga improved your physical health?",
        "options": [
          {
            "text": "Slight improvement",
            "score": 2
          },
          {
            "text": "No noticeable improvement",
            "score": 4
          },
          {
            "text": "Significantly improved flexibility and strength",
            "score": 1
          },
          {
            "text": "Some improvement but inconsistent",
            "score": 3
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You plan to make yoga a habit. What happens?",
        "options": [
          {
            "text": "I fail to maintain it completely",
            "score": 4
          },
          {
            "text": "I stay consistent and committed",
            "score": 1
          },
          {
            "text": "I follow it partially",
            "score": 2
          },
          {
            "text": "I try but struggle with consistency",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your overall yoga lifestyle, what feels closest?",
        "options": [
          {
            "text": "I have no proper yoga routine",
            "score": 4
          },
          {
            "text": "I maintain a disciplined and balanced practice",
            "score": 1
          },
          {
            "text": "I practice sometimes but need improvement",
            "score": 2
          },
          {
            "text": "I have an irregular and inconsistent practice",
            "score": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "path-finder",
    "domain": "education",
    "title": "Challenges in Finding the Right Career Path",
    "subtitle": "Direction & self-awareness",
    "description": "Reflect on career direction, confidence, strengths, decision-making, and readiness to seek guidance.",
    "focus": "career path clarity and self-awareness",
    "iconKey": "compass",
    "gradientFrom": "#7C3AED",
    "gradientTo": "#8B5CF6",
    "accentColor": "#A78BFA",
    "lightBg": "#F3E8FF",
    "benefits": [
      "Understand your current learning, planning, and growth patterns.",
      "Identify areas where structure, mentoring, or counseling may help.",
      "Reflect on strengths and obstacles without judgment.",
      "Receive practical next steps for guided improvement."
    ],
    "takeaways": [
      "A private learning reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational and non-diagnostic"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How clear are you about your career goals?",
        "options": [
          {
            "text": "I feel completely confused with no clarity",
            "score": 4
          },
          {
            "text": "I have slight clarity but still exploring",
            "score": 2
          },
          {
            "text": "I have a clear and well-defined career direction",
            "score": 1
          },
          {
            "text": "I have some idea but not fully clear",
            "score": 3
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You are asked what career you want to pursue. What is your response?",
        "options": [
          {
            "text": "I feel confused and unable to answer",
            "score": 4
          },
          {
            "text": "I confidently explain my career choice",
            "score": 1
          },
          {
            "text": "I respond but with some hesitation",
            "score": 2
          },
          {
            "text": "I give a general answer but feel unsure",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You see others progressing in their careers. What do you feel?",
        "options": [
          {
            "text": "I feel confused and question my direction",
            "score": 3
          },
          {
            "text": "I feel motivated and focused on my path",
            "score": 1
          },
          {
            "text": "I feel stressed and compare myself constantly",
            "score": 4
          },
          {
            "text": "I feel slightly pressured but manage",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you change your career interests?",
        "options": [
          {
            "text": "Occasionally, but I try to stay stable",
            "score": 2
          },
          {
            "text": "Very frequently, I keep changing directions",
            "score": 4
          },
          {
            "text": "Rarely, I stay consistent with my goals",
            "score": 1
          },
          {
            "text": "Sometimes, I get influenced and shift focus",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You need to choose between passion and a stable career. What happens?",
        "options": [
          {
            "text": "I feel completely stuck and unable to decide",
            "score": 4
          },
          {
            "text": "I try to balance but feel uncertain",
            "score": 2
          },
          {
            "text": "I clearly evaluate and make a balanced decision",
            "score": 1
          },
          {
            "text": "I feel confused and delay the decision",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You start learning a skill for your career. What usually happens?",
        "options": [
          {
            "text": "I lose interest and quit quickly",
            "score": 4
          },
          {
            "text": "I stay consistent and complete it",
            "score": 1
          },
          {
            "text": "I try but struggle with discipline",
            "score": 2
          },
          {
            "text": "I continue but inconsistently",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in your career decisions?",
        "options": [
          {
            "text": "Somewhat confident but unsure at times",
            "score": 2
          },
          {
            "text": "Not confident at all",
            "score": 4
          },
          {
            "text": "Very confident and self-assured",
            "score": 1
          },
          {
            "text": "Slightly confident but doubtful",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You receive advice from others about your career. What do you do?",
        "options": [
          {
            "text": "I get influenced easily and change decisions",
            "score": 3
          },
          {
            "text": "I evaluate and take useful advice",
            "score": 1
          },
          {
            "text": "I feel overwhelmed and more confused",
            "score": 4
          },
          {
            "text": "I listen but feel unsure what to follow",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You face failure in a career-related attempt. What is your reaction?",
        "options": [
          {
            "text": "I feel discouraged and stop trying",
            "score": 4
          },
          {
            "text": "I learn and try again with improvement",
            "score": 1
          },
          {
            "text": "I try again but with hesitation",
            "score": 2
          },
          {
            "text": "I feel confused and lose direction",
            "score": 3
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you feel pressured by family or society regarding career choices?",
        "options": [
          {
            "text": "Sometimes, it creates confusion",
            "score": 3
          },
          {
            "text": "Rarely, I follow my own path",
            "score": 1
          },
          {
            "text": "Very frequently, it affects my decisions",
            "score": 4
          },
          {
            "text": "Occasionally, but manageable",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You have multiple career options. What do you do?",
        "options": [
          {
            "text": "I feel stuck and unable to decide",
            "score": 4
          },
          {
            "text": "I analyze and choose logically",
            "score": 1
          },
          {
            "text": "I choose but feel uncertain",
            "score": 2
          },
          {
            "text": "I keep switching between options",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You think about your future career growth. What do you feel?",
        "options": [
          {
            "text": "I feel lost and unsure about the future",
            "score": 4
          },
          {
            "text": "I feel clear and positive about growth",
            "score": 1
          },
          {
            "text": "I feel doubtful and confused",
            "score": 3
          },
          {
            "text": "I feel slightly unsure but hopeful",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you take action toward your career goals?",
        "options": [
          {
            "text": "Rarely, I procrastinate most of the time",
            "score": 4
          },
          {
            "text": "Consistently and with discipline",
            "score": 1
          },
          {
            "text": "I try but struggle to stay consistent",
            "score": 2
          },
          {
            "text": "Sometimes, but not regularly",
            "score": 3
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your progress with others. What happens?",
        "options": [
          {
            "text": "I feel slightly affected but manage",
            "score": 2
          },
          {
            "text": "I feel demotivated and stressed",
            "score": 4
          },
          {
            "text": "I stay focused on my own journey",
            "score": 1
          },
          {
            "text": "I feel pressured and distracted",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your career journey, what feels closest?",
        "options": [
          {
            "text": "I feel completely lost and directionless",
            "score": 4
          },
          {
            "text": "I feel somewhat clear but need guidance",
            "score": 2
          },
          {
            "text": "I am on the right path with clarity",
            "score": 1
          },
          {
            "text": "I feel uncertain and confused",
            "score": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "academic",
    "domain": "education",
    "title": "Academic",
    "subtitle": "Study habits & learning confidence",
    "description": "Reflect on focus, study consistency, revision, assignments, classroom engagement, and academic confidence.",
    "focus": "academic habits and learning confidence",
    "iconKey": "graduation",
    "gradientFrom": "#0891B2",
    "gradientTo": "#06B6D4",
    "accentColor": "#22D3EE",
    "lightBg": "#ECFEFF",
    "benefits": [
      "Understand your current learning, planning, and growth patterns.",
      "Identify areas where structure, mentoring, or counseling may help.",
      "Reflect on strengths and obstacles without judgment.",
      "Receive practical next steps for guided improvement."
    ],
    "takeaways": [
      "A private learning reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational and non-diagnostic"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How well do you understand your academic goals?",
        "options": [
          {
            "text": "I am very clear and focused on my goals",
            "score": 1
          },
          {
            "text": "I have some idea but not fully clear",
            "score": 3
          },
          {
            "text": "I am slightly aware but often confused",
            "score": 2
          },
          {
            "text": "I have no clarity about my goals",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You are given a new topic to study. What do you usually do?",
        "options": [
          {
            "text": "I feel confused and don't know where to start",
            "score": 4
          },
          {
            "text": "I plan and start studying with proper strategy",
            "score": 1
          },
          {
            "text": "I start but without proper planning",
            "score": 2
          },
          {
            "text": "I delay and keep postponing it",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: Exams are approaching. How do you feel?",
        "options": [
          {
            "text": "Confident because I prepared consistently",
            "score": 1
          },
          {
            "text": "Slightly stressed but manageable",
            "score": 2
          },
          {
            "text": "Very stressed and underprepared",
            "score": 4
          },
          {
            "text": "Confused about what to study first",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you follow a study schedule?",
        "options": [
          {
            "text": "Always follow a proper schedule",
            "score": 1
          },
          {
            "text": "Sometimes follow it",
            "score": 3
          },
          {
            "text": "Rarely follow it",
            "score": 2
          },
          {
            "text": "Never follow any schedule",
            "score": 4
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You don't understand a topic in class. What do you do?",
        "options": [
          {
            "text": "Ignore it and move on",
            "score": 4
          },
          {
            "text": "Ask questions or seek help immediately",
            "score": 1
          },
          {
            "text": "Try to understand later on your own",
            "score": 2
          },
          {
            "text": "Feel confused and leave it incomplete",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You start studying but get distracted. What happens?",
        "options": [
          {
            "text": "I lose focus completely and stop studying",
            "score": 4
          },
          {
            "text": "I manage distractions and continue studying",
            "score": 1
          },
          {
            "text": "I get distracted but return after some time",
            "score": 2
          },
          {
            "text": "I keep switching between tasks",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in your academic performance?",
        "options": [
          {
            "text": "Very confident and satisfied",
            "score": 1
          },
          {
            "text": "Somewhat confident but unsure",
            "score": 2
          },
          {
            "text": "Slightly doubtful about my performance",
            "score": 3
          },
          {
            "text": "Not confident at all",
            "score": 4
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You receive low marks in a test. What is your reaction?",
        "options": [
          {
            "text": "I feel discouraged and stop trying",
            "score": 4
          },
          {
            "text": "I analyze mistakes and improve",
            "score": 1
          },
          {
            "text": "I try again but without clear strategy",
            "score": 2
          },
          {
            "text": "I feel confused about how to improve",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You have multiple subjects to study. What do you do?",
        "options": [
          {
            "text": "I feel overwhelmed and don't start",
            "score": 4
          },
          {
            "text": "I prioritize and manage time effectively",
            "score": 1
          },
          {
            "text": "I study randomly without planning",
            "score": 3
          },
          {
            "text": "I try to manage but struggle",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you revise what you study?",
        "options": [
          {
            "text": "Regularly revise all topics",
            "score": 1
          },
          {
            "text": "Sometimes revise",
            "score": 2
          },
          {
            "text": "Rarely revise",
            "score": 3
          },
          {
            "text": "Never revise",
            "score": 4
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You see your classmates performing better. What do you feel?",
        "options": [
          {
            "text": "Motivated to improve",
            "score": 1
          },
          {
            "text": "Slightly pressured but manage",
            "score": 2
          },
          {
            "text": "Stressed and compare constantly",
            "score": 4
          },
          {
            "text": "Confused about my own progress",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are given a difficult assignment. What do you do?",
        "options": [
          {
            "text": "I avoid it or delay",
            "score": 4
          },
          {
            "text": "I break it into parts and complete it",
            "score": 1
          },
          {
            "text": "I try but feel stuck often",
            "score": 2
          },
          {
            "text": "I start but don't complete properly",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How consistent are you in your studies?",
        "options": [
          {
            "text": "Very consistent and disciplined",
            "score": 1
          },
          {
            "text": "Somewhat consistent",
            "score": 2
          },
          {
            "text": "Inconsistent most of the time",
            "score": 3
          },
          {
            "text": "Not consistent at all",
            "score": 4
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your study progress with others. What happens?",
        "options": [
          {
            "text": "I stay focused on my own progress",
            "score": 1
          },
          {
            "text": "I feel slightly affected",
            "score": 2
          },
          {
            "text": "I feel distracted and pressured",
            "score": 3
          },
          {
            "text": "I feel demotivated and stressed",
            "score": 4
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your academic journey, what feels closest?",
        "options": [
          {
            "text": "I am on the right track with clarity",
            "score": 1
          },
          {
            "text": "I am somewhat clear but need improvement",
            "score": 2
          },
          {
            "text": "I feel confused and inconsistent",
            "score": 3
          },
          {
            "text": "I feel completely lost academically",
            "score": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "achiever-guidance",
    "domain": "education",
    "title": "Role of Achievers in Guiding Aspirants",
    "subtitle": "Mentorship & learning from others",
    "description": "Reflect on how you seek, receive, and apply guidance from experienced people while pursuing goals.",
    "focus": "guidance readiness and mentorship support",
    "iconKey": "graduation",
    "gradientFrom": "#CA8A04",
    "gradientTo": "#EAB308",
    "accentColor": "#FDE047",
    "lightBg": "#FEFCE8",
    "benefits": [
      "Understand your current learning, planning, and growth patterns.",
      "Identify areas where structure, mentoring, or counseling may help.",
      "Reflect on strengths and obstacles without judgment.",
      "Receive practical next steps for guided improvement."
    ],
    "takeaways": [
      "A private learning reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational and non-diagnostic"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How often do you seek guidance from achievers (people who cleared competitive exams)?",
        "options": [
          {
            "text": "I regularly follow and learn from them",
            "score": 1
          },
          {
            "text": "I sometimes try but not consistently",
            "score": 2
          },
          {
            "text": "I rarely seek their guidance",
            "score": 3
          },
          {
            "text": "I never consider their guidance",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You watch a topper's strategy video. What do you do next?",
        "options": [
          {
            "text": "I feel motivated but don't apply anything",
            "score": 3
          },
          {
            "text": "I apply their strategy in a structured way",
            "score": 1
          },
          {
            "text": "I feel confused due to too many ideas",
            "score": 4
          },
          {
            "text": "I try to apply but inconsistently",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: An achiever shares their study plan. How do you respond?",
        "options": [
          {
            "text": "I copy it completely without thinking",
            "score": 3
          },
          {
            "text": "I analyze and adapt it to my needs",
            "score": 1
          },
          {
            "text": "I feel overwhelmed and ignore it",
            "score": 4
          },
          {
            "text": "I partially follow it with doubts",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How much do achievers influence your study approach?",
        "options": [
          {
            "text": "Positively and in a balanced way",
            "score": 1
          },
          {
            "text": "Slightly influence my approach",
            "score": 2
          },
          {
            "text": "Influence me but create confusion",
            "score": 3
          },
          {
            "text": "Over-influence me and distract me",
            "score": 4
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You compare your preparation with a topper. What happens?",
        "options": [
          {
            "text": "I feel motivated to improve",
            "score": 1
          },
          {
            "text": "I feel slightly pressured but continue",
            "score": 2
          },
          {
            "text": "I feel stressed and demotivated",
            "score": 4
          },
          {
            "text": "I feel confused about my own strategy",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You attend a seminar/webinar by achievers. What do you do?",
        "options": [
          {
            "text": "I take notes and implement key learnings",
            "score": 1
          },
          {
            "text": "I listen but forget to apply",
            "score": 3
          },
          {
            "text": "I feel inspired but don't act",
            "score": 2
          },
          {
            "text": "I feel overwhelmed with information",
            "score": 4
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in using achievers' advice effectively?",
        "options": [
          {
            "text": "Very confident and selective",
            "score": 1
          },
          {
            "text": "Somewhat confident",
            "score": 2
          },
          {
            "text": "Slightly confused while applying",
            "score": 3
          },
          {
            "text": "Not confident at all",
            "score": 4
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You get different advice from multiple achievers. What do you do?",
        "options": [
          {
            "text": "I get confused and don't follow anything",
            "score": 4
          },
          {
            "text": "I evaluate and choose what suits me",
            "score": 1
          },
          {
            "text": "I try to follow everything at once",
            "score": 3
          },
          {
            "text": "I follow some but feel unsure",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: An achiever suggests a difficult routine. What happens?",
        "options": [
          {
            "text": "I try but quit quickly",
            "score": 4
          },
          {
            "text": "I adapt it according to my capacity",
            "score": 1
          },
          {
            "text": "I follow it inconsistently",
            "score": 2
          },
          {
            "text": "I feel confused and avoid it",
            "score": 3
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do achievers motivate you to stay consistent?",
        "options": [
          {
            "text": "Very often, they keep me focused",
            "score": 1
          },
          {
            "text": "Sometimes, but not always",
            "score": 2
          },
          {
            "text": "Rarely, I lose motivation quickly",
            "score": 3
          },
          {
            "text": "Never, I don't feel motivated",
            "score": 4
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You fail in a mock test. What would an achiever-inspired mindset make you do?",
        "options": [
          {
            "text": "Learn from mistakes and improve",
            "score": 1
          },
          {
            "text": "Try again but with hesitation",
            "score": 2
          },
          {
            "text": "Feel confused and unsure what to change",
            "score": 3
          },
          {
            "text": "Feel discouraged and stop trying",
            "score": 4
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You follow multiple toppers on social media. What happens?",
        "options": [
          {
            "text": "I stay focused and take only useful insights",
            "score": 1
          },
          {
            "text": "I get slightly distracted but manage",
            "score": 2
          },
          {
            "text": "I feel confused due to too much content",
            "score": 4
          },
          {
            "text": "I keep switching strategies frequently",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How effectively do you convert achievers' advice into action?",
        "options": [
          {
            "text": "Very effectively with consistency",
            "score": 1
          },
          {
            "text": "Somewhat effectively",
            "score": 2
          },
          {
            "text": "With inconsistency and limited effect",
            "score": 3
          },
          {
            "text": "Not able to apply at all",
            "score": 4
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You see an achiever studying long hours. What do you do?",
        "options": [
          {
            "text": "I understand my limits and plan wisely",
            "score": 1
          },
          {
            "text": "I try to copy but struggle",
            "score": 2
          },
          {
            "text": "I feel pressured and stressed",
            "score": 3
          },
          {
            "text": "I feel demotivated and give up",
            "score": 4
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on achievers' role in your journey, what feels closest?",
        "options": [
          {
            "text": "They guide me effectively and clearly",
            "score": 1
          },
          {
            "text": "They help but I need better application",
            "score": 2
          },
          {
            "text": "They sometimes confuse me",
            "score": 3
          },
          {
            "text": "They don't help me at all",
            "score": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "competitive-exam",
    "domain": "education",
    "title": "Aspirants (Competitive Exam Preparation)",
    "subtitle": "Preparation, consistency & support",
    "description": "Reflect on preparation planning, discipline, stress management, revision, and support during exam preparation.",
    "focus": "competitive exam preparation habits",
    "iconKey": "graduation",
    "gradientFrom": "#DC2626",
    "gradientTo": "#EF4444",
    "accentColor": "#F87171",
    "lightBg": "#FEF2F2",
    "benefits": [
      "Understand your current learning, planning, and growth patterns.",
      "Identify areas where structure, mentoring, or counseling may help.",
      "Reflect on strengths and obstacles without judgment.",
      "Receive practical next steps for guided improvement."
    ],
    "takeaways": [
      "A private learning reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational and non-diagnostic"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How clear are you about your exam and preparation strategy?",
        "options": [
          {
            "text": "Somewhat clear but need improvement",
            "score": 2
          },
          {
            "text": "Completely unclear and directionless",
            "score": 4
          },
          {
            "text": "Very clear with a structured plan",
            "score": 1
          },
          {
            "text": "Slightly confused about the approach",
            "score": 3
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You start preparing for a competitive exam. What is your first step?",
        "options": [
          {
            "text": "I keep thinking but delay starting",
            "score": 3
          },
          {
            "text": "I make a proper plan and syllabus breakdown",
            "score": 1
          },
          {
            "text": "I feel confused and don't begin properly",
            "score": 4
          },
          {
            "text": "I start studying without clear planning",
            "score": 2
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You miss your daily study target. What do you do?",
        "options": [
          {
            "text": "I ignore it and move ahead",
            "score": 3
          },
          {
            "text": "I lose consistency completely",
            "score": 4
          },
          {
            "text": "I adjust and complete it the next day",
            "score": 1
          },
          {
            "text": "I try but feel slightly demotivated",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you revise your studied topics?",
        "options": [
          {
            "text": "Rarely revise",
            "score": 2
          },
          {
            "text": "Regularly and systematically",
            "score": 1
          },
          {
            "text": "Never revise",
            "score": 4
          },
          {
            "text": "Sometimes revise",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You find a subject difficult. What is your approach?",
        "options": [
          {
            "text": "I study but without proper understanding",
            "score": 3
          },
          {
            "text": "I avoid it most of the time",
            "score": 4
          },
          {
            "text": "I break it down and practice regularly",
            "score": 1
          },
          {
            "text": "I try but struggle to stay consistent",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You get distracted while studying. What happens?",
        "options": [
          {
            "text": "I keep switching between tasks",
            "score": 3
          },
          {
            "text": "I quickly regain focus",
            "score": 1
          },
          {
            "text": "I stop studying completely",
            "score": 4
          },
          {
            "text": "I get distracted but return later",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in clearing your exam?",
        "options": [
          {
            "text": "Slightly doubtful",
            "score": 3
          },
          {
            "text": "Very confident due to preparation",
            "score": 1
          },
          {
            "text": "Not confident at all",
            "score": 4
          },
          {
            "text": "Somewhat confident",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You receive low marks in a mock test. What do you do?",
        "options": [
          {
            "text": "Try again but without clear analysis",
            "score": 2
          },
          {
            "text": "Feel discouraged and stop trying",
            "score": 4
          },
          {
            "text": "Analyze mistakes and improve",
            "score": 1
          },
          {
            "text": "Feel confused about improvement",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You see other aspirants studying more than you. What happens?",
        "options": [
          {
            "text": "I feel distracted and lose focus",
            "score": 3
          },
          {
            "text": "I stay focused on my own strategy",
            "score": 1
          },
          {
            "text": "I feel stressed and compare constantly",
            "score": 4
          },
          {
            "text": "I feel slightly pressured but continue",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How consistent are you with your study routine?",
        "options": [
          {
            "text": "Inconsistent most of the time",
            "score": 3
          },
          {
            "text": "Highly consistent and disciplined",
            "score": 1
          },
          {
            "text": "Not consistent at all",
            "score": 4
          },
          {
            "text": "Moderately consistent",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You have limited time before exams. What do you do?",
        "options": [
          {
            "text": "Try to cover everything quickly",
            "score": 2
          },
          {
            "text": "Panic and waste time",
            "score": 4
          },
          {
            "text": "Prioritize important topics smartly",
            "score": 1
          },
          {
            "text": "Feel confused about what to study",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You feel mentally exhausted during preparation. What happens?",
        "options": [
          {
            "text": "Take breaks but lose rhythm",
            "score": 2
          },
          {
            "text": "Completely stop studying for a while",
            "score": 4
          },
          {
            "text": "Take a short break and restart effectively",
            "score": 1
          },
          {
            "text": "Feel demotivated and slow down",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How often do you practice mock tests?",
        "options": [
          {
            "text": "Rarely attempt tests",
            "score": 3
          },
          {
            "text": "Regularly with proper analysis",
            "score": 1
          },
          {
            "text": "Never attempt mock tests",
            "score": 4
          },
          {
            "text": "Occasionally with limited analysis",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You fail to meet weekly goals. What is your reaction?",
        "options": [
          {
            "text": "I feel frustrated and confused",
            "score": 3
          },
          {
            "text": "I reassess and improve my plan",
            "score": 1
          },
          {
            "text": "I give up on planning",
            "score": 4
          },
          {
            "text": "I try again but feel uncertain",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your preparation journey, what feels closest?",
        "options": [
          {
            "text": "I feel confused and inconsistent",
            "score": 3
          },
          {
            "text": "I am on the right track and progressing well",
            "score": 1
          },
          {
            "text": "I feel completely lost in preparation",
            "score": 4
          },
          {
            "text": "I am improving but need better consistency",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "academic-growth",
    "domain": "education",
    "title": "Academic Scholars",
    "subtitle": "Scholarship, goals & discipline",
    "description": "Reflect on academic ambition, consistency, research habits, feedback, and long-term learning goals.",
    "focus": "academic growth and scholarship readiness",
    "iconKey": "graduation",
    "gradientFrom": "#2563EB",
    "gradientTo": "#3B82F6",
    "accentColor": "#93C5FD",
    "lightBg": "#EFF6FF",
    "benefits": [
      "Understand your current learning, planning, and growth patterns.",
      "Identify areas where structure, mentoring, or counseling may help.",
      "Reflect on strengths and obstacles without judgment.",
      "Receive practical next steps for guided improvement."
    ],
    "takeaways": [
      "A private learning reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational and non-diagnostic"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How do you approach your academic learning goals?",
        "options": [
          {
            "text": "I follow a structured and focused approach",
            "score": 1
          },
          {
            "text": "I feel confused about my learning goals",
            "score": 3
          },
          {
            "text": "I have some clarity but need improvement",
            "score": 2
          },
          {
            "text": "I have no clear academic direction",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You are given a complex topic to master. What do you do?",
        "options": [
          {
            "text": "I feel overwhelmed and avoid it",
            "score": 4
          },
          {
            "text": "I try but struggle to understand fully",
            "score": 2
          },
          {
            "text": "I break it down and study deeply",
            "score": 1
          },
          {
            "text": "I study it but without deep understanding",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You aim to score top marks in exams. What is your strategy?",
        "options": [
          {
            "text": "I study but without proper planning",
            "score": 3
          },
          {
            "text": "I study consistently with smart techniques",
            "score": 1
          },
          {
            "text": "I try but lack consistency",
            "score": 2
          },
          {
            "text": "I feel confused about how to achieve it",
            "score": 4
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you engage in deep learning (beyond memorization)?",
        "options": [
          {
            "text": "Always focus on conceptual understanding",
            "score": 1
          },
          {
            "text": "Rarely focus on deep learning",
            "score": 3
          },
          {
            "text": "Never go beyond memorization",
            "score": 4
          },
          {
            "text": "Sometimes try to understand concepts",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You don't perform well in an exam. What do you do?",
        "options": [
          {
            "text": "I try again but without strong strategy",
            "score": 2
          },
          {
            "text": "I feel discouraged and give up",
            "score": 4
          },
          {
            "text": "I analyze mistakes and improve deeply",
            "score": 1
          },
          {
            "text": "I feel confused about what went wrong",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You have to manage multiple academic subjects. What happens?",
        "options": [
          {
            "text": "I fail to manage properly",
            "score": 4
          },
          {
            "text": "I manage effectively with planning",
            "score": 1
          },
          {
            "text": "I feel confused and unorganized",
            "score": 3
          },
          {
            "text": "I try but feel slightly overwhelmed",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How consistent are you with academic discipline?",
        "options": [
          {
            "text": "Not disciplined at all",
            "score": 4
          },
          {
            "text": "Moderately disciplined",
            "score": 2
          },
          {
            "text": "Highly disciplined and consistent",
            "score": 1
          },
          {
            "text": "Inconsistent most of the time",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You are asked to explain a concept to others. What do you do?",
        "options": [
          {
            "text": "I cannot explain properly",
            "score": 4
          },
          {
            "text": "I explain but with some gaps",
            "score": 2
          },
          {
            "text": "I feel unsure while explaining",
            "score": 3
          },
          {
            "text": "I explain clearly with strong understanding",
            "score": 1
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You face a difficult academic problem. What is your reaction?",
        "options": [
          {
            "text": "I avoid attempting it",
            "score": 4
          },
          {
            "text": "I try but get stuck often",
            "score": 2
          },
          {
            "text": "I solve it step by step with patience",
            "score": 1
          },
          {
            "text": "I feel confused and leave it",
            "score": 3
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you revise and reinforce concepts?",
        "options": [
          {
            "text": "Never revise",
            "score": 4
          },
          {
            "text": "Sometimes revise",
            "score": 2
          },
          {
            "text": "Regularly with strong focus",
            "score": 1
          },
          {
            "text": "Rarely revise",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You see top performers in your class. What do you feel?",
        "options": [
          {
            "text": "I feel demotivated",
            "score": 4
          },
          {
            "text": "I feel slightly pressured",
            "score": 2
          },
          {
            "text": "I feel motivated and improve myself",
            "score": 1
          },
          {
            "text": "I feel confused about my level",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are given a research-based assignment. What do you do?",
        "options": [
          {
            "text": "I avoid or delay it",
            "score": 4
          },
          {
            "text": "I explore deeply and give my best work",
            "score": 1
          },
          {
            "text": "I complete it with moderate effort",
            "score": 2
          },
          {
            "text": "I feel confused about how to approach",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How actively do you seek knowledge beyond your syllabus?",
        "options": [
          {
            "text": "Never explore beyond syllabus",
            "score": 4
          },
          {
            "text": "Sometimes explore extra knowledge",
            "score": 2
          },
          {
            "text": "Very actively and consistently",
            "score": 1
          },
          {
            "text": "Rarely go beyond syllabus",
            "score": 3
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your academic growth with others. What happens?",
        "options": [
          {
            "text": "I feel demotivated and stressed",
            "score": 4
          },
          {
            "text": "I stay focused on my own growth",
            "score": 1
          },
          {
            "text": "I feel slightly affected",
            "score": 2
          },
          {
            "text": "I feel distracted and pressured",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your academic journey, what feels closest?",
        "options": [
          {
            "text": "I feel academically lost",
            "score": 4
          },
          {
            "text": "I am improving but need refinement",
            "score": 2
          },
          {
            "text": "I am on the path of academic excellence",
            "score": 1
          },
          {
            "text": "I feel confused and inconsistent",
            "score": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "self-learning",
    "domain": "education",
    "title": "Self Education and Learning",
    "subtitle": "Independent learning & curiosity",
    "description": "Reflect on curiosity, learning routines, self-discipline, skill building, and applying what you learn.",
    "focus": "self-learning habits and independent growth",
    "iconKey": "compass",
    "gradientFrom": "#059669",
    "gradientTo": "#10B981",
    "accentColor": "#34D399",
    "lightBg": "#ECFDF5",
    "benefits": [
      "Understand your current learning, planning, and growth patterns.",
      "Identify areas where structure, mentoring, or counseling may help.",
      "Reflect on strengths and obstacles without judgment.",
      "Receive practical next steps for guided improvement."
    ],
    "takeaways": [
      "A private learning reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational and non-diagnostic"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How actively do you take responsibility for your own learning?",
        "options": [
          {
            "text": "I depend on others most of the time",
            "score": 3
          },
          {
            "text": "I take full responsibility and learn independently",
            "score": 1
          },
          {
            "text": "I don't take responsibility for learning",
            "score": 4
          },
          {
            "text": "I try but need guidance often",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You want to learn a new skill on your own. What do you do?",
        "options": [
          {
            "text": "I start but without proper direction",
            "score": 2
          },
          {
            "text": "I feel confused and don't start",
            "score": 4
          },
          {
            "text": "I find resources and start learning systematically",
            "score": 1
          },
          {
            "text": "I delay and keep postponing",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You face difficulty while self-studying. What happens?",
        "options": [
          {
            "text": "I feel confused and lose direction",
            "score": 3
          },
          {
            "text": "I try different methods and continue",
            "score": 1
          },
          {
            "text": "I quit learning that topic",
            "score": 4
          },
          {
            "text": "I struggle but keep trying",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you set personal learning goals?",
        "options": [
          {
            "text": "Sometimes set goals",
            "score": 2
          },
          {
            "text": "Never set goals",
            "score": 4
          },
          {
            "text": "Always set clear goals",
            "score": 1
          },
          {
            "text": "Rarely set goals",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You have access to multiple learning resources. What do you do?",
        "options": [
          {
            "text": "I randomly use resources",
            "score": 3
          },
          {
            "text": "I select and use them wisely",
            "score": 1
          },
          {
            "text": "I feel confused due to too many options",
            "score": 4
          },
          {
            "text": "I use some but not effectively",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You get distracted while self-learning. What happens?",
        "options": [
          {
            "text": "I get distracted but return later",
            "score": 2
          },
          {
            "text": "I stop learning completely",
            "score": 4
          },
          {
            "text": "I regain focus quickly",
            "score": 1
          },
          {
            "text": "I keep switching between tasks",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How consistent are you in self-learning?",
        "options": [
          {
            "text": "Moderately consistent",
            "score": 2
          },
          {
            "text": "Not consistent at all",
            "score": 4
          },
          {
            "text": "Highly consistent and disciplined",
            "score": 1
          },
          {
            "text": "Inconsistent most of the time",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You don't understand a concept while learning alone. What do you do?",
        "options": [
          {
            "text": "I try but remain partially confused",
            "score": 2
          },
          {
            "text": "I avoid learning it further",
            "score": 4
          },
          {
            "text": "I research and clarify it myself",
            "score": 1
          },
          {
            "text": "I feel stuck and leave it",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You fail to complete your learning targets. What is your reaction?",
        "options": [
          {
            "text": "I give up on the goal",
            "score": 4
          },
          {
            "text": "I reassess and improve my plan",
            "score": 1
          },
          {
            "text": "I feel confused and demotivated",
            "score": 3
          },
          {
            "text": "I try again but without clear changes",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you revise what you learn independently?",
        "options": [
          {
            "text": "Sometimes revise",
            "score": 2
          },
          {
            "text": "Never revise",
            "score": 4
          },
          {
            "text": "Regularly revise and reinforce learning",
            "score": 1
          },
          {
            "text": "Rarely revise",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You compare your learning progress with others. What happens?",
        "options": [
          {
            "text": "I feel pressured and distracted",
            "score": 3
          },
          {
            "text": "I stay focused on my own growth",
            "score": 1
          },
          {
            "text": "I feel demotivated",
            "score": 4
          },
          {
            "text": "I feel slightly affected",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You feel mentally tired during self-learning. What do you do?",
        "options": [
          {
            "text": "Feel demotivated and slow down",
            "score": 3
          },
          {
            "text": "Take a short break and restart effectively",
            "score": 1
          },
          {
            "text": "Stop learning for a long time",
            "score": 4
          },
          {
            "text": "Take breaks but lose consistency",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How actively do you seek new knowledge beyond necessity?",
        "options": [
          {
            "text": "Sometimes explore new topics",
            "score": 2
          },
          {
            "text": "Never seek extra knowledge",
            "score": 4
          },
          {
            "text": "Very actively and consistently",
            "score": 1
          },
          {
            "text": "Rarely explore beyond basics",
            "score": 3
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You learn something new. How do you ensure retention?",
        "options": [
          {
            "text": "I forget due to lack of practice",
            "score": 3
          },
          {
            "text": "I revise and apply it regularly",
            "score": 1
          },
          {
            "text": "I don't revise at all",
            "score": 4
          },
          {
            "text": "I revise occasionally",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your self-learning journey, what feels closest?",
        "options": [
          {
            "text": "I feel unable to learn independently",
            "score": 4
          },
          {
            "text": "I am highly effective in self-learning",
            "score": 1
          },
          {
            "text": "I feel inconsistent and confused",
            "score": 3
          },
          {
            "text": "I am improving but need consistency",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "investment-awareness",
    "domain": "finance",
    "title": "Investment Awareness & Decision-Making",
    "subtitle": "Clarity, risk & decision-making",
    "description": "Reflect on investment goals, research habits, risk awareness, decision-making, and learning needs.",
    "focus": "investment awareness and decision-making",
    "iconKey": "wallet",
    "gradientFrom": "#0F766E",
    "gradientTo": "#14B8A6",
    "accentColor": "#5EEAD4",
    "lightBg": "#F0FDFA",
    "benefits": [
      "Reflect on current awareness, planning habits, and decision patterns.",
      "Identify areas where qualified professional guidance may help.",
      "Review strengths and gaps without judgment or financial advice.",
      "Receive educational next steps for better conversations with experts."
    ],
    "takeaways": [
      "A private financial-awareness reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational, not professional financial advice"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How clear are you about your investment goals?",
        "options": [
          {
            "text": "I feel confused about my goals",
            "score": 3
          },
          {
            "text": "I am very clear with defined goals",
            "score": 1
          },
          {
            "text": "I have no clear goals",
            "score": 4
          },
          {
            "text": "I have some idea but not fully clear",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You receive extra income. What do you do?",
        "options": [
          {
            "text": "I spend it without thinking",
            "score": 4
          },
          {
            "text": "I save but don't invest properly",
            "score": 2
          },
          {
            "text": "I invest it with proper planning",
            "score": 1
          },
          {
            "text": "I feel confused about what to do",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You hear about a trending investment opportunity. What is your reaction?",
        "options": [
          {
            "text": "I consider it but stay cautious",
            "score": 2
          },
          {
            "text": "I invest without research",
            "score": 4
          },
          {
            "text": "I research and then decide carefully",
            "score": 1
          },
          {
            "text": "I feel confused due to mixed opinions",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you track your investments?",
        "options": [
          {
            "text": "Sometimes track",
            "score": 2
          },
          {
            "text": "Never track",
            "score": 4
          },
          {
            "text": "Regularly monitor and review",
            "score": 1
          },
          {
            "text": "Rarely track",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: Your investment value suddenly drops. What do you do?",
        "options": [
          {
            "text": "Feel confused and take no action",
            "score": 3
          },
          {
            "text": "Panic and sell immediately",
            "score": 4
          },
          {
            "text": "Analyze and make informed decisions",
            "score": 1
          },
          {
            "text": "Feel stressed but hold",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You are planning long-term investment. What is your approach?",
        "options": [
          {
            "text": "I avoid long-term investments",
            "score": 4
          },
          {
            "text": "I try but without proper structure",
            "score": 2
          },
          {
            "text": "I plan with clear strategy and goals",
            "score": 1
          },
          {
            "text": "I feel unsure about long-term planning",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in your investment decisions?",
        "options": [
          {
            "text": "Slightly doubtful",
            "score": 3
          },
          {
            "text": "Very confident with knowledge",
            "score": 1
          },
          {
            "text": "Not confident at all",
            "score": 4
          },
          {
            "text": "Somewhat confident",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You get advice from multiple people about investing. What do you do?",
        "options": [
          {
            "text": "I feel confused due to different opinions",
            "score": 3
          },
          {
            "text": "I follow others blindly",
            "score": 4
          },
          {
            "text": "I evaluate and choose wisely",
            "score": 1
          },
          {
            "text": "I consider but feel unsure",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You want to diversify your investments. What happens?",
        "options": [
          {
            "text": "I invest in only one option",
            "score": 4
          },
          {
            "text": "I diversify wisely",
            "score": 1
          },
          {
            "text": "I feel confused about diversification",
            "score": 3
          },
          {
            "text": "I try but don't understand fully",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you learn about financial markets?",
        "options": [
          {
            "text": "Rarely learn",
            "score": 3
          },
          {
            "text": "Regularly learn and update knowledge",
            "score": 1
          },
          {
            "text": "Never learn",
            "score": 4
          },
          {
            "text": "Sometimes learn",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You face a financial loss. What is your reaction?",
        "options": [
          {
            "text": "I try again but with hesitation",
            "score": 2
          },
          {
            "text": "I stop investing completely",
            "score": 4
          },
          {
            "text": "I analyze mistakes and improve",
            "score": 1
          },
          {
            "text": "I feel confused and unsure",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are given a safe vs risky investment choice. What do you do?",
        "options": [
          {
            "text": "I take high risk without thinking",
            "score": 4
          },
          {
            "text": "I balance risk and return wisely",
            "score": 1
          },
          {
            "text": "I choose safe but with doubts",
            "score": 2
          },
          {
            "text": "I feel confused about what to choose",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How disciplined are you with your investments?",
        "options": [
          {
            "text": "Inconsistent",
            "score": 3
          },
          {
            "text": "Very disciplined and consistent",
            "score": 1
          },
          {
            "text": "Not disciplined at all",
            "score": 4
          },
          {
            "text": "Moderately disciplined",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your returns with others. What happens?",
        "options": [
          {
            "text": "I feel stressed and compare constantly",
            "score": 4
          },
          {
            "text": "I stay focused on my own strategy",
            "score": 1
          },
          {
            "text": "I feel confused about my decisions",
            "score": 3
          },
          {
            "text": "I feel slightly pressured",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your investment journey, what feels closest?",
        "options": [
          {
            "text": "I feel uncertain and inconsistent",
            "score": 3
          },
          {
            "text": "I am confident and progressing well",
            "score": 1
          },
          {
            "text": "I feel completely lost in investing",
            "score": 4
          },
          {
            "text": "I am improving but need better strategy",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "gst-taxation",
    "domain": "finance",
    "title": "GST and Tax Awareness",
    "subtitle": "Compliance awareness & records",
    "description": "Reflect on tax awareness, record keeping, compliance habits, and when professional guidance may be useful.",
    "focus": "GST and tax awareness",
    "iconKey": "receipt",
    "gradientFrom": "#F59E0B",
    "gradientTo": "#D97706",
    "accentColor": "#FBBF24",
    "lightBg": "#FFFBEB",
    "benefits": [
      "Reflect on current awareness, planning habits, and decision patterns.",
      "Identify areas where qualified professional guidance may help.",
      "Review strengths and gaps without judgment or financial advice.",
      "Receive educational next steps for better conversations with experts."
    ],
    "takeaways": [
      "A private financial-awareness reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational, not professional financial advice"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How well do you understand GST and tax concepts?",
        "options": [
          {
            "text": "I feel confused about most concepts",
            "score": 3
          },
          {
            "text": "I understand concepts clearly",
            "score": 1
          },
          {
            "text": "I don't understand GST or tax at all",
            "score": 4
          },
          {
            "text": "I have basic understanding but not complete",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You start a business. What is your approach toward GST registration?",
        "options": [
          {
            "text": "I delay and do it later",
            "score": 2
          },
          {
            "text": "I ignore it completely",
            "score": 4
          },
          {
            "text": "I research and register properly",
            "score": 1
          },
          {
            "text": "I feel confused about the process",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You receive income from multiple sources. What do you do?",
        "options": [
          {
            "text": "I ignore tax responsibilities",
            "score": 4
          },
          {
            "text": "I calculate and manage taxes properly",
            "score": 1
          },
          {
            "text": "I feel confused about tax calculation",
            "score": 3
          },
          {
            "text": "I try but miss some details",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you keep records of your financial transactions?",
        "options": [
          {
            "text": "Rarely maintain records",
            "score": 3
          },
          {
            "text": "Always keep proper records",
            "score": 1
          },
          {
            "text": "Never maintain records",
            "score": 4
          },
          {
            "text": "Sometimes maintain records",
            "score": 2
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You need to file your tax return. What do you do?",
        "options": [
          {
            "text": "I don't file at all",
            "score": 4
          },
          {
            "text": "I delay filing",
            "score": 2
          },
          {
            "text": "I file correctly on time",
            "score": 1
          },
          {
            "text": "I feel confused about filing",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You are eligible for tax deductions. What happens?",
        "options": [
          {
            "text": "I miss some benefits",
            "score": 2
          },
          {
            "text": "I don't claim deductions",
            "score": 4
          },
          {
            "text": "I claim deductions properly",
            "score": 1
          },
          {
            "text": "I feel unsure about deductions",
            "score": 3
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in handling GST compliance?",
        "options": [
          {
            "text": "Slightly doubtful",
            "score": 3
          },
          {
            "text": "Very confident",
            "score": 1
          },
          {
            "text": "Not confident at all",
            "score": 4
          },
          {
            "text": "Somewhat confident",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You get a GST notice or query. What do you do?",
        "options": [
          {
            "text": "I feel confused and stressed",
            "score": 3
          },
          {
            "text": "I respond properly with correct information",
            "score": 1
          },
          {
            "text": "I ignore it",
            "score": 4
          },
          {
            "text": "I try but feel unsure",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You need to issue invoices under GST. What happens?",
        "options": [
          {
            "text": "I don't issue proper invoices",
            "score": 4
          },
          {
            "text": "I issue correct GST invoices",
            "score": 1
          },
          {
            "text": "I feel confused about invoice format",
            "score": 3
          },
          {
            "text": "I try but make mistakes",
            "score": 2
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you stay updated with tax rules and changes?",
        "options": [
          {
            "text": "Rarely follow updates",
            "score": 3
          },
          {
            "text": "Regularly stay updated",
            "score": 1
          },
          {
            "text": "Never follow updates",
            "score": 4
          },
          {
            "text": "Sometimes check updates",
            "score": 2
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You make an error in tax filing. What is your reaction?",
        "options": [
          {
            "text": "I ignore the mistake",
            "score": 4
          },
          {
            "text": "I correct it immediately",
            "score": 1
          },
          {
            "text": "I feel confused about correction process",
            "score": 3
          },
          {
            "text": "I try but delay correction",
            "score": 2
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You have to choose between saving tax legally or ignoring it. What do you do?",
        "options": [
          {
            "text": "I feel confused about options",
            "score": 3
          },
          {
            "text": "I follow legal tax-saving methods",
            "score": 1
          },
          {
            "text": "I ignore tax rules",
            "score": 4
          },
          {
            "text": "I try but lack clarity",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How disciplined are you in paying taxes on time?",
        "options": [
          {
            "text": "Inconsistent",
            "score": 3
          },
          {
            "text": "Very disciplined",
            "score": 1
          },
          {
            "text": "Not disciplined at all",
            "score": 4
          },
          {
            "text": "Moderately disciplined",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your tax handling with others. What happens?",
        "options": [
          {
            "text": "I feel stressed or avoid it",
            "score": 4
          },
          {
            "text": "I stay focused on my compliance",
            "score": 1
          },
          {
            "text": "I feel confused about my approach",
            "score": 3
          },
          {
            "text": "I feel slightly pressured",
            "score": 2
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your tax and GST management, what feels closest?",
        "options": [
          {
            "text": "I feel completely lost",
            "score": 4
          },
          {
            "text": "I manage everything efficiently",
            "score": 1
          },
          {
            "text": "I feel confused and inconsistent",
            "score": 3
          },
          {
            "text": "I am improving but need clarity",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "financial-planning",
    "domain": "finance",
    "title": "Financial Planning",
    "subtitle": "Budgeting, goals & planning",
    "description": "Reflect on financial goals, budgeting, saving, investing, reviews, and planning support needs.",
    "focus": "financial planning habits",
    "iconKey": "wallet",
    "gradientFrom": "#10B981",
    "gradientTo": "#059669",
    "accentColor": "#34D399",
    "lightBg": "#ECFDF5",
    "benefits": [
      "Reflect on current awareness, planning habits, and decision patterns.",
      "Identify areas where qualified professional guidance may help.",
      "Review strengths and gaps without judgment or financial advice.",
      "Receive educational next steps for better conversations with experts."
    ],
    "takeaways": [
      "A private financial-awareness reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational, not professional financial advice"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How clear are you about your financial goals?",
        "options": [
          {
            "text": "I feel confused about my goals",
            "score": 3
          },
          {
            "text": "I have no clear goals",
            "score": 4
          },
          {
            "text": "I am very clear with defined goals",
            "score": 1
          },
          {
            "text": "I have some idea but not fully clear",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You receive your monthly income. What do you do first?",
        "options": [
          {
            "text": "I spend without planning",
            "score": 4
          },
          {
            "text": "I save and allocate funds systematically",
            "score": 1
          },
          {
            "text": "I save but without proper planning",
            "score": 2
          },
          {
            "text": "I feel confused about where to allocate",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You face an unexpected expense. What happens?",
        "options": [
          {
            "text": "I feel stressed and unprepared",
            "score": 3
          },
          {
            "text": "I may need to borrow or feel panicked",
            "score": 4
          },
          {
            "text": "I manage it using emergency funds",
            "score": 1
          },
          {
            "text": "I struggle but manage somehow",
            "score": 2
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you track your expenses?",
        "options": [
          {
            "text": "Rarely track expenses",
            "score": 3
          },
          {
            "text": "Sometimes track",
            "score": 2
          },
          {
            "text": "Never track expenses",
            "score": 4
          },
          {
            "text": "Regularly track and manage",
            "score": 1
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You plan for long-term goals (house, retirement). What do you do?",
        "options": [
          {
            "text": "I avoid long-term planning",
            "score": 4
          },
          {
            "text": "I think about it but don't plan properly",
            "score": 2
          },
          {
            "text": "I create a clear financial plan",
            "score": 1
          },
          {
            "text": "I feel unsure about planning",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You want to invest your savings. What happens?",
        "options": [
          {
            "text": "I feel confused about options",
            "score": 3
          },
          {
            "text": "I avoid investing",
            "score": 4
          },
          {
            "text": "I invest with proper research",
            "score": 1
          },
          {
            "text": "I try but lack full knowledge",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How disciplined are you with budgeting?",
        "options": [
          {
            "text": "Moderately disciplined",
            "score": 2
          },
          {
            "text": "Not disciplined at all",
            "score": 4
          },
          {
            "text": "Very disciplined",
            "score": 1
          },
          {
            "text": "Inconsistent",
            "score": 3
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You overspend in a month. What do you do?",
        "options": [
          {
            "text": "I ignore and continue spending",
            "score": 3
          },
          {
            "text": "I adjust next month's budget",
            "score": 1
          },
          {
            "text": "I feel stressed and lose control",
            "score": 4
          },
          {
            "text": "I try but struggle to control",
            "score": 2
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You have multiple financial priorities. What do you do?",
        "options": [
          {
            "text": "I try but feel slightly confused",
            "score": 2
          },
          {
            "text": "I ignore planning",
            "score": 4
          },
          {
            "text": "I feel overwhelmed",
            "score": 3
          },
          {
            "text": "I prioritize and plan effectively",
            "score": 1
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you review your financial plan?",
        "options": [
          {
            "text": "Never review",
            "score": 4
          },
          {
            "text": "Sometimes review",
            "score": 2
          },
          {
            "text": "Regularly review and update",
            "score": 1
          },
          {
            "text": "Rarely review",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You face financial loss. What is your reaction?",
        "options": [
          {
            "text": "I try again but with hesitation",
            "score": 2
          },
          {
            "text": "I stop planning or investing",
            "score": 4
          },
          {
            "text": "I analyze and improve my plan",
            "score": 1
          },
          {
            "text": "I feel confused and unsure",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are given advice on financial planning. What do you do?",
        "options": [
          {
            "text": "I feel confused due to multiple opinions",
            "score": 3
          },
          {
            "text": "I evaluate and apply wisely",
            "score": 1
          },
          {
            "text": "I ignore advice completely",
            "score": 4
          },
          {
            "text": "I consider but feel unsure",
            "score": 2
          }
        ]
      },
      {
        "id": 13,
        "question": "How well do you balance saving, spending, and investing?",
        "options": [
          {
            "text": "Poorly balanced",
            "score": 3
          },
          {
            "text": "Very well balanced",
            "score": 1
          },
          {
            "text": "Not balanced at all",
            "score": 4
          },
          {
            "text": "Moderately balanced",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your financial situation with others. What happens?",
        "options": [
          {
            "text": "I feel slightly pressured",
            "score": 2
          },
          {
            "text": "I stay focused on my own plan",
            "score": 1
          },
          {
            "text": "I feel stressed and compare constantly",
            "score": 4
          },
          {
            "text": "I feel confused about my strategy",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your financial journey, what feels closest?",
        "options": [
          {
            "text": "I feel uncertain and inconsistent",
            "score": 3
          },
          {
            "text": "I am financially stable and planned",
            "score": 1
          },
          {
            "text": "I feel completely lost financially",
            "score": 4
          },
          {
            "text": "I am improving but need better planning",
            "score": 2
          }
        ]
      }
    ]
  },
  {
    "slug": "insurance-planning",
    "domain": "finance",
    "title": "Insurance Planning",
    "subtitle": "Coverage clarity & preparedness",
    "description": "Reflect on insurance needs, policy understanding, claims awareness, premium discipline, and coverage planning.",
    "focus": "insurance planning awareness",
    "iconKey": "wallet",
    "gradientFrom": "#2563EB",
    "gradientTo": "#1D4ED8",
    "accentColor": "#60A5FA",
    "lightBg": "#EFF6FF",
    "benefits": [
      "Reflect on current awareness, planning habits, and decision patterns.",
      "Identify areas where qualified professional guidance may help.",
      "Review strengths and gaps without judgment or financial advice.",
      "Receive educational next steps for better conversations with experts."
    ],
    "takeaways": [
      "A private financial-awareness reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational, not professional financial advice"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How clear are you about your insurance needs?",
        "options": [
          {
            "text": "I have some idea but not fully clear",
            "score": 2
          },
          {
            "text": "I feel confused about my needs",
            "score": 3
          },
          {
            "text": "I am very clear about my insurance requirements",
            "score": 1
          },
          {
            "text": "I have no clarity at all",
            "score": 4
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: You start earning your first income. What do you do about insurance?",
        "options": [
          {
            "text": "I feel confused about which policy to take",
            "score": 3
          },
          {
            "text": "I delay taking insurance",
            "score": 2
          },
          {
            "text": "I research and choose suitable insurance",
            "score": 1
          },
          {
            "text": "I ignore insurance completely",
            "score": 4
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: You are offered multiple insurance policies. What is your approach?",
        "options": [
          {
            "text": "I analyze and compare policies",
            "score": 1
          },
          {
            "text": "I feel overwhelmed and confused",
            "score": 4
          },
          {
            "text": "I take advice but feel unsure",
            "score": 2
          },
          {
            "text": "I choose without proper understanding",
            "score": 3
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you review your insurance policies?",
        "options": [
          {
            "text": "Never review",
            "score": 4
          },
          {
            "text": "Sometimes review",
            "score": 2
          },
          {
            "text": "Regularly review and update",
            "score": 1
          },
          {
            "text": "Rarely review",
            "score": 3
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: You face a medical emergency. What happens?",
        "options": [
          {
            "text": "I manage easily with insurance coverage",
            "score": 1
          },
          {
            "text": "I struggle financially",
            "score": 4
          },
          {
            "text": "I feel unprepared and stressed",
            "score": 3
          },
          {
            "text": "I manage but with some difficulty",
            "score": 2
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You need to choose between cheap vs comprehensive insurance. What do you do?",
        "options": [
          {
            "text": "I feel confused about what to choose",
            "score": 3
          },
          {
            "text": "I choose but with uncertainty",
            "score": 2
          },
          {
            "text": "I balance cost and coverage wisely",
            "score": 1
          },
          {
            "text": "I choose cheap without thinking",
            "score": 4
          }
        ]
      },
      {
        "id": 7,
        "question": "How well do you understand policy terms and conditions?",
        "options": [
          {
            "text": "I understand clearly",
            "score": 1
          },
          {
            "text": "I don't understand at all",
            "score": 4
          },
          {
            "text": "I feel confused about terms",
            "score": 3
          },
          {
            "text": "I have partial understanding",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: You are advised to buy insurance by others. What do you do?",
        "options": [
          {
            "text": "I follow blindly",
            "score": 4
          },
          {
            "text": "I consider but feel unsure",
            "score": 2
          },
          {
            "text": "I evaluate and then decide",
            "score": 1
          },
          {
            "text": "I feel confused due to mixed advice",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You have multiple insurance options (life, health, term). What do you do?",
        "options": [
          {
            "text": "I choose but without full clarity",
            "score": 2
          },
          {
            "text": "I ignore planning",
            "score": 4
          },
          {
            "text": "I select based on proper planning",
            "score": 1
          },
          {
            "text": "I feel confused about priorities",
            "score": 3
          }
        ]
      },
      {
        "id": 10,
        "question": "How disciplined are you in paying insurance premiums?",
        "options": [
          {
            "text": "Moderately disciplined",
            "score": 2
          },
          {
            "text": "Not disciplined at all",
            "score": 4
          },
          {
            "text": "Very disciplined and timely",
            "score": 1
          },
          {
            "text": "Sometimes miss payments",
            "score": 3
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You need to claim insurance. What happens?",
        "options": [
          {
            "text": "I fail to claim properly",
            "score": 4
          },
          {
            "text": "I face some difficulty",
            "score": 2
          },
          {
            "text": "I handle claim process smoothly",
            "score": 1
          },
          {
            "text": "I feel confused about process",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: You are planning long-term financial security. What do you do?",
        "options": [
          {
            "text": "I try but lack clarity",
            "score": 2
          },
          {
            "text": "I ignore insurance planning",
            "score": 4
          },
          {
            "text": "I include insurance in financial planning",
            "score": 1
          },
          {
            "text": "I feel unsure about its importance",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How aware are you about different types of insurance?",
        "options": [
          {
            "text": "Slightly aware but confused",
            "score": 3
          },
          {
            "text": "Not aware at all",
            "score": 4
          },
          {
            "text": "Highly aware and informed",
            "score": 1
          },
          {
            "text": "Somewhat aware",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your insurance with others. What happens?",
        "options": [
          {
            "text": "I feel pressured",
            "score": 2
          },
          {
            "text": "I stay focused on my own needs",
            "score": 1
          },
          {
            "text": "I ignore it completely",
            "score": 4
          },
          {
            "text": "I feel stressed or unsure",
            "score": 3
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your insurance planning, what feels closest?",
        "options": [
          {
            "text": "I am somewhat covered but not fully",
            "score": 2
          },
          {
            "text": "I feel completely unprepared",
            "score": 4
          },
          {
            "text": "I am well-covered and confident",
            "score": 1
          },
          {
            "text": "I feel uncertain and need improvement",
            "score": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "business-finance-consulting",
    "domain": "finance",
    "title": "Business Finance Consultant",
    "subtitle": "Analysis, risk & professional growth",
    "description": "Reflect on business finance analysis, client communication, risk awareness, and areas for professional growth.",
    "focus": "business finance consulting readiness",
    "iconKey": "briefcase",
    "gradientFrom": "#7C2D12",
    "gradientTo": "#EA580C",
    "accentColor": "#FDBA74",
    "lightBg": "#FFF7ED",
    "benefits": [
      "Reflect on current awareness, planning habits, and decision patterns.",
      "Identify areas where qualified professional guidance may help.",
      "Review strengths and gaps without judgment or financial advice.",
      "Receive educational next steps for better conversations with experts."
    ],
    "takeaways": [
      "A private financial-awareness reflection summary",
      "Supportive score interpretation",
      "Guidance-oriented next steps",
      "A reminder that this is educational, not professional financial advice"
    ],
    "questions": [
      {
        "id": 1,
        "question": "How well do you understand business financial planning?",
        "options": [
          {
            "text": "I feel confused about financial planning",
            "score": 3
          },
          {
            "text": "I have strong understanding and clarity",
            "score": 1
          },
          {
            "text": "I have no understanding at all",
            "score": 4
          },
          {
            "text": "I have basic knowledge but need improvement",
            "score": 2
          }
        ]
      },
      {
        "id": 2,
        "question": "Imagine this situation: A client asks you to manage their business finances. What do you do?",
        "options": [
          {
            "text": "I try without proper analysis",
            "score": 2
          },
          {
            "text": "I avoid taking responsibility",
            "score": 4
          },
          {
            "text": "I analyze data and plan strategically",
            "score": 1
          },
          {
            "text": "I feel confused handling it",
            "score": 3
          }
        ]
      },
      {
        "id": 3,
        "question": "Imagine this situation: A business is facing losses. What is your approach?",
        "options": [
          {
            "text": "I identify causes and create recovery strategy",
            "score": 1
          },
          {
            "text": "I suggest general ideas without analysis",
            "score": 3
          },
          {
            "text": "I try but lack proper direction",
            "score": 2
          },
          {
            "text": "I feel unable to handle the situation",
            "score": 4
          }
        ]
      },
      {
        "id": 4,
        "question": "How often do you analyze financial statements?",
        "options": [
          {
            "text": "Never analyze",
            "score": 4
          },
          {
            "text": "Sometimes analyze",
            "score": 2
          },
          {
            "text": "Rarely analyze",
            "score": 3
          },
          {
            "text": "Regularly analyze in detail",
            "score": 1
          }
        ]
      },
      {
        "id": 5,
        "question": "Imagine this situation: A client has cash flow issues. What do you do?",
        "options": [
          {
            "text": "I try basic solutions without clarity",
            "score": 2
          },
          {
            "text": "I deeply analyze and restructure cash flow",
            "score": 1
          },
          {
            "text": "I avoid dealing with it",
            "score": 4
          },
          {
            "text": "I feel confused about solutions",
            "score": 3
          }
        ]
      },
      {
        "id": 6,
        "question": "Imagine this situation: You need to suggest investment options for a business. What do you do?",
        "options": [
          {
            "text": "I suggest without research",
            "score": 3
          },
          {
            "text": "I avoid giving advice",
            "score": 4
          },
          {
            "text": "I research and recommend wisely",
            "score": 1
          },
          {
            "text": "I give advice with partial understanding",
            "score": 2
          }
        ]
      },
      {
        "id": 7,
        "question": "How confident are you in financial decision-making?",
        "options": [
          {
            "text": "Very confident and accurate",
            "score": 1
          },
          {
            "text": "Not confident at all",
            "score": 4
          },
          {
            "text": "Slightly doubtful",
            "score": 3
          },
          {
            "text": "Somewhat confident",
            "score": 2
          }
        ]
      },
      {
        "id": 8,
        "question": "Imagine this situation: A client compares your advice with another consultant. What do you do?",
        "options": [
          {
            "text": "I feel pressured and unsure",
            "score": 4
          },
          {
            "text": "I confidently justify with logic",
            "score": 1
          },
          {
            "text": "I try to adjust without clarity",
            "score": 2
          },
          {
            "text": "I feel confused about my approach",
            "score": 3
          }
        ]
      },
      {
        "id": 9,
        "question": "Imagine this situation: You have multiple financial strategies to suggest. What do you do?",
        "options": [
          {
            "text": "I choose randomly",
            "score": 2
          },
          {
            "text": "I ignore decision-making",
            "score": 4
          },
          {
            "text": "I select based on analysis",
            "score": 1
          },
          {
            "text": "I feel confused choosing the best",
            "score": 3
          }
        ]
      },
      {
        "id": 10,
        "question": "How often do you upgrade your financial knowledge?",
        "options": [
          {
            "text": "Rarely upgrade",
            "score": 3
          },
          {
            "text": "Sometimes learn",
            "score": 2
          },
          {
            "text": "Always update and learn consistently",
            "score": 1
          },
          {
            "text": "Never upgrade",
            "score": 4
          }
        ]
      },
      {
        "id": 11,
        "question": "Imagine this situation: You make a mistake in financial advice. What do you do?",
        "options": [
          {
            "text": "I accept and correct it immediately",
            "score": 1
          },
          {
            "text": "I delay fixing it",
            "score": 2
          },
          {
            "text": "I ignore the mistake",
            "score": 4
          },
          {
            "text": "I feel confused about correction",
            "score": 3
          }
        ]
      },
      {
        "id": 12,
        "question": "Imagine this situation: A client wants tax-saving strategies. What do you do?",
        "options": [
          {
            "text": "I suggest wrong or incomplete methods",
            "score": 4
          },
          {
            "text": "I give accurate and legal strategies",
            "score": 1
          },
          {
            "text": "I give partial suggestions",
            "score": 2
          },
          {
            "text": "I feel unsure about tax planning",
            "score": 3
          }
        ]
      },
      {
        "id": 13,
        "question": "How well do you manage risk in financial planning?",
        "options": [
          {
            "text": "Poorly manage risk",
            "score": 3
          },
          {
            "text": "Manage risk effectively",
            "score": 1
          },
          {
            "text": "Do not manage risk at all",
            "score": 4
          },
          {
            "text": "Moderately manage risk",
            "score": 2
          }
        ]
      },
      {
        "id": 14,
        "question": "Imagine this situation: You compare your consulting skills with others. What happens?",
        "options": [
          {
            "text": "I feel confused about my ability",
            "score": 3
          },
          {
            "text": "I stay confident and focused",
            "score": 1
          },
          {
            "text": "I feel slightly pressured",
            "score": 2
          },
          {
            "text": "I feel demotivated",
            "score": 4
          }
        ]
      },
      {
        "id": 15,
        "question": "Imagine this situation: When you reflect on your role as a finance consultant, what feels closest?",
        "options": [
          {
            "text": "I feel completely ineffective",
            "score": 4
          },
          {
            "text": "I am highly effective and confident",
            "score": 1
          },
          {
            "text": "I feel inconsistent and unsure",
            "score": 3
          },
          {
            "text": "I am improving but need refinement",
            "score": 2
          }
        ]
      }
    ]
  }
];

const ASSESSMENT_SLUG_ALIASES: Record<string, string> = {
  "career-planning": "path-finder",
};

export function getAssessmentBySlug(slug: string | undefined) {
  if (!slug) {
    return undefined;
  }

  const resolvedSlug = ASSESSMENT_SLUG_ALIASES[slug] || slug;
  return ASSESSMENTS.find((assessment) => assessment.slug === resolvedSlug);
}

export function getAssessmentsByDomain(domain: AssessmentDomain) {
  return ASSESSMENTS.filter((assessment) => assessment.domain === domain);
}

export function getAssessmentMaxScore(assessment: AssessmentCatalogItem) {
  return assessment.questions.length * 4;
}

export function getAssessmentMinScore(assessment: AssessmentCatalogItem) {
  return assessment.questions.length;
}

function getProfessionalGuidanceLabel(domain: AssessmentDomain) {
  if (domain === "finance") {
    return "a qualified financial, tax, or insurance professional";
  }

  if (domain === "education") {
    return "a qualified academic, career, or counseling professional";
  }

  return "a qualified counselor or mental health professional";
}

export function getScoreRanges(assessment: AssessmentCatalogItem) {
  const minScore = getAssessmentMinScore(assessment);
  const maxScore = getAssessmentMaxScore(assessment);

  return [
    { range: `${minScore}-25`, label: "Lower support needs" },
    { range: "26-35", label: "Some areas to strengthen" },
    { range: "36-45", label: "Moderate support needs" },
    { range: "46-55", label: "High support needs" },
    { range: `56-${maxScore}`, label: "Very high support needs" },
  ];
}

export function getScoreInterpretation(
  assessment: AssessmentCatalogItem,
  score: number
): ScoreInterpretation {
  const guidanceLabel = getProfessionalGuidanceLabel(assessment.domain);
  const focus = assessment.focus;

  if (score <= 25) {
    return {
      category: "Lower Support Needs",
      title: `Your responses suggest ${focus} may feel relatively manageable`,
      description: `Your answers point to steadier patterns around ${focus}. This is a reflection summary, not a label or diagnosis.`,
      recommendation: "Keep using the routines and supports that are working for you. If anything changes or feels difficult, consider discussing it with a trusted professional.",
    };
  }

  if (score <= 35) {
    return {
      category: "Some Areas To Strengthen",
      title: `Your responses show a few areas to strengthen around ${focus}`,
      description: `Some answers suggest ${focus} may benefit from more awareness, structure, or support. This result is educational and non-diagnostic.`,
      recommendation: `Reflect on the questions that felt most relevant and consider speaking with ${guidanceLabel} for personalized guidance.`,
    };
  }

  if (score <= 45) {
    return {
      category: "Moderate Support Needs",
      title: `Your responses suggest noticeable support needs around ${focus}`,
      description: `Several answers indicate that ${focus} may be affecting your comfort, clarity, or day-to-day functioning. This does not diagnose or label you.`,
      recommendation: `Consider seeking guidance from ${guidanceLabel} to explore these patterns and plan supportive next steps.`,
    };
  }

  if (score <= 55) {
    return {
      category: "High Support Needs",
      title: `Your responses suggest ${focus} may feel difficult right now`,
      description: `Your answers point to stronger challenges around ${focus}. This result is not a diagnosis, but it may be a useful starting point for a supportive conversation.`,
      recommendation: `It may be helpful to connect with ${guidanceLabel} for careful, personalized support. Avoid making major life decisions based only on this score.`,
    };
  }

  return {
    category: "Very High Support Needs",
    title: `Your responses suggest a high level of reported difficulty around ${focus}`,
    description: `Your answers indicate that ${focus} may be creating significant strain. This is not a diagnosis or formal assessment.`,
    recommendation: `Please consider reaching out to ${guidanceLabel} for timely, personalized guidance. If you feel unsafe or at immediate risk, contact local emergency support or a trusted person right away.`,
  };
}
