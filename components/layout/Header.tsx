'use client';

import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, onBack, actions, className }: HeaderProps) {
  return (
    <header className={cn(
      'flex items-center justify-between p-4',
      'bg-white/5 backdrop-blur-sm border-b border-white/10',
      'sticky top-0 z-10',
      className
    )}>
      <div className="flex items-center space-x-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <div>
          <h1 className="text-white font-semibold text-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/70 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </header>
  );
}
