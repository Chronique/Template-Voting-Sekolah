"use client";

import { useState } from "react"; // Tambahkan useState
import { useReadContract, useSendCalls } from "wagmi";
import { encodeFunctionData } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI, BUILDER_CODE_HEX } from "~/app/constants";
import { HowToVote } from "@mui/icons-material"; // Import ikon untuk modal

export default function VoteCard() {
  const { sendCalls, isPending } = useSendCalls();
  
  // --- STATE UNTUK MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data: candidates, refetch } = useReadContract({
    abi: CLASS_VOTE_ABI, address: CONTRACT_ADDRESS, functionName: "getCandidates",
  });

  const { data: pollTitle } = useReadContract({
    abi: CLASS_VOTE_ABI, address: CONTRACT_ADDRESS, functionName: "pollTitle",
  });

  // 1. Fungsi untuk MEMBUKA Modal
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  // 2. Fungsi untuk EKSEKUSI Vote (setelah klik "YA" di modal)
  const executeVote = async () => {
    if (selectedIndex === null) return;
    
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return;

    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: `${encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "vote",
            args: [BigInt(selectedIndex)]
          })}${BUILDER_CODE_HEX}` as `0x${string}`,
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      
      setIsModalOpen(false); // Tutup modal
      alert("Suara sedang diproses secara gasless!");
      setTimeout(() => refetch(), 3000);
    } catch (e) { 
      alert("Gagal voting."); 
      setIsModalOpen(false);
    }
  };

  if (!candidates || (candidates as any).length === 0) return null;

  const selectedName = selectedIndex !== null ? (candidates as any[])[selectedIndex]?.name : "";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-center text-blue-600 mb-6 uppercase tracking-tight">
        {pollTitle as string || "MEMUAT JUDUL..."}
      </h2>

      {/* DAFTAR KANDIDAT */}
      {(candidates as any[]).map((c, i) => (
        <div key={i} className="bg-white p-4 rounded-[28px] border flex items-center gap-4 shadow-sm">
          <img src={c.photoUrl || "https://via.placeholder.com/150"} className="w-20 h-20 rounded-2xl object-cover border" alt={c.name} />
          <div className="flex-1">
            <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight">{c.name}</h3>
          </div>
          <button 
            onClick={() => openModal(i)} // Panggil openModal
            disabled={isPending} 
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs active:scale-95 transition-transform"
          >
            {isPending ? "..." : "PILIH"}
          </button>
        </div>
      ))}

      <p className="text-center text-[9px] text-gray-400 font-bold uppercase py-4 tracking-widest">Biaya Gas ditanggung Sekolah (Paymaster)</p>

      {/* --- MODAL KONFIRMASI TENGAH LAYAR --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Latar Belakang Gelap (Overlay) */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          {/* Kotak Modal */}
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HowToVote className="text-blue-600" fontSize="large" />
              </div>
              
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Konfirmasi</h3>
              <p className="mt-2 text-sm text-zinc-500 font-medium">
                Apakah Anda yakin ingin memilih <br/>
                <span className="font-black text-blue-600 text-lg">"{selectedName}"</span>?
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={executeVote}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm active:scale-95 transition-transform shadow-lg shadow-blue-200"
              >
                YA, SAYA YAKIN
              </button>
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl font-bold text-sm"
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}