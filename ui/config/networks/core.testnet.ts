import { defineChain } from "viem";

export const coreTestnet = defineChain({
  id: 1114,
  name: "Core Dao 2 Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "CORE",
  },
  rpcUrls: {
    default: { http: ["https://rpc.test2.btcs.network"] },
  },
  blockExplorers: {
    default: {
      name: "CoreDao",
      url: "https://scan.test2.btcs.network/",
    },
  },
  testnet: false,
});