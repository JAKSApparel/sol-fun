'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, X, Trash2 } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-hot-toast'
import {
  createFungible,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'
import {
  createTokenIfMissing,
  findAssociatedTokenPda,
  getSplAssociatedTokenProgramId,
  mintTokensTo,
} from '@metaplex-foundation/mpl-toolbox'
import {
  generateSigner,
  percentAmount,
  createGenericFile,
  signerIdentity,
  keypairIdentity,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { bundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useCluster } from '@/components/cluster/cluster-data-access'
import { Keypair } from '@solana/web3.js'
import { createSignerFromWallet } from '@metaplex-foundation/umi-signer-wallet-adapters'

type TokenMetadata = {
  name: string
  value: string
}

export default function CreateTokenPage() {
  const { publicKey, signTransaction, signMessage } = useWallet()
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: null as File | null,
    supply: '',
    decimals: '9',
    isBurnable: true,
    isFrozen: false,
    maxSupply: '',
    metadata: [] as TokenMetadata[],
    imagePreview: '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ 
        ...prev, 
        image: file,
        imagePreview: URL.createObjectURL(file)
      }))
    }
  }

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let symbol = e.target.value.toUpperCase()
    symbol = symbol.replace(/CRUSH$/, '')
    setFormData(prev => ({ ...prev, symbol }))
  }

  const getFullSymbol = () => {
    const baseSymbol = formData.symbol.toUpperCase().replace(/CRUSH$/, '')
    return baseSymbol ? `${baseSymbol}CRUSH` : ''
  }

  const addMetadata = () => {
    setFormData(prev => ({
      ...prev,
      metadata: [...prev.metadata, { name: '', value: '' }]
    }))
  }

  const updateMetadata = (index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      metadata: prev.metadata.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const removeMetadata = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metadata: prev.metadata.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !signTransaction || !signMessage) {
      toast.error('Please connect your wallet first')
      return
    }
    
    try {
      setIsCreating(true)
      
      // Initialize Umi
      const umi = createUmi(connection.rpcEndpoint)
        .use(mplTokenMetadata())
        .use(bundlrUploader())

      // Create a wallet adapter signer
      const walletAdapter = {
        publicKey,
        signTransaction,
        signMessage,
      }
      const signer = createSignerFromWallet(walletAdapter)
      umi.use(signerIdentity(signer))

      // Generate a new mint keypair
      const mintKeypair = Keypair.generate()
      const mintPublicKey = mintKeypair.publicKey
      
      // Upload image if provided
      let imageUri = ''
      if (formData.image) {
        const imageBuffer = await formData.image.arrayBuffer()
        const umiImage = createGenericFile(
          new Uint8Array(imageBuffer),
          formData.image.name,
          { contentType: formData.image.type }
        )
        const [uploadedImage] = await umi.uploader.upload([umiImage])
        imageUri = uploadedImage
      }

      // Create and upload metadata with additional properties
      const metadata = {
        name: formData.name,
        symbol: getFullSymbol(),
        description: formData.description,
        image: imageUri,
        attributes: [
          { trait_type: 'Burnable', value: formData.isBurnable ? 'Yes' : 'No' },
          { trait_type: 'Initial Supply', value: formData.supply },
          { trait_type: 'Max Supply', value: formData.maxSupply || 'Unlimited' },
          ...formData.metadata.map(({ name, value }) => ({
            trait_type: name,
            value
          }))
        ],
      }

      const metadataUri = await umi.uploader.uploadJson(metadata)
      
      // Create the token
      await createFungible(umi, {
        mint: mintPublicKey,
        name: formData.name,
        symbol: getFullSymbol(),
        uri: metadataUri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: Number(formData.decimals),
        authority: publicKey,
        freezeAuthority: formData.isFrozen ? publicKey : null,
      }).sendAndConfirm(umi)

      // Mint initial supply
      const supply = BigInt(Number(formData.supply) * Math.pow(10, Number(formData.decimals)))
      
      const tokenAccount = findAssociatedTokenPda(umi, {
        mint: mintPublicKey,
        owner: publicKey,
      })

      await mintTokensTo(umi, {
        mint: mintPublicKey,
        amount: supply,
        token: tokenAccount,
      }).sendAndConfirm(umi)
      
      toast.success('Token created successfully!')
      toast.success(
        <div>
          View on Solana Explorer:
          <a 
            href={`https://explorer.solana.com/address/${mintPublicKey.toString()}?cluster=${cluster.network}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 ml-1"
          >
            {mintPublicKey.toString().slice(0, 8)}...
          </a>
        </div>
      )

    } catch (error) {
      console.error('Error creating token:', error)
      toast.error('Failed to create token')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-6">
      <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
        <h1 className="text-2xl font-bold mb-6">Create New Token</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Token Name</Label>
            <Input
              placeholder="Enter token name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Symbol</Label>
            <div className="relative">
              <Input
                placeholder="Enter token symbol"
                value={formData.symbol}
                onChange={handleSymbolChange}
                required
                className="pr-20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                CRUSH
              </span>
            </div>
            {formData.symbol && (
              <p className="text-sm text-gray-400">
                Final symbol: {getFullSymbol()}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter token description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Token Logo</Label>
            <div className="border-2 border-dashed border-purple-500/20 rounded-lg p-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {formData.imagePreview ? (
                  <div className="relative w-32 h-32 mb-2">
                    <img
                      src={formData.imagePreview}
                      alt="Token logo preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setFormData(prev => ({
                          ...prev,
                          image: null,
                          imagePreview: ''
                        }))
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-purple-500 mb-2" />
                    <span className="text-sm text-gray-400">
                      Click to upload token logo
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Initial Supply</Label>
              <Input
                type="number"
                placeholder="Enter initial supply"
                value={formData.supply}
                onChange={e => setFormData(prev => ({ ...prev, supply: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Decimals</Label>
              <Input
                type="number"
                placeholder="Enter decimals (e.g. 9)"
                value={formData.decimals}
                onChange={e => setFormData(prev => ({ ...prev, decimals: e.target.value }))}
                required
                min="0"
                max="9"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="burnable"
                checked={formData.isBurnable}
                onChange={e => setFormData(prev => ({ ...prev, isBurnable: e.target.checked }))}
                className="rounded border-gray-400"
              />
              <Label htmlFor="burnable">Token can be burned</Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="frozen"
                checked={formData.isFrozen}
                onChange={e => setFormData(prev => ({ ...prev, isFrozen: e.target.checked }))}
                className="rounded border-gray-400"
              />
              <Label htmlFor="frozen">Enable freeze authority</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Max Supply (Optional)</Label>
            <Input
              type="number"
              placeholder="Leave empty for unlimited supply"
              value={formData.maxSupply}
              onChange={e => setFormData(prev => ({ ...prev, maxSupply: e.target.value }))}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Additional Metadata</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMetadata}
                className="border-purple-500/20 hover:bg-purple-500/10"
              >
                Add Field
              </Button>
            </div>

            {formData.metadata.map((field, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    placeholder="Trait name"
                    value={field.name}
                    onChange={(e) => updateMetadata(index, 'name', e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Trait value"
                    value={field.value}
                    onChange={(e) => updateMetadata(index, 'value', e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMetadata(index)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
            disabled={isCreating}
          >
            {isCreating ? 'Creating Token...' : 'Create Token'}
          </Button>
        </form>
      </Card>
    </div>
  )
} 