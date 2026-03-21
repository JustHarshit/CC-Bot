"use client";

import {
  Menu,
  Download,
  Share2,
  MoreHorizontal,
  Home,
  Check,
} from "lucide-react";
import { useState } from "react";
import type { Conversation } from "@/types";
import {
  exportToMarkdown,
  downloadFile,
  generateShareableUrl,
  copyToClipboard,
  cn,
} from "@/lib/utils";

interface ChatHeaderProps {
  conversation: Conversation | null;
  onOpenSidebar: () => void;
  onGoHome: () => void;
}

export default function ChatHeader({
  conversation,
  onOpenSidebar,
  onGoHome,
}: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [sharecopied, setShareCopied] = useState(false);

  const handleExportMarkdown = () => {
    if (!conversation) return;
    const md = exportToMarkdown(conversation);
    downloadFile(md, `${conversation.title}.md`, "text/markdown");
    setShowMenu(false);
  };

  const handleShare = async () => {
    if (!conversation) return;
    const url = generateShareableUrl(conversation.id);
    await copyToClipboard(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
    setShowMenu(false);
  };

  return (
    <header
      className="flex items-center justify-between px-4 py-3 border-b shrink-0"
      style={{
        background: "var(--bg-sidebar)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left: menu + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <Menu size={18} />
        </button>

        <div>
          <h1
            className="font-display font-semibold text-sm leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {conversation?.title ?? "New Conversation"}
          </h1>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {conversation?.messages.filter((m) => m.role !== "system").length ?? 0} messages
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onGoHome}
          className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors"
          style={{ color: "var(--text-muted)" }}
          title="Back to home"
        >
          <Home size={15} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <MoreHorizontal size={15} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div
                className="absolute right-0 top-10 z-20 rounded-xl border shadow-card-hover min-w-[180px] py-1.5 overflow-hidden animate-slide-in-right"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <button
                  onClick={handleExportMarkdown}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors text-left"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Download size={14} />
                  Export Markdown
                </button>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors text-left"
                  style={{ color: "var(--text-primary)" }}
                >
                  {sharecopied ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      <span className="text-green-600 dark:text-green-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={14} />
                      Share Conversation
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
