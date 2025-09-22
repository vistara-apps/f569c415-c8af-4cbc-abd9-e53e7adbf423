'use client';

import { Message, MessageBubbleVariant } from '@/lib/types';
import { formatTime, cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  variant: MessageBubbleVariant;
  className?: string;
}

export function MessageBubble({ message, variant, className }: MessageBubbleProps) {
  const isSent = variant === 'sent';
  
  return (
    <div
      className={cn(
        'flex w-full mb-3',
        isSent ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-lg shadow-sm',
          'animate-fade-in',
          isSent
            ? 'bg-primary text-white rounded-br-sm'
            : 'bg-white text-gray-900 rounded-bl-sm'
        )}
      >
        <p className="text-sm leading-normal break-words">
          {message.content}
        </p>
        <div
          className={cn(
            'flex items-center justify-end mt-1 space-x-1',
            isSent ? 'text-white/70' : 'text-gray-500'
          )}
        >
          <span className="text-xs">
            {formatTime(message.timestamp)}
          </span>
          {isSent && (
            <div className="flex items-center">
              {message.status === 'sending' && (
                <div className="w-3 h-3 border border-white/50 border-t-white rounded-full animate-spin" />
              )}
              {message.status === 'sent' && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {message.status === 'delivered' && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M19.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-1-1a1 1 0 111.414-1.414l.293.293 7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {message.status === 'failed' && (
                <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
