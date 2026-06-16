"use client";

import { motion } from "framer-motion";
import { Rocket, GraduationCap, Code2, Briefcase, Globe } from "lucide-react";

export function BuiltFor() {
  const audiences = [
    {
      icon: <Rocket className="w-8 h-8 text-orange-500" />,
      title: "Startups",
      description: "Move fast, stay aligned, and ship your MVP without getting bogged down by clunky Jira boards.",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      title: "Student Teams",
      description: "Manage group projects easily. Free tier gives you everything you need to ace your finals.",
    },
    {
      icon: <Code2 className="w-8 h-8 text-green-500" />,
      title: "Hackathons",
      description: "The perfect weekend warrior tool. Setup in 10 seconds, track tasks instantly.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      title: "Small Businesses",
      description: "Organize client work, track deliverables, and manage your small team efficiently.",
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      title: "Remote Teams",
      description: "Bridge the timezone gap with asynchronous updates and a clear source of truth.",
    },
  ];

  return (
    <section className="py-32 bg-white dark:bg-neutral-950 relative border-t border-neutral-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            Built for modern teams
          </motion.h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">Whether you're building the next unicorn or submitting a final project, TaskFlow scales with you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-white/10 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm dark:shadow-none">
                {a.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">{a.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{a.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
