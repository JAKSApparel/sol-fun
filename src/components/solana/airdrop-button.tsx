'use client'

import React from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { cn } from '@/lib/utils'

interface AirdropButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AirdropButton({ className, ...props }: AirdropButtonProps) {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleAirdrop = async () => {
    if (!publicKey) {
      toast({ title: "Error", description: "Please connect your wallet first", variant: "destructive" })
      return
    }

    setIsLoading(true)
    try {
      const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
      
      // Wait for confirmation
      const latestBlockHash = await connection.getLatestBlockhash()
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature
      }, 'confirmed')

      toast({ title: "Success", description: "Airdrop successful! 1 SOL received" })
      
      // Get updated balance
      const balance = await connection.getBalance(publicKey)
      console.log('New balance:', balance / LAMPORTS_PER_SOL)
    } catch (error) {
      console.error('Airdrop failed:', error)
      toast({ title: "Error", description: "Airdrop failed. Please try again in a moment.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleAirdrop} 
      disabled={isLoading || !publicKey}
      className={cn("bg-pink-500 hover:bg-pink-600", className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Requesting SOL...
        </>
      ) : (
        'Get Devnet SOL'
      )}
    </Button>
  )
} 