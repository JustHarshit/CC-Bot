"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({ text, className, size = "sm" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const iconSize = size === "sm" ? 13 : 15;

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy to clipboard"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg transition-all duration-200 font-medium",
        "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
        size === "sm" ? "text-xs px-2 py-1" : "text-sm px-2.5 py-1.5",
        copied && "text-green-600 dark:text-green-400",
        className
      )}
    >
      {copied ? (
        <>
          <Check size={iconSize} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={iconSize} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
