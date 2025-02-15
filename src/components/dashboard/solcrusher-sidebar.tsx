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
  List,
  HelpCircle
} from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

const navigation = {
  trading: [
    { name: 'Overview', href: '/dashboard', icon: BarChart2 },
    { name: 'History', href: '/dashboard/history', icon: History },
    { name: 'Watchlist', href: '/dashboard/watchlist', icon: List },
  ],
  aiTools: [
    { name: 'Market Analysis', href: '/dashboard/market-analysis', icon: BarChart2 },
    { name: 'Trading Bot', href: '/dashboard/trading-bot', icon: Bot },
    { name: 'Risk Analysis', href: '/dashboard/risk-analysis', icon: Shield },
  ],
  wallet: [
    { name: 'Assets', href: '/dashboard/assets', icon: Wallet },
    { name: 'Transactions', href: '/dashboard/transactions', icon: History },
    { name: 'Staking', href: '/dashboard/staking', icon: Wallet },
  ],
  settings: [
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
    { name: 'Preferences', href: '/dashboard/preferences', icon: Settings },
  ],
}

interface SolCrusherSidebarProps {
  className?: string
  onClose?: () => void
}

export function SolCrusherSidebar({ className, onClose }: SolCrusherSidebarProps) {
  return (
    <div className={cn("flex h-full flex-col bg-[#1E1B2E] text-white", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-purple-500/20 px-6">
        <Image 
          src="/logo.png" 
          alt="SolCrusher" 
          width={32} 
          height={32}
          className="h-8 w-8"
        />
        <span className="text-xl font-bold">SolCrusher</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 px-2">
              Trading
            </h3>
            <div className="mt-2 space-y-1">
              {navigation.trading.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={onClose}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 px-2">
              AI Tools
            </h3>
            <div className="mt-2 space-y-1">
              {navigation.aiTools.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={onClose}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 px-2">
              Wallet
            </h3>
            <div className="mt-2 space-y-1">
              {navigation.wallet.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={onClose}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 px-2">
              Settings
            </h3>
            <div className="mt-2 space-y-1">
              {navigation.settings.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={onClose}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Help Button */}
      <div className="border-t border-purple-500/20 p-4">
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </div>
    </div>
  )
} 