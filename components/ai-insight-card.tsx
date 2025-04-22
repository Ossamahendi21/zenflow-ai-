"use client"

import { Lightbulb, TrendingUp, Smile, Target } from "lucide-react"
import type { AIInsight } from "@/lib/types"

interface AIInsightCardProps {
  insight: AIInsight
}

export function AIInsightCard({ insight }: AIInsightCardProps) {
  const getIcon = () => {
    switch (insight.type) {
      case "productivity":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "mood":
        return <Smile className="h-5 w-5 text-yellow-500" />
      case "goal":
        return <Target className="h-5 w-5 text-green-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-1">{getIcon()}</div>
        <div>
          <h4 className="text-sm font-semibold">{insight.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.description}</p>
        </div>
      </div>
    </div>
  )
}
