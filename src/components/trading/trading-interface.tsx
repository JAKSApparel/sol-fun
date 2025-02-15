'use client'

import React, { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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

type TokenPair = {
  name: string
  address: string
  price: number
  change24h: number
}

const MOCK_TOKEN_PAIRS: TokenPair[] = [
  { name: 'SOL/USDC', address: '0x...', price: 109.45, change24h: 5.23 },
  { name: 'BONK/USDC', address: '0x...', price: 0.00001234, change24h: -2.34 },
  { name: 'JUP/USDC', address: '0x...', price: 0.845, change24h: 12.56 },
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
  const [orderBook, setOrderBook] = useState(() => 
    createInitialOrderBook(selectedPair.price)
  )
  const [tradingService, setTradingService] = useState<TradingService | null>(null)
  const [marketService, setMarketService] = useState<MarketService | null>(null)
  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)

  // Update order book periodically on client side only
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(prev => {
        const newBasePrice = selectedPair.price + (Math.random() - 0.5) * 0.2
        return createInitialOrderBook(newBasePrice)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedPair.price])

  useEffect(() => {
    if (connection) {
      const trading = new TradingService(connection)
      const market = new MarketService(connection)
      trading.initialize().then(() => {
        setTradingService(trading)
        setMarketService(market)
      })
    }
  }, [connection])

  const handleTrade = async () => {
    if (!publicKey || !signTransaction || !tradingService) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      const txids = await tradingService.executeSwap({
        route: selectedRoute,
        userPublicKey: publicKey,
        signTransaction,
      })
      
      toast.success('Trade executed successfully!')
      console.log('Transaction IDs:', txids)
    } catch (error) {
      console.error('Trade failed:', error)
      toast.error('Trade failed. Please try again.')
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Trading Chart */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <CardDescription className="flex items-center gap-2">
            {selectedPair.name} • ${selectedPair.price.toFixed(4)}
            <span className={`inline-flex items-center ${selectedPair.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {selectedPair.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {selectedPair.change24h}%
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] lg:h-[400px] flex items-center justify-center bg-muted/5 rounded-lg">
            <p className="text-muted-foreground">Chart Coming Soon</p>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card className="order-first lg:order-none">
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
      <Card>
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
  )
} 