import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/components/user-provider"
import { Toaster } from "@/components/ui/toaster"
import { AIGuideBot } from "@/components/ai-guide-bot"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "GrievX - Civic Grievance Portal",
  description: "A platform for citizens to report and track civic issues",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${fontSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserProvider>
            <main className="min-h-screen flex flex-col">{children}</main>
            <Toaster />
            <AIGuideBot />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
