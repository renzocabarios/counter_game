"use client";
import { Button } from "@/components/ui/button";
import useIncrementCounter from "@/hooks/useInrementCounter";
import { useState } from "react";
import SideTable from "@/components/counter/sideTable";

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
      <div
        className="fixed left-0 top-0 h-[100vh] w-[100vw] bg-fixed"
        style={{
          backgroundImage: "url('/images/coreplay-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "65%",
          opacity: 0.05,
          zIndex: -1,
          backgroundBlendMode: "lighten",
        }}
      />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1440px] flex-col gap-8 p-8">
          <div className="flex w-full gap-4">
            <div className="flex h-[464px] basis-[70%] flex-col gap-16 rounded-md border border-white/32 bg-black/50 p-4">
              <SideTable pool={Pool} />

              <div className="heading flex items-center justify-center gap-16 self-center text-white/100">
                <div className="flex flex-col gap-5">
                  <p className="subtext">Goal Count</p>
                  <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-white/8 bg-black/100">
                    <p className="">{goalCount}</p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-5">
                    <p className="subtext">Current Count</p>
                    <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-white/8 bg-black/100">
                      <p className="">{value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
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
              <Button className="w-full bg-white/100 uppercase text-black/100 hover:bg-black/72 hover:text-white/100">
                Count
              </Button>
            </div>
          </div>

          {/* <div className="flex w-full flex-col gap-4 p-4">
            <p>Leaderboards</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
