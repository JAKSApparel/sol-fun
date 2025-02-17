import { Connection, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAccount, getMint } from '@solana/spl-token'
import { z } from 'zod'

export const TokenInfoSchema = z.object({
  mint: z.string(),
  name: z.string(),
  symbol: z.string(),
  supply: z.number(),
  decimals: z.number(),
  holders: z.number().default(0),
  price: z.number().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export type TokenInfo = z.infer<typeof TokenInfoSchema>

export class TokenListingService {
  constructor(
    private connection: Connection,
    private programId: PublicKey
  ) {}

  async getTokenInfo(mint: string): Promise<TokenInfo> {
    try {
      const mintPubkey = new PublicKey(mint)
      const mintInfo = await getMint(this.connection, mintPubkey)
      
      // Get token accounts
      const accounts = await this.connection.getTokenLargestAccounts(mintPubkey)
      const holders = accounts.value.length

      // Get metadata if available
      let metadata: Record<string, string> = {}
      try {
        const metadataAccount = await this.connection.getAccountInfo(
          await this.findMetadataAddress(mintPubkey)
        )
        if (metadataAccount) {
          metadata = this.parseMetadata(metadataAccount.data)
        }
      } catch (error) {
        console.warn('Metadata not found for token:', mint)
      }

      return TokenInfoSchema.parse({
        mint: mint,
        name: metadata.name || 'Unknown Token',
        symbol: metadata.symbol || 'UNKNOWN',
        supply: Number(mintInfo.supply),
        decimals: mintInfo.decimals,
        holders,
        metadata
      })
    } catch (error) {
      console.error('Error fetching token info:', error)
      throw new Error(`Failed to fetch token info for mint ${mint}`)
    }
  }

  async getAllUserTokens(owner: PublicKey): Promise<TokenInfo[]> {
    try {
      const accounts = await this.connection.getParsedTokenAccountsByOwner(
        owner,
        { programId: TOKEN_PROGRAM_ID }
      )

      const tokens = await Promise.all(
        accounts.value
          .filter(account => {
            const parsedInfo = account.account.data.parsed.info
            return Number(parsedInfo.tokenAmount.amount) > 0
          })
          .map(account => {
            const parsedInfo = account.account.data.parsed.info
            return this.getTokenInfo(parsedInfo.mint)
          })
      )

      return tokens
    } catch (error) {
      console.error('Error fetching user tokens:', error)
      throw new Error('Failed to fetch user tokens')
    }
  }

  private async findMetadataAddress(mint: PublicKey): Promise<PublicKey> {
    const [address] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        this.programId.toBuffer(),
        mint.toBuffer(),
      ],
      this.programId
    )
    return address
  }

  private parseMetadata(data: Buffer): Record<string, string> {
    try {
      // Basic metadata parsing - extend based on your needs
      const decoder = new TextDecoder()
      const jsonString = decoder.decode(data)
      return JSON.parse(jsonString)
    } catch {
      return {}
    }
  }

  async getTokenPrice(mint: string): Promise<number | null> {
    // Implement price fetching logic here
    // You might want to integrate with a DEX or price oracle
    return null
  }
} 