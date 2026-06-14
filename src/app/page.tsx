import Link from "next/link"
import { ArrowRight, CheckCircle2, Layout, Zap, Users, Shield } from "lucide-react"
import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  
  // Temporarily redirect to login instead of showing landing page
  redirect("/login");
  
  const isLoggedIn = !!session?.user;
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800/50 bg-neutral-950/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Layout className="size-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link 
                href="/dashboard" 
                className="text-sm font-medium bg-white text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="text-sm font-medium bg-white text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-neutral-950 to-neutral-950"></div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            TaskFlow 1.0 is now live
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
            Manage your projects <br className="hidden lg:block" />
            at the speed of thought.
          </h1>
          <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            The ultimate project management tool designed for modern teams. Streamline workflows, track progress in real-time, and ship faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <Link 
              href="/register" 
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">Start for free <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <Link 
              href="#pricing" 
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Abstract App UI Mockup */}
        <div className="relative mx-auto max-w-5xl px-6 mt-20">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 bottom-0 h-40"></div>
          
          <div className="rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-4 lg:p-6 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Window Controls */}
            <div className="flex items-center gap-2 mb-6 px-2">
              <div className="size-3 rounded-full bg-red-500/80"></div>
              <div className="size-3 rounded-full bg-yellow-500/80"></div>
              <div className="size-3 rounded-full bg-green-500/80"></div>
              <div className="ml-4 h-6 w-64 bg-neutral-800/50 rounded-md"></div>
            </div>

            {/* Kanban Board Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
              {/* Column 1: To Do */}
              <div className="bg-neutral-900/40 rounded-xl p-4 border border-neutral-800/50 flex flex-col gap-4 h-full min-h-[300px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-300 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> To Do
                  </h3>
                  <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">3</span>
                </div>
                
                {/* Task Card 1 */}
                <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/50 shadow-sm animate-[pulse_4s_ease-in-out_infinite]">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-red-400 bg-red-400/10 px-2 py-0.5 rounded">High</span>
                  </div>
                  <h4 className="text-sm font-medium text-neutral-200 mb-2">Design new landing page</h4>
                  <div className="w-full h-1.5 bg-neutral-700 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/4 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full border-2 border-neutral-800 bg-blue-600"></div>
                      <div className="size-6 rounded-full border-2 border-neutral-800 bg-purple-600"></div>
                    </div>
                  </div>
                </div>

                {/* Task Card 2 */}
                <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/50 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">Low</span>
                  </div>
                  <h4 className="text-sm font-medium text-neutral-200 mb-2">Setup authentication system</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full border-2 border-neutral-800 bg-emerald-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: In Progress */}
              <div className="bg-neutral-900/40 rounded-xl p-4 border border-neutral-800/50 flex flex-col gap-4 h-full min-h-[300px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-300 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> In Progress
                  </h3>
                  <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">2</span>
                </div>

                {/* Task Card 3 */}
                <div className="bg-neutral-800/80 p-4 rounded-lg border border-neutral-700/50 shadow-sm border-l-2 border-l-blue-500 transform transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">Medium</span>
                  </div>
                  <h4 className="text-sm font-medium text-neutral-200 mb-2">Implement WebSockets</h4>
                  <div className="w-full h-1.5 bg-neutral-700 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full border-2 border-neutral-800 bg-blue-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Done */}
              <div className="bg-neutral-900/40 rounded-xl p-4 border border-neutral-800/50 flex flex-col gap-4 opacity-75 h-full min-h-[300px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-300 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Done
                  </h3>
                  <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">12</span>
                </div>

                {/* Task Card 4 */}
                <div className="bg-neutral-800/40 p-4 rounded-lg border border-neutral-700/30 shadow-sm opacity-60">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-red-400 bg-red-400/10 px-2 py-0.5 rounded">High</span>
                  </div>
                  <h4 className="text-sm font-medium text-neutral-400 line-through mb-2">Initialize Next.js project</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full border-2 border-neutral-800 bg-purple-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Everything you need to ship</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Powerful features that stay out of your way until you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Layout className="size-6 text-blue-400" />}
              title="Intuitive Kanban Boards"
              description="Drag and drop tasks across customizable columns. Visualize your workflow instantly."
            />
            <FeatureCard 
              icon={<Zap className="size-6 text-yellow-400" />}
              title="Real-time Updates"
              description="See changes as they happen. Powered by WebSocket for instant collaboration without refreshing."
            />
            <FeatureCard 
              icon={<Users className="size-6 text-green-400" />}
              title="Team Collaboration"
              description="Assign tasks, leave comments, and keep everyone aligned on project goals."
            />
            <FeatureCard 
              icon={<Shield className="size-6 text-purple-400" />}
              title="Secure by Design"
              description="Enterprise-grade security with robust authentication and role-based access control."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="size-6 text-emerald-400" />}
              title="Progress Tracking"
              description="Monitor task completion rates, deadlines, and project health at a glance."
            />
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-blue-900/20 to-neutral-900 p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold mb-2">And much more...</h3>
              <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 mt-2">
                Join TaskFlow <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-neutral-950 relative border-t border-neutral-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-white">Simple, transparent pricing</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Start for free, upgrade when your team needs more power.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 flex flex-col hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-200">Developer</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                $0
                <span className="ml-1 text-xl font-medium text-neutral-500">/mo</span>
              </div>
              <p className="mt-4 text-sm text-neutral-400">Perfect for individuals and freelancers starting out.</p>
              <ul className="mt-8 space-y-4 flex-1">
                {["Unlimited tasks", "1 Workspace", "Basic Kanban board", "Community support"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-neutral-300">
                    <CheckCircle2 className="size-5 text-blue-500 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block w-full rounded-full border border-neutral-700 bg-neutral-800 py-3 text-center text-sm font-semibold text-white hover:bg-neutral-700 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="rounded-3xl border-2 border-blue-600 bg-blue-950/20 p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_-15px_rgba(37,99,235,0.3)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-blue-400">Pro Manager</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                $12
                <span className="ml-1 text-xl font-medium text-neutral-500">/mo</span>
              </div>
              <p className="mt-4 text-sm text-neutral-400">For growing teams that need more organization.</p>
              <ul className="mt-8 space-y-4 flex-1">
                {["Everything in Developer", "Unlimited Workspaces", "Advanced Analytics", "Priority Support", "File attachments"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle2 className="size-5 text-blue-500 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block w-full rounded-full bg-blue-600 py-3 text-center text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 flex flex-col hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-200">Enterprise</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                $49
                <span className="ml-1 text-xl font-medium text-neutral-500">/mo</span>
              </div>
              <p className="mt-4 text-sm text-neutral-400">Maximum power and security for large organizations.</p>
              <ul className="mt-8 space-y-4 flex-1">
                {["Everything in Pro", "Custom Role Permissions", "SSO Authentication", "Dedicated Account Manager", "99.9% Uptime SLA"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-neutral-300">
                    <CheckCircle2 className="size-5 text-blue-500 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block w-full rounded-full border border-neutral-700 bg-neutral-800 py-3 text-center text-sm font-semibold text-white hover:bg-neutral-700 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your workflow?</h2>
          <p className="text-xl text-neutral-400 mb-10">
            Join thousands of teams already using TaskFlow to manage their projects efficiently.
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 bg-white text-neutral-950 px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-all hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Layout className="size-5 text-blue-500" />
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} TaskFlow Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8 hover:bg-neutral-800/50 transition-colors group">
      <div className="size-12 rounded-xl bg-neutral-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-neutral-100">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
