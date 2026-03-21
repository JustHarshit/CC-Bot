"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center shrink-0 text-sm">
        😬
      </div>

      <div
        className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3.5 border"
        style={{
          background: "var(--bg-card)",
          borderColor: "rgba(239, 68, 68, 0.3)",
        }}
      >
        <div className="flex items-start gap-2.5 mb-3">
          <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-0.5">
              Oops! Something went wrong
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {error?.includes("API key") || error?.includes("auth")
                ? "It looks like your API key isn't configured. Add OPENAI_API_KEY to your .env.local file to get started."
                : error || "I ran into an issue generating that content. Let's try again!"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-xs"
          >
            <RefreshCw size={12} />
            Try Again
          </Button>

          {(error?.includes("API") || error?.includes("key")) && (
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors font-medium"
            >
              Get API Key →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
