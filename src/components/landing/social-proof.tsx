"use client";

import { motion } from "framer-motion";

export function SocialProof() {
  const metrics = [
    { label: "Real-Time Collaboration", value: "100%" },
    { label: "Multi-Workspace Support", value: "Yes" },
    { label: "Role-Based Access Control", value: "Granular" },
    { label: "Enterprise-Grade Security", value: "Active" },
  ];

  return (
    <section className="py-20 border-y border-neutral-200 dark:border-white/5 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-neutral-500 uppercase tracking-widest mb-10">
          Trusted by modern teams worldwide
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos */}
          {["Acme Corp", "GlobalTech", "Nexus", "Quantum", "Starlight"].map((company, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-xl font-bold font-serif text-neutral-500 dark:text-neutral-400"
            >
              {company}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 shadow-sm dark:shadow-none"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
