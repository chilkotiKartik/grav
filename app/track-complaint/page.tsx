"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUser } from "@/components/user-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, FileText, Clock, CheckCircle, AlertCircle, XCircle, ChevronRight, User } from "lucide-react"
import { mockComplaints } from "@/lib/mock-data"

export default function TrackComplaintPage() {
  const { user } = useUser()
  const [searchId, setSearchId] = useState("")
  const [searchResult, setSearchResult] = useState<any | null>(null)
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null)

  // Handle search by ID
  const handleSearch = () => {
    if (!searchId.trim()) return

    const complaint = mockComplaints.find((c) => c.id.toLowerCase() === searchId.toLowerCase())

    setSearchResult(complaint || "not_found")
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500"
      case "investigating":
        return "bg-blue-500"
      case "resolved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Pending
          </Badge>
        )
      case "investigating":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Investigating
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Resolved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Filter user complaints
  const userComplaints = user ? mockComplaints.filter((c) => c.userId === user.id) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Track Your Complaint</h1>
          <p className="text-muted-foreground">Enter your complaint ID or view your submitted complaints</p>
        </div>

        <Tabs defaultValue={user ? "my-complaints" : "search"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search by ID</TabsTrigger>
            <TabsTrigger value="my-complaints" disabled={!user}>
              My Complaints
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Track by Complaint ID</CardTitle>
                <CardDescription>Enter your complaint ID to check its status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter complaint ID (e.g., GRV1234)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                  <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {searchResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {searchResult === "not_found" ? (
                  <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                        <h3 className="text-lg font-medium">Complaint Not Found</h3>
                        <p className="text-muted-foreground">
                          We couldn't find a complaint with the ID "{searchId}". Please check the ID and try again.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Complaint #{searchResult.id}</span>
                        {getStatusBadge(searchResult.status)}
                      </CardTitle>
                      <CardDescription>{searchResult.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ComplaintTimeline complaint={searchResult} />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedComplaint(searchResult)}>
                        View Full Details
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="my-complaints">
            {userComplaints.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>Track all your submitted complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userComplaints.map((complaint) => (
                        <TableRow key={complaint.id}>
                          <TableCell className="font-medium">{complaint.id}</TableCell>
                          <TableCell>{complaint.title}</TableCell>
                          <TableCell>{complaint.date}</TableCell>
                          <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedComplaint(complaint)}>
                              View <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No Complaints Found</h3>
                    <p className="text-muted-foreground">You haven't submitted any complaints yet.</p>
                    <Button className="mt-4" asChild>
                      <a href="/file-complaint">File a Complaint</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Complaint Detail Dialog */}
        {selectedComplaint && (
          <Dialog open={!!selectedComplaint} onOpenChange={(open) => !open && setSelectedComplaint(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>Complaint #{selectedComplaint.id}</span>
                  {getStatusBadge(selectedComplaint.status)}
                </DialogTitle>
                <DialogDescription>{selectedComplaint.title}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Complaint Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium capitalize">{selectedComplaint.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subcategory:</span>
                        <span className="font-medium capitalize">{selectedComplaint.subcategory}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date Filed:</span>
                        <span className="font-medium">{selectedComplaint.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{selectedComplaint.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Assigned Officer</h4>
                    {selectedComplaint.officer ? (
                      <div className="flex items-center space-x-3 p-3 rounded-md border">
                        <Avatar>
                          <AvatarImage src={`/avatars/officer-${selectedComplaint.officer.id}.png`} />
                          <AvatarFallback>{selectedComplaint.officer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{selectedComplaint.officer.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedComplaint.officer.department}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-md border text-sm text-muted-foreground">Not yet assigned</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <div className="p-3 rounded-md border text-sm">{selectedComplaint.description}</div>
                </div>

                <ComplaintTimeline complaint={selectedComplaint} />

                <div>
                  <h4 className="text-sm font-medium mb-2">Comments</h4>
                  {selectedComplaint.comments && selectedComplaint.comments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedComplaint.comments.map((comment: any, index: number) => (
                        <div key={index} className="p-3 rounded-md border">
                          <div className="flex items-center space-x-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-md border text-sm text-muted-foreground">No comments yet</div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Complaint Timeline Component
function ComplaintTimeline({ complaint }: { complaint: any }) {
  const getStepStatus = (step: string) => {
    const statusMap: Record<string, number> = {
      pending: 1,
      investigating: 2,
      judging: 3,
      resolved: 4,
      rejected: 4,
    }

    const currentStatus = statusMap[complaint.status.toLowerCase()] || 0
    const stepStatus = statusMap[step.toLowerCase()] || 0

    if (currentStatus > stepStatus) return "completed"
    if (currentStatus === stepStatus) return "current"
    return "upcoming"
  }

  const getStepIcon = (step: string, status: string) => {
    if (status === "completed") {
      return <CheckCircle className="h-6 w-6 text-green-500" />
    }

    if (status === "current") {
      if (step === "rejected") {
        return <XCircle className="h-6 w-6 text-red-500" />
      }
      return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />
    }

    switch (step.toLowerCase()) {
      case "filed":
        return <FileText className="h-6 w-6 text-muted-foreground" />
      case "investigating":
        return <Search className="h-6 w-6 text-muted-foreground" />
      case "judging":
        return <User className="h-6 w-6 text-muted-foreground" />
      case "resolved":
        return <CheckCircle className="h-6 w-6 text-muted-foreground" />
      case "rejected":
        return <XCircle className="h-6 w-6 text-muted-foreground" />
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />
    }
  }

  const steps = [
    { name: "Filed", date: complaint.date },
    { name: "Investigating", date: complaint.investigatingDate || "" },
    { name: "Judging", date: complaint.judgingDate || "" },
    {
      name: complaint.status.toLowerCase() === "rejected" ? "Rejected" : "Resolved",
      date: complaint.resolvedDate || complaint.rejectedDate || "",
    },
  ]

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Complaint Timeline</h4>
      <div className="relative">
        {steps.map((step, index) => {
          const status = getStepStatus(step.name)

          return (
            <div key={index} className="flex mb-6 last:mb-0">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    status === "completed"
                      ? "bg-green-100 dark:bg-green-900/20"
                      : status === "current"
                        ? step.name.toLowerCase() === "rejected"
                          ? "bg-red-100 dark:bg-red-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                        : "bg-muted"
                  }`}
                >
                  {getStepIcon(step.name, status)}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-full ${status === "completed" ? "bg-green-500" : "bg-muted-foreground/30"}`}
                  />
                )}
              </div>
              <div className="pt-1.5">
                <h3
                  className={`text-sm font-medium ${
                    status === "completed"
                      ? "text-green-500"
                      : status === "current"
                        ? step.name.toLowerCase() === "rejected"
                          ? "text-red-500"
                          : "text-blue-500"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {step.date || (status === "upcoming" ? "Pending" : "In Progress")}
                </p>
                {status === "current" && step.name.toLowerCase() === "investigating" && (
                  <p className="text-xs mt-1 text-blue-500">Officer is reviewing your complaint</p>
                )}
                {status === "current" && step.name.toLowerCase() === "judging" && (
                  <p className="text-xs mt-1 text-blue-500">Final decision is being made</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
