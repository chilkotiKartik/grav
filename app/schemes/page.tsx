"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { AIGuideBot } from "@/components/ai-guide-bot"
import {
  Search,
  Filter,
  CheckCircle,
  ChevronRight,
  Download,
  FileText,
  Users,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Leaf,
  ArrowRight,
} from "lucide-react"

// Dynamically import the Lottie player with SSR disabled
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
})

// Mock schemes data
const schemes = [
  {
    id: 1,
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Financial support to farmer families across the country",
    eligibility: "All small and marginal farmers with cultivable land",
    benefits: "₹6,000 per year in three equal installments",
    documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
    applicationProcess: "Online through PM-Kisan portal or through Common Service Centers",
    icon: Leaf,
    color: "green",
  },
  {
    id: 2,
    title: "Pradhan Mantri Awas Yojana",
    category: "Housing",
    description: "Housing for All initiative providing affordable housing",
    eligibility: "Economically Weaker Section (EWS) and Low Income Group (LIG) households",
    benefits: "Financial assistance up to ₹2.67 lakh for house construction",
    documents: ["Aadhaar Card", "Income Certificate", "Land Documents"],
    applicationProcess: "Apply through local municipal office or online portal",
    icon: Home,
    color: "blue",
  },
  {
    id: 3,
    title: "National Pension Scheme",
    category: "Financial",
    description: "Voluntary retirement savings scheme for citizens",
    eligibility: "Indian citizens between 18-65 years of age",
    benefits: "Tax benefits and retirement corpus",
    documents: ["Aadhaar Card", "PAN Card", "Bank Account Details"],
    applicationProcess: "Apply through banks, post offices, or online",
    icon: Users,
    color: "purple",
  },
  {
    id: 4,
    title: "Ayushman Bharat",
    category: "Healthcare",
    description: "Health insurance scheme providing coverage for medical expenses",
    eligibility: "Economically vulnerable families as per SECC database",
    benefits: "Health coverage up to ₹5 lakh per family per year",
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    applicationProcess: "Apply through Ayushman Bharat centers or hospitals",
    icon: Heart,
    color: "red",
  },
  {
    id: 5,
    title: "PM Mudra Yojana",
    category: "Financial",
    description: "Loans for non-corporate, non-farm small/micro enterprises",
    eligibility: "Small business owners and entrepreneurs",
    benefits: "Loans up to ₹10 lakh without collateral",
    documents: ["Aadhaar Card", "Business Plan", "Bank Account Details"],
    applicationProcess: "Apply through banks, MFIs, or online portal",
    icon: Briefcase,
    color: "amber",
  },
  {
    id: 6,
    title: "National Scholarship Portal",
    category: "Education",
    description: "Scholarships for students from minority communities and economically backward classes",
    eligibility: "Students with family income below specified limits",
    benefits: "Financial assistance for education expenses",
    documents: ["Aadhaar Card", "Income Certificate", "Educational Certificates"],
    applicationProcess: "Apply online through National Scholarship Portal",
    icon: GraduationCap,
    color: "indigo",
  },
]

export default function SchemesPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedScheme, setSelectedScheme] = useState<any>(null)
  const [showEligibilityQuiz, setShowEligibilityQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({})
  const [quizResult, setQuizResult] = useState<{ eligible: boolean; score: number } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter schemes based on search query and category
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || scheme.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const handleSchemeSelect = (scheme: any) => {
    setSelectedScheme(scheme)
    setShowEligibilityQuiz(false)
    setQuizResult(null)
    setQuizAnswers({})
  }

  const handleStartQuiz = () => {
    setShowEligibilityQuiz(true)
  }

  const handleQuizAnswer = (questionId: string, value: boolean) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmitQuiz = () => {
    // Calculate how many "yes" answers
    const yesCount = Object.values(quizAnswers).filter((answer) => answer === true).length
    const totalQuestions = Object.keys(quizAnswers).length

    // Calculate score as percentage
    const score = Math.round((yesCount / totalQuestions) * 100)

    // Determine eligibility (for demo purposes, >70% yes answers means eligible)
    const eligible = score >= 70

    setQuizResult({ eligible, score })

    toast({
      title: eligible ? "Good news!" : "We're sorry",
      description: eligible
        ? "Based on your answers, you appear to be eligible for this scheme."
        : "Based on your answers, you may not be eligible for this scheme.",
      variant: eligible ? "default" : "destructive",
    })
  }

  const handleApply = () => {
    toast({
      title: "Application Started",
      description: "Your application for this scheme has been initiated.",
    })
  }

  const handleDownloadInfo = () => {
    toast({
      title: "Information Downloaded",
      description: "Scheme information has been downloaded to your device.",
    })
  }

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-heading">Government Schemes</h1>
              <p className="text-muted-foreground">Explore and apply for various government schemes and benefits</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes..."
                  className="pl-10 canva-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] canva-input">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="canva-dropdown">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md canva-tabs">
              <TabsTrigger value="all" className="canva-tab">
                All Schemes
              </TabsTrigger>
              <TabsTrigger value="popular" className="canva-tab">
                Popular
              </TabsTrigger>
              <TabsTrigger value="new" className="canva-tab">
                New
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {filteredSchemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme) => (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      className={`h-full canva-card cursor-pointer hover:shadow-lg transition-all duration-300 ${
                        selectedScheme?.id === scheme.id ? "border-2 border-primary" : ""
                      }`}
                      onClick={() => handleSchemeSelect(scheme)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className={`p-2 rounded-full bg-${scheme.color}-100 dark:bg-${scheme.color}-900/30`}>
                            <scheme.icon className={`h-5 w-5 text-${scheme.color}-600 dark:text-${scheme.color}-400`} />
                          </div>
                          <Badge variant="outline">{scheme.category}</Badge>
                        </div>
                        <CardTitle className="mt-3">{scheme.title}</CardTitle>
                        <CardDescription>{scheme.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Eligibility:</span>
                            <span className="font-medium text-right">{scheme.eligibility.substring(0, 30)}...</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Benefits:</span>
                            <span className="font-medium text-right">{scheme.benefits.substring(0, 30)}...</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full" onClick={() => handleSchemeSelect(scheme)}>
                          View Details <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Schemes Found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any schemes matching your search criteria.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {selectedScheme ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Card className="canva-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div
                        className={`p-2 rounded-full bg-${selectedScheme.color}-100 dark:bg-${selectedScheme.color}-900/30`}
                      >
                        <selectedScheme.icon
                          className={`h-5 w-5 text-${selectedScheme.color}-600 dark:text-${selectedScheme.color}-400`}
                        />
                      </div>
                      <Badge variant="outline">{selectedScheme.category}</Badge>
                    </div>
                    <CardTitle className="mt-3">{selectedScheme.title}</CardTitle>
                    <CardDescription>{selectedScheme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Eligibility</h3>
                      <p className="text-sm">{selectedScheme.eligibility}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Benefits</h3>
                      <p className="text-sm">{selectedScheme.benefits}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Required Documents</h3>
                      <ul className="text-sm space-y-1">
                        {selectedScheme.documents.map((doc: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Application Process</h3>
                      <p className="text-sm">{selectedScheme.applicationProcess}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3">
                    {!showEligibilityQuiz && !quizResult && (
                      <Button className="w-full canva-button" onClick={handleStartQuiz}>
                        Check Eligibility
                      </Button>
                    )}
                    <Button variant="outline" className="w-full" onClick={handleDownloadInfo}>
                      <Download className="mr-2 h-4 w-4" /> Download Information
                    </Button>
                    {quizResult && (
                      <Button
                        className={`w-full ${quizResult.eligible ? "bg-green-600 hover:bg-green-700" : "bg-muted"}`}
                        disabled={!quizResult.eligible}
                        onClick={handleApply}
                      >
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                {showEligibilityQuiz && !quizResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mt-6 canva-card">
                      <CardHeader>
                        <CardTitle>Eligibility Quiz</CardTitle>
                        <CardDescription>Answer these questions to check your eligibility</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="q1"
                              checked={quizAnswers.q1 || false}
                              onCheckedChange={(checked) => handleQuizAnswer("q1", checked === true)}
                              className="canva-checkbox mt-1"
                            />
                            <Label htmlFor="q1" className="text-sm">
                              Do you have all the required documents listed above?
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="q2"
                              checked={quizAnswers.q2 || false}
                              onCheckedChange={(checked) => handleQuizAnswer("q2", checked === true)}
                              className="canva-checkbox mt-1"
                            />
                            <Label htmlFor="q2" className="text-sm">
                              {selectedScheme.category === "Agriculture" &&
                                "Do you own or cultivate agricultural land?"}
                              {selectedScheme.category === "Housing" &&
                                "Is your annual household income below ₹3 lakh?"}
                              {selectedScheme.category === "Financial" && "Are you between 18-65 years of age?"}
                              {selectedScheme.category === "Healthcare" &&
                                "Is your family listed in the SECC database?"}
                              {selectedScheme.category === "Education" &&
                                "Are you currently enrolled in an educational institution?"}
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="q3"
                              checked={quizAnswers.q3 || false}
                              onCheckedChange={(checked) => handleQuizAnswer("q3", checked === true)}
                              className="canva-checkbox mt-1"
                            />
                            <Label htmlFor="q3" className="text-sm">
                              Do you have an active bank account linked with Aadhaar?
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="q4"
                              checked={quizAnswers.q4 || false}
                              onCheckedChange={(checked) => handleQuizAnswer("q4", checked === true)}
                              className="canva-checkbox mt-1"
                            />
                            <Label htmlFor="q4" className="text-sm">
                              {selectedScheme.category === "Agriculture" &&
                                "Is your land holding less than 2 hectares?"}
                              {selectedScheme.category === "Housing" &&
                                "Do you or your family members not own a pucca house?"}
                              {selectedScheme.category === "Financial" && "Do you have a business plan or idea?"}
                              {selectedScheme.category === "Healthcare" &&
                                "Has your family not been covered under any other health scheme?"}
                              {selectedScheme.category === "Education" &&
                                "Have you scored above 60% in your last examination?"}
                            </Label>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full canva-button"
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(quizAnswers).length < 4}
                        >
                          Check Eligibility
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {quizResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mt-6 canva-card">
                      <CardHeader>
                        <CardTitle>Eligibility Result</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-center">
                          {quizResult.eligible ? (
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                            </div>
                          ) : (
                            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                              <FileText className="h-12 w-12 text-red-600 dark:text-red-400" />
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold mb-2">
                            {quizResult.eligible ? "You appear to be eligible!" : "You may not be eligible"}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {quizResult.eligible
                              ? "Based on your answers, you meet the basic eligibility criteria for this scheme."
                              : "Based on your answers, you may not meet all the eligibility criteria for this scheme."}
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Eligibility Score</span>
                            <span className="font-medium">{quizResult.score}%</span>
                          </div>
                          <Progress
                            value={quizResult.score}
                            className={quizResult.eligible ? "bg-green-600" : "bg-red-600"}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowEligibilityQuiz(true)
                            setQuizResult(null)
                          }}
                        >
                          Retake Quiz
                        </Button>
                        {quizResult.eligible && (
                          <Button onClick={handleApply} className="bg-green-600 hover:bg-green-700">
                            Apply Now
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <Card className="h-full">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
                  {mounted && (
                    <Player
                      autoplay
                      loop
                      src="/animations/education.json"
                      style={{ height: "200px", width: "200px" }}
                    />
                  )}
                  <h3 className="text-xl font-bold mt-4 mb-2">Select a Scheme</h3>
                  <p className="text-muted-foreground">
                    Choose a government scheme from the list to view details and check your eligibility.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* AI Guide Bot */}
      <AIGuideBot />
    </div>
  )
}
