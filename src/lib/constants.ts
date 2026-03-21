import type { ContentTemplate, SidebarTool, QuickAction } from "@/types";

export const SYSTEM_PROMPT = `You are CC Bot 🎨, the ultimate content creation co-pilot. You've helped 100+ creators go from blank page to published content that actually performs.

Your expertise spans:
- **Content Frameworks**: AIDA, PAS, BAB, StoryBrand, Hook-Story-Offer
- **Platform Mastery**: Twitter/X threads, LinkedIn carousels, YouTube scripts, TikTok hooks, newsletter sequences, blog posts
- **SEO**: Keyword optimization, meta descriptions, semantic clustering, search intent matching
- **Viral Mechanics**: Pattern interrupts, curiosity gaps, social proof triggers, emotional hooks
- **Repurposing**: Turn 1 piece of content into 10+ assets across platforms
- **Audience Psychology**: Understanding pain points, desires, and buying triggers

Your response style:
1. **Always actionable** – give ready-to-use templates and examples, not theory
2. **Structured clearly** – use markdown headers (##), bullet points, and numbered lists
3. **Specific, not generic** – tailor advice to their exact request
4. **Next steps** – always end with 2-3 concrete next actions
5. **Enthusiastic but professional** – you love content but don't overdo it

When generating ideas, give at minimum 5-10 options. When writing headlines, give 5+ variations. When creating outlines, be comprehensive. When giving SEO tips, be specific with examples.

Always use markdown formatting in your responses for better readability.`;

export const EXAMPLE_PROMPTS = [
  {
    id: "1",
    text: "Give me 10 viral LinkedIn post ideas about AI tools",
    emoji: "🔥",
    description: "Viral ideas",
  },
  {
    id: "2",
    text: "Create a detailed blog post outline for 'Remote Work Productivity'",
    emoji: "📝",
    description: "Blog outline",
  },
  {
    id: "3",
    text: "Write 5 SEO-optimized headlines for a fitness app landing page",
    emoji: "💪",
    description: "SEO headlines",
  },
  {
    id: "4",
    text: "Turn my blog post about 'morning routines' into a Twitter thread",
    emoji: "🔄",
    description: "Repurpose content",
  },
  {
    id: "5",
    text: "Write a YouTube video script hook for 'How to make $1000 online'",
    emoji: "🎬",
    description: "Video hook",
  },
  {
    id: "6",
    text: "Generate a 7-email welcome sequence for a SaaS product",
    emoji: "📧",
    description: "Email sequence",
  },
];

export const SIDEBAR_TOOLS: SidebarTool[] = [
  {
    id: "new-content",
    label: "New Content",
    icon: "📝",
    description: "Start fresh content from scratch",
    color: "text-orange-500",
  },
  {
    id: "idea-generator",
    label: "Idea Generator",
    icon: "🎯",
    description: "Generate viral content ideas",
    color: "text-violet-500",
  },
  {
    id: "content-repurposer",
    label: "Repurposer",
    icon: "📊",
    description: "Transform content for any platform",
    color: "text-blue-500",
  },
  {
    id: "seo-optimizer",
    label: "SEO Optimizer",
    icon: "✨",
    description: "Optimize for search engines",
    color: "text-green-500",
  },
  {
    id: "analytics-helper",
    label: "Analytics Helper",
    icon: "📈",
    description: "Understand your content metrics",
    color: "text-pink-500",
  },
];

export const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: "blog-outline",
    title: "Blog Post Outline",
    description: "Full SEO blog structure",
    prompt:
      "Create a comprehensive SEO-optimized blog post outline for the topic: [YOUR TOPIC]. Include: H1 title, meta description, introduction hook, 5-7 main sections with H2 headings, sub-points for each, conclusion, and CTA.",
    category: "new-content",
    icon: "📄",
    tags: ["blog", "SEO", "outline"],
  },
  {
    id: "linkedin-post",
    title: "LinkedIn Carousel",
    description: "10-slide carousel post",
    prompt:
      "Create a 10-slide LinkedIn carousel about [YOUR TOPIC]. For each slide: title, 3 bullet points max, and key visual description. Include hook slide and CTA slide.",
    category: "new-content",
    icon: "💼",
    tags: ["LinkedIn", "carousel", "social"],
  },
  {
    id: "twitter-thread",
    title: "Twitter Thread",
    description: "Viral thread structure",
    prompt:
      "Write a 10-tweet viral Twitter/X thread about [YOUR TOPIC]. Start with a powerful hook tweet, develop the idea across tweets 2-9, end with a strong CTA. Each tweet under 280 chars.",
    category: "new-content",
    icon: "🐦",
    tags: ["Twitter", "thread", "viral"],
  },
  {
    id: "youtube-script",
    title: "YouTube Script",
    description: "Full video script",
    prompt:
      "Write a YouTube video script for [YOUR TOPIC]. Include: hook (first 30 seconds), intro, 3-5 main sections with transitions, engagement prompts, and outro with CTA. Target length: 8-10 minutes.",
    category: "new-content",
    icon: "🎬",
    tags: ["YouTube", "video", "script"],
  },
  {
    id: "10-ideas",
    title: "10 Content Ideas",
    description: "Viral topic generator",
    prompt:
      "Generate 10 viral content ideas about [YOUR NICHE/TOPIC] for [YOUR PLATFORM]. For each idea: title, hook angle, why it will perform well, and content format recommendation.",
    category: "idea-generator",
    icon: "💡",
    tags: ["ideas", "viral", "strategy"],
  },
  {
    id: "repurpose-blog",
    title: "Repurpose Blog → 10 Assets",
    description: "Multi-platform content",
    prompt:
      "Take this blog post and repurpose it into 10 different content assets: [PASTE YOUR BLOG POST]. Create versions for: Twitter thread, LinkedIn post, Instagram caption, TikTok script, email newsletter, YouTube description, podcast talking points, Pinterest description, Facebook post, and a quote graphic.",
    category: "content-repurposer",
    icon: "♻️",
    tags: ["repurpose", "multi-platform"],
  },
  {
    id: "seo-headlines",
    title: "SEO Headlines",
    description: "10 optimized titles",
    prompt:
      "Write 10 SEO-optimized headlines for [YOUR TOPIC]. Include: the primary keyword, power words, numbers where relevant, and emotional triggers. Rate each headline 1-10 for CTR potential and explain why.",
    category: "seo-optimizer",
    icon: "🔍",
    tags: ["SEO", "headlines", "titles"],
  },
  {
    id: "email-sequence",
    title: "Email Welcome Sequence",
    description: "7-email nurture flow",
    prompt:
      "Create a 7-email welcome sequence for [YOUR PRODUCT/SERVICE]. Include for each email: subject line (with A/B variant), preview text, email body with AIDA structure, and CTA. Focus on building trust and leading to a purchase.",
    category: "new-content",
    icon: "📧",
    tags: ["email", "sequence", "nurture"],
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "viral-hooks",
    label: "5 Viral Hooks",
    prompt:
      "Write 5 viral hooks for content about [my topic]. Use pattern interrupts and curiosity gaps.",
    emoji: "🪝",
  },
  {
    id: "cta-variations",
    label: "CTA Variations",
    prompt:
      "Write 5 different CTAs for my content. Mix soft and hard CTAs, include scarcity and social proof.",
    emoji: "🎯",
  },
  {
    id: "meta-description",
    label: "Meta Description",
    prompt:
      "Write an SEO-optimized meta description (150-160 chars) for [my page topic]. Include primary keyword and a compelling reason to click.",
    emoji: "🔍",
  },
  {
    id: "storytelling",
    label: "Story Framework",
    prompt:
      "Help me structure my story about [topic] using the Hero's Journey framework adapted for content marketing.",
    emoji: "📖",
  },
  {
    id: "audience-analysis",
    label: "Audience Analysis",
    prompt:
      "Help me define my ideal audience for [niche]. Create a detailed ICP with pain points, desires, objections, and content preferences.",
    emoji: "👥",
  },
  {
    id: "content-calendar",
    label: "30-Day Calendar",
    prompt:
      "Create a 30-day content calendar for [my niche] on [platform]. Mix educational, entertaining, and promotional content. Include post ideas for each day.",
    emoji: "📅",
  },
];

export const STATS = [
  { value: "10K+", label: "Creators" },
  { value: "100K+", label: "Ideas Generated" },
  { value: "50K+", label: "Posts Written" },
  { value: "4.9★", label: "Creator Rating" },
];
