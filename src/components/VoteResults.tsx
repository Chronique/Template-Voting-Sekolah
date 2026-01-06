// src/components/ResultsPage.tsx
"use client";

import { useEffect } from "react"; // Tambahkan useEffect
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants";
import { EmojiEvents } from "@mui/icons-material";
import confetti from "canvas-confetti"; // Import library konfeti

const getProgressColor = (percentage: number) => {
  if (percentage < 30) return "bg-red-500"; 
  if (percentage < 70) return "bg-yellow-400";
  return "bg-green-500";
};

export default function ResultsPage() {
  // --- EFEK KONFETI OTOMATIS ---
  useEffect(() => {
    // Fungsi untuk meledakkan konfeti
    const duration = 3 * 1000; // Berlangsung selama 3 detik
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Ledakan dari kiri dan kanan bawah
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval); // Bersihkan interval saat pindah tab
  }, []); // [] memastikan efek jalan setiap kali tab Hasil dibuka

  const { data: pollTitle } = useReadContract({
    abi: CLASS_VOTE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "pollTitle",
  });

  const { data: candidates } = useReadContract({
    abi: CLASS_VOTE_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCandidates",
  });

  if (!candidates || (candidates as any[]).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-gray-400">
        <p className="font-bold uppercase text-xs tracking-widest">Belum Ada Pemilihan Aktif</p>
      </div>
    );
  }

  const candidatesData = candidates as any[];
  const totalVotes = candidatesData.reduce((acc, curr) => acc + Number(curr.voteCount), 0);
  const maxVotes = Math.max(...candidatesData.map(c => Number(c.voteCount)));

  return (
    <div className="pb-24 p-6 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-black text-blue-900 dark:text-blue-400 uppercase tracking-tighter leading-none">
          {pollTitle as string || "HASIL PEMILIHAN"}
        </h2>
        <div className="mt-2 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
            Total: {totalVotes} Suara Masuk
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-around items-end h-80 px-4 py-8 bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm relative">
        {candidatesData.map((c, i) => {
          const voteCount = Number(c.voteCount);
          const percentage = totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
          const colorClass = getProgressColor(percentage);
          const isWinner = voteCount === maxVotes && voteCount > 0;

          return (
            <div key={i} className="flex flex-col items-center justify-end h-full w-20 gap-4 group relative">
              {isWinner && (
                <div className="absolute -top-8 animate-bounce">
                  <EmojiEvents className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" fontSize="medium" />
                </div>
              )}

              <span className={`text-[11px] font-black ${isWinner ? 'text-yellow-600 scale-125' : (percentage > 0 ? colorClass.replace("bg-", "text-") : "text-zinc-300")}`}>
                {percentage}%
              </span>

              <div className={`relative w-10 h-full bg-zinc-50 dark:bg-zinc-800/50 rounded-full overflow-hidden border shadow-inner ${isWinner ? 'border-yellow-400' : 'border-zinc-100'}`}>
                <div 
                  className={`absolute bottom-0 left-0 w-full rounded-full transition-all duration-1000 ease-out ${colorClass} shadow-lg`}
                  style={{ height: `${percentage}%` }}
                >
                  {percentage > 0 && <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/2 h-full bg-white/20 rounded-full blur-[2px]"></div>}
                </div>
              </div>

              <div className="text-center">
                <h3 className={`font-black text-[10px] uppercase truncate w-20 ${isWinner ? 'text-yellow-700 dark:text-yellow-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                  {c.name}
                </h3>
                <p className="text-[9px] font-bold text-zinc-400">{voteCount} VOTE</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[8px] text-zinc-400 font-bold uppercase mt-12 tracking-[0.3em]">
        Verified On-Chain Data • Base Network
      </p>
    </div>
  );
}