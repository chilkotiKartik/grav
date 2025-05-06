"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useUser } from "@/components/user-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogIn, UserPlus, Shield, User, Users, BarChart3 } from "lucide-react"

// Dynamically import components that use browser APIs
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
  loading: () => <div className="h-[300px] w-[300px] bg-muted rounded-md animate-pulse" />,
})

// Use regular div instead of motion.div to avoid SSR issues
const AnimatedDiv = ({ children, className }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`${className} ${mounted ? "animate-fadeIn" : ""}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : "translateX(-50px)",
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      {children}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { login, register, demoLogin, isLoading } = useUser()
  const [activeTab, setActiveTab] = useState("login")
  const [mounted, setMounted] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const success = await login(loginEmail, loginPassword)
    if (success) {
      router.push("/dashboard")
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const success = await register(registerName, registerEmail, registerPassword, "citizen")
    if (success) {
      router.push("/dashboard")
    }
  }

  const handleDemoLogin = async (role) => {
    const success = await demoLogin(role)
    if (success) {
      router.push("/dashboard")
    }
  }

  // Don't render anything on the server
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="max-w-md animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-8"></div>
            <div className="h-[300px] bg-muted rounded mb-8"></div>
            <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="h-[400px] bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <AnimatedDiv className="max-w-md">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to <span className="gradient-text">GrievX</span>
            </h1>
            <p className="text-muted-foreground">
              Your voice matters. Join our platform to file complaints, track cases, and make a difference in your
              community.
            </p>
          </div>

          <div className="hidden lg:block">
            {mounted && (
              <Player
                autoplay
                loop
                src="/animations/login-animation.json"
                style={{ height: "300px", width: "300px" }}
              />
            )}
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Try Demo Accounts</h2>
            <p className="text-sm text-muted-foreground mb-4">Experience GrievX with different user roles:</p>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-start p-3 h-auto"
                onClick={() => handleDemoLogin("citizen")}
                disabled={isLoading}
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Citizen</div>
                  <div className="text-xs text-muted-foreground">File & track complaints</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-start p-3 h-auto"
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading}
              >
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-muted-foreground">Manage the platform</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-start p-3 h-auto"
                onClick={() => handleDemoLogin("officer")}
                disabled={isLoading}
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Officer</div>
                  <div className="text-xs text-muted-foreground">Resolve complaints</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-start p-3 h-auto"
                onClick={() => handleDemoLogin("analyst")}
                disabled={isLoading}
              >
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
                  <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Analyst</div>
                  <div className="text-xs text-muted-foreground">Analyze data</div>
                </div>
              </Button>
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv
          className="w-full max-w-md"
          style={{
            transitionDelay: "0.2s",
            transform: mounted ? "translateX(0)" : "translateX(50px)",
          }}
        >
          <Card className="w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <LogIn className="mr-2 h-4 w-4" />
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>

                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setActiveTab("register")}
                      >
                        Register
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your details to create a new account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>

                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setActiveTab("login")}
                      >
                        Login
                      </button>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </AnimatedDiv>
      </div>
    </div>
  )
}
