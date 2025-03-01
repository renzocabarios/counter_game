"use client";
import useIncrementCounter from "@/hooks/useInrementCounter";
import { useState } from "react";

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
            <div className="flex basis-[70%] flex-col items-center justify-between gap-16 bg-black/100 p-4">
              <div className="flex w-full justify-between">
                <p>Round 1</p>

                <div className="flex flex-col items-end gap-2">
                  <p>current prize pool</p>

                  <p>200,000,00</p>
                </div>
              </div>

              <div
                onClick={onIncrement}
                className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white/100"
              >
                <p className="text-6xl text-black">{value}+</p>
              </div>

              <div className="flex w-full flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4">
                  <div
                    onClick={onMinus}
                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/100"
                  >
                    <p>-</p>
                  </div>
                  <p>Increment</p>

                  <div
                    onClick={onAdd}
                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/100"
                  >
                    <p>+</p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="flex basis-[30%] flex-col items-center gap-4">
              <div className="flex w-full items-center justify-center bg-black/100 p-4">
                <p>Recent Transactions</p>
              </div>

              <div className="flex w-full items-center justify-between bg-black/100 p-4">
                <p>0x132..a9s</p>
                <p>1+ GUESS</p>
              </div>
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
