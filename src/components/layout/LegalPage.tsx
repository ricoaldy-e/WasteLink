import { Section } from '@/components/layout/Section';
import { CONTACT_EMAIL } from '@/lib/site';

/**
 * Halaman teks panjang (Privasi, Ketentuan, Kontak): satu kolom baca ≤ 68ch, rata kiri,
 * h1 → h2 (text-h3) dipisah garis. Tanpa kartu pembungkus.
 */
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <Section className="pt-10 md:pt-14" contained>
      <article className="max-w-[68ch]">
        <h1 className="text-h1 text-ink">{title}</h1>
        <p className="mt-4 text-body-lg text-muted">{intro}</p>
        <div className="mt-10 border-t-2 border-ink">{children}</div>
      </article>
    </Section>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-8">
      <h2 className="text-h3 text-ink">{title}</h2>
      <div className="mt-3 space-y-4 text-body text-muted">{children}</div>
    </section>
  );
}

/**
 * Pengganti frasa "ke mana menyampaikan": "melalui <email>" bila CONTACT_EMAIL diisi di lib/site.ts,
 * selain itu "kepada pengelola WasteLink". Dengan begitu tidak ada teks yang merujuk alamat yang tidak ada.
 */
export function ContactChannel() {
  if (!CONTACT_EMAIL) return <>kepada pengelola WasteLink</>;
  return (
    <>
      melalui{' '}
      <a href={`mailto:${CONTACT_EMAIL}`} className="link break-all rounded-sm font-medium text-primary hover:text-primary-hover">
        {CONTACT_EMAIL}
      </a>
    </>
  );
}
