export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  toolType?: ContentTool;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  toolType?: ContentTool;
}

export type ContentTool =
  | "new-content"
  | "idea-generator"
  | "content-repurposer"
  | "seo-optimizer"
  | "analytics-helper";

export interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: ContentTool | "general";
  icon: string;
  tags: string[];
}

export interface SidebarTool {
  id: ContentTool;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  emoji: string;
}

export type AppView = "landing" | "chat";

export interface ExportOptions {
  format: "markdown" | "pdf" | "text";
  includeTimestamps: boolean;
}
