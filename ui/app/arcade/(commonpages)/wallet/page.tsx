"use client";
import Background from "@/components/background";
import TokenRow from "@/components/wallet/TokenRow";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Page() {
  const [userAddress, setUserAddress] = useState("");
  const { address } = useAccount();

  const tokens = [{ token: "CORE" }, { token: "CORE" }, { token: "CORE" }];

  return (
    <>
      <Background />
      <div
        className="flex w-full items-center justify-center"
        style={{ height: "calc(100vh - 112px)" }}
      >
        <div className="flex h-full w-full max-w-[1440px] flex-col items-center gap-8 p-8">
          <div className="items flex w-full flex-col justify-center rounded-[8px] border border-white/50 bg-black/50 p-4">
            <p>Assets</p>
            <div className="flex w-full flex-col gap-4 pb-4 pt-3">
              <div className="w-full flex-row justify-between text-[10px] text-white/50 sm:flex md:grid md:grid-cols-5 md:text-[16px] lg:grid-cols-4">
                <p className="w-full text-left">Coin</p>
                <p className="w-full text-left">Amount</p>
                <p className="w-full text-left">$USD</p>
                <p className="w-full text-left">Tools</p>
              </div>
              {tokens.map((tokenInfo, i) => (
                <TokenRow key={i} token={tokenInfo.token} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
