'use client';

import { useState } from 'react';
import { Contact } from '@/lib/types';
import { ContactListItem } from '@/components/ui/ContactListItem';
import { cn } from '@/lib/utils';

interface ContactListProps {
  contacts: Contact[];
  onContactSelect: (contact: Contact) => void;
  onAddContact: () => void;
  className?: string;
}

export function ContactList({ 
  contacts, 
  onContactSelect, 
  onAddContact,
  className 
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.contactDisplayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.contactWalletAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">
              {searchQuery ? 'No contacts found' : 'No contacts yet'}
            </h3>
            <p className="text-white/70 text-sm mb-6">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Add your first contact to start messaging'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={onAddContact}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Add Contact
              </button>
            )}
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              variant="default"
              onClick={onContactSelect}
            />
          ))
        )}
      </div>

      {/* Add Contact Button */}
      {filteredContacts.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onAddContact}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Contact</span>
          </button>
        </div>
      )}
    </div>
  );
}
