export interface User {
  walletAddress: string;
  farcasterId?: string;
  displayName: string;
  avatar?: string;
}

export interface Contact {
  id: string;
  userId: string;
  contactWalletAddress: string;
  contactDisplayName: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

export interface Message {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'failed';
}

export interface Conversation {
  contactId: string;
  messages: Message[];
  lastActivity: Date;
}

export type MessageBubbleVariant = 'sent' | 'received';
export type ContactListItemVariant = 'default';
export type InputAreaVariant = 'withSendButton';
