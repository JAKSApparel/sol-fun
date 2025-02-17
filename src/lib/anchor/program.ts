import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor"
import { Connection, PublicKey } from "@solana/web3.js"
import idl from "./idl.json"

export const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "11111111111111111111111111111111")

export interface SolCrusherProgram extends Program<Idl> {
  account: {
    solcrusherfun: {
      all: () => Promise<any[]>
      fetch: (address: PublicKey) => Promise<any>
    }
  }
}

export function getProgram(connection: Connection, wallet: any): SolCrusherProgram | null {
  if (!wallet) return null

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  })

  return new Program(idl as Idl, PROGRAM_ID, provider) as SolCrusherProgram
} 