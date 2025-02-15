"use client"

import { SolCrusherSidebar } from "@/components/dashboard/solcrusher-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-[#13111C]">
          {/* Sidebar */}
          <SolCrusherSidebar 
            className={`transition-all duration-300 ${
              sidebarOpen ? 'w-64' : 'w-16'
            } hidden md:flex`}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Dashboard Header */}
            <div className="border-b border-purple-500/20 bg-[#1E1B2E]/80 backdrop-blur-sm">
              <div className="flex h-16 items-center px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 md:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Dashboard</h2>
                  <div className="flex items-center gap-4">
                    <Header />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
} 