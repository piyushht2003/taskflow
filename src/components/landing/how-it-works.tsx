"use client";

import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    { 
      title: "Create Workspace", 
      description: "Set up your environment in seconds.",
      // Pixel House / Castle
      icon: (
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-8 h-8">
          <div className="col-start-4 bg-blue-500"></div>
          <div className="col-start-3 col-span-3 bg-blue-500"></div>
          <div className="col-start-2 col-span-5 bg-blue-500"></div>
          <div className="col-span-7 bg-blue-500"></div>
          <div className="col-start-2 col-span-5 bg-indigo-500"></div>
          <div className="col-start-2 col-span-5 bg-indigo-500"></div>
          <div className="col-start-2 col-span-5 bg-indigo-500"></div>
        </div>
      )
    },
    { 
      title: "Invite Team Members", 
      description: "Send secure invites to collaborators.",
      // Pixel Person / Hero
      icon: (
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-8 h-8">
          <div className="col-start-3 col-span-3 bg-pink-400"></div>
          <div className="col-start-2 col-span-5 bg-pink-400"></div>
          <div className="col-start-3 col-span-3 bg-pink-400"></div>
          <div className="col-start-4 bg-pink-500"></div>
          <div className="col-start-2 col-span-5 bg-purple-500"></div>
          <div className="col-span-7 bg-purple-500"></div>
          <div className="col-span-7 bg-purple-500"></div>
        </div>
      )
    },
    { 
      title: "Assign Roles", 
      description: "Granular access from Admin to Guest.",
      // Pixel Shield
      icon: (
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-8 h-8">
          <div className="col-span-7 bg-yellow-500"></div>
          <div className="col-span-7 bg-yellow-500"></div>
          <div className="col-span-7 bg-yellow-500"></div>
          <div className="col-start-2 col-span-5 bg-yellow-500"></div>
          <div className="col-start-3 col-span-3 bg-yellow-500"></div>
          <div className="col-start-4 bg-yellow-500"></div>
        </div>
      )
    },
    { 
      title: "Track Progress", 
      description: "Manage tasks across Kanban boards.",
      // Pixel Sword
      icon: (
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-8 h-8">
          <div className="col-start-7 bg-teal-400"></div>
          <div className="col-start-6 bg-teal-400"></div>
          <div className="col-start-5 bg-teal-400"></div>
          <div className="col-start-4 bg-teal-400"></div>
          <div className="col-start-3 col-span-3 bg-neutral-500"></div>
          <div className="col-start-2 bg-neutral-600"></div>
          <div className="col-start-1 bg-yellow-600"></div>
        </div>
      )
    },
    { 
      title: "Deliver Faster", 
      description: "Ship projects on time with full visibility.",
      // Pixel Potion
      icon: (
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-8 h-8">
          <div className="col-start-3 col-span-3 bg-neutral-500"></div>
          <div className="col-start-4 bg-green-400"></div>
          <div className="col-start-3 col-span-3 bg-neutral-300"></div>
          <div className="col-start-2 col-span-5 bg-green-500"></div>
          <div className="col-span-7 bg-green-500"></div>
          <div className="col-span-7 bg-green-500"></div>
          <div className="col-start-2 col-span-5 bg-green-600"></div>
        </div>
      )
    },
  ];

  return (
    <section className="py-32 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-white/20 to-transparent hidden lg:block -translate-y-[40px]"></div>
          
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
                {/* Icon Container */}
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-neutral-900 border-4 border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 relative z-10 group-hover:border-blue-500 transition-colors duration-300 shadow-sm dark:shadow-none group-hover:-translate-y-2 transform">
                  {step.icon}
                  <div className="absolute inset-0 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
