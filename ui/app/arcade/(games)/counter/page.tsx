"use client";
import useIncrementCounter from "@/hooks/useInrementCounter";
import { useState } from "react";
import SideTable from "@/components/game-console/arcade/round-prizepool";
import Background from "@/components/background";
import DisplayValue from "@/components/game-console/arcade/display-value";
import GameConsole from "@/components/game-console/arcade/game-console";
import { Button } from "@/components/ui/button";
import { mockStats } from "@/lib/constants";
import StatsTable from "@/components/stats-table";

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
              gameType="counter"
              value={value}
              onIncrement={onIncrement}
              onAdd={onAdd}
              onMinus={onMinus}
            />
          </div>
          <div className="flex w-full basis-[100%] flex-col gap-4 rounded-md border border-white/32 bg-black/50 p-4 text-white/100">
            <div className="flex justify-between">
              <p className="subheading">Statistics</p>
              <div className="subtitle flex h-[50px] w-fit items-center justify-center gap-2 rounded-md border border-white/32 px-2 text-white/100">
                <Button className="bg-black/50 px-4 py-3 text-white/100 hover:bg-grey-400">
                  All Count
                </Button>
                <Button className="bg-black/50 px-4 py-3 text-white/100 hover:bg-grey-400">
                  My Count
                </Button>
                <Button className="bg-black/50 px-4 py-3 text-white/100 hover:bg-grey-400">
                  Leaderboards
                </Button>
              </div>
            </div>
            <StatsTable game data={mockStats} />
          </div>
        </div>
      </div>
    </>
  );
}
