import { dashboardStats } from '@/data/dashboard-data'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

const DataCards = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 '>
      {
        dashboardStats.map((stat, index) => (
          <div key={index} className='bg-white dark:bg-zinc-900 shadow-md rounded-md p-4'>
            <p className='text-gray-500'>{stat.title}</p>
            <h2 className='text-lg font-bold'>{stat.value}</h2>
            <div className='flex items-center gap-2'>
            <div className='text-lg font-light'>
              {stat.changeType === 'positive' ? <TrendingUp className='text-green-500  ' strokeWidth={1}  size={20}/> : <TrendingDown className='text-red-500' strokeWidth={1} size={20}/>}
            </div>
            <p className={`text-sm font-bold ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </p>
            </div>
          </div>
        ))
      }
      
      </div>
  )
}

export default DataCards