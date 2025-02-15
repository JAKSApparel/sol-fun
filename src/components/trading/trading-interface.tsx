'use client'

import React, { useState } from 'react'
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

export function TradingInterface() {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const [selectedPair, setSelectedPair] = useState<TokenPair>(MOCK_TOKEN_PAIRS[0])
  const [amount, setAmount] = useState('')
  const [orderType, setOrderType] = useState('market')
  const [tradeType, setTradeType] = useState('buy')

  const handleTrade = async () => {
    if (!publicKey || !signTransaction) {
      toast.error('Please connect your wallet')
      return
    }

    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount')
      return
    }

    // Here you would implement the actual trading logic
    // For now, we'll just show a success message
    toast.success(`${tradeType.toUpperCase()} order placed successfully!`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Trading Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <CardDescription>
            {selectedPair.name} • ${selectedPair.price.toFixed(4)}
            <span className={`ml-2 ${selectedPair.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {selectedPair.change24h >= 0 ? <TrendingUp className="inline w-4 h-4" /> : <TrendingDown className="inline w-4 h-4" />}
              {selectedPair.change24h}%
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/5 rounded-lg">
            {/* Integrate your preferred charting library here */}
            <p className="text-muted-foreground">Chart Coming Soon</p>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card>
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
              {/* Mock order book data */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 text-sm">
                  <div className="text-red-500">${(selectedPair.price + i * 0.1).toFixed(4)}</div>
                  <div>{(Math.random() * 10).toFixed(4)}</div>
                  <div>{(Math.random() * 1000).toFixed(2)}</div>
                </div>
              ))}
              <div className="py-2 text-center text-sm font-medium">
                ${selectedPair.price.toFixed(4)}
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 text-sm">
                  <div className="text-green-500">${(selectedPair.price - i * 0.1).toFixed(4)}</div>
                  <div>{(Math.random() * 10).toFixed(4)}</div>
                  <div>{(Math.random() * 1000).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 