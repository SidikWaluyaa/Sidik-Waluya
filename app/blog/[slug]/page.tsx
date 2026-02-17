import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-24">
      <Navbar />
      
      <article className="pt-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link 
            href="/blog" 
            className="text-sm font-medium text-foreground/40 hover:text-white flex items-center gap-2 mb-12 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <header className="space-y-8 mb-16 text-center">
             <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-foreground/40">
                <div className="flex items-center gap-2">
                   <Calendar size={14} />
                   {new Date(article.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                   <Clock size={14} />
                   5 min read
                </div>
             </div>
             <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
               {article.title}
             </h1>
          </header>

          <div className="aspect-[21/9] relative rounded-3xl overflow-hidden mb-16 glass-dark border border-white/5">
            {article.cover_url ? (
              <Image 
                src={article.cover_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
            )}
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-p:text-foreground/80 prose-p:leading-relaxed">
             {article.content || "Content is being drafted."}
          </div>
        </div>
      </article>
    </main>
  );
}
