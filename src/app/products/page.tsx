import DataCards from '@/components/data-cards'
import { DataTable } from '@/components/data-table'
import React from 'react'



export default  function ProductsPage() {
  
  return (
    <div className='w-full h-full flex flex-col gap-y-4 py-4'>
        <DataCards/>
        <DataTable />
    </div>
  )
}

