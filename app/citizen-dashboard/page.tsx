"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/components/user-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageSelector } from "@/components/language-selector"
import { ModeToggle } from "@/components/mode-toggle"
import {
  FileText,
  Search,
  Bell,
  LogOut,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  BookOpen,
  Shield,
  MessageSquare,
} from "lucide-react"
import { mockComplaints } from "@/lib/mock-data"

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusProps = () => {
    switch (status) {
      case "Pending":
        return {
          variant: "outline" as const,
          icon: <Clock className="mr-1 h-3 w-3" />,
          className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        }
      case "In Progress":
        return {
          variant: "outline" as const,
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        }
      case "Resolved":
        return {
          variant: "outline" as const,
          icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
          className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        }
      case "Rejected":
        return {
          variant: "outline" as const,
          icon: <XCircle className="mr-1 h-3 w-3" />,
          className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        }
      default:
        return { variant: "outline" as const, icon: null, className: "" }
    }
  }

  const { variant, icon, className } = getStatusProps()

  return (
    <Badge variant={variant} className={className}>
      <span className="flex items-center">
        {icon}
        {status}
      </span>
    </Badge>
  )
}

export default function CitizenDashboard() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [notifications, setNotifications] = useState<{ id: string; message: string; read: boolean }[]>([
    { id: "1", message: 'Your complaint GRV2023-001 status has been updated to "In Progress"', read: false },
    { id: "2", message: "Officer John Doe  been assigned to your complaint", read: false },
    { id: "3", message: "New government scheme announced for citizens", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [userComplaints, setUserComplaints] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "citizen") {
      router.push("/dashboard")
      return
    }

    // Filter complaints for this user
    const filteredComplaints = mockComplaints.filter((complaint) => complaint.citizenId === user.id)
    setUserComplaints(filteredComplaints)
  }, [user, router])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GrievX</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-md border bg-card p-2 shadow-lg">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="py-2 text-center text-sm text-muted-foreground">No notifications</p>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`mb-1 rounded-md p-2 text-sm ${!notification.read ? "bg-muted/50" : ""}`}
                        >
                          {notification.message}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <LanguageSelector />
            <ModeToggle />
            <div className="relative">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => {}}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
              <div className="absolute right-0 mt-2 hidden w-48 rounded-md border bg-card p-2 shadow-lg group-hover:block">
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500"
                    onClick={() => {
                      logout()
                      router.push("/login")
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">Citizen Dashboard | Track and manage your grievances</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/file-complaint">
                <FileText className="mr-2 h-4 w-4" />
                File New Complaint
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/track-complaint">
                <Search className="mr-2 h-4 w-4" />
                Track Complaint
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="my-complaints">
          <TabsList className="mb-4">
            <TabsTrigger value="my-complaints">My Complaints</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
          </TabsList>

          <TabsContent value="my-complaints">
            <div className="grid gap-6">
              {userComplaints.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold">No Complaints Filed</h3>
                    <p className="mb-4 text-center text-muted-foreground">
                      You haven't filed any complaints yet. Click the button below to file a new complaint.
                    </p>
                    <Button asChild>
                      <Link href="/file-complaint">File New Complaint</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                userComplaints.map((complaint) => (
                  <Card key={complaint.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{complaint.title}</CardTitle>
                          <CardDescription>
                            Complaint ID: {complaint.id} | Filed on:{" "}
                            {new Date(complaint.timestamp).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <StatusBadge status={complaint.status} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
                      {complaint.assignedTo && (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Assigned to:</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{complaint.assignedTo.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{complaint.assignedTo}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                      <div className="text-xs text-muted-foreground">
                        Last updated: {new Date(complaint.lastUpdated || complaint.timestamp).toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        {complaint.status !== "Resolved" && complaint.status !== "Rejected" && (
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        )}
                        <Button size="sm" asChild>
                          <Link href={`/track-complaint?id=${complaint.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Civic Rights Education</CardTitle>
                  <CardDescription>Learn about your rights as a citizen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-40 items-center justify-center rounded-md bg-muted">
                    <BookOpen className="h-16 w-16 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/education">Explore Resources</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fraud Detection</CardTitle>
                  <CardDescription>Learn how to identify and report fraud</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-40 items-center justify-center rounded-md bg-muted">
                    <Shield className="h-16 w-16 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/fraud-detector">Fraud Resources</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>Connect with other citizens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-40 items-center justify-center rounded-md bg-muted">
                    <MessageSquare className="h-16 w-16 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/townhall">Join Discussion</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schemes">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Digital Literacy Program</CardTitle>
                  <CardDescription>Government initiative for digital skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The Digital Literacy Program aims to provide basic digital skills to all citizens. Eligible citizens
                    can receive free training and certification.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Citizen Welfare Scheme</CardTitle>
                  <CardDescription>Financial assistance for eligible citizens</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The Citizen Welfare Scheme provides financial assistance to eligible citizens in need. Check your
                    eligibility and apply online.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Check Eligibility
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
