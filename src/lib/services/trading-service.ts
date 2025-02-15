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
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token'

export class TradingService {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getTokenBalance(tokenMint: PublicKey, owner: PublicKey) {
    try {
      const tokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        owner,
        false,
        TOKEN_PROGRAM_ID
      )

      const balance = await this.connection.getTokenAccountBalance(tokenAccount)
      return balance.value.uiAmount
    } catch (error) {
      console.error('Failed to get token balance:', error)
      throw error
    }
  }

  async transfer({
    fromPubkey,
    toPubkey,
    mint,
    amount,
    signTransaction,
  }: {
    fromPubkey: PublicKey
    toPubkey: PublicKey
    mint: PublicKey
    amount: number
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  }) {
    try {
      const sourceATA = await getAssociatedTokenAddress(
        mint,
        fromPubkey,
        false,
        TOKEN_PROGRAM_ID
      )

      const destinationATA = await getAssociatedTokenAddress(
        mint,
        toPubkey,
        false,
        TOKEN_PROGRAM_ID
      )

      const transaction = new Transaction()

      // Check if destination token account exists
      const destinationAccount = await this.connection.getAccountInfo(destinationATA)
      if (!destinationAccount) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            fromPubkey,
            destinationATA,
            toPubkey,
            mint,
            TOKEN_PROGRAM_ID
          )
        )
      }

      transaction.add(
        createTransferInstruction(
          sourceATA,
          destinationATA,
          fromPubkey,
          amount,
          [],
          TOKEN_PROGRAM_ID
        )
      )

      const latestBlockhash = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = latestBlockhash.blockhash
      transaction.feePayer = fromPubkey

      const signed = await signTransaction(transaction)
      const signature = await this.connection.sendRawTransaction(signed.serialize())
      await this.connection.confirmTransaction(signature)

      return signature
    } catch (error) {
      console.error('Transfer failed:', error)
      throw error
    }
  }

  async getTokenAccounts(owner: PublicKey) {
    try {
      const accounts = await this.connection.getParsedTokenAccountsByOwner(
        owner,
        { programId: TOKEN_PROGRAM_ID }
      )

      return accounts.value.map(account => ({
        mint: account.account.data.parsed.info.mint,
        amount: account.account.data.parsed.info.tokenAmount.uiAmount,
        address: account.pubkey.toString(),
      }))
    } catch (error) {
      console.error('Failed to get token accounts:', error)
      throw error
    }
  }

  async createTokenAccount(
    owner: PublicKey,
    mint: PublicKey,
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ) {
    try {
      const ata = await getAssociatedTokenAddress(
        mint,
        owner,
        false,
        TOKEN_PROGRAM_ID
      )

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          owner,
          ata,
          owner,
          mint,
          TOKEN_PROGRAM_ID
        )
      )

      const latestBlockhash = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = latestBlockhash.blockhash
      transaction.feePayer = owner

      const signed = await signTransaction(transaction)
      const signature = await this.connection.sendRawTransaction(signed.serialize())
      await this.connection.confirmTransaction(signature)

      return ata
    } catch (error) {
      console.error('Failed to create token account:', error)
      throw error
    }
  }
} 