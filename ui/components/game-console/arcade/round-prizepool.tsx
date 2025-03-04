import React from "react";

function SideTable({ pool }: { pool: number }) {
  const formatNumber = (number: number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="right-0 top-0 flex w-full justify-between">
      <p className="subheading uppercase text-white/100">Round 1</p>
      <div className="flex flex-col items-end gap-2 text-white/100">
        <p className="subtitle">prize pool</p>
        <p className="description">{formatNumber(pool)}</p>
      </div>
    </div>
  );
}

export default SideTable;
