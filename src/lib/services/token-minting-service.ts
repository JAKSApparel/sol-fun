'use client'

import { 
  Connection, 
  PublicKey, 
  Transaction,
  SystemProgram,
  Keypair,
} from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TokenMetadataService } from './token-metadata-service'

export class TokenMintingService {
  private connection: Connection
  private metadataService: TokenMetadataService

  constructor(connection: Connection) {
    this.connection = connection
    this.metadataService = new TokenMetadataService(connection)
  }

  async createToken({
    payer,
    name,
    symbol,
    decimals = 9,
    initialSupply,
    uri,
    signTransaction,
  }: {
    payer: PublicKey
    name: string
    symbol: string
    decimals?: number
    initialSupply: number
    uri?: string
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  }) {
    try {
      // Generate the mint keypair
      const mintKeypair = Keypair.generate()
      const mintPubkey = mintKeypair.publicKey

      // Calculate rent-exempt amount
      const lamports = await getMinimumBalanceForRentExemptMint(this.connection)

      // Get the ATA for payer
      const tokenATA = await getAssociatedTokenAddress(
        mintPubkey,
        payer,
        false,
        TOKEN_PROGRAM_ID
      )

      // Create transaction
      const transaction = new Transaction()

      // Add create account instruction
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: payer,
          newAccountPubkey: mintPubkey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        })
      )

      // Add initialize mint instruction
      transaction.add(
        createInitializeMintInstruction(
          mintPubkey,
          decimals,
          payer,
          payer,
          TOKEN_PROGRAM_ID
        )
      )

      // Create token account for payer
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer,
          tokenATA,
          payer,
          mintPubkey,
          TOKEN_PROGRAM_ID
        )
      )

      // Mint tokens to payer
      transaction.add(
        createMintToInstruction(
          mintPubkey,
          tokenATA,
          payer,
          initialSupply * (10 ** decimals),
          [],
          TOKEN_PROGRAM_ID
        )
      )

      // Get latest blockhash
      const latestBlockhash = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = latestBlockhash.blockhash
      transaction.feePayer = payer

      // Partially sign with mint keypair
      transaction.partialSign(mintKeypair)

      // Sign with wallet
      const signed = await signTransaction(transaction)
      
      // Send and confirm transaction
      const signature = await this.connection.sendRawTransaction(signed.serialize())
      await this.connection.confirmTransaction(signature)

      // Add metadata if URI is provided
      if (uri) {
        await this.metadataService.createMetadata({
          mint: mintPubkey,
          name,
          symbol,
          uri,
          payer,
          updateAuthority: payer,
          signTransaction,
        })
      }

      return {
        signature,
        mint: mintPubkey.toString(),
        tokenAccount: tokenATA.toString(),
      }
    } catch (error) {
      console.error('Token creation failed:', error)
      throw error
    }
  }
} 