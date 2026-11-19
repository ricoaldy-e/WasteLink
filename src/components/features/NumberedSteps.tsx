import { Reveal } from '@/components/ui/reveal';

/** Daftar langkah bernomor besar, dipisah garis (Beranda dan Tentang). Nomor dekoratif; urutan dibawa <ol>. */
export function NumberedSteps({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <ol className="border-t-2 border-ink">
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={i * 90}
          className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 border-b border-border py-8 sm:gap-x-10"
        >
          <span
            aria-hidden="true"
            className="w-[1.1em] font-display font-semibold leading-[0.9] lining-nums tabular-nums text-primary text-[length:clamp(3.5rem,2rem_+_5vw,6rem)]"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-h3 text-ink">{step.title}</h3>
            <p className="mt-2 max-w-[52ch] text-body text-muted">{step.desc}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
