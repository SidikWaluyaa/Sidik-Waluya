import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/project-card";
import { Project } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-foreground/40">Manage your portfolio items.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button variant="premium">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl glass-dark border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">Title</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">Category</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-foreground/20 italic">
                  No projects found. Start by adding one!
                </td>
              </tr>
            ) : (
              projects?.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{project.title}</div>
                    <div className="text-xs text-foreground/40">{project.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/60">{project.category}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                      project.is_published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {project.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
