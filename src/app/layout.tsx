import './globals.css';
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-heading',
  display: 'swap',
});

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://wastelinkapp.netlify.app'),
  title: 'WasteLink | Recycling for Everyone',
  description: 'Platform terpercaya yang menghubungkan Anda dengan jaringan pengepul limbah terdekat untuk pengelolaan sampah yang lebih bijak, mudah, dan efisien.',
  openGraph: {
    title: 'WasteLink | Recycling for Everyone',
    description: 'Platform terpercaya yang menghubungkan Anda dengan jaringan pengepul limbah terdekat untuk pengelolaan sampah yang lebih bijak, mudah, dan efisien.',
    url: 'https://wastelinkapp.netlify.app',
    siteName: 'WasteLink',
    images: [
      {
        url: '/logo.png', // Logo image from public folder
        width: 800,
        height: 800,
        alt: 'WasteLink Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${redHatDisplay.variable} ${redHatText.variable}`}>
      <body>
        <NextTopLoader color="#299E63" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
