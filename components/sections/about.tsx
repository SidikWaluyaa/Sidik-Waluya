"use client";

import { motion } from "framer-motion";
import { User, Code, Palette, Rocket } from "lucide-react";

const stats = [
  { label: "Years Exp.", value: "8+", icon: User },
  { label: "Projects", value: "50+", icon: Rocket },
  { label: "Clients", value: "30+", icon: Palette },
  { label: "Commits", value: "2k+", icon: Code },
];

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Bridging the gap between <br />
                <span className="text-primary">Design & Technology.</span>
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-6">
              I&apos;m a Fullstack Developer and UI/UX Designer specialized in building 
                I create seamless digital experiences. With a deep understanding of user psychology 
                and advanced engineering patterns, I deliver products that are beautiful, 
                scalable, and performance-driven.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                My approach is data-informed and human-centric. Whether it&apos;s a complex SaaS dashboard 
                or a sleek luxury rebrand, I focus on creating value through exceptional 
                craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl glass-dark border border-white/5">
                  <stat.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-foreground/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden glass"
          >
             {/* Profile image placeholder or abstract design */}
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-black text-white/10">PS</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
