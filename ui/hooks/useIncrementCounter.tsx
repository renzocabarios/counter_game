// import { ABI, COUNTER_GAME_ABI, REGISTRY_ABI } from "@/app/lib/abi";
// import { REGISTRY_ADDRESS } from "@/app/lib/constants";
// import { config } from "@/components/providers";
import { wagmiConfig } from "@/config/rainbow";
import { COUNTER_GAME_ABI, REGISTRY_ABI } from "@/lib/abi";
import { REGISTRY_ADRESS } from "@/lib/constants";
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
      const counterGameAddress = await readContract(wagmiConfig, {
        abi: REGISTRY_ABI,
        address: REGISTRY_ADRESS,
        functionName: "getContractAddress",
        args: [stringToHex("CounterGame", { size: 32 })],
      });
      const result = await writeContract(wagmiConfig, {
        abi: COUNTER_GAME_ABI,
        address: counterGameAddress,
        functionName: "increment",
      });

      const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: result,
      });

      console.log('transactionReceipt', transactionReceipt);

      return transactionReceipt;
    },
    onSuccess() {
      query.invalidateQueries();
    },
  });

  return { ...mutation };
}
