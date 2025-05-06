"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import {
  BookOpen,
  FileText,
  CheckCircle,
  ChevronRight,
  Play,
  Award,
  Download,
  ExternalLink,
  AlertTriangle,
  HelpCircle,
  Info,
} from "lucide-react"
import { mockEducationalContent } from "@/lib/mock-data"

// Dynamically import the Lottie player with SSR disabled
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false })

export default function EducationPage() {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("guides")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleStartCourse = (course: any) => {
    setSelectedCourse(course)
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
  }

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (selectedCourse?.quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      selectedCourse?.quiz?.questions.forEach((question: any, index: number) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++
        }
      })

      const score = Math.round((correctAnswers / selectedCourse?.quiz?.questions.length) * 100)
      setQuizScore(score)
      setQuizCompleted(true)

      // Award points if score is good
      if (score >= 70) {
        toast({
          title: "Congratulations!",
          description: `You've earned 20 civic points for completing the quiz with a score of ${score}%`,
        })
      }
    }
  }

  const renderQuiz = () => {
    if (!selectedCourse?.quiz) return null

    if (quizCompleted) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
              {quizScore >= 70 ? (
                <Award className="h-12 w-12 text-primary" />
              ) : (
                <Info className="h-12 w-12 text-primary" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-muted-foreground mb-4">
              You scored {quizScore}% on the {selectedCourse.title} quiz.
            </p>

            <div className="w-full max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Score</span>
                <span className="font-medium">{quizScore}%</span>
              </div>
              <Progress
                value={quizScore}
                className={`h-3 ${quizScore >= 70 ? "bg-green-500" : quizScore >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
              />
            </div>

            {quizScore >= 70 ? (
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Congratulations!</p>
                    <p>You've passed the quiz and earned a certificate and 20 civic points.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Almost there!</p>
                    <p>Review the material and try again to earn your certificate.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              {quizScore >= 70 && (
                <Button
                  onClick={() =>
                    toast({
                      title: "Certificate Generated",
                      description: "Your certificate has been generated and added to your profile.",
                    })
                  }
                >
                  <Award className="mr-2 h-4 w-4" /> Get Certificate
                </Button>
              )}
              <Button variant="outline" onClick={() => setQuizStarted(false)}>
                Review Material
              </Button>
              <Button variant="outline" onClick={handleBackToCourses}>
                Back to Courses
              </Button>
            </div>
          </div>
        </div>
      )
    }

    const currentQuestion = selectedCourse.quiz.questions[currentQuestionIndex]

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{selectedCourse.title} Quiz</h2>
            <p className="text-muted-foreground">Test your knowledge</p>
          </div>
          <div className="text-sm">
            Question {currentQuestionIndex + 1} of {selectedCourse.quiz.questions.length}
          </div>
        </div>

        <Progress value={((currentQuestionIndex + 1) / selectedCourse.quiz.questions.length) * 100} className="h-2" />

        <div className="p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.answers.map((answer: string, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/50"
                }`}
                onClick={() => handleSelectAnswer(currentQuestionIndex, index)}
              >
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {selectedAnswers[currentQuestionIndex] === index && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span>{answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestionIndex] === undefined}>
            {currentQuestionIndex < selectedCourse.quiz.questions.length - 1 ? (
              <>
                Next Question <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Quiz"
            )}
          </Button>
        </div>
      </div>
    )
  }

  const renderCourseContent = () => {
    if (!selectedCourse) return null

    if (quizStarted) {
      return renderQuiz()
    }

    return (
      <div className="space-y-6">
        <Button variant="outline" size="sm" onClick={handleBackToCourses}>
          Back to All Courses
        </Button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
              <p className="text-muted-foreground">{selectedCourse.description}</p>
            </div>

            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {mounted && (
                <Player
                  autoplay
                  loop
                  src={selectedCourse.videoSrc || "/animations/education.json"}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Course Content</h3>

              <Accordion type="single" collapsible className="w-full">
                {selectedCourse.sections.map((section: any, index: number) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger>{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <p>{section.content}</p>

                        {section.bulletPoints && (
                          <ul className="space-y-2 pl-6 list-disc">
                            {section.bulletPoints.map((point: string, pointIndex: number) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                        )}

                        {section.image && (
                          <div className="rounded-lg overflow-hidden border">
                            <img
                              src={section.image || "/placeholder.svg"}
                              alt={section.title}
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span>{selectedCourse.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Points:</span>
                  <span>{selectedCourse.points} civic points</span>
                </div>

                <div className="pt-2">
                  <Button className="w-full" onClick={handleStartQuiz}>
                    <Play className="mr-2 h-4 w-4" /> Take Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedCourse.resources?.map((resource: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{resource.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          toast({ title: "Resource Downloaded", description: `${resource.title} has been downloaded.` })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedCourse.relatedCourses && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCourse.relatedCourses.map((course: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{course}</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

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
              <h1 className="text-3xl font-bold mb-2">Educational Hub</h1>
              <p className="text-muted-foreground">Learn about civic rights, fraud detection, and more</p>
            </div>
          </div>

          {!selectedCourse && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </motion.div>

        {selectedCourse ? (
          renderCourseContent()
        ) : (
          <>
            <TabsContent value="guides" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockEducationalContent.guides.map((guide, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full card-hover">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <guide.icon className="h-5 w-5 mr-2 text-primary" />
                          {guide.title}
                        </CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {guide.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            toast({ title: "Coming Soon", description: "This guide will be available soon!" })
                          }
                        >
                          Read Guide
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockEducationalContent.courses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full card-hover">
                      <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
                        {mounted && (
                          <Player
                            autoplay
                            loop
                            src={course.thumbnailSrc || "/animations/education.json"}
                            style={{ width: "100%", height: "100%" }}
                          />
                        )}
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 text-white hover:bg-black/70">{course.duration}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{course.title}</CardTitle>
                          <Badge
                            variant="outline"
                            className={
                              course.difficulty === "Beginner"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : course.difficulty === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }
                          >
                            {course.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{course.sections.length} sections</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{course.points} points</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleStartCourse(course)}>
                          Start Course
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Common questions about civic rights and responsibilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {mockEducationalContent.faq.map((item, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start">
                            <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                            <span>{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-7">
                            <p className="mb-4">{item.answer}</p>

                            {item.links && (
                              <div className="space-y-2">
                                <p className="font-medium">Useful Links:</p>
                                <ul className="space-y-1">
                                  {item.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="flex items-center">
                                      <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <a href="#" className="text-primary hover:underline">
                                        {link}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Have a Question?</CardTitle>
                    <CardDescription>Can't find what you're looking for?</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <HelpCircle className="h-12 w-12 text-primary" />
                    </div>
                    <p className="mb-4">
                      If you have a specific question that's not covered in our FAQ, you can submit it here.
                    </p>
                    <Button
                      onClick={() =>
                        toast({ title: "Coming Soon", description: "This feature will be available soon!" })
                      }
                    >
                      Ask a Question
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Educational Resources</CardTitle>
                    <CardDescription>Additional materials to help you learn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEducationalContent.resources.map((resource, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <resource.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                            <Button
                              variant="link"
                              className="p-0 h-auto mt-1"
                              onClick={() =>
                                toast({ title: "Coming Soon", description: "This resource will be available soon!" })
                              }
                            >
                              Learn More <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </>
        )}
      </div>
    </div>
  )
}
