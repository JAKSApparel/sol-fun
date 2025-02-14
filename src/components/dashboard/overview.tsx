'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  {
    name: '00:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
  {
    name: '04:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
  {
    name: '08:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
  {
    name: '12:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
  {
    name: '16:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
  {
    name: '20:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
  {
    name: '24:00',
    price: Math.floor(Math.random() * 100) + 50,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            background: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px'
          }}
          labelStyle={{ color: '#888888' }}
        />
        <Bar
          dataKey="price"
          fill="#14F195"
          radius={[4, 4, 0, 0]}
          className="fill-[#14F195] opacity-70 hover:opacity-100 transition-opacity"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}