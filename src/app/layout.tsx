import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiexpertisematrix.netlify.app';
const siteName = 'AI × Expertise Matrix';
const description = 'Explore the four quadrants of AI adoption and domain expertise to understand opportunities, risks, and optimal strategies.';
const ogImage = `${siteUrl}/og-image.jpg`;

console.log(ogImage)

export const metadata: Metadata = {
  title: {
    default: `${siteName} - Interactive Analysis Tool`,
    template: `%s | ${siteName}`,
  },
  description,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: `${siteUrl}/favicon.ico`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: siteName,
    description,
    siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    images: [ogImage],
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
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
  verification: {
    // Add your verification tokens if needed
    // google: 'google-site-verification=...',
    // yandex: 'yandex-verification=...',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}