"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export function WhyTaskflow() {
  const comparisons = [
    {
      traditional: "Endless chat threads to find a single file",
      taskflow: "Centralized workspace with everything in context",
    },
    {
      traditional: "No visibility into who is working on what",
      taskflow: "Real-time presence and active task tracking",
    },
    {
      traditional: "Manual updates across multiple spreadsheets",
      taskflow: "Automated status updates and synchronized boards",
    },
    {
      traditional: "Confusing ownership and dropped tasks",
      taskflow: "Clear assignees, deadlines, and notifications",
    },
  ];

  return (
    <section className="py-32 bg-neutral-50 dark:bg-neutral-950 relative border-t border-neutral-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            Why Choose TaskFlow?
          </motion.h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">Leave the archaic tools behind. Experience the difference of a platform built for speed.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Desktop divider */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-neutral-300 dark:via-white/10 to-transparent -translate-x-1/2"></div>

          {/* Traditional Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-neutral-500 dark:text-neutral-400 mb-8 flex items-center justify-center md:justify-start gap-2">
              Traditional Teams
            </h3>
            {comparisons.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/50 border border-transparent opacity-80 grayscale">
                <X className="w-6 h-6 text-red-500 shrink-0" />
                <p className="text-neutral-600 dark:text-neutral-400">{c.traditional}</p>
              </div>
            ))}
          </motion.div>

          {/* TaskFlow Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8 flex items-center justify-center md:justify-start gap-2">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider font-bold">With TaskFlow</span>
            </h3>
            {comparisons.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-none">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-blue-900 dark:text-blue-100 font-medium">{c.taskflow}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
