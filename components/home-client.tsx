"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Search,
  BarChart3,
  Shield,
  Users,
  ChevronRight,
  Award,
  Lightbulb,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import { Testimonial } from "@/components/testimonial"
import { StatCard } from "@/components/stat-card"
import { FeatureCard } from "@/components/feature-card"
import { mockComplaints, mockTestimonials, mockStats } from "@/lib/mock-data"

// Dynamically import components that use browser APIs
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
  loading: () => <div className="h-[250px] w-[250px] bg-muted/20 rounded-md animate-pulse" />,
})

// Simple animation components that don't use framer-motion
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
    >
      {children}
    </div>
  )
}

export default function HomeClient() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const heroRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate opacity and transform based on scroll
  const heroOpacity = Math.max(1 - scrollY / 500, 0)
  const heroScale = Math.max(1 - scrollY / 2000, 0.8)
  const heroY = scrollY / 4

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything on the server
  if (!mounted) {
    return <HomeLoading />
  }

  // Filter complaints based on active tab
  const filteredComplaints = mockComplaints
    .filter((complaint) => {
      if (activeTab === "all") return true
      return complaint.category.toLowerCase() === activeTab.toLowerCase()
    })
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 md:py-32 overflow-hidden hero-pattern"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale}) translateY(${heroY}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.2} className="space-y-6">
              <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full mb-4 animate-pulse-glow">
                Empowering Citizens with AI
              </Badge>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Your Voice, <span className="gradient-text">Our Mission</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                GrievX empowers citizens to file complaints, detect fraud, and track cases with AI-powered insights for
                a more transparent civic system.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full animate-pulse-glow">
                  <Link href="/file-complaint">
                    <FileText className="mr-2 h-5 w-5" /> File a Complaint
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/track-complaint">
                    <Search className="mr-2 h-5 w-5" /> Track My Case
                  </Link>
                </Button>

                <Button asChild variant="ghost" size="lg" className="rounded-full">
                  <Link href="/fraud-detector">
                    <Shield className="mr-2 h-5 w-5" /> Detect Fraud
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-4 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((id) => (
                    <Avatar key={id} className="border-2 border-background w-8 h-8">
                      <AvatarImage src={`/avatars/${id}.png`} alt="User" />
                      <AvatarFallback>U{id}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">2,500+</span> citizens using GrievX
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-background rounded-2xl overflow-hidden">
                  {mounted && (
                    <Player
                      autoplay
                      loop
                      src="/animations/hero-animation.json"
                      style={{ height: "500px", width: "500px" }}
                    />
                  )}
                </div>

                <FadeIn delay={0.8} className="absolute -right-6 top-10 glass rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Complaint Resolved</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={1} className="absolute -left-6 bottom-10 glass rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fraud Detected</p>
                      <p className="text-xs text-muted-foreground">High confidence</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Citizens with Technology</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines AI, data visualization, and community engagement to create a more transparent civic
              system.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Complaints Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              Community Activity
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Complaints</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what issues citizens are reporting in your community
            </p>
          </FadeIn>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-5 max-w-2xl mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sanitation">Sanitation</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="corruption">Corruption</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredComplaints.map((complaint, index) => (
              <FadeIn key={complaint.id} delay={index * 0.1}>
                <Card className="h-full overflow-hidden card-hover shine">
                  <div className={`h-2 ${getStatusColor(complaint.status)}`} />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className={getStatusBadge(complaint.status)}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{complaint.date}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{complaint.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{complaint.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {complaint.category}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {complaint.subcategory}
                        </Badge>
                      </div>

                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/track-complaint?id=${complaint.id}`}>
                          Details <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button asChild>
              <Link href="/track-complaint">
                View All Complaints <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How GrievX Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process makes it easy to report issues and track their resolution
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.2} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-70"></div>
                    <div className="relative z-10 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                      <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className="absolute top-8 left-full w-full h-0.5 bg-blue-100 dark:bg-blue-900/30 -z-10 hidden md:block"
                        style={{ width: "calc(100% - 4rem)" }}
                      ></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Animation Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              Visual Guides
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See GrievX in Action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform makes civic engagement simple and effective
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {animations.map((animation, index) => (
              <FadeIn key={animation.title} delay={index * 0.2} className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl opacity-50"></div>
                    {mounted && (
                      <Player autoplay loop src={animation.src} style={{ height: "250px", width: "250px" }} />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{animation.title}</h3>
                <p className="text-muted-foreground">{animation.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Citizens Are Saying</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from people who have used GrievX to make a difference
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatarSrc={testimonial.avatarSrc}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make a difference?</h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of citizens who are using GrievX to create positive change in their communities.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/register">Create Your Account</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 rounded-full"
              >
                <Link href="/education">Learn More</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

// Loading skeleton for the home page
function HomeLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-6 bg-muted rounded w-32"></div>
              <div className="h-12 bg-muted rounded w-3/4 max-w-xl"></div>
              <div className="h-4 bg-muted rounded w-2/3 max-w-lg"></div>
              <div className="h-4 bg-muted rounded w-1/2 max-w-md"></div>
              <div className="flex space-x-4 mt-4">
                <div className="h-10 bg-muted rounded w-32"></div>
                <div className="h-10 bg-muted rounded w-32"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-[400px] w-[400px] bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-6 bg-muted rounded w-32 mx-auto mb-4"></div>
            <div className="h-10 bg-muted rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-background rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500"
    case "investigating":
      return "bg-blue-500"
    case "resolved":
      return "bg-green-500"
    case "rejected":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "investigating":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "resolved":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "rejected":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return ""
  }
}

const features = [
  {
    title: "File & Track Complaints",
    description: "Submit grievances through our intuitive multi-step form and track their progress in real-time.",
    icon: FileText,
    link: "/file-complaint",
  },
  {
    title: "AI Fraud Detection",
    description: "Our AI system identifies potential fraud in government schemes and subsidies.",
    icon: Shield,
    link: "/fraud-detector",
  },
  {
    title: "Data Visualization",
    description: "Interactive heatmaps and charts to visualize complaint trends and civic issues.",
    icon: BarChart3,
    link: "/analytics",
  },
  {
    title: "Community Engagement",
    description: "Participate in virtual townhalls and collaborate with fellow citizens.",
    icon: Users,
    link: "/townhall",
  },
  {
    title: "Gamified Citizen Dashboard",
    description: "Earn points and badges for civic participation and track your impact.",
    icon: Award,
    link: "/dashboard",
  },
  {
    title: "Educational Resources",
    description: "Learn about your rights, government schemes, and how to identify fraud.",
    icon: Lightbulb,
    link: "/education",
  },
]

const steps = [
  {
    title: "File a Complaint",
    description: "Submit your grievance through our easy-to-use form with all relevant details.",
    icon: FileText,
  },
  {
    title: "AI Analysis",
    description: "Our AI system analyzes your complaint and routes it to the appropriate department.",
    icon: Shield,
  },
  {
    title: "Track Progress",
    description: "Follow your case from submission to resolution with real-time updates.",
    icon: TrendingUp,
  },
]

const animations = [
  {
    title: "File Complaints",
    description: "Simple step-by-step process to submit your grievances",
    src: "/animations/file-complaint.json",
  },
  {
    title: "AI Analysis",
    description: "Advanced algorithms detect patterns and potential fraud",
    src: "/animations/ai-analysis.json",
  },
  {
    title: "Track Progress",
    description: "Follow your case from submission to resolution",
    src: "/animations/track-progress.json",
  },
]
