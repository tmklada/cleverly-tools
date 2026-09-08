import { motion } from "framer-motion";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import World from "@/sections/World";
import Products from "@/sections/Products";
import WhyMe from "@/sections/WhyMe";
import HowItWorks from "@/sections/HowItWorks";
import Opportunity from "@/sections/Opportunity";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";
import FloatingWhatsApp from "@/sections/FloatingWhatsApp";
import { a11y } from "@/content/ar";

export default function App() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {a11y.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <World />
        <Products />
        <WhyMe />
        <HowItWorks />
        <Opportunity />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </motion.div>
  );
}
