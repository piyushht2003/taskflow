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

      <div className="relative mx-auto max-w-7xl px-6 text-center z-10">
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

      {/* Floating Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
        className="relative mx-auto max-w-5xl px-6 mt-24 w-full"
      >
        <div className="absolute -inset-1 bg-gradient-to-b from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>
        <div className="relative rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl p-2 shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
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
          <div className="grid grid-cols-12 gap-4 p-4 h-[400px]">
            {/* Sidebar */}
            <div className="col-span-3 hidden md:flex flex-col gap-2 border-r border-neutral-200 dark:border-white/5 pr-4">
              <div className="h-8 bg-neutral-200 dark:bg-white/5 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-neutral-100 dark:bg-white/5 rounded w-full"></div>
              <div className="h-6 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 rounded w-5/6"></div>
              <div className="h-6 bg-neutral-100 dark:bg-white/5 rounded w-4/5"></div>
              <div className="h-6 bg-neutral-100 dark:bg-white/5 rounded w-full mt-auto"></div>
            </div>
            {/* Content Area */}
            <div className="col-span-12 md:col-span-9 flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="h-8 bg-neutral-200 dark:bg-white/10 rounded w-1/3"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-white/10"></div>
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-white/10"></div>
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-white/10"></div>
                </div>
              </div>
              {/* Kanban columns */}
              <div className="grid grid-cols-3 gap-4 h-full">
                {/* Column 1 */}
                <div className="bg-neutral-50 dark:bg-white/5 rounded-lg p-3 flex flex-col gap-3">
                  <div className="h-4 bg-neutral-200 dark:bg-white/10 rounded w-1/2 mb-2"></div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-3 border border-neutral-200 dark:border-white/5 h-24 shadow-sm">
                    <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-3/4 mb-4"></div>
                    <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-2/3"></div>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-3 border border-neutral-200 dark:border-white/5 h-24 shadow-sm">
                    <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-1/2 mb-4"></div>
                    <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-full"></div>
                  </div>
                </div>
                {/* Column 2 */}
                <div className="bg-neutral-50 dark:bg-white/5 rounded-lg p-3 flex flex-col gap-3">
                  <div className="h-4 bg-neutral-200 dark:bg-white/10 rounded w-2/3 mb-2"></div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-3 border border-blue-500/30 h-32 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-4/5 mb-4"></div>
                    <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-2 bg-neutral-100 dark:bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
                {/* Column 3 */}
                <div className="bg-neutral-50 dark:bg-white/5 rounded-lg p-3 flex flex-col gap-3 opacity-70 dark:opacity-50">
                  <div className="h-4 bg-neutral-200 dark:bg-white/10 rounded w-1/3 mb-2"></div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-3 border border-neutral-200 dark:border-white/5 h-20 shadow-sm">
                    <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-3/4 mb-4 line-through"></div>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-3 border border-neutral-200 dark:border-white/5 h-20 shadow-sm">
                    <div className="h-3 bg-neutral-200 dark:bg-white/20 rounded w-1/2 mb-4 line-through"></div>
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
