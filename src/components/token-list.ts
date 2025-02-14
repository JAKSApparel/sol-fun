export interface Token {
  id: string
  name: string
  symbol: string
  icon: string
  balance?: string
}

export const tokens: Token[] = [
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aLYAZ5a5POwZp5NeBbUWtitlwz6pOA.png", // Replace with actual USDC icon
    balance: "1,234.56",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aLYAZ5a5POwZp5NeBbUWtitlwz6pOA.png", // Replace with actual SOL icon
    balance: "12.345",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aLYAZ5a5POwZp5NeBbUWtitlwz6pOA.png", // Replace with actual ETH icon
    balance: "0.567",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aLYAZ5a5POwZp5NeBbUWtitlwz6pOA.png", // Replace with actual BTC icon
    balance: "0.123",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aLYAZ5a5POwZp5NeBbUWtitlwz6pOA.png", // Replace with actual USDT icon
    balance: "2,345.67",
  },
]

