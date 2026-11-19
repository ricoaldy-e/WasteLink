import type { Metadata } from 'next';

export const SITE_URL = 'https://wastelinkhub.app';
/** Alamat kontak resmi. `null` = tidak ditampilkan di mana pun; isi di sini dan footer + halaman legal ikut menampilkannya. */
export const CONTACT_EMAIL: string | null = null;
/** Gambar share (digenerate oleh app/opengraph-image.tsx). Harus disebut eksplisit: `openGraph` per halaman menimpa gambar dari file konvensi. */
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'WasteLink: temukan pengepul limbah di sekitar Anda' };
export const SITE_DESCRIPTION = 'WasteLink membantu masyarakat menemukan pengepul limbah berdasarkan kategori sampah dan informasi kontak yang tersedia.';
export const COLLECTOR_DISCLAIMER = 'Informasi dapat berubah. Konfirmasikan kategori yang diterima, lokasi, dan jam operasional langsung kepada pengepul. Pencantuman di WasteLink bukan jaminan kualitas layanan.';

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
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
  };
}
