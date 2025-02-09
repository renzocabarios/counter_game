import { COUNTER_GAME_ABI, REGISTRY_ABI } from "@/app/lib/abi";
import { REGISTRY_ADDRESS } from "@/app/lib/constants";
import { config } from "@/components/providers";
import { useQuery } from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { stringToHex } from "viem";

export default function useGetCounterGame() {
  const { ...query } = useQuery({
    queryFn: async () => {
      return = await readContract(config, {
        abi: REGISTRY_ABI,
        address: REGISTRY_ADDRESS,
        functionName: "getContractAddress",
        args: [stringToHex("CounterGame", { size: 32 })],
      });
   
    },
    queryKey: ["counter-game"],
  });

  return { ...query };
}
