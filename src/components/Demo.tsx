"use client";

import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants";
import { TopBar } from "~/components/top-bar";
import { BottomNavigation } from "~/components/bottom-navigation";
import { WalletConnectPrompt } from "~/components/wallet-connect-prompt";

import VoteCard from "./VoteCard";
import CreatePoll from "./CreatePoll";
import WhitelistManager from "./WhitelistManager";
import AdminSettings from "./AdminSettings";
import VoteResults from "./VoteResults";
import { Verification } from "./Verification"; // Import tab Verifikasi baru

export default function Demo() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<string>("vote");
  
  // --- STATE WHITELIST PUSAT ---
  const [whitelist, setWhitelist] = useState<string[]>([]);

  // Load data dari LocalStorage saat pertama kali buka aplikasi
  useEffect(() => {
    const saved = localStorage.getItem("smp21_whitelist");
    if (saved) {
      setWhitelist(JSON.parse(saved));
    }
  }, []);

  // Fungsi untuk update whitelist dari tab Admin ke State Pusat
  const handleWhitelistUpdate = (newList: string[]) => {
    setWhitelist(newList);
    localStorage.setItem("smp21_whitelist", JSON.stringify(newList));
  };

  const { data: pollCreated, refetch: refetchStatus } = useReadContract({
    abi: CLASS_VOTE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "pollCreated",
  });

  const { data: userIsAdmin } = useReadContract({
    abi: CLASS_VOTE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "isAdmin",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const isAdmin = !!userIsAdmin;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="px-4 py-4"><TopBar /></div>
      <div className="px-4 pb-24">
        {!isConnected ? (
          <WalletConnectPrompt />
        ) : (
          <>
            {activeTab === "vote" && (
              pollCreated ? <VoteCard /> : 
              <div className="text-center p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed text-gray-400">
                <p className="font-bold">Belum ada pemilihan aktif.</p>
              </div>
            )}
            
            {activeTab === "create" && isAdmin && <CreatePoll onSuccess={refetchStatus} />}
            
            {/* Kirim fungsi update ke WhitelistManager */}
            {activeTab === "admin" && isAdmin && (
              <WhitelistManager onUpdate={handleWhitelistUpdate} />
            )}

            {/* TAB VERIFIKASI BARU: Kirim data whitelist pusat ke sini */}
            {activeTab === "verify" && isAdmin && (
              <Verification  />
            )}

            {activeTab === "results" && isAdmin && <VoteResults />}

            {activeTab === "settings" && isAdmin && <AdminSettings />}

            {activeTab === "wallet" && (
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border">
                <h3 className="font-bold mb-4">Profil</h3>
                <p className="text-xs text-blue-600 break-all bg-zinc-50 p-3 rounded-xl">{address}</p>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab: any) => setActiveTab(tab)}
        isAdmin={isAdmin}
        pollCreated={!!pollCreated}
      />
    </div>
  );
}