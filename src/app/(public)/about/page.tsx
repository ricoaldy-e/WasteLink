import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { publicMetadata, SITE_DESCRIPTION } from '@/lib/site';

export const metadata = publicMetadata('Tentang | WasteLink', 'Kenali WasteLink, direktori pengepul limbah tahap awal, cara penggunaannya, dan batas layanan yang tersedia.', '/about');

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
            {SITE_DESCRIPTION}
          </p>
        </div>
      </section>

      <Section className="bg-surface" contained>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h1 text-text-primary mb-6">Apa Itu WasteLink?</h2>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            WasteLink adalah proyek direktori dan informasi pengelolaan limbah dalam tahap MVP awal. Mencari informasi kategori sampah dan kontak pengepul bisa memerlukan pencarian di berbagai tempat. WasteLink menyajikan informasi tersebut dalam satu direktori yang dapat diakses masyarakat umum tanpa akun. Data kategori dan pengepul dikelola melalui area admin.
          </p>
        </div>
      </Section>

      <Section className="bg-background border-y border-border" contained>
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-h1 text-text-primary mb-4">Informasi yang Tersedia</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Mulai dari kategori sampah, lalu lihat informasi pengepul yang menerima kategori tersebut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card variant="default" className="text-left">
            <h3 className="text-h2 text-brand-green mb-4">Direktori Pengepul</h3>
            <p className="text-body-md text-text-secondary leading-relaxed">
              Lihat kategori yang diterima, deskripsi, jam operasional, serta kontak WhatsApp dan tautan lokasi jika tersedia. Kelengkapan informasi dapat berbeda pada setiap pengepul.
            </p>
          </Card>
          
          <Card variant="default" className="text-left">
            <h3 className="text-h2 text-brand-green mb-4">Informasi Kategori</h3>
            <p className="text-body-md text-text-secondary leading-relaxed">
              Baca deskripsi kategori dan materi edukasi pengelolaan limbah jika tersedia. Informasi ini membantu Anda mengenali jenis sampah sebelum menghubungi pengepul.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-surface" contained>
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">Cara Menggunakan WasteLink</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Gunakan direktori untuk mencari informasi, lalu konfirmasikan kebutuhan Anda langsung kepada pengepul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative">
          {[
            { step: '01', title: 'Pilih Kategori Limbah', desc: 'Pilih jenis sampah dari kategori yang tersedia dan baca informasi pengelolaannya.' },
            { step: '02', title: 'Temukan Pengepul', desc: 'Jelajahi daftar pengepul yang menerima kategori limbah tersebut. Periksa lokasi dan jam operasionalnya.' },
            { step: '03', title: 'Hubungi Pengepul', desc: 'Gunakan kontak yang tersedia untuk mengonfirmasi jenis limbah yang diterima, lokasi, dan jam operasional sebelum berkunjung.' }
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

      <Section className="bg-background border-t border-border" contained>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 text-text-primary mb-4">Batas Layanan Saat Ini</h2>
          <p className="text-body-md text-text-secondary leading-relaxed">
            WasteLink menyediakan informasi, bukan layanan transaksi, pembayaran, pemesanan penjemputan, atau logistik. Belum ada program pemeriksaan kelayakan pengepul maupun fitur ulasan pengguna. Pencantuman dalam direktori tidak menjamin kualitas layanan. Informasi dapat berubah; pastikan detailnya langsung kepada pengepul.
          </p>
          <Link href="/terms" className="inline-block mt-4 text-brand-green underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">Baca ketentuan penggunaan</Link>
        </div>
      </Section>

      <Section className="bg-brand-green text-center border-t border-border" contained>
        <h2 className="text-display-xl text-white mb-6">Jelajahi Kategori Limbah</h2>
        <p className="text-body-lg text-white mb-10 max-w-2xl mx-auto opacity-90">
          Lihat kategori yang tersedia dan temukan informasi pengepul yang menerimanya.
        </p>
        <Link href="/categories" className="inline-flex items-center justify-center bg-white text-brand-green hover:bg-background min-h-[56px] px-8 py-3 text-lg font-semibold rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Lihat kategori limbah
        </Link>
      </Section>
    </>
  );
}
