import React from 'react'

function SideTable({pool}: {pool: number}) {

  const formatNumber = (number: number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex w-full justify-between top-0 right-0">
    <p className="subheading uppercase text-white/100">Round 1</p>
    <div className="flex flex-col items-end gap-2 text-white/100">
      <p className="subtitle">prize pool</p>
      <p className="description">{formatNumber(pool)}</p>
    </div>
  </div>
  )
}

export default SideTable