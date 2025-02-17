'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-hot-toast'

export default function CreateNFTPage() {
  const { publicKey } = useWallet()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: null as File | null,
    supply: '',
    royalty: ''
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) {
      toast.error('Please connect your wallet first')
      return
    }
    
    try {
      setIsUploading(true)
      // NFT creation logic here
      toast.success('NFT Collection created successfully!')
    } catch (error) {
      console.error('Error creating NFT:', error)
      toast.error('Failed to create NFT collection')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-6">
      <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
        <h1 className="text-2xl font-bold mb-6">Create NFT Collection</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Collection Name</Label>
            <Input
              placeholder="Enter collection name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Symbol</Label>
            <Input
              placeholder="Enter collection symbol"
              value={formData.symbol}
              onChange={e => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter collection description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="border-2 border-dashed border-purple-500/20 rounded-lg p-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                required
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-purple-500 mb-2" />
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
                onChange={e => setFormData(prev => ({ ...prev, supply: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Royalty %</Label>
              <Input
                type="number"
                placeholder="Enter royalty percentage"
                value={formData.royalty}
                onChange={e => setFormData(prev => ({ ...prev, royalty: e.target.value }))}
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