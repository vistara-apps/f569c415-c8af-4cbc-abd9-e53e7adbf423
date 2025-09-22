# ConvoKit - Your Wallet-Native Messaging Companion

A simple messaging app for Base users to send text messages to their contacts within the Base ecosystem.

## Features

- **Basic Text Messaging**: Send and receive simple text-based messages to other Base Wallet users
- **Contact Management**: Add and manage contacts by wallet address with friendly display names
- **Simple & Intuitive UI**: Clean, uncluttered interface focused on core messaging functionality
- **In-Frame Farcaster Actions**: Integrates with Farcaster Frames for seamless interaction

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Coinbase L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.local` and add your OnchainKit API key
   - Get your API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Base App**:
   - The app is designed to run within Base App as a Mini App
   - For development, you can access it at `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main app component
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── MessageBubble.tsx
│   │   ├── ContactListItem.tsx
│   │   └── InputArea.tsx
│   ├── layout/            # Layout components
│   │   └── Header.tsx
│   └── features/          # Feature-specific components
│       ├── ContactList.tsx
│       ├── ChatView.tsx
│       └── AddContactModal.tsx
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants
└── public/                # Static assets
```

## Key Components

### MessageBubble
Displays individual messages with different variants for sent/received messages, including status indicators and timestamps.

### ContactListItem
Shows contact information in the contact list with avatar, name, last message preview, and unread count.

### InputArea
Text input component with send button, character count, and message validation.

### ChatView
Main chat interface showing message history and input area for active conversations.

### ContactList
Displays all contacts with search functionality and add contact button.

## Data Model

- **User**: Wallet address, Farcaster ID, display name
- **Contact**: User reference, contact wallet address, display name
- **Message**: Sender/receiver IDs, content, timestamp, delivery status

## Business Model

Pay-as-you-go micro-transactions for advanced features like message history storage, with potential for premium features like group chats and encrypted messages.

## Development

The app uses modern React patterns with TypeScript for type safety. All components are built with mobile-first responsive design and include proper error handling and loading states.

## Deployment

Built for deployment as a Base Mini App within the Base ecosystem. Ensure proper environment variables are set for production deployment.
