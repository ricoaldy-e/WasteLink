import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('id, name, description, image_url').order('name').limit(8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] h-[85vh] flex items-center overflow-hidden">
        
        {/* Right Side / Background Image */}
        {/* Mengurangi lebar pembungkus (container) agar gambar tidak terlalu ter-stretch (nge-zoom) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%] z-0 bg-gray-100">
          <Image
            src="/images/hero-bg.jpg"
            alt="WasteLink Hero Background"
            fill
            priority
            className="object-cover object-center md:object-right"
            sizes="100vw"
          />
          {/* Subtle dark gradient from right to make sure image looks deep */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent hidden md:block" />
          {/* Mobile dark overlay so text is readable if screen is small */}
          <div className="absolute inset-0 bg-black/50 md:hidden" />
        </div>

        {/* Curved Green Overlay (Left Side) */}
        <div className="absolute top-0 bottom-0 left-0 w-full md:w-[55%] lg:w-[50%] z-10 bg-[#24925A]/95 md:bg-[#24925A] flex flex-col justify-center">
          {/* SVG Curve - Hidden on mobile, visible on tablet+ */}
          <svg 
            className="hidden md:block absolute top-0 bottom-0 left-[99%] h-full w-[150px] lg:w-[200px] text-[#24925A]" 
            preserveAspectRatio="none" 
            viewBox="0 0 100 100" 
            fill="currentColor"
          >
            <path d="M0,0 Q100,50 0,100 Z" />
          </svg>
          
          {/* Decorative thin curved line */}
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
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              Recycling for <br />
              Everyone
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-50 mb-10 font-medium tracking-wide">
              #ubahjadikebaikan
            </p>
            
            <p className="text-base md:text-lg text-white/90 mb-10 max-w-lg leading-relaxed">
              Platform terpercaya yang menghubungkan Anda dengan jaringan pengepul limbah terdekat untuk pengelolaan sampah yang lebih bijak, mudah, dan efisien.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
              <Link href="/collectors" className="w-full sm:w-auto">
                <Button tabIndex={-1} className="w-full sm:w-auto h-[52px] px-8 text-lg font-bold rounded-[8px] !bg-white !text-[#24925A] hover:!bg-gray-100 transition-colors shadow-sm">
                  Cari Pengepul
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button tabIndex={-1} className="w-full sm:w-auto h-[52px] px-8 text-lg font-bold rounded-[8px] !bg-white/10 backdrop-blur-md !border-2 !border-solid !border-white/70 !text-white hover:!bg-white/20 transition-all shadow-sm">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Section */}
      <Section className="bg-background !py-24">
        <div className="text-center mb-16 md:mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">Cara Kerja WasteLink</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">Tiga langkah mudah untuk mulai mengelola limbah Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative group/flow">
          {/* Garis penghubung di belakang (Desktop only) yang muncul saat hover */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-border/30 z-0 rounded-full overflow-hidden">
            <div className="w-full h-full bg-brand-green/80 -translate-x-full group-hover/flow:translate-x-0 transition-transform duration-1000 ease-out" />
          </div>

          {[
            { step: '01', title: 'Pilih Kategori', desc: 'Temukan berbagai kategori limbah seperti plastik, kertas, dan logam yang bisa didaur ulang.' },
            { step: '02', title: 'Cari Pengepul', desc: 'Dapatkan informasi detail lokasi, kontak, dan jam operasional pengepul terdekat Anda.' },
            { step: '03', title: 'Mulai Daur Ulang', desc: 'Hubungi pengepul dan jadikan limbah Anda kembali bernilai dan bermanfaat untuk bumi.' }
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-[2rem] bg-white shadow-sm flex items-center justify-center mb-8 relative z-10 transition-colors duration-300 border border-border group-hover:border-brand-green group-hover:bg-brand-green/5">
                <span className="text-4xl font-extrabold text-brand-green transition-colors">{item.step}</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4 transition-colors duration-300">{item.title}</h3>
              <p className="text-base text-text-secondary leading-relaxed max-w-[280px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kategori Section */}
      <Section className="bg-surface !py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">Jelajahi Kategori</h2>
            <p className="text-lg text-text-secondary">Temukan tempat pengelolaan terbaik berdasarkan jenis sampah Anda.</p>
          </div>
          <Link href="/categories" className="shrink-0">
            <Button tabIndex={-1} variant="secondary" className="h-[44px] px-6 !bg-transparent hover:!bg-brand-green hover:!text-white transition-all duration-300 border-border hover:border-brand-green">
              Lihat Semua Kategori
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-2xl group h-full">
                <Card className="h-full border-0 shadow-sm group-hover:shadow-elevated transition-all duration-500 overflow-hidden bg-white flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-border/50">
                    {cat.image_url ? (
                      <>
                        <Image
                          src={cat.image_url}
                          alt={cat.name || "Kategori"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/80 via-[#1A202C]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <span className="text-text-muted text-sm font-medium">Tanpa Gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative z-10 bg-white">
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-green transition-colors">{cat.name}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mt-auto leading-relaxed">{cat.description}</p>
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

      {/* CTA Section */}
      <div className="bg-surface pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-brand-green rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          {/* Decorative patterns */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#122C4D] opacity-20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 py-20 md:py-24 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              Mari Jaga Lingkungan Bersama
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              Jangan biarkan limbah menumpuk. Jadilah bagian dari solusi dengan mendukung pengepul lokal dan bantu mereka mengelola sampah menjadi sesuatu yang bermanfaat.
            </p>
            <Link href="/collectors" className="mt-2">
              <Button tabIndex={-1} className="h-[52px] px-8 text-lg font-bold rounded-[8px] !bg-white !text-[#24925A] hover:!bg-gray-50 transition-colors shadow-sm">
                Mulai Cari Pengepul
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
