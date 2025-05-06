"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the Lottie player with SSR disabled
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
})

export function WelcomeAnimation() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if the user has seen the animation before
    const hasSeenAnimation = localStorage.getItem("grievx-welcome-seen")
    if (hasSeenAnimation) {
      setShowAnimation(false)
      return
    }

    // Animation sequence timing
    const stepTimings = [1000, 2000, 3000, 4000]

    // Progress through animation steps
    const timers = stepTimings.map((time, index) => {
      return setTimeout(() => {
        setAnimationStep(index + 1)

        // On last step, prepare to hide animation
        if (index === stepTimings.length - 1) {
          setTimeout(() => {
            setShowAnimation(false)
            localStorage.setItem("grievx-welcome-seen", "true")
          }, 1500)
        }
      }, time)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  if (!mounted || !showAnimation) return null

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="text-center">
            {animationStep === 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-6 mx-auto mb-6">
                  <Shield className="h-16 w-16 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">GrievX</h1>
                <p className="text-muted-foreground">AI-Powered Public Grievance Platform</p>
              </motion.div>
            )}

            {animationStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
              >
                <div className="mb-4">
                  {mounted && (
                    <Player
                      autoplay
                      loop={false}
                      src="/animations/file-complaint.json"
                      style={{ height: "200px", width: "200px" }}
                      className="mx-auto"
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2">File Complaints</h2>
                <p className="text-muted-foreground">Submit grievances through our intuitive multi-step form</p>
              </motion.div>
            )}

            {animationStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
              >
                <div className="mb-4">
                  {mounted && (
                    <Player
                      autoplay
                      loop={false}
                      src="/animations/ai-analysis.json"
                      style={{ height: "200px", width: "200px" }}
                      className="mx-auto"
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2">AI-Powered Analysis</h2>
                <p className="text-muted-foreground">Our AI system analyzes complaints and detects patterns</p>
              </motion.div>
            )}

            {animationStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
              >
                <div className="mb-4">
                  {mounted && (
                    <Player
                      autoplay
                      loop={false}
                      src="/animations/track-progress.json"
                      style={{ height: "200px", width: "200px" }}
                      className="mx-auto"
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2">Track Progress</h2>
                <p className="text-muted-foreground">Follow your case from submission to resolution</p>
              </motion.div>
            )}

            {animationStep === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
              >
                <div className="mb-4">
                  {mounted && (
                    <Player
                      autoplay
                      loop={false}
                      src="/animations/civic-rights.json"
                      style={{ height: "200px", width: "200px" }}
                      className="mx-auto"
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2">Welcome to GrievX!</h2>
                <p className="text-muted-foreground">Because every voice deserves a response – in time.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
