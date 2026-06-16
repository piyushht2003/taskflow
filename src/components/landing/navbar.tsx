"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function LandingNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">TaskFlow</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <Link href="/dashboard" className="relative group hidden sm:block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative px-6 py-2 bg-white dark:bg-neutral-950 rounded-full leading-none flex items-center">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">Go to Dashboard</span>
                </div>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors hidden sm:block">
                  Login
                </Link>
                <Link href="/register" className="relative group hidden sm:block">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative px-6 py-2 bg-white dark:bg-neutral-950 rounded-full leading-none flex items-center">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">Get Started</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-neutral-600 dark:text-neutral-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-950 border-b border-white/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-neutral-200 dark:bg-white/10 w-full my-2"></div>
              {isLoggedIn ? (
                <Link 
                  href="/dashboard" 
                  className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-center rounded-full font-semibold"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/login" 
                    className="w-full py-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-center rounded-full font-semibold border border-neutral-200 dark:border-white/10"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-center rounded-full font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
