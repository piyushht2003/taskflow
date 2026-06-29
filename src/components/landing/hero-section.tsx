"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-white dark:bg-neutral-950 flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-[800px] translate-x-[30%] -translate-y-[5%]">
          <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMaxYMid meet" className="w-full h-full text-indigo-50 dark:text-indigo-900/30">
            <g fill="currentColor">
              {[
                "0000000000000000000111100",
                "0000000000000000001111111",
                "0000000000000000111111100",
                "0000000000000000001110000",
                "0000000000000000011110000",
                "0000000000000000011111100",
                "0000000000000001111110000",
                "0000000000000111111110010",
                "0000000001111111111110000",
                "0001111111111111100000000",
                "1111111111111100011000000",
                "1111111111111001000000000",
                "1111111101110000000000000",
                "1111111000000000000000000",
                "0110000000000000000000000",
              ].map((row, rowIndex) => 
                row.split("").map((cell, colIndex) => 
                  cell === "1" ? (
                    <rect 
                      key={`${rowIndex}-${colIndex}`}
                      x={colIndex * 40} 
                      y={rowIndex * 40} 
                      width="41" 
                      height="41" 
                    />
                  ) : null
                )
              )}
            </g>
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full z-10 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-left pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">Built for Students, Freelancers & Teams</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white leading-[1.1]"
          >
            Manage Projects<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Without The Chaos.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-md leading-relaxed"
          >
            The smart way to organize teams and tasks. Experience seamless real-time collaboration without the clutter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 dark:bg-white px-8 py-4 text-sm font-semibold text-white dark:text-neutral-950 transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 w-full sm:w-auto"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Social Proof & Stats Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative mx-auto max-w-7xl px-6 w-full mt-24 z-20"
      >
        <div className="bg-neutral-900 dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 shadow-2xl">
          {/* Logos Row */}
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 mb-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Text placeholders for tech stack */}
             <div className="text-xl font-bold text-white flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-[10px]">N</div> Next.js</div>
             <div className="text-xl font-bold text-white flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center text-black text-[10px]">TS</div> TypeScript</div>
             <div className="text-xl font-bold text-white">Prisma</div>
             <div className="text-xl font-bold text-white">PostgreSQL</div>
             <div className="text-xl font-bold text-white">Socket.io</div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { value: "Real-Time", label: "WebSocket synchronization" },
               { value: "Secure", label: "Role-based authentication" },
               { value: "30+", label: "Active beta testers" },
               { value: "100%", label: "Open-source codebase" }
             ].map((stat, idx) => (
               <div key={idx} className="bg-white dark:bg-neutral-950 rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition-colors"></div>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 mt-4">{stat.value}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">{stat.label}</p>
               </div>
             ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
