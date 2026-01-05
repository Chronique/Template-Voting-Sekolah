"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { METADATA } from "../../lib/utils";

export const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
  connectors: [
    farcasterMiniApp(), 
    coinbaseWallet({
      appName: METADATA.name,
      preference: "all", // "all" memungkinkan popup Smart Wallet (account.base.app) muncul di browser
    }),
    injected({ target: "metaMask" })
  ],
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}