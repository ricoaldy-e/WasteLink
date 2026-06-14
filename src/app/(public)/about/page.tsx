import { Section } from '@/components/layout/Section';
import { Card, CardIcon } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Tentang | WasteLink',
  description: 'Pelajari lebih lanjut tentang WasteLink, platform direktori yang membantu Anda menemukan pengepul limbah terdekat.',
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Section className="bg-hero-gradient relative overflow-hidden text-center !py-16 md:!py-20 lg:!py-27" contained>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10">
          <h1 className="text-display-xl text-white mb-6">Tentang WasteLink</h1>
          <p className="text-body-lg text-white mb-8 max-w-2xl mx-auto opacity-90">
            Platform direktori terpercaya yang didedikasikan untuk memudahkan pengelolaan limbah Anda dengan menghubungkan Anda ke jaringan pengepul terdekat.
          </p>
        </div>
      </Section>

      {/* 2. Apa Itu WasteLink */}
      <Section className="bg-surface" contained>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h1 text-text-primary mb-6">Apa Itu WasteLink?</h2>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            WasteLink adalah platform berbasis web yang berfungsi sebagai penghubung antara masyarakat dan pengepul limbah tanpa melibatkan transaksi online ataupun sistem penjemputan. Kami berfokus pada penyediaan informasi yang transparan, jelas, dan mudah diakses mengenai daftar pengepul yang menerima berbagai kategori sampah. Melalui WasteLink, masyarakat dapat memahami cara pengelolaan limbah yang tepat secara mandiri.
          </p>
        </div>
      </Section>

      {/* 3. Misi WasteLink */}
      <Section className="bg-background border-y border-border" contained>
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-h1 text-text-primary mb-4">Misi Kami</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Kami hadir untuk memberikan dampak positif bagi lingkungan hidup melalui akses informasi pengelolaan limbah yang lebih baik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card variant="default" className="text-left">
            <h3 className="text-h2 text-brand-green mb-4">Membantu Masyarakat</h3>
            <p className="text-body-md text-text-secondary leading-relaxed">
              Memudahkan masyarakat umum untuk menemukan lokasi dan informasi kontak pengepul limbah terdekat yang bersedia menerima barang bekas berdasarkan jenis dan kategorinya.
            </p>
          </Card>
          
          <Card variant="default" className="text-left">
            <h3 className="text-h2 text-brand-green mb-4">Mendukung Pengelolaan</h3>
            <p className="text-body-md text-text-secondary leading-relaxed">
              Mendukung upaya kolektif pengurangan volume sampah yang berakhir di Tempat Pembuangan Akhir (TPA), sekaligus menumbuhkan kesadaran tentang pentingnya daur ulang dalam prinsip ekonomi sirkular.
            </p>
          </Card>
        </div>
      </Section>

      {/* 4. Cara Menggunakan */}
      <Section className="bg-surface" contained>
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">Cara Menggunakan WasteLink</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Hanya butuh tiga langkah mudah agar sampah di rumah Anda dapat dikelola oleh ahlinya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Card variant="default" className="text-center group hover:border-brand-green transition-colors">
            <CardIcon className="mx-auto mb-6 w-16 h-16 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </CardIcon>
            <h3 className="text-h3 text-text-primary mb-3">1. Pilih Kategori Limbah</h3>
            <p className="text-body-md text-text-secondary">
              Pilih jenis sampah yang ingin Anda daur ulang dari halaman kategori kami (misalnya plastik, kertas, elektronik, dsb).
            </p>
          </Card>

          <Card variant="default" className="text-center group hover:border-brand-green transition-colors">
            <CardIcon className="mx-auto mb-6 w-16 h-16 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </CardIcon>
            <h3 className="text-h3 text-text-primary mb-3">2. Temukan Pengepul</h3>
            <p className="text-body-md text-text-secondary">
              Jelajahi daftar pengepul yang menerima kategori limbah tersebut. Periksa lokasi dan jam operasionalnya.
            </p>
          </Card>

          <Card variant="default" className="text-center group hover:border-brand-green transition-colors">
            <CardIcon className="mx-auto mb-6 w-16 h-16 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </CardIcon>
            <h3 className="text-h3 text-text-primary mb-3">3. Hubungi Pengepul</h3>
            <p className="text-body-md text-text-secondary">
              Hubungi kontak WhatsApp yang tersedia atau kunjungi alamat pengepul untuk menyerahkan sampah yang telah Anda pisahkan.
            </p>
          </Card>
        </div>
      </Section>

      {/* 5. CTA Section */}
      <Section className="bg-brand-green text-center border-t border-border" contained>
        <h2 className="text-display-xl text-white mb-6">Mulai Daur Ulang Sekarang</h2>
        <p className="text-body-lg text-white mb-10 max-w-2xl mx-auto opacity-90">
          Temukan pengepul yang tepat untuk membantu mengelola sampah di rumah Anda menjadi hal yang lebih bermanfaat.
        </p>
        <Link href="/categories" tabIndex={-1}>
          <Button className="!bg-white !text-brand-green hover:!bg-background h-[56px] px-8 text-lg">
            Lihat Kategori Limbah
          </Button>
        </Link>
      </Section>
    </>
  );
}
