"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Download, CheckCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

interface LandingPageProps {
  onLogin: () => void
}

// 3D Model Component
function ZenFlowLogo() {
  // This is a placeholder for a real 3D model
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#8B5CF6" metalness={0.6} roughness={0.2} />
    </mesh>
  )
}

// Animated Feature Card
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl hover-lift card-3d"
    >
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

// Testimonial Card
const TestimonialCard = ({ quote, author, role, company, image, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl hover-lift"
    >
      <div className="flex items-start mb-4">
        <div className="text-4xl text-primary">"</div>
      </div>
      <p className="text-foreground mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={image || "/placeholder.svg"} alt={author} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Company Logo
const CompanyLogo = ({ src, alt, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center justify-center p-4"
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity"
      />
    </motion.div>
  )
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [downloadStarted, setDownloadStarted] = useState(false)

  // Scroll animation
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reveal elements on scroll
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal")
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = revealElements[i].getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("active")
        }
      }
    }
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll()
    return () => window.removeEventListener("scroll", revealOnScroll)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    console.log("Logging in with:", email, password)
    setIsAuthDialogOpen(false)
    onLogin()
  }

  const handleSignup = (e) => {
    e.preventDefault()
    console.log("Signing up with:", name, email, password)
    setIsAuthDialogOpen(false)
    onLogin()
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    console.log("Password reset requested for:", resetEmail)
    setResetSent(true)
    setTimeout(() => {
      setResetSent(false)
      setIsForgotPasswordOpen(false)
    }, 3000)
  }

  const handleDownloadApp = () => {
    console.log("Downloading mobile app...")
    setDownloadStarted(true)

    // Create a fake download link for the APK
    const link = document.createElement("a")
    link.href = "/zenflow-app.apk" // This would be a real APK file in production
    link.download = "zenflow-app.apk"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      setDownloadStarted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold gradient-text">ZenFlow</span>
                <span className="ml-1 text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full">AI</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-foreground/80 hover:text-primary transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">
                Pricing
              </a>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab("login")
                  setIsAuthDialogOpen(true)
                }}
              >
                Log in
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  setActiveTab("signup")
                  setIsAuthDialogOpen(true)
                }}
              >
                Sign up
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#features"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveTab("login")
                    setIsAuthDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    setActiveTab("signup")
                    setIsAuthDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section with 3D Element */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Organize Your Life</span> with AI-Powered Productivity
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-foreground/80">
                ZenFlow AI helps you achieve more with less stress through intelligent task management, mood tracking,
                and personalized insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gradient-btn bg-gradient-to-r from-primary via-accent to-secondary text-white px-8 py-6 rounded-full text-lg font-medium"
                  onClick={() => {
                    setActiveTab("signup")
                    setIsAuthDialogOpen(true)
                  }}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 rounded-full text-lg font-medium border-2"
                  onClick={handleDownloadApp}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download App
                </Button>
              </div>

              <div className="mt-8 flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-2 text-zen-success" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 mr-2 text-zen-success" />
                <span>14-day free trial</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 mr-2 text-zen-success" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative h-[500px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] float-animation">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ZenFlowLogo />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                  </Canvas>
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="absolute -bottom-10 -right-10 w-[350px] shadow-2xl rounded-lg overflow-hidden border border-border hover-lift">
                <img src="/placeholder.svg?height=200&width=350" alt="ZenFlow Dashboard Preview" className="w-full" />
              </div>

              {/* Mobile App Preview */}
              <div className="absolute -top-10 -left-10 w-[200px] shadow-2xl rounded-lg overflow-hidden border border-border hover-lift">
                <img src="/placeholder.svg?height=400&width=200" alt="ZenFlow Mobile App" className="w-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator"></div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl font-medium text-foreground/70 mb-8">Trusted by innovative teams at:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <CompanyLogo src="/placeholder.svg?height=40&width=120" alt="Microsoft" delay={0.1} />
            <CompanyLogo src="/placeholder.svg?height=40&width=120" alt="Adobe" delay={0.2} />
            <CompanyLogo src="/placeholder.svg?height=40&width=120" alt="Shopify" delay={0.3} />
            <CompanyLogo src="/placeholder.svg?height=40&width=120" alt="Spotify" delay={0.4} />
            <CompanyLogo src="/placeholder.svg?height=40&width=120" alt="Slack" delay={0.5} />
            <CompanyLogo src="/placeholder.svg?height=40&width=120" alt="Airbnb" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Supercharge Your Productivity</h2>
            <p className="text-xl text-foreground/80">
              ZenFlow combines cutting-edge AI with intuitive design to help you achieve more with less stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
              title="Smart Task Management"
              description="Organize tasks with AI-powered prioritization that adapts to your work style and energy levels."
              delay={0.1}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
              title="Mood & Productivity Analytics"
              description="Track how your mood affects productivity with beautiful visualizations and actionable insights."
              delay={0.2}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="AI-Powered Assistant"
              description="Get personalized productivity tips and insights from your AI assistant that learns your habits."
              delay={0.3}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Smart Reminders"
              description="Never miss a deadline with context-aware reminders that know when you're most likely to complete tasks."
              delay={0.4}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Secure & Private"
              description="Your data is encrypted and never shared. We prioritize your privacy and security above all else."
              delay={0.5}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Cross-Platform Sync"
              description="Access your tasks and insights from any device with real-time synchronization across web and mobile."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Users Say</h2>
            <p className="text-xl text-foreground/80">
              Thousands of professionals trust ZenFlow to boost their productivity and well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ZenFlow has completely transformed how I manage my workday. The AI insights are scary accurate and have helped me identify when I'm most productive."
              author="Sarah Johnson"
              role="Product Manager"
              company="Shopify"
              image="/placeholder.svg?height=48&width=48"
              delay={0.1}
            />
            <TestimonialCard
              quote="As a freelancer juggling multiple clients, ZenFlow has been a game-changer. The mood tracking helped me realize I was overworking myself and make better scheduling decisions."
              author="Michael Chen"
              role="Freelance Designer"
              company="Self-employed"
              image="/placeholder.svg?height=48&width=48"
              delay={0.2}
            />
            <TestimonialCard
              quote="Our entire team uses ZenFlow now. The productivity insights have helped us schedule meetings during optimal times and respect everyone's focus periods."
              author="Jessica Williams"
              role="Engineering Lead"
              company="Adobe"
              image="/placeholder.svg?height=48&width=48"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Simple, Transparent Pricing</h2>
            <p className="text-xl text-foreground/80">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden hover-lift"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">Basic</h3>
                <p className="text-muted-foreground mb-6">Perfect for individuals</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Task management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Basic mood tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Weekly productivity report</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Mobile app access</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground"
                  onClick={() => {
                    setActiveTab("signup")
                    setIsAuthDialogOpen(true)
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden hover-lift relative border-2 border-primary"
            >
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
                Most Popular
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-muted-foreground mb-6">For professionals</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Advanced AI insights</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Detailed productivity analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Smart reminders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Calendar integration</span>
                  </li>
                </ul>
                <Button
                  className="w-full gradient-btn bg-gradient-to-r from-primary via-accent to-secondary text-white"
                  onClick={() => {
                    setActiveTab("signup")
                    setIsAuthDialogOpen(true)
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </motion.div>

            {/* Team Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden hover-lift"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">Team</h3>
                <p className="text-muted-foreground mb-6">For teams of all sizes</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Team collaboration features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Team productivity insights</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Admin dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zen-success mr-2 shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground"
                  onClick={() => {
                    setActiveTab("signup")
                    setIsAuthDialogOpen(true)
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-accent to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already improved their work-life balance with ZenFlow.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 rounded-full text-lg font-medium"
            onClick={() => {
              setActiveTab("signup")
              setIsAuthDialogOpen(true)
            }}
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-sm text-white/80">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex-shrink-0 mb-6">
                <span className="text-2xl font-bold gradient-text">ZenFlow</span>
                <span className="ml-1 text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full">AI</span>
              </div>
              <p className="text-muted-foreground mb-4">AI-powered productivity for the modern professional.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} ZenFlow AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text text-center">
              {activeTab === "login" ? "Welcome Back" : "Join ZenFlow"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {activeTab === "login"
                ? "Log in to your ZenFlow account to continue your productivity journey."
                : "Create your account and start your 14-day free trial."}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs text-primary"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsForgotPasswordOpen(true)
                      }}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-btn bg-gradient-to-r from-primary via-accent to-secondary text-white"
                >
                  Log In
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                    </svg>
                    Apple
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-btn bg-gradient-to-r from-primary via-accent to-secondary text-white"
                >
                  Create Account
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text text-center">Reset Password</DialogTitle>
            <DialogDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>

          {resetSent ? (
            <div className="py-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-zen-success/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-zen-success" />
              </div>
              <h3 className="text-lg font-medium mb-2">Reset Link Sent!</h3>
              <p className="text-muted-foreground">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check
                your spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <Button
                type="submit"
                className="w-full gradient-btn bg-gradient-to-r from-primary via-accent to-secondary text-white"
              >
                Send Reset Link
              </Button>
            </form>
          )}

          <DialogFooter>
            <Button
              variant="link"
              className="w-full"
              onClick={() => {
                setIsForgotPasswordOpen(false)
                setResetSent(false)
              }}
            >
              Back to login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Started Toast */}
      {downloadStarted && (
        <div className="fixed bottom-4 right-4 bg-zen-success text-white p-4 rounded-lg shadow-lg flex items-center z-50 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle className="h-5 w-5 mr-2" />
          <div>
            <p className="font-medium">Download Started!</p>
            <p className="text-sm">ZenFlow mobile app is downloading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
