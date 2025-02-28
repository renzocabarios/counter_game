"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { wagmiConfig } from "@/config/rainbow";
import { APOLLO_CLIENT } from "@/lib/constants";
import { ApolloProvider } from "@apollo/client";

const queryClient = new QueryClient();

export default function Providers({ children }: IProvidersProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <ApolloProvider client={APOLLO_CLIENT}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </WagmiProvider>
  );
}
