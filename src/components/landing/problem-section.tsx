"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, FileWarning } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: "Endless Status Meetings",
      description: "Hours wasted trying to figure out who is working on what.",
    },
    {
      icon: <FileWarning className="w-6 h-6 text-orange-500" />,
      title: "Scattered Context",
      description: "Requirements in Docs, feedback in Slack, tasks in another app.",
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
      title: "Missed Deadlines",
      description: "Lack of visibility leads to delayed launches and frustrated clients.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-neutral-950">
      {/* Background Pixel Bug Illustration */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none -translate-y-1/2 opacity-10 dark:opacity-20 flex items-center justify-start -ml-32">
        <div className="grid grid-cols-11 grid-rows-10 gap-2 w-96 h-96">
          <div className="col-start-3 bg-red-500"></div><div className="col-start-9 bg-red-500"></div>
          <div className="col-start-4 bg-red-500"></div><div className="col-start-8 bg-red-500"></div>
          <div className="col-span-11 bg-red-500 col-start-1"></div>
          <div className="col-span-3 bg-red-500 col-start-1"></div><div className="col-start-4 bg-transparent"></div><div className="col-span-3 bg-red-500 col-start-5"></div><div className="col-start-8 bg-transparent"></div><div className="col-span-3 bg-red-500 col-start-9"></div>
          <div className="col-span-11 bg-red-500 col-start-1"></div>
          <div className="col-start-3 bg-red-500"></div><div className="col-span-5 bg-red-500 col-start-4"></div><div className="col-start-9 bg-red-500"></div>
          <div className="col-start-2 bg-red-500"></div><div className="col-start-10 bg-red-500"></div>
          <div className="col-start-1 bg-red-500"></div><div className="col-start-11 bg-red-500"></div>
          <div className="col-start-4 bg-red-500"></div><div className="col-start-8 bg-red-500"></div>
          <div className="col-start-3 bg-red-500"></div><div className="col-start-9 bg-red-500"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white"
          >
            The old way of working is broken.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Traditional project management tools are either too simple to be useful, or so complex they require a certification to use.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-red-500/10 p-8 rounded-2xl relative overflow-hidden group shadow-sm dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 dark:opacity-10 dark:group-hover:opacity-20 transition-opacity" />
              <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{problem.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
