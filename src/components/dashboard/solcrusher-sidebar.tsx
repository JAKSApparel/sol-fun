"use client"

import * as React from "react"
import {
  BarChart2,
  Wallet,
  Settings,
  BookOpen,
  Bot,
  Zap,
  Shield,
  History,
  Star,
  PieChart,
  Coins,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Updated data for SolCrusher
const data = {
  user: {
    name: "User",
    email: "",
    avatar: "/logo.png",
  },
  teams: [
    {
      name: "SolCrusher",
      logo: Coins,
      plan: "Beta",
    }
  ],
  navMain: [
    {
      title: "Trading",
      url: "/dashboard",
      icon: BarChart2,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "History",
          url: "/dashboard/history",
        },
        {
          title: "Watchlist",
          url: "/dashboard/watchlist",
        },
      ],
    },
    {
      title: "AI Tools",
      url: "/dashboard/ai",
      icon: Bot,
      items: [
        {
          title: "Market Analysis",
          url: "/dashboard/ai/market",
        },
        {
          title: "Trading Bot",
          url: "/dashboard/ai/bot",
        },
        {
          title: "Risk Analysis",
          url: "/dashboard/ai/risk",
        },
      ],
    },
    {
      title: "Wallet",
      url: "/dashboard/wallet",
      icon: Wallet,
      items: [
        {
          title: "Assets",
          url: "/dashboard/wallet/assets",
        },
        {
          title: "Transactions",
          url: "/dashboard/wallet/transactions",
        },
        {
          title: "Staking",
          url: "/dashboard/wallet/staking",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Preferences",
          url: "/dashboard/settings/preferences",
        },
        {
          title: "API Keys",
          url: "/dashboard/settings/api",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Trading Analytics",
      url: "/dashboard/analytics",
      icon: PieChart,
    },
    {
      name: "Smart Trading",
      url: "/dashboard/smart-trading",
      icon: Zap,
    },
    {
      name: "Risk Management",
      url: "/dashboard/risk",
      icon: Shield,
    },
  ],
}

export function SolCrusherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 