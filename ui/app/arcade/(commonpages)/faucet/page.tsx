"use client";
import Background from "@/components/background";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAccount } from "wagmi";

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
              <p className="description text-white/100">Request Airdrop</p>
              <p className="subtitle text-white/50">
                Maximum of 1 request every 6hrs
              </p>
              <div className="flex items-center justify-center rounded-[8px] border border-white/50 placeholder-white/50">
                <input
                  type="text"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Wallet Address"
                  className="subtitle h-[50px] basis-[70%] border-white/100 bg-transparent p-2 pl-4 text-white/100 focus:outline-none focus:ring-0"
                />
                <p className="subtitle basis-[30%] whitespace-nowrap p-2 text-white/100">
                  $CPT &nbsp; <span>{100}</span>
                </p>{" "}
              </div>
              <Button className="description rounded-[16px] bg-white/100 uppercase text-black/100">
                Claim Airdrop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
