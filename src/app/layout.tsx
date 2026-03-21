import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CC Bot – Content Creation Co-Pilot",
  description:
    "Your AI-powered content creation co-pilot. Brainstorm, outline, and optimize blog posts, social media, videos, newsletters, and more.",
  keywords: [
    "content creation",
    "AI writing",
    "content strategy",
    "blog writing",
    "social media",
    "SEO",
    "content marketing",
  ],
  authors: [{ name: "CC Bot" }],
  openGraph: {
    title: "CC Bot – Content Creation Co-Pilot",
    description: "Brainstorm. Outline. Optimize. Publish.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CC Bot – Your Content Creation Co-Pilot",
    description: "Brainstorm. Outline. Optimize. Publish.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
