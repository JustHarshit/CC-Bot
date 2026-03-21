"use client";

import { useState, useEffect, useCallback } from "react";
import type { Conversation, Message, ContentTool } from "@/types";
import {
  generateId,
  generateConversationTitle,
  saveConversations,
  loadConversations,
} from "@/lib/utils";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const saved = loadConversations();
    setConversations(saved);
  }, []);

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );

  const createConversation = useCallback(
    (toolType?: ContentTool): Conversation => {
      const newConv: Conversation = {
        id: generateId(),
        title: "New Conversation",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        toolType,
      };
      const updated = [newConv, ...conversations];
      setConversations(updated);
      saveConversations(updated);
      setCurrentConversationId(newConv.id);
      return newConv;
    },
    [conversations]
  );

  const updateConversation = useCallback(
    (id: string, messages: Message[]) => {
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv.id !== id) return conv;
          return {
            ...conv,
            messages,
            title:
              conv.title === "New Conversation"
                ? generateConversationTitle(messages)
                : conv.title,
            updatedAt: new Date(),
          };
        });
        saveConversations(updated);
        return updated;
      });
    },
    []
  );

  const deleteConversation = useCallback(
    (id: string) => {
      const updated = conversations.filter((c) => c.id !== id);
      setConversations(updated);
      saveConversations(updated);
      if (currentConversationId === id) {
        setCurrentConversationId(updated[0]?.id ?? null);
      }
    },
    [conversations, currentConversationId]
  );

  const selectConversation = useCallback((id: string) => {
    setCurrentConversationId(id);
  }, []);

  return {
    conversations,
    currentConversation,
    currentConversationId,
    createConversation,
    updateConversation,
    deleteConversation,
    selectConversation,
  };
}
