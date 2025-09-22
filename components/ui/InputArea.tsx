'use client';

import { useState } from 'react';
import { InputAreaVariant } from '@/lib/types';
import { MAX_MESSAGE_LENGTH, cn } from '@/lib/utils';

interface InputAreaProps {
  variant: InputAreaVariant;
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function InputArea({ 
  variant, 
  onSendMessage, 
  disabled = false,
  placeholder = "Type a message...",
  className 
}: InputAreaProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || disabled || isSending) return;
    
    setIsSending(true);
    try {
      await onSendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isValid = message.trim().length > 0 && message.length <= MAX_MESSAGE_LENGTH;

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        'flex items-end space-x-2 p-4 bg-white/5 backdrop-blur-sm',
        'border-t border-white/10',
        className
      )}
    >
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || isSending}
          rows={1}
          className={cn(
            'w-full px-4 py-3 bg-white/10 border border-white/20',
            'rounded-lg text-white placeholder-white/50',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'resize-none transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            message.length > MAX_MESSAGE_LENGTH && 'border-red-400 focus:ring-red-400'
          )}
          style={{
            minHeight: '48px',
            maxHeight: '120px',
          }}
        />
        
        {/* Character count */}
        <div className="absolute -bottom-5 right-0 text-xs text-white/50">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
      </div>

      {variant === 'withSendButton' && (
        <button
          type="submit"
          disabled={!isValid || disabled || isSending}
          className={cn(
            'p-3 rounded-lg transition-all duration-200',
            'flex items-center justify-center',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isValid && !disabled && !isSending
              ? 'bg-primary hover:bg-primary/90 text-white'
              : 'bg-white/10 text-white/50'
          )}
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      )}
    </form>
  );
}
