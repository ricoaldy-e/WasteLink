import Form from 'next/form';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/arrow-icon';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/layout/Section';
import { StatsPanel } from '@/components/features/CollectorCounter';
import { NumberedSteps } from '@/components/features/NumberedSteps';
import { CategoryCard } from '@/components/features/CategoryCard';
import { HeroIllustration, SortIllustration, TruckIllustration } from '@/components/features/Illustrations';
import { createClient } from '@/lib/supabase/server';
import { getCategoryCounts } from '@/lib/category-counts';
import { publicMetadata, SITE_DESCRIPTION } from '@/lib/site';

export const metadata = publicMetadata('WasteLink | Direktori Pengepul Limbah', SITE_DESCRIPTION, '/');

const steps = [
  {
    title: 'Pilih jenis limbah',
    desc: 'Buka kategori yang sesuai dengan sampah Anda untuk melihat pengepul yang menerimanya.',
  },
  {
    title: 'Bandingkan pengepul',
    desc: 'Setiap profil memuat alamat, kontak, dan jam buka yang tersedia.',
  },
  {
    title: 'Hubungi langsung',
    desc: 'Pastikan jenis limbah dan jam buka lewat kontak pengepul sebelum datang. Pembayaran dan penjemputan diatur langsung antara Anda dan pengepul.',
  },
];

// Aksi teks: hover = warna + garis bawah tipis, bobot tetap 500 (tidak menebal).
const textLinkClass =
  'inline-flex min-h-11 items-center gap-2 rounded-sm text-action text-primary link-ui hover:text-primary-hover motion-safe:hover:[&_[data-arrow]]:translate-x-0.5';

const assurances = [
  { title: 'Data dikelola pengelola', desc: 'Kategori dan pengepul dicatat dan diperbarui oleh pengelola WasteLink.' },
  { title: 'Gratis, tanpa akun', desc: 'Tidak ada biaya maupun pendaftaran untuk mencari pengepul.' },
  { title: 'Hubungi langsung', desc: 'WasteLink bukan perantara. Pembayaran dan penjemputan diatur antara Anda dan pengepul.' },
];

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: categories }, { count: activeCollectorsCount }, { count: totalCategoriesCount }, counts] = await Promise.all([
    supabase.from('categories').select('id, name, description, image_url').order('name').limit(4),
    supabase.from('collectors').select('*', { count: 'exact', head: true }).eq('status', true),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    getCategoryCounts(supabase),
  ]);

  return (
    <>
      {/* Hero: foto pengepul sungguhan sebagai latar (misi situs ini adalah manusianya), ditutup scrim hijau tua
          supaya teks terbaca. Header tetap solid di atasnya. Tanpa animasi masuk. */}
      <section className="relative isolate overflow-hidden bg-primary-pressed text-on-primary [&_:focus-visible]:outline-on-primary">
        {/* Mobile: foto tampil utuh di atas teks (wajahnya tidak boleh tertutup). lg: jadi latar penuh dengan scrim dari kiri. */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-20 lg:aspect-auto">
          <Image
            src="/images/pengepul-hero.jpg"
            alt="Seorang pengepul tersenyum sambil mendorong gerobak penuh karung limbah di jalan permukiman"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_25%] lg:object-[80%_30%]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary-pressed to-transparent lg:hidden" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block lg:bg-linear-to-r lg:from-primary-pressed lg:via-primary-pressed/85 lg:to-primary-pressed/0" />
        <Container className="relative pb-12 pt-6 md:pb-16 lg:flex lg:min-h-[34rem] lg:items-center lg:py-28">
          <div className="max-w-[38rem]">
            <p className="text-eyebrow text-on-primary/80">Direktori pengepul limbah</p>
            <h1 className="mt-4 font-display text-[length:clamp(2.75rem,1rem_+_8vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
              Temukan <span className="text-accent">pengepul</span> limbah
            </h1>
            <p className="mt-6 max-w-[44ch] text-body-lg text-on-primary/90">
              Pilah sampah di rumah, lalu jual langsung kepada pengepul di dekat Anda. Lihat alamat dan kontaknya. Gratis, tanpa akun.
            </p>

            <Form action="/collectors" role="search" className="mt-8">
              <Label htmlFor="hero-q" className="text-on-primary!">Nama pengepul, alamat, atau jenis limbah</Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input id="hero-q" name="q" type="search" placeholder="Contoh: kardus" autoComplete="off" enterKeyHint="search" className="sm:flex-1" />
                <Button type="submit" className="shrink-0 bg-on-primary! text-primary! hover:bg-white!">
                  Cari pengepul
                  <ArrowIcon />
                </Button>
              </div>
            </Form>
            <p className="mt-3 text-small text-on-primary/90">
              Belum tahu jenisnya?{' '}
              <Link href="/categories" className="link font-medium text-on-primary hover:text-white">
                Lihat kategori limbah
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-10 md:pb-14">
        <Container>
          <StatsPanel collectorsCount={activeCollectorsCount ?? 0} categoriesCount={totalCategoriesCount ?? 0} />
        </Container>
      </section>

      {/* Jaminan singkat: apa yang WasteLink lakukan dan tidak lakukan (selaras dengan halaman Tentang). */}
      <section className="border-y border-border bg-surface">
        <Container>
          <dl className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {assurances.map((a, i) => (
              <Reveal key={a.title} delay={i * 90} className="py-6 md:px-8 md:first:ps-0 md:last:pe-0">
                <dt className="font-display text-[1.375rem] font-semibold leading-tight text-ink">{a.title}</dt>
                <dd className="mt-2 max-w-[40ch] text-small text-muted">{a.desc}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Misi: kenapa memilah, dan siapa yang terbantu. Foto kedua + sketsa alurnya. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-alt outline -outline-offset-1 outline-black/10 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <Image
                src="/images/pengepul-pilah.jpg"
                alt="Seorang pengepul lanjut usia mendorong gerobaknya di jalan, bertumpu pada pegangan gerobak"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[30%_45%]"
              />
            </div>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-7">
            <p className="text-eyebrow text-muted">Mengapa memilah</p>
            <h2 className="mt-3 text-h2 text-ink">Sampah yang Anda pilah punya nilai, untuk Anda dan untuk mereka</h2>
            <p className="mt-4 max-w-[56ch] text-body-lg text-muted">
              Botol, kardus, dan kaleng yang sudah dipilah punya nilai jual. Pengepul membelinya dari Anda, mengumpulkannya, lalu menyalurkannya kembali. Anda mendapat uang dari sampah yang biasanya terbuang, dan mereka mendapat penghasilan untuk mencari nafkah setiap hari.
            </p>
            <p className="mt-3 max-w-[56ch] text-body text-muted">
              Dengan memilah di rumah lalu menjualnya langsung kepada pengepul di dekat Anda, sampah yang berakhir di tempat pembuangan berkurang. Harga dan jenis yang diterima disepakati langsung dengan pengepul. WasteLink hanya membantu Anda menemukan mereka.
            </p>
            <Link href="/categories" className={`${textLinkClass} mt-3`}>
              Lihat apa saja yang bisa dipilah
              <ArrowIcon />
            </Link>
            <HeroIllustration className="mt-8 max-w-[40rem]" />
          </Reveal>
        </div>
      </Section>

      {/* Cara kerja: daftar bernomor editorial */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <h2 className="text-h2 text-ink">Cara kerja</h2>
            <p className="mt-4 max-w-[32ch] text-body-lg text-muted">Tiga langkah, tanpa akun dan tanpa biaya.</p>
            <SortIllustration className="mt-10 hidden max-w-[20rem] lg:block" />
          </Reveal>
          <div className="lg:col-span-8">
            <NumberedSteps steps={steps} />
          </div>
        </div>
      </Section>

      {/* Kategori */}
      <Section className="border-t border-border bg-bg-alt">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <h2 className="text-h2 text-ink">Kategori limbah</h2>
            <p className="mt-4 max-w-[52ch] text-body-lg text-muted">Pilih jenis sampah untuk melihat pengepul yang menerimanya.</p>
          </div>
          <Link href="/categories" className={textLinkClass}>
            Semua kategori
            <ArrowIcon />
          </Link>
        </Reveal>

        {categories && categories.length > 0 ? (
          <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-4">
            {categories.map((cat, i) => (
              <Reveal as="li" key={cat.id} delay={i * 90}>
                <CategoryCard category={cat} count={counts[cat.id] ?? 0} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-body text-muted">
            Belum ada kategori yang terdaftar.{' '}
            <Link href="/collectors" className="link font-medium text-primary hover:text-primary-hover">
              Lihat semua pengepul
            </Link>
          </p>
        )}
      </Section>

      {/* Penutup: blok teal datar */}
      <section className="bg-primary text-on-primary [&_:focus-visible]:outline-on-primary">
        <Container className="py-[clamp(3rem,2rem_+_4vw,6rem)]">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
            <div className="lg:col-span-7">
              <h2 className="text-h2 text-white">Siap mencari pengepul?</h2>
              <p className="mt-4 max-w-[56ch] text-body-lg text-on-primary/90">
                Pilih kategori limbah Anda, atau cari langsung berdasarkan nama pengepul.
              </p>
              <p className="mt-3 max-w-[56ch] text-small text-on-primary/90">
                WasteLink hanya menyediakan informasi. Pembayaran dan penjemputan diatur langsung antara Anda dan pengepul.
              </p>
              <Link
                href="/collectors"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-sm bg-on-primary px-5 text-btn text-primary transition-colors duration-150 hover:bg-white motion-safe:hover:[&_[data-arrow]]:translate-x-0.5"
              >
                Lihat semua pengepul
                <ArrowIcon />
              </Link>
            </div>
            <div className="max-w-md lg:col-span-5 lg:max-w-none">
              <TruckIllustration />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
