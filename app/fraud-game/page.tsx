"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { useUser } from "@/components/user-provider"
import { useToast } from "@/components/ui/use-toast"
import { mockFraudCases } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Award, AlertTriangle } from "lucide-react"

// Dynamically import components that use browser APIs
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
  loading: () => <div className="h-[200px] w-[200px] bg-muted rounded-md animate-pulse" />,
})

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
  ssr: false,
})

export default function FraudGamePage() {
  const { user } = useUser()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Load high score from localStorage if available
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("fraudGameHighScore")
      if (savedHighScore) {
        setHighScore(Number.parseInt(savedHighScore))
      }
    }
  }, [])

  // Timer countdown
  useEffect(() => {
    if (!mounted || !gameStarted || gameOver || showResult) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted, gameStarted, gameOver, showResult])

  // Save high score when game ends
  useEffect(() => {
    if (!mounted || !gameOver) return

    if (score > highScore) {
      setHighScore(score)
      if (typeof window !== "undefined") {
        localStorage.setItem("fraudGameHighScore", score.toString())
      }
    }
  }, [mounted, gameOver, score, highScore])

  // Don't render anything on the server
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
            <div className="h-[300px] bg-muted rounded mx-auto max-w-md"></div>
            <div className="h-[200px] bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          {mounted && (
            <Player
              autoplay
              loop
              src="/animations/login-required.json"
              style={{ height: "200px", width: "200px" }}
              className="mx-auto"
            />
          )}
          <h1 className="text-2xl font-bold mt-6 mb-2">Login Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to play the Fraud Detector Game.</p>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      </div>
    )
  }

  // Check if mockFraudCases exists and has data
  if (!mockFraudCases || mockFraudCases.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mt-6 mb-2">Data Error</h1>
          <p className="text-muted-foreground mb-6">Unable to load fraud cases. Please try again later.</p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    )
  }

  const currentCase = mockFraudCases[currentCaseIndex] || {
    id: 0,
    description: "No case available",
    amount: 0,
    date: "N/A",
    location: "N/A",
    reportedBy: "N/A",
    fraudStatus: "N/A",
    explanation: "No explanation available",
    additionalInfo: "",
  }

  const handleStartGame = () => {
    setGameStarted(true)
    setCurrentCaseIndex(0)
    setTimeLeft(30)
    setScore(0)
    setStreak(0)
    setGameOver(false)
    setShowResult(false)
    setSelectedOption(null)

    toast({
      title: "Game Started!",
      description: "Identify fraud cases as quickly as possible to earn points!",
    })
  }

  const handleSelectOption = (option: string) => {
    if (showResult) return

    setSelectedOption(option)
    setShowResult(true)

    const isAnswerCorrect = option === currentCase.fraudStatus
    setIsCorrect(isAnswerCorrect)

    // Calculate points
    let pointsEarned = 0
    if (isAnswerCorrect) {
      // Base points + time bonus + streak bonus
      pointsEarned = 10 + Math.floor(timeLeft / 3) + streak * 2
      setScore((prev) => prev + pointsEarned)
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0) // Reset streak on wrong answer
    }

    setEarnedPoints(pointsEarned)
  }

  const handleTimeUp = () => {
    setShowResult(true)
    setSelectedOption(null)
    setIsCorrect(false)
    setStreak(0)

    toast({
      title: "Time's up!",
      description: "You ran out of time for this case.",
      variant: "destructive",
    })
  }

  const handleNextCase = () => {
    if (currentCaseIndex >= mockFraudCases.length - 1) {
      setGameOver(true)

      toast({
        title: "Game Over!",
        description: `Final score: ${score} points`,
      })

      return
    }

    setCurrentCaseIndex((prev) => prev + 1)
    setTimeLeft(30)
    setShowResult(false)
    setSelectedOption(null)
  }

  // Game start screen
  if (!gameStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Fraud Detector Challenge
            </h1>
            <p className="text-xl text-muted-foreground mb-6">Test your fraud detection skills and earn points!</p>
            <div className="flex justify-center mb-8">
              {mounted && (
                <Player
                  autoplay
                  loop
                  src="/animations/fraud-detection.json"
                  style={{ height: "300px", width: "300px" }}
                />
              )}
            </div>
          </div>

          <Card className="p-6 mb-8 border-2 border-purple-200 dark:border-purple-900">
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Read each case carefully and determine if it's a fraud or legitimate.</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>You have 30 seconds to make a decision for each case.</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Earn points for correct answers. The faster you answer, the more points you get!</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Build a streak of correct answers for bonus points!</span>
              </li>
            </ul>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Current High Score: <span className="text-amber-500">{highScore}</span>
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleStartGame}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Start Game
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Game over screen
  if (gameOver) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          {mounted && (
            <Player
              autoplay
              loop
              src="/animations/fraud-detection.json"
              style={{ height: "200px", width: "200px" }}
              className="mx-auto"
            />
          )}
          <h1 className="text-3xl font-bold mt-6 mb-2">Game Over!</h1>
          <p className="text-xl mb-4">
            Your final score: <span className="font-bold text-purple-600">{score}</span> points
          </p>

          {score > highScore - 1 && (
            <div className="mb-6 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <p className="font-bold text-amber-600 dark:text-amber-400">🏆 New High Score! 🏆</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-background border rounded-lg">
              <p className="text-sm text-muted-foreground">High Score</p>
              <p className="text-2xl font-bold">{Math.max(score, highScore)}</p>
            </div>
            <div className="p-4 bg-background border rounded-lg">
              <p className="text-sm text-muted-foreground">Cases Analyzed</p>
              <p className="text-2xl font-bold">{currentCaseIndex + 1}</p>
            </div>
          </div>

          <Button
            onClick={handleStartGame}
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            Play Again
          </Button>
        </div>
      </div>
    )
  }

  // Game play screen
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Fraud Detector Challenge</h1>
            <p className="text-muted-foreground">
              Case {currentCaseIndex + 1} of {mockFraudCases.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">
              Score: <span className="text-purple-600">{score}</span>
            </p>
            {streak > 0 && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                {streak} Streak 🔥
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <Progress
            value={(timeLeft / 30) * 100}
            className="h-3"
            indicatorClassName={`${timeLeft < 10 ? "bg-red-500" : "bg-blue-500"}`}
          />
          <span className={`font-mono ${timeLeft < 10 ? "text-red-500" : ""}`}>{timeLeft}s</span>
        </div>

        <Card className="p-6 mb-6 border-2 border-purple-200 dark:border-purple-900">
          <h2 className="text-xl font-bold mb-4">Case Details</h2>
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold">Description:</p>
              <p>{currentCase.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Amount:</p>
                <p>${currentCase.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Date:</p>
                <p>{currentCase.date}</p>
              </div>
              <div>
                <p className="font-semibold">Location:</p>
                <p>{currentCase.location}</p>
              </div>
              <div>
                <p className="font-semibold">Reported By:</p>
                <p>{currentCase.reportedBy}</p>
              </div>
            </div>
            {currentCase.additionalInfo && (
              <div>
                <p className="font-semibold">Additional Information:</p>
                <p>{currentCase.additionalInfo}</p>
              </div>
            )}
          </div>

          {!showResult ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={() => handleSelectOption("fraud")} variant="destructive" size="lg" className="h-16">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Fraud
              </Button>
              <Button
                onClick={() => handleSelectOption("legitimate")}
                variant="default"
                size="lg"
                className="h-16 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Legitimate
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <p className="font-bold text-green-600 dark:text-green-400">
                        Correct! This case is {currentCase.fraudStatus}.
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      <p className="font-bold text-red-600 dark:text-red-400">
                        Incorrect. This case is actually {currentCase.fraudStatus}.
                      </p>
                    </>
                  )}
                </div>

                <p className="mt-2">{currentCase.explanation}</p>

                {isCorrect && earnedPoints > 0 && (
                  <p className="mt-2 font-semibold">
                    +{earnedPoints} points earned!
                    {streak > 1 && ` (includes ${streak - 1}x streak bonus)`}
                  </p>
                )}
              </div>

              <Button onClick={handleNextCase} size="lg" className="w-full">
                Next Case
              </Button>
            </div>
          )}
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              setGameOver(true)
              toast({
                title: "Game Ended",
                description: "You've ended the game early.",
              })
            }}
          >
            End Game
          </Button>
        </div>
      </div>
    </div>
  )
}
