import './globals.css';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import { SITE_URL, SITE_DESCRIPTION, OG_IMAGE } from '@/lib/site';

// Self-host: tanpa fetch ke Google saat build, tanpa permintaan lintas-origin saat runtime.
// Fraunces: variabel opsz + bobot (500-700); optical size otomatis menebalkan huruf di ukuran kecil. Plus Jakarta Sans: variabel 400-700.
const fraunces = localFont({
  src: '../fonts/fraunces.woff2',
  weight: '500 700',
  variable: '--font-fraunces',
  display: 'swap',
});

const jakarta = localFont({
  src: '../fonts/plus-jakarta-sans.woff2',
  weight: '400 700',
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'WasteLink | Direktori Pengepul Limbah',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'WasteLink | Direktori Pengepul Limbah',
    description: SITE_DESCRIPTION,
    siteName: 'WasteLink',
    locale: 'id_ID',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: ['/twitter-image'] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <NextTopLoader color="var(--color-primary)" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
