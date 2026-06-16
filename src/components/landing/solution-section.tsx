"use client";

import { motion } from "framer-motion";
import { Kanban, Zap, Users, BarChart, Bell, Activity } from "lucide-react";

export function SolutionSection() {
  const features = [
    {
      icon: <Kanban className="w-6 h-6 text-blue-500" />,
      title: "Real-Time Boards",
      description: "Drag and drop tasks. Changes instantly reflect across your entire team's screens via WebSockets.",
      className: "md:col-span-2",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Built on Next.js 15 and Turbopack for sub-millisecond interactions.",
      className: "md:col-span-1",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Role-Based Access",
      description: "Fine-grained permissions for Owners, Admins, Members, and Guests.",
      className: "md:col-span-1",
    },
    {
      icon: <BarChart className="w-6 h-6 text-green-400" />,
      title: "Analytics & Insights",
      description: "Beautiful charts that automatically track your team's velocity and project health.",
      className: "md:col-span-1",
    },
    {
      icon: <Activity className="w-6 h-6 text-pink-400" />,
      title: "Activity Timeline",
      description: "Keep an audit log of all actions. Know exactly who changed what and when.",
      className: "md:col-span-1",
    },
  ];

  return (
    <section id="solutions" className="py-32 bg-white dark:bg-neutral-950 relative border-t border-neutral-200 dark:border-white/5 transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-100/50 dark:from-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            Everything Your Team Needs <br className="hidden md:block"/> In One Workspace
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            We've built all the essential tools you need to manage your projects effectively, wrapped in a beautiful, lightning-fast interface.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 backdrop-blur-sm p-8 overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-colors shadow-sm dark:shadow-none ${feature.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
