import { ABI, COUNTER_GAME_ABI, REGISTRY_ABI } from "@/app/lib/abi";
import { REGISTRY_ADDRESS } from "@/app/lib/constants";
import { config } from "@/components/providers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { stringToHex } from "viem";

export default function useIncrementCounter() {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const counterGameAddress = await readContract(config, {
        abi: REGISTRY_ABI,
        address: REGISTRY_ADDRESS,
        functionName: "getContractAddress",
        args: [stringToHex("CounterGame", { size: 32 })],
      });
      const result = await writeContract(config, {
        abi: COUNTER_GAME_ABI,
        address: counterGameAddress,
        functionName: "increment",
      });

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return transactionReceipt;
    },
    onSuccess() {
      query.invalidateQueries();
    },
  });

  return { ...mutation };
}
