import React from "react";
import { WithdrawButton } from "./Withdraw";
import { DepositButton } from "./Deposit";

const TokenRow = ({ token }: { token: string }) => {
  return (
    <div className="w-full flex-row items-center justify-between text-[8px] text-white/50 sm:flex md:grid md:grid-cols-5 md:text-[14px] lg:grid-cols-4">
      <div className="flex items-center justify-start gap-2 text-[8px] md:text-[14px]">
        <div className="flex size-[32px] items-center justify-center rounded-[1px] bg-white/100">
          <img className="size-[13px]" src="/icons/upload.png" alt="" />
        </div>
        <p>{token}</p>
      </div>
      <p className="whitespace-nowrap">{"0.00 " + token}</p>
      <p>{"$0.00"}</p>
      <div className="flex w-[200px] md:w-full gap-2 sm:col-span-2 md:col-span-1">
        <WithdrawButton />
        <DepositButton />
      </div>
    </div>
  );
};

export default TokenRow;
