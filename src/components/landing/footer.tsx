import { Layout } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-950 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Layout className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white">TaskFlow</span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-6">
              The real-time project management platform for modern teams.
            </p>
            <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} TaskFlow Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
