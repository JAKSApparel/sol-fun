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
  PanelLeft,
} from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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

export function SolCrusherSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <Sidebar 
      collapsible="icon" 
      className={cn(
        "border-r border-purple-500/20 bg-[#1E1B2E] transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )} 
      {...props}
    >
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png"
              alt="SolCrusher Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            {!collapsed && <span className="text-xl font-bold">SolCrusher</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
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