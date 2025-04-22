"use client"

import { useRef, useEffect } from "react"
import type { MoodData } from "@/lib/types"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useTheme } from "next-themes"

interface MoodChartProps {
  data: MoodData[]
}

export function MoodChart({ data }: MoodChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartRef = useRef(null)

  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
    productivity: item.productivity,
    mood: item.mood,
  }))

  // Animation for chart
  useEffect(() => {
    if (chartRef.current) {
      const paths = chartRef.current.querySelectorAll("path.recharts-line-curve")
      paths.forEach((path) => {
        const length = path.getTotalLength()
        path.style.transition = "none"
        path.style.strokeDasharray = `${length} ${length}`
        path.style.strokeDashoffset = length
        path.getBoundingClientRect()
        path.style.transition = "stroke-dashoffset 1.5s ease-in-out"
        path.style.strokeDashoffset = "0"
      })
    }
  }, [data])

  return (
    <div className="w-full h-full" ref={chartRef}>
      <ChartContainer
        config={{
          productivity: {
            label: "Productivity",
            color: "#4f46e5",
          },
          mood: {
            label: "Mood",
            color: "#0ea5e9",
          },
        }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-md shadow-lg">
                      <p className="font-medium">{data.date}</p>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
                          <span>Productivity: {data.productivity}%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
                          <span>Mood: {data.mood}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="productivity"
              stroke="#4f46e5"
              fillOpacity={1}
              fill="url(#productivityGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#0ea5e9"
              fillOpacity={1}
              fill="url(#moodGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
