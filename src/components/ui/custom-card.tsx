import { Card, CardProps } from "./card"
import { cn } from "@/lib/utils"

export function CustomCard({ className, ...props }: CardProps) {
  return (
    <Card 
      className={cn("bg-[#1E1B2E] border-purple-500/20", className)} 
      {...props} 
    />
  )
} 