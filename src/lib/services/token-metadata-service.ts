'use client'

import { 
  Connection, 
  PublicKey, 
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
import {
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionDataArgs,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from '@metaplex-foundation/mpl-token-metadata'

export class TokenMetadataService {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async createMetadata({
    mint,
    name,
    symbol,
    uri,
    sellerFeeBasisPoints = 0,
    creators = [],
    payer,
    updateAuthority,
    signTransaction,
  }: {
    mint: PublicKey
    name: string
    symbol: string
    uri: string
    sellerFeeBasisPoints?: number
    creators?: { address: PublicKey; share: number; verified: boolean }[]
    payer: PublicKey
    updateAuthority: PublicKey
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  }) {
    const [metadataAddress] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )

    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      metadata: metadataAddress,
      mint,
      mintAuthority: payer,
      payer,
      updateAuthority,
    }

    const data: CreateMetadataAccountV3InstructionDataArgs = {
      data: {
        name,
        symbol,
        uri,
        sellerFeeBasisPoints,
        creators: creators.length > 0 ? creators : null,
        collection: null,
        uses: null,
      },
      isMutable: true,
      collectionDetails: null,
    }

    const instruction = createCreateMetadataAccountV3Instruction(
      accounts,
      {
        createMetadataAccountArgsV3: data,
      }
    )

    const transaction = new Transaction().add(instruction)
    const latestBlockhash = await this.connection.getLatestBlockhash()
    transaction.recentBlockhash = latestBlockhash.blockhash
    transaction.feePayer = payer

    const signed = await signTransaction(transaction)
    const signature = await this.connection.sendRawTransaction(signed.serialize())
    await this.connection.confirmTransaction(signature)

    return {
      metadata: metadataAddress.toString(),
      signature,
    }
  }
} 