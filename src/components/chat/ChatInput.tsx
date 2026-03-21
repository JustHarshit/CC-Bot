"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import { Send, Square, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  disabled,
  placeholder = "Ask CC Bot anything...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSubmit();
      }
    }
  };

  const canSubmit = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-end gap-2 p-2 rounded-2xl border transition-all duration-200",
          "focus-within:border-orange-300 dark:focus-within:border-orange-700",
          "focus-within:shadow-glow-orange/20",
          disabled && "opacity-50"
        )}
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Attachment button (decorative) */}
        <button
          disabled
          className="mb-1.5 w-8 h-8 rounded-xl flex items-center justify-center transition-colors opacity-40 cursor-not-allowed"
          style={{ color: "var(--text-muted)" }}
          title="Attachments coming soon"
        >
          <Paperclip size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 bg-transparent text-sm resize-none outline-none py-1.5 max-h-48",
            "placeholder:text-[var(--text-muted)]"
          )}
          style={{ color: "var(--text-primary)", lineHeight: "1.6" }}
        />

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 mb-1">
          {/* Character count */}
          {value.length > 200 && (
            <span className="text-[10px] font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>
              {value.length}
            </span>
          )}

          {/* Submit / Stop */}
          {isLoading ? (
            <button
              onClick={onStop}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-all duration-200 active:scale-95 shadow-sm"
              title="Stop generating"
            >
              <Square size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm",
                canSubmit
                  ? "bg-orange-500 text-white hover:bg-orange-600 active:scale-95 hover:shadow-glow-orange"
                  : "bg-[var(--bg-secondary)] cursor-not-allowed",
              )}
              style={!canSubmit ? { color: "var(--text-muted)" } : {}}
              title="Send message (Enter)"
            >
              {canSubmit ? <Send size={15} /> : <Sparkles size={15} />}
            </button>
          )}
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-center justify-between mt-1.5 px-1">
        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
          Press <kbd className="font-mono bg-[var(--bg-secondary)] px-1 rounded text-[9px]">Enter</kbd> to send,{" "}
          <kbd className="font-mono bg-[var(--bg-secondary)] px-1 rounded text-[9px]">Shift+Enter</kbd> for new line
        </span>
        {isLoading && (
          <span className="text-[10px] text-orange-500 animate-pulse font-medium">
            ✨ Generating...
          </span>
        )}
      </div>
    </div>
  );
}
