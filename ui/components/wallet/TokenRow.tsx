import React from "react";
import { WithdrawButton } from "./Withdraw";
import { DepositButton } from "./Deposit";

const TokenRow = ({ token }: { token: string }) => {
  return (
    <div className="grid w-full grid-cols-4 text-white/50">
      <div className="flex items-center justify-start gap-2">
        <div className="flex size-[32px] items-center justify-center rounded-[1px] bg-white/100">
          <img className="size-[13px]" src="/icons/upload.png" alt="" />
        </div>
        <p>{token}</p>
      </div>
      <p>{"0.00 " + token}</p>
      <p>{"$0.00"}</p>
      <div className="flex w-full gap-2">
        <WithdrawButton />
        <DepositButton />
      </div>
    </div>
  );
};

export default TokenRow;
