import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { toast } from "@/components/ui/use-toast"

export async function requestDevnetAirdrop(connection: Connection, address: PublicKey) {
  try {
    const signature = await connection.requestAirdrop(address, LAMPORTS_PER_SOL)
    await connection.confirmTransaction(signature)
    toast({ title: "Success", description: "Airdrop successful!" })
    return signature
  } catch (error) {
    console.error('Airdrop failed:', error)
    toast({ title: "Error", description: "Airdrop failed. Please try again.", variant: "destructive" })
    throw error
  }
}

export async function getBalance(connection: Connection, address: PublicKey) {
  try {
    const balance = await connection.getBalance(address)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error('Failed to get balance:', error)
    throw error
  }
} 