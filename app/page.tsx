'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { Contact, Message, Conversation } from '@/lib/types';
import { generateMessageId } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { ContactList } from '@/components/features/ContactList';
import { ChatView } from '@/components/features/ChatView';
import { AddContactModal } from '@/components/features/AddContactModal';

type View = 'contacts' | 'chat';

export default function ConvoKitApp() {
  const { context } = useMiniKit();
  const { user } = useAuthenticate();
  
  // App state
  const [currentView, setCurrentView] = useState<View>('contacts');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  // Mock current user ID (in real app, this would come from authentication)
  const currentUserId = user?.address || context?.user?.fid?.toString() || 'user_1';

  // Initialize with mock data for demo
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: 'contact_1',
        userId: currentUserId,
        contactWalletAddress: '0x1234567890123456789012345678901234567890',
        contactDisplayName: 'Alice Cooper',
        lastMessage: 'Hey! How are you doing?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        unreadCount: 2,
      },
      {
        id: 'contact_2',
        userId: currentUserId,
        contactWalletAddress: '0x0987654321098765432109876543210987654321',
        contactDisplayName: 'Bob Smith',
        lastMessage: 'Thanks for the help!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        unreadCount: 0,
      },
    ];

    const mockConversations: Record<string, Conversation> = {
      contact_1: {
        contactId: 'contact_1',
        lastActivity: new Date(Date.now() - 1000 * 60 * 30),
        messages: [
          {
            messageId: 'msg_1',
            senderId: 'contact_1',
            receiverId: currentUserId,
            content: 'Hey! How are you doing?',
            timestamp: new Date(Date.now() - 1000 * 60 * 35),
            status: 'delivered',
          },
          {
            messageId: 'msg_2',
            senderId: currentUserId,
            receiverId: 'contact_1',
            content: 'I\'m doing great! Just working on some new projects.',
            timestamp: new Date(Date.now() - 1000 * 60 * 32),
            status: 'delivered',
          },
          {
            messageId: 'msg_3',
            senderId: 'contact_1',
            receiverId: currentUserId,
            content: 'That sounds awesome! Would love to hear more about it.',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: 'delivered',
          },
        ],
      },
      contact_2: {
        contactId: 'contact_2',
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2),
        messages: [
          {
            messageId: 'msg_4',
            senderId: currentUserId,
            receiverId: 'contact_2',
            content: 'No problem! Happy to help anytime.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
            status: 'delivered',
          },
          {
            messageId: 'msg_5',
            senderId: 'contact_2',
            receiverId: currentUserId,
            content: 'Thanks for the help!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            status: 'delivered',
          },
        ],
      },
    };

    setContacts(mockContacts);
    setConversations(mockConversations);
  }, [currentUserId]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setCurrentView('chat');
    
    // Mark messages as read
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const handleBackToContacts = () => {
    setCurrentView('contacts');
    setSelectedContact(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      messageId: generateMessageId(),
      senderId: currentUserId,
      receiverId: selectedContact.contactWalletAddress,
      content,
      timestamp: new Date(),
      status: 'sending',
    };

    // Add message to conversation
    setConversations(prev => ({
      ...prev,
      [selectedContact.id]: {
        ...prev[selectedContact.id],
        messages: [...(prev[selectedContact.id]?.messages || []), newMessage],
        lastActivity: new Date(),
      },
    }));

    // Update contact's last message
    setContacts(prev => prev.map(contact =>
      contact.id === selectedContact.id
        ? {
            ...contact,
            lastMessage: content,
            lastMessageTime: new Date(),
          }
        : contact
    ));

    // Simulate message sending
    setTimeout(() => {
      setConversations(prev => ({
        ...prev,
        [selectedContact.id]: {
          ...prev[selectedContact.id],
          messages: prev[selectedContact.id].messages.map(msg =>
            msg.messageId === newMessage.messageId
              ? { ...msg, status: 'sent' }
              : msg
          ),
        },
      }));
    }, 1000);

    // Simulate delivery
    setTimeout(() => {
      setConversations(prev => ({
        ...prev,
        [selectedContact.id]: {
          ...prev[selectedContact.id],
          messages: prev[selectedContact.id].messages.map(msg =>
            msg.messageId === newMessage.messageId
              ? { ...msg, status: 'delivered' }
              : msg
          ),
        },
      }));
    }, 2000);
  };

  const handleAddContact = async (walletAddress: string, displayName: string) => {
    // Check if contact already exists
    const existingContact = contacts.find(c => c.contactWalletAddress === walletAddress);
    if (existingContact) {
      throw new Error('Contact already exists');
    }

    const newContact: Contact = {
      id: `contact_${Date.now()}`,
      userId: currentUserId,
      contactWalletAddress: walletAddress,
      contactDisplayName: displayName,
    };

    setContacts(prev => [...prev, newContact]);
    
    // Initialize empty conversation
    setConversations(prev => ({
      ...prev,
      [newContact.id]: {
        contactId: newContact.id,
        messages: [],
        lastActivity: new Date(),
      },
    }));
  };

  const currentMessages = selectedContact 
    ? conversations[selectedContact.id]?.messages || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-900 flex flex-col">
      {/* Header */}
      <Header
        title={currentView === 'contacts' ? APP_CONFIG.name : selectedContact?.contactDisplayName || ''}
        subtitle={currentView === 'contacts' ? APP_CONFIG.tagline : undefined}
        onBack={currentView === 'chat' ? handleBackToContacts : undefined}
        actions={
          currentView === 'contacts' ? (
            <button
              onClick={() => setIsAddContactModalOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          ) : undefined
        }
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'contacts' ? (
          <ContactList
            contacts={contacts}
            onContactSelect={handleContactSelect}
            onAddContact={() => setIsAddContactModalOpen(true)}
          />
        ) : selectedContact ? (
          <ChatView
            contact={selectedContact}
            messages={currentMessages}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
          />
        ) : null}
      </div>

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAddContact={handleAddContact}
      />
    </div>
  );
}
