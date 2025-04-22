"use client"

import { useState, useEffect } from "react"

export function useRoute() {
  const [currentPath, setCurrentPath] = useState<string>("")

  useEffect(() => {
    // Set the initial path
    setCurrentPath(window.location.pathname)

    // Update the path when it changes
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname)
    }

    // Listen for popstate events (browser back/forward buttons)
    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return currentPath
}
