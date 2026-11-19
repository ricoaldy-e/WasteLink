import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/container';
import { ArrowIcon } from '@/components/ui/arrow-icon';
import { Reveal } from '@/components/ui/reveal';
import { LoopIllustration } from '@/components/features/Illustrations';
import { NumberedSteps } from '@/components/features/NumberedSteps';
import { publicMetadata, SITE_DESCRIPTION } from '@/lib/site';

export const metadata = publicMetadata('Tentang | WasteLink', 'Kenali WasteLink, direktori pengepul limbah, cara penggunaannya, dan batas layanan yang tersedia.', '/about');

const features = [
  {
    title: 'Direktori pengepul',
    desc: 'Lihat kategori yang diterima, deskripsi, jam operasional, serta kontak WhatsApp dan tautan lokasi jika tersedia. Kelengkapan informasi dapat berbeda pada setiap pengepul.',
  },
  {
    title: 'Informasi kategori',
    desc: 'Baca deskripsi kategori dan materi edukasi pengelolaan limbah jika tersedia. Informasi ini membantu Anda mengenali jenis sampah sebelum menghubungi pengepul.',
  },
];

const steps = [
  { title: 'Pilih kategori limbah', desc: 'Pilih jenis sampah dari kategori yang tersedia dan baca informasi pengelolaannya.' },
  { title: 'Temukan pengepul', desc: 'Jelajahi daftar pengepul yang menerima kategori limbah tersebut. Periksa lokasi dan jam operasionalnya.' },
  { title: 'Hubungi pengepul', desc: 'Gunakan kontak yang tersedia untuk mengonfirmasi jenis limbah yang diterima, lokasi, dan jam operasional sebelum berkunjung.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Tentang" title="Tentang WasteLink" description={SITE_DESCRIPTION} art={<LoopIllustration />} />

      <Section contained>
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="text-h2 text-ink lg:col-span-4">Apa itu WasteLink?</h2>
          <p className="max-w-[68ch] text-body-lg text-muted lg:col-span-8">
            WasteLink adalah direktori pengepul dan informasi pengelolaan limbah. Mencari informasi kategori sampah dan kontak pengepul bisa memerlukan pencarian di berbagai tempat. WasteLink menyajikan informasi tersebut dalam satu direktori yang dapat diakses masyarakat umum tanpa akun. Data kategori dan pengepul dikelola oleh pengelola WasteLink.
          </p>
        </div>
      </Section>

      <Section className="border-y border-border bg-bg-alt" contained>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 className="text-h2 text-ink">Informasi yang tersedia</h2>
            <p className="mt-4 max-w-[32ch] text-body-lg text-muted">Mulai dari kategori sampah, lalu lihat pengepul yang menerimanya.</p>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="border-t-2 border-ink pt-4">
                <h3 className="text-h3 text-ink">{f.title}</h3>
                <p className="mt-2 text-body text-muted">{f.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section contained>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 className="text-h2 text-ink">Cara menggunakan</h2>
            <p className="mt-4 max-w-[32ch] text-body-lg text-muted">Cari informasi di direktori, lalu konfirmasikan kebutuhan Anda langsung kepada pengepul.</p>
          </div>
          <div className="lg:col-span-8">
            <NumberedSteps steps={steps} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-bg-alt" contained>
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="text-h2 text-ink lg:col-span-4">Batas layanan saat ini</h2>
          <div className="lg:col-span-8">
            <p className="max-w-[68ch] text-body text-muted">
              WasteLink menyediakan informasi, bukan layanan transaksi, pembayaran, pemesanan penjemputan, atau logistik. Belum ada program pemeriksaan kelayakan pengepul maupun fitur ulasan pengguna. Pencantuman dalam direktori tidak menjamin kualitas layanan. Informasi dapat berubah; pastikan detailnya langsung kepada pengepul.
            </p>
            <Link
              href="/terms"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-action text-primary link-ui hover:text-primary-hover motion-safe:hover:[&_[data-arrow]]:translate-x-0.5"
            >
              Baca ketentuan penggunaan
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </Section>

      <section className="bg-primary text-on-primary [&_:focus-visible]:outline-on-primary">
        <Container className="py-[clamp(3rem,2rem_+_4vw,6rem)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
            <div className="lg:col-span-8">
              <h2 className="text-h2 text-white">Jelajahi kategori limbah</h2>
              <p className="mt-4 max-w-[56ch] text-body-lg text-on-primary/90">Lihat kategori yang tersedia dan temukan pengepul yang menerimanya.</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href="/categories"
                className="inline-flex h-11 items-center gap-2 rounded-sm bg-on-primary px-5 text-btn text-primary transition-colors duration-150 hover:bg-white motion-safe:hover:[&_[data-arrow]]:translate-x-0.5"
              >
                Lihat kategori limbah
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
