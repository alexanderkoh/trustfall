import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { structuredData } from "./structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trustfall: Vault Wars – A Game of DeFi, Strategy, and Reputation | Hoops Finance",
  description: "Enter Trustfall: Vault Wars — a cinematic, interactive DeFi game where you choose to trust or betray. Powered by Hoops Finance, earn real yield, build reputation, and join the Lumina Collective or the Shadow Syndicate. The Vault is open. Your choice matters.",
  metadataBase: new URL('https://trustfall.hoops.finance'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Trustfall: Vault Wars – A Game of DeFi, Strategy, and Reputation | Hoops Finance",
    description: "Enter Trustfall: Vault Wars — a cinematic, interactive DeFi game where you choose to trust or betray. Powered by Hoops Finance, earn real yield, build reputation, and join the Lumina Collective or the Shadow Syndicate. The Vault is open. Your choice matters.",
    url: "https://trustfall.hoops.finance",
    siteName: "Trustfall: Vault Wars",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/93fa4296-64d9-40b0-bae7-e93f2f83810f.png?token=hp4-cD_NhLaNaDVBJKLkJPI6LyeiBiWs363oUtmVFQQ&height=630&width=1200&expires=33289514370",
        width: 1200,
        height: 630,
        alt: "Trustfall: Vault Wars - Choose Your Faction"
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trustfall: Vault Wars – A Game of DeFi, Strategy, and Reputation | Hoops Finance",
    description: "Enter Trustfall: Vault Wars — a cinematic, interactive DeFi game where you choose to trust or betray. Powered by Hoops Finance, earn real yield, build reputation, and join the Lumina Collective or the Shadow Syndicate. The Vault is open. Your choice matters.",
    images: ["https://opengraph.b-cdn.net/production/images/93fa4296-64d9-40b0-bae7-e93f2f83810f.png?token=hp4-cD_NhLaNaDVBJKLkJPI6LyeiBiWs363oUtmVFQQ&height=630&width=1200&expires=33289514370"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'DeFi game',
    'blockchain gaming',
    'Hoops Finance',
    'Trustfall',
    'Vault Wars',
    'yield farming',
    'crypto strategy',
    'faction selection',
    'Lumina Collective',
    'Shadow Syndicate',
    'interactive fiction',
    'Web3 gaming'
  ],
  authors: [{ name: 'Hoops Finance' }],
  creator: 'Hoops Finance',
  publisher: 'Hoops Finance',
  alternates: {
    canonical: 'https://trustfall.hoops.finance',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  manifest: '/manifest.json',
  other: {
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Trustfall',
    'application-name': 'Trustfall: Vault Wars',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
