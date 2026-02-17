import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/navbar";
import { ProjectCard } from "@/components/cards/project-card";
import { Project } from "@/lib/validations";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen pt-32 pb-24">
      <Navbar />
      <div className="container mx-auto px-6">
        <header className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Archive of <br /> <span className="text-gradient">Crafted Experiences.</span></h1>
          <p className="text-foreground/60 text-lg">
            A comprehensive list of projects ranging from brand identities 
            to complex web applications. Each project represents a unique 
            challenge and a tailor-made solution.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, idx) => (
            <ProjectCard key={project.id} project={project as Project & { id: string }} index={idx} />
          ))}
          
          {(!projects || projects.length === 0) && (
             <div className="col-span-full p-20 text-center glass-dark rounded-2xl border border-white/5 italic text-foreground/20">
                More projects are on the way. Stay tuned!
             </div>
          )}
        </div>
      </div>
    </main>
  );
}
