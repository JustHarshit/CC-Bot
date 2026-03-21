"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";
import { EXAMPLE_PROMPTS, STATS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

interface LandingPageProps {
  onStart: (prompt?: string) => void;
}

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Ideas",
    desc: "Go from blank page to 10 viral ideas in seconds",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/40",
  },
  {
    icon: Layers,
    title: "Multi-Platform",
    desc: "Twitter threads, LinkedIn carousels, YouTube scripts & more",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    icon: TrendingUp,
    title: "SEO-Optimized",
    desc: "Built-in keyword strategy and headline formulas that convert",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
];

const ROTATING_WORDS = [
  "Blog Posts",
  "Twitter Threads",
  "LinkedIn Carousels",
  "YouTube Scripts",
  "Email Sequences",
  "SEO Headlines",
];

export default function LandingPage({ onStart }: LandingPageProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onStart(inputValue.trim());
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl blob"
          style={{ background: "radial-gradient(circle, #f97316, #fb923c)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #8b5cf6, #a855f7)",
            animation: "blob 9s infinite 2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #f97316, #8b5cf6)" }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Header */}
      <header
        className={cn(
          "relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto",
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-glow-orange">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-display font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
            CC Bot
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AI Online
          </div>
          <ThemeToggle />
          <button
            onClick={() => onStart()}
            className="hidden sm:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-glow-orange"
          >
            Start Creating
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-12 pb-20 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{
            background: "var(--accent-orange-light)",
            borderColor: "rgba(249, 115, 22, 0.2)",
            color: "var(--accent-orange)",
          }}
        >
          <Star size={14} fill="currentColor" />
          Trusted by 10,000+ content creators worldwide
          <Star size={14} fill="currentColor" />
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "font-display font-bold leading-tight mb-4 transition-all duration-700 delay-150",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ color: "var(--text-primary)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Your Content Creation
          <br />
          <span className="gradient-text">Co-Pilot</span>
        </h1>

        {/* Rotating subtitle */}
        <div
          className={cn(
            "flex items-center gap-3 mb-5 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span className="text-xl font-body" style={{ color: "var(--text-secondary)" }}>
            Create stunning
          </span>
          <div className="overflow-hidden h-8 relative w-52 text-left">
            {ROTATING_WORDS.map((word, i) => (
              <span
                key={word}
                className="absolute inset-0 flex items-center font-semibold text-xl transition-all duration-500"
                style={{
                  color: "var(--accent-orange)",
                  transform: i === wordIndex ? "translateY(0)" : i < wordIndex ? "translateY(-100%)" : "translateY(100%)",
                  opacity: i === wordIndex ? 1 : 0,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p
          className={cn(
            "text-lg mb-10 max-w-xl leading-relaxed transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ color: "var(--text-secondary)" }}
        >
          Brainstorm. Outline. Optimize. Publish.{" "}
          <span style={{ color: "var(--text-muted)" }}>
            Your AI co-pilot for every piece of content you&apos;ll ever create.
          </span>
        </p>

        {/* Search/Input */}
        <form
          onSubmit={handleSubmit}
          className={cn(
            "w-full max-w-2xl mb-8 transition-all duration-700 delay-[350ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div
            className="flex items-center gap-3 p-2 rounded-2xl border shadow-card"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask CC Bot anything... e.g. 'Write me a viral LinkedIn post about AI'"
              className="flex-1 bg-transparent text-sm px-3 py-2 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: "var(--text-primary)" }}
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-all duration-200 active:scale-95 shadow-sm shrink-0"
            >
              <Sparkles size={15} />
              <span className="hidden sm:inline">Let&apos;s Create</span>
              <span className="sm:hidden">Go</span>
            </button>
          </div>
        </form>

        {/* Example prompts */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2.5 mb-16 transition-all duration-700 delay-[400ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span className="text-xs font-medium self-center" style={{ color: "var(--text-muted)" }}>
            Try:
          </span>
          {EXAMPLE_PROMPTS.slice(0, 3).map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => onStart(prompt.text)}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 active:scale-95"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              <span>{prompt.emoji}</span>
              <span className="max-w-[220px] truncate">{prompt.text}</span>
              <ChevronRight
                size={13}
                className="text-[var(--text-muted)] group-hover:text-orange-500 transition-colors shrink-0"
              />
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-6 sm:gap-12 mb-20 transition-all duration-700 delay-[450ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display font-bold text-2xl sm:text-3xl"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl p-5 border text-left hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-default"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", feature.bg)}>
                <feature.icon size={20} className={feature.color} />
              </div>
              <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                {feature.title}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {feature.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div
          className={cn(
            "mt-10 transition-all duration-700 delay-[550ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <button
            onClick={() => onStart()}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-glow-orange hover:shadow-lg active:scale-95"
          >
            <Sparkles size={18} className="animate-pulse-slow" />
            Start Creating for Free
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            No sign-up needed · Instant access · Add your API key to unlock
          </p>
        </div>
      </main>
    </div>
  );
}
