export type Token = {
  symbol: string
  name: string
  address: string
  decimals: number
  logoURI?: string
  tags?: string[]
}

export const tokens: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    logoURI: "/tokens/usdc.png",
    tags: ["stablecoin"]
  },
  {
    symbol: "SOL",
    name: "Solana",
    address: "So11111111111111111111111111111111111111112",
    decimals: 9,
    logoURI: "/tokens/sol.png",
    tags: ["native"]
  },
  {
    symbol: "BONK",
    name: "Bonk",
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
    logoURI: "/tokens/bonk.png",
    tags: ["meme"]
  }
]

