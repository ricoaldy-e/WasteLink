import { Button } from '@/components/ui/button';
import { Card, CardIcon } from '@/components/ui/card';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').limit(6);

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-hero-gradient relative overflow-hidden text-center !py-16 md:!py-20 lg:!py-27" contained>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10">
          <h1 className="text-display-xl text-white mb-6">Mulai Langkah Daur Ulang Anda Bersama WasteLink</h1>
          <p className="text-body-lg text-white mb-10 max-w-2xl mx-auto opacity-90">
            Platform direktori terpercaya yang menghubungkan Anda dengan jaringan pengepul limbah terdekat untuk pengelolaan sampah yang lebih bijak, mudah, dan efisien.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/collectors" tabIndex={-1}>
              <Button className="!bg-white !text-brand-green hover:!bg-background w-full sm:w-auto h-[56px] px-8 text-lg">
                Cari Pengepul
              </Button>
            </Link>
            <Link href="/about" tabIndex={-1}>
              <Button className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white/10 w-full sm:w-auto h-[56px] px-8 text-lg">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Tentang Section */}
      <Section className="bg-background">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-h1 text-text-primary mb-4">Tentang WasteLink</h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
            Kami adalah platform direktori layanan publik modern yang menjembatani masyarakat dengan pengelola limbah. Kami percaya bahwa akses informasi yang cepat dan transparan adalah kunci utama dari partisipasi aktif masyarakat dalam melindungi lingkungan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
          <Card variant="default" className="text-center hover:shadow-md transition-shadow group">
            <CardIcon className="mx-auto mb-6 w-16 h-16 group-hover:scale-110 transition-transform">
              <span className="text-h2">1</span>
            </CardIcon>
            <h3 className="text-h3 text-text-primary mb-3">Pilih Kategori</h3>
            <p className="text-body-md text-text-secondary">Temukan berbagai kategori limbah seperti plastik, kertas, dan logam yang bisa didaur ulang.</p>
          </Card>
          <Card variant="default" className="text-center hover:shadow-md transition-shadow group">
            <CardIcon className="mx-auto mb-6 w-16 h-16 group-hover:scale-110 transition-transform">
              <span className="text-h2">2</span>
            </CardIcon>
            <h3 className="text-h3 text-text-primary mb-3">Cari Pengepul</h3>
            <p className="text-body-md text-text-secondary">Dapatkan informasi detail lokasi, kontak, dan jam operasional pengepul terdekat Anda.</p>
          </Card>
          <Card variant="default" className="text-center hover:shadow-md transition-shadow group">
            <CardIcon className="mx-auto mb-6 w-16 h-16 group-hover:scale-110 transition-transform">
              <span className="text-h2">3</span>
            </CardIcon>
            <h3 className="text-h3 text-text-primary mb-3">Mulai Daur Ulang</h3>
            <p className="text-body-md text-text-secondary">Hubungi pengepul dan jadikan limbah Anda kembali bernilai dan bermanfaat untuk bumi.</p>
          </Card>
        </div>
      </Section>

      {/* Kategori Section */}
      <Section className="bg-surface">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 lg:mb-12 gap-4">
          <div>
            <h2 className="text-h1 text-text-primary mb-3">Jelajahi Kategori</h2>
            <p className="text-body-lg text-text-secondary">Temukan tempat pengelolaan terbaik berdasarkan jenis sampah Anda.</p>
          </div>
          <Link href="/categories" tabIndex={-1}>
            <Button variant="secondary">Lihat Semua Kategori</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[8px] group h-full">
                <Card variant="default" className="h-full group-hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1 cursor-pointer flex flex-col">
                  <div className="aspect-video w-full bg-background rounded-[6px] mb-4 flex items-center justify-center overflow-hidden border border-border group-hover:border-brand-green transition-colors">
                    {cat.image_url ? (
                      <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-text-muted text-sm">Tidak ada gambar</span>
                    )}
                  </div>
                  <h3 className="text-h3 text-text-primary mb-2 group-hover:text-brand-green transition-colors">{cat.name}</h3>
                  <p className="text-body-sm text-text-secondary line-clamp-2 mt-auto">{cat.description}</p>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-background rounded-[8px] border border-border">
              <p className="text-body-md text-text-muted">Data kategori belum tersedia dari server.</p>
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-brand-green text-center" contained>
        <h2 className="text-display-xl text-white mb-6">Mari Jaga Lingkungan Bersama</h2>
        <p className="text-body-lg text-white mb-10 max-w-2xl mx-auto opacity-90">
          Jangan biarkan limbah menumpuk. Jadilah bagian dari solusi dengan mendukung pengepul lokal dan bantu mereka mengelola sampah menjadi sesuatu yang bermanfaat.
        </p>
        <Link href="/collectors" tabIndex={-1}>
          <Button className="!bg-white !text-brand-green hover:!bg-background h-[56px] px-8 text-lg">Mulai Cari Pengepul</Button>
        </Link>
      </Section>
    </>
  );
}
