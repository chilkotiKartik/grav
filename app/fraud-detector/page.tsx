"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Upload,
  Search,
  AlertTriangle,
  FileText,
  CreditCard,
  UserCheck,
  Building,
  Banknote,
} from "lucide-react"

// Dynamically import the Lottie Player to avoid SSR issues
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false })

export default function FraudDetectorPage() {
  const [activeTab, setActiveTab] = useState("detector")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any | null>(null)
  const [schemeType, setSchemeType] = useState("")
  const [description, setDescription] = useState("")
  const [mounted, setMounted] = useState(false)

  // Set mounted state after component mounts on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle fraud analysis
  const handleAnalyze = () => {
    if (!schemeType) return

    setIsAnalyzing(true)
    setAnalysisResult(null)

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false)

      // Mock results based on scheme type
      const results: Record<string, any> = {
        ews: {
          fraudRisk: "High",
          confidence: 92,
          reasons: [
            "Luxury car registered under same address",
            "Income tax returns show higher income than EWS limit",
            "Multiple properties registered under family members",
            "International travel history inconsistent with EWS status",
          ],
          recommendation: "Report to authorities for investigation",
        },
        subsidy: {
          fraudRisk: "Medium",
          confidence: 78,
          reasons: [
            "Multiple subsidy claims under same address",
            "Discrepancies in land ownership documents",
            "Unusual pattern of subsidy utilization",
          ],
          recommendation: "Further verification required",
        },
        identity: {
          fraudRisk: "Low",
          confidence: 45,
          reasons: ["Minor discrepancies in address details", "Name spelling variations across documents"],
          recommendation: "No immediate action required",
        },
        pension: {
          fraudRisk: "High",
          confidence: 95,
          reasons: [
            "Pension being claimed for deceased individual",
            "Multiple pension accounts with same biometric data",
            "Banking transactions after reported death date",
          ],
          recommendation: "Immediate investigation required",
        },
      }

      setAnalysisResult(
        results[schemeType] || {
          fraudRisk: "Unknown",
          confidence: 0,
          reasons: ["Insufficient data for analysis"],
          recommendation: "Manual review required",
        },
      )
    }, 3000)
  }

  // Get risk color
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-500 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  // Get confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-red-500"
    if (confidence >= 50) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">AI Fraud Detector</h1>
          <p className="text-muted-foreground">Detect potential fraud in government schemes and subsidies</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detector">Fraud Detector</TabsTrigger>
            <TabsTrigger value="database">Fraud Database</TabsTrigger>
          </TabsList>

          <TabsContent value="detector" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyze Potential Fraud</CardTitle>
                  <CardDescription>Enter details about a potential fraud case for AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scheme Type</label>
                    <Select value={schemeType} onValueChange={setSchemeType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scheme type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ews">Economically Weaker Section (EWS)</SelectItem>
                        <SelectItem value="subsidy">Agricultural Subsidy</SelectItem>
                        <SelectItem value="identity">Identity Fraud</SelectItem>
                        <SelectItem value="pension">Pension Fraud</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe the suspicious activity or case"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Evidence (Optional)</label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload documents</p>
                        <Input type="file" className="hidden" id="evidence-upload" multiple />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleAnalyze} disabled={!schemeType || isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        Analyzing... <span className="ml-2 animate-pulse">⚙️</span>
                      </>
                    ) : (
                      <>
                        Analyze with AI <Shield className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                {isAnalyzing ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {mounted && (
                          <Player
                            autoplay
                            loop
                            src="/animations/analyzing.json"
                            style={{ height: "200px", width: "200px" }}
                          />
                        )}
                        <h3 className="text-lg font-medium">Analyzing Fraud Patterns</h3>
                        <p className="text-muted-foreground">Our AI is scanning databases and analyzing patterns...</p>
                        <Progress value={45} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ) : analysisResult ? (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            <span>Analysis Results</span>
                            <Badge variant="outline" className={getRiskColor(analysisResult.fraudRisk)}>
                              {analysisResult.fraudRisk} Risk
                            </Badge>
                          </CardTitle>
                          <CardDescription>AI-powered fraud analysis results</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Confidence Score: {analysisResult.confidence}%</span>
                              <span className="text-sm font-medium">{analysisResult.confidence}%</span>
                            </div>
                            <Progress
                              value={analysisResult.confidence}
                              className={getConfidenceColor(analysisResult.confidence)}
                            />
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Potential Fraud Indicators:</h4>
                            <ul className="space-y-1">
                              {analysisResult.reasons.map((reason: string, index: number) => (
                                <li key={index} className="flex items-start text-sm">
                                  <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-yellow-500" />
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-md bg-muted">
                            <h4 className="text-sm font-medium mb-1">AI Recommendation:</h4>
                            <p className="text-sm">{analysisResult.recommendation}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Download Report</Button>
                          <Button>File Complaint</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <Shield className="h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">Fraud Detection</h3>
                        <p className="text-muted-foreground">
                          Select a scheme type and enter details to analyze potential fraud
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Search className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Pattern Recognition</h4>
                          <p className="text-sm text-muted-foreground">
                            Our AI analyzes patterns across multiple databases to identify inconsistencies.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Document Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Uploaded documents are scanned for authenticity and cross-referenced.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Risk Assessment</h4>
                          <p className="text-sm text-muted-foreground">
                            Cases are assigned a risk level based on multiple factors and evidence.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Case Database</CardTitle>
                <CardDescription>Browse common fraud patterns and reported cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fraudCases.map((fraudCase, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className={`h-2 ${getRiskColor(fraudCase.riskLevel)}`} />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{fraudCase.title}</CardTitle>
                          <Badge variant="outline" className={getRiskColor(fraudCase.riskLevel)}>
                            {fraudCase.riskLevel}
                          </Badge>
                        </div>
                        <CardDescription>{fraudCase.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="mb-3">{fraudCase.description}</p>
                        <div className="flex items-center space-x-2">
                          <fraudCase.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{fraudCase.frequency} cases detected</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Fraud Alerts</h3>
                  <div className="space-y-3">
                    {fraudAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md border-l-4 ${
                          alert.severity === "high"
                            ? "border-l-red-500 bg-red-50 dark:bg-red-950/10"
                            : alert.severity === "medium"
                              ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/10"
                              : "border-l-blue-500 bg-blue-50 dark:bg-blue-950/10"
                        }`}
                      >
                        <div className="flex items-start">
                          {alert.severity === "high" ? (
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                          ) : alert.severity === "medium" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          )}
                          <div>
                            <h4 className="text-sm font-medium">{alert.title}</h4>
                            <p className="text-sm">{alert.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Mock fraud cases
const fraudCases = [
  {
    title: "Fake EWS Certificate",
    category: "Economic Welfare Scheme",
    description: "Individuals with high income claiming EWS benefits by submitting falsified income documents.",
    riskLevel: "High",
    frequency: 342,
    icon: Building,
  },
  {
    title: "Multiple Subsidy Claims",
    category: "Agricultural Subsidy",
    description: "Farmers claiming multiple subsidies for the same land by registering under different names.",
    riskLevel: "Medium",
    frequency: 187,
    icon: Banknote,
  },
  {
    title: "Identity Theft for Benefits",
    category: "Social Welfare",
    description: "Using stolen identities to claim welfare benefits and government assistance.",
    riskLevel: "High",
    frequency: 256,
    icon: UserCheck,
  },
  {
    title: "Ghost Pensioners",
    category: "Pension Scheme",
    description: "Continuing to claim pension benefits for deceased individuals by not reporting deaths.",
    riskLevel: "High",
    frequency: 129,
    icon: CreditCard,
  },
]

// Mock fraud alerts
const fraudAlerts = [
  {
    title: "New EWS Fraud Pattern Detected",
    description: "Multiple cases of luxury car owners claiming EWS benefits detected in Delhi region.",
    severity: "high",
    date: "Today, 10:45 AM",
  },
  {
    title: "Subsidy Fraud Ring Busted",
    description: "Authorities have uncovered a network of fraudulent subsidy claims in Punjab agricultural sector.",
    severity: "medium",
    date: "Yesterday, 3:20 PM",
  },
  {
    title: "System Update: Enhanced Detection",
    description: "Our fraud detection algorithms have been updated to better identify document forgery.",
    severity: "low",
    date: "2 days ago",
  },
]
