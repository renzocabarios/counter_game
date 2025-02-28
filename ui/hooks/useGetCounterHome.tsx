import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useGetCounterHome() {
  const query = useQueryClient();
  const mutation = useQuery({
    queryFn: async () => {
      // const counterGameAddress: Address =
      //   await getContractAddress("CounterGame");
      // const result = await writeContract(wagmiConfig, {
      //   abi: COUNTER_GAME_ABI,
      //   address: counterGameAddress,
      //   functionName: "increment",
      //   args: [parseUnits(String(value), 0)],
      // });
      // const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
      //   hash: result,
      // });
      // return transactionReceipt;
    },

    queryKey: ["home"],
  });

  useEffect(() => {
    console.log(mutation?.error);
  }, [mutation?.error]);

  return { ...mutation };
}
