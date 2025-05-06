"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUser } from "@/components/user-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { enhancedMockComplaints, mockUsers } from "@/lib/enhanced-mock-data"
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Shield,
  BarChart3,
  Settings,
  ChevronRight,
  Bell,
  Calendar,
  Search,
  UserPlus,
  Building,
  MessageSquare,
} from "lucide-react"
import { PieChart, BarChart, LineChart } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboardPage() {
  const { user } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not logged in or not an admin
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

  if (user.role !== "admin") {
    router.push(`/${user.role}-dashboard`)
    return null
  }

  // Get all complaints
  const allComplaints = enhancedMockComplaints

  // Get status counts
  const pendingCount = allComplaints.filter((c) => c.status === "pending").length
  const investigatingCount = allComplaints.filter((c) => c.status === "investigating").length
  const judgingCount = allComplaints.filter((c) => c.status === "judging").length
  const resolvedCount = allComplaints.filter((c) => c.status === "resolved").length
  const rejectedCount = allComplaints.filter((c) => c.status === "rejected").length

  // Get user counts
  const citizenCount = mockUsers.filter((u) => u.role === "citizen").length
  const officerCount = mockUsers.filter((u) => u.role === "officer").length
  const analystCount = mockUsers.filter((u) => u.role === "analyst").length
  const adminCount = mockUsers.filter((u) => u.role === "admin").length

  // Get recent complaints (last 5)
  const recentComplaints = [...allComplaints]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

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

  // Demo data for charts
  const complaintsByCategory = [
    { name: "Infrastructure", value: 35 },
    { name: "Sanitation", value: 27 },
    { name: "Security", value: 22 },
    { name: "Corruption", value: 15 },
    { name: "Education", value: 10 },
  ]

  const complaintTrends = [
    { month: "Jan", complaints: 45, resolved: 38 },
    { month: "Feb", complaints: 52, resolved: 41 },
    { month: "Mar", complaints: 49, resolved: 45 },
    { month: "Apr", complaints: 63, resolved: 52 },
    { month: "May", complaints: 58, resolved: 49 },
    { month: "Jun", complaints: 64, resolved: 55 },
  ]

  const resolutionTime = [
    { category: "Infrastructure", time: 8.2 },
    { category: "Sanitation", time: 6.8 },
    { category: "Security", time: 5.2 },
    { category: "Corruption", time: 12.5 },
    { category: "Education", time: 9.7 },
  ]

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Complaint Filed",
      description: "A new high-priority complaint has been filed in North District",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Officer Performance Alert",
      description: "Officer Carol has resolved 5 complaints this week",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      description: "GrievX platform will undergo maintenance tonight at 2 AM",
      time: "Yesterday",
      read: true,
    },
  ]

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Department Heads Meeting",
      date: "Tomorrow",
      time: "10:00 AM - 11:30 AM",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Budget Allocation Town Hall",
      date: "August 2, 2024",
      time: "5:30 PM - 7:00 PM",
      location: "City Hall Auditorium",
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
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of the platform's performance and activity.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{allComplaints.length}</div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{Math.round((resolvedCount / allComplaints.length) * 100)}%</div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{mockUsers.length}</div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fraud Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24</div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-red-500">↑ 15%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[500px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Trends</CardTitle>
                  <CardDescription>Monthly filed vs. resolved complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
                    className="h-[300px]"
                    data={complaintTrends}
                    index="month"
                    categories={["complaints", "resolved"]}
                    colors={["blue", "green"]}
                    valueFormatter={(value) => `${value} complaints`}
                    yAxisWidth={40}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Complaints by Category</CardTitle>
                  <CardDescription>Distribution across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart
                    className="h-[300px]"
                    data={complaintsByCategory}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value} complaints`}
                    colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resolution Time by Category</CardTitle>
                <CardDescription>Average days to resolve by category</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  className="h-[300px]"
                  data={resolutionTime}
                  index="category"
                  categories={["time"]}
                  colors={["purple"]}
                  valueFormatter={(value) => `${value} days`}
                  yAxisWidth={40}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complaint Status Distribution</CardTitle>
                <CardDescription>Current status of all complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="font-medium">{pendingCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Investigating</span>
                    </div>
                    <span className="font-medium">{investigatingCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Judging</span>
                    </div>
                    <span className="font-medium">{judgingCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Resolved</span>
                    </div>
                    <span className="font-medium">{resolvedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Rejected</span>
                    </div>
                    <span className="font-medium">{rejectedCount}</span>
                  </div>

                  <div className="h-4 w-full bg-gray-100 rounded-full mt-4 overflow-hidden flex">
                    {pendingCount > 0 && (
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${(pendingCount / allComplaints.length) * 100}%` }}
                      ></div>
                    )}
                    {investigatingCount > 0 && (
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(investigatingCount / allComplaints.length) * 100}%` }}
                      ></div>
                    )}
                    {judgingCount > 0 && (
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${(judgingCount / allComplaints.length) * 100}%` }}
                      ></div>
                    )}
                    {resolvedCount > 0 && (
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(resolvedCount / allComplaints.length) * 100}%` }}
                      ></div>
                    )}
                    {rejectedCount > 0 && (
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${(rejectedCount / allComplaints.length) * 100}%` }}
                      ></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Meetings and important dates</CardDescription>
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
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Complaints</CardTitle>
                <CardDescription>Latest complaints filed by citizens</CardDescription>
              </div>
              <Button asChild>
                <a href="/admin/complaints">View All Complaints</a>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.id}</TableCell>
                      <TableCell>{complaint.title}</TableCell>
                      <TableCell>{complaint.category}</TableCell>
                      <TableCell>{complaint.date}</TableCell>
                      <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/admin/complaints/${complaint.id}`}>
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{pendingCount}</div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                  <a href="/admin/complaints?status=pending">View pending complaints</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Investigating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{investigatingCount}</div>
                  <Search className="h-8 w-8 text-blue-500" />
                </div>
                <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                  <a href="/admin/complaints?status=investigating">View investigating complaints</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{resolvedCount}</div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                  <a href="/admin/complaints?status=resolved">View resolved complaints</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{rejectedCount}</div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                  <a href="/admin/complaints?status=rejected">View rejected complaints</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and roles</CardDescription>
              </div>
              <Button asChild>
                <a href="/admin/users/new">
                  <UserPlus className="mr-2 h-4 w-4" /> Add New User
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Citizens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{citizenCount}</div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                      <a href="/admin/users?role=citizen">View citizens</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Officers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{officerCount}</div>
                      <Shield className="h-8 w-8 text-green-500" />
                    </div>
                    <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                      <a href="/admin/users?role=officer">View officers</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Analysts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{analystCount}</div>
                      <BarChart3 className="h-8 w-8 text-purple-500" />
                    </div>
                    <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                      <a href="/admin/users?role=analyst">View analysts</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Admins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{adminCount}</div>
                      <Settings className="h-8 w-8 text-red-500" />
                    </div>
                    <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                      <a href="/admin/users?role=admin">View admins</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.slice(0, 5).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/admin/users/${user.id}`}>
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/admin/users">View All Users</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Department Management</p>
                      <p className="text-sm text-muted-foreground">Configure departments and assign officers</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/settings/departments">Manage Departments</a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Role Permissions</p>
                      <p className="text-sm text-muted-foreground">Configure access permissions for each role</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/settings/roles">Manage Roles</a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Notification Templates</p>
                      <p className="text-sm text-muted-foreground">Configure email and SMS notification templates</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/settings/notifications">Manage Templates</a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">System Configuration</p>
                      <p className="text-sm text-muted-foreground">Configure system-wide settings and parameters</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/settings/system">System Settings</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Access detailed analytics and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Performance Dashboard</p>
                      <p className="text-sm text-muted-foreground">View detailed performance metrics and KPIs</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/analytics/performance">View Dashboard</a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Report Generation</p>
                      <p className="text-sm text-muted-foreground">Generate custom reports for different departments</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/analytics/reports">Generate Reports</a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fraud Analytics</p>
                      <p className="text-sm text-muted-foreground">View fraud detection metrics and patterns</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/analytics/fraud">View Fraud Analytics</a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-full bg-muted">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">User Activity</p>
                      <p className="text-sm text-muted-foreground">Monitor user engagement and activity patterns</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <a href="/admin/analytics/users">View User Activity</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor system performance and health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Server Uptime</div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">99.98%</div>
                    <div className="text-green-500 text-sm">↑ 0.02%</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "99.98%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Average Response Time</div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">245ms</div>
                    <div className="text-green-500 text-sm">↓ 12ms</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Last 24 hours</div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Database Performance</div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">92%</div>
                    <div className="text-green-500 text-sm">↑ 3%</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Optimization score</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/admin/system/health">View Detailed Health Metrics</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
