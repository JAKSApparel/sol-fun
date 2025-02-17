import { Connection, PublicKey } from '@solana/web3.js'
import { TokenListingService } from '../token-listing-service'

export const createTokenListingService = (connection: Connection) => {
  const programId = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_METADATA_PROGRAM_ID!)
  return new TokenListingService(connection, programId)
} 