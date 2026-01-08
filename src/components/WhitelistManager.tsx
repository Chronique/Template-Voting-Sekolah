"use client";

import { useState } from "react";
import { useSendCalls, useReadContract } from "wagmi";
import { encodeFunctionData, isAddress } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants";
import { Button } from "./ui/Button";

interface WhitelistManagerProps {
  onUpdate?: (newList: string[]) => void;
}

export default function WhitelistManager({ onUpdate }: WhitelistManagerProps) {
  const [input, setInput] = useState("");
  const { sendCalls, isPending } = useSendCalls();

  // Ambil data murid langsung dari Blockchain
  const { data: whitelistData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CLASS_VOTE_ABI,
    functionName: "getFullWhitelist",
  });

  const handleAdd = async () => {
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return alert("Paymaster URL belum diatur");

    const addresses = input
      .split(/[\n,]+/)
      .map((a) => a.trim())
      .filter((a) => isAddress(a)) as `0x${string}`[];

    if (addresses.length === 0) return alert("Alamat tidak valid!");

    try {
      sendCalls({
        calls: [
          {
            to: CONTRACT_ADDRESS as `0x${string}`,
            data: encodeFunctionData({
              abi: CLASS_VOTE_ABI,
              functionName: "addToWhitelist",
              args: [addresses],
            }),
          },
        ],
        capabilities: { paymasterService: { url: paymasterUrl } },
      });
      alert("Permintaan pendaftaran dikirim!");
      setInput("");
      setTimeout(() => refetch(), 3000);
    } catch (e) {
      alert("Terjadi kesalahan teknis.");
    }
  };

  return (
    <div className="space-y-6">
      {/* SEKSI 1: DAFTARKAN MURID */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border shadow-sm">
        <h2 className="text-xl font-black mb-4 uppercase tracking-tight text-zinc-900 dark:text-white">
          Daftarkan Murid
        </h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Masukkan alamat wallet (satu per baris atau pisahkan dengan koma)"
          className="w-full h-32 p-4 rounded-2xl border bg-zinc-50 dark:bg-zinc-800 mb-4 text-xs font-mono outline-none focus:border-blue-500"
        />
        <Button onClick={handleAdd} disabled={isPending} className="w-full py-6 rounded-2xl bg-blue-600 text-white font-bold">
          {isPending ? "MEMPROSES..." : "SIMPAN WHITELIST"}
        </Button>
      </div>

      {/* SEKSI 2: DAFTAR MURID TERDAFTAR */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-black uppercase text-zinc-900 dark:text-white">
            Murid Terdaftar ({whitelistData?.length || 0})
          </h2>
          <button onClick={() => refetch()} className="text-[10px] text-blue-500 font-bold hover:underline">
            REFRESH
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {whitelistData && (whitelistData as string[]).length > 0 ? (
            (whitelistData as string[]).map((addr, i) => (
              <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-[10px] font-mono truncate border border-zinc-100 dark:border-zinc-700">
                {addr}
              </div>
            ))
          ) : (
            <p className="text-zinc-400 text-xs italic text-center py-4">Belum ada murid terdaftar.</p>
          )}
        </div>
      </div>
    </div>
  );
}