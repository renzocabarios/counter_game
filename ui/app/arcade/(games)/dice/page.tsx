"use client";
import { useState } from "react";
import Background from "@/components/background";
import GameConsole from "@/components/game-console/arcade/game-console";
import { Button } from "@/components/ui/button";
import { mockStats } from "@/lib/constants";
import StatsTable from "@/components/stats-table";
import LightDice from "@/components/dice/light-dice";
import RollSlider from "@/components/dice/dice-slider";

export default function Home() {
  const [value, setvalue] = useState(1);
  const [luckyNumber, setLuckyNumber] = useState<number>(69);

  const [sliderValue, setSliderValue] = useState(15);
  const [selected, setSelected] = useState<"over" | "under">("over");

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
    return 0;
  };

  return (
    <>
      <Background />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col gap-8 p-8">
          <div className="flex w-full gap-4">
            <div className="flex h-[474px] basis-[70%] flex-col gap-16 rounded-md border border-white/32 bg-black/50 p-4 align-middle">
              <div className="heading m-auto flex flex-col items-center justify-center gap-4 self-center text-white/100">
                <div className="flex w-full items-start justify-between">
                  <div className="flex h-[108px] w-[180px] flex-col items-center justify-center rounded-[8px] border border-white/32 p-4">
                    <p className="w-full text-center text-[10px] uppercase text-white/50">
                      Prediction
                    </p>
                    <div className="title flex h-[50px] w-full items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                      15
                    </div>
                  </div>
                  <div className="subtext flex items-center justify-center p-3">
                    <LightDice />
                  </div>
                  <div className="flex h-[108px] w-[180px] flex-col items-center justify-center rounded-[8px] border border-white/32 p-4">
                    <p className="w-full text-center text-[10px] uppercase text-white/50">
                      Lucky Number
                    </p>
                    <div className="title flex h-[50px] w-full items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                      {luckyNumber.toString().padStart(2, "0")}
                    </div>
                  </div>{" "}
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex h-[108px] w-[311px] flex-col items-center justify-center rounded-[8px] border border-white/32 p-4">
                    <p className="w-full text-center text-[10px] uppercase text-white/50">
                      Multiplier
                    </p>
                    <div className="title flex h-[50px] w-[279px] items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                      X 0.199
                    </div>
                  </div>
                  <div className="flex h-[108px] w-[311px] flex-col items-center justify-center rounded-[8px] border border-white/32 p-4">
                    <p className="w-full text-center text-[10px] uppercase text-white/50">
                      Chance
                    </p>
                    <div className="title flex h-[50px] w-[279px] items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
                      50%
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-around rounded-[8px] border border-white/32">
                  <div className="title w-full pt-2">
                    <RollSlider
                      sliderValue={sliderValue}
                      setSliderValue={setSliderValue}
                    />
                  </div>
                  <div className="flex w-full justify-around">
                    {/* button here */}
                    <div className="flex h-[100px] w-full items-center justify-between gap-4 px-4">
                      <div className="title flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] bg-white/100 text-black/100 hover:bg-black/72 hover:text-white/100">
                        Roll Over
                      </div>
                      <div className="title flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[16px] bg-white/100 text-black/100 hover:bg-black/72 hover:text-white/100">
                        Roll Under
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <GameConsole
              gameType="dice"
              value={value}
              onAdd={onAdd}
              onMinus={onMinus}
              onBet={onBet}
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
