'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenLaunchpad } from "@/components/launchpad/token-launchpad"
import { NftLaunchpad } from "@/components/launchpad/nft-launchpad"

export default function LaunchpadPage() {
  return (
    <div className="container max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Launchpad</h1>
      
      <Tabs defaultValue="tokens" className="space-y-6">
        <TabsList className="bg-[#1E1B2E] border-purple-500/20">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens">
          <TokenLaunchpad />
        </TabsContent>
        
        <TabsContent value="nfts">
          <NftLaunchpad />
        </TabsContent>
      </Tabs>
    </div>
  )
} 