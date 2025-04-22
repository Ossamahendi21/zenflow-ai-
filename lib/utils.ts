import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPriorityEmoji(priority: string): string {
  switch (priority) {
    case "High":
      return "🔴"
    case "Medium":
      return "🟠"
    case "Low":
      return "🟢"
    default:
      return "⚪"
  }
}

export function getMoodEmoji(mood: number): string {
  if (mood >= 90) return "😁"
  if (mood >= 70) return "😊"
  if (mood >= 50) return "😐"
  if (mood >= 30) return "😕"
  return "😞"
}
