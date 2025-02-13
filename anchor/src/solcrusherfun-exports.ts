// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolcrusherfunIDL from '../target/idl/solcrusherfun.json'
import type { Solcrusherfun } from '../target/types/solcrusherfun'

// Re-export the generated IDL and type
export { Solcrusherfun, SolcrusherfunIDL }

// The programId is imported from the program IDL.
export const SOLCRUSHERFUN_PROGRAM_ID = new PublicKey(SolcrusherfunIDL.address)

// This is a helper function to get the Solcrusherfun Anchor program.
export function getSolcrusherfunProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...SolcrusherfunIDL, address: address ? address.toBase58() : SolcrusherfunIDL.address } as Solcrusherfun, provider)
}

// This is a helper function to get the program ID for the Solcrusherfun program depending on the cluster.
export function getSolcrusherfunProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solcrusherfun program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return SOLCRUSHERFUN_PROGRAM_ID
  }
}
