import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor"
import { Connection, PublicKey } from "@solana/web3.js"
import idl from "./idl.json"

export const PROGRAM_ID = new PublicKey("Your_Program_ID_Here")

export function getProgram(connection: Connection, wallet: any) {
  if (!wallet) return null

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  })

  return new Program(idl as Idl, PROGRAM_ID, provider)
} 