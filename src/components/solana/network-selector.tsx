'use client'

import React from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useCluster } from '../cluster/cluster-data-access'
import { Network } from 'lucide-react'

export function NetworkSelector() {
  const { cluster, clusters, setCluster } = useCluster()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-background/60 backdrop-blur-sm">
          <Network className="w-4 h-4 mr-2" />
          {cluster.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {clusters.map((item) => (
          <DropdownMenuItem
            key={item.name}
            onClick={() => setCluster(item)}
            className="cursor-pointer"
          >
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 