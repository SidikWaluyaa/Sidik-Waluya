import { createClient } from "@/lib/supabase/server";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-foreground/40">Inbox for your contact form submissions.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages?.length === 0 ? (
          <div className="p-20 text-center glass-dark rounded-2xl border border-white/5 italic text-foreground/20">
            Your inbox is currently empty.
          </div>
        ) : (
          messages?.map((msg) => (
            <div key={msg.id} className="p-6 rounded-2xl glass-dark border border-white/10 hover:border-primary/50 transition-all group">
              <div className="flex items-start justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                       <Mail size={18} />
                    </div>
                    <div>
                        <div className="font-bold">{msg.name}</div>
                        <div className="text-xs text-foreground/40">{msg.email}</div>
                    </div>
                 </div>
                 <div className="text-xs text-foreground/40">
                    {new Date(msg.created_at).toLocaleDateString()}
                 </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                {msg.message}
              </p>
              <div className="flex justify-end gap-2">
                 <Button variant="ghost" size="sm" className="text-xs">Mark as Read</Button>
                 <Button variant="ghost" size="sm" className="text-xs text-red-400">Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
