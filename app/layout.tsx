import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'ConvoKit - Your wallet-native messaging companion',
  description: 'A simple messaging app for Base users to send text messages to their contacts within the Base ecosystem.',
  openGraph: {
    title: 'ConvoKit',
    description: 'Your simple, wallet-native messaging companion.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
