export interface Goal {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  mood: number
  tasks: Task[]
  createdAt: string
}

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface MoodData {
  date: string
  mood: number
  productivity: number
}

export interface ProductiveHour {
  day: string
  hour: number
  productivity: number
}

export interface AIInsight {
  id: string
  type: "productivity" | "mood" | "goal" | "general"
  title: string
  description: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}
