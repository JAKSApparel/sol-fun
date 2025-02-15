'use client'

import React, { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowDownUp, TrendingUp, TrendingDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { TradingService } from '@/lib/services/trading-service'
import { MarketService } from '@/lib/services/market-service'
import { PublicKey } from '@solana/web3.js'
import { CreateToken } from '@/components/token/create-token'

type TokenPair = {
  name: string
  address: string
  price: number
  change24h: number
}

const MOCK_TOKEN_PAIRS: TokenPair[] = [
  { name: 'SOL/USDC', address: 'So11111111111111111111111111111111111111112', price: 109.45, change24h: 5.23 },
  { name: 'BONK/USDC', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', price: 0.00001234, change24h: -2.34 },
  { name: 'JUP/USDC', address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZxPGvXq', price: 0.845, change24h: 12.56 },
]

// Create a consistent initial order book data
const createInitialOrderBook = (basePrice: number) => {
  const asks = Array.from({ length: 5 }).map((_, i) => ({
    price: basePrice + i * 0.1,
    amount: 10 - i,
    total: (10 - i) * (basePrice + i * 0.1)
  }))

  const bids = Array.from({ length: 5 }).map((_, i) => ({
    price: basePrice - i * 0.1,
    amount: 10 - i,
    total: (10 - i) * (basePrice - i * 0.1)
  }))

  return { asks, bids }
}

export function TradingInterface() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [selectedPair, setSelectedPair] = useState<TokenPair>(MOCK_TOKEN_PAIRS[0])
  const [amount, setAmount] = useState('')
  const [orderType, setOrderType] = useState('market')
  const [tradeType, setTradeType] = useState('buy')
  const [orderBook, setOrderBook] = useState<{
    asks: Array<{ price: number; amount: number; total: number }>
    bids: Array<{ price: number; amount: number; total: number }>
  }>({ asks: [], bids: [] })
  const [tradingService] = useState(new TradingService(connection))
  const [marketService] = useState(new MarketService(connection))
  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)

  // Update order book periodically
  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const book = await marketService.getOrderbook(selectedPair.address)
        setOrderBook(book)
      } catch (error) {
        console.error('Failed to fetch orderbook:', error)
      }
    }

    fetchOrderBook()
    const interval = setInterval(fetchOrderBook, 5000)
    return () => clearInterval(interval)
  }, [selectedPair.address, marketService])

  const handleTrade = async () => {
    if (!publicKey || !signTransaction) {
      toast.error('Please connect your wallet')
      return
    }

    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount')
      return
    }

    try {
      const tokenMint = new PublicKey(selectedPair.address)
      const destinationAddress = new PublicKey('YOUR_DESTINATION_ADDRESS') // Replace with actual destination

      const signature = await tradingService.transfer({
        fromPubkey: publicKey,
        toPubkey: destinationAddress,
        mint: tokenMint,
        amount: Number(amount),
        signTransaction,
      })

      toast.success(`Transaction successful! Signature: ${signature.slice(0, 8)}...`)
    } catch (error) {
      console.error('Trade failed:', error)
      toast.error('Trade failed. Please try again.')
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Stats Cards */}
      <Card className="col-span-1 bg-[#1E1B2E] border-purple-500/20">
        <CardHeader>
          <CardTitle>Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${"12,345.67"}</div>
          <div className="text-green-500">+5.23%</div>
        </CardContent>
      </Card>

      <Card className="col-span-1 bg-[#1E1B2E] border-purple-500/20">
        <CardHeader>
          <CardTitle>24h Trading Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${"45,678.90"}</div>
          <div className="text-purple-500">+12.34%</div>
        </CardContent>
      </Card>

      <Card className="col-span-1 bg-[#1E1B2E] border-purple-500/20">
        <CardHeader>
          <CardTitle>AI Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <div className="text-blue-500">+8</div>
        </CardContent>
      </Card>

      <Card className="col-span-1 bg-[#1E1B2E] border-purple-500/20">
        <CardHeader>
          <CardTitle>Risk Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Low</div>
          <div className="text-green-500">Stable</div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="col-span-1 lg:col-span-2">
        <Card className="bg-[#1E1B2E] border-purple-500/20 mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Price Chart</CardTitle>
              <div className="flex items-center gap-2">
                <span>{selectedPair.name}</span>
                <span className={selectedPair.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {selectedPair.change24h >= 0 ? '+' : ''}{selectedPair.change24h}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">Chart Coming Soon</div>
          </CardContent>
        </Card>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {/* Trading Interface */}
          <Card className="bg-[#1E1B2E] border-purple-500/20">
            <CardHeader>
              <CardTitle>Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" onClick={() => setTradeType('buy')}>Buy</TabsTrigger>
                  <TabsTrigger value="sell" onClick={() => setTradeType('sell')}>Sell</TabsTrigger>
                </TabsList>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Token Pair</label>
                    <Select onValueChange={(value) => setSelectedPair(MOCK_TOKEN_PAIRS.find(p => p.name === value)!)}>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedPair.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_TOKEN_PAIRS.map((pair) => (
                          <SelectItem key={pair.name} value={pair.name}>
                            {pair.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Order Type</label>
                    <Select defaultValue={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full"
                    onClick={handleTrade}
                    disabled={!publicKey || !amount}
                  >
                    <ArrowDownUp className="mr-2 h-4 w-4" />
                    {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.name.split('/')[0]}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card className="bg-[#1E1B2E] border-purple-500/20">
            <CardHeader>
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium">
                  <div>Price</div>
                  <div>Amount</div>
                  <div>Total</div>
                </div>
                <div className="space-y-1">
                  {/* Asks (Sell orders) */}
                  {orderBook.asks.map((order, i) => (
                    <div key={`ask-${i}`} className="grid grid-cols-3 text-sm">
                      <div className="text-red-500">
                        ${order.price.toFixed(4)}
                      </div>
                      <div>{order.amount.toFixed(4)}</div>
                      <div>{order.total.toFixed(2)}</div>
                    </div>
                  ))}
                  
                  {/* Current price */}
                  <div className="py-2 text-center text-sm font-medium">
                    ${selectedPair.price.toFixed(4)}
                  </div>

                  {/* Bids (Buy orders) */}
                  {orderBook.bids.map((order, i) => (
                    <div key={`bid-${i}`} className="grid grid-cols-3 text-sm">
                      <div className="text-green-500">
                        ${order.price.toFixed(4)}
                      </div>
                      <div>{order.amount.toFixed(4)}</div>
                      <div>{order.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 