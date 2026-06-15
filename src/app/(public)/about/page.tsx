import { Section } from '@/components/layout/Section';
import { Card, CardIcon } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Tentang | WasteLink',
  description: 'Pelajari lebih lanjut tentang WasteLink, platform direktori yang membantu Anda menemukan pengepul limbah terdekat.',
};

export default function AboutPage() {
  return (
    <>
      <section className="relative w-full overflow-hidden text-center py-20 md:py-28 lg:py-36 bg-gray-900">
        <Image
          src="/images/about.png"
          alt="Tentang WasteLink"
          fill
          priority
          className="object-cover object-center brightness-[0.35]"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-display-xl text-white mb-6 tracking-tight">Tentang WasteLink</h1>
          <p className="text-body-lg text-white mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Platform direktori terpercaya yang didedikasikan untuk memudahkan pengelolaan limbah Anda dengan menghubungkan Anda ke jaringan pengepul terdekat.
          </p>
        </div>
      </section>

      <Section className="bg-surface" contained>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h1 text-text-primary mb-6">Apa Itu WasteLink?</h2>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            WasteLink adalah platform berbasis web yang berfungsi sebagai penghubung antara masyarakat dan pengepul limbah tanpa melibatkan transaksi online ataupun sistem penjemputan. Kami berfokus pada penyediaan informasi yang transparan, jelas, dan mudah diakses mengenai daftar pengepul yang menerima berbagai kategori sampah. Melalui WasteLink, masyarakat dapat memahami cara pengelolaan limbah yang tepat secara mandiri.
          </p>
        </div>
      </Section>

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

      <Section className="bg-surface" contained>
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">Cara Menggunakan WasteLink</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Hanya butuh tiga langkah mudah agar sampah di rumah Anda dapat dikelola oleh ahlinya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative">
          {[
            { step: '01', title: 'Pilih Kategori Limbah', desc: 'Pilih jenis sampah yang ingin Anda daur ulang dari halaman kategori kami (misalnya plastik, kertas, elektronik, dsb).' },
            { step: '02', title: 'Temukan Pengepul', desc: 'Jelajahi daftar pengepul yang menerima kategori limbah tersebut. Periksa lokasi dan jam operasionalnya.' },
            { step: '03', title: 'Hubungi Pengepul', desc: 'Hubungi kontak WhatsApp yang tersedia atau kunjungi alamat pengepul untuk menyerahkan sampah yang telah Anda pisahkan.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 rounded-[1.25rem] bg-brand-green-subtle/50 flex items-center justify-center mb-6 border border-brand-green/10">
                <span className="text-xl font-semibold text-brand-green">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

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
