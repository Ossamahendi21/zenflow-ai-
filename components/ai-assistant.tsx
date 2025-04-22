"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import type { ChatMessage } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

interface AIAssistantProps {
  initialMessages: ChatMessage[]
}

export function AIAssistant({ initialMessages }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I've analyzed your productivity patterns. You seem to be most productive in the mornings between 10-11am. Try scheduling your most important tasks during this peak performance window.",
        "Based on your mood data, I notice you feel better when you complete tasks early in the day. Consider front-loading your to-do list with quick wins to build momentum.",
        "Your goal completion rate is improving! You've increased from 65% to 78% in the past two weeks. Keep up the good work and remember to take short breaks between tasks to maintain focus.",
        "Looking at your recent tasks, you might benefit from batching similar activities together to reduce context switching. This could save you up to 40% of your productive time.",
        "I've noticed you've been working late hours. Remember that adequate rest is crucial for maintaining high productivity levels. Consider implementing a firm cutoff time for work.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Hello! How can I help you today?</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-primary text-white ml-2"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mr-2"
                  }`}
                >
                  {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-start max-w-[80%]">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mr-2 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI assistant..."
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="bg-background"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
