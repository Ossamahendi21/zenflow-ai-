"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import LandingPage from "@/components/landing-page"
import Dashboard from "@/components/dashboard"
import DashboardSkeleton from "@/components/dashboard-skeleton"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Check if there's a 'dashboard' query parameter to show the dashboard directly
    const showDashboard = searchParams.get("dashboard")
    if (showDashboard === "true") {
      setIsLoggedIn(true)
    }

    // Check if we're on the dashboard route
    const pathname = window.location.pathname
    if (pathname === "/dashboard") {
      setIsLoggedIn(true)
    }
  }, [searchParams])

  // Function to handle login/logout
  const handleLoginStateChange = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      router.push("/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <main>
      {isLoggedIn ? (
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard onLogout={() => handleLoginStateChange(false)} />
        </Suspense>
      ) : (
        <LandingPage onLogin={() => handleLoginStateChange(true)} />
      )}
    </main>
  )
}
