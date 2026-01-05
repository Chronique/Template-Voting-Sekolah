// src/components/VoteResults.tsx
"use client";

import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants";

export default function VoteResults() {
  const { data: candidates } = useReadContract({
    abi: CLASS_VOTE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCandidates",
  });

  if (!candidates) return <p className="text-center p-10 font-bold">Memuat data...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Hasil Pemilihan</h2>
      <div className="space-y-4">
        {(candidates as any[]).map((c, i) => (
          <div key={i} className="bg-zinc-50 p-5 rounded-[28px] border border-zinc-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-zinc-800">{c.name}</span>
              <span className="text-blue-600 font-black">{Number(c.votes)} Suara</span>
            </div>
            {/* Gaya Progress Bar Material 3 */}
            <div className="w-full bg-zinc-200 h-4 rounded-full">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(Number(c.votes) * 10, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}