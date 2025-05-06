"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useUser } from "@/components/user-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  FileText,
  Search,
  Shield,
  BarChart3,
  Users,
  BookOpen,
  Settings,
  LogOut,
  User,
  MessageSquare,
  Award,
  Gamepad2,
} from "lucide-react"

export function AppSidebar() {
  const { user, logout } = useUser()
  const pathname = usePathname()

  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      {
        title: "Home",
        icon: Home,
        href: "/",
      },
      {
        title: "File Complaint",
        icon: FileText,
        href: "/file-complaint",
      },
      {
        title: "Track Case",
        icon: Search,
        href: "/track-complaint",
      },
    ]

    const citizenItems = [
      ...commonItems,
      {
        title: "Fraud Detector",
        icon: Shield,
        href: "/fraud-detector",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/analytics",
      },
      {
        title: "Townhall",
        icon: MessageSquare,
        href: "/townhall",
        badge: "Live",
      },
      {
        title: "Fraud Game",
        icon: Gamepad2,
        href: "/fraud-game",
      },
      {
        title: "Education Hub",
        icon: BookOpen,
        href: "/education",
      },
    ]

    const adminItems = [
      ...commonItems,
      {
        title: "Dashboard",
        icon: BarChart3,
        href: "/admin/dashboard",
      },
      {
        title: "Manage Users",
        icon: Users,
        href: "/admin/users",
      },
      {
        title: "Complaints",
        icon: FileText,
        href: "/admin/complaints",
        badge: "12",
      },
      {
        title: "Fraud Cases",
        icon: Shield,
        href: "/admin/fraud",
        badge: "5",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/admin/analytics",
      },
    ]

    const officerItems = [
      ...commonItems,
      {
        title: "Assigned Cases",
        icon: FileText,
        href: "/officer/cases",
        badge: "8",
      },
      {
        title: "Fraud Review",
        icon: Shield,
        href: "/officer/fraud",
      },
      {
        title: "Townhall",
        icon: MessageSquare,
        href: "/townhall",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/officer/analytics",
      },
    ]

    const analystItems = [
      ...commonItems,
      {
        title: "Analytics Dashboard",
        icon: BarChart3,
        href: "/analyst/dashboard",
      },
      {
        title: "Fraud Patterns",
        icon: Shield,
        href: "/analyst/fraud-patterns",
      },
      {
        title: "Sentiment Analysis",
        icon: BarChart3,
        href: "/analyst/sentiment",
      },
      {
        title: "Reports",
        icon: FileText,
        href: "/analyst/reports",
      },
    ]

    if (!user) return commonItems

    switch (user.role) {
      case "admin":
        return adminItems
      case "officer":
        return officerItems
      case "analyst":
        return analystItems
      default:
        return citizenItems
    }
  }

  const menuItems = getMenuItems()

  return (
    <Sidebar>
      {user && (
        <SidebarHeader>
          <div className="flex items-center p-2">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={`/avatars/${user.id}.png`} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold leading-none">{user.name}</h2>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          {user.role === "citizen" && user.points !== undefined && (
            <div className="px-3 py-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Civic Points</span>
                <span className="font-medium">{user.points}</span>
              </div>
              <Progress value={Math.min((user.points / 1000) * 100, 100)} className="h-2" />
            </div>
          )}
        </SidebarHeader>
      )}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && user.role === "citizen" && (
          <SidebarGroup>
            <SidebarGroupLabel>Achievements</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Achievements">
                    <Link href="/achievements">
                      <Award />
                      <span>Achievements</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link href="/profile">
                  <User />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => logout()} tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
