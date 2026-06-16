"use client";

import { motion } from "framer-motion";
import { Sparkles, Bell, Smartphone, PieChart } from "lucide-react";

export function Roadmap() {
  const futureFeatures = [
    { icon: <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />, title: "AI Task Suggestions" },
    { icon: <Bell className="w-5 h-5 text-rose-500 dark:text-rose-400" />, title: "Smart Notifications" },
    { icon: <PieChart className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />, title: "Advanced Analytics" },
    { icon: <Smartphone className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />, title: "Mobile Application" },
  ];

  return (
    <section className="py-32 bg-neutral-50 dark:bg-neutral-950 relative border-t border-neutral-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            Future Roadmap
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            We're just getting started
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Here's a sneak peek at what's coming next to TaskFlow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futureFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4 text-left hover:border-neutral-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-200 dark:border-white/5 shadow-sm dark:shadow-none">
                {feature.icon}
              </div>
              <h3 className="text-neutral-900 dark:text-white font-medium">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
