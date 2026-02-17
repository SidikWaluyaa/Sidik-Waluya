"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/5 border border-white/10 rounded-full text-foreground/60">
            Available for new opportunities
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            Elevating Brands through <br />
            <span className="text-gradient">Digital Innovation.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed font-medium">
            Product Designer & Fullstack Developer specializing in building premium 
            digital experiences that combine aesthetics with high-performance code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="premium" className="group">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Download className="mr-2 w-4 h-4" />
              Download CV
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Abstract Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
      >
        <div className="w-1 h-2 bg-primary rounded-full" />
      </motion.div>
    </section>
  );
}
