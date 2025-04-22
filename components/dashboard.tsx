"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { mockGoals, mockMoodData, mockProductiveHours, mockAIInsights, mockChatMessages } from "@/lib/mock-data"
import type { Goal } from "@/lib/types"
import { GoalSection } from "@/components/goal-section"
import { MoodAnalytics } from "@/components/mood-analytics"
import { AIAssistant } from "@/components/ai-assistant"
import { Header } from "@/components/header"
import { useTheme } from "next-themes"
import Link from "next/link"

interface DashboardProps {
  onLogout?: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [goals, setGoals] = useState(mockGoals)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      try {
        // Simulate successful data loading
        setIsLoaded(true)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.")
        setIsLoading(false)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const addGoal = (goal: Goal) => {
    setGoals([...goals, goal])
  }

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
  }

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header onLogout={onLogout} />

      {isLoaded && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-screen-lg mx-auto px-4 py-4 space-y-4"
        >
          {/* Welcome Banner */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to Your Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                  Track your goals, monitor your productivity patterns, and get insights to optimize your workflow.
                </p>
              </div>
              <button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
                Take a Tour
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <GoalSection
                goals={goals}
                onAddGoal={addGoal}
                onUpdateGoal={updateGoal}
                onDeleteGoal={deleteGoal}
                isPremium={isPremium}
              />
              <MoodAnalytics moodData={mockMoodData} productiveHours={mockProductiveHours} insights={mockAIInsights} />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <AIAssistant initialMessages={mockChatMessages} />
            </motion.div>
          </div>

          {/* Logout Link */}
          <div className="pt-2">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (onLogout) onLogout()
              }}
              className="inline-flex items-center text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Logout
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
