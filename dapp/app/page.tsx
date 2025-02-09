"use client";
import ConnectWallet from "@/components/connect-wallet";
import { Button } from "@/components/ui/button";
import useIncrementCounter from "@/hooks/useIncrementCounter";
import useReadCurrentRound from "@/hooks/useReadCurrentRound";
import useReadPoints from "@/hooks/useReadPoints";
import { cn } from "@/lib/utils";

export default function Home() {
  const { mutate: incrementCounter } = useIncrementCounter();
  const { data: currentRound } = useReadCurrentRound();
  const { data: userpoints } = useReadPoints();

  const onIncrement = () => {
    incrementCounter();
  };

  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <div className="w-full flex items-center justify-center sticky border  p-4">
        <div className="w-full max-w-[1440px] flex items-center justify-between">
          <p>COUNTER GAME</p>
          <ConnectWallet />
        </div>
      </div>
      <div className="w-full flex items-center justify-center sticky">
        <div className="w-full max-w-[1440px] min-h-[60vh] flex flex-col items-center justify-center  gap-8">
          <div className="p-4 flex flex-col gap-8 items-center">
            <p className="font-light text-gray-700">
              First User to count to 10 wins the round
            </p>

            <p className="text-4xl font-semibold">
              Round: {Number(currentRound ?? 0)}
            </p>

            <div className="flex items-center gap-2">
              <p>$</p>

              <p className="text-lg">{Number(userpoints ?? 0) * 1000}</p>
            </div>

            <Button
              className={cn("min-w-[20rem] text-5xl min-h-[7rem]")}
              onClick={onIncrement}
            >
              +1
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center sticky border-t  p-4 ">
        <div className="w-full max-w-[1440px] flex items-center justify-between">
          <p>counter game</p>
          <p>All rights reserved @ 2025</p>
        </div>
      </div>
    </div>
  );
}
