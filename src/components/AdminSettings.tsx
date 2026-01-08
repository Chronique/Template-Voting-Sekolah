"use client";

import { useState } from "react";
import { useSendCalls } from "wagmi";
import { encodeFunctionData } from "viem";
import { CONTRACT_ADDRESS, CLASS_VOTE_ABI } from "~/app/constants"; // Hapus BUILDER_CODE_HEX jika tidak dipakai
import { PersonAdd, RestartAlt, DeleteForever, EditNote } from "@mui/icons-material";
import { Button } from "./ui/Button";

export default function AdminSettings() {
  const [newAdmin, setNewAdmin] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { sendCalls, isPending } = useSendCalls();

  const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;

  // 1. Fungsi Update Judul (Hanya di Tab Setting)
  const handleUpdateTitle = async () => {
    if (!paymasterUrl || !newTitle) return alert("Data tidak lengkap");
    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          // FIX: Gunakan data HEX murni
          data: encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "updateTitle",
            args: [newTitle],
          }),
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      alert("Permintaan dikirim!");
    } catch (e) { alert("Gagal."); }
  };

  const handleAddAdmin = async () => {
    if (!paymasterUrl || !newAdmin.startsWith("0x")) return alert("Alamat tidak valid!");
    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          // FIX: Gunakan data HEX murni
          data: encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "addAdmin",
            args: [newAdmin as `0x${string}`],
          }),
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
      setNewAdmin("");
    } catch (e) { alert("Gagal."); }
  };

  const handleReset = async (clearWhitelist: boolean) => {
    if (!paymasterUrl) return;
    try {
      sendCalls({
        calls: [{
          to: CONTRACT_ADDRESS as `0x${string}`,
          // FIX: Gunakan data HEX murni
          data: encodeFunctionData({
            abi: CLASS_VOTE_ABI,
            functionName: "resetPoll",
            args: [clearWhitelist],
          }),
        }],
        capabilities: { paymasterService: { url: paymasterUrl } }
      });
    } catch (e) { alert("Gagal reset."); }
  };

  return (
    <div className="space-y-6">
      {/* SEKSI TAMBAH ADMIN */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[28px] border shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <PersonAdd className="text-blue-500" />
          <h2 className="font-black uppercase text-zinc-900 dark:text-white">Tambah Admin</h2>
        </div>
        <input 
          placeholder="0x..." 
          className="w-full p-4 rounded-2xl border bg-zinc-50 dark:bg-zinc-800 mb-3 text-sm outline-none focus:border-blue-500" 
          value={newAdmin} 
          onChange={(e) => setNewAdmin(e.target.value)} 
        />
        <Button onClick={handleAddAdmin} disabled={isPending} className="w-full py-4 font-bold">
          {isPending ? "MEMPROSES..." : "TAMBAH AKSES"}
        </Button>
      </div>

      {/* SEKSI GANTI JUDUL (Sekarang Hanya Ada di Sini) */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[28px] border shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <EditNote className="text-blue-500" />
          <h2 className="font-black uppercase text-zinc-900 dark:text-white">Ganti Nama Pemilihan</h2>
        </div>
        <input 
          placeholder="Contoh: PEMILIHAN KETUA OSIS" 
          className="w-full p-4 rounded-2xl border bg-zinc-50 dark:border-zinc-800 mb-3 text-sm outline-none focus:border-blue-500" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
        />
        <button 
          onClick={handleUpdateTitle} 
          disabled={isPending}
          className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-2xl py-4 font-bold text-xs hover:opacity-90 transition-opacity"
        >
          SIMPAN JUDUL BARU
        </button>
      </div>

      {/* SEKSI BAHAYA */}
      <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-[28px] border border-red-100 dark:border-red-900/20">
        <h2 className="font-black text-red-600 uppercase mb-4 text-sm tracking-widest">Area Berbahaya</h2>
        <div className="space-y-3">
          <button 
            onClick={() => handleReset(false)} 
            disabled={isPending}
            className="w-full py-4 bg-white dark:bg-zinc-900 border border-red-200 text-red-600 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
          >
            <RestartAlt fontSize="small" /> DAUR ULANG (SIMPAN DAFTAR MURID)
          </button>
          <button 
            onClick={() => handleReset(true)} 
            disabled={isPending}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-red-200 dark:shadow-none hover:bg-red-700 transition-colors"
          >
            <DeleteForever fontSize="small" /> RESET TOTAL (HAPUS SEMUA DATA)
          </button>
        </div>
      </div>
    </div>
  );
}