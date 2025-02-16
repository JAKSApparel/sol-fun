'use client'

import { useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

declare global {
  interface Window {
    TradingView: any
  }
}

export function TokenChartDashboard({ 
  tokenAddress,
  pairAddress,
  symbol = 'SOLUSD',
}: { 
  tokenAddress?: string
  pairAddress?: string
  symbol?: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (containerRef.current) {
        new window.TradingView.widget({
          container_id: 'tradingview_chart',
          symbol: symbol,
          interval: '15',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#1E1B2E',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          height: '500px',
          width: '100%',
          studies: [
            'RSI@tv-basicstudies',
            'MAExp@tv-basicstudies',
            'VWAP@tv-basicstudies'
          ],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [symbol])

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search by token address..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <Button
          variant="outline"
          className="border-purple-500/20"
        >
          Search
        </Button>
      </div>

      <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-background/50 rounded-lg">
            <div className="text-sm text-gray-400">Price</div>
            <div className="text-xl font-bold">$0.00</div>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <div className="text-sm text-gray-400">24h Change</div>
            <div className="text-xl font-bold text-green-500">+0.00%</div>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <div className="text-sm text-gray-400">24h Volume</div>
            <div className="text-xl font-bold">$0.00</div>
          </div>
          <div className="p-4 bg-background/50 rounded-lg">
            <div className="text-sm text-gray-400">Market Cap</div>
            <div className="text-xl font-bold">$0.00</div>
          </div>
        </div>

        <div id="tradingview_chart" ref={containerRef} />
      </Card>
    </div>
  )
} 