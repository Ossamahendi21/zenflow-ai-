import { v4 as uuidv4 } from "uuid"
import type { Goal, MoodData, ProductiveHour, AIInsight, ChatMessage } from "@/lib/types"

// Mock goals data
export const mockGoals: Goal[] = [
  {
    id: uuidv4(),
    title: "Website Redesign",
    description: "Complete the redesign of the company website",
    priority: "High",
    mood: 85,
    tasks: [
      {
        id: uuidv4(),
        title: "Create wireframes",
        completed: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Design homepage",
        completed: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Implement responsive layout",
        completed: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Test on multiple devices",
        completed: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Learn React",
    description: "Master React fundamentals and build a project",
    priority: "Medium",
    mood: 70,
    tasks: [
      {
        id: uuidv4(),
        title: "Complete React basics course",
        completed: true,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Build a todo app",
        completed: true,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Learn React hooks",
        completed: false,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Build a weather app",
        completed: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Fitness Goal",
    description: "Exercise regularly and improve overall fitness",
    priority: "Low",
    mood: 60,
    tasks: [
      {
        id: uuidv4(),
        title: "Go to gym 3x per week",
        completed: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        title: "Run 5km without stopping",
        completed: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock mood data for the past week
export const mockMoodData: MoodData[] = [
  {
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 65,
    productivity: 70,
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 70,
    productivity: 75,
  },
  {
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 60,
    productivity: 65,
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 75,
    productivity: 80,
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 80,
    productivity: 85,
  },
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 75,
    productivity: 80,
  },
  {
    date: new Date().toISOString(),
    mood: 85,
    productivity: 90,
  },
]

// Mock productive hours data
export const mockProductiveHours: ProductiveHour[] = [
  { day: "Monday", hour: 9, productivity: 70 },
  { day: "Monday", hour: 10, productivity: 85 },
  { day: "Monday", hour: 11, productivity: 90 },
  { day: "Monday", hour: 12, productivity: 60 },
  { day: "Monday", hour: 13, productivity: 50 },
  { day: "Monday", hour: 14, productivity: 65 },
  { day: "Monday", hour: 15, productivity: 75 },
  { day: "Monday", hour: 16, productivity: 70 },
  { day: "Monday", hour: 17, productivity: 60 },

  { day: "Tuesday", hour: 9, productivity: 75 },
  { day: "Tuesday", hour: 10, productivity: 90 },
  { day: "Tuesday", hour: 11, productivity: 95 },
  { day: "Tuesday", hour: 12, productivity: 65 },
  { day: "Tuesday", hour: 13, productivity: 55 },
  { day: "Tuesday", hour: 14, productivity: 70 },
  { day: "Tuesday", hour: 15, productivity: 80 },
  { day: "Tuesday", hour: 16, productivity: 75 },
  { day: "Tuesday", hour: 17, productivity: 65 },

  { day: "Wednesday", hour: 9, productivity: 80 },
  { day: "Wednesday", hour: 10, productivity: 95 },
  { day: "Wednesday", hour: 11, productivity: 90 },
  { day: "Wednesday", hour: 12, productivity: 70 },
  { day: "Wednesday", hour: 13, productivity: 60 },
  { day: "Wednesday", hour: 14, productivity: 75 },
  { day: "Wednesday", hour: 15, productivity: 85 },
  { day: "Wednesday", hour: 16, productivity: 80 },
  { day: "Wednesday", hour: 17, productivity: 70 },

  { day: "Thursday", hour: 9, productivity: 75 },
  { day: "Thursday", hour: 10, productivity: 85 },
  { day: "Thursday", hour: 11, productivity: 80 },
  { day: "Thursday", hour: 12, productivity: 65 },
  { day: "Thursday", hour: 13, productivity: 55 },
  { day: "Thursday", hour: 14, productivity: 70 },
  { day: "Thursday", hour: 15, productivity: 75 },
  { day: "Thursday", hour: 16, productivity: 70 },
  { day: "Thursday", hour: 17, productivity: 60 },

  { day: "Friday", hour: 9, productivity: 70 },
  { day: "Friday", hour: 10, productivity: 80 },
  { day: "Friday", hour: 11, productivity: 75 },
  { day: "Friday", hour: 12, productivity: 60 },
  { day: "Friday", hour: 13, productivity: 50 },
  { day: "Friday", hour: 14, productivity: 65 },
  { day: "Friday", hour: 15, productivity: 70 },
  { day: "Friday", hour: 16, productivity: 65 },
  { day: "Friday", hour: 17, productivity: 55 },
]

// Mock AI insights
export const mockAIInsights: AIInsight[] = [
  {
    id: uuidv4(),
    type: "productivity",
    title: "Peak Productivity Time",
    description:
      "You're most productive between 10-11am. Schedule important tasks during this time for maximum efficiency.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    type: "mood",
    title: "Mood Improvement",
    description:
      "Your mood tends to improve after completing high-priority tasks. Consider tackling them early in the day.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    type: "goal",
    title: "Goal Progress",
    description: "You're making steady progress on your 'Website Redesign' goal. Keep up the momentum!",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    type: "general",
    title: "Work-Life Balance",
    description: "Taking short breaks every 90 minutes could help maintain your productivity throughout the day.",
    createdAt: new Date().toISOString(),
  },
]

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: uuidv4(),
    content: "Hello! I'm your ZenFlow AI assistant. How can I help you today?",
    sender: "ai",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    content: "I need help prioritizing my tasks for today.",
    sender: "user",
    timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    content:
      "Based on your productivity patterns, I recommend focusing on your 'Website Redesign' tasks during the morning when your productivity is highest. You could work on learning React in the afternoon.",
    sender: "ai",
    timestamp: new Date().toISOString(),
  },
]
