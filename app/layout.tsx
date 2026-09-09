import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mmg-international-smart-card.muhammadhaseeb514006.chatgpt.site'),
  title: 'MMG International | Digital Business Card',
  description: 'Connect with MMG International in Faisalabad, Pakistan. Call, WhatsApp, email, find our location, and review us on Google.',
  icons: { icon: '/mmg-logo.jpeg', apple: '/mmg-logo.jpeg' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: '/',
    siteName: 'MMG International',
    title: 'MMG International | Digital Business Card',
    description: 'Call, WhatsApp, email or visit MMG International in Faisalabad, Pakistan.',
    images: [{
      url: 'https://mmg-international-smart-card.muhammadhaseeb514006.chatgpt.site/mmg-logo.jpeg',
      secureUrl: 'https://mmg-international-smart-card.muhammadhaseeb514006.chatgpt.site/mmg-logo.jpeg',
      width: 1254,
      height: 1254,
      type: 'image/jpeg',
      alt: 'MMG International official logo',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'MMG International | Digital Business Card',
    description: 'Call, WhatsApp, email or visit MMG International in Faisalabad, Pakistan.',
    images: [{
      url: 'https://mmg-international-smart-card.muhammadhaseeb514006.chatgpt.site/mmg-logo.jpeg',
      alt: 'MMG International official logo',
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
