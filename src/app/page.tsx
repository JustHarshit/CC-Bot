"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import LandingPage from "@/components/landing/LandingPage";
import type { AppView } from "@/types";

const ChatInterface = dynamic(() => import("@/components/chat/ChatInterface"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-3xl shadow-glow-orange animate-float">
          🤖
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-orange-400 typing-dot" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-orange-400 typing-dot" style={{ animationDelay: "0.4s" }} />
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Waking up CC Bot...
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [view, setView] = useState<AppView>("landing");
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();

  const handleStart = (prompt?: string) => {
    setInitialPrompt(prompt);
    setView("chat");
  };

  const handleGoHome = () => {
    setView("landing");
    setInitialPrompt(undefined);
  };

  if (view === "chat") {
    return (
      <Suspense>
        <ChatInterface
          initialPrompt={initialPrompt}
          onGoHome={handleGoHome}
        />
      </Suspense>
    );
  }

  return <LandingPage onStart={handleStart} />;
}
