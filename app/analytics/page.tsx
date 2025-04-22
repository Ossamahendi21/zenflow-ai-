import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnalyticsPage() {
  // Sample data for charts
  const productivityData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 75 },
    { name: "Wed", value: 85 },
    { name: "Thu", value: 70 },
    { name: "Fri", value: 60 },
    { name: "Sat", value: 40 },
    { name: "Sun", value: 30 },
  ]

  const moodData = [
    { name: "Mon", value: 70 },
    { name: "Tue", value: 65 },
    { name: "Wed", value: 80 },
    { name: "Thu", value: 75 },
    { name: "Fri", value: 85 },
    { name: "Sat", value: 90 },
    { name: "Sun", value: 85 },
  ]

  const taskCompletionData = [
    { name: "Completed", value: 68 },
    { name: "In Progress", value: 22 },
    { name: "Not Started", value: 10 },
  ]

  const goalCategoriesData = [
    { name: "Work", value: 45 },
    { name: "Personal", value: 30 },
    { name: "Health", value: 15 },
    { name: "Learning", value: 10 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Productivity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/35</div>
            <p className="text-xs text-muted-foreground">68% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 due this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="productivity" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="productivity">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Productivity</CardTitle>
              <CardDescription>Your productivity score over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart
                data={productivityData}
                index="name"
                categories={["value"]}
                colors={["#8b5cf6"]}
                valueFormatter={(value) => `${value}%`}
                yAxisWidth={40}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mood">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends</CardTitle>
              <CardDescription>Your mood score over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart
                data={moodData}
                index="name"
                categories={["value"]}
                colors={["#0ea5e9"]}
                valueFormatter={(value) => `${value}%`}
                yAxisWidth={40}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
              <CardDescription>Breakdown of your task status</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PieChart
                data={taskCompletionData}
                index="name"
                categories={["value"]}
                colors={["#22c55e", "#f59e0b", "#ef4444"]}
                valueFormatter={(value) => `${value}%`}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Goal Categories</CardTitle>
              <CardDescription>Distribution of your goals by category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PieChart
                data={goalCategoriesData}
                index="name"
                categories={["value"]}
                colors={["#8b5cf6", "#0ea5e9", "#22c55e", "#f59e0b"]}
                valueFormatter={(value) => `${value}%`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Insights</CardTitle>
            <CardDescription>AI-generated insights based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Peak Productivity Time</p>
                  <p className="text-sm text-muted-foreground">
                    You're most productive between 10-11am. Schedule important tasks during this time.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Task Completion Pattern</p>
                  <p className="text-sm text-muted-foreground">
                    You complete 30% more tasks on Wednesday than other days.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Break Optimization</p>
                  <p className="text-sm text-muted-foreground">
                    Taking short breaks every 90 minutes could improve your productivity by 15%.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mood Analysis</CardTitle>
            <CardDescription>Factors affecting your mood and productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="font-medium">Task Completion Impact</p>
                  <p className="text-sm text-muted-foreground">
                    Completing high-priority tasks improves your mood by an average of 20%.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="font-medium">Weekend Recovery</p>
                  <p className="text-sm text-muted-foreground">
                    Your mood peaks on weekends, suggesting good work-life balance.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="font-medium">Stress Indicators</p>
                  <p className="text-sm text-muted-foreground">
                    Your mood tends to decrease when you have more than 8 tasks due in a day.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
