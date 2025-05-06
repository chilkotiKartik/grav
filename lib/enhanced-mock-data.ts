import {
  FileText,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Leaf,
  Zap,
  Droplet,
  Trash2,
  RouteIcon as Road,
  type LucideIcon,
} from "lucide-react"

// User roles
export type UserRole = "citizen" | "admin" | "officer" | "analyst" | null

// User interface
export interface User {
  id: number
  name: string
  role: UserRole
  points?: number
  avatar?: string
  email?: string
  phone?: string
  address?: string
  joinDate?: string
  bio?: string
  badges?: string[]
  preferences?: {
    notifications: boolean
    emailUpdates: boolean
    smsAlerts: boolean
  }
  recentActivity?: UserActivity[]
  stats?: UserStat[]
  achievements?: UserAchievement[]
}

export interface UserActivity {
  type: string
  title: string
  description: string
  date: string
  points?: number
  icon: LucideIcon
}

export interface UserStat {
  title: string
  value: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: LucideIcon
}

export interface UserAchievement {
  name: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  date?: string
  progress?: number
  target?: number
}

// Complaint status type
export type ComplaintStatus = "pending" | "investigating" | "resolved" | "rejected" | "judging"

// Complaint interface
export interface Complaint {
  id: string
  userId: number
  title: string
  category: string
  subcategory: string
  date: string
  location: string
  description: string
  status: ComplaintStatus
  investigatingDate?: string
  resolvedDate?: string
  rejectedDate?: string
  judgingDate?: string
  officer?: {
    id: number
    name: string
    department: string
  }
  comments?: {
    author: string
    date: string
    text: string
  }[]
  images?: string[]
  priority?: "low" | "medium" | "high" | "critical"
  fraudRisk?: "low" | "medium" | "high"
  fraudScore?: number
  timeline?: {
    date: string
    status: string
    description: string
    actor?: string
  }[]
}

// Testimonial interface
export interface Testimonial {
  quote: string
  author: string
  role: string
  avatarSrc?: string
  rating?: number
}

// Stat item interface
export interface StatItem {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

// Townhall message interface
export interface TownhallMessage {
  id: string
  userId: number
  userName: string
  userAvatar?: string
  text: string
  timestamp: string
  likes: number
  isOfficial: boolean
  attachments?: {
    type: "image" | "document" | "link"
    url: string
    title?: string
  }[]
  replies?: {
    id: string
    userId: number
    userName: string
    userAvatar?: string
    text: string
    timestamp: string
    likes: number
  }[]
}

// Upcoming townhall interface
export interface UpcomingTownhall {
  title: string
  description: string
  date: string
  time: string
  host: string
  department: string
  isSpecial: boolean
  attendees?: number
  topics?: string[]
  location?: string
  virtualMeetingLink?: string
}

// Government scheme interface
export interface GovernmentScheme {
  id: number
  title: string
  category: string
  description: string
  eligibility: string
  benefits: string
  documents: string[]
  applicationProcess: string
  icon: LucideIcon
  color: string
  deadline?: string
  budget?: string
  beneficiaries?: number
  website?: string
  contactPhone?: string
  contactEmail?: string
  faqs?: {
    question: string
    answer: string
  }[]
  status: "active" | "upcoming" | "closed"
  launchDate?: string
  applicationFee?: string
  processingTime?: string
  successRate?: number
}

// Fraud case interface
export interface FraudCase {
  id: number
  title: string
  description: string
  category: string
  details: {
    [key: string]: any
  }
  fraudStatus: "Fraud" | "Legitimate" | "Suspicious"
  confidenceScore: number
  detectedDate?: string
  reportedBy?: string
  status?: "investigating" | "confirmed" | "dismissed" | "pending"
  assignedTo?: string
  evidenceCount?: number
  financialImpact?: string
  relatedCases?: number[]
}

// Fraud alert interface
export interface FraudAlert {
  title: string
  description: string
  severity: "high" | "medium" | "low"
  date: string
  location?: string
  category?: string
  affectedScheme?: string
}

// Mock users with different roles
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Citizen",
    role: "citizen",
    points: 350,
    avatar: "/avatars/1.png",
    email: "alice@example.com",
    phone: "+91 98765 43210",
    address: "123 Citizen Lane, North District",
    joinDate: "2023-05-15",
    bio: "Active community member passionate about improving local infrastructure.",
    badges: ["First Complaint", "Fraud Buster", "Community Voice"],
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false,
    },
    recentActivity: [
      {
        type: "complaint",
        title: "Complaint Filed",
        description: "You filed a complaint about a pothole on Main Street",
        date: "Today, 9:30 AM",
        points: 15,
        icon: FileText,
      },
      {
        type: "townhall",
        title: "Townhall Participation",
        description: "You participated in the Infrastructure Development townhall",
        date: "Yesterday, 6:15 PM",
        points: 20,
        icon: Users,
      },
      {
        type: "fraud",
        title: "Fraud Report",
        description: "You reported a potential subsidy fraud case",
        date: "July 18, 2024",
        points: 25,
        icon: Shield,
      },
    ],
    stats: [
      {
        title: "Complaints Filed",
        value: "3",
        trend: {
          value: 50,
          isPositive: true,
        },
        icon: FileText,
      },
      {
        title: "Townhalls Attended",
        value: "2",
        trend: {
          value: 100,
          isPositive: true,
        },
        icon: Users,
      },
      {
        title: "Fraud Reports",
        value: "1",
        trend: {
          value: 0,
          isPositive: true,
        },
        icon: Shield,
      },
    ],
    achievements: [
      {
        name: "First Complaint",
        description: "File your first complaint",
        icon: FileText,
        unlocked: true,
        date: "May 20, 2024",
      },
      {
        name: "Active Citizen",
        description: "File 5 complaints",
        icon: FileText,
        progress: 3,
        target: 5,
        unlocked: false,
      },
      {
        name: "Civic Champion",
        description: "File 20 complaints",
        icon: FileText,
        progress: 3,
        target: 20,
        unlocked: false,
      },
    ],
  },
  {
    id: 2,
    name: "Bob Admin",
    role: "admin",
    avatar: "/avatars/2.png",
    email: "bob@example.com",
    phone: "+91 87654 32109",
    address: "456 Admin Avenue, Central District",
    joinDate: "2022-11-10",
    bio: "System administrator with 5 years of experience in civic tech platforms.",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: true,
    },
  },
  {
    id: 3,
    name: "Officer Carol",
    role: "officer",
    avatar: "/avatars/3.png",
    email: "carol@example.com",
    phone: "+91 76543 21098",
    address: "789 Officer Street, East District",
    joinDate: "2023-01-22",
    bio: "Municipal officer specializing in infrastructure and sanitation issues.",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: true,
    },
  },
  {
    id: 4,
    name: "Analyst Dave",
    role: "analyst",
    avatar: "/avatars/4.png",
    email: "dave@example.com",
    phone: "+91 65432 10987",
    address: "101 Analyst Road, West District",
    joinDate: "2023-03-05",
    bio: "Data analyst with expertise in identifying patterns and trends in civic complaints.",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false,
    },
  },
  {
    id: 5,
    name: "Eve Citizen",
    role: "citizen",
    points: 780,
    avatar: "/avatars/5.png",
    email: "eve@example.com",
    phone: "+91 54321 09876",
    address: "202 Citizen Street, South District",
    joinDate: "2022-08-30",
    bio: "Community activist focused on improving public safety and security.",
    badges: ["Civic Leader", "Watchful Eye", "Problem Solver"],
    preferences: {
      notifications: true,
      emailUpdates: false,
      smsAlerts: true,
    },
  },
  {
    id: 6,
    name: "Raj Kumar",
    role: "citizen",
    points: 650,
    avatar: "/avatars/6.png",
    email: "raj@example.com",
    phone: "+91 43210 98765",
    address: "303 Kumar Lane, North District",
    joinDate: "2022-10-12",
    bio: "Retired teacher committed to improving educational facilities in the community.",
    badges: ["Community Voice", "Problem Solver"],
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false,
    },
  },
  {
    id: 7,
    name: "Priya Singh",
    role: "citizen",
    points: 320,
    avatar: "/avatars/7.png",
    email: "priya@example.com",
    phone: "+91 32109 87654",
    address: "404 Singh Road, East District",
    joinDate: "2023-02-18",
    bio: "Environmental advocate working to improve sanitation and waste management.",
    badges: ["First Complaint", "Community Voice"],
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: true,
    },
  },
  {
    id: 8,
    name: "Amit Patel",
    role: "citizen",
    points: 280,
    avatar: "/avatars/8.png",
    email: "amit@example.com",
    phone: "+91 21098 76543",
    address: "505 Patel Avenue, West District",
    joinDate: "2023-04-05",
    bio: "Small business owner interested in improving local infrastructure and reducing corruption.",
    badges: ["First Complaint"],
    preferences: {
      notifications: false,
      emailUpdates: true,
      smsAlerts: false,
    },
  },
  {
    id: 9,
    name: "Officer Sharma",
    role: "officer",
    avatar: "/avatars/9.png",
    email: "sharma@example.com",
    phone: "+91 10987 65432",
    address: "606 Officer Boulevard, Central District",
    joinDate: "2022-12-15",
    bio: "Senior officer specializing in corruption cases and fraud detection.",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: true,
    },
  },
  {
    id: 10,
    name: "Analyst Gupta",
    role: "analyst",
    avatar: "/avatars/10.png",
    email: "gupta@example.com",
    phone: "+91 09876 54321",
    address: "707 Analyst Circle, South District",
    joinDate: "2023-01-10",
    bio: "Data scientist with background in fraud detection and pattern recognition.",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false,
    },
  },
]

// Enhanced mock complaints with more details
export const enhancedMockComplaints: Complaint[] = [
  {
    id: "GRV1001",
    userId: 1,
    title: "Pothole on Main Street",
    category: "Infrastructure",
    subcategory: "Roads",
    date: "2024-07-15",
    location: "123 Main Street, North District",
    description:
      "Large pothole causing damage to vehicles. It's approximately 2 feet wide and 8 inches deep. Several cars have already been damaged.",
    status: "pending",
    officer: { id: 3, name: "Officer Carol", department: "Roads Department" },
    comments: [
      { author: "Alice Citizen", date: "2024-07-16", text: "This pothole is a serious hazard!" },
      { author: "Officer Carol", date: "2024-07-17", text: "Thank you for reporting. We've scheduled an inspection." },
    ],
    images: ["/images/pothole1.png", "/images/pothole2.png"],
    priority: "high",
    timeline: [
      {
        date: "2024-07-15 10:30 AM",
        status: "submitted",
        description: "Complaint submitted by Alice Citizen",
      },
      {
        date: "2024-07-15 11:45 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-16 09:15 AM",
        status: "assigned",
        description: "Assigned to Roads Department",
        actor: "System",
      },
      {
        date: "2024-07-17 02:30 PM",
        status: "inspection_scheduled",
        description: "Inspection scheduled for July 18",
        actor: "Officer Carol",
      },
    ],
  },
  {
    id: "GRV1002",
    userId: 5,
    title: "Garbage Overflowing",
    category: "Sanitation",
    subcategory: "Garbage Collection",
    date: "2024-07-10",
    location: "456 Oak Avenue, East District",
    description:
      "Garbage bins overflowing, attracting pests. The waste hasn't been collected for over a week and is causing a foul smell in the area.",
    status: "investigating",
    investigatingDate: "2024-07-12",
    officer: { id: 3, name: "Officer Carol", department: "Sanitation Department" },
    comments: [
      { author: "Eve Citizen", date: "2024-07-11", text: "The smell is unbearable. Please address this urgently!" },
      {
        author: "Officer Carol",
        date: "2024-07-12",
        text: "Investigation initiated. Sanitation team will visit today.",
      },
    ],
    images: ["/images/garbage1.png"],
    priority: "medium",
    timeline: [
      {
        date: "2024-07-10 08:45 AM",
        status: "submitted",
        description: "Complaint submitted by Eve Citizen",
      },
      {
        date: "2024-07-10 09:30 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-11 10:15 AM",
        status: "assigned",
        description: "Assigned to Sanitation Department",
        actor: "System",
      },
      {
        date: "2024-07-12 11:00 AM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Carol",
      },
    ],
  },
  {
    id: "GRV1003",
    userId: 1,
    title: "Streetlight Not Working",
    category: "Security",
    subcategory: "Street Lights",
    date: "2024-07-05",
    location: "789 Pine Lane, West District",
    description:
      "Streetlight is out, making the area unsafe at night. This is a busy pedestrian area and the darkness is creating safety concerns.",
    status: "resolved",
    resolvedDate: "2024-07-12",
    officer: { id: 3, name: "Officer Carol", department: "Electrical Department" },
    comments: [
      { author: "Alice Citizen", date: "2024-07-06", text: "It's been dark for three nights now. Please fix it." },
      {
        author: "Officer Carol",
        date: "2024-07-08",
        text: "Electrical team has been notified and will replace the bulb.",
      },
      {
        author: "Officer Carol",
        date: "2024-07-12",
        text: "The streetlight has been repaired and is now functioning properly.",
      },
    ],
    images: ["/images/streetlight.png"],
    priority: "medium",
    timeline: [
      {
        date: "2024-07-05 07:30 PM",
        status: "submitted",
        description: "Complaint submitted by Alice Citizen",
      },
      {
        date: "2024-07-06 09:00 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-07 10:30 AM",
        status: "assigned",
        description: "Assigned to Electrical Department",
        actor: "System",
      },
      {
        date: "2024-07-08 02:15 PM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Carol",
      },
      {
        date: "2024-07-10 11:30 AM",
        status: "in_progress",
        description: "Repair team dispatched",
        actor: "Officer Carol",
      },
      {
        date: "2024-07-12 03:45 PM",
        status: "resolved",
        description: "Streetlight repaired and functioning",
        actor: "Officer Carol",
      },
    ],
  },
  {
    id: "GRV1004",
    userId: 5,
    title: "Water Leak",
    category: "Sanitation",
    subcategory: "Water Quality",
    date: "2024-07-01",
    location: "101 Elm Street, South District",
    description: "Water leaking from a pipe on the main road. It's creating a puddle and wasting clean water.",
    status: "rejected",
    rejectedDate: "2024-07-08",
    officer: { id: 3, name: "Officer Carol", department: "Water Department" },
    comments: [
      { author: "Eve Citizen", date: "2024-07-02", text: "The leak is getting worse each day." },
      {
        author: "Officer Carol",
        date: "2024-07-08",
        text: "After inspection, we determined this is on private property and must be addressed by the property owner.",
      },
    ],
    images: ["/images/water-leak.png"],
    priority: "low",
    timeline: [
      {
        date: "2024-07-01 11:20 AM",
        status: "submitted",
        description: "Complaint submitted by Eve Citizen",
      },
      {
        date: "2024-07-01 01:30 PM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-03 09:45 AM",
        status: "assigned",
        description: "Assigned to Water Department",
        actor: "System",
      },
      {
        date: "2024-07-05 10:30 AM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Carol",
      },
      {
        date: "2024-07-08 02:15 PM",
        status: "rejected",
        description: "Complaint rejected - Issue on private property",
        actor: "Officer Carol",
      },
    ],
  },
  {
    id: "GRV1005",
    userId: 1,
    title: "Sewage Backup",
    category: "Sanitation",
    subcategory: "Sewage Issues",
    date: "2024-06-25",
    location: "222 Maple Drive, North District",
    description:
      "Sewage backing up into the street. The smell is terrible and it's creating a health hazard for residents.",
    status: "judging",
    judgingDate: "2024-07-02",
    officer: { id: 3, name: "Officer Carol", department: "Sewage Department" },
    comments: [
      {
        author: "Alice Citizen",
        date: "2024-06-26",
        text: "This is a serious health concern. Please address immediately.",
      },
      {
        author: "Officer Carol",
        date: "2024-07-02",
        text: "Our team has inspected the issue. We're determining the best course of action.",
      },
    ],
    images: ["/images/sewage.png"],
    priority: "critical",
    fraudRisk: "low",
    timeline: [
      {
        date: "2024-06-25 08:15 AM",
        status: "submitted",
        description: "Complaint submitted by Alice Citizen",
      },
      {
        date: "2024-06-25 09:30 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-06-26 11:00 AM",
        status: "assigned",
        description: "Assigned to Sewage Department",
        actor: "System",
      },
      {
        date: "2024-07-01 10:30 AM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Carol",
      },
      {
        date: "2024-07-02 03:45 PM",
        status: "judging",
        description: "Evaluating severity and required resources",
        actor: "Officer Carol",
      },
    ],
  },
  {
    id: "GRV1006",
    userId: 6,
    title: "Broken Park Bench",
    category: "Infrastructure",
    subcategory: "Public Facilities",
    date: "2024-07-08",
    location: "Central Park, Central District",
    description:
      "Park bench is broken and has sharp edges. It's dangerous, especially for children who play in the area.",
    status: "resolved",
    resolvedDate: "2024-07-14",
    officer: { id: 9, name: "Officer Sharma", department: "Parks Department" },
    comments: [
      { author: "Raj Kumar", date: "2024-07-09", text: "My grandson almost got hurt on this bench yesterday." },
      { author: "Officer Sharma", date: "2024-07-10", text: "Parks maintenance team has been notified." },
      { author: "Officer Sharma", date: "2024-07-14", text: "The bench has been repaired and is now safe to use." },
    ],
    images: ["/images/bench.png"],
    priority: "medium",
    timeline: [
      {
        date: "2024-07-08 04:30 PM",
        status: "submitted",
        description: "Complaint submitted by Raj Kumar",
      },
      {
        date: "2024-07-09 09:15 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-09 11:30 AM",
        status: "assigned",
        description: "Assigned to Parks Department",
        actor: "System",
      },
      {
        date: "2024-07-10 01:45 PM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Sharma",
      },
      {
        date: "2024-07-12 10:30 AM",
        status: "in_progress",
        description: "Maintenance team dispatched",
        actor: "Officer Sharma",
      },
      {
        date: "2024-07-14 02:15 PM",
        status: "resolved",
        description: "Bench repaired and safe for use",
        actor: "Officer Sharma",
      },
    ],
  },
  {
    id: "GRV1007",
    userId: 7,
    title: "Illegal Dumping",
    category: "Sanitation",
    subcategory: "Waste Management",
    date: "2024-07-12",
    location: "Behind 333 Oak Street, East District",
    description:
      "Someone is illegally dumping construction waste behind our building. There's a growing pile of debris.",
    status: "investigating",
    investigatingDate: "2024-07-13",
    officer: { id: 9, name: "Officer Sharma", department: "Environmental Department" },
    comments: [
      { author: "Priya Singh", date: "2024-07-12", text: "I've seen trucks coming at night to dump materials." },
      {
        author: "Officer Sharma",
        date: "2024-07-13",
        text: "We're investigating and will set up surveillance if necessary.",
      },
    ],
    images: ["/images/dumping.png"],
    priority: "high",
    timeline: [
      {
        date: "2024-07-12 07:45 AM",
        status: "submitted",
        description: "Complaint submitted by Priya Singh",
      },
      {
        date: "2024-07-12 09:30 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-13 10:15 AM",
        status: "assigned",
        description: "Assigned to Environmental Department",
        actor: "System",
      },
      {
        date: "2024-07-13 02:30 PM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Sharma",
      },
    ],
  },
  {
    id: "GRV1008",
    userId: 8,
    title: "Bribery at License Office",
    category: "Corruption",
    subcategory: "Bribery",
    date: "2024-07-07",
    location: "Municipal License Office, Central District",
    description:
      "Officials at the license office are demanding bribes to process applications faster. This has happened multiple times.",
    status: "investigating",
    investigatingDate: "2024-07-09",
    officer: { id: 9, name: "Officer Sharma", department: "Anti-Corruption Unit" },
    comments: [
      {
        author: "Amit Patel",
        date: "2024-07-08",
        text: "I was asked for 500 rupees to 'expedite' my business license.",
      },
      {
        author: "Officer Sharma",
        date: "2024-07-09",
        text: "This is a serious allegation. We've opened an investigation and will contact you for more details.",
      },
    ],
    priority: "high",
    fraudRisk: "high",
    fraudScore: 85,
    timeline: [
      {
        date: "2024-07-07 03:15 PM",
        status: "submitted",
        description: "Complaint submitted by Amit Patel",
      },
      {
        date: "2024-07-08 09:00 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-08 11:30 AM",
        status: "assigned",
        description: "Assigned to Anti-Corruption Unit",
        actor: "System",
      },
      {
        date: "2024-07-09 10:15 AM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Sharma",
      },
    ],
  },
  {
    id: "GRV1009",
    userId: 7,
    title: "Stray Dog Problem",
    category: "Security",
    subcategory: "Public Safety",
    date: "2024-07-14",
    location: "Around School Zone, South District",
    description: "Pack of stray dogs near the school is scaring children. Some dogs appear aggressive.",
    status: "pending",
    officer: null,
    comments: [
      {
        author: "Priya Singh",
        date: "2024-07-14",
        text: "My daughter is afraid to walk to school because of these dogs.",
      },
    ],
    images: ["/images/stray-dogs.png"],
    priority: "medium",
    timeline: [
      {
        date: "2024-07-14 08:30 AM",
        status: "submitted",
        description: "Complaint submitted by Priya Singh",
      },
      {
        date: "2024-07-14 09:45 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
    ],
  },
  {
    id: "GRV1010",
    userId: 6,
    title: "Traffic Signal Malfunction",
    category: "Infrastructure",
    subcategory: "Traffic Management",
    date: "2024-07-13",
    location: "Intersection of Main St and Commerce Ave, West District",
    description: "Traffic signal is stuck on red in all directions. Causing major traffic backup during rush hour.",
    status: "resolved",
    resolvedDate: "2024-07-13",
    officer: { id: 3, name: "Officer Carol", department: "Traffic Department" },
    comments: [
      { author: "Raj Kumar", date: "2024-07-13", text: "Been stuck at this intersection for 20 minutes!" },
      { author: '  date: "2024-07-13', text: "Been stuck at this intersection for 20 minutes!" },
      { author: "Officer Carol", date: "2024-07-13", text: "Emergency traffic team dispatched." },
      { author: "Officer Carol", date: "2024-07-13", text: "Signal has been reset and is now functioning properly." },
    ],
    images: ["/images/traffic-signal.png"],
    priority: "critical",
    timeline: [
      {
        date: "2024-07-13 08:15 AM",
        status: "submitted",
        description: "Complaint submitted by Raj Kumar",
      },
      {
        date: "2024-07-13 08:20 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-13 08:25 AM",
        status: "assigned",
        description: "Assigned to Traffic Department",
        actor: "System",
      },
      {
        date: "2024-07-13 08:30 AM",
        status: "investigating",
        description: "Investigation initiated",
        actor: "Officer Carol",
      },
      {
        date: "2024-07-13 08:45 AM",
        status: "in_progress",
        description: "Emergency traffic team dispatched",
        actor: "Officer Carol",
      },
      {
        date: "2024-07-13 09:30 AM",
        status: "resolved",
        description: "Signal reset and functioning properly",
        actor: "Officer Carol",
      },
    ],
  },
  {
    id: "GRV1011",
    userId: 1,
    title: "Fraudulent Subsidy Claims",
    category: "Corruption",
    subcategory: "Subsidy Fraud",
    date: "2024-07-16",
    location: "Agricultural Department Office, North District",
    description:
      "Multiple farmers in the area are claiming subsidies for land they don't cultivate. I have evidence of ghost beneficiaries.",
    status: "investigating",
    investigatingDate: "2024-07-17",
    officer: { id: 9, name: "Officer Sharma", department: "Anti-Corruption Unit" },
    comments: [
      {
        author: "Alice Citizen",
        date: "2024-07-16",
        text: "I have documentation showing discrepancies in land records.",
      },
      {
        author: "Officer Sharma",
        date: "2024-07-17",
        text: "Thank you for the detailed report. We've initiated a high-priority investigation.",
      },
    ],
    priority: "high",
    fraudRisk: "high",
    fraudScore: 92,
    timeline: [
      {
        date: "2024-07-16 11:30 AM",
        status: "submitted",
        description: "Complaint submitted by Alice Citizen",
      },
      {
        date: "2024-07-16 12:15 PM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
      {
        date: "2024-07-16 02:30 PM",
        status: "assigned",
        description: "Assigned to Anti-Corruption Unit",
        actor: "System",
      },
      {
        date: "2024-07-17 09:15 AM",
        status: "investigating",
        description: "High-priority investigation initiated",
        actor: "Officer Sharma",
      },
    ],
  },
  {
    id: "GRV1012",
    userId: 5,
    title: "School Without Proper Facilities",
    category: "Education",
    subcategory: "School Infrastructure",
    date: "2024-07-15",
    location: "Government Primary School, East District",
    description:
      "The local primary school lacks basic facilities like clean drinking water and functional toilets. Children are suffering.",
    status: "pending",
    officer: null,
    comments: [
      {
        author: "Eve Citizen",
        date: "2024-07-15",
        text: "This situation has been ongoing for months. Please prioritize our children's health.",
      },
    ],
    images: ["/images/school-facilities.png"],
    priority: "high",
    timeline: [
      {
        date: "2024-07-15 10:45 AM",
        status: "submitted",
        description: "Complaint submitted by Eve Citizen",
      },
      {
        date: "2024-07-15 11:30 AM",
        status: "received",
        description: "Complaint received and logged in the system",
      },
    ],
  },
]

// Mock testimonials
export const enhancedMockTestimonials: Testimonial[] = [
  {
    quote:
      "GrievX helped me get the pothole on my street fixed within a week. The tracking system kept me informed throughout the process.",
    author: "Ravi Sharma",
    role: "Resident, North District",
    avatarSrc: "/avatars/testimonial1.png",
    rating: 5,
  },
  {
    quote:
      "As a community organizer, I've found GrievX invaluable for coordinating with officials and tracking neighborhood issues.",
    author: "Meera Patel",
    role: "Community Leader",
    avatarSrc: "/avatars/testimonial2.png",
    rating: 5,
  },
  {
    quote:
      "The fraud detection feature helped us identify a subsidy scam in our area. The authorities were able to take immediate action.",
    author: "Arjun Singh",
    role: "Farmer, East District",
    avatarSrc: "/avatars/testimonial3.png",
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first, but after using GrievX to report a water supply issue, I was amazed at how quickly it was resolved.",
    author: "Lakshmi Devi",
    role: "Homemaker, South District",
    avatarSrc: "/avatars/testimonial4.png",
    rating: 4,
  },
  {
    quote:
      "The transparency of the platform is its biggest strength. I can see exactly who is handling my complaint and what actions they're taking.",
    author: "Dr. Rajesh Kumar",
    role: "Professor, Central University",
    avatarSrc: "/avatars/testimonial5.png",
    rating: 5,
  },
]

// Enhanced mock stats
export const enhancedMockStats: StatItem[] = [
  {
    title: "Complaints Filed",
    value: "1,248",
    description: "Total complaints submitted through the platform",
    icon: FileText,
    trend: {
      value: 12,
      isPositive: true,
    },
  },
  {
    title: "Resolution Rate",
    value: "86%",
    description: "Percentage of complaints successfully resolved",
    icon: CheckCircle,
    trend: {
      value: 4,
      isPositive: true,
    },
  },
  {
    title: "Avg. Resolution Time",
    value: "5.2 days",
    description: "Average time to resolve a complaint",
    icon: Clock,
    trend: {
      value: 8,
      isPositive: true,
    },
  },
  {
    title: "Fraud Cases Detected",
    value: "73",
    description: "Potential fraud cases identified by our AI",
    icon: Shield,
    trend: {
      value: 15,
      isPositive: true,
    },
  },
]

// Enhanced mock townhall messages
export const enhancedMockTownhallMessages: TownhallMessage[] = [
  {
    id: "msg1",
    userId: 3,
    userName: "Officer Carol",
    userAvatar: "/avatars/3.png",
    text: "Welcome to today's townhall discussion on infrastructure development. We're here to address your questions and concerns.",
    timestamp: "10:00 AM",
    likes: 5,
    isOfficial: true,
    attachments: [
      {
        type: "document",
        url: "/documents/infrastructure-plan.pdf",
        title: "Infrastructure Development Plan 2024",
      },
    ],
  },
  {
    id: "msg2",
    userId: 6,
    userName: "Raj Kumar",
    userAvatar: "/avatars/6.png",
    text: "When will the road widening project in North District begin? It's been delayed for months.",
    timestamp: "10:02 AM",
    likes: 8,
    isOfficial: false,
    replies: [
      {
        id: "reply1",
        userId: 3,
        userName: "Officer Carol",
        userAvatar: "/avatars/3.png",
        text: "The project is scheduled to begin next month. The delay was due to land acquisition issues which have now been resolved.",
        timestamp: "10:05 AM",
        likes: 3,
      },
    ],
  },
  {
    id: "msg3",
    userId: 5,
    userName: "Eve Citizen",
    userAvatar: "/avatars/5.png",
    text: "What about the water supply issues in South District? We've been getting contaminated water for weeks.",
    timestamp: "10:08 AM",
    likes: 12,
    isOfficial: false,
    attachments: [
      {
        type: "image",
        url: "/images/contaminated-water.jpg",
        title: "Contaminated Water Sample",
      },
    ],
    replies: [
      {
        id: "reply2",
        userId: 9,
        userName: "Officer Sharma",
        userAvatar: "/avatars/9.png",
        text: "We're aware of the water quality issues in South District. Our team has identified the source of contamination and repairs are underway. Clean water should be restored within 48 hours.",
        timestamp: "10:12 AM",
        likes: 7,
      },
    ],
  },
  {
    id: "msg4",
    userId: 7,
    userName: "Priya Singh",
    userAvatar: "/avatars/7.png",
    text: "Can we get more streetlights in the park area? It's very dark and unsafe at night.",
    timestamp: "10:15 AM",
    likes: 9,
    isOfficial: false,
    replies: [
      {
        id: "reply3",
        userId: 3,
        userName: "Officer Carol",
        userAvatar: "/avatars/3.png",
        text: "Thank you for bringing this up, Priya. We'll conduct a safety assessment of the park lighting this week and add this to our priority list.",
        timestamp: "10:18 AM",
        likes: 6,
      },
    ],
  },
  {
    id: "msg5",
    userId: 8,
    userName: "Amit Patel",
    userAvatar: "/avatars/8.png",
    text: "The new online permit system is very confusing. Can we get a tutorial or help guide?",
    timestamp: "10:22 AM",
    likes: 11,
    isOfficial: false,
    replies: [
      {
        id: "reply4",
        userId: 9,
        userName: "Officer Sharma",
        userAvatar: "/avatars/9.png",
        text: "We'll be hosting a workshop next week to help citizens navigate the new permit system. We'll also create video tutorials that will be available on our website.",
        timestamp: "10:25 AM",
        likes: 4,
      },
    ],
  },
]

// Enhanced mock upcoming townhalls
export const enhancedMockUpcomingTownhalls: UpcomingTownhall[] = [
  {
    title: "Water Conservation Initiatives",
    description: "Discussion on new water conservation policies and community involvement in sustainable practices.",
    date: "July 25, 2024",
    time: "6:00 PM - 7:30 PM",
    host: "Dr. Rajesh Kumar",
    department: "Environmental Affairs",
    isSpecial: false,
    attendees: 45,
    topics: ["Water harvesting techniques", "Reducing water wastage", "Community water management"],
    location: "Community Hall, North District",
    virtualMeetingLink: "https://meet.grievx.gov/water-conservation",
  },
  {
    title: "Budget Allocation Town Hall",
    description:
      "Special session to discuss the upcoming fiscal year's budget allocation for community development projects.",
    date: "August 2, 2024",
    time: "5:30 PM - 7:00 PM",
    host: "Mayor Sharma",
    department: "Finance Department",
    isSpecial: true,
    attendees: 120,
    topics: ["Infrastructure budget", "Education funding", "Healthcare initiatives", "Public safety allocations"],
    location: "City Hall Auditorium",
    virtualMeetingLink: "https://meet.grievx.gov/budget-2024",
  },
  {
    title: "Public Safety Forum",
    description: "Open discussion on improving security measures and emergency response in residential areas.",
    date: "August 10, 2024",
    time: "6:30 PM - 8:00 PM",
    host: "Commissioner Patel",
    department: "Public Safety",
    isSpecial: false,
    attendees: 78,
    topics: ["Street lighting", "Police patrols", "Emergency response times", "Community watch programs"],
    location: "Police Headquarters Conference Room",
    virtualMeetingLink: "https://meet.grievx.gov/safety-forum",
  },
  {
    title: "Education Infrastructure Planning",
    description: "Discussion on improving school facilities and educational resources across the district.",
    date: "August 15, 2024",
    time: "5:00 PM - 6:30 PM",
    host: "Dr. Meera Singh",
    department: "Education Department",
    isSpecial: false,
    attendees: 65,
    topics: ["School building renovations", "Digital learning resources", "Teacher training", "Student facilities"],
    location: "Central School Auditorium",
    virtualMeetingLink: "https://meet.grievx.gov/education-planning",
  },
]

// Enhanced mock government schemes
export const enhancedMockGovernmentSchemes: GovernmentScheme[] = [
  {
    id: 1,
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Financial support to farmer families across the country",
    eligibility: "All small and marginal farmers with cultivable land",
    benefits: "₹6,000 per year in three equal installments",
    documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
    applicationProcess: "Online through PM-Kisan portal or through Common Service Centers",
    icon: Leaf,
    color: "green",
    deadline: "Ongoing",
    budget: "₹75,000 crore annually",
    beneficiaries: 125000000,
    website: "https://pmkisan.gov.in",
    contactPhone: "1800-11-0001",
    contactEmail: "pmkisan-ict@gov.in",
    faqs: [
      {
        question: "How do I check my application status?",
        answer: "You can check your application status on the PM-Kisan portal using your registration number.",
      },
      {
        question: "When are the installments released?",
        answer: "Installments are typically released in April-July, August-November, and December-March periods.",
      },
    ],
    status: "active",
    processingTime: "30-45 days",
    successRate: 92,
  },
  {
    id: 2,
    title: "Pradhan Mantri Awas Yojana",
    category: "Housing",
    description: "Housing for All initiative providing affordable housing",
    eligibility: "Economically Weaker Section (EWS) and Low Income Group (LIG) households",
    benefits: "Financial assistance up to ₹2.67 lakh for house construction",
    documents: ["Aadhaar Card", "Income Certificate", "Land Documents"],
    applicationProcess: "Apply through local municipal office or online portal",
    icon: Home,
    color: "blue",
    deadline: "March 31, 2025",
    budget: "₹48,000 crore for 2024-25",
    beneficiaries: 10000000,
    website: "https://pmaymis.gov.in",
    contactPhone: "1800-11-6163",
    contactEmail: "pmayg@gov.in",
    faqs: [
      {
        question: "What is the carpet area limit for MIG category?",
        answer: "For MIG-I, it's 160 sq.m. and for MIG-II, it's 200 sq.m.",
      },
      {
        question: "Can I apply if I already own a house?",
        answer: "No, the scheme is for families who do not own a pucca house.",
      },
    ],
    status: "active",
    processingTime: "60-90 days",
    successRate: 85,
  },
  {
    id: 3,
    title: "National Pension Scheme",
    category: "Financial",
    description: "Voluntary retirement savings scheme for citizens",
    eligibility: "Indian citizens between 18-65 years of age",
    benefits: "Tax benefits and retirement corpus",
    documents: ["Aadhaar Card", "PAN Card", "Bank Account Details"],
    applicationProcess: "Apply through banks, post offices, or online",
    icon: Users,
    color: "purple",
    deadline: "Ongoing",
    budget: "Not Applicable",
    beneficiaries: 15000000,
    website: "https://www.npscra.nsdl.co.in",
    contactPhone: "1800-110-708",
    contactEmail: "info.nps@nsdl.co.in",
    faqs: [
      {
        question: "What is the minimum contribution per year?",
        answer: "₹1,000 for Tier I account and ₹250 for Tier II account.",
      },
      {
        question: "When can I withdraw from NPS?",
        answer:
          "Partial withdrawal is allowed after 3 years for specific purposes. Full withdrawal is generally at 60 years of age.",
      },
    ],
    status: "active",
    processingTime: "7-14 days",
    successRate: 98,
  },
  {
    id: 4,
    title: "Ayushman Bharat",
    category: "Healthcare",
    description: "Health insurance scheme providing coverage for medical expenses",
    eligibility: "Economically vulnerable families as per SECC database",
    benefits: "Health coverage up to ₹5 lakh per family per year",
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    applicationProcess: "Apply through Ayushman Bharat centers or hospitals",
    icon: Heart,
    color: "red",
    deadline: "Ongoing",
    budget: "₹6,400 crore annually",
    beneficiaries: 500000000,
    website: "https://pmjay.gov.in",
    contactPhone: "14555",
    contactEmail: "support@pmjay.gov.in",
    faqs: [
      {
        question: "How do I know if I'm eligible?",
        answer: "You can check your eligibility on the PMJAY website using your mobile number linked to Aadhaar.",
      },
      {
        question: "Which hospitals accept Ayushman Bharat?",
        answer: "Over 24,000 hospitals across India are empanelled. You can check the list on the official website.",
      },
    ],
    status: "active",
    processingTime: "Immediate for emergency, 1-3 days for planned procedures",
    successRate: 90,
  },
  {
    id: 5,
    title: "PM Mudra Yojana",
    category: "Financial",
    description: "Loans for non-corporate, non-farm small/micro enterprises",
    eligibility: "Small business owners and entrepreneurs",
    benefits: "Loans up to ₹10 lakh without collateral",
    documents: ["Aadhaar Card", "Business Plan", "Bank Account Details"],
    applicationProcess: "Apply through banks, MFIs, or online portal",
    icon: Briefcase,
    color: "amber",
    deadline: "Ongoing",
    budget: "₹3 lakh crore loan disbursement target annually",
    beneficiaries: 30000000,
    website: "https://www.mudra.org.in",
    contactPhone: "1800-180-1111",
    contactEmail: "support@mudra.org.in",
    faqs: [
      {
        question: "What are the different loan categories?",
        answer: "Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5,00,001 to ₹10 lakh).",
      },
      {
        question: "What is the interest rate?",
        answer: "Interest rates vary by bank but are generally lower than market rates, typically between 8-12%.",
      },
    ],
    status: "active",
    processingTime: "15-30 days",
    successRate: 75,
  },
  {
    id: 6,
    title: "National Scholarship Portal",
    category: "Education",
    description: "Scholarships for students from minority communities and economically backward classes",
    eligibility: "Students with family income below specified limits",
    benefits: "Financial assistance for education expenses",
    documents: ["Aadhaar Card", "Income Certificate", "Educational Certificates"],
    applicationProcess: "Apply online through National Scholarship Portal",
    icon: GraduationCap,
    color: "indigo",
    deadline: "October 31, 2024",
    budget: "₹5,000 crore annually",
    beneficiaries: 2500000,
    website: "https://scholarships.gov.in",
    contactPhone: "1800-11-2300",
    contactEmail: "support-scholarships@gov.in",
    faqs: [
      {
        question: "When does the application window open?",
        answer: "Usually between August and October each year.",
      },
      {
        question: "How is the scholarship amount disbursed?",
        answer: "Directly into the student's bank account through DBT (Direct Benefit Transfer).",
      },
    ],
    status: "active",
    processingTime: "60-90 days after application deadline",
    successRate: 80,
  },
  {
    id: 7,
    title: "Jal Jeevan Mission",
    category: "Water",
    description: "Providing safe and adequate drinking water through household tap connections",
    eligibility: "All rural households without tap water connection",
    benefits: "Functional household tap connection with regular water supply",
    documents: ["Aadhaar Card", "Proof of Residence"],
    applicationProcess: "Through Gram Panchayat or local water department",
    icon: Droplet,
    color: "blue",
    deadline: "2024 (100% coverage target)",
    budget: "₹3.6 lakh crore",
    beneficiaries: 190000000,
    website: "https://jaljeevanmission.gov.in",
    contactPhone: "1800-111-545",
    contactEmail: "jjm@gov.in",
    faqs: [
      {
        question: "Is there any user charge for the water connection?",
        answer: "Minimal user charges may be decided by the Gram Panchayat for operation and maintenance.",
      },
      {
        question: "What is the quantity of water provided?",
        answer: "55 liters per person per day is the minimum service level benchmark.",
      },
    ],
    status: "active",
    processingTime: "Depends on village implementation schedule",
    successRate: 78,
  },
  {
    id: 8,
    title: "Swachh Bharat Mission",
    category: "Sanitation",
    description: "Comprehensive sanitation coverage and waste management",
    eligibility: "All citizens, with special focus on rural areas and urban slums",
    benefits: "Toilet construction subsidy, waste management infrastructure",
    documents: ["Aadhaar Card", "BPL Card (if applicable)"],
    applicationProcess: "Through local municipal body or Gram Panchayat",
    icon: Trash2,
    color: "green",
    deadline: "Ongoing (Phase II until 2025)",
    budget: "₹1.4 lakh crore for Phase II",
    beneficiaries: 600000000,
    website: "https://swachhbharat.gov.in",
    contactPhone: "1800-11-9898",
    contactEmail: "sbm@gov.in",
    faqs: [
      {
        question: "What is the subsidy amount for toilet construction?",
        answer: "₹12,000 for individual household latrines in rural areas.",
      },
      {
        question: "How can my locality get better waste management?",
        answer: "Submit a proposal through your local municipal body or ward councilor.",
      },
    ],
    status: "active",
    processingTime: "30-60 days for individual benefits",
    successRate: 85,
  },
  {
    id: 9,
    title: "Smart Cities Mission",
    category: "Urban Development",
    description: "Promoting cities that provide core infrastructure and quality life to citizens",
    eligibility: "Selected cities based on Smart City challenge competition",
    benefits: "Improved urban infrastructure, technology solutions, better quality of life",
    documents: ["Not applicable for individuals"],
    applicationProcess: "City-level implementation, citizen participation through local bodies",
    icon: Road,
    color: "blue",
    deadline: "2025 (for current phase)",
    budget: "₹2.05 lakh crore",
    beneficiaries: 100000000,
    website: "https://smartcities.gov.in",
    contactPhone: "1800-111-690",
    contactEmail: "smartcities@gov.in",
    faqs: [
      {
        question: "How are Smart Cities selected?",
        answer: "Through a competition based on urban planning, proposed solutions, and implementation feasibility.",
      },
      {
        question: "How can citizens participate?",
        answer:
          "Through citizen engagement platforms, feedback mechanisms, and local municipal corporation initiatives.",
      },
    ],
    status: "active",
    processingTime: "Not applicable for individuals",
    successRate: 70,
  },
  {
    id: 10,
    title: "PM Ujjwala Yojana",
    category: "Energy",
    description: "Providing LPG connections to women from BPL households",
    eligibility: "Women from Below Poverty Line (BPL) households",
    benefits: "Free LPG connection with financial assistance for first refill and stove",
    documents: ["Aadhaar Card", "BPL Card", "Bank Account Details"],
    applicationProcess: "Apply through local LPG distributors or Common Service Centers",
    icon: Zap,
    color: "yellow",
    deadline: "Ongoing",
    budget: "₹12,800 crore",
    beneficiaries: 80000000,
    website: "https://pmuy.gov.in",
    contactPhone: "1800-266-6696",
    contactEmail: "ujjwala@gov.in",
    faqs: [
      {
        question: "Is the connection completely free?",
        answer: "The security deposit is waived, but subsequent refills need to be purchased.",
      },
      {
        question: "Can I get subsidy on refills?",
        answer: "Yes, eligible beneficiaries receive subsidy directly in their bank accounts through DBT.",
      },
    ],
    status: "active",
    processingTime: "15-30 days",
    successRate: 95,
  },
  {
    id: 11,
    title: "Digital India Land Records Modernization Programme",
    category: "Land Management",
    description: "Computerization of land records and strengthening of revenue administration",
    eligibility: "All landowners",
    benefits: "Transparent land records, reduced land disputes, easy access to land information",
    documents: ["Existing land documents", "Aadhaar Card"],
    applicationProcess: "Automatic digitization by government, citizens can access through portal",
    icon: FileText,
    color: "purple",
    deadline: "2025 (for complete digitization)",
    budget: "₹950 crore",
    beneficiaries: 150000000,
    website: "https://dilrmp.gov.in",
    contactPhone: "1800-111-555",
    contactEmail: "support-dilrmp@gov.in",
    faqs: [
      {
        question: "How do I access my digital land records?",
        answer: "Visit your state's land records portal or Bhu-Naksha portal with your land details.",
      },
      {
        question: "What if I find errors in my digital land records?",
        answer: "Submit a correction request at your local revenue office with supporting documents.",
      },
    ],
    status: "active",
    processingTime: "Varies by state and district",
    successRate: 75,
  },
  {
    id: 12,
    title: "PM Garib Kalyan Rojgar Abhiyaan",
    category: "Employment",
    description: "Employment scheme for migrant workers who returned to villages during COVID-19",
    eligibility: "Migrant workers who returned to rural areas",
    benefits: "Employment opportunities in various public works",
    documents: ["Aadhaar Card", "Job Card", "Bank Account Details"],
    applicationProcess: "Register with local Gram Panchayat",
    icon: Briefcase,
    color: "amber",
    deadline: "December 31, 2024",
    budget: "₹50,000 crore",
    beneficiaries: 6700000,
    website: "https://rural.nic.in",
    contactPhone: "1800-11-0001",
    contactEmail: "pmgkra@gov.in",
    faqs: [
      {
        question: "What types of work are available under this scheme?",
        answer: "Construction of rural housing, rural roads, community toilets, water conservation structures, etc.",
      },
      {
        question: "How long can I get employment under this scheme?",
        answer: "The scheme aims to provide employment for 125 days.",
      },
    ],
    status: "active",
    processingTime: "7-14 days",
    successRate: 80,
  },
]

// Enhanced mock fraud cases
export const enhancedMockFraudCases: FraudCase[] = [
  {
    id: 1,
    title: "EWS Certificate Application",
    description: "Applicant claims to be below poverty line but owns luxury vehicles and property.",
    category: "Economic Welfare Scheme",
    details: {
      applicantName: "Rajesh Kumar",
      applicantIncome: "₹24,000 per annum (claimed)",
      assets: [
        "2022 Toyota Fortuner SUV",
        "3 BHK Apartment in upscale neighborhood",
        "International travel history (3 countries in past year)",
      ],
      inconsistencies: [
        "Income tax returns show ₹12,00,000 annual income",
        "Luxury vehicle registered under same address",
        "Property documents show multiple real estate holdings",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 92,
    detectedDate: "2024-07-10",
    reportedBy: "System AI Detection",
    status: "confirmed",
    assignedTo: "Officer Sharma",
    evidenceCount: 5,
    financialImpact: "₹3,50,000 in potential misappropriated benefits",
    relatedCases: [3, 7],
  },
  {
    id: 2,
    title: "Fake Medical Bills Submission",
    description: "Multiple claims with identical medical bills from different patients.",
    category: "Healthcare Fraud",
    details: {
      claimantNames: ["Suresh Patel", "Mahesh Sharma", "Ramesh Gupta"],
      hospitalName: "City Medical Center",
      claimAmount: "₹45,000 each",
      inconsistencies: [
        "Identical bill numbers and amounts",
        "Same treatment dates for different patients",
        "Identical doctor signatures on all documents",
        "Hospital denies treating two of the patients",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 96,
    detectedDate: "2024-07-05",
    reportedBy: "Claims Processing Department",
    status: "confirmed",
    assignedTo: "Analyst Gupta",
    evidenceCount: 8,
    financialImpact: "₹1,35,000 in fraudulent claims",
    relatedCases: [8],
  },
  {
    id: 3,
    title: "Ghost Beneficiary in Pension Scheme",
    description: "Pension being claimed for a deceased individual for over 2 years.",
    category: "Pension Fraud",
    details: {
      beneficiaryName: "Mohan Lal",
      deathDate: "2022-03-15",
      claimantName: "Vikram Lal (son)",
      monthlyAmount: "₹12,000",
      inconsistencies: [
        "Death certificate found in municipal records",
        "No biometric verification in last 24 months",
        "Multiple withdrawals from different locations on same day",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 98,
    detectedDate: "2024-07-12",
    reportedBy: "Biometric Verification System",
    status: "investigating",
    assignedTo: "Officer Sharma",
    evidenceCount: 6,
    financialImpact: "₹2,88,000 in fraudulent pension payments",
    relatedCases: [1],
  },
  {
    id: 4,
    title: "Duplicate Housing Subsidy Application",
    description: "Applicant has applied for housing subsidy in two different districts.",
    category: "Housing Scheme Fraud",
    details: {
      applicantName: "Deepak Verma",
      locations: ["North District", "East District"],
      subsidyAmount: "₹2,50,000 per application",
      inconsistencies: [
        "Same Aadhaar number used in both applications",
        "Different family members listed in each application",
        "Different income certificates with significant discrepancies",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 89,
    detectedDate: "2024-07-08",
    reportedBy: "Cross-District Verification System",
    status: "confirmed",
    assignedTo: "Analyst Gupta",
    evidenceCount: 4,
    financialImpact: "₹2,50,000 in potential duplicate benefits",
    relatedCases: [],
  },
  {
    id: 5,
    title: "Inflated Land Compensation Claim",
    description: "Landowner claiming compensation for larger land area than actually owned.",
    category: "Land Acquisition Fraud",
    details: {
      claimantName: "Harish Agarwal",
      claimedArea: "5.2 acres",
      actualArea: "2.8 acres",
      compensationRate: "₹25 lakh per acre",
      inconsistencies: [
        "Land records show smaller area than claimed",
        "Forged boundary documents",
        "Satellite imagery confirms smaller land holding",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 94,
    detectedDate: "2024-07-15",
    reportedBy: "Land Records Department",
    status: "investigating",
    assignedTo: "Officer Sharma",
    evidenceCount: 7,
    financialImpact: "₹60 lakh in excess compensation claims",
    relatedCases: [],
  },
  {
    id: 6,
    title: "Suspicious Scholarship Applications",
    description: "Multiple scholarship applications from same address with different student names.",
    category: "Education Scheme Fraud",
    details: {
      address: "45 Gandhi Road, West District",
      numberOfApplications: 8,
      scholarshipAmount: "₹25,000 per student annually",
      inconsistencies: [
        "Same contact number for all applications",
        "Similar handwriting on all forms",
        "Unable to verify existence of 5 students at claimed schools",
        "Same bank account for multiple students",
      ],
    },
    fraudStatus: "Suspicious",
    confidenceScore: 78,
    detectedDate: "2024-07-11",
    reportedBy: "Education Department Verification Team",
    status: "investigating",
    assignedTo: "Analyst Gupta",
    evidenceCount: 5,
    financialImpact: "₹2,00,000 in potentially fraudulent scholarships",
    relatedCases: [],
  },
  {
    id: 7,
    title: "Falsified Income Certificate",
    description: "Applicant submitted doctored income certificate to qualify for welfare schemes.",
    category: "Document Fraud",
    details: {
      applicantName: "Sanjay Mishra",
      claimedIncome: "₹75,000 per annum",
      estimatedActualIncome: "₹4,50,000 per annum",
      inconsistencies: [
        "Digital alterations detected on income certificate",
        "Tax records show higher income",
        "Lifestyle inconsistent with claimed income (luxury car, foreign travel)",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 91,
    detectedDate: "2024-07-09",
    reportedBy: "Document Verification System",
    status: "confirmed",
    assignedTo: "Officer Sharma",
    evidenceCount: 6,
    financialImpact: "₹1,20,000 in welfare benefits",
    relatedCases: [1],
  },
  {
    id: 8,
    title: "Fake Medical Disability Claim",
    description: "Individual claiming disability benefits while working full-time job.",
    category: "Disability Benefit Fraud",
    details: {
      claimantName: "Rakesh Sharma",
      disabilityClaimed: "Severe mobility impairment requiring wheelchair",
      inconsistencies: [
        "Social media shows individual participating in sports",
        "Employed as construction worker under different name",
        "Medical certificate from non-existent doctor",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 95,
    detectedDate: "2024-07-14",
    reportedBy: "Citizen Tip Line",
    status: "investigating",
    assignedTo: "Analyst Gupta",
    evidenceCount: 9,
    financialImpact: "₹3,60,000 in annual disability benefits",
    relatedCases: [2],
  },
  {
    id: 9,
    title: "Suspicious Crop Insurance Claim",
    description: "Farmer claiming crop damage on land that satellite imagery shows as unharvested.",
    category: "Agricultural Subsidy Fraud",
    details: {
      farmerName: "Bhupinder Singh",
      cropType: "Wheat",
      claimedDamage: "100% loss due to flooding",
      inconsistencies: [
        "Satellite imagery shows healthy crop",
        "Weather data shows no flooding in area",
        "Neighboring farms reported no damage",
      ],
    },
    fraudStatus: "Suspicious",
    confidenceScore: 82,
    detectedDate: "2024-07-16",
    reportedBy: "Agricultural Department AI System",
    status: "investigating",
    assignedTo: "Officer Sharma",
    evidenceCount: 3,
    financialImpact: "₹1,80,000 in insurance claims",
    relatedCases: [],
  },
  {
    id: 10,
    title: "Multiple Ration Card Registrations",
    description: "Individual registered on three different ration cards in different districts.",
    category: "Food Subsidy Fraud",
    details: {
      subjectName: "Anita Devi",
      locations: ["North District", "Central District", "South District"],
      inconsistencies: [
        "Same biometric data linked to three different names",
        "Different family compositions on each card",
        "Monthly collection from all three locations",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 97,
    detectedDate: "2024-07-07",
    reportedBy: "Biometric Deduplication System",
    status: "confirmed",
    assignedTo: "Analyst Gupta",
    evidenceCount: 7,
    financialImpact: "₹48,000 annually in excess subsidized goods",
    relatedCases: [],
  },
]

// Enhanced mock fraud alerts
export const enhancedMockFraudAlerts: FraudAlert[] = [
  {
    title: "Subsidy Fraud Ring Detected",
    description:
      "Multiple coordinated applications for agricultural subsidies with falsified land records detected in North District.",
    severity: "high",
    date: "July 17, 2024",
    location: "North District",
    category: "Agricultural Subsidy",
    affectedScheme: "PM Kisan Samman Nidhi",
  },
  {
    title: "Identity Theft Alert",
    description:
      "Increase in welfare applications using stolen identities. Verification teams should implement additional checks.",
    severity: "high",
    date: "July 16, 2024",
    location: "Multiple Districts",
    category: "Identity Fraud",
    affectedScheme: "Multiple Schemes",
  },
  {
    title: "Suspicious Document Pattern",
    description: "Similar handwriting detected across multiple unrelated applications for housing subsidies.",
    severity: "medium",
    date: "July 15, 2024",
    location: "East District",
    category: "Document Fraud",
    affectedScheme: "Pradhan Mantri Awas Yojana",
  },
  {
    title: "Unusual Application Volume",
    description:
      "Spike in scholarship applications from a single educational institution with identical supporting documents.",
    severity: "medium",
    date: "July 14, 2024",
    location: "West District",
    category: "Education Scheme Fraud",
    affectedScheme: "National Scholarship Portal",
  },
  {
    title: "Ghost Beneficiary Alert",
    description:
      "Pension payments continuing for beneficiaries with no recent biometric verification or digital footprint.",
    severity: "high",
    date: "July 13, 2024",
    location: "South District",
    category: "Pension Fraud",
    affectedScheme: "National Pension Scheme",
  },
  {
    title: "Duplicate Benefit Claims",
    description:
      "Same individuals applying for similar benefits across different schemes with inconsistent information.",
    severity: "medium",
    date: "July 12, 2024",
    location: "Central District",
    category: "Multiple Scheme Fraud",
    affectedScheme: "Various Welfare Schemes",
  },
  {
    title: "Medical Bill Anomalies",
    description: "Pattern of identical medical procedures and costs across multiple unrelated insurance claims.",
    severity: "medium",
    date: "July 11, 2024",
    location: "North District",
    category: "Healthcare Fraud",
    affectedScheme: "Ayushman Bharat",
  },
  {
    title: "Income Certificate Forgeries",
    description: "Increase in digitally altered income certificates detected during verification process.",
    severity: "high",
    date: "July 10, 2024",
    location: "Multiple Districts",
    category: "Document Fraud",
    affectedScheme: "Multiple Welfare Schemes",
  },
  {
    title: "Suspicious Banking Patterns",
    description: "Multiple subsidy payments being immediately transferred to the same account after receipt.",
    severity: "low",
    date: "July 9, 2024",
    location: "East District",
    category: "Financial Fraud",
    affectedScheme: "Direct Benefit Transfer Schemes",
  },
  {
    title: "Land Record Discrepancies",
    description: "Mismatches between claimed land ownership in subsidy applications and official land records.",
    severity: "medium",
    date: "July 8, 2024",
    location: "West District",
    category: "Agricultural Subsidy Fraud",
    affectedScheme: "PM Kisan Samman Nidhi",
  },
]
