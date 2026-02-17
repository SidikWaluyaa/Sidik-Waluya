"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/validations";

interface ProjectCardProps {
  project: Project & { id: string };
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl glass-dark"
    >
      <div className="aspect-video relative overflow-hidden">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">
            No Thumbnail
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.tech_stack || []).slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md bg-primary/20 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
          {project.short_description}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-semibold text-white inline-flex items-center gap-2 group-hover:gap-3 transition-all"
        >
          View Project
          <span className="text-primary">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
