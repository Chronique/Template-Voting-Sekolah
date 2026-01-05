"use client";

import { useState } from "react";
import { useSendCalls } from "wagmi";
import { encodeFunctionData } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI, BUILDER_CODE_HEX } from "~/app/constants";
import { PersonAdd, RestartAlt, DeleteForever } from "@mui/icons-material"; // Ikon M3

export default function AdminSettings() {
  const [newAdmin, setNewAdmin] = useState("");
  const { sendCalls, isPending } = useSendCalls();

  const handleAddAdmin = async () => {
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl || !newAdmin.startsWith("0x")) return alert("Data tidak valid!");

    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: `${encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "addAdmin",
            args: [newAdmin as `0x${string}`],
          })}${BUILDER_CODE_HEX}` as `0x${string}`, // Gabungkan Builder Code
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      setNewAdmin("");
    } catch (e) { alert("Gagal."); }
  };

  const handleReset = async (clearWhitelist: boolean) => {
    const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    if (!paymasterUrl) return;
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: `${encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "resetPoll",
            args: [clearWhitelist],
          })}${BUILDER_CODE_HEX}` as `0x${string}`, // Gabungkan Builder Code
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
    } catch (e) { alert("Gagal reset."); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[28px] border">
        <div className="flex items-center gap-2 mb-4"><PersonAdd className="text-blue-500" /><h2 className="font-black uppercase">Tambah Admin</h2></div>
        <input placeholder="0x..." className="w-full p-4 rounded-2xl border mb-3 text-sm" value={newAdmin} onChange={(e) => setNewAdmin(e.target.value)} />
        <button onClick={handleAddAdmin} disabled={isPending} className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold">TAMBAH AKSES</button>
      </div>

      <div className="bg-red-50 p-6 rounded-[28px] border border-red-100">
        <h2 className="font-black text-red-600 uppercase mb-4">Area Berbahaya</h2>
        <div className="space-y-3">
          <button onClick={() => handleReset(false)} className="w-full py-4 bg-white border border-red-200 text-red-600 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2">
            <RestartAlt fontSize="small" /> RESET & SIMPAN MURID
          </button>
          <button onClick={() => handleReset(true)} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] flex items-center justify-center gap-2">
            <DeleteForever fontSize="small" /> RESET TOTAL (HAPUS SEMUA)
          </button>
        </div>
      </div>
    </div>
  );
}