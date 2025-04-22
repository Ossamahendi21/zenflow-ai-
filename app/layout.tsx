import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ZenFlow - AI-Powered Productivity Dashboard",
  description:
    "Track your goals, monitor your productivity patterns, and get AI-powered insights to optimize your workflow.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  )
}
