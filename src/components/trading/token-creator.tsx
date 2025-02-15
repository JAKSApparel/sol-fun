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
import { Loader2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function TokenCreator() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
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

    setIsLoading(true)
    try {
      // Here you would implement the actual token creation logic
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Token created successfully!')
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        description: '',
        supply: '',
        decimals: '9',
        taxFee: '0',
      })
    } catch (error) {
      toast.error('Failed to create token')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Memecoin</CardTitle>
        <CardDescription>
          Launch your own memecoin with custom parameters. All tokens will end with &quot;crush&quot;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Creating a token requires SOL for deployment. Make sure you have enough balance.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Token Name</label>
            <Input
              placeholder="e.g., Super"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
            />
            {formData.name && (
              <p className="text-sm text-muted-foreground">
                Final name: {formData.name}crush
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Token Symbol</label>
            <Input
              placeholder="e.g., SUPER"
              value={formData.symbol}
              onChange={(e) => updateFormData('symbol', e.target.value.toUpperCase())}
              maxLength={5}
            />
            {formData.symbol && (
              <p className="text-sm text-muted-foreground">
                Final symbol: ${formData.symbol}CRUSH
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Enter token description"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Supply</label>
              <Input
                type="number"
                placeholder="e.g., 1000000"
                value={formData.supply}
                onChange={(e) => updateFormData('supply', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Decimals</label>
              <Select 
                value={formData.decimals}
                onValueChange={(value) => updateFormData('decimals', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tax Fee (%)</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                value={formData.taxFee}
                onChange={(e) => updateFormData('taxFee', e.target.value)}
                min="0"
                max="10"
              />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleCreate}
            disabled={isLoading || !publicKey || !formData.name || !formData.symbol || !formData.supply}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Token...
              </>
            ) : (
              'Create Token'
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Estimated cost: 0.05 SOL
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 