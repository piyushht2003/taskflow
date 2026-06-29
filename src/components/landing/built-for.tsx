"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function BuiltFor() {
  return (
    <section className="py-32 bg-neutral-100 dark:bg-neutral-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            Built For All<br />
            Business Sizes
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center bg-white dark:bg-neutral-800 p-1 rounded-full border border-neutral-200 dark:border-white/10"
          >
            <button className="px-6 py-2 text-sm font-semibold bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-full shadow-sm">Students</button>
            <button className="px-6 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-full">Professionals</button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-950 rounded-3xl p-8 border border-neutral-200 dark:border-white/10 flex flex-col"
          >
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center border border-neutral-300 dark:border-neutral-700">
                {/* Pixel Book/Apple */}
                <div className="grid grid-cols-3 grid-rows-3 gap-[1px] w-4 h-4">
                  <div className="col-start-2 bg-red-500"></div>
                  <div className="col-start-1 col-span-3 bg-red-500"></div>
                  <div className="col-start-1 col-span-3 bg-red-500"></div>
                </div>
              </div>
              Students
            </h3>
            <p className="text-xs text-neutral-500 mb-8">For individuals and class group projects</p>
            <div className="mb-8 flex flex-col gap-1">
              <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">Learn & Grow</span>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">100% Free Open-Source</span>
            </div>
            <Link href="/register" className="w-full py-3 bg-neutral-900 dark:bg-neutral-800 text-white text-sm font-semibold rounded-lg text-center hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors mb-8">
              Start For Free
            </Link>
            <div className="mt-auto">
              <p className="text-xs font-bold text-neutral-900 dark:text-white mb-4">What's included:</p>
              <ul className="space-y-3">
                {["Unlimited personal tasks", "Basic Kanban boards", "Standard priority sorting", "Single-device sync", "Community forums"].map((f, i) => (
                  <li key={i} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-950 rounded-3xl p-8 border border-neutral-200 dark:border-white/10 flex flex-col"
          >
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
                {/* Pixel Coffee Cup */}
                <div className="grid grid-cols-4 grid-rows-3 gap-[1px] w-4 h-3">
                   <div className="col-start-1 col-span-3 bg-neutral-800 dark:bg-neutral-300"></div>
                   <div className="col-start-1 col-span-3 bg-neutral-800 dark:bg-neutral-300"></div>
                   <div className="col-start-2 col-span-1 bg-neutral-800 dark:bg-neutral-300"></div>
                   <div className="col-start-4 row-start-1 row-span-2 bg-neutral-400 dark:bg-neutral-600"></div>
                </div>
              </div>
              Freelancers
            </h3>
            <p className="text-xs text-neutral-500 mb-8">For solo professionals managing clients</p>
            <div className="mb-8 flex flex-col gap-1">
              <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">Boost Output</span>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Streamline client work</span>
            </div>
            <Link href="/register" className="w-full py-3 bg-neutral-900 dark:bg-neutral-800 text-white text-sm font-semibold rounded-lg text-center hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors mb-8">
              Start Free Trial
            </Link>
            <div className="mt-auto">
              <p className="text-xs font-bold text-neutral-900 dark:text-white mb-4">What's included:</p>
              <ul className="space-y-3">
                {["Multiple project workspaces", "Client view permissions", "Smart recurring tasks", "Cross-platform realtime sync", "Email support"].map((f, i) => (
                  <li key={i} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 3 (Highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900 dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-800 dark:border-neutral-700 flex flex-col relative overflow-hidden text-white"
          >
             {/* Corner Decoration */}
             <div className="absolute top-0 right-0 w-16 h-16 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwdjIwaDIwdjIwaDIwdjIwaDIwdjIwaDIwVjB6Ii8+PC9zdmc+')] bg-cover bg-no-repeat"></div>
             
            <h3 className="text-lg font-bold mb-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-neutral-800 dark:bg-neutral-950 flex flex-col items-center justify-center border border-neutral-700">
                {/* Pixel Crown */}
                <div className="grid grid-cols-5 grid-rows-3 gap-[1px] w-5 h-3">
                  <div className="col-start-1 bg-yellow-400"></div><div className="col-start-3 bg-yellow-400"></div><div className="col-start-5 bg-yellow-400"></div>
                  <div className="col-span-5 bg-yellow-400"></div>
                  <div className="col-span-5 bg-yellow-500"></div>
                </div>
              </div>
              Startups & Teams
            </h3>
            <p className="text-xs text-neutral-400 mb-8">Businesses that collaborate daily</p>
            <div className="mb-8 flex flex-col gap-1">
              <span className="text-2xl font-extrabold">Scale Workflow</span>
              <span className="text-sm text-yellow-400 font-medium">Enterprise-grade tools</span>
            </div>
            <Link href="/register" className="w-full py-3 bg-white text-neutral-900 text-sm font-semibold rounded-lg text-center hover:bg-neutral-100 transition-colors mb-8">
              Create Team Workspace
            </Link>
            <div className="mt-auto">
              <p className="text-xs font-bold mb-4">What's included:</p>
              <ul className="space-y-3">
                {["Unlimited team members", "Role-based access control", "Real-time project tracking", "Admin audit logs & reporting", "Open-source codebase"].map((f, i) => (
                  <li key={i} className="text-xs text-neutral-300 flex items-center gap-2">
                    <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
