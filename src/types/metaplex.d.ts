declare module '@metaplex-foundation/mpl-token-metadata' {
  export const createMetadataAccountV3: any
  export const findMetadataPda: any
}

declare module '@metaplex-foundation/mpl-toolbox' {
  export const createMint: any
  export const createMintWithAssociatedToken: any
  export const findAssociatedTokenPda: any
}

declare module '@metaplex-foundation/umi' {
  export const generateSigner: any
  export const percentAmount: any
  export const publicKey: any
  export type Signer = any
  export const createSignerFromKeypair: any
}

declare module '@metaplex-foundation/umi/serializers' {
  export const base58: any
} 