"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Mail, MoreHorizontal, Users, UserPlus, ArrowLeft, Trash, Edit, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import Link from "next/link"
import { useState } from "react"

export default function TeamPage() {
  // State for modals
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isMemberOptionsModalOpen, setIsMemberOptionsModalOpen] = useState(false)
  const [isProjectOptionsModalOpen, setIsProjectOptionsModalOpen] = useState(false)
  const [isViewTeamModalOpen, setIsViewTeamModalOpen] = useState(false)
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
  const [isViewProjectDetailsModalOpen, setIsViewProjectDetailsModalOpen] = useState(false)

  // Selected items
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Form states
  const [inviteEmail, setInviteEmail] = useState("")
  const [message, setMessage] = useState("")
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    avatar: "/placeholder.svg?height=40&width=40",
  })
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    dueDate: "",
  })

  const [editingProject, setEditingProject] = useState({
    id: 0,
    name: "",
    description: "",
    dueDate: "",
    members: 0,
    progress: 0,
  })

  // Sample team members data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      tasks: 12,
      completed: 8,
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "UI/UX Designer",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      tasks: 15,
      completed: 13,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Frontend Developer",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      tasks: 18,
      completed: 12,
    },
    {
      id: 4,
      name: "Jessica Lee",
      role: "Backend Developer",
      email: "jessica@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      tasks: 14,
      completed: 9,
    },
    {
      id: 5,
      name: "David Kim",
      role: "QA Engineer",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      tasks: 10,
      completed: 7,
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      role: "Project Coordinator",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      tasks: 8,
      completed: 5,
    },
  ])

  // Sample projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesigning the company website with new branding",
      members: 4,
      progress: 75,
      dueDate: "Apr 30, 2025",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Building a new mobile app for iOS and Android",
      members: 5,
      progress: 40,
      dueDate: "Jun 15, 2025",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q2 marketing campaign for new product launch",
      members: 3,
      progress: 60,
      dueDate: "May 10, 2025",
    },
  ])

  // Handle form submissions
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Invitation sent to: ${inviteEmail}`)
    setInviteEmail("")
    setIsInviteModalOpen(false)
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map((member) => member.id)) + 1 : 1
    const memberToAdd = {
      ...newMember,
      id: newId,
      status: "offline",
      tasks: 0,
      completed: 0,
    }
    setTeamMembers([...teamMembers, memberToAdd])
    setNewMember({
      name: "",
      email: "",
      role: "",
      avatar: "/placeholder.svg?height=40&width=40",
    })
    setIsAddMemberModalOpen(false)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Message sent to ${selectedMember?.name}: ${message}`)
    setMessage("")
    setIsMessageModalOpen(false)
  }

  const handleDeleteMember = () => {
    if (selectedMember) {
      setTeamMembers(teamMembers.filter((member) => member.id !== selectedMember.id))
      setIsMemberOptionsModalOpen(false)
      setSelectedMember(null)
    }
  }

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = projects.length > 0 ? Math.max(...projects.map((project) => project.id)) + 1 : 1
    const projectToAdd = {
      ...newProject,
      id: newId,
      members: 1,
      progress: 0,
    }
    setProjects([...projects, projectToAdd])
    setNewProject({
      name: "",
      description: "",
      dueDate: "",
    })
    setIsNewProjectModalOpen(false)
  }

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    setProjects(
      projects.map((project) =>
        project.id === editingProject.id
          ? {
              ...project,
              name: editingProject.name,
              description: editingProject.description,
              dueDate: editingProject.dueDate,
            }
          : project,
      ),
    )
    setIsEditProjectModalOpen(false)
  }

  const handleDeleteProject = () => {
    if (selectedProject) {
      setProjects(projects.filter((project) => project.id !== selectedProject.id))
      setIsProjectOptionsModalOpen(false)
      setSelectedProject(null)
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
          <h1 className="text-2xl font-bold">Team</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsInviteModalOpen(true)}>
            <Mail className="h-4 w-4 mr-2" />
            Invite
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddMemberModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <Tabs defaultValue="members" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">{member.email}</div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Tasks:</span>
                    <span className="ml-1">
                      {member.completed}/{member.tasks} completed
                    </span>
                    <div className="ml-2 h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${member.tasks > 0 ? (member.completed / member.tasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedMember(member)
                      setIsMessageModalOpen(true)
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setSelectedMember(member)
                      setIsMemberOptionsModalOpen(true)
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{project.members} members</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Due: {project.dueDate}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project)
                      setIsViewTeamModalOpen(true)
                    }}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    View Team
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setSelectedProject(project)
                      setIsProjectOptionsModalOpen(true)
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card
              className="flex flex-col items-center justify-center p-6 border-dashed hover:border-primary/50 hover:bg-muted/5 transition-colors cursor-pointer"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-4">Create New Project</p>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsNewProjectModalOpen(true)
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                New Project
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/50 rounded-lg p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Team Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Michael Chen" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Michael Chen</span> completed task{" "}
                <span className="font-medium">Implement user authentication</span>
              </p>
              <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Williams" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-yellow-500 ring-1 ring-white"></span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Sarah Williams</span> uploaded new design files for{" "}
                <span className="font-medium">Mobile App Development</span>
              </p>
              <p className="text-xs text-muted-foreground">Today at 9:15 AM</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Alex Johnson</span> created a new project{" "}
                <span className="font-medium">Marketing Campaign</span>
              </p>
              <p className="text-xs text-muted-foreground">Yesterday at 4:45 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="invite-form" className="bg-primary hover:bg-primary/90">
              Send Invitation
            </Button>
          </div>
        }
      >
        <form id="invite-form" onSubmit={handleInvite} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea id="message" placeholder="I'd like to invite you to join our team..." rows={3} />
          </div>
        </form>
      </Modal>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        title="Add Team Member"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddMemberModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="add-member-form" className="bg-primary hover:bg-primary/90">
              Add Member
            </Button>
          </div>
        }
      >
        <form id="add-member-form" onSubmit={handleAddMember} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member-email">Email Address</Label>
            <Input
              id="member-email"
              type="email"
              placeholder="john@example.com"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member-role">Role</Label>
            <Input
              id="member-role"
              placeholder="Developer"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={`Message to ${selectedMember?.name}`}
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsMessageModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="message-form" className="bg-primary hover:bg-primary/90">
              Send Message
            </Button>
          </div>
        }
      >
        <form id="message-form" onSubmit={handleSendMessage} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message-content">Message</Label>
            <Textarea
              id="message-content"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Member Options Modal */}
      <Modal
        isOpen={isMemberOptionsModalOpen}
        onClose={() => setIsMemberOptionsModalOpen(false)}
        title="Member Options"
        footer={
          <div className="flex justify-between">
            <Button variant="destructive" onClick={handleDeleteMember}>
              <Trash className="h-4 w-4 mr-1" />
              Remove Member
            </Button>
            <Button onClick={() => setIsMemberOptionsModalOpen(false)}>Close</Button>
          </div>
        }
      >
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
                <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{selectedMember.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMember.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsMemberOptionsModalOpen(false)
                  setIsMessageModalOpen(true)
                }}
              >
                <Mail className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-1" />
                Edit Details
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Team Modal */}
      <Modal
        isOpen={isViewTeamModalOpen}
        onClose={() => setIsViewTeamModalOpen(false)}
        title={`${selectedProject?.name} Team`}
        footer={<Button onClick={() => setIsViewTeamModalOpen(false)}>Close</Button>}
      >
        {selectedProject && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {selectedProject.members} team members are working on this project
            </p>
            <div className="space-y-3">
              {teamMembers.slice(0, selectedProject.members).map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsViewTeamModalOpen(false)
                      setSelectedMember(member)
                      setIsMessageModalOpen(true)
                    }}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Project Options Modal */}
      <Modal
        isOpen={isProjectOptionsModalOpen}
        onClose={() => setIsProjectOptionsModalOpen(false)}
        title="Project Options"
        footer={
          <div className="flex justify-between">
            <Button variant="destructive" onClick={handleDeleteProject}>
              <Trash className="h-4 w-4 mr-1" />
              Delete Project
            </Button>
            <Button onClick={() => setIsProjectOptionsModalOpen(false)}>Close</Button>
          </div>
        }
      >
        {selectedProject && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{selectedProject.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsProjectOptionsModalOpen(false)
                  setIsViewTeamModalOpen(true)
                }}
              >
                <Users className="h-4 w-4 mr-1" />
                View Team
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setEditingProject({
                    id: selectedProject.id,
                    name: selectedProject.name,
                    description: selectedProject.description,
                    dueDate: selectedProject.dueDate,
                    members: selectedProject.members,
                    progress: selectedProject.progress,
                  })
                  setIsProjectOptionsModalOpen(false)
                  setIsEditProjectModalOpen(true)
                }}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Project
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsProjectOptionsModalOpen(false)
                  setIsViewProjectDetailsModalOpen(true)
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Project"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsNewProjectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="new-project-form" className="bg-primary hover:bg-primary/90">
              Create Project
            </Button>
          </div>
        }
      >
        <form id="new-project-form" onSubmit={handleCreateProject} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="New Project"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-due-date">Due Date</Label>
            <Input
              id="project-due-date"
              placeholder="e.g. Jun 15, 2025"
              value={newProject.dueDate}
              onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditProjectModalOpen}
        onClose={() => setIsEditProjectModalOpen(false)}
        title="Edit Project"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditProjectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="edit-project-form" className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        }
      >
        <form id="edit-project-form" onSubmit={handleUpdateProject} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-project-name">Project Name</Label>
            <Input
              id="edit-project-name"
              value={editingProject.name}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-project-description">Description</Label>
            <Textarea
              id="edit-project-description"
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-project-due-date">Due Date</Label>
            <Input
              id="edit-project-due-date"
              value={editingProject.dueDate}
              onChange={(e) => setEditingProject({ ...editingProject, dueDate: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* View Project Details Modal */}
      <Modal
        isOpen={isViewProjectDetailsModalOpen}
        onClose={() => setIsViewProjectDetailsModalOpen(false)}
        title="Project Details"
        footer={<Button onClick={() => setIsViewProjectDetailsModalOpen(false)}>Close</Button>}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">{selectedProject.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Progress</span>
                <span className="text-sm">{selectedProject.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${selectedProject.progress}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Due Date</p>
                <p className="text-gray-600 dark:text-gray-300">{selectedProject.dueDate}</p>
              </div>
              <div>
                <p className="font-medium">Team Size</p>
                <p className="text-gray-600 dark:text-gray-300">{selectedProject.members} members</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p>Sarah Williams uploaded new design files</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Today at 9:15 AM</p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p>Michael Chen completed task "Implement user authentication"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday at 4:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
