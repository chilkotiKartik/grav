"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react"

// Sample complaint data
const sampleComplaints = [
  {
    id: "GRV1001",
    title: "Pothole on Main Street",
    category: "Infrastructure",
    status: "resolved",
  },
  {
    id: "GRV1002",
    title: "Garbage Overflowing",
    category: "Sanitation",
    status: "investigating",
  },
  {
    id: "GRV1003",
    title: "Streetlight Not Working",
    category: "Security",
    status: "pending",
  },
  {
    id: "GRV1004",
    title: "Water Leak",
    category: "Sanitation",
    status: "rejected",
  },
  {
    id: "GRV1005",
    title: "Sewage Backup",
    category: "Sanitation",
    status: "investigating",
  },
  {
    id: "GRV1006",
    title: "Broken Park Bench",
    category: "Infrastructure",
    status: "resolved",
  },
]

export function FloatingComplaints() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Helper function to get status color
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

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "investigating":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return ""
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <AlertTriangle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {sampleComplaints.map((complaint, index) => {
        // Calculate random positions and animation delays
        const left = Math.random() * 80 + 10 // 10% to 90%
        const top = Math.random() * 80 + 10 // 10% to 90%
        const delay = Math.random() * 2 // 0 to 2 seconds
        const duration = 5 + Math.random() * 5 // 5 to 10 seconds

        return (
          <motion.div
            key={complaint.id}
            className="absolute bubble"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card className="w-48 p-3 shadow-lg glassmorphism">
              <div className={`h-1 w-full rounded-full mb-2 ${getStatusColor(complaint.status)}`} />
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium">{complaint.id}</span>
                <Badge variant="outline" className={getStatusBadge(complaint.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(complaint.status)}
                    <span className="capitalize">{complaint.status}</span>
                  </div>
                </Badge>
              </div>
              <h3 className="text-sm font-medium mb-1">{complaint.title}</h3>
              <Badge variant="outline" className="text-xs">
                {complaint.category}
              </Badge>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
