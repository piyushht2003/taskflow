"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Kanban Board", image: "/images/screenshots/kanban.png" },
    { name: "Analytics Dashboard", image: "/images/screenshots/analytics.png" },
    { name: "Project Creation", image: "/images/screenshots/create-project.png" },
    { name: "Team Onboarding", image: "/images/screenshots/welcome.png" },
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 top-12 overflow-hidden bg-neutral-50 dark:bg-neutral-950 p-6 flex flex-col"
              >
                {activeTab === 0 && <KanbanMockup />}
                {activeTab === 1 && <AnalyticsMockup />}
                {activeTab === 2 && <ProjectCreationMockup />}
                {activeTab === 3 && <OnboardingMockup />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function KanbanMockup() {
  return (
    <div className="flex-1 flex gap-4 w-full h-full p-2">
      {[
        { title: "To Do", count: 3, color: "bg-neutral-500" },
        { title: "In Progress", count: 2, color: "bg-blue-500" },
        { title: "Done", count: 4, color: "bg-green-500" }
      ].map(col => (
        <div key={col.title} className="flex-1 bg-white/50 dark:bg-neutral-900/50 rounded-lg p-3 flex flex-col border border-neutral-200 dark:border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
            <div className="font-semibold text-sm text-neutral-700 dark:text-neutral-300">{col.title}</div>
            <div className="ml-auto bg-neutral-200 dark:bg-neutral-800 text-xs px-2 py-0.5 rounded-full">{col.count}</div>
          </div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="bg-white dark:bg-neutral-950 p-3 rounded shadow-sm border border-neutral-200 dark:border-white/5">
                <div className="h-4 bg-neutral-200 dark:bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-100 dark:bg-white/5 rounded w-full mb-3"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 w-12 bg-neutral-200 dark:bg-white/10 rounded-full"></div>
                  <div className="w-6 h-6 rounded-full bg-neutral-300 dark:bg-white/20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div className="flex-1 grid grid-cols-2 gap-4 h-full">
      <div className="col-span-2 md:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-xl p-6 flex flex-col">
        <div className="h-5 bg-neutral-200 dark:bg-white/20 rounded w-1/3 mb-8"></div>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-40 h-40 rounded-full border-[15px] border-neutral-100 dark:border-neutral-800"></div>
          <div className="absolute w-40 h-40 rounded-full border-[15px] border-blue-500" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%)" }}></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-neutral-800 dark:text-white">75%</div>
            <div className="text-sm text-neutral-500">Completion</div>
          </div>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
        {[1, 2].map(i => (
          <div key={i} className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-xl p-5 flex flex-col">
             <div className="h-4 bg-neutral-200 dark:bg-white/20 rounded w-1/2 mb-4"></div>
             <div className="flex items-end flex-1 gap-2 mt-auto">
                {[40, 70, 45, 90, 60, 80, 50].map((h, j) => (
                  <div key={j} className="flex-1 bg-blue-500/80 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCreationMockup() {
  return (
    <div className="flex-1 flex items-center justify-center w-full h-full">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
           <div className="h-6 bg-neutral-800 dark:bg-white rounded w-1/3"></div>
           <div className="w-6 h-6 bg-neutral-200 dark:bg-white/10 rounded-full"></div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="h-4 bg-neutral-300 dark:bg-white/30 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-neutral-300 dark:bg-white/30 rounded w-1/5 mb-2"></div>
            <div className="h-24 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded w-full"></div>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <div className="h-10 w-20 bg-neutral-200 dark:bg-white/10 rounded"></div>
            <div className="h-10 w-32 bg-blue-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingMockup() {
  return (
    <div className="flex-1 flex items-center justify-center w-full h-full relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
       <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
         <div className="flex-1 p-8 bg-blue-50 dark:bg-blue-900/10 flex flex-col items-center justify-center text-center border-r border-neutral-200 dark:border-white/5">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <div className="h-6 bg-neutral-800 dark:bg-white rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-neutral-400 dark:bg-neutral-500 rounded w-full mb-8"></div>
            <div className="h-12 w-full bg-blue-600 rounded-lg shadow-md"></div>
         </div>
         <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-2xl flex items-center justify-center mb-6">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div className="h-6 bg-neutral-800 dark:bg-white rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-neutral-400 dark:bg-neutral-500 rounded w-full mb-8"></div>
            <div className="h-12 w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg flex items-center px-4">
              <div className="w-4 h-4 rounded bg-neutral-400 dark:bg-neutral-600 mr-2"></div>
              <div className="h-3 w-1/2 bg-neutral-300 dark:bg-white/20 rounded"></div>
            </div>
         </div>
       </div>
    </div>
  );
}
