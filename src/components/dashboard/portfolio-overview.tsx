'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export function PortfolioOverview() {
  const data = {
    labels: ['SOL', 'USDC', 'Other Tokens', 'NFTs'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          '#9945FF',
          '#14F195',
          '#6D28D9',
          '#4C1D95',
        ],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#fff',
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="h-[300px]">
      <Doughnut data={data} options={options} />
    </div>
  )
} 