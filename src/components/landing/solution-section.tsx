"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Clock, Zap, Target, LineChart, LayoutList, Layers } from "lucide-react";

export function SolutionSection() {
  const aiFeatures = [
    { name: "Live Sync", icon: <Layers className="w-3 h-3" /> },
    { name: "Drag & Drop", icon: <Target className="w-3 h-3" /> },
    { name: "Workspaces", icon: <Brain className="w-3 h-3" /> },
    { name: "Role Access", icon: <Clock className="w-3 h-3" /> },
    { name: "Activity Logs", icon: <Sparkles className="w-3 h-3" /> },
    { name: "Dark Mode", icon: <LayoutList className="w-3 h-3" /> },
    { name: "Analytics", icon: <LineChart className="w-3 h-3" /> },
  ];

  return (
    <section id="solutions" className="py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Orbital AI Diagram */}
        <div className="relative w-full max-w-3xl aspect-[2/1] md:aspect-[3/1] flex items-end justify-center mb-16 mt-8 overflow-hidden">
          {/* Main Arcs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-neutral-200 dark:border-white/10"></div>
          
          {/* Center Orb */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col items-center justify-center p-2 z-20"
          >
            {/* Gradient Border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-[2px]">
               <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-full flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">01</span>
                 <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Core Engine</span>
               </div>
            </div>
          </motion.div>
          
          {/* Connecting Lines and Side Nodes (Visual fluff to match design) */}
          <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-200 dark:via-white/10 to-transparent -translate-x-1/2 -translate-y-1/2 z-10"></div>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950 flex flex-col items-center justify-center z-20">
             <span className="text-lg font-bold text-neutral-300 dark:text-neutral-600 rotate-[-90deg]">4</span>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-16 h-16 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950 flex flex-col items-center justify-center z-20">
             <span className="text-lg font-bold text-neutral-300 dark:text-neutral-600 rotate-[90deg]">0</span>
          </div>
        </div>

        {/* Text Section Below Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-lg"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Your Productivity Engine</h2>
        </motion.div>

        {/* Feature Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
        >
          {aiFeatures.map((feature, i) => (
            <div key={i} className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 shadow-sm">
              {feature.icon} {feature.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
