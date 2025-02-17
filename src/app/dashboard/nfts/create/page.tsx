'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useToast } from "@/components/ui/use-toast"

type FormDataType = {
  name: string
  symbol: string
  description: string
  image: File | null
  supply: string
  royalty: string
}

export default function CreateNFTPage() {
  const { toast } = useToast()
  const { publicKey } = useWallet()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    symbol: '',
    description: '',
    image: null,
    supply: '',
    royalty: ''
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({
        ...prev,
        image: file
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!publicKey) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }
    
    try {
      setIsUploading(true)
      // NFT creation logic here
      toast({
        title: "Success",
        description: "NFT Collection created successfully!",
      })
    } catch (error) {
      console.error('Error creating NFT:', error)
      toast({
        title: "Error",
        description: "Failed to create NFT collection",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Collection Name</Label>
            <Input
              placeholder="Enter collection name"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Collection Symbol</Label>
            <Input
              placeholder="Enter collection symbol"
              value={formData.symbol}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, symbol: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter collection description"
              value={formData.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Collection Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <span className="text-sm text-gray-400">
                  {formData.image ? formData.image.name : 'Click to upload collection image'}
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Supply</Label>
              <Input
                type="number"
                placeholder="Enter total supply"
                value={formData.supply}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setFormData(prev => ({ ...prev, supply: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Royalty %</Label>
              <Input
                type="number"
                placeholder="Enter royalty percentage"
                value={formData.royalty}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setFormData(prev => ({ ...prev, royalty: e.target.value }))}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
            disabled={isUploading}
          >
            {isUploading ? 'Creating Collection...' : 'Create Collection'}
          </Button>
        </form>
      </Card>
    </div>
  )
} 