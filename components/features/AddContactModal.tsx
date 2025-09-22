'use client';

import { useState } from 'react';
import { isValidWalletAddress, cn } from '@/lib/utils';
import { MAX_DISPLAY_NAME_LENGTH } from '@/lib/constants';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (walletAddress: string, displayName: string) => Promise<void>;
}

export function AddContactModal({ isOpen, onClose, onAddContact }: AddContactModalProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!walletAddress.trim() || !displayName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidWalletAddress(walletAddress)) {
      setError('Please enter a valid wallet address');
      return;
    }

    if (displayName.length > MAX_DISPLAY_NAME_LENGTH) {
      setError(`Display name must be ${MAX_DISPLAY_NAME_LENGTH} characters or less`);
      return;
    }

    setIsLoading(true);
    try {
      await onAddContact(walletAddress.trim(), displayName.trim());
      setWalletAddress('');
      setDisplayName('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setWalletAddress('');
      setDisplayName('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-surface border border-white/20 rounded-lg w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Add Contact</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="walletAddress" className="block text-white font-medium mb-2">
              Wallet Address
            </label>
            <input
              id="walletAddress"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              disabled={isLoading}
              className={cn(
                'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg',
                'text-white placeholder-white/50',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200'
              )}
            />
          </div>

          <div>
            <label htmlFor="displayName" className="block text-white font-medium mb-2">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter a friendly name"
              disabled={isLoading}
              maxLength={MAX_DISPLAY_NAME_LENGTH}
              className={cn(
                'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg',
                'text-white placeholder-white/50',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200'
              )}
            />
            <div className="text-xs text-white/50 mt-1">
              {displayName.length}/{MAX_DISPLAY_NAME_LENGTH}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !walletAddress.trim() || !displayName.trim()}
              className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Add Contact'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
