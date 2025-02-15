'use client'

import React, { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'
import { z } from 'zod'
import toast from 'react-hot-toast'

const tokenSchema = z.object({
  name: z.string().min(1, 'Token name is required').max(32, 'Token name too long'),
  symbol: z.string().min(1, 'Token symbol is required').max(10, 'Symbol too long'),
  description: z.string().max(200, 'Description too long'),
  supply: z.number().min(1, 'Supply must be greater than 0'),
  decimals: z.number().min(0).max(9),
  taxFee: z.number().min(0).max(100),
})

export function CreateToken() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    supply: '',
    decimals: '9',
    taxFee: '0',
  })

  const handleCreate = async () => {
    if (!publicKey || !signTransaction) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      const parsedData = {
        ...formData,
        supply: Number(formData.supply),
        decimals: Number(formData.decimals),
        taxFee: Number(formData.taxFee),
      }

      const validatedData = tokenSchema.parse(parsedData)
      
      // Token creation logic will go here
      toast.success('Token creation initiated')
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message)
      } else {
        console.error('Token creation failed:', error)
        toast.error('Failed to create token')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Memecoin</CardTitle>
          <CardDescription>
            Launch your own memecoin with custom parameters. All tokens will end with &quot;crush&quot;
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Creating a token requires SOL for deployment. Make sure you have enough balance.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Token Name</label>
              <Input
                placeholder="e.g., Super"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Token Symbol</label>
              <Input
                placeholder="e.g., SUPER"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Enter token description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Initial Supply</label>
                <Input
                  placeholder="e.g., 1000000"
                  value={formData.supply}
                  onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Decimals</label>
                <Select
                  value={formData.decimals}
                  onValueChange={(value) => setFormData({ ...formData, decimals: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select decimals" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Tax Fee (%)</label>
                <Input
                  placeholder="0"
                  value={formData.taxFee}
                  onChange={(e) => setFormData({ ...formData, taxFee: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full bg-[#14F195] hover:bg-[#14F195]/90 text-black"
              onClick={handleCreate}
              disabled={!publicKey}
            >
              Create Token
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Estimated cost: 0.05 SOL
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 