"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors"; // Gunakan coinbaseWallet & injected
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { METADATA } from "../../lib/utils";

export const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
  connectors: [
    farcasterMiniApp(), // Untuk Farcaster Mini App
    coinbaseWallet({
      appName: METADATA.name,
      preference: "smartWalletOnly", // Mengaktifkan Base Smart Wallet
    }),
    injected({ target: "metaMask" }) // Khusus MetaMask
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