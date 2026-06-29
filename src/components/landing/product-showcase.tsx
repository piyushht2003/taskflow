"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ProductShowcase() {
  return (
    <section id="features" className="py-32 bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Workspaces That Adapt To You, <br className="hidden md:block"/>
              Not <span className="text-neutral-400 dark:text-neutral-500">The Other Way Around.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-xs text-neutral-600 dark:text-neutral-400 text-sm"
          >
            <p>TaskFlow isn't just about crossing things off. It's about giving your team the clarity and structure needed to execute brilliant ideas.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden flex flex-col bg-pink-100 dark:bg-pink-900/20"
          >
            <div className="h-64 bg-neutral-900 dark:bg-neutral-950 flex items-center justify-center p-8 relative overflow-hidden">
              {/* Space Invader CSS Pixel Art 1 */}
              <div className="grid grid-cols-11 grid-rows-8 gap-1 w-48 h-32 opacity-90">
                 {/* Row 1 */}
                 <div className="col-start-3 bg-pink-200"></div><div className="col-start-9 bg-pink-200"></div>
                 {/* Row 2 */}
                 <div className="col-start-4 bg-pink-200"></div><div className="col-start-8 bg-pink-200"></div>
                 {/* Row 3 */}
                 <div className="col-span-11 bg-pink-200 col-start-1"></div>
                 {/* Row 4 */}
                 <div className="col-span-3 bg-pink-200 col-start-1"></div><div className="col-start-4 bg-transparent"></div><div className="col-span-3 bg-pink-200 col-start-5"></div><div className="col-start-8 bg-transparent"></div><div className="col-span-3 bg-pink-200 col-start-9"></div>
                 {/* Row 5 */}
                 <div className="col-span-11 bg-pink-200 col-start-1"></div>
                 {/* Row 6 */}
                 <div className="col-start-3 bg-pink-200"></div><div className="col-span-5 bg-pink-200 col-start-4"></div><div className="col-start-9 bg-pink-200"></div>
                 {/* Row 7 */}
                 <div className="col-start-2 bg-pink-200"></div><div className="col-start-10 bg-pink-200"></div>
                 {/* Row 8 */}
                 <div className="col-start-4 bg-pink-200"></div><div className="col-start-8 bg-pink-200"></div>
              </div>
            </div>
            <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 h-full">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-pink-100 mb-2">Real-Time Synchronization</h3>
                <p className="text-neutral-700 dark:text-pink-200/70 text-sm max-w-sm">Watch tasks update instantly across your entire team. No refreshing, no overlapping work, just seamless collaboration.</p>
              </div>
              <Link href="/register" className="shrink-0 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-full hover:scale-105 transition-transform">
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden flex flex-col bg-blue-100 dark:bg-blue-900/20"
          >
            <div className="h-64 bg-neutral-900 dark:bg-neutral-950 flex items-center justify-center p-8 relative overflow-hidden">
              {/* Space Invader CSS Pixel Art 2 */}
              <div className="grid grid-cols-11 grid-rows-8 gap-1 w-48 h-32 opacity-90">
                 {/* Different Invader Pattern */}
                 {/* Row 1 */}
                 <div className="col-start-4 bg-blue-200"></div><div className="col-start-8 bg-blue-200"></div>
                 {/* Row 2 */}
                 <div className="col-start-5 bg-blue-200"></div><div className="col-start-7 bg-blue-200"></div>
                 {/* Row 3 */}
                 <div className="col-span-7 bg-blue-200 col-start-3"></div>
                 {/* Row 4 */}
                 <div className="col-span-2 bg-blue-200 col-start-2"></div><div className="col-start-4 bg-transparent"></div><div className="col-span-3 bg-blue-200 col-start-5"></div><div className="col-start-8 bg-transparent"></div><div className="col-span-2 bg-blue-200 col-start-9"></div>
                 {/* Row 5 */}
                 <div className="col-span-11 bg-blue-200 col-start-1"></div>
                 {/* Row 6 */}
                 <div className="col-span-11 bg-blue-200 col-start-1"></div>
                 {/* Row 7 */}
                 <div className="col-start-2 bg-blue-200"></div><div className="col-start-10 bg-blue-200"></div>
                 {/* Row 8 */}
                 <div className="col-start-3 bg-blue-200"></div><div className="col-start-9 bg-blue-200"></div>
              </div>
            </div>
            <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 h-full">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-blue-100 mb-2">Role-Based Access</h3>
                <p className="text-neutral-700 dark:text-blue-200/70 text-sm max-w-sm">Keep your workspace secure. Easily define who can view, edit, or manage projects with robust role assignments.</p>
              </div>
              <Link href="/register" className="shrink-0 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-full hover:scale-105 transition-transform">
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
