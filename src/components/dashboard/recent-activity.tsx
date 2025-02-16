'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

type Activity = {
  id: string
  type: 'send' | 'receive' | 'swap' | 'mint'
  token: string
  amount: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

export function RecentActivity() {
  const { publicKey } = useWallet()

  const activities: Activity[] = [
    {
      id: '1',
      type: 'send',
      token: 'SOL',
      amount: '1.5',
      timestamp: '2024-02-20 14:30',
      status: 'completed',
    },
    {
      id: '2',
      type: 'receive',
      token: 'USDC',
      amount: '100',
      timestamp: '2024-02-20 13:15',
      status: 'completed',
    },
    // Add more activities as needed
  ]

  if (!publicKey) {
    return (
      <div className="text-center text-gray-400 py-4">
        Connect your wallet to view recent activity
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        No recent activity
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
        >
          <div className="flex items-center gap-4">
            {activity.type === 'send' ? (
              <ArrowUpRight className="w-6 h-6 text-red-500" />
            ) : (
              <ArrowDownRight className="w-6 h-6 text-green-500" />
            )}
            <div>
              <div className="font-medium capitalize">{activity.type}</div>
              <div className="text-sm text-gray-400">{activity.timestamp}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">
              {activity.type === 'send' ? '-' : '+'}{activity.amount} {activity.token}
            </div>
            <div className="text-sm text-gray-400 capitalize">{activity.status}</div>
          </div>
        </div>
      ))}
    </div>
  )
} 