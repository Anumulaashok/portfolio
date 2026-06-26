"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { sectionViewport } from "@/lib/viewport";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShinyText } from "@/components/reactbits/ShinyText";

export function FeedbackSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xqkjblnl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Feedback Submission from Portfolio",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="feedback" className="section-padding px-6 pb-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading label="Feedback" title="Share Your Thoughts" align="center" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <GlowCard className="mx-auto max-w-2xl">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
                <p className="text-[var(--text-secondary)]">Your feedback has been received. I appreciate your time.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-[var(--accent-violet)] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-[var(--text-secondary)]">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] outline-none transition-colors focus:border-[var(--accent-violet)] focus:bg-[var(--bg)]"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] outline-none transition-colors focus:border-[var(--accent-violet)] focus:bg-[var(--bg)]"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--text-secondary)]">
                    Feedback Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] outline-none transition-colors focus:border-[var(--accent-violet)] focus:bg-[var(--bg)]"
                    placeholder="Your thoughts, suggestions, or comments..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                )}

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-colors font-display bg-[var(--accent-violet)] text-white hover:bg-[#7c3aed] disabled:opacity-50 min-w-[140px]"
                  >
                    {status === "submitting" ? (
                      <ShinyText text="Sending..." color="#ffffff" shineColor="#d8b4fe" speed={2} />
                    ) : (
                      "Send Feedback"
                    )}
                  </button>
                </div>
              </form>
            )}
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
