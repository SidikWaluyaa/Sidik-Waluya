"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, type Project } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      tech_stack: [],
      is_featured: false,
      is_published: false,
    },
  });

  const onSubmit = async (data: Project) => {
    setLoading(true);
    const { error } = await supabase.from("projects").insert(data);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard/projects");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href="/dashboard/projects" 
        className="text-sm text-foreground/40 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
        <p className="text-foreground/40">Create a new entry for your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-8 rounded-2xl glass-dark border border-white/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title</label>
              <Input {...register("title")} placeholder="e.g. Luxury E-Commerce" />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input {...register("slug")} placeholder="e.g. luxury-ecommerce" />
              {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input {...register("category")} placeholder="e.g. Product Design" />
              {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <Input {...register("short_description")} placeholder="Brief overview..." />
              {errors.short_description && <p className="text-xs text-red-400">{errors.short_description.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content / Case Study</label>
            <textarea 
              {...register("content")} 
              rows={8}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all"
              placeholder="Detailed case study content in markdown..."
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register("is_featured")} className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary" />
              <span className="text-sm">Featured Project</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register("is_published")} className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary" />
              <span className="text-sm">Published</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
           <Link href="/dashboard/projects">
              <Button variant="ghost">Cancel</Button>
           </Link>
           <Button type="submit" variant="premium" disabled={loading}>
             {loading ? "Creating..." : "Create Project"}
           </Button>
        </div>
      </form>
    </div>
  );
}
