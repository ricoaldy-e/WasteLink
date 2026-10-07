import type { Metadata } from 'next';

export const SITE_URL = 'https://wastelinkhub.app';
export const CONTACT_EMAIL = 'founder@wastelinkhub.app';
export const SITE_DESCRIPTION = 'WasteLink membantu masyarakat menemukan pengepul limbah berdasarkan kategori sampah dan informasi kontak yang tersedia.';

export function publicMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'WasteLink',
      locale: 'id_ID',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
