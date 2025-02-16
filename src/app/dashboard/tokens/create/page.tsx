'use client'

import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TokenMintingService } from '@/lib/services/token-minting-service'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { PublicKey, Transaction } from '@solana/web3.js'

const tokenSchema = z.object({
  name: z.string().min(1, 'Token name is required').max(32, 'Token name too long'),
  symbol: z.string().min(1, 'Token symbol is required').max(10, 'Symbol too long'),
  supply: z.string().min(1, 'Supply is required'),
  decimals: z.string().transform(Number).pipe(z.number().min(0).max(9)),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  liquidityAmount: z.string().min(1, 'Liquidity amount is required'),
  maxBuy: z.string().optional(),
  maxSell: z.string().optional(),
  buyTax: z.string().transform(Number).pipe(z.number().min(0).max(100)).optional(),
  sellTax: z.string().transform(Number).pipe(z.number().min(0).max(100)).optional(),
})

type LaunchTokenParams = {
  payer: PublicKey
  name: string
  symbol: string
  decimals: number
  initialSupply: number
  uri: string
  liquidityAmount: number
  maxBuy?: number
  maxSell?: number
  buyTax?: number
  sellTax?: number
  signTransaction: (tx: Transaction) => Promise<Transaction>
}

export default function CreateTokenPage() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    decimals: '9',
    description: '',
    website: '',
    twitter: '',
    discord: '',
    liquidityAmount: '',
    maxBuy: '',
    maxSell: '',
    buyTax: '',
    sellTax: '',
  })
  const router = useRouter()

  const handleCreate = async () => {
    if (!publicKey || !signTransaction) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      setIsCreating(true)
      const validatedData = tokenSchema.parse(formData)
      
      const tokenMintingService = new TokenMintingService(connection)
      const result = await tokenMintingService.createToken({
        payer: publicKey,
        name: validatedData.name,
        symbol: validatedData.symbol,
        decimals: validatedData.decimals,
        initialSupply: Number(validatedData.supply),
        uri: '', // TODO: Add metadata URI
        signTransaction,
      })

      toast.success(
        <div>
          <p>Token created successfully!</p>
          <p className="text-sm">Mint: {result.mint.slice(0, 8)}...</p>
          <a 
            href={`/token/${result.mint}`}
            className="text-sm text-blue-500"
          >
            View Token
          </a>
        </div>
      )

      // Use Next.js router instead of window.location
      router.push(`/dashboard/tokens`)
    } catch (error) {
      console.error('Token creation failed:', error)
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message)
      } else {
        toast.error('Failed to create token')
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto bg-[#1E1B2E] border-purple-500/20">
        <CardHeader>
          <CardTitle>Create Token</CardTitle>
          <CardDescription>Launch your own token on Solana</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="launch">Launch Settings</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Token Name</label>
                <Input
                  placeholder="e.g., My Token"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Token Symbol</label>
                <Input
                  placeholder="e.g., MTK"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Initial Supply</label>
                <Input
                  type="number"
                  placeholder="1000000"
                  value={formData.supply}
                  onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Decimals</label>
                <Input
                  type="number"
                  placeholder="9"
                  value={formData.decimals}
                  onChange={(e) => setFormData({ ...formData, decimals: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Describe your token"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="launch" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Initial Liquidity (SOL)</label>
                <Input
                  type="number"
                  placeholder="0.1"
                  value={formData.liquidityAmount}
                  onChange={(e) => setFormData({ ...formData, liquidityAmount: e.target.value })}
                />
                <p className="text-xs text-gray-400 mt-1">Minimum 0.1 SOL</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Max Buy (%)</label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={formData.maxBuy}
                    onChange={(e) => setFormData({ ...formData, maxBuy: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Sell (%)</label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={formData.maxSell}
                    onChange={(e) => setFormData({ ...formData, maxSell: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Buy Tax (%)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.buyTax}
                    onChange={(e) => setFormData({ ...formData, buyTax: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Sell Tax (%)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.sellTax}
                    onChange={(e) => setFormData({ ...formData, sellTax: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input
                  placeholder="https://"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Twitter</label>
                <Input
                  placeholder="@username"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Discord</label>
                <Input
                  placeholder="discord.gg/..."
                  value={formData.discord}
                  onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            className="w-full mt-6"
            onClick={handleCreate}
            disabled={!publicKey || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Token'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 