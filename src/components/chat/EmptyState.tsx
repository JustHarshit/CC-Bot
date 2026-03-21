"use client";

import { Sparkles, ChevronRight } from "lucide-react";
import { EXAMPLE_PROMPTS, CONTENT_TEMPLATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
  activeTool?: string | null;
}

export default function EmptyState({ onSelectPrompt, activeTool }: EmptyStateProps) {
  const toolTemplates = activeTool
    ? CONTENT_TEMPLATES.filter((t) => t.category === activeTool).slice(0, 4)
    : [];

  const showPrompts = toolTemplates.length > 0 ? toolTemplates : null;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      {/* Animated bot icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-4xl shadow-glow-orange animate-float">
          🤖
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-[var(--bg-primary)] flex items-center justify-center">
          <span className="text-[10px]">✨</span>
        </div>
      </div>

      <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
        What would you like to create?
      </h2>
      <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        I&apos;m CC Bot, your content creation co-pilot. I can help you brainstorm ideas, write outlines, optimize for SEO, and craft content that actually performs.
      </p>

      {/* Example chips */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl">
        {showPrompts
          ? showPrompts.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelectPrompt(template.prompt)}
                className={cn(
                  "group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border text-left",
                  "transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 active:scale-95"
                )}
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span className="text-lg">{template.icon}</span>
                <div>
                  <div className="font-medium text-xs" style={{ color: "var(--text-primary)" }}>{template.title}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{template.description}</div>
                </div>
                <ChevronRight size={13} className="ml-1 text-[var(--text-muted)] group-hover:text-orange-500 transition-colors" />
              </button>
            ))
          : EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onSelectPrompt(prompt.text)}
                className={cn(
                  "group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border",
                  "transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 active:scale-95"
                )}
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span>{prompt.emoji}</span>
                <span className="text-left max-w-[260px]">{prompt.text}</span>
                <ChevronRight size={13} className="shrink-0 text-[var(--text-muted)] group-hover:text-orange-500 transition-colors" />
              </button>
            ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
        <Sparkles size={12} className="text-orange-400" />
        <span>Powered by GPT-4 · Add your API key in .env.local to start</span>
      </div>
    </div>
  );
}
