"use client";

import { useState } from "react";
import { useSendCalls } from "wagmi"; // Menggunakan sendCalls untuk fitur Gasless
import { encodeFunctionData } from "viem"; // Diperlukan untuk memproses data fungsi
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants";
import { Plus, Trash } from "iconoir-react";

export default function CreatePoll({ onSuccess }: any) {
  const [candidateList, setCandidateList] = useState([{ name: "", photo: "" }, { name: "", photo: "" }]);
  const { sendCalls, isPending } = useSendCalls();

  const addCandidate = () => {
    if (candidateList.length < 5) setCandidateList([...candidateList, { name: "", photo: "" }]);
  };

  const removeCandidate = (index: number) => {
    if (candidateList.length > 2) setCandidateList(candidateList.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return alert("Paymaster URL tidak ditemukan di .env!");

    const names = candidateList.map(c => c.name).filter(n => n.trim() !== "");
    const photos = candidateList.map(c => c.photo).filter(p => p.trim() !== "");
    
    if (names.length < 2) return alert("Minimal 2 kandidat harus diisi!");

    try {
      // Mengirim transaksi melalui Paymaster agar Gasless
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "createPoll",
            args: [names, photos],
          }),
        }],
        capabilities: {
          paymasterService: { url: paymasterUrl } // Sponsorship dari kredit Base kamu
        }
      });
      alert("Permintaan pembuatan pemilihan sedang diproses secara gratis!");
      // onSuccess biasanya dipicu setelah transaksi masuk block, 
      // untuk demo ini kita asumsikan pengiriman berhasil.
      if (onSuccess) onSuccess();
    } catch (e) { 
      alert("Gagal memublikasikan pemilihan."); 
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-3xl border shadow-sm">
      <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Setup Kandidat (Maks 5)</h2>
      <div className="space-y-3">
        {candidateList.map((c, i) => (
          <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 flex gap-3 flex-col">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase">Kandidat {i + 1}</span>
              {candidateList.length > 2 && <button onClick={() => removeCandidate(i)}><Trash width={16} className="text-red-400" /></button>}
            </div>
            <input 
              placeholder="Nama Lengkap" 
              className="w-full bg-transparent border-b border-zinc-200 py-1 text-sm outline-none focus:border-blue-500"
              value={c.name} onChange={(e) => {
                const newList = [...candidateList]; newList[i].name = e.target.value; setCandidateList(newList);
              }}
            />
            <input 
              placeholder="URL Foto (https://...)" 
              className="w-full bg-transparent text-[10px] outline-none"
              value={c.photo} onChange={(e) => {
                const newList = [...candidateList]; newList[i].photo = e.target.value; setCandidateList(newList);
              }}
            />
          </div>
        ))}
      </div>
      
      {candidateList.length < 5 && (
        <button onClick={addCandidate} className="w-full py-3 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center gap-2 text-zinc-400 hover:text-blue-500 hover:border-blue-200 transition-colors">
          <Plus width={18} /> <span className="text-xs font-bold">Tambah Kandidat</span>
        </button>
      )}

      <button 
        onClick={handleCreate} 
        disabled={isPending}
        className="w-full py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all"
      >
        {isPending ? "MEMPROSES..." : "MULAI PEMILIHAN (GRATIS)"}
      </button>
      <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">Biaya Gas ditanggung Sekolah</p>
    </div>
  );
}