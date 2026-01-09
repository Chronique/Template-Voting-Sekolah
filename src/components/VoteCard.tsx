"use client";

import { useState } from "react";
import { useReadContract, useSendCalls } from "wagmi";
import { encodeFunctionData, concat } from "viem"; // Tambahkan concat
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI, BUILDER_CODE_HEX } from "~/app/constants";
import { HowToVote } from "@mui/icons-material";

export default function VoteCard() {
  const { sendCalls, isPending } = useSendCalls();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data: candidates, refetch } = useReadContract({
    abi: CLASS_VOTE_ABI, 
    address: CONTRACT_ADDRESS as `0x${string}`, 
    functionName: "getCandidates",
  });

  const { data: pollTitle } = useReadContract({
    abi: CLASS_VOTE_ABI, 
    address: CONTRACT_ADDRESS as `0x${string}`, 
    functionName: "pollTitle",
  });

  // Pastikan Builder Code memiliki prefix 0x
  const safeBuilderCode = BUILDER_CODE_HEX.startsWith("0x") 
    ? (BUILDER_CODE_HEX as `0x${string}`) 
    : (`0x${BUILDER_CODE_HEX}` as `0x${string}`);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const executeVote = async () => {
    if (selectedIndex === null) return;
    
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return alert("Paymaster URL tidak ditemukan");

    try {
      const baseData = encodeFunctionData({
        abi: CLASS_VOTE_ABI,
        functionName: "vote",
        args: [BigInt(selectedIndex)]
      });

      // GABUNGKAN DENGAN CONCAT
      const finalData = concat([baseData, safeBuilderCode]);

      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: finalData,
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      
      setIsModalOpen(false); 
      setTimeout(() => refetch(), 3000);
    } catch (e) { 
      console.error(e);
      alert("Gagal mengirim suara. Pastikan Anda sudah terdaftar di Whitelist."); 
      setIsModalOpen(false);
    }
  };

  if (!candidates || (candidates as any).length === 0) return null;
  const selectedCandidate = selectedIndex !== null ? (candidates as any[])[selectedIndex] : null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-center text-blue-600 mb-6 uppercase tracking-tight">
        {pollTitle as string || "MEMUAT JUDUL..."}
      </h2>

      {(candidates as any[]).map((c, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-[28px] border flex items-center gap-4 shadow-sm">
          <img 
            src={c.photoUrl || "https://via.placeholder.com/150"} 
            className="w-20 h-20 rounded-2xl object-cover border border-zinc-100" 
            alt={c.name} 
          />
          <div className="flex-1">
            <h3 className="font-black text-zinc-800 dark:text-zinc-100 text-lg uppercase tracking-tight">{c.name}</h3>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{Number(c.voteCount)} Suara</p>
          </div>
          <button 
            onClick={() => openModal(i)} 
            disabled={isPending} 
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs active:scale-95 transition-all disabled:bg-blue-300"
          >
            PILIH
          </button>
        </div>
      ))}

      <p className="text-center text-[9px] text-zinc-400 font-bold uppercase py-4 tracking-widest">
        Biaya Gas ditanggung Sekolah (Paymaster)
      </p>

      {/* MODAL KONFIRMASI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isPending && setIsModalOpen(false)} />
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[32px] p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HowToVote className="text-blue-600" fontSize="large" />
              </div>
              <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Konfirmasi Pilihan</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Pilih <span className="font-black text-blue-600 uppercase">"{selectedCandidate?.name}"</span>?
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={executeVote}
                disabled={isPending}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm active:scale-95 disabled:bg-blue-400"
              >
                {isPending ? "MENGIRIM..." : "YA, SAYA YAKIN"}
              </button>
              {!isPending && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl font-bold text-sm"
                >
                  BATAL
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}