'use client'

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

type PortfolioDataPoint = {
  date: string
  value: number
}

export function PortfolioChart({ data }: { data: PortfolioDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#9945FF" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 