"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Kanban Board", image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1000&auto=format&fit=crop" },
    { name: "Analytics Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" },
    { name: "Team Management", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" },
    { name: "Activity Logs", image: "https://images.unsplash.com/photo-1507925922893-ce382eb5afbc?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <section id="features" className="py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            Built for modern workflows
          </motion.h2>
        </div>

        <div className="flex flex-col items-center">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-white dark:bg-neutral-900/50 backdrop-blur border border-neutral-200 dark:border-white/10 rounded-full shadow-sm dark:shadow-none">
            {tabs.map((tab, i) => (
               <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === i 
                    ? "text-neutral-900 dark:text-white" 
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                }`}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="activeShowcaseTab"
                    className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full shadow-sm border border-neutral-200 dark:border-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Image Container */}
          <div className="w-full max-w-5xl aspect-video relative rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5 group">
            {/* Browser Dots */}
            <div className="absolute top-0 inset-x-0 h-12 bg-neutral-100/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-white/5 flex items-center px-4 z-20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 top-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-950 mix-blend-overlay"></div>
                <img 
                  src={tabs[activeTab].image} 
                  alt={tabs[activeTab].name} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="absolute inset-0 bg-white/10 dark:bg-neutral-950/40 mix-blend-multiply"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
