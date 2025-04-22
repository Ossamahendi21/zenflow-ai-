"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ModernDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-screen-lg mx-auto space-y-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to Your Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                Track your goals, monitor your productivity patterns, and get insights to optimize your workflow.
              </p>
            </div>
            <button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Take a Tour
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No data yet</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Your insights will show up here after you start tracking goals.
            </p>
          </div>
        </div>

        {/* Additional Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                Create a new goal
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                Track your mood
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                View productivity tips
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Create your first goal to start tracking progress</li>
              <li>Log your daily mood to see patterns over time</li>
              <li>Check in regularly to maintain your productivity streak</li>
              <li>Review insights to optimize your workflow</li>
            </ol>
          </div>
        </div>

        {/* Logout Link */}
        <div className="pt-2">
          <Link
            href="/logout"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}
