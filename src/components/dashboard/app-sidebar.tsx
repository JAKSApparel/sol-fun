"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Coins,
  LineChart,
  Wallet,
  BookOpen,
  HelpCircle,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"

const navigation = {
  main: [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Tokens",
      icon: Coins,
      href: "/dashboard/tokens",
      items: [
        {
          title: "My Tokens",
          href: "/dashboard/tokens",
        },
        {
          title: "Create Token",
          href: "/dashboard/tokens/create",
        },
      ],
    },
    {
      title: "Trading",
      icon: LineChart,
      href: "/dashboard/trading",
      items: [
        {
          title: "Trade",
          href: "/dashboard/trading",
        },
        {
          title: "History",
          href: "/dashboard/trading/history",
        },
      ],
    },
    {
      title: "Wallet",
      icon: Wallet,
      href: "/dashboard/wallet",
    },
  ],
  resources: [
    {
      title: "Documentation",
      icon: BookOpen,
      href: "https://docs.solcrushers.com",
      external: true,
    },
    {
      title: "Support",
      icon: HelpCircle,
      href: "https://support.solcrushers.com",
      external: true,
    },
  ],
}

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <Sidebar className="border-r border-purple-500/20">
      <SidebarHeader className="border-b border-purple-500/20 h-16">
        <Link href="/dashboard" className="flex items-center gap-2 px-4">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          {!isMobile && <span className="font-semibold text-white">SolCrusher</span>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-6 px-4 py-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.main.map((item) => (
              <NavItem 
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2 px-3">RESOURCES</h4>
            <div className="space-y-1">
              {navigation.resources.map((item) => (
                <NavItem 
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <nav className="px-4 py-3 border-t border-purple-500/20">
          <NavItem 
            item={{
              title: "Settings",
              icon: Settings,
              href: "/dashboard/settings",
            }}
            isActive={pathname === "/dashboard/settings"}
          />
        </nav>
      </SidebarFooter>
    </Sidebar>
  )
}

type NavItemProps = {
  item: {
    title: string
    icon: React.ComponentType<{ className?: string }>
    href: string
    external?: boolean
  }
  isActive: boolean
}

function NavItem({ item, isActive }: NavItemProps) {
  const { isMobile } = useSidebar()
  const LinkComponent = item.external ? 'a' : Link
  const linkProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <LinkComponent
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive 
          ? 'bg-purple-500/20 text-white' 
          : 'text-muted-foreground hover:bg-purple-500/10 hover:text-white'
      }`}
      {...linkProps}
    >
      <item.icon className="w-4 h-4" />
      {!isMobile && <span>{item.title}</span>}
    </LinkComponent>
  )
}
