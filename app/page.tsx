"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/components/user-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Shield, FileText, Search, BookOpen, MessageSquare, LogIn } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { ModeToggle } from "@/components/mode-toggle"
import dynamic from "next/dynamic"

// Dynamically import the Lottie player with SSR disabled
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
})

export default function HomePage() {
  const { user } = useUser()
  const router = useRouter()

  // Redirect logged-in users to their dashboard
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "citizen":
          router.push("/citizen-dashboard")
          break
        case "officer":
          router.push("/officer-dashboard")
          break
        case "admin":
          router.push("/admin-dashboard")
          break
        case "analyst":
          router.push("/analyst-dashboard")
          break
      }
    }
  }, [user, router])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="rounded-full bg-gradient-to-r from-primary to-secondary p-1.5 shadow-lg"
              >
                <Shield className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                GrievX
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <ModeToggle />
              <Button asChild variant="default" size="sm" className="rounded-full shadow-md canva-button">
                <a href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Your Voice for Civic Change
                </h1>
                <p className="mt-4 text-xl text-muted-foreground">
                  Report issues, track progress, and help build a better community with GrievX.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" asChild className="rounded-full shadow-lg">
                  <a href="/login">Get Started</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full">
                  <a href="#features">Learn More</a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Player autoplay loop src="/animations/hero-animation.json" style={{ height: "400px", width: "400px" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How GrievX Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to report civic issues, track their progress, and see real change in your
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>File Complaint</CardTitle>
                <CardDescription>Submit issues with our easy-to-use form</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report any civic issue with details, location, and supporting evidence. Our smart system categorizes
                  and routes your complaint to the right department.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <a href="/file-complaint">File a Complaint</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-t-4 border-t-purple-500">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <Search className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>Monitor the status of your complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get real-time updates on your complaints. See which department is handling it, current status, and
                  estimated resolution time.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <a href="/track-complaint">Track Complaint</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Learn & Educate</CardTitle>
                <CardDescription>Access educational resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Explore our educational content to learn about civic rights, fraud detection, and community
                  organizing. Earn points and badges as you learn.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <a href="/education">Education Hub</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-t-4 border-t-orange-500">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>Join Townhalls</CardTitle>
                <CardDescription>Participate in community discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Engage with officials and fellow citizens in virtual townhalls. Discuss community issues, suggest
                  solutions, and stay informed about upcoming initiatives.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <a href="/townhall">Join Townhall</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-1.5">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">GrievX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A platform for citizens to report and track civic issues, engage with officials, and build better
                communities.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/file-complaint" className="text-muted-foreground hover:text-foreground">
                    File Complaint
                  </a>
                </li>
                <li>
                  <a href="/track-complaint" className="text-muted-foreground hover:text-foreground">
                    Track Complaint
                  </a>
                </li>
                <li>
                  <a href="/education" className="text-muted-foreground hover:text-foreground">
                    Education Hub
                  </a>
                </li>
                <li>
                  <a href="/townhall" className="text-muted-foreground hover:text-foreground">
                    Townhall
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Email: support@grievx.gov.in</li>
                <li className="text-muted-foreground">Phone: +91 1800-XXX-XXXX</li>
                <li className="text-muted-foreground">Address: Government Complex, New Delhi</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 GrievX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
