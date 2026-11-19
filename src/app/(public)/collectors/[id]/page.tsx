import { ViewTransition } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { BackLink } from '@/components/ui/back-link';
import { Container } from '@/components/ui/container';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import { publicMetadata, COLLECTOR_DISCLAIMER } from '@/lib/site';

interface CollectorDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CollectorDetailPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: collector } = await supabase
    .from('collectors')
    .select('name, description')
    .eq('id', resolvedParams.id)
    .eq('status', true)
    .single();

  if (!collector) {
    notFound();
  }

  return publicMetadata(`${collector.name} | WasteLink`, `Lihat informasi ${collector.name}, kategori limbah yang diterima, serta kontak, lokasi, dan jam operasional yang tersedia.`, `/collectors/${encodeURIComponent(resolvedParams.id)}`);
}

// Sama dengan <Button variant="primary">, tapi sebagai <a> karena ini tautan keluar.
const waClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 text-btn text-on-primary transition-colors duration-150 hover:bg-primary-hover active:bg-primary-pressed';

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
      <dt className="text-small font-semibold text-muted">{label}</dt>
      <dd className="text-body text-ink">{children}</dd>
    </div>
  );
}

const Missing = () => <span className="text-muted">Belum dicantumkan</span>;

export default async function CollectorDetailPage({ params }: CollectorDetailPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: collector, error } = await supabase
    .from('collectors')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('id', resolvedParams.id)
    .single();

  if (error || !collector || collector.status !== true) {
    notFound();
  }

  const waNumber = collector.whatsapp ? collector.whatsapp.replace(/\D/g, '') : '';
  const formattedWaNumber = waNumber.startsWith('0') ? '62' + waNumber.slice(1) : waNumber;
  const waHref = waNumber
    ? `https://wa.me/${formattedWaNumber}?text=${encodeURIComponent(`Halo ${collector.name}, saya mendapat info dari WasteLink.`)}`
    : null;
  const mapsHref = collector.address
    ? collector.address.startsWith('http') ? collector.address : `https://${collector.address}`
    : null;

  const waLink = (
    <a href={waHref ?? undefined} target="_blank" rel="noopener noreferrer" className={waClass}>
      <WhatsAppIcon />
      Hubungi via WhatsApp
      <span className="sr-only">(membuka tab baru)</span>
    </a>
  );

  return (
    <Section className="pt-8 md:pt-10" contained={false}>
      <Container>
        <BackLink href="/collectors">Semua pengepul</BackLink>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          <header className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-wrap items-center gap-2">
              {collector.categories?.name && <Badge variant="neutral" showDot={false}>{collector.categories.name}</Badge>}
              <Badge variant="success">Aktif</Badge>
            </div>
            <h1 className="mt-4 break-words text-h2 text-ink">{collector.name}</h1>
            <p className="mt-4 max-w-[56ch] text-body-lg text-muted">{collector.description || 'Pengepul terdaftar di WasteLink.'}</p>
            {waHref && <div className="mt-6 hidden md:block">{waLink}</div>}
          </header>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <ViewTransition name={`collector-image-${collector.id}`} share="morph">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface">
                {collector.image_url ? (
                  <Image
                    src={collector.image_url}
                    alt={`Foto ${collector.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-small text-subtle">Tidak ada foto</div>
                )}
              </div>
            </ViewTransition>
          </div>

          <section aria-labelledby="info-heading" className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
            <h2 id="info-heading" className="text-h4 text-ink">Informasi pengepul</h2>
            <dl className="mt-4 border-t-2 border-ink">
              <InfoRow label="Lokasi">
                {mapsHref ? (
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm text-action text-primary link-ui hover:text-primary-hover"
                  >
                    Buka di Google Maps
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="sr-only">(membuka tab baru)</span>
                  </a>
                ) : (
                  <Missing />
                )}
              </InfoRow>
              <InfoRow label="Jam operasional">
                {collector.operational_hours ? <span className="whitespace-pre-line tabular-nums">{collector.operational_hours}</span> : <Missing />}
              </InfoRow>
              <InfoRow label="WhatsApp">
                {collector.whatsapp ? <span className="tabular-nums">{collector.whatsapp}</span> : <Missing />}
              </InfoRow>
            </dl>
            <p className="mt-6 max-w-prose text-small text-muted">{COLLECTOR_DISCLAIMER}</p>
          </section>
        </div>
      </Container>

      {/* Mobile: tombol menempel di dasar layar selama bagian ini terlihat, lalu berhenti di ujungnya
          (sticky di dalam Section, bukan fixed, jadi tidak menutupi footer). */}
      {waHref && (
        <div className="sticky bottom-0 z-30 mt-8 border-t border-border bg-surface px-6 py-3 md:hidden">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className={`${waClass} w-full`}>
            <WhatsAppIcon />
            Hubungi via WhatsApp
            <span className="sr-only">(membuka tab baru)</span>
          </a>
        </div>
      )}
    </Section>
  );
}
