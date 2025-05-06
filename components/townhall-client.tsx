"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Player } from "@lottiefiles/react-lottie-player"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/components/user-provider"
import { useToast } from "@/components/ui/use-toast"
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Users,
  Calendar,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  User,
  Megaphone,
} from "lucide-react"
import { mockTownhallMessages, mockUpcomingTownhalls } from "@/lib/mock-data"

// Top questions data
const topQuestions = [
  {
    text: "When will the Main Street pothole repairs be completed?",
    author: "Riya Sharma",
    votes: 24,
    answered: true,
  },
  {
    text: "Can we get more streetlights in the East District?",
    author: "Amit Kumar",
    votes: 18,
    answered: false,
  },
  {
    text: "What's being done about the water quality issues in North Zone?",
    author: "Priya Patel",
    votes: 15,
    answered: true,
  },
  {
    text: "When will the new public transport routes be implemented?",
    author: "Rahul Singh",
    votes: 12,
    answered: false,
  },
]

export function TownhallClient() {
  const { user } = useUser()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("live")
  const [messages, setMessages] = useState(mockTownhallMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    const typingInterval = setInterval(() => {
      const shouldShowTyping = Math.random() > 0.7
      if (shouldShowTyping) {
        const users = ["Officer Ram", "Moderator Singh", "Analyst Priya"]
        setTypingUser(users[Math.floor(Math.random() * users.length)])
        setIsTyping(true)

        setTimeout(() => {
          setIsTyping(false)
        }, 3000)
      }
    }, 10000)

    return () => clearInterval(typingInterval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to participate in the townhall.",
      })
      return
    }

    const newMsg = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: `/avatars/${user.id}.png`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      likes: 0,
      isOfficial: false,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate official response after a delay
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const officialResponses = [
          "Thank you for your input. We'll take this into consideration.",
          "That's a valid concern. We're working on addressing similar issues.",
          "We appreciate your feedback. This will help us improve our services.",
          "This is an important point. We'll discuss this in our next meeting.",
        ]

        const officialMsg = {
          id: Date.now().toString(),
          userId: 3,
          userName: "Officer Carol",
          userAvatar: "/avatars/3.png",
          text: officialResponses[Math.floor(Math.random() * officialResponses.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          likes: 0,
          isOfficial: true,
        }

        setMessages((prev) => [...prev, officialMsg])
      }, 5000)
    }
  }

  const handleLike = (id: string) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to like messages.",
      })
      return
    }

    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg)))
  }

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Live Townhall</h1>
              <p className="text-muted-foreground">
                Engage with officials and fellow citizens in real-time discussions
              </p>
            </div>

            <Badge className="px-3 py-1.5 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full animate-pulse">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500 inline-block"></span> Live Now: 42 participants
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="live">Live Discussion</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Townhalls</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-[600px] flex flex-col">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                            <span>Live Discussion</span>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            <Users className="mr-1 h-3 w-3" /> 42 Online
                          </Badge>
                        </CardTitle>
                        <CardDescription>Topic: Infrastructure Development and Maintenance</CardDescription>
                      </CardHeader>

                      <CardContent className="flex-grow overflow-y-auto pb-0">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`flex max-w-[80%] ${message.userId === user?.id ? "flex-row-reverse" : "flex-row"}`}
                              >
                                <Avatar className={`h-8 w-8 ${message.userId === user?.id ? "ml-2" : "mr-2"}`}>
                                  <AvatarImage src={message.userAvatar || "/placeholder.svg"} alt={message.userName} />
                                  <AvatarFallback>{message.userName[0]}</AvatarFallback>
                                </Avatar>

                                <div>
                                  <div
                                    className={`flex items-center ${message.userId === user?.id ? "justify-end" : "justify-start"} mb-1`}
                                  >
                                    <span className="text-xs font-medium">{message.userName}</span>
                                    {message.isOfficial && (
                                      <Badge
                                        variant="outline"
                                        className="ml-1 px-1 py-0 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                      >
                                        Official
                                      </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground ml-2">{message.timestamp}</span>
                                  </div>

                                  <div
                                    className={`rounded-lg p-3 ${
                                      message.isOfficial
                                        ? "bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                        : message.userId === user?.id
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted"
                                    }`}
                                  >
                                    <p className="text-sm">{message.text}</p>
                                  </div>

                                  <div
                                    className={`flex items-center mt-1 ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
                                  >
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs"
                                      onClick={() => handleLike(message.id)}
                                    >
                                      <ThumbsUp className="h-3 w-3 mr-1" /> {message.likes > 0 && message.likes}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}

                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="flex max-w-[80%] flex-row">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{typingUser[0]}</AvatarFallback>
                                </Avatar>

                                <div>
                                  <div className="flex items-center justify-start mb-1">
                                    <span className="text-xs font-medium">{typingUser}</span>
                                  </div>

                                  <div className="rounded-lg p-3 bg-muted">
                                    <div className="flex space-x-1">
                                      <div
                                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                      ></div>
                                      <div
                                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                      ></div>
                                      <div
                                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div ref={messagesEndRef} />
                        </div>
                      </CardContent>

                      <CardFooter className="pt-3">
                        <div className="flex w-full items-center space-x-2">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            disabled={!user}
                          />
                          <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim() || !user}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Townhall Moderator</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage src="/avatars/moderator.png" alt="Moderator" />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold">Moderator Singh</h3>
                        <p className="text-sm text-muted-foreground mb-4">Chief Municipal Officer</p>
                        <Badge className="mb-4">Verified Official</Badge>
                        <p className="text-sm">
                          Moderating today's discussion on infrastructure development and maintenance in our city.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Questions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topQuestions.map((question, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs mt-0.5"
                                    onClick={() =>
                                      toast({
                                        title: "Upvoted",
                                        description: "You've upvoted this question",
                                      })
                                    }
                                  >
                                    <ThumbsUp className="h-3 w-3 mr-1" /> {question.votes}
                                  </Button>
                                  <p className="text-sm">{question.text}</p>
                                </div>
                                {question.answered && (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs"
                                  >
                                    Answered
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground pl-8">Asked by {question.author}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Townhall Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Be respectful and courteous to all participants</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Stay on topic and keep questions relevant</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Upvote questions you'd like to see answered</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500 mt-0.5" />
                            <span>Avoid sharing personal information</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500 mt-0.5" />
                            <span>Harassment or offensive language will result in removal</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Townhall Sessions</CardTitle>
                    <CardDescription>Join these scheduled discussions with officials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockUpcomingTownhalls.map((townhall, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                            <Calendar className="h-8 w-8" />
                          </div>

                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                              <h3 className="text-lg font-bold">{townhall.title}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  townhall.isSpecial
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                    : ""
                                }
                              >
                                {townhall.isSpecial ? "Special Session" : "Regular Session"}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">{townhall.description}</p>

                            <div className="flex flex-wrap gap-3">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{townhall.date}</span>
                              </div>

                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{townhall.time}</span>
                              </div>

                              <div className="flex items-center text-sm">
                                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>Host: {townhall.host}</span>
                              </div>

                              <div className="flex items-center text-sm">
                                <Megaphone className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{townhall.department}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 flex items-center">
                            <Button variant="outline" className="w-full md:w-auto">
                              Set Reminder <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Suggest a Topic</CardTitle>
                      <CardDescription>What would you like to discuss in future townhalls?</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Input placeholder="Topic title" />
                        <Input placeholder="Brief description" />
                        <Button className="w-full">Submit Topic</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>Why Join Townhalls?</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center">
                      <Player
                        autoplay
                        loop
                        src="/animations/townhall.json"
                        style={{ height: "200px", width: "200px" }}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Townhalls provide a direct channel to communicate with officials, voice your concerns, and
                        collaborate on solutions.
                      </p>
                      <Button variant="outline">Learn More</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
