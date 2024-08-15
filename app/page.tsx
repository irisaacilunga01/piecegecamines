"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../components/images-slider";
import Link from "next/link";

export default function Page() {
  const images = [
    "https://deskeco.com/sites/default/files/styles/1024x578/public/2022-08/gecamines-agent-20180425-mediacongo-net-1.jpg?itok=8subsyRa",
    "https://th.bing.com/th/id/OIP.5RzVYbAfuXk1n95FFpAOowHaD4?rs=1&pid=ImgDetMain",
    "https://deskeco.com/sites/default/files/styles/1024x578/public/2019-12/280px-Gcm.jpg?itok=2VpHsmXE",
  ];
  return (
    <ImagesSlider className="h-screen w-full" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Bienvénue au <br /> Magasin 31 ARM de la Gécamines
        </motion.p>

        <div className="flex gap-4">
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <Link href="/piece">Voir les pièces →</Link>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <Link href="/login">Se connecter →</Link>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </div>
      </motion.div>
    </ImagesSlider>
  );
}
