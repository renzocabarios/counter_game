"use client";
import React, { JSX, useState } from "react";
import Background from "@/components/background";
import GameConsole from "@/components/game-console/arcade/game-console";
import { Button } from "@/components/ui/button";
import { mockStats } from "@/lib/constants";
import StatsTable from "@/components/stats-table";
import CoinHeads from "@/components/coinflip/coin-heads";
import CoinTails from "@/components/coinflip/coin-tails";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";
import CoinFlip from "@/views/coin-flip/coin-flip";

export default function Home() {
  const [value, setvalue] = useState(0);
  const [betValue, setBetValue] = useState<number | null>(null);
  const [coin, setCoin] = useState<boolean>(false);
  const [coinFace, setCoinFace] = useState<JSX.Element>(<CoinHeads />);

  const { address } = useAccount();

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
    } else {
      setBetValue(null);
    }
  };

  const flip = (side: string) => {
    if (side === "heads") {
      setCoinFace(<CoinHeads />);
    } else {
      setCoinFace(<CoinTails />);
    }

    if (side === "heads") {
      setCoin(true);
    } else {
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
            <CoinFlip />
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
