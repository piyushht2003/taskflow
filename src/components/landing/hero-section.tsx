"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col items-center">
      {/* Refined minimalist background glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center z-10 flex flex-col items-center mt-12 lg:mt-24">
        
        {/* Subtle Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/5 dark:bg-white/5 border border-neutral-900/10 dark:border-white/10 text-neutral-600 dark:text-neutral-300 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>TaskFlow 1.0 is now live</span>
        </motion.div>

        {/* Striking Minimalist Header */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl lg:text-[5.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 dark:text-white mb-6"
        >
          Do your best work, <br />
          <span className="text-neutral-400 dark:text-neutral-500">together.</span>
        </motion.h1>

        {/* Clean Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          The simple, intuitive way for teams to manage projects, align on goals, and ship faster without the clutter.
        </motion.p>

        {/* Sleek Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/register"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 dark:bg-white px-8 py-4 text-sm font-medium text-white dark:text-neutral-900 transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-8 py-4 text-sm font-medium text-neutral-900 dark:text-white transition-all hover:bg-neutral-100 dark:hover:bg-white/5 w-full sm:w-auto"
          >
            Book a demo
          </Link>
        </motion.div>
      </div>

      {/* Fade out to the rest of the page instead of a heavy mockup right here */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-full h-32 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent absolute bottom-0 z-20 pointer-events-none" 
      />
    </section>
  );
}
