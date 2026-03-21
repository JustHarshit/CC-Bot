"use client";

import { QUICK_ACTIONS, CONTENT_TEMPLATES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Zap, FileText, ChevronRight } from "lucide-react";

interface RightSidebarProps {
  onInsertPrompt: (prompt: string) => void;
}

export default function RightSidebar({ onInsertPrompt }: RightSidebarProps) {
  return (
    <aside
      className="hidden xl:flex flex-col w-64 shrink-0 border-l overflow-y-auto"
      style={{
        background: "var(--bg-sidebar)",
        borderColor: "var(--border)",
      }}
    >
      {/* Quick Actions */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-orange-500" />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Quick Actions
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => onInsertPrompt(action.prompt)}
              className={cn(
                "flex flex-col items-start gap-1 p-2.5 rounded-xl text-left transition-all duration-150",
                "border hover:border-orange-200 dark:hover:border-orange-800",
                "hover:bg-orange-50 dark:hover:bg-orange-950/30 active:scale-95"
              )}
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <span className="text-lg leading-none">{action.emoji}</span>
              <span className="text-[11px] font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={14} className="text-violet-500" />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Templates
          </span>
        </div>
        <div className="space-y-1.5">
          {CONTENT_TEMPLATES.slice(0, 6).map((template) => (
            <button
              key={template.id}
              onClick={() => onInsertPrompt(template.prompt)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-150",
                "hover:bg-[var(--bg-secondary)] active:scale-[0.98] group"
              )}
            >
              <span className="text-base leading-none shrink-0">{template.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  {template.title}
                </p>
                <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                  {template.description}
                </p>
              </div>
              <ChevronRight size={11} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div
          className="rounded-xl p-3 text-xs leading-relaxed"
          style={{
            background: "var(--accent-orange-light)",
            color: "var(--text-secondary)",
          }}
        >
          <span className="font-semibold block mb-1" style={{ color: "var(--accent-orange)" }}>
            💡 Pro Tip
          </span>
          Replace <code className="bg-orange-100 dark:bg-orange-900/40 px-1 rounded text-orange-700 dark:text-orange-300">[YOUR TOPIC]</code> in any template with your specific subject for instant results.
        </div>
      </div>
    </aside>
  );
}
