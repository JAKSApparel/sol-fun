'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCluster } from "./cluster-data-access"
import { Network } from "lucide-react"

export function NetworkSwitcher() {
  const { cluster, clusters, setCluster } = useCluster()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-purple-500/20">
          <Network className="mr-2 h-4 w-4" />
          {cluster.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {clusters.map((net) => (
          <DropdownMenuItem
            key={net.network}
            onClick={() => setCluster(net)}
            className="capitalize"
          >
            {net.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 