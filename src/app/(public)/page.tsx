import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { StatsPanel } from '@/components/features/CollectorCounter';
import { publicMetadata, SITE_DESCRIPTION } from '@/lib/site';

export const metadata = publicMetadata('WasteLink | Direktori Pengepul Limbah', SITE_DESCRIPTION, '/');

export default async function HomePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('id, name, description, image_url').order('name').limit(8);

  const { count: activeCollectorsCount } = await supabase
    .from('collectors')
    .select('*', { count: 'exact', head: true })
    .eq('status', true);

  const { count: totalCategoriesCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  const totalActiveCollectors = activeCollectorsCount || 0;
  const totalCategories = totalCategoriesCount || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full min-h-[600px] h-[85vh] flex items-center overflow-hidden">

        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%] z-0 bg-gray-100">
          <Image
            src="/images/hero-bg.png"
            alt="WasteLink Hero Background"
            fill
            priority
            className="object-cover object-center md:object-right"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent hidden md:block" />
          <div className="absolute inset-0 bg-black/50 md:hidden" />
        </div>

        <div className="absolute top-0 bottom-0 left-0 w-full md:w-[55%] lg:w-[50%] z-10 bg-[#24925A]/95 md:bg-[#24925A] flex flex-col justify-center">
          <svg
            className="hidden md:block absolute top-0 bottom-0 left-[99%] h-full w-[150px] lg:w-[200px] text-[#24925A]"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M0,0 Q100,50 0,100 Z" />
          </svg>

          <svg
            className="hidden md:block absolute top-0 bottom-0 left-[100%] h-full w-[170px] lg:w-[230px] text-white/20 pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M0,0 Q100,50 0,100" />
          </svg>

          <div className="relative z-20 px-6 sm:px-10 lg:px-20 max-w-2xl w-full mx-auto md:mx-0 pt-20 pb-16">
            <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-wider leading-[1.1] mb-6 drop-shadow-sm">
              Temukan <br />
              Pengepul Limbah
            </h1>

            <p className="text-xl md:text-2xl text-emerald-50 mb-10 font-medium tracking-wide">
              Direktori limbah untuk masyarakat
            </p>

            <p className="text-base md:text-lg text-white/90 mb-10 max-w-lg leading-relaxed">
              {SITE_DESCRIPTION}
            </p>

            <div className="flex flex-wrap items-start gap-4 w-full">
              <Link href="/collectors" className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-6 py-3 text-base font-semibold rounded-[8px] bg-white text-[#24925A] hover:bg-gray-100 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Cari pengepul
              </Link>
              <Link href="/categories" className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-6 py-3 text-base font-semibold rounded-[8px] bg-white/10 backdrop-blur-md border-2 border-white/70 text-white hover:bg-white/20 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Jelajahi kategori
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-background !py-24">
        <div className="text-center mb-16 md:mb-20 relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-text-primary mb-4">Cara Kerja WasteLink</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">Tiga langkah mudah untuk mulai mengelola limbah Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative">
          {[
            { step: '01', title: 'Pilih Kategori', desc: 'Pilih jenis limbah dari kategori yang tersedia untuk melihat informasi pengelolaannya.' },
            { step: '02', title: 'Cari Pengepul', desc: 'Lihat kategori yang diterima serta informasi lokasi, kontak, dan jam operasional yang tersedia.' },
            { step: '03', title: 'Hubungi Pengepul', desc: 'Gunakan kontak yang tersedia untuk mengonfirmasi jenis limbah dan jam operasional secara langsung.' }
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

      <Section className="bg-surface !py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider text-text-primary mb-4">Jelajahi Kategori</h2>
            <p className="text-lg text-text-secondary">Lihat informasi limbah dan daftar pengepul berdasarkan kategori sampah Anda.</p>
          </div>
          <Link href="/categories" className="shrink-0 inline-flex items-center justify-center min-h-11 px-6 py-3 text-btn rounded-[6px] border border-border text-brand-green hover:bg-brand-green hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
            Lihat semua kategori
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.slice(0, 4).map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-2xl h-full">
                <Card className="h-full border border-border shadow-sm hover:border-brand-green/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-border/50">
                    {cat.image_url ? (
                      <Image
                        src={cat.image_url}
                        alt={cat.name || "Kategori"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <span className="text-text-muted text-sm font-medium">Tanpa Gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{cat.name}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{cat.description}</p>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-border">
              <p className="text-lg text-text-muted font-medium">Data kategori belum tersedia saat ini.</p>
            </div>
          )}
        </div>
      </Section>

      <div className="bg-surface pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#24925A] via-[#1F824F] to-[#17663E] rounded-[2.5rem] relative overflow-hidden shadow-xl border border-brand-green/20">

          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-8 py-16 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-wider text-white mb-6 leading-[1.2]">
                Cari Informasi Pengepul
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-emerald-50/90 mb-8 leading-relaxed max-w-2xl">
                WasteLink adalah MVP tahap awal. Jelajahi direktori tanpa akun dan hubungi pengepul secara langsung. WasteLink tidak memproses pembayaran atau mengatur penjemputan.
              </p>
              <Link href="/collectors" className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-base font-semibold rounded-[6px] bg-white text-[#24925A] hover:bg-emerald-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Lihat pengepul
              </Link>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <StatsPanel collectorsCount={totalActiveCollectors} categoriesCount={totalCategories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
