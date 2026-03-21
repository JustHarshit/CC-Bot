"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "ai/react";
import type { Conversation, ContentTool } from "@/types";
import { generateId } from "@/lib/utils";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { useConversations } from "@/hooks/useConversations";
import { useConfetti } from "@/hooks/useConfetti";

interface ChatInterfaceProps {
  initialPrompt?: string;
  onGoHome: () => void;
}

export default function ChatInterface({
  initialPrompt,
  onGoHome,
}: ChatInterfaceProps) {
  const {
    conversations,
    currentConversation,
    currentConversationId,
    createConversation,
    updateConversation,
    deleteConversation,
    selectConversation,
  } = useConversations();

  const [activeTool, setActiveTool] = useState<ContentTool | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { fireConfetti } = useConfetti();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    setMessages,
    setInput,
  } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      // Trigger confetti for long/complete responses (outlines, lists)
      const isComplete =
        message.content.includes("##") ||
        message.content.split("\n").length > 15;
      if (isComplete) {
        fireConfetti();
      }

      // Sync to conversation store
      if (currentConversationId) {
        const allMessages = [
          ...messages,
          {
            id: message.id,
            role: message.role as "assistant",
            content: message.content,
            timestamp: new Date(),
          },
        ];
        updateConversation(currentConversationId, allMessages as never);
      }
    },
    onError: (err) => {
      console.error("Chat error:", err);
    },
  });

  // Sync input with external state
  useEffect(() => {
    handleInputChange({ target: { value: inputValue } } as React.ChangeEvent<HTMLInputElement>);
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize conversation
  useEffect(() => {
    if (hasInitialized) return;
    setHasInitialized(true);

    const newConv = createConversation();

    if (initialPrompt) {
      // Restore messages from existing conversation if needed
      setTimeout(() => {
        setInput(initialPrompt);
        // Auto-submit
        const submitEvent = { preventDefault: () => {} } as React.FormEvent;
        handleSubmit(submitEvent, { data: { message: initialPrompt } });
      }, 100);
    }

    void newConv;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Sync messages to conversation
  useEffect(() => {
    if (currentConversationId && messages.length > 0) {
      const mapped = messages.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: m.content,
        timestamp: new Date(),
      }));
      updateConversation(currentConversationId, mapped);
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || isLoading) return;
    setInput(inputValue);
    const ev = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(ev);
    setInputValue("");
  }, [inputValue, isLoading, handleSubmit, setInput]);

  const handleInsertPrompt = useCallback((prompt: string) => {
    setInputValue(prompt);
  }, []);

  const handleNewChat = useCallback(
    (toolType?: ContentTool) => {
      createConversation(toolType);
      setMessages([]);
      setInputValue("");
      if (toolType) setActiveTool(toolType);
      setSidebarOpen(false);
    },
    [createConversation, setMessages]
  );

  const handleSelectConversation = useCallback(
    (id: string) => {
      selectConversation(id);
      const conv = conversations.find((c) => c.id === id);
      if (conv) {
        const sdkMessages = conv.messages
          .filter((m) => m.role !== "system")
          .map((m) => ({
            id: m.id || generateId(),
            role: m.role as "user" | "assistant",
            content: m.content,
          }));
        setMessages(sdkMessages);
      }
      setSidebarOpen(false);
    },
    [selectConversation, conversations, setMessages]
  );

  const handleRegenerate = useCallback(() => {
    reload();
  }, [reload]);

  const visibleMessages = messages.filter((m) => m.role !== "system");

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Left Sidebar */}
      <LeftSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={deleteConversation}
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <ChatHeader
          conversation={currentConversation ?? null}
          onOpenSidebar={() => setSidebarOpen(true)}
          onGoHome={onGoHome}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {visibleMessages.length === 0 && !isLoading ? (
            <EmptyState
              onSelectPrompt={handleInsertPrompt}
              activeTool={activeTool}
            />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {visibleMessages.map((message, idx) => (
                <MessageBubble
                  key={message.id}
                  message={{
                    id: message.id,
                    role: message.role as "user" | "assistant",
                    content: message.content,
                    timestamp: new Date(),
                  }}
                  onRegenerate={
                    idx === visibleMessages.length - 1 && message.role === "assistant"
                      ? handleRegenerate
                      : undefined
                  }
                  isLast={idx === visibleMessages.length - 1}
                />
              ))}

              {/* Loading indicator */}
              {isLoading && <TypingIndicator />}

              {/* Error state */}
              {error && !isLoading && (
                <ErrorState
                  error={error.message}
                  onRetry={handleRegenerate}
                />
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div
          className="shrink-0 px-4 pb-4 pt-2 border-t"
          style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
        >
          <div className="max-w-3xl mx-auto">
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSendMessage}
              onStop={stop}
              isLoading={isLoading}
              placeholder={
                activeTool
                  ? `Ask CC Bot about ${activeTool.replace("-", " ")}...`
                  : "Ask CC Bot to create any content..."
              }
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar onInsertPrompt={handleInsertPrompt} />
    </div>
  );
}
