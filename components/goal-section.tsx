"use client"

import { useState } from "react"
import { Plus, X, CheckCircle, Target, Calendar, Clock, Lock } from "lucide-react"
import type { Goal, Task } from "@/lib/types"
import { GoalCard } from "@/components/goal-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { v4 as uuidv4 } from "uuid"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"

interface GoalSectionProps {
  goals: Goal[]
  onAddGoal: (goal: Goal) => void
  onUpdateGoal: (goal: Goal) => void
  onDeleteGoal: (goalId: string) => void
  isPremium?: boolean
}

export function GoalSection({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, isPremium = false }: GoalSectionProps) {
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false)
  const [showGoalDetailsDialog, setShowGoalDetailsDialog] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [newGoalDescription, setNewGoalDescription] = useState("")
  const [newGoalPriority, setNewGoalPriority] = useState("Medium")
  const [newGoalMood, setNewGoalMood] = useState(70)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const { t } = useTranslation()

  // Add validation for the new goal form
  const validateGoalForm = () => {
    if (!newGoalTitle.trim()) {
      alert(t("goalSection.enterTitle", "Please enter a goal title"))
      return false
    }

    if (newGoalMood < 1 || newGoalMood > 100) {
      alert(t("goalSection.moodRange", "Mood must be between 1 and 100"))
      return false
    }

    return true
  }

  // Update the handleAddGoal function to include validation
  const handleAddGoal = () => {
    if (!validateGoalForm()) return

    const newGoal: Goal = {
      id: uuidv4(),
      title: newGoalTitle,
      description: newGoalDescription,
      priority: newGoalPriority as "High" | "Medium" | "Low",
      mood: newGoalMood,
      tasks: [],
      createdAt: new Date().toISOString(),
    }

    onAddGoal(newGoal)
    resetNewGoalForm()
    setShowAddGoalDialog(false)
  }

  const resetNewGoalForm = () => {
    setNewGoalTitle("")
    setNewGoalDescription("")
    setNewGoalPriority("Medium")
    setNewGoalMood(70)
  }

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal)
    setShowGoalDetailsDialog(true)
  }

  // Update the handleAddTask function to include validation
  const handleAddTask = () => {
    if (!selectedGoal || !newTaskTitle.trim()) {
      if (!newTaskTitle.trim()) {
        alert(t("goalSection.enterTaskTitle", "Please enter a task title"))
      }
      return
    }

    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    const updatedGoal = {
      ...selectedGoal,
      tasks: [...selectedGoal.tasks, newTask],
    }

    onUpdateGoal(updatedGoal)
    setSelectedGoal(updatedGoal)
    setNewTaskTitle("")
  }

  const handleToggleTask = (taskId: string) => {
    if (!selectedGoal) return

    const updatedTasks = selectedGoal.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    )

    const updatedGoal = {
      ...selectedGoal,
      tasks: updatedTasks,
    }

    onUpdateGoal(updatedGoal)
    setSelectedGoal(updatedGoal)
  }

  const handleDeleteTask = (taskId: string) => {
    if (!selectedGoal) return

    const updatedTasks = selectedGoal.tasks.filter((task) => task.id !== taskId)

    const updatedGoal = {
      ...selectedGoal,
      tasks: updatedTasks,
    }

    onUpdateGoal(updatedGoal)
    setSelectedGoal(updatedGoal)
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
    <>
      <Card className="mb-6 theme-transition border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold text-foreground flex items-center">
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Target className="h-5 w-5 text-primary" />
            </div>
            Goals
            {!isPremium && goals.length >= 5 && (
              <Badge variant="outline" className="ml-2 flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Limit Reached
              </Badge>
            )}
          </CardTitle>
          <Button
            onClick={() => setShowAddGoalDialog(true)}
            className="bg-primary hover:bg-primary/90 text-white"
            disabled={!isPremium && goals.length >= 5}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Goal
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {goals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4 border-2 border-dashed border-primary/20 rounded-xl"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Goals Yet</h3>
              <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                Create your first goal to start tracking your progress
              </p>
              <Button onClick={() => setShowAddGoalDialog(true)} className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="h-4 w-4 mr-1" /> Create First Goal
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {goals.map((goal) => (
                <motion.div key={goal.id} variants={itemVariants}>
                  <GoalCard
                    goal={goal}
                    onClick={() => handleGoalClick(goal)}
                    onUpdate={onUpdateGoal}
                    onDelete={onDeleteGoal}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog open={showAddGoalDialog} onOpenChange={setShowAddGoalDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text">Add New Goal</DialogTitle>
            <DialogDescription>Create a new goal to track your progress</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="Enter goal title"
                className="bg-background"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="goal-description">Description</Label>
              <Textarea
                id="goal-description"
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                placeholder="Enter goal description"
                rows={3}
                className="bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-priority">Priority</Label>
                <Select value={newGoalPriority} onValueChange={setNewGoalPriority}>
                  <SelectTrigger id="goal-priority" className="bg-background">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-mood">Initial Mood</Label>
                <Input
                  id="goal-mood"
                  type="number"
                  min="1"
                  max="100"
                  value={newGoalMood}
                  onChange={(e) => setNewGoalMood(Number.parseInt(e.target.value))}
                  className="bg-background"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddGoalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal} className="bg-primary hover:bg-primary/90 text-white">
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Goal Details Dialog */}
      <Dialog open={showGoalDetailsDialog} onOpenChange={setShowGoalDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedGoal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold gradient-text">{selectedGoal.title}</DialogTitle>
                <DialogDescription>{selectedGoal.description || "No description provided"}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-foreground flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                    Tasks
                  </h3>
                  <div className="flex items-center text-sm text-foreground/70">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created {new Date(selectedGoal.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  <AnimatePresence>
                    {selectedGoal.tasks.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6 border-2 border-dashed border-primary/20 rounded-xl"
                      >
                        <p className="text-foreground/70">No tasks yet</p>
                      </motion.div>
                    ) : (
                      selectedGoal.tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-background hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <Checkbox
                              id={`task-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => handleToggleTask(task.id)}
                              className="mr-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label
                              htmlFor={`task-${task.id}`}
                              className={`text-sm ${
                                task.completed ? "line-through text-foreground/50" : "text-foreground"
                              }`}
                            >
                              {task.title}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-foreground/50 mr-2">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTask(task.id)}
                              className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-100"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center mt-4">
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add new task"
                    className="flex-1 mr-2 bg-background"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTask()
                      }
                    }}
                  />
                  <Button onClick={handleAddTask} className="bg-primary hover:bg-primary/90 text-white">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Task</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
