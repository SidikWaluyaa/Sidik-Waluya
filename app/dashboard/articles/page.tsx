import Link from "next/link";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ArticlesDashboardPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Articles</h1>
          <p className="text-foreground/40">Manage your blog posts and insights.</p>
        </div>
        <Link href="/dashboard/articles/new">
          <Button variant="premium">
            <Plus className="w-4 h-4 mr-2" />
            Write Article
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl glass-dark border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">Article</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">Created</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {articles?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-foreground/20 italic">
                  No articles found. Time to write something inspiring!
                </td>
              </tr>
            ) : (
              articles?.map((article) => (
                <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileText size={16} />
                       </div>
                       <div>
                          <div className="font-semibold">{article.title}</div>
                          <div className="text-xs text-foreground/40">{article.slug}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                      article.is_published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {article.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/60">
                    {new Date(article.created_at).toLocaleDateString()}
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
