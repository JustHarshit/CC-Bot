"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  MessageSquare,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { SIDEBAR_TOOLS } from "@/lib/constants";
import type { Conversation, ContentTool } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface LeftSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onNewChat: (toolType?: ContentTool) => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  activeTool: ContentTool | null;
  onSelectTool: (tool: ContentTool) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeftSidebar({
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  activeTool,
  onSelectTool,
  isOpen,
  onClose,
}: LeftSidebarProps) {
  const [hoveredConvId, setHoveredConvId] = useState<string | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:relative z-50 md:z-auto h-full flex flex-col transition-transform duration-300",
          "w-64 shrink-0 border-r",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        style={{
          background: "var(--bg-sidebar)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-display font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              CC Bot
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button onClick={onClose} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors">
              <X size={16} style={{ color: "var(--text-muted)" }} />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => onNewChat()}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 active:scale-[0.98] shadow-sm"
          >
            <Plus size={16} />
            New Content
          </button>
        </div>

        {/* Tools menu */}
        <div className="px-3 mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: "var(--text-muted)" }}>
            Tools
          </p>
          <div className="space-y-0.5">
            {SIDEBAR_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool.id);
                  onNewChat(tool.id);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 text-left group",
                  activeTool === tool.id
                    ? "bg-[var(--bg-secondary)] font-medium"
                    : "hover:bg-[var(--bg-secondary)]"
                )}
                style={{ color: activeTool === tool.id ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                <span className="text-base leading-none">{tool.icon}</span>
                <span className="flex-1 truncate">{tool.label}</span>
                {activeTool === tool.id && (
                  <ChevronRight size={13} style={{ color: "var(--accent-orange)" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation history */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          {conversations.length > 0 && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-1 pt-2" style={{ color: "var(--text-muted)" }}>
                Recent
              </p>
              <div className="space-y-0.5">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={cn(
                      "group relative flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150",
                      currentConversationId === conv.id
                        ? "bg-[var(--bg-secondary)]"
                        : "hover:bg-[var(--bg-secondary)]"
                    )}
                    onClick={() => onSelectConversation(conv.id)}
                    onMouseEnter={() => setHoveredConvId(conv.id)}
                    onMouseLeave={() => setHoveredConvId(null)}
                  >
                    <MessageSquare size={13} className="shrink-0" style={{ color: "var(--text-muted)" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                        {conv.title}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {formatDate(new Date(conv.updatedAt))}
                      </p>
                    </div>
                    {(hoveredConvId === conv.id || currentConversationId === conv.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conv.id);
                        }}
                        className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-950/40 hover:text-red-500 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            CC Bot · Content Creation Co-Pilot
          </p>
        </div>
      </aside>
    </>
  );
}
