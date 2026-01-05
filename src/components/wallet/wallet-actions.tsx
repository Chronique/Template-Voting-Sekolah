"use client";

import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // AUTO-DETECT: Otomatis masuk jika di dalam Farcaster/Warpcast
  useEffect(() => {
    if (!isConnected) {
      const fc = connectors.find(c => c.id === "farcaster");
      if (fc) connect({ connector: fc });
    }
  }, [isConnected, connectors, connect]);

  if (isConnected && address) {
    return (
      <div className="flex items-center justify-between p-4 border rounded-2xl bg-white shadow-sm">
        <div className="text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Terhubung</p>
          <p className="text-sm font-black text-blue-600 font-mono">{truncateAddress(address)}</p>
        </div>
        <Button onClick={() => disconnect()} variant="outline" size="sm" className="text-red-500">Putus</Button>
      </div>
    );
  }

  // Fungsi untuk memanggil koneksi berdasarkan ID
  const connectTo = (id: string) => {
    const connector = connectors.find(c => c.id === id);
    if (connector) connect({ connector });
    else alert(`Dompet ${id} tidak ditemukan. Pastikan sudah terinstal.`);
  };

  return (
    <div className="w-full space-y-3">
      {/* 1. Tombol Farcaster */}
      <Button onClick={() => connectTo("farcaster")} disabled={isPending} className="w-full py-7 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-lg">
        KONEKSI FARCASTER
      </Button>

      {/* 2. Tombol Base / Coinbase Wallet */}
      <Button onClick={() => connectTo("coinbaseWalletSDK")} disabled={isPending} className="w-full py-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg">
        BASE SMART WALLET
      </Button>

      {/* 3. Tombol MetaMask */}
      <Button onClick={() => connectTo("metaMask")} disabled={isPending} className="w-full py-7 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-lg">
        METAMASK
      </Button>
    </div>
  );
}