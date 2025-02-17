'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export function NftLaunchpad() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Launch Your NFT Collection</h2>
        <Link href="/dashboard/nfts/create">
          <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            <Plus className="w-4 h-4 mr-2" />
            Create Collection
          </Button>
        </Link>
      </div>
      {/* Add NFT launchpad content */}
    </div>
  )
} 