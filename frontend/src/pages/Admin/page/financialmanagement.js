import React from 'react'
import CardOne from '../components/CardOne';
import ChartOne from '../components/ChartOne';

export default function FinancialManagement() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne/>
        <CardOne/>
        <CardOne/>
        <CardOne/>

      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne/>
      </div>
    </div>
  )
}

