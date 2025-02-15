'use client'

import { Connection, PublicKey } from '@solana/web3.js'
import { getAccount } from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export class TokenListingService {
  private connection: Connection
  private metaplex: Metaplex

  constructor(connection: Connection) {
    this.connection = connection
    this.metaplex = new Metaplex(connection)
  }

  async getTokenInfo(mintAddress: string) {
    try {
      const mint = new PublicKey(mintAddress)
      const metadata = await this.metaplex.nfts().findByMint({ mintAddress: mint })
      
      return {
        mint: mintAddress,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        metadata: metadata.address.toString(),
      }
    } catch (error) {
      console.error('Failed to get token info:', error)
      throw error
    }
  }

  async getHolderCount(mintAddress: string) {
    try {
      const mint = new PublicKey(mintAddress)
      const accounts = await this.connection.getTokenLargestAccounts(mint)
      return accounts.value.length
    } catch (error) {
      console.error('Failed to get holder count:', error)
      throw error
    }
  }

  async getUserTokens(ownerAddress: string) {
    try {
      const owner = new PublicKey(ownerAddress)
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
        owner,
        { programId: TOKEN_PROGRAM_ID }
      )

      const tokens = await Promise.all(
        tokenAccounts.value
          .filter(account => account.account.data.parsed.info.tokenAmount.uiAmount > 0)
          .map(async account => {
            const mintAddress = account.account.data.parsed.info.mint
            const tokenInfo = await this.getTokenInfo(mintAddress)
            const holders = await this.getHolderCount(mintAddress)
            
            return {
              ...tokenInfo,
              holders,
              supply: account.account.data.parsed.info.tokenAmount.uiAmount,
            }
          })
      )

      return tokens
    } catch (error) {
      console.error('Failed to get user tokens:', error)
      throw error
    }
  }
} 