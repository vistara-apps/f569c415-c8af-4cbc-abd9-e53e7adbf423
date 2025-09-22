export const APP_CONFIG = {
  name: 'ConvoKit',
  tagline: 'Your simple, wallet-native messaging companion.',
  description: 'A simple messaging app for Base users to send text messages to their contacts within the Base ecosystem.',
} as const;

export const DESIGN_TOKENS = {
  colors: {
    background: 'hsl(210 40% 25% / 0.5)',
    accent: 'hsl(191 100% 41%)',
    primary: 'hsl(204 70% 53%)',
    surface: 'hsl(214 64% 12%)',
  },
  radius: {
    lg: '12px',
    md: '10px',
    sm: '6px',
  },
  spacing: {
    lg: '16px',
    md: '12px',
    sm: '8px',
  },
  shadows: {
    card: '0 2px 8px hsla(0, 0%, 0%, 0.1)',
  },
  animation: {
    duration: {
      base: 200,
      fast: 100,
    },
    easing: 'ease-in-out',
  },
} as const;

export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;

export const MAX_MESSAGE_LENGTH = 500;
export const MAX_DISPLAY_NAME_LENGTH = 50;
