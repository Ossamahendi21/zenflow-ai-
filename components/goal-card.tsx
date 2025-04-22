"use client"

import type React from "react"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import type { Goal } from "@/lib/types"
import { getPriorityEmoji } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "@/components/progress-ring"
import { motion } from "framer-motion"

interface GoalCardProps {
  goal: Goal
  onClick: () => void
  onUpdate: (goal: Goal) => void
  onDelete: (goalId: string) => void
}

export function GoalCard({ goal, onClick, onUpdate, onDelete }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(goal.title)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate({ ...goal, title })
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setTitle(goal.title)
      setIsEditing(false)
    }
  }

  const completedTasks = goal.tasks.filter((task) => task.completed).length
  const totalTasks = goal.tasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full p-1 text-base font-medium border-b-2 border-primary focus:outline-none bg-transparent"
                autoFocus
              />
            ) : (
              <h3
                className="text-base font-medium cursor-pointer hover:text-primary transition-colors line-clamp-2"
                onClick={onClick}
              >
                {goal.title}
              </h3>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(goal.id)} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-xs">
              {getPriorityEmoji(goal.priority)} {goal.priority}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {completedTasks}/{totalTasks} tasks
          </div>
        </div>

        <div className="flex justify-center my-4">
          <ProgressRing
            progress={progressPercentage}
            size={80}
            strokeWidth={8}
            circleColor="rgba(0,0,0,0.05)"
            progressColor="hsl(var(--primary))"
          />
        </div>

        <div className="mt-4 text-center">
          <Button variant="ghost" className="text-primary text-sm w-full" onClick={onClick}>
            View Tasks
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
