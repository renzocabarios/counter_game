"use client";
import React, { JSX, useState } from "react";
import Background from "@/components/background";
import GameConsole from "@/components/game-console/arcade/game-console";
import { Button } from "@/components/ui/button";
import { mockStats } from "@/lib/constants";
import StatsTable from "@/components/stats-table";
import CoinHeads from "@/components/coinflip/coin-heads";
import CoinTails from "@/components/coinflip/coin-tails";

export default function Home() {
  const [value, setvalue] = useState(0);
  const [betValue, setBetValue] = useState<number | null>(null)
  const [coin, setCoin] = useState<boolean>(false);
  const [coinFace, setCoinFace] = useState<JSX.Element>(<CoinHeads />);

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

  const onBet = () => {
    if (!betValue) {
      setBetValue(value);
    }else{
      setBetValue(null);
    }
  }


  const flip = (side: string) => {
    if(side === 'heads'){
      setCoinFace(<CoinHeads />);
    }else{
      setCoinFace(<CoinTails />);
      
    }

    if(side === 'heads'){
    
      setCoin(true);
    }
else{
  setCoin(false);

} 
    // setCoinFace(newCoin ? <CoinHeads /> : <CoinTails />);
  };
  return (
    <>
      <Background />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col gap-8 p-8">
          <div className="flex w-full gap-4">
            <div className="flex h-[464px] basis-[70%] flex-col gap-16 rounded-md border border-white/32 bg-black/50 p-4 align-middle">
              <div className="heading m-auto flex flex-col items-center justify-center gap-16 self-center text-white/100">
                <div className="cursor-pointer">
                  {coinFace}
                </div>
                <div className="flex h-[108px] w-[311px] flex-col items-center justify-center rounded-[8px] border border-white/32 p-4">
                  <p className="w-full text-center text-[10px] uppercase text-white/50">
                    Multiplier
                  </p>
                  <div className="title flex h-[50px] w-[279px] items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                    X 0.199
                  </div>
                </div>
              </div>
            </div>
            <GameConsole
              gameType="coinflip"
              value={value}
              betValue={betValue}
              onAdd={onAdd}
              onMinus={onMinus}
              onBet={onBet}
              onFlip={flip}
            />
          </div>
          <div className="flex w-full basis-[100%] flex-col gap-4 rounded-md border border-white/32 bg-black/50 p-4 text-white/100">
            <div className="flex justify-between">
              <p className="subheading">Statistics</p>
              <div className="subtitle flex h-[50px] w-fit items-center justify-center gap-2 rounded-md border border-white/32 px-2 text-white/100">
                <Button className="bg-black/50 px-4 py-3 text-white/100 hover:bg-grey-400">
                  All Bet
                </Button>
                <Button className="bg-black/50 px-4 py-3 text-white/100 hover:bg-grey-400">
                  My Bet
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
