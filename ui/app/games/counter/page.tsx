"use client";
import useIncrementCounter from "@/hooks/useInrementCounter";
import { useState } from "react";
import SideTable from "@/components/counter/sideTable";
import Background from "@/components/Background";
import DisplayValue from "@/components/counter/game/displayValue";
import GameConsole from "@/components/counter/game/gameConsole";

export default function Home() {
  const { mutate } = useIncrementCounter();

  const [value, setvalue] = useState(1);

  const onIncrement = () => {
    mutate({ value: value });
  };

  const onAdd = () => {
    if (value < 7) {
      setvalue((state) => state + 1);
    }
  };
  const onMinus = () => {
    if (value >= 1) {
      setvalue((state) => state - 1);
    }
  };

  const Pool: number = 200000;
  const goalCount: number = 10;

  return (
    <>
      <Background />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col gap-8 p-8">
          <div className="flex w-full gap-4">
            <div className="flex h-[464px] basis-[70%] flex-col gap-16 rounded-md border border-white/32 bg-black/50 p-4">
              <SideTable pool={Pool} />
              <div className="heading flex items-center justify-center gap-16 self-center text-white/100">
                <DisplayValue title="Goal Count" value={goalCount} />
                <DisplayValue title="Current Count" value={value} />
              </div>
            </div>
            <GameConsole
              value={value}
              onIncrement={onIncrement}
              onAdd={onAdd}
              onMinus={onMinus}
            />
          </div>
          {/* <div className="flex w-full flex-col gap-4 p-4">
            <p>Leaderboards</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
