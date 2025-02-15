'use client'

import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js'
import { 
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createTransferInstruction
} from '@solana/spl-token'
import { toast } from 'react-hot-toast'

export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey
) {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  )

  try {
    await connection.getAccountInfo(associatedToken)
    return associatedToken
  } catch (error) {
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        payer,
        associatedToken,
        owner,
        mint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    )
    
    return associatedToken
  }
}

export async function transferTokens(
  connection: Connection,
  payer: PublicKey,
  source: PublicKey,
  destination: PublicKey,
  amount: number,
  mint: PublicKey,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) {
  try {
    // Get or create associated token accounts
    const sourceATA = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      source
    )

    const destinationATA = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      destination
    )

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      sourceATA,
      destinationATA,
      source,
      amount
    )

    // Create and sign transaction
    const transaction = new Transaction().add(transferInstruction)
    const latestBlockhash = await connection.getLatestBlockhash()
    transaction.recentBlockhash = latestBlockhash.blockhash
    transaction.feePayer = payer

    const signed = await signTransaction(transaction)
    const signature = await connection.sendRawTransaction(signed.serialize())
    await connection.confirmTransaction(signature)

    return signature
  } catch (error) {
    console.error('Transfer failed:', error)
    throw error
  }
} 