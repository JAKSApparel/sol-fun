"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "16rem"

type SidebarContext = {
  isMobile: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useIsMobile()

  return (
    <SidebarContext.Provider value={{ isMobile, isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile, isOpen, setIsOpen } = useSidebar()

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-50 lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="w-[300px] p-0 bg-[#13111C] border-purple-500/20">
            {children}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div
      className={cn("w-[16rem] border-r border-purple-500/20 bg-[#13111C]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-3 py-2", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto", className)} {...props} />
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}
