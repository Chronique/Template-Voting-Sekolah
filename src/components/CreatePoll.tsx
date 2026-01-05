"use client";

import { useState } from "react";
import { useSendCalls } from "wagmi";
import { encodeFunctionData } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI, BUILDER_CODE_HEX } from "~/app/constants";
import { Add, DeleteOutline } from "@mui/icons-material"; // Menggunakan Material M3

export default function CreatePoll({ onSuccess }: { onSuccess?: () => void }) {
  const [candidateList, setCandidateList] = useState([{ name: "", photo: "" }, { name: "", photo: "" }]);
  const { sendCalls, isPending } = useSendCalls();

  const handleCreate = async () => {
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return alert("Paymaster URL tidak ditemukan!");

    const names = candidateList.map(c => c.name).filter(n => n !== "");
    const photos = candidateList.map(c => c.photo || "");
    
    if (names.length < 2) return alert("Minimal 2 nama kandidat harus diisi!");

    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: `${encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "createPoll",
            args: [names, photos],
          })}${BUILDER_CODE_HEX}` as `0x${string}`, // Gabungkan Builder Code
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      alert("Pemilihan sedang diproses!");
      if (onSuccess) onSuccess();
    } catch (e) { 
      alert("Gagal memublikasikan pemilihan."); 
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-[28px] border shadow-sm">
      <h2 className="text-lg font-black text-gray-900 uppercase">Setup Kandidat (Maks 5)</h2>
      <div className="space-y-3">
        {candidateList.map((c, i) => (
          <div key={i} className="p-4 bg-zinc-50 rounded-[20px] border border-zinc-100 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400">KANDIDAT {i + 1}</span>
              {candidateList.length > 2 && (
                <button onClick={() => setCandidateList(candidateList.filter((_, idx) => idx !== i))}>
                  <DeleteOutline className="text-red-400" fontSize="small" />
                </button>
              )}
            </div>
            <input 
              placeholder="Nama Lengkap" 
              className="w-full bg-transparent border-b text-sm outline-none focus:border-blue-500"
              value={c.name} 
              onChange={(e) => {
                const newList = [...candidateList]; newList[i].name = e.target.value; setCandidateList(newList);
              }}
            />
          </div>
        ))}
      </div>
      
      {candidateList.length < 5 && (
        <button onClick={() => setCandidateList([...candidateList, { name: "", photo: "" }])} className="w-full py-3 border-2 border-dashed rounded-2xl flex items-center justify-center gap-2 text-zinc-400">
          <Add fontSize="small" /> <span className="text-xs font-bold">Tambah Kandidat</span>
        </button>
      )}

      <button onClick={handleCreate} disabled={isPending} className="w-full py-4 bg-zinc-900 text-white font-black rounded-2xl active:scale-95 transition-all">
        {isPending ? "MEMPROSES..." : "MULAI PEMILIHAN (GRATIS)"}
      </button>
    </div>
  );
}