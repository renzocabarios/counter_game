"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { defineChain } from "viem";

export const core2Testnet = defineChain({
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

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [core2Testnet],
  ssr: true,
});

const queryClient = new QueryClient();

interface IProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
