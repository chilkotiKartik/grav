import {
  FileText,
  Shield,
  Users,
  Award,
  MessageSquare,
  Clock,
  CheckCircle,
  BookOpen,
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

// Mock complaints
export const mockComplaints = [
  {
    id: "GRV2024-1001",
    userId: 1,
    title: "Pothole on Main Street",
    category: "Infrastructure",
    subcategory: "Roads",
    date: "2024-07-15",
    location: "123 Main Street, North District",
    description: "Large pothole causing damage to vehicles",
    status: "pending",
    officer: { id: 3, name: "Officer Carol", department: "Roads Department" },
  },
  {
    id: "GRV2024-1002",
    userId: 5,
    title: "Garbage Overflowing",
    category: "Sanitation",
    subcategory: "Garbage Collection",
    date: "2024-07-10",
    location: "456 Oak Avenue, East District",
    description: "Garbage bins overflowing, attracting pests",
    status: "investigating",
    investigatingDate: "2024-07-12",
    officer: { id: 3, name: "Officer Carol", department: "Sanitation Department" },
  },
  {
    id: "GRV2024-1003",
    userId: 1,
    title: "Streetlight Not Working",
    category: "Security",
    subcategory: "Street Lights",
    date: "2024-07-05",
    location: "789 Pine Lane, West District",
    description: "Streetlight is out, making the area unsafe at night",
    status: "resolved",
    resolvedDate: "2024-07-12",
    officer: { id: 3, name: "Officer Carol", department: "Electrical Department" },
  },
  {
    id: "GRV2024-1004",
    userId: 5,
    title: "Water Leak",
    category: "Sanitation",
    subcategory: "Water Quality",
    date: "2024-07-01",
    location: "101 Elm Street, South District",
    description: "Water leaking from a pipe on the main road",
    status: "rejected",
    rejectedDate: "2024-07-08",
    officer: { id: 3, name: "Officer Carol", department: "Water Department" },
  },
  {
    id: "GRV2024-1005",
    userId: 1,
    title: "Sewage Backup",
    category: "Sanitation",
    subcategory: "Sewage Issues",
    date: "2024-06-25",
    location: "222 Maple Drive, North District",
    description: "Sewage backing up into the street",
    status: "judging",
    judgingDate: "2024-07-02",
    officer: { id: 3, name: "Officer Carol", department: "Sewage Department" },
  },
  {
    id: "GRV2024-1006",
    userId: 6,
    title: "Broken Park Bench",
    category: "Infrastructure",
    subcategory: "Public Facilities",
    date: "2024-07-08",
    location: "Central Park, Central District",
    description: "Park bench is broken and has sharp edges",
    status: "resolved",
    resolvedDate: "2024-07-14",
    officer: { id: 9, name: "Officer Sharma", department: "Parks Department" },
  },
  {
    id: "GRV2024-1007",
    userId: 7,
    title: "Illegal Dumping",
    category: "Sanitation",
    subcategory: "Waste Management",
    date: "2024-07-12",
    location: "Behind 333 Oak Street, East District",
    description: "Someone is illegally dumping construction waste behind our building",
    status: "investigating",
    investigatingDate: "2024-07-13",
    officer: { id: 9, name: "Officer Sharma", department: "Environmental Department" },
  },
  {
    id: "GRV2024-1008",
    userId: 8,
    title: "Bribery at License Office",
    category: "Corruption",
    subcategory: "Bribery",
    date: "2024-07-07",
    location: "Municipal License Office, Central District",
    description: "Officials at the license office are demanding bribes to process applications faster",
    status: "investigating",
    investigatingDate: "2024-07-09",
    officer: { id: 9, name: "Officer Sharma", department: "Anti-Corruption Unit" },
  },
  {
    id: "GRV2024-1009",
    userId: 7,
    title: "Stray Dog Problem",
    category: "Security",
    subcategory: "Public Safety",
    date: "2024-07-14",
    location: "Around School Zone, South District",
    description: "Pack of stray dogs near the school is scaring children",
    status: "pending",
    officer: null,
  },
  {
    id: "GRV2024-1010",
    userId: 6,
    title: "Traffic Signal Malfunction",
    category: "Infrastructure",
    subcategory: "Traffic Management",
    date: "2024-07-13",
    location: "Intersection of Main St and Commerce Ave, West District",
    description: "Traffic signal is stuck on red in all directions",
    status: "resolved",
    resolvedDate: "2024-07-13",
    officer: { id: 3, name: "Officer Carol", department: "Traffic Department" },
  },
  {
    id: "GRV2024-1011",
    userId: 1,
    title: "Fraudulent Subsidy Claims",
    category: "Corruption",
    subcategory: "Subsidy Fraud",
    date: "2024-07-16",
    location: "Agricultural Department Office, North District",
    description: "Multiple farmers in the area are claiming subsidies for land they don't cultivate",
    status: "investigating",
    investigatingDate: "2024-07-17",
    officer: { id: 9, name: "Officer Sharma", department: "Anti-Corruption Unit" },
  },
  {
    id: "GRV2024-1012",
    userId: 5,
    title: "School Without Proper Facilities",
    category: "Education",
    subcategory: "School Infrastructure",
    date: "2024-07-15",
    location: "Government Primary School, East District",
    description: "The local primary school lacks basic facilities like clean drinking water and functional toilets",
    status: "pending",
    officer: null,
  },
]

// Mock testimonials
export const mockTestimonials = [
  {
    quote:
      "GrievX helped me get the pothole on my street fixed within a week. The tracking system kept me informed throughout the process.",
    author: "Ravi Sharma",
    role: "Resident, North District",
    avatarSrc: "/avatars/testimonial1.png",
  },
  {
    quote:
      "As a community organizer, I've found GrievX invaluable for coordinating with officials and tracking neighborhood issues.",
    author: "Meera Patel",
    role: "Community Leader",
    avatarSrc: "/avatars/testimonial2.png",
  },
  {
    quote:
      "The fraud detection feature helped us identify a subsidy scam in our area. The authorities were able to take immediate action.",
    author: "Arjun Singh",
    role: "Farmer, East District",
    avatarSrc: "/avatars/testimonial3.png",
  },
]

// Mock stats
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

export const mockStats: StatItem[] = [
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

// Mock townhall messages
export const mockTownhallMessages = [
  {
    id: "msg1",
    userId: 3,
    userName: "Officer Carol",
    userAvatar: "/avatars/3.png",
    text: "Welcome to today's townhall discussion on infrastructure development. We're here to address your questions and concerns.",
    timestamp: "10:00 AM",
    likes: 5,
    isOfficial: true,
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
  },
  {
    id: "msg3",
    userId: 3,
    userName: "Officer Carol",
    userAvatar: "/avatars/3.png",
    text: "The road widening project is scheduled to begin next month. The delay was due to land acquisition issues which have now been resolved.",
    timestamp: "10:05 AM",
    likes: 3,
    isOfficial: true,
  },
  {
    id: "msg4",
    userId: 5,
    userName: "Eve Citizen",
    userAvatar: "/avatars/5.png",
    text: "What about the water supply issues in South District? We've been getting contaminated water for weeks.",
    timestamp: "10:08 AM",
    likes: 12,
    isOfficial: false,
  },
  {
    id: "msg5",
    userId: 9,
    userName: "Officer Sharma",
    userAvatar: "/avatars/9.png",
    text: "We're aware of the water quality issues in South District. Our team has identified the source of contamination and repairs are underway. Clean water should be restored within 48 hours.",
    timestamp: "10:12 AM",
    likes: 7,
    isOfficial: true,
  },
  {
    id: "msg6",
    userId: 7,
    userName: "Priya Singh",
    userAvatar: "/avatars/7.png",
    text: "Can we get more streetlights in the park area? It's very dark and unsafe at night.",
    timestamp: "10:15 AM",
    likes: 9,
    isOfficial: false,
  },
  {
    id: "msg7",
    userId: 3,
    userName: "Officer Carol",
    userAvatar: "/avatars/3.png",
    text: "Thank you for bringing this up, Priya. We'll conduct a safety assessment of the park lighting this week and add this to our priority list.",
    timestamp: "10:18 AM",
    likes: 6,
    isOfficial: true,
  },
  {
    id: "msg8",
    userId: 8,
    userName: "Amit Patel",
    userAvatar: "/avatars/8.png",
    text: "The new online permit system is very confusing. Can we get a tutorial or help guide?",
    timestamp: "10:22 AM",
    likes: 11,
    isOfficial: false,
  },
  {
    id: "msg9",
    userId: 9,
    userName: "Officer Sharma",
    userAvatar: "/avatars/9.png",
    text: "We'll be hosting a workshop next week to help citizens navigate the new permit system. We'll also create video tutorials that will be available on our website.",
    timestamp: "10:25 AM",
    likes: 4,
    isOfficial: true,
  },
]

// Mock upcoming townhalls
export const mockUpcomingTownhalls = [
  {
    title: "Water Conservation Initiatives",
    description: "Discussion on new water conservation policies and community involvement in sustainable practices.",
    date: "July 25, 2024",
    time: "6:00 PM - 7:30 PM",
    host: "Dr. Rajesh Kumar",
    department: "Environmental Affairs",
    isSpecial: false,
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
  },
  {
    title: "Public Safety Forum",
    description: "Open discussion on improving security measures and emergency response in residential areas.",
    date: "August 10, 2024",
    time: "6:30 PM - 8:00 PM",
    host: "Commissioner Patel",
    department: "Public Safety",
    isSpecial: false,
  },
  {
    title: "Education Infrastructure Planning",
    description: "Discussion on improving school facilities and educational resources across the district.",
    date: "August 15, 2024",
    time: "5:00 PM - 6:30 PM",
    host: "Dr. Meera Singh",
    department: "Education Department",
    isSpecial: false,
  },
]

// Mock user activity
export const mockUserActivity = [
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
  {
    type: "achievement",
    title: "Achievement Unlocked",
    description: "You earned the 'Community Voice' badge",
    date: "July 15, 2024",
    points: 50,
    icon: Award,
  },
  {
    type: "complaint",
    title: "Complaint Resolved",
    description: "Your complaint about streetlight has been resolved",
    date: "July 12, 2024",
    points: 10,
    icon: CheckCircle,
  },
  {
    type: "points",
    title: "Quiz Completed",
    description: "You completed the 'Know Your Rights' educational quiz",
    date: "July 10, 2024",
    points: 15,
    icon: BookOpen,
  },
  {
    type: "townhall",
    title: "Question Answered",
    description: "Your question was answered in the Water Conservation townhall",
    date: "July 5, 2024",
    points: 5,
    icon: MessageSquare,
  },
]

// Mock user achievements
export const mockUserAchievements = [
  {
    category: "Civic Engagement",
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
    category: "Community Participation",
    achievements: [
      {
        name: "Community Voice",
        description: "Participate in your first townhall",
        icon: Users,
        unlocked: true,
        date: "June 5, 2024",
      },
      {
        name: "Regular Attendee",
        description: "Participate in 5 townhalls",
        icon: Users,
        progress: 2,
        target: 5,
        unlocked: false,
      },
      {
        name: "Community Leader",
        description: "Have 3 of your townhall questions answered",
        icon: MessageSquare,
        progress: 1,
        target: 3,
        unlocked: false,
      },
    ],
  },
  {
    category: "Fraud Detection",
    achievements: [
      {
        name: "Fraud Buster",
        description: "Report your first potential fraud case",
        icon: Shield,
        unlocked: true,
        date: "July 2, 2024",
      },
      {
        name: "Watchful Eye",
        description: "Report 3 confirmed fraud cases",
        icon: Shield,
        progress: 1,
        target: 3,
        unlocked: false,
      },
      {
        name: "Fraud Expert",
        description: "Complete the fraud detection training",
        icon: Award,
        unlocked: false,
      },
    ],
  },
]

// Mock user stats
export const mockUserStats = [
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
]

// Mock complaint data for analytics
export const mockComplaintsByCategory = [
  { category: "Sanitation", value: 425 },
  { category: "Infrastructure", value: 356 },
  { category: "Security", value: 271 },
  { category: "Corruption", value: 196 },
]

export const mockComplaintsByLocation = [
  { location: "North District", count: 320 },
  { location: "South District", count: 280 },
  { location: "East District", count: 210 },
  { location: "West District", count: 190 },
  { location: "Central District", count: 248 },
]

export const mockComplaintTrends = [
  { month: "Jan", sanitation: 30, security: 25, infrastructure: 20, corruption: 15 },
  { month: "Feb", sanitation: 35, security: 28, infrastructure: 22, corruption: 18 },
  { month: "Mar", sanitation: 40, security: 30, infrastructure: 25, corruption: 20 },
  { month: "Apr", sanitation: 38, security: 32, infrastructure: 28, corruption: 22 },
  { month: "May", sanitation: 42, security: 35, infrastructure: 30, corruption: 25 },
  { month: "Jun", sanitation: 45, security: 38, infrastructure: 32, corruption: 28 },
]

export const mockResolutionRates = [
  { date: "Jan", rate: 72 },
  { date: "Feb", rate: 75 },
  { date: "Mar", rate: 78 },
  { date: "Apr", rate: 80 },
  { date: "May", rate: 83 },
  { date: "Jun", rate: 86 },
]

export const mockHeatmapData = [
  { x: 25, y: 30, intensity: 0.9 },
  { x: 75, y: 40, intensity: 0.7 },
  { x: 30, y: 70, intensity: 0.8 },
  { x: 65, y: 75, intensity: 0.6 },
  { x: 45, y: 50, intensity: 1.0 },
  { x: 15, y: 20, intensity: 0.5 },
  { x: 85, y: 30, intensity: 0.4 },
  { x: 60, y: 60, intensity: 0.7 },
  { x: 35, y: 85, intensity: 0.6 },
  { x: 80, y: 80, intensity: 0.5 },
]

// Mock educational content
export const mockEducationalContent = {
  guides: [
    {
      title: "Understanding Your Civic Rights",
      description: "A comprehensive guide to citizen rights and responsibilities",
      icon: BookOpen,
      topics: [
        "Right to Information",
        "Right to Public Services",
        "Grievance Redressal Mechanisms",
        "Citizen Participation in Governance",
      ],
    },
    {
      title: "Identifying Fraud in Government Schemes",
      description: "Learn to spot common fraud patterns in public welfare programs",
      icon: Shield,
      topics: [
        "Common Subsidy Fraud Patterns",
        "Identity Theft Warning Signs",
        "Document Forgery Detection",
        "Reporting Suspected Fraud",
      ],
    },
    {
      title: "Effective Complaint Filing",
      description: "How to file complaints that get results",
      icon: FileText,
      topics: ["Gathering Evidence", "Writing Clear Descriptions", "Following Up Effectively", "Escalation Procedures"],
    },
  ],
  courses: [
    {
      title: "Civic Rights 101",
      description: "Essential knowledge for every citizen",
      difficulty: "Beginner",
      duration: "45 minutes",
      points: 20,
      thumbnailSrc: "/animations/civic-rights.json",
      videoSrc: "/animations/civic-rights-video.json",
      sections: [
        {
          title: "Introduction to Civic Rights",
          content:
            "Civic rights are the rights that allow citizens to participate in civil and political life without discrimination or repression. These rights are fundamental to a functioning democracy and include the right to vote, the right to fair treatment by public officials, and the right to access public services.",
          bulletPoints: [
            "Historical development of civic rights",
            "Constitutional guarantees",
            "International standards and agreements",
          ],
        },
        {
          title: "Right to Information",
          content:
            "The Right to Information Act empowers citizens to request information from public authorities. This transparency mechanism helps reduce corruption and holds government accountable.",
          bulletPoints: [
            "How to file an RTI application",
            "Timeline for responses",
            "Appeals process for denied requests",
          ],
        },
        {
          title: "Public Service Guarantees",
          content:
            "Many states have enacted Public Service Guarantee Acts that ensure timely delivery of essential services. These acts specify timeframes for service delivery and compensation for delays.",
          bulletPoints: [
            "Services covered under guarantee acts",
            "Timeframes for different services",
            "Compensation for delays",
          ],
        },
      ],
      resources: [
        { title: "RTI Application Template", type: "PDF" },
        { title: "Civic Rights Handbook", type: "PDF" },
        { title: "Constitution Excerpts", type: "PDF" },
      ],
      relatedCourses: ["Effective Complaint Filing", "Community Organizing Basics"],
      quiz: {
        questions: [
          {
            question: "What is the primary purpose of the Right to Information Act?",
            answers: [
              "To provide government jobs",
              "To ensure transparency and accountability",
              "To collect taxes efficiently",
              "To regulate private businesses",
            ],
            correctAnswer: 1,
          },
          {
            question: "Within how many days must authorities typically respond to an RTI application?",
            answers: ["10 days", "30 days", "60 days", "90 days"],
            correctAnswer: 1,
          },
          {
            question: "What can citizens do if their RTI application is rejected?",
            answers: [
              "Nothing, the decision is final",
              "File a police complaint",
              "File an appeal with the appellate authority",
              "Contact the media",
            ],
            correctAnswer: 2,
          },
          {
            question: "Which of the following is NOT typically covered by Public Service Guarantee Acts?",
            answers: [
              "Issuing birth certificates",
              "Processing passport applications",
              "Providing electricity connections",
              "Resolving private disputes between neighbors",
            ],
            correctAnswer: 3,
          },
          {
            question: "What is the main benefit of civic participation?",
            answers: [
              "Financial rewards from the government",
              "Improved community outcomes and responsive governance",
              "Guaranteed government employment",
              "Exemption from certain taxes",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      title: "Fraud Detection Masterclass",
      description: "Advanced techniques to identify corruption and fraud",
      difficulty: "Intermediate",
      duration: "1.5 hours",
      points: 30,
      thumbnailSrc: "/animations/fraud-detection.json",
      videoSrc: "/animations/fraud-detection-video.json",
      sections: [
        {
          title: "Common Fraud Schemes",
          content:
            "This section covers the most prevalent fraud schemes in government programs, including subsidy fraud, identity theft, and document forgery.",
          bulletPoints: [
            "Ghost beneficiaries in welfare schemes",
            "Multiple claims under different identities",
            "Misrepresentation of income or assets",
          ],
        },
        {
          title: "Red Flags and Warning Signs",
          content: "Learn to identify suspicious patterns and behaviors that may indicate fraudulent activity.",
          bulletPoints: [
            "Unusual documentation patterns",
            "Inconsistencies in reported information",
            "Suspicious timing of applications or claims",
          ],
        },
        {
          title: "Investigation Techniques",
          content:
            "This section covers basic investigation methods that citizens can use to gather evidence of potential fraud.",
          bulletPoints: [
            "Documentation and record-keeping",
            "Witness statements and testimonies",
            "Digital evidence collection",
          ],
        },
      ],
      resources: [
        { title: "Fraud Indicators Checklist", type: "PDF" },
        { title: "Evidence Collection Guide", type: "PDF" },
        { title: "Case Studies of Exposed Fraud", type: "PDF" },
      ],
      relatedCourses: ["Digital Evidence Collection", "Public Fund Tracking"],
      quiz: {
        questions: [
          {
            question: "What is a 'ghost beneficiary' in the context of welfare fraud?",
            answers: [
              "A person who receives benefits after death",
              "A fictional person created to claim benefits",
              "A government official who steals benefits",
              "A person who helps others commit fraud",
            ],
            correctAnswer: 1,
          },
          {
            question: "Which of the following is NOT a common red flag for subsidy fraud?",
            answers: [
              "Multiple applications from the same address",
              "Luxury assets owned by subsidy claimants",
              "Regular filing of tax returns",
              "Frequent changes in reported family members",
            ],
            correctAnswer: 2,
          },
          {
            question: "What should you do first when you suspect fraud in a government scheme?",
            answers: [
              "Confront the suspected fraudster directly",
              "Post about it on social media",
              "Document your observations and evidence",
              "Contact the media immediately",
            ],
            correctAnswer: 2,
          },
          {
            question: "Which type of evidence is typically most valuable in fraud investigations?",
            answers: [
              "Hearsay from neighbors",
              "Anonymous tips",
              "Documented inconsistencies in official records",
              "Personal opinions about the suspect",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is 'income misrepresentation' in the context of welfare fraud?",
            answers: [
              "Reporting a higher income to get a bank loan",
              "Reporting a lower income to qualify for benefits",
              "Not reporting any income at all",
              "Reporting income in a foreign currency",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      title: "Community Organizing Basics",
      description: "Learn to mobilize your community for positive change",
      difficulty: "Beginner",
      duration: "1 hour",
      points: 25,
      thumbnailSrc: "/animations/community.json",
      videoSrc: "/animations/community-video.json",
      sections: [
        {
          title: "Principles of Community Organizing",
          content:
            "This section covers the fundamental principles that make community organizing effective, including shared vision, inclusive leadership, and strategic action.",
          bulletPoints: [
            "Building shared purpose and vision",
            "Inclusive leadership models",
            "Asset-based community development",
          ],
        },
        {
          title: "Effective Communication Strategies",
          content:
            "Learn how to communicate effectively with community members, officials, and other stakeholders to advance your cause.",
          bulletPoints: [
            "Clear messaging and framing",
            "Active listening techniques",
            "Digital and traditional outreach methods",
          ],
        },
        {
          title: "Planning and Executing Community Actions",
          content:
            "This section provides practical guidance on planning and implementing community initiatives, from small projects to larger campaigns.",
          bulletPoints: ["Setting achievable goals", "Creating action plans", "Measuring impact and success"],
        },
      ],
      resources: [
        { title: "Community Meeting Template", type: "PDF" },
        { title: "Action Planning Worksheet", type: "PDF" },
        { title: "Stakeholder Mapping Guide", type: "PDF" },
      ],
      relatedCourses: ["Civic Rights 101", "Effective Public Speaking"],
      quiz: {
        questions: [
          {
            question: "What is the primary goal of community organizing?",
            answers: [
              "To win political elections",
              "To raise funds for local projects",
              "To build collective power for positive change",
              "To replace government services",
            ],
            correctAnswer: 2,
          },
          {
            question:
              "Which approach to community development focuses on identifying and leveraging existing strengths?",
            answers: [
              "Needs-based approach",
              "Asset-based approach",
              "Deficit-focused approach",
              "Problem-solving approach",
            ],
            correctAnswer: 1,
          },
          {
            question: "What is a key characteristic of inclusive leadership?",
            answers: [
              "Centralizing decision-making with one strong leader",
              "Distributing leadership responsibilities among diverse community members",
              "Appointing the most educated person as the leader",
              "Rotating leadership randomly",
            ],
            correctAnswer: 1,
          },
          {
            question: "Which of the following is an example of a SMART goal for community action?",
            answers: [
              "Make our neighborhood better",
              "Improve safety somehow",
              "Install 5 new streetlights on Main Street by December",
              "Get the government to help us more",
            ],
            correctAnswer: 2,
          },
          {
            question: "What is stakeholder mapping used for in community organizing?",
            answers: [
              "Creating a geographic map of the neighborhood",
              "Identifying who has influence and interest in your issue",
              "Mapping out where to put physical infrastructure",
              "Creating a timeline for activities",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
  ],
  faq: [
    {
      question: "How do I file a Right to Information (RTI) application?",
      answer:
        "To file an RTI application, write a clear request for the specific information you need, address it to the Public Information Officer of the relevant department, include your contact details, and pay the application fee (usually Rs. 10). You can submit it in person, by post, or online through the RTI portal if available for that department.",
      links: ["RTI Online Portal", "Sample RTI Application", "List of Public Information Officers"],
    },
    {
      question: "What should I do if my complaint is not addressed within the promised timeframe?",
      answer:
        "If your complaint is not addressed within the promised timeframe, you can escalate it to the next level of authority. In GrievX, use the 'Escalate' option on your complaint details page. You can also file a complaint under the Public Service Guarantee Act if applicable in your state, which may entitle you to compensation for the delay.",
      links: ["Escalation Procedures", "Public Service Guarantee Act Guide", "Compensation Claims Process"],
    },
    {
      question: "How can I identify potential fraud in government schemes?",
      answer:
        "Look for warning signs such as officials asking for bribes to process applications, beneficiaries who don't meet eligibility criteria receiving benefits, ghost beneficiaries (non-existent people receiving benefits), or multiple benefits being claimed by the same person under different names. Document any evidence carefully before reporting.",
      links: ["Fraud Indicators Checklist", "How to Document Evidence", "Reporting Channels for Fraud"],
    },
    {
      question: "What information should I include when filing a complaint?",
      answer:
        "Include specific details about the issue (what, where, when), any relevant reference numbers or documents, photos or videos if applicable, names of officials you've already contacted, and your contact information. Be clear, factual, and concise. Avoid vague statements and focus on verifiable facts.",
      links: ["Effective Complaint Writing Guide", "Evidence Collection Tips", "Sample Complaint Templates"],
    },
    {
      question: "How can I organize my community to address a local issue?",
      answer:
        "Start by gathering interested neighbors to discuss the issue and establish shared goals. Document the problem with photos, data, and testimonials. Research relevant regulations and responsible authorities. Create an action plan with specific tasks and timelines. Reach out to local officials with a clear, solution-oriented proposal. Consider forming a registered residents' welfare association for more formal representation.",
      links: [
        "Community Organizing Toolkit",
        "Residents' Association Formation Guide",
        "Effective Advocacy Strategies",
      ],
    },
  ],
  resources: [
    {
      title: "Citizen's Handbook",
      description: "Comprehensive guide to civic rights and responsibilities",
      icon: BookOpen,
    },
    {
      title: "Fraud Detection Toolkit",
      description: "Tools and techniques to identify and report corruption",
      icon: Shield,
    },
    {
      title: "Community Action Guide",
      description: "Step-by-step process for organizing community initiatives",
      icon: Users,
    },
  ],
}

// Mock fraud cases for the fraud detector
export const mockFraudCases = [
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
  },
  {
    id: 2,
    title: "Agricultural Subsidy Claim",
    description: "Farmer claiming subsidies for land that satellite imagery shows is not being cultivated.",
    category: "Agricultural Subsidy",
    details: {
      applicantName: "Mohan Singh",
      landArea: "12 acres (claimed as cultivated)",
      subsidyAmount: "₹1,45,000",
      inconsistencies: [
        "Satellite imagery shows no cultivation activity",
        "No water consumption records for irrigation",
        "No purchase records for seeds or fertilizers",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 87,
  },
  {
    id: 3,
    title: "Pension Claim Verification",
    description: "Pension being claimed for a person who may be deceased, based on database cross-referencing.",
    category: "Pension Scheme",
    details: {
      beneficiaryName: "Lakshmi Devi",
      pensionType: "Senior Citizen Pension",
      monthlyAmount: "₹3,000",
      inconsistencies: [
        "Death certificate issued 2 years ago",
        "No healthcare utilization in 24 months",
        "Banking transactions show only ATM withdrawals on same day each month",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 95,
  },
  {
    id: 4,
    title: "Housing Subsidy Application",
    description: "Applicant for affordable housing subsidy has discrepancies in family information.",
    category: "Housing Scheme",
    details: {
      applicantName: "Priya Sharma",
      householdSize: "6 members (claimed)",
      subsidyAmount: "₹2,50,000",
      inconsistencies: [
        "School records show only 2 children vs 4 claimed",
        "Ration card shows different family composition",
        "Previous housing application listed different family members",
      ],
    },
    fraudStatus: "Legitimate",
    confidenceScore: 65,
  },
  {
    id: 5,
    title: "Disability Benefit Claim",
    description: "Applicant claiming disability benefits with potentially fraudulent medical documentation.",
    category: "Disability Benefits",
    details: {
      applicantName: "Vikram Patel",
      disabilityType: "Permanent physical disability (claimed)",
      benefitAmount: "₹4,000 monthly",
      inconsistencies: [
        "Medical certificate from non-existent hospital",
        "Doctor's registration number invalid",
        "Social media shows applicant participating in sports activities",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 88,
  },
  {
    id: 6,
    title: "Scholarship Application",
    description: "Student applying for merit-based scholarship with potentially altered grade documents.",
    category: "Education Scholarship",
    details: {
      applicantName: "Ananya Gupta",
      scholarshipType: "Merit-based higher education scholarship",
      amount: "₹75,000 per year",
      inconsistencies: [
        "Digital alterations detected in grade certificate",
        "School records show different grades than submitted",
        "Verification with examination board failed",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 82,
  },
  {
    id: 7,
    title: "Business Loan Subsidy",
    description: "Small business owner applying for subsidized loan with questionable business documentation.",
    category: "Business Support Scheme",
    details: {
      applicantName: "Arjun Mehta",
      businessType: "Manufacturing startup",
      loanAmount: "₹15,00,000 with 5% interest subsidy",
      inconsistencies: [
        "Business address is a residential property with no commercial activity",
        "No GST registration despite claimed turnover requiring it",
        "Employee records appear duplicated from another business",
      ],
    },
    fraudStatus: "Legitimate",
    confidenceScore: 40,
  },
  {
    id: 8,
    title: "Flood Relief Claim",
    description: "Household claiming flood damage relief from an area minimally affected by recent floods.",
    category: "Disaster Relief",
    details: {
      applicantName: "Ramesh Joshi",
      claimAmount: "₹1,20,000 for property damage",
      disasterType: "Flood damage",
      inconsistencies: [
        "Property located on elevated ground according to topographical data",
        "Satellite imagery shows no flooding in specific area",
        "Damage photos inconsistent with flood damage patterns",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 78,
  },
  {
    id: 9,
    title: "Healthcare Subsidy Application",
    description: "Family applying for healthcare subsidy with potential income misrepresentation.",
    category: "Healthcare Scheme",
    details: {
      applicantName: "Sunita Verma",
      familySize: "5 members",
      subsidyType: "Premium subsidy for health insurance",
      inconsistencies: [
        "Bank statements show regular high-value transactions",
        "Tax records indicate higher income than declared",
        "Luxury expenditures inconsistent with declared income",
      ],
    },
    fraudStatus: "Legitimate",
    confidenceScore: 35,
  },
  {
    id: 10,
    title: "Rural Employment Guarantee",
    description: "Multiple job cards issued to same individual under slightly different names.",
    category: "Employment Scheme",
    details: {
      primaryName: "Suresh Kumar / Suresh K. Sharma / S.K. Sharma",
      schemeType: "Rural employment guarantee program",
      paymentAmount: "₹8,500 per month (multiple payments)",
      inconsistencies: [
        "Biometric data matches across three different job cards",
        "Same bank account receiving multiple payments",
        "Attendance records show simultaneous work at different sites",
      ],
    },
    fraudStatus: "Fraud",
    confidenceScore: 96,
  },
]
