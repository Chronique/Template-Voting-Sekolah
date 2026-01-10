/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useFrameContext } from "~/components/providers/frame-provider";
import { sdk } from "@farcaster/miniapp-sdk";
import { motion } from "framer-motion"; // Pastikan sudah install: npm install framer-motion

export function TopBar() {
  const frameContext = useFrameContext();

  const handleProfileClick = () => {
    if (frameContext?.context && (frameContext.context as any)?.user?.fid) {
      sdk.actions.viewProfile({ fid: (frameContext.context as any).user.fid });
    }
  };

  const userPfp = frameContext?.context && (frameContext.context as any)?.user?.pfpUrl 
    ? (frameContext.context as any).user.pfpUrl 
    : undefined;

  return (
    <div className="mb-6 mt-3 flex items-center justify-between px-2">
      {/* BAGIAN KIRI: Logo & Animasi Teks */}
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Logo Sekolah */}
        <div className="relative z-10 bg-white dark:bg-zinc-950 pr-1">
          <Image 
            src="/logo-sekolah.png" //logo sekolah
            alt="logo-sekolah.png" // Ganti dengan path logo sekolah Anda
            width={56} // Ukuran lebih besar (w-14)
            height={56}
            className="h-14 w-14 object-contain drop-shadow-sm"
          />
        </div>

        {/* Animasi Teks Muncul dari Balik Logo */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }} // Mulai dari balik logo & transparan
          animate={{ opacity: 1, x: 0 }}   // Bergeser ke posisi normal
          transition={{ 
            duration: 1.8,               // Sangat lambat & halus
            ease: [0.22, 1, 0.36, 1],    // Smooth quint ease
            delay: 0.5                   // Jeda sebentar setelah load
          }}
        >
          {/* nama sekolah */}
          <h1 className="text-base font-black leading-none text-zinc-900 dark:text-white tracking-tighter">
            SMP NEGERI ...
          </h1>
          <p className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-0.5">
            KOTA ...
          </p>
        </motion.div>
      </div>
      
      {/* BAGIAN KANAN: Foto Profil Farcaster */}
      {userPfp && (
        <button
          onClick={handleProfileClick}
          className="flex-shrink-0 active:scale-90 transition-transform"
        >
          <div className="p-0.5 border-2 border-blue-100 rounded-full">
            <Image
              src={userPfp as string}
              alt="Profile"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover shadow-sm"
            />
          </div>
        </button>
      )}
    </div>
  );
}