"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { formatTimestamp, cn } from "@/lib/utils";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
  isLast?: boolean;
}

export default function MessageBubble({
  message,
  onRegenerate,
  isLast,
}: MessageBubbleProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const isUser = message.role === "user";
  const timestamp = formatTimestamp(new Date(message.timestamp));

  return (
    <div
      className={cn(
        "flex items-start gap-3 message-enter group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            U
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-sm shadow-sm">
            🤖
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser && "items-end")}>
        {/* Header */}
        <div className={cn("flex items-center gap-2 text-xs", isUser && "flex-row-reverse")} style={{ color: "var(--text-muted)" }}>
          <span className="font-medium">{isUser ? "You" : "CC Bot"}</span>
          <span>·</span>
          <span>{timestamp}</span>
        </div>

        {/* Bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm border",
            isUser
              ? "rounded-tr-sm text-white border-transparent"
              : "rounded-tl-sm prose-content"
          )}
          style={
            isUser
              ? { background: "linear-gradient(135deg, #f97316, #ea580c)" }
              : {
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full text-xs border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead style={{ background: "var(--bg-secondary)" }}>{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left font-semibold border" style={{ borderColor: "var(--border)" }}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 border" style={{ borderColor: "var(--border)" }}>
                    {children}
                  </td>
                ),
                // Code
                code: ({ className, children, ...props }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) {
                    return (
                      <div className="relative group/code my-3">
                        <pre
                          className="rounded-xl p-4 overflow-x-auto text-xs"
                          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                        >
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                        <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                          <CopyButton text={String(children)} />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <code
                      className="px-1.5 py-0.5 rounded-md text-xs font-mono"
                      style={{
                        background: "var(--bg-secondary)",
                        color: "var(--accent-orange)",
                        border: "1px solid var(--border)",
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Actions (assistant only) */}
        {!isUser && (
          <div
            className={cn(
              "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              isLast && "opacity-100"
            )}
          >
            <CopyButton text={message.content} />

            <div className="w-px h-3 mx-0.5" style={{ background: "var(--border)" }} />

            <button
              onClick={() => setFeedback(feedback === "up" ? null : "up")}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150",
                feedback === "up"
                  ? "bg-green-100 dark:bg-green-950/40 text-green-600"
                  : "hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
              )}
              title="Good response"
            >
              <ThumbsUp size={12} />
            </button>

            <button
              onClick={() => setFeedback(feedback === "down" ? null : "down")}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150",
                feedback === "down"
                  ? "bg-red-100 dark:bg-red-950/40 text-red-500"
                  : "hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
              )}
              title="Bad response"
            >
              <ThumbsDown size={12} />
            </button>

            {isLast && onRegenerate && (
              <>
                <div className="w-px h-3 mx-0.5" style={{ background: "var(--border)" }} />
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all duration-150 hover:bg-[var(--bg-secondary)]"
                  style={{ color: "var(--text-muted)" }}
                  title="Regenerate"
                >
                  <RefreshCw size={11} />
                  Retry
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
