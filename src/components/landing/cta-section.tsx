"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden transition-colors duration-300">
      {/* Background with glowing effect */}
      <div className="absolute inset-0 bg-blue-50 dark:bg-neutral-950"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      
      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-neutral-900 dark:text-white"
        >
          Start Managing Your Team Smarter
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto"
        >
          Create your workspace and experience real-time collaboration today. Join the waitlist or start immediately.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/register" 
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 dark:bg-white px-8 py-4 text-sm font-semibold text-white dark:text-neutral-950 transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Create Workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="#demo" 
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white dark:bg-neutral-900 px-8 py-4 text-sm font-semibold text-neutral-900 dark:text-white transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 shadow-sm dark:shadow-none w-full sm:w-auto"
          >
            View Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
