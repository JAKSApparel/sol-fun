'use client'

import React, { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TokenMintingService } from '@/lib/services/token-minting-service'
import { z } from 'zod'
import toast from 'react-hot-toast'

const tokenSchema = z.object({
  name: z.string().min(1, 'Token name is required').max(32, 'Token name too long'),
  symbol: z.string().min(1, 'Token symbol is required').max(10, 'Symbol too long'),
  supply: z.number().min(1, 'Supply must be greater than 0'),
  decimals: z.number().min(0).max(9),
})

export function CreateToken() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    decimals: '9',
  })

  const handleCreate = async () => {
    if (!publicKey || !signTransaction) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      setIsCreating(true)
      const parsedData = {
        ...formData,
        supply: Number(formData.supply),
        decimals: Number(formData.decimals),
      }

      const validatedData = tokenSchema.parse(parsedData)
      
      const tokenMintingService = new TokenMintingService(connection)
      const result = await tokenMintingService.createToken({
        payer: publicKey,
        name: validatedData.name,
        symbol: validatedData.symbol,
        decimals: validatedData.decimals,
        initialSupply: validatedData.supply,
        signTransaction,
      })

      toast.success(
        <div>
          <p>Token created successfully!</p>
          <p className="text-sm">Mint: {result.mint.slice(0, 8)}...</p>
          <a 
            href={`https://solscan.io/token/${result.mint}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-500"
          >
            View on Solscan
          </a>
        </div>
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message)
      } else {
        console.error('Token creation failed:', error)
        toast.error('Failed to create token')
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card className="bg-[#1E1B2E] border-purple-500/20">
      <CardHeader>
        <CardTitle>Create Token</CardTitle>
        <CardDescription>Launch your own token with custom parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
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

          <div>
            <label className="text-sm font-medium">Decimals</label>
            <Input
              type="number"
              placeholder="9"
              value={formData.decimals}
              onChange={(e) => setFormData({ ...formData, decimals: e.target.value })}
            />
          </div>

          <Button 
            className="w-full"
            onClick={handleCreate}
            disabled={!publicKey || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Token'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 