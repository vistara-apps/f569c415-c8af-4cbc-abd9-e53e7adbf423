'use client';

import { Contact, ContactListItemVariant } from '@/lib/types';
import { formatTime, truncateAddress, cn } from '@/lib/utils';

interface ContactListItemProps {
  contact: Contact;
  variant: ContactListItemVariant;
  onClick: (contact: Contact) => void;
  className?: string;
}

export function ContactListItem({ 
  contact, 
  variant, 
  onClick, 
  className 
}: ContactListItemProps) {
  return (
    <button
      onClick={() => onClick(contact)}
      className={cn(
        'w-full p-4 bg-white/10 backdrop-blur-sm rounded-lg',
        'hover:bg-white/20 active:bg-white/30',
        'transition-all duration-200 ease-in-out',
        'border border-white/10 hover:border-white/20',
        'text-left group',
        className
      )}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
          {contact.avatar ? (
            <img 
              src={contact.avatar} 
              alt={contact.contactDisplayName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-lg">
              {contact.contactDisplayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-medium text-sm truncate">
              {contact.contactDisplayName}
            </h3>
            {contact.lastMessageTime && (
              <span className="text-white/60 text-xs flex-shrink-0 ml-2">
                {formatTime(contact.lastMessageTime)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-xs truncate">
              {contact.lastMessage || truncateAddress(contact.contactWalletAddress)}
            </p>
            {contact.unreadCount && contact.unreadCount > 0 && (
              <div className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                {contact.unreadCount > 9 ? '9+' : contact.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
