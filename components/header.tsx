"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  Settings,
  User,
  Volume2,
  Moon,
  LogOut,
  HelpCircle,
  Sun,
  Shield,
  Download,
  Upload,
  Lock,
  CreditCard,
  FileDown,
  Star,
  Sparkles,
  Mail,
  Menu,
  X,
  Search,
  Home,
  BarChart2,
  Calendar,
  Users,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Import the useRoute hook at the top of the file with other imports
import { useRoute } from "@/hooks/use-route"

// Update the Header component props
interface HeaderProps {
  onLogout?: () => void
}

interface NotificationItemProps {
  title: string
  description: string
  time: string
  isNew: boolean
  onRead?: () => void
}

function NotificationItem({ title, description, time, isNew, onRead }: NotificationItemProps) {
  return (
    <div
      className={`p-4 hover:bg-muted/50 ${isNew ? "bg-primary/5" : ""} cursor-pointer transition-colors duration-200`}
      onClick={onRead}
    >
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      {isNew && <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2"></span>}
    </div>
  )
}

function Header({ onLogout }: HeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notificationSound] = useState(typeof Audio !== "undefined" ? new Audio("/notification.mp3") : null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes, set to true
  const [isPremium, setIsPremium] = useState(false) // Premium subscription status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Goal Completed",
      description: "You've completed 'Website Redesign'!",
      time: "Just now",
      isNew: true,
    },
    {
      id: "2",
      title: "Productivity Insight",
      description: "Your focus peaks between 10-11am",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: "3",
      title: "Task Reminder",
      description: "'Create social media graphics' is due today",
      time: "Yesterday",
      isNew: false,
    },
  ])

  // Add state for tracking actions
  const [isActionInProgress, setIsActionInProgress] = useState(false)
  // Add this with the other state variables
  const [showTour, setShowTour] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; title: string; type: string; description: string }>
  >([])

  // Replace the router.pathname checks with the useRoute hook
  // First, add this line after the useState declarations (around line 110):
  const currentPath = useRoute()

  // Improve the generatePDFReport function with proper error handling
  const generatePDFReport = () => {
    setIsActionInProgress(true)
    console.log("Generating PDF report...")

    // In a real app, this would call a backend API to generate a PDF
    try {
      // Simulate PDF generation and download
      setTimeout(() => {
        console.log("PDF generated successfully!")
        // Create a fake download link
        const link = document.createElement("a")
        link.href = "#"
        link.download = "zenflow-productivity-report.pdf"
        link.click()

        // Show success message
        alert("Your productivity report has been downloaded!")
        setIsActionInProgress(false)
      }, 1500)
    } catch (err) {
      console.error("Error generating PDF:", err)
      alert("Failed to generate PDF report. Please try again.")
      setIsActionInProgress(false)
    }
  }

  // Improve the upgradeToPremium function with proper error handling
  const upgradeToPremium = () => {
    setIsActionInProgress(true)
    try {
      // In a real app, this would process payment and update subscription status
      setTimeout(() => {
        setIsPremium(true)
        setShowSubscriptionDialog(false)
        console.log("Upgraded to premium subscription!")
        alert("Successfully upgraded to Premium! Enjoy your new features.")
        setIsActionInProgress(false)
      }, 1000)
    } catch (err) {
      console.error("Error upgrading to premium:", err)
      alert("Failed to upgrade to premium. Please try again.")
      setIsActionInProgress(false)
    }
  }

  // Play notification sound when a new notification arrives
  const playNotificationSound = () => {
    if (soundEnabled && notificationSound) {
      notificationSound.play().catch((err) => console.error("Error playing sound:", err))
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    console.log(`Dark mode ${theme !== "dark" ? "enabled" : "disabled"}`)
  }

  // Toggle notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    console.log(`Notifications ${!notificationsEnabled ? "enabled" : "disabled"}`)
  }

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    console.log(`Sound ${!soundEnabled ? "enabled" : "disabled"}`)
  }

  // Update the handleLogout function with proper error handling
  const handleLogout = () => {
    setIsActionInProgress(true)
    console.log("Logging out...")

    try {
      // In a real app, you would clear auth tokens, cookies, etc.
      setTimeout(() => {
        setIsLoggedIn(false)

        // Call the onLogout prop if provided
        if (onLogout) {
          onLogout()
        } else {
          // Fallback to router navigation if onLogout is not provided
          router.push("/")
        }
        setIsActionInProgress(false)
      }, 500)
    } catch (err) {
      console.error("Error logging out:", err)
      alert("Failed to log out. Please try again.")
      setIsActionInProgress(false)
    }
  }

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Logging in...")
    setIsLoggedIn(true)
    setShowLoginDialog(false)
    // In a real app, you would validate credentials and set auth tokens
  }

  // Handle signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signing up...")
    setIsLoggedIn(true)
    setShowSignupDialog(false)
    // In a real app, you would create a new account and set auth tokens
  }

  // Animation variants
  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  }

  // Add this function with the other functions
  const handleTourClick = () => {
    setShowTour(true)
    // In a real app, you would trigger a tour library or custom tour implementation
    console.log("Tour started")

    // For demo purposes, we'll just show an alert
    alert("Welcome to the ZenFlow Dashboard Tour! This would be an interactive tour in a production app.")
    setShowTour(false)
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
      console.log("Searching for:", searchKeyword)

      // In a real app, you would fetch actual search results from an API
      // For now, we'll generate mock results based on the keyword
      const mockResults = [
        {
          id: "1",
          title: `${searchKeyword} Project Plan`,
          type: "Project",
          description: `Project plan related to ${searchKeyword}`,
        },
        {
          id: "2",
          title: `${searchKeyword} Meeting Notes`,
          type: "Document",
          description: `Meeting notes discussing ${searchKeyword} implementation`,
        },
        {
          id: "3",
          title: `${searchKeyword} Task`,
          type: "Task",
          description: `Complete the ${searchKeyword} task by next week`,
        },
        {
          id: "4",
          title: `${searchKeyword} Analytics`,
          type: "Report",
          description: `Performance metrics for ${searchKeyword}`,
        },
      ]

      setSearchResults(mockResults)
    }
  }

  return (
    <>
      <header className="bg-background border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Back button - only show on Calendar, Analytics, and Team pages */}
              {(currentPath === "/calendar" || currentPath === "/analytics" || currentPath === "/team") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2 hover:bg-muted/50 text-foreground/80 hover:text-primary"
                  onClick={() => router.push("/dashboard")}
                  aria-label="Back to Dashboard"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Return to Dashboard
                </Button>
              )}
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  ZenFlow
                </span>
              </div>

              {/* Navigation buttons for Calendar, Analytics, and Team */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/dashboard" passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-foreground/80 hover:text-primary hover:bg-muted/50 ${
                    currentPath === "/dashboard" ? "bg-muted text-primary" : ""
                  }`}
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/calendar" passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-foreground/80 hover:text-primary hover:bg-muted/50 ${
                    currentPath === "/calendar" ? "bg-muted text-primary" : ""
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Calendar
                </Button>
              </Link>
              <Link href="/analytics" passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-foreground/80 hover:text-primary hover:bg-muted/50 ${
                    currentPath === "/analytics" ? "bg-muted text-primary" : ""
                  }`}
                >
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
              </Link>
              <Link href="/team" passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-foreground/80 hover:text-primary hover:bg-muted/50 ${
                    currentPath === "/team" ? "bg-muted text-primary" : ""
                  }`}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Team
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-1">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted/50 text-foreground/80 hover:text-primary"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Notifications */}
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative hover:bg-muted/50 text-foreground/80 hover:text-primary"
                    >
                      <Bell className="h-5 w-5" />
                      {notificationsEnabled && notifications.some((n) => n.isNew) && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                      )}
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between p-4">
                      <h3 className="font-medium">Notifications</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-primary hover:bg-primary/20"
                        onClick={() => {
                          // Mark all notifications as read
                          setNotifications(
                            notifications.map((notification) => ({
                              ...notification,
                              isNew: false,
                            })),
                          )
                          // Show confirmation toast or feedback
                          console.log("All notifications marked as read")
                        }}
                      >
                        Mark all as read
                      </Button>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      <AnimatePresence>
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <NotificationItem
                                title={notification.title}
                                description={notification.description}
                                time={notification.time}
                                isNew={notification.isNew}
                                onRead={() => {
                                  setNotifications(
                                    notifications.map((n) => (n.id === notification.id ? { ...n, isNew: false } : n)),
                                  )
                                }}
                              />
                            </motion.div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
                        )}
                      </AnimatePresence>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-primary hover:bg-primary/20"
                        onClick={() => {
                          // Navigate to notifications page or expand the list
                          console.log("View all notifications clicked")
                          // In a real app, you would use router.push('/notifications') or similar
                        }}
                      >
                        View all notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Settings */}
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted/50 text-foreground/80 hover:text-primary"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Settings</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => console.log("Settings saved")}
                      >
                        Save
                      </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => console.log("Profile settings clicked")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Notifications</span>
                        </div>
                        <Switch
                          id="notifications"
                          checked={notificationsEnabled}
                          onCheckedChange={toggleNotifications}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Volume2 className="mr-2 h-4 w-4" />
                          <span>Sound</span>
                        </div>
                        <Switch id="sound" checked={soundEnabled} onCheckedChange={toggleSound} />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center justify-between">
                        <div className="flex items-center">
                          {theme === "dark" ? (
                            <Sun className="mr-2 h-4 w-4 text-yellow-400" />
                          ) : (
                            <Moon className="mr-2 h-4 w-4 text-primary" />
                          )}
                          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                        </div>
                        <Switch
                          id="dark-mode"
                          checked={theme === "dark"}
                          onCheckedChange={toggleDarkMode}
                          className={theme === "dark" ? "bg-primary" : ""}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* User Profile */}
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 overflow-hidden border border-primary p-0"
                    >
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                      <span className="sr-only">User profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center p-2">
                      <div className="rounded-full h-10 w-10 overflow-hidden mr-2 border border-primary/30">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Alex Johnson</p>
                        <p className="text-xs text-muted-foreground">alex@example.com</p>
                      </div>
                      {isPremium && (
                        <Badge className="ml-auto bg-amber-500 hover:bg-amber-600">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => console.log("My Profile clicked")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>

                    {/* Account Settings Submenu */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-56">
                          <DropdownMenuItem onClick={() => setShowPrivacyDialog(true)}>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Privacy & Security</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={generatePDFReport}>
                            <FileDown className="mr-2 h-4 w-4" />
                            <span>Download Productivity Report</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setShowSubscriptionDialog(true)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Subscription Plan</span>
                            {!isPremium && <Badge className="ml-2 bg-primary hover:bg-primary/80">Upgrade</Badge>}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    {/* Help & Support Submenu */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help & Support</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-56">
                          <DropdownMenuItem onClick={() => setShowHelpDialog(true)}>
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Help Center</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log("Contact support clicked")}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Support</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => console.log("Backup data clicked")}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Backup Data</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log("Restore data clicked")}>
                            <Upload className="mr-2 h-4 w-4" />
                            <span>Restore Data</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="hover:bg-muted/50 text-foreground/80 hover:text-primary"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-b border-gray-200 dark:border-gray-700 absolute top-14 left-0 right-0 z-50"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  className={`justify-start ${currentPath === "/dashboard" ? "bg-muted text-primary" : ""}`}
                  onClick={() => {
                    router.push("/dashboard")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start ${currentPath === "/calendar" ? "bg-muted text-primary" : ""}`}
                  onClick={() => {
                    router.push("/calendar")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start ${currentPath === "/analytics" ? "bg-muted text-primary" : ""}`}
                  onClick={() => {
                    router.push("/analytics")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start ${currentPath === "/team" ? "bg-muted text-primary" : ""}`}
                  onClick={() => {
                    router.push("/team")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </Button>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    router.push("/profile")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    router.push("/settings")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-red-600"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    if (onLogout) onLogout()
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 left-0 right-0 bg-background border-b border-gray-200 dark:border-gray-700 p-4 z-50"
            >
              <div className="container mx-auto">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center">
                    <Search className="h-5 w-5 mr-2 text-muted-foreground" />
                    <Input
                      placeholder="Search tasks, goals, or insights..."
                      className="flex-1 bg-background"
                      autoFocus
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="sm" className="ml-2">
                      Search
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchKeyword("")
                        setSearchResults([])
                      }}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSearchKeyword("Website redesign")
                        // Simulate form submission
                        const mockEvent = { preventDefault: () => {} } as React.FormEvent
                        setTimeout(() => handleSearch(mockEvent), 0)
                      }}
                    >
                      Website redesign
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSearchKeyword("Productivity report")
                        // Simulate form submission
                        const mockEvent = { preventDefault: () => {} } as React.FormEvent
                        setTimeout(() => handleSearch(mockEvent), 0)
                      }}
                    >
                      Productivity report
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSearchKeyword("Team meeting")
                        // Simulate form submission
                        const mockEvent = { preventDefault: () => {} } as React.FormEvent
                        setTimeout(() => handleSearch(mockEvent), 0)
                      }}
                    >
                      Team meeting
                    </Badge>
                  </div>
                </div>
                {searchResults.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium mb-2">Search Results</h3>
                      <span className="text-xs text-muted-foreground">{searchResults.length} results found</span>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto rounded-md border p-1 shadow-sm">
                      {searchResults.map((result, index) => {
                        // Determine icon based on result type
                        let Icon = Search
                        if (result.type === "Project") Icon = Calendar
                        if (result.type === "Document") Icon = FileDown
                        if (result.type === "Task") Icon = BarChart2
                        if (result.type === "Report") Icon = Users

                        return (
                          <div
                            key={result.id}
                            tabIndex={0}
                            role="button"
                            aria-label={`${result.title} - ${result.type}`}
                            className="p-3 rounded-md hover:bg-muted/80 focus:bg-muted/80 focus:outline-none cursor-pointer transition-colors flex items-start gap-3"
                            onClick={() => {
                              console.log("Selected result:", result)

                              // Navigate to appropriate existing pages based on result type
                              switch (result.type) {
                                case "Project":
                                  router.push("/team") // Projects are managed in the Team page
                                  break
                                case "Document":
                                  router.push("/dashboard") // Documents can be viewed from Dashboard
                                  break
                                case "Task":
                                  router.push("/calendar") // Tasks are related to Calendar
                                  break
                                case "Report":
                                  router.push("/analytics") // Reports are in Analytics
                                  break
                                default:
                                  router.push("/dashboard") // Default to dashboard
                              }

                              // Close the search overlay after navigation
                              setIsSearchOpen(false)
                              setSearchKeyword("")
                              setSearchResults([])
                            }}
                            onKeyDown={(e) => {
                              // Handle keyboard navigation
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                console.log("Selected result:", result)

                                // Navigate to appropriate existing pages based on result type
                                switch (result.type) {
                                  case "Project":
                                    router.push("/team") // Projects are managed in the Team page
                                    break
                                  case "Document":
                                    router.push("/dashboard") // Documents can be viewed from Dashboard
                                    break
                                  case "Task":
                                    router.push("/calendar") // Tasks are related to Calendar
                                    break
                                  case "Report":
                                    router.push("/analytics") // Reports are in Analytics
                                    break
                                  default:
                                    router.push("/dashboard") // Default to dashboard
                                }

                                setIsSearchOpen(false)
                                setSearchKeyword("")
                                setSearchResults([])
                              }
                            }}
                          >
                            <div className="mt-0.5 bg-muted/50 p-2 rounded-md">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium truncate">{result.title}</h4>
                                <Badge variant="outline" className="text-xs ml-2 shrink-0">
                                  {result.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.description}</p>
                              {/* Highlight matching keywords */}
                              {searchKeyword.trim() && (
                                <div className="mt-1.5 flex items-center text-xs text-primary">
                                  <Search className="h-3 w-3 mr-1" />
                                  <span>Matches: "{searchKeyword}"</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // In a real app, this would navigate to a full search results page
                          console.log("View all results for:", searchKeyword)
                        }}
                      >
                        View all results
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login to ZenFlow</DialogTitle>
            <DialogDescription>Enter your credentials to access your dashboard.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowLoginDialog(false)
                  setShowSignupDialog(true)
                }}
              >
                Create Account
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                Login
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create ZenFlow Account</DialogTitle>
            <DialogDescription>Sign up to start tracking your productivity and goals.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignup}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowSignupDialog(false)
                  setShowLoginDialog(true)
                }}
              >
                Already have an account?
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                Sign Up
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>ZenFlow Help Center</DialogTitle>
            <DialogDescription>Find answers to common questions and learn how to use ZenFlow.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Getting Started</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn the basics of ZenFlow and how to set up your first goal.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Goal Management</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create, edit, and track your goals with our intuitive interface.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">AI Assistant</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get the most out of the AI assistant with these tips and tricks.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Data Backup & Restore</h3>
                <p className="text-sm text-muted-foreground mt-1">Learn how to backup and restore your ZenFlow data.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Troubleshooting</h3>
                <p className="text-sm text-muted-foreground mt-1">Common issues and how to resolve them.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setShowHelpDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy & Security Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Privacy & Security Settings</DialogTitle>
            <DialogDescription>Manage your privacy preferences and security settings.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="privacy">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="privacy" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Data Collection</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow ZenFlow to collect usage data to improve services
                    </p>
                  </div>
                  <Switch id="data-collection" defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">AI Personalization</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to learn from your habits for better suggestions
                    </p>
                  </div>
                  <Switch id="ai-personalization" defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Third-Party Integrations</h3>
                    <p className="text-sm text-muted-foreground">Allow connections with third-party services</p>
                  </div>
                  <Switch id="third-party" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-2">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm" onClick={() => console.log("Enable 2FA clicked")}>
                    <Lock className="mr-2 h-4 w-4" />
                    Enable 2FA
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Update your password regularly for better security
                  </p>
                  <Button variant="outline" size="sm" onClick={() => console.log("Change password clicked")}>
                    Change Password
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium">Login Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-2">Manage your active sessions</p>
                  <Button variant="outline" size="sm" onClick={() => console.log("Manage sessions clicked")}>
                    Manage Sessions
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="button" onClick={() => setShowPrivacyDialog(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Subscription Dialog */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="sm:max-w-[600px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
              Premium Subscription
            </DialogTitle>
            <DialogDescription>Upgrade to ZenFlow Premium for exclusive features.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="border rounded-lg p-4 bg-background border-border">
              <h3 className="font-medium text-lg mb-2 flex items-center text-foreground">
                Free Plan
                <Badge className="ml-2 bg-gray-500">Current</Badge>
              </h3>
              <p className="text-sm text-foreground/80 mb-4">Basic productivity tracking</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Goal tracking</span>
                </li>
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Basic AI assistant</span>
                </li>
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Task management</span>
                </li>
                <li className="flex items-start text-foreground/60">
                  <span className="mr-2">✗</span>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <Button variant="secondary" disabled>
                Current Plan
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-background border-border">
              <h3 className="font-medium text-lg mb-2 flex items-center text-foreground">
                Premium Plan
                <Badge className="ml-2 bg-amber-500">Recommended</Badge>
              </h3>
              <p className="text-sm text-foreground/80 mb-4">Unlock advanced features and boost your productivity</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Unlimited goal tracking</span>
                </li>
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Advanced AI assistant</span>
                </li>
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start text-foreground">
                  <span className="mr-2">✓</span>
                  <span>Customizable reports</span>
                </li>
              </ul>
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={upgradeToPremium}
                disabled={isActionInProgress}
              >
                {isActionInProgress ? "Processing..." : "Upgrade Now"}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowSubscriptionDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { Header }
export default Header
