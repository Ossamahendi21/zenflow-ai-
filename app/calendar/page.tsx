"use client"

import type React from "react"

import { ArrowLeft, CalendarIcon, Clock, Plus, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import Link from "next/link"
import { useState } from "react"

export default function CalendarPage() {
  // State for modals
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isEventOptionsModalOpen, setIsEventOptionsModalOpen] = useState(false)

  // Form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting",
    description: "",
  })

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: "2025-04-15",
      time: "10:00 AM - 11:00 AM",
      type: "meeting",
      description: "Weekly team sync to discuss project progress",
    },
    {
      id: 2,
      title: "Project Deadline",
      date: "2025-04-17",
      time: "All day",
      type: "deadline",
      description: "Final submission for the website redesign project",
    },
    {
      id: 3,
      title: "Client Call",
      date: "2025-04-16",
      time: "2:00 PM - 3:00 PM",
      type: "call",
      description: "Call with ABC Corp to discuss requirements",
    },
    {
      id: 4,
      title: "Review Goals",
      date: "2025-04-15",
      time: "3:30 PM - 4:30 PM",
      type: "task",
      description: "Quarterly goal review with the team",
    },
  ])

  // Handle form submission
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1
    const eventToAdd = {
      ...newEvent,
      id: newId,
    }
    setEvents([...events, eventToAdd])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "meeting",
      description: "",
    })
    setIsAddEventModalOpen(false)
  }

  // Handle event deletion
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id))
      setIsEventOptionsModalOpen(false)
      setSelectedEvent(null)
    }
  }

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
          <h1 className="text-2xl font-bold">Calendar</h1>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddEventModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => {
          const day = i - 3 // Offset to start from Monday
          const isToday = day === 15 // Assuming today is the 15th
          const hasEvents = events.some((event) => event.date.endsWith(`-${day}`))

          return (
            <div
              key={i}
              className={`border rounded-lg p-2 h-24 ${
                day <= 0 || day > 30 ? "bg-gray-50 dark:bg-gray-800/50" : ""
              } ${isToday ? "border-primary" : "border-gray-200 dark:border-gray-700"}`}
            >
              {day > 0 && day <= 30 && (
                <>
                  <div className={`text-right ${isToday ? "text-primary font-bold" : ""}`}>{day}</div>
                  {hasEvents && (
                    <div className="mt-1">
                      {events
                        .filter((event) => event.date.endsWith(`-${day}`))
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 mb-1 rounded bg-primary/10 text-primary truncate cursor-pointer hover:bg-primary/20"
                            onClick={() => {
                              setSelectedEvent(event)
                              setIsEventOptionsModalOpen(true)
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                      {events.filter((event) => event.date.endsWith(`-${day}`)).length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{events.filter((event) => event.date.endsWith(`-${day}`)).length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Clock className="h-4 w-4 mr-1" />
                {event.time}
              </div>
              {event.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{event.description}</p>
              )}
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <Badge
                className={
                  event.type === "meeting"
                    ? "bg-blue-500"
                    : event.type === "deadline"
                      ? "bg-red-500"
                      : event.type === "call"
                        ? "bg-green-500"
                        : "bg-purple-500"
                }
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                  setSelectedEvent(event)
                  setIsEventOptionsModalOpen(true)
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        title="Add New Event"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddEventModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="add-event-form" className="bg-primary hover:bg-primary/90">
              Add Event
            </Button>
          </div>
        }
      >
        <form id="add-event-form" onSubmit={handleAddEvent} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              placeholder="e.g. 10:00 AM - 11:00 AM or All day"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Event description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              rows={3}
            />
          </div>
        </form>
      </Modal>

      {/* Event Options Modal */}
      <Modal
        isOpen={isEventOptionsModalOpen}
        onClose={() => setIsEventOptionsModalOpen(false)}
        title="Event Options"
        footer={
          <div className="flex justify-between">
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete Event
            </Button>
            <Button onClick={() => setIsEventOptionsModalOpen(false)}>Close</Button>
          </div>
        }
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{selectedEvent.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedEvent.date} • {selectedEvent.time}
              </p>
            </div>
            <div>
              <Badge
                className={
                  selectedEvent.type === "meeting"
                    ? "bg-blue-500"
                    : selectedEvent.type === "deadline"
                      ? "bg-red-500"
                      : selectedEvent.type === "call"
                        ? "bg-green-500"
                        : "bg-purple-500"
                }
              >
                {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
              </Badge>
            </div>
            {selectedEvent.description && (
              <div>
                <p className="text-sm">{selectedEvent.description}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
