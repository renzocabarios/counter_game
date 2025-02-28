import { wagmiConfig } from "@/config/rainbow";
import { COUNTER_GAME_ABI } from "@/lib/abi";
import { getContractAddress } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { useEffect } from "react";
import { Address, parseUnits } from "viem";

interface IIncrementArgs {
  value: number;
}

export default function useIncrementCounter() {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ value }: IIncrementArgs) => {
      const counterGameAddress: Address =
        await getContractAddress("CounterGame");

      const result = await writeContract(wagmiConfig, {
        abi: COUNTER_GAME_ABI,
        address: counterGameAddress,
        functionName: "increment",
        args: [parseUnits(String(value), 0)],
      });

      const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: result,
      });

      return transactionReceipt;
    },
    onSuccess() {
      query.invalidateQueries();
    },
  });

  useEffect(() => {
    console.log(mutation?.error);
  }, [mutation?.error]);

  return { ...mutation };
}
