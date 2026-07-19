import { loadChatMessages } from '@/features/ai/actions/chat-store';
import { getConversation } from '@/features/conversations/actions/conversation-action';
import { ConversationView } from '@/features/conversations/components/converstion-view';
import { notFound } from 'next/navigation';
import React from 'react'

type ConversationPageProps = {
    params: Promise<{ id: string }>;
  };

/**
 * Conversation page — loads messages and renders the chat UI for a given ID.
 */
const page = async({params}:ConversationPageProps) => {
    const {id} = await params;

    try {
      await getConversation(id)
    } catch (error) {
      notFound()
    }

    const initialMessages = await loadChatMessages(id);
    

  return (
    <ConversationView
      key={id}
      conversationId={id}
      initialMessages={initialMessages}
    />
  )
}

export default page