"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { BarChart3, MapPin, TrendingUp, Filter, Download, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import {
  mockComplaintsByCategory,
  mockComplaintsByLocation,
  mockComplaintTrends,
  mockResolutionRates,
  mockHeatmapData,
} from "@/lib/mock-data"

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30")
  const [region, setRegion] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Helper function to get badge class based on change percentage
  function getBadgeClass(change: number) {
    if (change > 0) return "bg-red-500/10 text-red-500 border-red-500/20"
    if (change < 0) return "bg-green-500/10 text-green-500 border-green-500/20"
    return ""
  }

  // Summary cards data
  const summaryCards = [
    {
      title: "Total Complaints",
      value: "1,248",
      trend: { value: 12, isPositive: true },
      icon: BarChart3,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Resolved",
      value: "856",
      trend: { value: 8, isPositive: true },
      icon: CheckCircle,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "In Progress",
      value: "342",
      trend: { value: 5, isPositive: false },
      icon: Clock,
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Rejected",
      value: "50",
      trend: { value: 2, isPositive: false },
      icon: XCircle,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
  ]

  // Top complaint areas
  const topAreas = [
    { name: "Central District", count: 245, change: 12 },
    { name: "North Zone", count: 187, change: -5 },
    { name: "South Market", count: 156, change: 8 },
    { name: "East Riverside", count: 132, change: 3 },
    { name: "West Hills", count: 98, change: -10 },
  ]

  // Region categories
  const regionCategories = [
    {
      region: "North District",
      total: 320,
      categories: [
        { name: "Sanitation", count: 120 },
        { name: "Security", count: 80 },
        { name: "Infrastructure", count: 100 },
        { name: "Corruption", count: 20 },
      ],
    },
    {
      region: "South District",
      total: 280,
      categories: [
        { name: "Sanitation", count: 70 },
        { name: "Security", count: 110 },
        { name: "Infrastructure", count: 60 },
        { name: "Corruption", count: 40 },
      ],
    },
    {
      region: "East District",
      total: 210,
      categories: [
        { name: "Sanitation", count: 50 },
        { name: "Security", count: 40 },
        { name: "Infrastructure", count: 90 },
        { name: "Corruption", count: 30 },
      ],
    },
  ]

  // Render the overview tab content
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
                    <h3 className="text-2xl font-bold mb-1">{card.value}</h3>
                    <div className="flex items-center text-xs">
                      <span className={card.trend.isPositive ? "text-green-500" : "text-red-500"}>
                        {card.trend.isPositive ? (
                          <TrendingUp className="h-3 w-3 inline mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 inline mr-1 rotate-180" />
                        )}
                        {card.trend.value}%
                      </span>
                      <span className="text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${card.iconBg}`}>
                    <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
              <CardDescription>Distribution of complaints across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={mockComplaintsByCategory}
                index="category"
                categories={["value"]}
                valueFormatter={(value) => `${value} complaints`}
                colors={["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]}
                className="h-80"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaint Resolution Rate</CardTitle>
              <CardDescription>Percentage of resolved complaints over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={mockResolutionRates}
                index="date"
                categories={["rate"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value}%`}
                className="h-80"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaints by Location</CardTitle>
              <CardDescription>Number of complaints by district</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={mockComplaintsByLocation}
                index="location"
                categories={["count"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value} complaints`}
                className="h-96"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )

  // Render the heatmap tab content
  const renderHeatmapTab = () => (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Complaint Heatmap</CardTitle>
            <CardDescription>Geographic distribution of complaints</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative w-full h-[600px] bg-muted rounded-lg overflow-hidden">
              {/* This would be a real map in a production app */}
              <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950/20">
                <div className="w-full h-full relative">
                  {/* Simulated heatmap with dots */}
                  {mockHeatmapData.map((point, index) => (
                    <div
                      key={index}
                      className="absolute rounded-full animate-pulse-glow"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${point.intensity * 30}px`,
                        height: `${point.intensity * 30}px`,
                        backgroundColor: `rgba(59, 130, 246, ${point.intensity * 0.5})`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}

                  {/* City markers */}
                  <div className="absolute left-[25%] top-[30%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs">North District</div>
                  </div>
                  <div className="absolute left-[75%] top-[40%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs">East District</div>
                  </div>
                  <div className="absolute left-[30%] top-[70%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs">West District</div>
                  </div>
                  <div className="absolute left-[65%] top-[75%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs">South District</div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                    <div className="text-sm font-medium mb-2">Complaint Density</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full h-2 rounded-full heatmap-gradient"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Complaint Areas</CardTitle>
              <CardDescription>Areas with highest complaint density</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="mr-2">{index + 1}</Badge>
                      <span>{area.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{area.count}</span>
                      <Badge variant="outline" className={getBadgeClass(area.change)}>
                        {area.change > 0 ? `+${area.change}%` : `${area.change}%`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaint Categories by Region</CardTitle>
              <CardDescription>Most common issues by area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionCategories.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{item.region}</h4>
                      <Badge variant="outline">{item.total} complaints</Badge>
                    </div>
                    <div className="space-y-1">
                      {item.categories.map((category, catIndex) => (
                        <div key={catIndex} className="flex items-center">
                          <div className="w-full bg-muted rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(category.count / item.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center min-w-[120px]">
                            <span className="text-sm">{category.name}</span>
                            <span className="text-sm font-medium">
                              {Math.round((category.count / item.total) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )

  // Render the trends tab content
  const renderTrendsTab = () => (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Complaint Trends Over Time</CardTitle>
            <CardDescription>Monthly complaint volume by category</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={mockComplaintTrends}
              index="month"
              categories={["sanitation", "security", "infrastructure", "corruption"]}
              colors={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]}
              valueFormatter={(value) => `${value} complaints`}
              className="h-96"
            />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Resolution Time Trends</CardTitle>
              <CardDescription>Average days to resolve complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { category: "Sanitation", value: 12 },
                  { category: "Security", value: 18 },
                  { category: "Infrastructure", value: 25 },
                  { category: "Corruption", value: 32 },
                ]}
                index="category"
                categories={["value"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value} days`}
                className="h-80"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaint Status Distribution</CardTitle>
              <CardDescription>Current status of all complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={[
                  { status: "Pending", value: 124 },
                  { status: "Investigating", value: 86 },
                  { status: "Resolved", value: 215 },
                  { status: "Rejected", value: 35 },
                ]}
                index="status"
                categories={["value"]}
                valueFormatter={(value) => `${value} complaints`}
                colors={["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]}
                className="h-80"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Patterns</CardTitle>
            <CardDescription>Complaint volume by month and category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Seasonal heatmap visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

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
              <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Visualize complaint data and identify trends</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-[180px]">
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North Zone</SelectItem>
                  <SelectItem value="south">South Zone</SelectItem>
                  <SelectItem value="east">East Zone</SelectItem>
                  <SelectItem value="west">West Zone</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> More Filters
              </Button>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          {/* Completely restructured Tabs component */}
          <div className="mt-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
                <TabsContent value="heatmap">{renderHeatmapTab()}</TabsContent>
                <TabsContent value="trends">{renderTrendsTab()}</TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
