"use client"

import type { MoodData, ProductiveHour, AIInsight } from "@/lib/types"
import { MoodChart } from "@/components/mood-chart"
import { ProductivityHeatmap } from "@/components/productivity-heatmap"
import { AIInsightCard } from "@/components/ai-insight-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface MoodAnalyticsProps {
  moodData: MoodData[]
  productiveHours: ProductiveHour[]
  insights: AIInsight[]
}

export function MoodAnalytics({ moodData, productiveHours, insights }: MoodAnalyticsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setIsLoading(false)
      } catch (err) {
        console.error("Error loading mood analytics data:", err)
        setError("Failed to load mood analytics data. Please try again.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Mood Analytics</h2>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md mb-4">
          {error}
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => {
              setError(null)
              setIsLoading(true)
              setTimeout(() => setIsLoading(false), 500)
            }}
          >
            Retry
          </Button>
        </div>
      )}

      <Tabs
        defaultValue="mood"
        className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <TabsList className="w-full border-b border-gray-200 dark:border-gray-700 rounded-t-lg rounded-b-none p-0">
          <TabsTrigger value="mood" className="flex-1 rounded-none rounded-tl-lg py-3">
            Weekly Mood Trends
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex-1 rounded-none py-3">
            Productive Hours
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex-1 rounded-none rounded-tr-lg py-3">
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="p-4">
          <div className="h-[300px]">
            <MoodChart data={moodData} />
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="p-4">
          <ProductivityHeatmap data={productiveHours} />
        </TabsContent>

        <TabsContent value="insights" className="p-4">
          <div className="grid grid-cols-1 gap-4">
            {insights.map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
