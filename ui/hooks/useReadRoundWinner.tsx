import { wagmiConfig } from "@/config/rainbow";
import { COUNTER_GAME_ABI, REGISTRY_ABI } from "@/lib/abi";
import { REGISTRY_ADRESS } from "@/lib/constants";

import { useQuery } from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { stringToHex } from "viem";
import { useAccount } from "wagmi";

export default function useReadPoints() {
  const { address } = useAccount();
  const { ...query } = useQuery({
    queryFn: async () => {
      const counterGameAddress = await readContract(wagmiConfig, {
        abi: REGISTRY_ABI,
        address: REGISTRY_ADRESS,
        functionName: "getContractAddress",
        args: [stringToHex("CounterGame", { size: 32 })],
      });
      const result = await readContract(wagmiConfig, {
        abi: COUNTER_GAME_ABI,
        address: counterGameAddress,
        functionName: "roundWinner",
        args: [address ?? ""],
      });

      console.log(result);
      return result;
    },
    queryKey: ["round"],
  });

  return { ...query };
}
