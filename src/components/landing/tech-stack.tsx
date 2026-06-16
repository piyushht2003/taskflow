"use client";

import { motion } from "framer-motion";

export function TechStack() {
  const techs = [
    { name: "Next.js 15", color: "from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400" },
    { name: "TypeScript", color: "from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600" },
    { name: "Prisma", color: "from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-600" },
    { name: "Neon PostgreSQL", color: "from-green-600 to-green-400 dark:from-green-400 dark:to-green-600" },
    { name: "NextAuth", color: "from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-600" },
    { name: "WebSockets", color: "from-orange-500 to-yellow-400 dark:from-yellow-400 dark:to-orange-500" },
    { name: "Tailwind CSS", color: "from-blue-500 to-cyan-400 dark:from-cyan-400 dark:to-blue-500" },
    { name: "Framer Motion", color: "from-rose-500 to-pink-400 dark:from-pink-400 dark:to-rose-500" },
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950 relative border-t border-neutral-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-neutral-50 to-neutral-50 dark:from-blue-900/10 dark:via-neutral-950 dark:to-neutral-950 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-10">
          Powered By Modern Technology
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm dark:shadow-lg cursor-default"
            >
              <span className={`font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
