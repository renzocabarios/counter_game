"use client";

import CoinHeads from "@/components/coinflip/coin-heads";
import CoinTails from "@/components/coinflip/coin-tails";
import { Button } from "@/components/ui/button";

function GameConsole({
  gameType,
  value,
  betValue,
  onIncrement,
  onAdd,
  onMinus,
  onBet,
  onFlip,
}: {
  gameType?: string;
  value?: number;
  betValue?: number | null;
  onIncrement?: () => void;
  onAdd?: () => void;
  onMinus?: () => void;
  onBet?: () => void;
  onFlip?: (side: string) => void;
}) {
  if (gameType === "counter") {
    return (
      <div className="flex h-fit basis-[30%] flex-col items-center justify-center gap-4 rounded-md border border-white/32 p-4 text-white/100">
        <div className="flex w-full flex-col">
          <div className="subtitle flex flex-col items-center justify-center gap-4 rounded-sm border border-white/100 p-4">
            <p>Your Count</p>
            <p>{value}</p>
          </div>
          <p className="subtext ps-1 pt-1 text-white/50">
            Value per guess: <span>{100}</span>
          </p>
        </div>
        <div>
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <div
                onClick={onMinus}
                className="flex size-[56px] items-center justify-center rounded-full border border-white/100"
              >
                <p>-</p>
              </div>
              <div className="flex h-[56px] min-w-[115px] items-center justify-center rounded-[16px] border border-white/100">
                <p className="title text-white/100">{value}</p>
              </div>
              <div
                onClick={onAdd}
                className="flex size-[56px] items-center justify-center rounded-full border border-white/100"
              >
                <p>+</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={onIncrement}
          className="w-full bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
        >
          Count
        </Button>
      </div>
    );
  } else if (gameType === "coinflip") {
    return (
      <div className="flex h-fit basis-[30%] flex-col items-center justify-center gap-4 rounded-md border border-white/32 p-4 text-white/100">
        <div className="flex w-full flex-col">
          <p className="subtext ps-1 pt-1 text-white/50">
            Balance: <span>{100}</span>
          </p>
          <p className="subtext ps-1 pt-1 text-white/50">
            Amount: <span>{100}</span>
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex h-[50px] w-full min-w-[115px] items-center justify-start ps-4 rounded-[16px] border border-white/100">
            <p className="title text-white/100">{value}</p>
          </div>

          {/* //button to bet value*/}

          {!betValue ? (
            <div className="flex w-full items-center justify-between gap-4">
              <Button
                onClick={onMinus}
                className="h-[50px] w-[49%] rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
              >
                <p>Max</p>
              </Button>

              <Button
                onClick={onAdd}
                className="h-[50px] w-[49%] rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
              >
                <p>Max</p>
              </Button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between">
              <Button
                onClick={() => onFlip && onFlip("heads")}
                className="flex size-[120px] flex-col rounded-[16px] border border-white/100 bg-black/72 uppercase text-white/100 hover:bg-white/100 hover:text-black/100"
              >
                <CoinHeads s={64} />
                <p>Heads</p>
              </Button>

              <Button
                onClick={() => onFlip && onFlip("tails")}
                className="flex size-[120px] flex-col rounded-[16px] border border-white/100 bg-black/72 uppercase text-white/100 hover:bg-white/100 hover:text-black/100"
              >
                <div className="">
                  <CoinTails s={64} />
                </div>
                <p>Tails</p>
              </Button>
            </div>
          )}
        </div>
        {!betValue ? (
          <Button
            onClick={onBet}
            className="h-[50px] w-full rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
          >
            Bet
          </Button>
        ) : (
          <Button
            onClick={onBet}
            className="h-[50px] w-full rounded-[16px] bg-white/50 border border-white/50 uppercase text-black/50"
          >
            Choosing Side
          </Button>
        )}
      </div>
    );
  }
}

export default GameConsole;
