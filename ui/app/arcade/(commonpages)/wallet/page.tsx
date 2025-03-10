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
              <div className="grid w-full grid-cols-4 text-white/50">
                <p>Coin</p>
                <p>Amount</p>
                <p>$USD</p>
                <p>Tools</p>
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
