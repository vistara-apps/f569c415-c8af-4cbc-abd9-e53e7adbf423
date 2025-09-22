'use client';

import { useEffect, useRef } from 'react';
import { Contact, Message } from '@/lib/types';
import { MessageBubble } from '@/components/ui/MessageBubble';
import { InputArea } from '@/components/ui/InputArea';
import { cn } from '@/lib/utils';

interface ChatViewProps {
  contact: Contact;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
  className?: string;
}

export function ChatView({ 
  contact, 
  messages, 
  currentUserId, 
  onSendMessage,
  className 
}: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Start the conversation</h3>
              <p className="text-white/70 text-sm">
                Send a message to {contact.contactDisplayName}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.messageId}
                message={message}
                variant={message.senderId === currentUserId ? 'sent' : 'received'}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <InputArea
        variant="withSendButton"
        onSendMessage={onSendMessage}
        placeholder={`Message ${contact.contactDisplayName}...`}
      />
    </div>
  );
}
