"use client";

import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    { number: "01", title: "Create Workspace", description: "Set up your dedicated environment in seconds." },
    { number: "02", title: "Invite Team Members", description: "Send secure invites to your collaborators." },
    { number: "03", title: "Assign Roles", description: "Granular access control from Admin to Guest." },
    { number: "04", title: "Track Progress", description: "Manage tasks across dynamic Kanban boards." },
    { number: "05", title: "Deliver Faster", description: "Ship your projects on time with full visibility." },
  ];

  return (
    <section className="py-32 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">How It Works</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">From signup to shipping, TaskFlow makes your team's workflow effortless.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-white/20 to-transparent hidden lg:block -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Number Circle */}
                <div className="w-16 h-16 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 relative z-10 group-hover:border-blue-500 transition-colors duration-300 shadow-sm dark:shadow-none">
                  <span className="text-xl font-bold text-neutral-400 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">{step.number}</span>
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
