import { Project, Article } from "@/lib/validations";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-foreground/40">Manage your portfolio and content from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-dark border border-white/10">
          <div className="text-sm text-foreground/40 uppercase tracking-wider mb-2">Total Projects</div>
          <div className="text-3xl font-bold">12</div>
        </div>
        <div className="p-6 rounded-2xl glass-dark border border-white/10">
          <div className="text-sm text-foreground/40 uppercase tracking-wider mb-2">Total Articles</div>
          <div className="text-3xl font-bold">5</div>
        </div>
        <div className="p-6 rounded-2xl glass-dark border border-white/10">
          <div className="text-sm text-foreground/40 uppercase tracking-wider mb-2">Messages</div>
          <div className="text-3xl font-bold">3 New</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
         <div className="p-8 rounded-2xl glass-dark border border-white/10 min-h-[300px] flex items-center justify-center text-foreground/20 italic">
            Recent activity chart or list will appear here...
         </div>
      </div>
    </div>
  );
}
