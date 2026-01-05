"use client";

import { useReadContract, useAccount, useSendCalls } from "wagmi";
import { encodeFunctionData } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI, BUILDER_CODE_HEX } from "~/app/constants";

export default function VoteCard() {
  const { sendCalls, isPending } = useSendCalls();
  const { data: candidates, refetch } = useReadContract({
    abi: CLASS_VOTE_ABI, address: CONTRACT_ADDRESS, functionName: "getCandidates",
  });

  const handleVote = async (index: number) => {
    const name = (candidates as any[])?.[index]?.name || "kandidat ini";
    if (!confirm(`Apakah Anda yakin memilih ${name}?`)) return;

    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return;

    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: `${encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "vote",
            args: [BigInt(index)]
          })}${BUILDER_CODE_HEX}` as `0x${string}`, // Gabungkan Builder Code
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      alert("Suara terkirim!");
      setTimeout(() => refetch(), 3000);
    } catch (e) { alert("Gagal voting."); }
  };

  if (!candidates || (candidates as any).length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-center text-blue-600 mb-6 uppercase">Pilih Ketua Kelas</h2>
      {(candidates as any[]).map((c, i) => (
        <div key={i} className="bg-white p-4 rounded-[28px] border flex items-center gap-4 shadow-sm">
          <img src={c.photoUrl || "https://via.placeholder.com/150"} className="w-20 h-20 rounded-2xl object-cover border" alt={c.name} />
          <div className="flex-1"><h3 className="font-black text-gray-800 text-lg">{c.name}</h3></div>
          <button onClick={() => handleVote(i)} disabled={isPending} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs">
            {isPending ? "..." : "PILIH"}
          </button>
        </div>
      ))}
      <p className="text-center text-[9px] text-gray-400 font-bold uppercase py-4 tracking-widest">Biaya Gas ditanggung Sekolah (Paymaster)</p>
    </div>
  );
}