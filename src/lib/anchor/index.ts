import { Program, AnchorProvider } from "@coral-xyz/anchor"
import { Connection, PublicKey } from "@solana/web3.js"
import { useAnchorWallet } from "@solana/wallet-adapter-react"

export const getProgram = (connection: Connection, wallet: any) => {
  if (!wallet) return null

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  })

  // Add your program configuration here
  return null
} 