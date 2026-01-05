"use client";

import dynamic from "next/dynamic";

import FrameProvider from "~/components/providers/frame-provider";


const WagmiProvider = dynamic(
  () => import("~/components/providers/wagmi-provider"),
  {
    ssr: false,
  }
);



export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <FrameProvider>
        {children}
      </FrameProvider>
    </WagmiProvider>
  );
}
