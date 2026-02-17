import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen pt-32 pb-24">
      <Navbar />
      <div className="container mx-auto px-6">
        <header className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Insights & <br /> <span className="text-gradient">Narratives.</span></h1>
          <p className="text-foreground/60 text-lg">
            Thoughts on design, development, and the future of technology. 
            Occasionally sharing some behind-the-scenes of my process.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles?.map((article) => (
            <Link 
              key={article.id} 
              href={`/blog/${article.slug}`}
              className="group space-y-6"
            >
              <div className="aspect-[16/9] relative overflow-hidden rounded-2xl glass-dark border border-white/5">
                {article.cover_url ? (
                  <Image 
                    src={article.cover_url}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-foreground/10 text-4xl font-black">
                     BLOG
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-primary">
                  {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-foreground/60 line-clamp-2 leading-relaxed">
                   Click to read the full article and explore my thoughts on this topic.
                </p>
              </div>
            </Link>
          ))}

          {(!articles || articles.length === 0) && (
             <div className="col-span-full p-20 text-center glass-dark rounded-2xl border border-white/5 italic text-foreground/20">
                The pen is poised, but the ink is still drying. Check back soon for new articles!
             </div>
          )}
        </div>
      </div>
    </main>
  );
}
