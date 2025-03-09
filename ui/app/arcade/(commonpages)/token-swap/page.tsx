"use client";
import Background from "@/components/background";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAccount } from "wagmi";

const TokenSwapInfo = () => (
  <>
    <div className="flex flex-col">
      <p className="subtitle text-white/50">Balance:&nbsp;{0}</p>
      <div className="flex items-center justify-between rounded-[3.4px] border border-white/8 p-4">
        <div className="flex size-[64px] items-center justify-center rounded-[4px] bg-white/100">
          <img
            className="size-[27px]"
            src="/icons/upload.png"
            alt="token image"
          />
        </div>
        <div className="flex flex-col justify-end text-right text-white/100">
          <p>{0}</p>
          <p>${0}</p>
        </div>
      </div>
    </div>
  </>
);
export default function Page() {
  const [userAddress, setUserAddress] = useState("");
  const { address } = useAccount();
  return (
    <>
      <Background />
      <div
        className="flex w-full items-center justify-center"
        style={{ height: "calc(100vh - 112px)" }}
      >
        <div className="flex h-full w-full max-w-[1440px] flex-col items-center gap-8 p-8">
          <div className="items flex justify-center rounded-[8px] border border-white/50 p-4">
            <div
              id="container"
              className="flex w-[608px] max-w-[509px] flex-col gap-4 pb-4"
            >
              <p className="description text-white/100">Swap token</p>

              <TokenSwapInfo />

              <div className=" swap-button flex w-full items-center justify-center">
                <div className="flex size-[64px] items-center justify-center rounded-[8px] border-[0.64px] border-white/12 bg-white/4">
                  <img
                    className="size-[64px]"
                    src="/icons/swap.png"
                    alt="token image"
                  />
                </div>
              </div>

              <TokenSwapInfo />

              <div className="flex w-full items-center justify-center rounded-[8px]">
                <p className="subtitle flex w-full justify-between whitespace-nowrap ps-0.5 text-white/50">
                  Slippage Tolerance &nbsp;{" "}
                  <span className="text-white/100">{0.5 + "%"}</span>
                </p>{" "}
              </div>
              <Button className="description h-[50px] rounded-[8px] bg-white/100 uppercase text-black/100">
                Swap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
