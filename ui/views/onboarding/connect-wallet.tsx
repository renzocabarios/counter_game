"use client";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();

  const [isAddressValidated, setisAddressValidated] = useState(false);

  const {
    setOnboardingPageNumber,
    onboardingPageNumber,
    setOnboardingPayload,
    onboardingPayload,
  } = useStore();

  const { data: user, isSuccess: userIsSuccess } = useQuery({
    queryFn: async () => {
      const {
        data: { data },
      } = await axios.get(`http://localhost:9000/users/address/${address}`);

      console.log(data);

      return data;
    },
    queryKey: ["address", address],
    enabled: !!address,
  });

  useEffect(() => {
    if (userIsSuccess && user?.length == 0 && address) {
      setOnboardingPayload({
        ...onboardingPayload,
        address: address as string,
      });
      setisAddressValidated(true);
    }
  }, [userIsSuccess]);

  return (
    <>
      <p className="subheading text-center uppercase text-white/100">
        Connect Wallet
      </p>
      <div className="w-full">
        <Button
          onClick={openConnectModal}
          className="subheading h-[82px] w-full bg-white/100 text-black/100 hover:bg-white/80"
        >
          {!isConnected
            ? "CONNECT WALLET"
            : `${address?.slice(0, 6)}…${address?.slice(-4)}`}
        </Button>
        <div className="h-[34px] w-full">
          {!isConnected && (
            <p className="text-start text-green/100">
              Connect your wallet to proceed!
            </p>
          )}
        </div>
      </div>
      <Button
        disabled={!isAddressValidated}
        onClick={() => {
          setOnboardingPageNumber(onboardingPageNumber + 1);
        }}
        className="title h-[82px] w-full bg-orange/100 text-white/100 hover:bg-orange/80"
      >
        Continue
      </Button>
    </>
  );
}
