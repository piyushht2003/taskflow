"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center z-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          TaskFlow 1.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-neutral-900 dark:text-white"
        >
          Manage Projects. <br className="hidden lg:block" />
          Collaborate in Real-Time. <br className="hidden lg:block" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Ship Faster.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          TaskFlow helps startups, student teams, and organizations streamline collaboration with real-time updates, role-based workspaces, and powerful project management tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 dark:bg-white px-8 py-4 text-sm font-semibold text-white dark:text-neutral-950 transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto overflow-hidden"
          >
            <span>Create Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white dark:bg-neutral-900/50 backdrop-blur-md px-8 py-4 text-sm font-semibold text-neutral-900 dark:text-white transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-white/10 dark:hover:border-white/20 w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-neutral-900 dark:fill-white/80" />
            Watch Demo
          </Link>
        </motion.div>
      </div>

      {/* Background Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] px-6 z-0 pointer-events-none mt-10 md:mt-0"
      >
        <div className="opacity-40 dark:opacity-[0.15]">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-neutral-950 dark:to-neutral-950 z-10 pointer-events-none opacity-90 h-[105%] w-[105%] -left-2 -top-2"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-white dark:from-neutral-950 dark:to-neutral-950 z-10 pointer-events-none opacity-90 h-[105%] w-[105%] -left-2 -top-2"></div>
          <div className="relative rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950/80 p-2 overflow-hidden blur-[1px]">
            {/* Header Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto px-2 py-1 bg-neutral-200 dark:bg-neutral-800/50 rounded-md text-[10px] text-neutral-500 dark:text-neutral-400 font-mono flex items-center gap-2">
              taskflow.app/dashboard
            </div>
          </div>
          {/* Main App Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 min-h-[450px] md:h-[450px] overflow-y-auto overflow-x-hidden">
            {/* Sidebar */}
            <div className="col-span-3 hidden md:flex flex-col gap-2 border-r border-neutral-200 dark:border-white/5 pr-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-neutral-900 dark:bg-white flex-shrink-0"></div>
                <div className="h-5 bg-neutral-200 dark:bg-white/10 rounded w-24"></div>
              </div>
              <div className="h-8 bg-blue-500/10 border border-blue-500/20 rounded-md w-full flex items-center px-3 gap-2">
                <div className="w-4 h-4 rounded bg-blue-500/50"></div>
                <div className="h-3 bg-blue-500/40 rounded w-16"></div>
              </div>
              <div className="h-8 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-md w-full flex items-center px-3 gap-2">
                <div className="w-4 h-4 rounded bg-neutral-300 dark:bg-white/20"></div>
                <div className="h-3 bg-neutral-200 dark:bg-white/10 rounded w-14"></div>
              </div>
              <div className="h-8 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-md w-full flex items-center px-3 gap-2">
                <div className="w-4 h-4 rounded bg-neutral-300 dark:bg-white/20"></div>
                <div className="h-3 bg-neutral-200 dark:bg-white/10 rounded w-12"></div>
              </div>
              <div className="h-8 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-md w-full flex items-center px-3 gap-2">
                <div className="w-4 h-4 rounded bg-neutral-300 dark:bg-white/20"></div>
                <div className="h-3 bg-neutral-200 dark:bg-white/10 rounded w-20"></div>
              </div>
              <div className="mt-auto">
                <div className="h-8 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-md w-full flex items-center px-3 gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-300 dark:bg-white/20"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-2 bg-neutral-200 dark:bg-white/20 rounded w-20"></div>
                    <div className="h-1.5 bg-neutral-200 dark:bg-white/10 rounded w-12"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="col-span-12 md:col-span-9 flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-white/5">
                <div className="h-6 bg-neutral-200 dark:bg-white/10 rounded w-32"></div>
                <div className="flex gap-2 items-center">
                  <div className="h-8 w-48 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-md"></div>
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-white/10"></div>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-4">
                  <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-white/30 rounded w-8 mb-1"></div>
                  <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-32"></div>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-4">
                  <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-20 mb-3"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-white/30 rounded w-8 mb-1"></div>
                  <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-28"></div>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-4">
                  <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-white/30 rounded w-8 mb-1"></div>
                  <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-32"></div>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-4">
                  <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-white/30 rounded w-8 mb-1"></div>
                  <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-32"></div>
                </div>
              </div>

              {/* Main Content Areas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-full pb-4 md:pb-0">
                {/* Large Chart Area */}
                <div className="col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-4 flex flex-col">
                  <div className="h-4 bg-neutral-200 dark:bg-white/20 rounded w-32 mb-6"></div>
                  <div className="flex-1 relative border-l border-b border-neutral-100 dark:border-white/10">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-blue-500 preserve-aspect-ratio-none" preserveAspectRatio="none">
                      <path d="M0,80 L20,80 L40,80 L60,10 L80,10 L100,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="20" cy="80" r="2" fill="currentColor" />
                      <circle cx="40" cy="80" r="2" fill="currentColor" />
                      <circle cx="60" cy="10" r="2" fill="currentColor" />
                      <circle cx="80" cy="10" r="2" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                
                {/* Small Status Area */}
                <div className="col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-[10px] border-neutral-100 dark:border-neutral-800 relative">
                    <div className="absolute inset-0 rounded-full border-[10px] border-blue-500" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="h-4 bg-neutral-300 dark:bg-white/30 rounded w-6"></div>
                      <div className="h-2 bg-neutral-200 dark:bg-white/10 rounded w-8 mt-1"></div>
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><div className="h-2 bg-neutral-200 dark:bg-white/10 rounded w-16"></div></div>
                      <div className="h-2 bg-neutral-200 dark:bg-white/20 rounded w-4"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><div className="h-2 bg-neutral-200 dark:bg-white/10 rounded w-12"></div></div>
                      <div className="h-2 bg-neutral-200 dark:bg-white/20 rounded w-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
