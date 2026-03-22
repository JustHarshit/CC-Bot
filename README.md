# 🤖 CC Bot – Content Creation Co-Pilot

> Your AI-powered content creation assistant. Brainstorm. Outline. Optimize. Publish.

![CC Bot](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwind-css)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-4-black?logo=vercel)

---

## ✨ Features

- **🎯 Purpose-built** for content creation (blog posts, social media, YouTube, newsletters)
- **⚡ Streaming responses** via Vercel AI SDK
- **🎨 Beautiful UI** — Notion meets Jasper.ai aesthetics
- **🌙 Dark/Light mode** with persistent preference
- **📋 One-click copy** for all generated content
- **💾 Local conversation history** via localStorage
- **📥 Export to Markdown** for any conversation
- **🔗 Shareable conversation links**
- **🎉 Confetti celebrations** for completed outlines
- **📱 Fully responsive** — mobile-first design
- **🚀 Vercel-ready** — deploy in one click

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd content-creation-chatbot
npm install
```

### 2. Add Your API Key

```bash
cp .env.example .env.local
```

Open `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-key-here
```

> **Want to use a different provider?**
> See [Switching AI Providers](#-switching-ai-providers) below.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Switching AI Providers

### Option A: OpenAI (default, recommended)

```bash
npm install @ai-sdk/openai
```

```env
OPENAI_API_KEY=sk-...
```

```typescript
// src/app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
const model = openai("gpt-4o-mini");
```

### Option B: Anthropic Claude

```bash
npm install @ai-sdk/anthropic
```

```env
ANTHROPIC_API_KEY=sk-ant-...
```

```typescript
import { anthropic } from "@ai-sdk/anthropic";
const model = anthropic("claude-3-5-haiku-20241022");
```

### Option C: Groq (fastest, free tier)

```bash
npm install @ai-sdk/groq
```

```env
GROQ_API_KEY=gsk_...
```

```typescript
import { groq } from "@ai-sdk/groq";
const model = groq("llama-3.1-8b-instant");
```

---

## 📁 File Structure

```
content-creation-chatbot/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts          # AI streaming endpoint
│   │   ├── globals.css                # Global styles + CSS variables
│   │   ├── layout.tsx                 # Root layout with metadata
│   │   └── page.tsx                   # Main page (landing ↔ chat)
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx      # Main chat UI + AI SDK integration
│   │   │   ├── ChatHeader.tsx         # Header with export/share
│   │   │   ├── ChatInput.tsx          # Auto-resize textarea input
│   │   │   ├── MessageBubble.tsx      # User/assistant messages + markdown
│   │   │   ├── TypingIndicator.tsx    # Loading animation
│   │   │   ├── EmptyState.tsx         # Welcome + example prompts
│   │   │   └── ErrorState.tsx         # Error + retry UI
│   │   ├── landing/
│   │   │   └── LandingPage.tsx        # Hero landing page
│   │   ├── layout/
│   │   │   ├── LeftSidebar.tsx        # Tools + conversation history
│   │   │   └── RightSidebar.tsx       # Quick actions + templates
│   │   └── ui/
│   │       ├── Button.tsx             # Button variants
│   │       ├── Badge.tsx              # Badge component
│   │       ├── CopyButton.tsx         # One-click copy
│   │       ├── ThemeToggle.tsx        # Dark/light toggle
│   │       └── Tooltip.tsx            # Hover tooltip
│   ├── hooks/
│   │   ├── useConversations.ts        # Conversation CRUD + localStorage
│   │   ├── useTheme.ts                # Theme toggle + persistence
│   │   └── useConfetti.ts             # Confetti celebration hook
│   ├── lib/
│   │   ├── constants.ts               # Prompts, tools, templates
│   │   └── utils.ts                   # Helpers, export, storage
│   └── types/
│       └── index.ts                   # All TypeScript types
├── .env.example                       # Environment variables template
├── vercel.json                        # Vercel deployment config
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 🎨 Customization

### Change Bot Personality

Edit the system prompt in `src/lib/constants.ts`:

```typescript
export const SYSTEM_PROMPT = `You are CC Bot...`;
```

### Add Content Templates

In `src/lib/constants.ts`, add to `CONTENT_TEMPLATES`:

```typescript
{
  id: "my-template",
  title: "My Template",
  description: "What it does",
  prompt: "Your prompt with [PLACEHOLDERS]...",
  category: "new-content",
  icon: "🎯",
  tags: ["tag1", "tag2"],
}
```

### Customize Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --accent-orange: #f97316;  /* Primary brand color */
  --accent-violet: #8b5cf6;  /* Secondary accent */
}
```

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# OPENAI_API_KEY = your-key
```

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | Framework |
| TypeScript 5 | Type safety |
| Tailwind CSS 3 | Styling |
| Vercel AI SDK 4 | AI streaming |
| React Markdown | Markdown rendering |
| Canvas Confetti | Celebration effects |
| Lucide React | Icons |

---

## 📄 License

MIT — use freely for personal and commercial projects.

---

Made with ❤️ by CC Bot — *Your Content Creation Co-Pilot*
