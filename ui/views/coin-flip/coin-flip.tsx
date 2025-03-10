"use client";
import CoinHeads from "@/components/coinflip/coin-heads";
import CoinTails from "@/components/coinflip/coin-tails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CoinFlipStatus, CoinFlipType } from "@/store/coin-flip.store";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useAccount } from "wagmi";

export default function CoinFlip() {
  const { address } = useAccount();
  const onHalf = () => {};
  const onMax = () => {};

  const {
    coinFlipSessionId,
    setCoinFlipSessionId,
    setCoinFlipGuess,
    coinFlipGuess,
    coinFlipHouseGuess,
    setCoinFlipHouseGuess,
    setCoinFlipFlips,
    coinFlipFlips,
    setCoinFlipCurrentBet,
    coinFlipCurrentBet,
  } = useStore();

  const { mutate: start } = useMutation({
    mutationFn: async () => {
      const {
        data: { data },
      } = await axios.post("http://localhost:9000/coin-flip/start", {
        address,
        bet: coinFlipCurrentBet,
      });

      if (data.length == 0) {
        throw Error("Server Failed");
      }

      setCoinFlipSessionId(data?.[0]?.id);
    },
  });

  const { mutate: flip } = useMutation({
    mutationFn: async () => {
      const {
        data: { data },
      } = await axios.post("http://localhost:9000/coin-flip/flip", {
        address,
        userGuess: coinFlipGuess,
        coinFlipSessionId,
      });

      if (data.length == 0) {
        throw Error("Server Failed");
      }
      setCoinFlipHouseGuess(data?.[0].currentFlip.houseAnswer);
      setCoinFlipFlips(data?.[0].coinFlipSession.flips);

      if (data?.[0].currentFlip.status == CoinFlipStatus.LOSE) {
        setCoinFlipSessionId(null);
        setCoinFlipFlips([]);
      }

      //   console.log(
      //     data?.[0].coinFlipSession.flips.filter(
      //       (flip: any) => flip.status == CoinFlipStatus.WON,
      //     ),
      //   );
      console.log(data?.[0].currentFlip);
    },
  });

  const onBet = () => {
    start();
  };

  const onFlip = () => {
    flip();
  };

  return (
    <>
      <div className="flex h-[464px] basis-[70%] flex-col gap-16 rounded-md border border-white/32 bg-black/50 p-4 align-middle">
        <div className="heading flex flex-col items-center justify-center gap-8 text-white/100">
          <div onClick={onFlip} className="cursor-pointer">
            {coinFlipHouseGuess === CoinFlipType.HEADS && <CoinHeads />}
            {coinFlipHouseGuess === CoinFlipType.TAILS && <CoinTails />}
          </div>
          <div className="flex flex-col items-center justify-center rounded-[8px] border border-white/32 p-4">
            <p className="w-full text-center text-[10px] uppercase text-white/50">
              Multiplier
            </p>
            <div className="title flex h-[50px] w-[279px] items-center justify-center rounded-[16px] bg-white/100 uppercase text-black/100">
              X {coinFlipFlips.length + 1 * 1.99}
            </div>
          </div>

          {coinFlipFlips.length > 0 && (
            <div className="flex w-full items-center gap-4 rounded-[16px] border border-white/100 p-4">
              {coinFlipFlips.map((flip: any) => {
                if (flip.userGuess == CoinFlipType.HEADS) {
                  return <CoinHeads key={flip.id} s={64} />;
                }
                return <CoinTails key={flip.id} s={64} />;
              })}
            </div>
          )}
        </div>
      </div>

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
          <Input
            type="number"
            onChange={(e) => {
              setCoinFlipCurrentBet(Number(e.target.value));
            }}
            className="flex h-[60px] w-full items-center justify-start rounded-[16px] border border-white/100 ps-4"
          ></Input>

          {/* //button to bet value*/}
          {coinFlipSessionId ? (
            <div className="flex w-full items-center justify-between">
              <Button
                onClick={() => {
                  setCoinFlipGuess(CoinFlipType.HEADS);
                }}
                //   onClick={() => onFlip && onFlip("heads")}
                className={cn(
                  "flex size-[120px] flex-col rounded-[16px] border border-white/100 bg-black/72 uppercase text-white/100 hover:bg-white/100 hover:text-black/100",
                  coinFlipGuess == CoinFlipType.HEADS &&
                    "bg-white/100 text-black/100",
                )}
              >
                <CoinHeads s={64} />
                <p>Heads</p>
              </Button>

              <Button
                onClick={() => {
                  setCoinFlipGuess(CoinFlipType.TAILS);
                }}
                //   onClick={() => onFlip && onFlip("tails")}
                className={cn(
                  "flex size-[120px] flex-col rounded-[16px] border border-white/100 bg-black/72 uppercase text-white/100 hover:bg-white/100 hover:text-black/100",
                  coinFlipGuess == CoinFlipType.TAILS &&
                    "bg-white/100 text-black/100",
                )}
              >
                <div className="">
                  <CoinTails s={64} />
                </div>
                <p>Tails</p>
              </Button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between gap-4">
              <Button
                onClick={onHalf}
                className="h-[50px] w-[49%] rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
              >
                <p>Half</p>
              </Button>

              <Button
                onClick={onMax}
                className="h-[50px] w-[49%] rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
              >
                <p>Max</p>
              </Button>
            </div>
          )}

          {coinFlipSessionId && coinFlipFlips.length == 0 && (
            <Button
              //   onClick={onBet}
              className="h-[50px] w-full rounded-[16px] border border-white/50 bg-white/50 uppercase text-black/50"
            >
              Choosing Side
            </Button>
          )}

          {coinFlipSessionId && coinFlipFlips.length != 0 && (
            <Button
              //   onClick={onBet}
              className="h-[50px] w-full rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
            >
              CASHOUT{" "}
              {((coinFlipFlips.length + 1 * 1.99) * coinFlipCurrentBet).toFixed(
                2,
              )}
            </Button>
          )}

          {!coinFlipSessionId && (
            <Button
              onClick={onBet}
              className="h-[50px] w-full rounded-[16px] bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100"
            >
              Bet
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
