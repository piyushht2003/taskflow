import { auth } from "@/auth";
import { LandingNavbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { SocialProof } from "@/components/landing/social-proof";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhyTaskflow } from "@/components/landing/why-taskflow";
import { BuiltFor } from "@/components/landing/built-for";
import { TechStack } from "@/components/landing/tech-stack";
import { Roadmap } from "@/components/landing/roadmap";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-blue-500/30 font-sans transition-colors duration-300">
      <LandingNavbar isLoggedIn={isLoggedIn} />
      
      <main>
        <HeroSection />
        <SocialProof />
        <ProblemSection />
        <SolutionSection />
        <ProductShowcase />
        <HowItWorks />
        <WhyTaskflow />
        <BuiltFor />
        <TechStack />
        <Roadmap />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
