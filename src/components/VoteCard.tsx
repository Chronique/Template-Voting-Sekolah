"use client";

import { useReadContract, useAccount, useSendCalls } from "wagmi";
import { encodeFunctionData } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants";

export default function VoteCard() {
  const { address } = useAccount();
  const { sendCalls, isPending } = useSendCalls();
  
  const { data: candidates, refetch } = useReadContract({
    abi: CLASS_VOTE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCandidates",
  });

  const handleVote = async (index: number) => {
    // 1. Ambil nama kandidat untuk pesan konfirmasi
    const candidateName = (candidates as any[])[index]?.name || "kandidat ini";
    
    // 2. Tambahkan Notifikasi Konfirmasi
    if (!confirm(`Apakah Anda yakin dengan pilihan untuk ${candidateName}?`)) {
      return; // Balik ke awal jika klik "Cancel"
    }

    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return alert("Paymaster URL tidak ditemukan di .env!");

    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "vote",
            args: [BigInt(index)]
          }),
        }],
        capabilities: {
          paymasterService: { url: paymasterUrl }
        }
      });
      alert("Permintaan suara dikirim secara Gasless!");
      setTimeout(() => refetch(), 3000);
    } catch (e) {
      alert("Terjadi kesalahan saat voting.");
    }
  };

  if (!candidates || (candidates as any).length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-center text-blue-600 mb-6 uppercase tracking-tight">Pilih Ketua Kelas</h2>
      {(candidates as any[]).map((c, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-[28px] border flex items-center gap-4 shadow-sm">
          <img 
            src={c.photoUrl || "https://via.placeholder.com/150"} 
            alt={c.name} 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-50 shadow-inner"
          />
          <div className="flex-1">
            <h3 className="font-black text-gray-800 dark:text-white text-lg">{c.name}</h3>
            {/* JUMLAH SUARA TELAH DIHAPUS */}
          </div>
          <button 
            onClick={() => handleVote(i)}
            disabled={isPending}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {isPending ? "..." : "PILIH"}
          </button>
        </div>
      ))}
      <p className="text-center text-[9px] text-gray-400 font-bold uppercase py-4">Sistem Voting On-chain Menggunakan Jaringan Base</p>
    </div>
  );
}