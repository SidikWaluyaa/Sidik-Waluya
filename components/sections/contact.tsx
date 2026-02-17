"use client";


import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, type Message } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle } from "lucide-react";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = async (data: Message) => {
    setLoading(true);
    const { error } = await supabase.from("messages").insert(data);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      setIsSubmitted(true);
      setLoading(false);
      reset();
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden glass-dark border border-white/5 grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Info */}
          <div className="p-12 bg-primary/10 flex flex-col justify-between">
             <div>
                <h2 className="text-4xl font-bold mb-6">Let&apos;s build <br /> something <span className="text-primary">epic.</span></h2>
                <p className="text-foreground/60 leading-relaxed mb-8">
                  Have a project in mind or just want to say hi? 
                  Feel free to reach out. I&apos;m always open to discussing new 
                 Let&apos;s build something extraordinary together.
                </p>
             </div>
             <div className="space-y-4">
                <div className="text-sm font-bold uppercase tracking-widest text-foreground/40">Email</div>
                <p className="text-lg font-medium">hello@portosidik.com</p>
             </div>
          </div>

          {/* Right: Form */}
          <div className="p-12 bg-black/40 backdrop-blur-sm relative">
             {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full flex flex-col items-center justify-center text-center space-y-4"
               >
                 <CheckCircle size={64} className="text-secondary" />
                 <h3 className="text-2xl font-bold">Message Sent!</h3>
                 <p className="text-foreground/60">I&apos;ll get back to you as soon as possible.</p>
                 <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send another</Button>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Name</label>
                   <Input {...register("name")} placeholder="Your name" />
                   {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Email</label>
                   <Input {...register("email")} type="email" placeholder="email@example.com" />
                   {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Message</label>
                   <textarea 
                     {...register("message")} 
                     rows={4}
                     className="w-full h-32 px-3 py-2 rounded-md border border-white/10 bg-white/5 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                     placeholder="Tell me about your project..."
                   />
                   {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                 </div>
                 <Button type="submit" variant="premium" className="w-full h-12 group" disabled={loading}>
                   {loading ? "Sending..." : "Send Message"}
                   <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
