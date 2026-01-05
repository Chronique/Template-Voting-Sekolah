"use client";

import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // Auto-connect hanya jika di dalam lingkungan Farcaster (Warpcast)
  useEffect(() => {
    if (!isConnected) {
      const fc = connectors.find((c) => c.id === "farcaster");
      if (fc) connect({ connector: fc });
    }
  }, [isConnected, connectors, connect]);

  if (isConnected && address) {
    return (
      <div className="flex items-center justify-between p-4 border rounded-2xl bg-white shadow-sm w-full">
        <div className="text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Terhubung</p>
          <p className="text-sm font-black text-blue-600 font-mono">{truncateAddress(address)}</p>
        </div>
        <Button onClick={() => disconnect()} variant="outline" size="sm" className="text-red-500">Putus</Button>
      </div>
    );
  }

  // Fungsi bantu untuk memanggil koneksi berdasarkan ID
  const handleConnect = (connectorId: string) => {
    const target = connectors.find((c) => c.id === connectorId);
    if (target) {
      connect({ connector: target });
    } else {
      alert(`Dompet ${connectorId} tidak ditemukan.`);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Tombol Coinbase Smart Wallet (Akan mengarah ke account.base.app di browser) */}
      <Button 
        onClick={() => handleConnect("coinbaseWalletSDK")} 
        disabled={isPending}
        className="w-full py-7 rounded-2xl bg-blue-600 text-white font-black text-lg"
      >
        BASE SMART WALLET
      </Button>

      {/* Tombol MetaMask */}
      <Button 
        onClick={() => handleConnect("metaMask")} 
        disabled={isPending}
        className="w-full py-7 rounded-2xl bg-orange-500 text-white font-black text-lg"
      >
        METAMASK
      </Button>

      {/* Tombol Farcaster (Manual fallback jika auto-connect gagal) */}
      <Button 
        onClick={() => handleConnect("farcaster")} 
        disabled={isPending}
        className="w-full py-7 rounded-2xl bg-purple-600 text-white font-black text-lg"
      >
        FARCASTER
      </Button>
    </div>
  );
}