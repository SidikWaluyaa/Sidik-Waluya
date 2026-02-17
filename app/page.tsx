import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ProjectCard } from "@/components/cards/project-card";

import { Project } from "@/lib/validations";

// Temporary mock data
const FEATURED_PROJECTS: Project[] = [
  {
    id: "66270b21-8280-4965-b74c-42cb44e83204",
    title: "Luxury E-Commerce Rebranding",
    slug: "luxury-ecommerce",
    category: "Product Design",
    short_description: "A complete overhaul of the shopping experience for a high-end fashion brand, focusing on minimalism and performance.",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    thumbnail_url: null,
    gallery: [],
    is_featured: true,
    is_published: true,
  },
  {
    id: "3e51a66a-bcf2-4c92-95f2-956898f98642",
    title: "SaaS Analytics Dashboard",
    slug: "saas-analytics",
    category: "Fullstack Development",
    short_description: "Building a complex real-time analytics dashboard with data visualization and complex filtering.",
    tech_stack: ["React", "Supabase", "Chart.js"],
    thumbnail_url: null,
    gallery: [],
    is_featured: true,
    is_published: true,
  },
  {
    id: "a09be693-02f8-48b4-82a9-06789b7b620a",
    title: "FinTech Mobile App Design",
    slug: "fintech-app",
    category: "UI/UX Design",
    short_description: "User research and interface design for a modern banking app targetted at Gen Z users.",
    tech_stack: ["Figma", "Framer", "Prototyping"],
    thumbnail_url: null,
    gallery: [],
    is_featured: true,
    is_published: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      
      {/* Featured Projects Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
              <p className="text-foreground/60 max-w-xl">
                A selection of my recent projects where design meets code. 
                Each piece is crafted with a focus on detail and user experience.
              </p>
            </div>
            <Link href="/projects" className="text-primary font-bold hover:underline flex items-center gap-2">
              All Projects <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project as Project & { id: string }} 
                index={idx} 
              />
            ))}
          </div>
        </div>
      </section>

      <Contact />

      <footer className="py-12 border-t border-white/10 text-center text-sm text-foreground/40">
        <p>© {new Date().getFullYear()} PortoSidik. All rights reserved.</p>
      </footer>
    </main>
  );
}
