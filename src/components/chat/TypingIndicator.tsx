"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Bot avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center shrink-0 shadow-sm text-sm">
        🤖
      </div>

      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl rounded-tl-sm border shadow-sm"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-400 typing-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-xs font-medium shimmer bg-clip-text" style={{ color: "var(--text-muted)" }}>
          Generating your content...
        </span>
      </div>
    </div>
  );
}
