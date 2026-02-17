import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-24">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[70vh] w-full pt-16">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        
        <div className="absolute bottom-20 left-0 right-0">
          <div className="container mx-auto px-6">
            <Link 
              href="/projects" 
              className="text-sm font-medium text-white/60 hover:text-white flex items-center gap-2 mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Archive
            </Link>
            <div className="flex flex-wrap gap-2 mb-6">
               {(project.tech_stack || []).map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold">
                    {tech}
                  </span>
               ))}
            </div>
            <h1 className="text-4xl md:text-7xl font-black">{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Case Study Content Wrapper */}
      <section className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Overview */}
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Overview</h2>
              <p className="text-foreground/60 text-lg leading-relaxed">
                {project.short_description}
              </p>
            </div>

            <div className="space-y-6">
               <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Problem Statement</h2>
               <div className="text-foreground/60 prose prose-invert max-w-none">
                  {/* Detailed markdown-rendered content would go here */}
                  <p>In this project, we discovered several pain points that needed to be addressed...</p>
               </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">The Solution</h2>
               <div className="text-foreground/60 prose prose-invert max-w-none">
                  {project.content || "Implementation details following soon."}
               </div>
            </div>
          </div>

          {/* Right: Meta Info */}
          <div className="lg:col-span-4">
             <div className="sticky top-32 p-8 rounded-2xl glass-dark border border-white/5 space-y-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Category</h4>
                  <p className="font-medium">{project.category}</p>
                </div>
                <div>
                   <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Year</h4>
                   <p className="font-medium">{new Date(project.created_at).getFullYear()}</p>
                </div>
                <div>
                   <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Project URL</h4>
                   <Button variant="outline" className="w-full justify-between group">
                      Visit Site
                      <ExternalLink size={16} className="group-hover:text-primary transition-colors" />
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
