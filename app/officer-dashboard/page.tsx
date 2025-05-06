"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUser } from "@/components/user-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { enhancedMockComplaints } from "@/lib/enhanced-mock-data"
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Bell,
  Search,
  ChevronRight,
  Filter,
  Calendar,
  BarChart3,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OfficerDashboardPage() {
  const { user } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("assigned")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Redirect if not logged in or not an officer
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mt-6 mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Please log in to access your dashboard.</p>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    )
  }

  if (user.role !== "officer") {
    router.push(`/${user.role}-dashboard`)
    return null
  }

  // Get all complaints
  const allComplaints = enhancedMockComplaints

  // Filter complaints assigned to this officer
  const assignedComplaints = allComplaints.filter((complaint) => complaint.officer && complaint.officer.id === user.id)

  // Get pending complaints (not assigned to anyone yet)
  const pendingComplaints = allComplaints.filter((complaint) => complaint.status === "pending" && !complaint.officer)

  // Get recently resolved complaints by this officer
  const resolvedComplaints = allComplaints.filter(
    (complaint) => complaint.status === "resolved" && complaint.officer && complaint.officer.id === user.id,
  )

  // Get status counts for assigned complaints
  const investigatingCount = assignedComplaints.filter((c) => c.status === "investigating").length
  const judgingCount = assignedComplaints.filter((c) => c.status === "judging").length
  const resolvedCount = resolvedComplaints.length

  // Apply filters and search to the complaints based on active tab
  const getFilteredComplaints = () => {
    let complaints = []

    if (activeTab === "assigned") {
      complaints = assignedComplaints
    } else if (activeTab === "pending") {
      complaints = pendingComplaints
    } else if (activeTab === "resolved") {
      complaints = resolvedComplaints
    }

    // Apply search filter
    if (searchQuery) {
      complaints = complaints.filter(
        (c) =>
          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      complaints = complaints.filter((c) => c.status === statusFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      complaints = complaints.filter((c) => c.category === categoryFilter)
    }

    return complaints
  }

  const filteredComplaints = getFilteredComplaints()

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "investigating":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Search className="mr-1 h-3 w-3" /> Investigating
          </Badge>
        )
      case "judging":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <AlertTriangle className="mr-1 h-3 w-3" /> Judging
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <AlertTriangle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-500 text-white">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500 text-white">Low</Badge>
      default:
        return null
    }
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Complaint Assigned",
      description: "Complaint #GRV1001 has been assigned to you",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 2,
      title: "Citizen Comment",
      description: "Alice Citizen added a comment to complaint #GRV1003",
      time: "3 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Complaint Deadline",
      description: "Complaint #GRV1002 is due for resolution in 24 hours",
      time: "Yesterday",
      read: true,
    },
  ]

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Field Inspection - Pothole on Main Street",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      location: "123 Main Street, North District",
    },
    {
      id: 2,
      title: "Water Conservation Townhall",
      date: "July 25, 2024",
      time: "6:00 PM - 7:30 PM",
      location: "Community Hall, North District",
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-bold tracking-tight">Officer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of your assigned complaints and pending tasks.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{assignedComplaints.length}</div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investigating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{investigatingCount}</div>
              <Search className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Judging</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{judgingCount}</div>
              <AlertTriangle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{resolvedCount}</div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="assigned">Assigned ({assignedComplaints.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingComplaints.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedComplaints.length})</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by ID, title, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="judging">Judging</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Corruption">Corruption</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="assigned" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Complaints</CardTitle>
              <CardDescription>Complaints that have been assigned to you for resolution</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredComplaints.length > 0 ? (
                <div className="space-y-6">
                  {filteredComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{complaint.id}</span>
                            <Badge variant="outline">{complaint.category}</Badge>
                            {getStatusBadge(complaint.status)}
                            {complaint.priority && getPriorityBadge(complaint.priority)}
                          </div>
                          <h3 className="text-lg font-medium mt-1">{complaint.title}</h3>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/officer/case/${complaint.id}`}>
                            View Details <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{complaint.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Date: </span>
                          <span>{complaint.date}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span>{complaint.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reported by: </span>
                          <span>
                            {allComplaints.find((c) => c.userId === complaint.userId)?.userId
                              ? `User #${complaint.userId}`
                              : "Anonymous"}
                          </span>
                        </div>
                      </div>
                      {complaint.comments && complaint.comments.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium mb-2">Latest Comment:</p>
                          <div className="bg-muted p-3 rounded-md text-sm">
                            <p className="font-medium">{complaint.comments[complaint.comments.length - 1].author}</p>
                            <p>{complaint.comments[complaint.comments.length - 1].text}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {complaint.comments[complaint.comments.length - 1].date}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No assigned complaints</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You don't have any complaints assigned to you that match the current filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("all")
                      setCategoryFilter("all")
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" /> Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Complaints</CardTitle>
              <CardDescription>New complaints that need to be assigned and addressed</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredComplaints.length > 0 ? (
                <div className="space-y-6">
                  {filteredComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{complaint.id}</span>
                            <Badge variant="outline">{complaint.category}</Badge>
                            {getStatusBadge(complaint.status)}
                            {complaint.priority && getPriorityBadge(complaint.priority)}
                          </div>
                          <h3 className="text-lg font-medium mt-1">{complaint.title}</h3>
                        </div>
                        <Button size="sm" asChild>
                          <a href={`/officer/assign/${complaint.id}`}>Assign to Me</a>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{complaint.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Date: </span>
                          <span>{complaint.date}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span>{complaint.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reported by: </span>
                          <span>
                            {allComplaints.find((c) => c.userId === complaint.userId)?.userId
                              ? `User #${complaint.userId}`
                              : "Anonymous"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No pending complaints</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    There are no pending complaints that need to be assigned at this time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Complaints</CardTitle>
              <CardDescription>Complaints that you have successfully resolved</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredComplaints.length > 0 ? (
                <div className="space-y-6">
                  {filteredComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{complaint.id}</span>
                            <Badge variant="outline">{complaint.category}</Badge>
                            {getStatusBadge(complaint.status)}
                          </div>
                          <h3 className="text-lg font-medium mt-1">{complaint.title}</h3>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/officer/case/${complaint.id}`}>
                            View Details <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{complaint.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Date Filed: </span>
                          <span>{complaint.date}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date Resolved: </span>
                          <span>{complaint.resolvedDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Resolution Time: </span>
                          <span>
                            {Math.round(
                              (new Date(complaint.resolvedDate) - new Date(complaint.date)) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No resolved complaints</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't resolved any complaints yet that match the current filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("all")
                      setCategoryFilter("all")
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" /> Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                  <div className={`mt-0.5 p-1.5 rounded-full ${notification.read ? "bg-muted" : "bg-blue-500"}`}>
                    <Bell className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-white"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${notification.read ? "" : "text-blue-500"}`}>
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Scheduled inspections and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                  <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Your complaint handling statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Average Resolution Time</div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">4.8 days</div>
                <div className="text-green-500 text-sm">↓ 12%</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <div className="text-xs text-muted-foreground">Department average: 5.5 days</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Citizen Satisfaction</div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">92%</div>
                <div className="text-green-500 text-sm">↑ 5%</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
              </div>
              <div className="text-xs text-muted-foreground">Department average: 87%</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Complaints Handled</div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">24</div>
                <div className="text-green-500 text-sm">↑ 8%</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
              </div>
              <div className="text-xs text-muted-foreground">Department average: 22</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/officer/analytics">
              <BarChart3 className="mr-2 h-4 w-4" /> View Detailed Analytics
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
