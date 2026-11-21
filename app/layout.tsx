import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  isPreviewDeployment,
  SITE_DESCRIPTION,
  SITE_ORIGIN,
  SITE_TITLE,
} from '@/lib/site';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_TITLE,
    template: '%s | BookingCW',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'BookingCW Portfolio Demo',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    siteName: 'BookingCW Portfolio Demo',
    locale: 'en_US',
    images: [
      {
        url: '/images/banner-1.png',
        width: 1920,
        height: 1080,
        alt: 'Illustrative hotel-inspired interior for the BookingCW portfolio demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/banner-1.png'],
  },
  robots: {
    index: !isPreviewDeployment(),
    follow: !isPreviewDeployment(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
