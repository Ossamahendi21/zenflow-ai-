"use client"

import * as React from "react"
import { BarChart as Bar, LineChart as Line, DonutChart as Donut } from "@tremor/react"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
  showAnimation?: boolean
  showGridLines?: boolean
  showTooltip?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  className?: string
  [key: string]: any
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { config?: Record<string, any> }
>(({ className, config, ...props }, ref) => <div ref={ref} className={className} {...props} />)
ChartContainer.displayName = "ChartContainer"

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth,
  showLegend = true,
  showAnimation = true,
  showGridLines = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  className,
  ...props
}: ChartProps) {
  return (
    <Bar
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      valueFormatter={valueFormatter}
      yAxisWidth={yAxisWidth}
      showLegend={showLegend}
      showAnimation={showAnimation}
      showGridLines={showGridLines}
      showTooltip={showTooltip}
      showXAxis={showXAxis}
      showYAxis={showYAxis}
      className={className}
      {...props}
    />
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth,
  showLegend = true,
  showAnimation = true,
  showGridLines = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  className,
  ...props
}: ChartProps) {
  return (
    <Line
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      valueFormatter={valueFormatter}
      yAxisWidth={yAxisWidth}
      showLegend={showLegend}
      showAnimation={showAnimation}
      showGridLines={showGridLines}
      showTooltip={showTooltip}
      showXAxis={showXAxis}
      showYAxis={showYAxis}
      className={className}
      {...props}
    />
  )
}

export function PieChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = true,
  showAnimation = true,
  showTooltip = true,
  className,
  ...props
}: ChartProps) {
  return (
    <Donut
      data={data}
      index={index}
      category={categories[0]} // DonutChart takes a single category, not an array
      colors={colors}
      valueFormatter={valueFormatter}
      showLabel={showLegend}
      showAnimation={showAnimation}
      showTooltip={showTooltip}
      className={className}
      {...props}
    />
  )
}
