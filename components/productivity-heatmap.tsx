"use client"
import type { ProductiveHour } from "@/lib/types"
import { useTheme } from "next-themes"

interface ProductivityHeatmapProps {
  data: ProductiveHour[]
}

export function ProductivityHeatmap({ data }: ProductivityHeatmapProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const hours = [9, 10, 11, 12, 1, 2, 3, 4, 5]
  const hourLabels = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

  const getProductivity = (day: string, hour: number) => {
    const fullDay =
      day === "Mon"
        ? "Monday"
        : day === "Tue"
          ? "Tuesday"
          : day === "Wed"
            ? "Wednesday"
            : day === "Thu"
              ? "Thursday"
              : "Friday"

    const entry = data.find((d) => d.day === fullDay && d.hour === (hour <= 5 ? hour + 12 : hour))
    return entry ? entry.productivity : 0
  }

  const getColorForProductivity = (productivity: number) => {
    if (productivity >= 90) return "bg-green-500"
    if (productivity >= 80) return "bg-green-400"
    if (productivity >= 70) return "bg-green-300"
    if (productivity >= 60) return "bg-yellow-300"
    if (productivity >= 50) return "bg-yellow-200"
    return "bg-gray-200 dark:bg-gray-700"
  }

  const getTextColorForProductivity = (productivity: number) => {
    if (productivity >= 70) return "text-white"
    return isDark ? "text-gray-200" : "text-gray-800"
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="w-12"></th>
            {hourLabels.map((hour) => (
              <th key={hour} className="text-xs font-normal text-center text-gray-500 dark:text-gray-400 py-1">
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1">{day}</td>
              {hours.map((hour) => {
                const productivity = getProductivity(day, hour)
                return (
                  <td key={`${day}-${hour}`} className="p-1">
                    <div
                      className={`h-8 w-full rounded flex items-center justify-center text-xs font-medium ${getColorForProductivity(
                        productivity,
                      )} ${getTextColorForProductivity(productivity)}`}
                    >
                      {productivity}%
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
