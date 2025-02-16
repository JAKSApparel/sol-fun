export type Token = {
  id: string
  symbol: string
  name: string
  balance?: string
  icon: string
}

export const tokens: Token[] = [
  {
    id: "1",
    symbol: "USDC",
    name: "USD Coin",
    icon: "/tokens/usdc.svg"
  },
  {
    id: "2",
    symbol: "SOL",
    name: "Solana",
    icon: "/tokens/sol.svg"
  },
  {
    id: "3",
    symbol: "BONK",
    name: "Bonk",
    icon: "/tokens/bonk.svg"
  }
] 