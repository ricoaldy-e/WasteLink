import Link from 'next/link';

interface StatsPanelProps {
  collectorsCount: number;
  categoriesCount: number;
}

const formatNumber = new Intl.NumberFormat('id-ID');

/**
 * Fakta singkat di bawah hero. Angka pertama jatuh di kolom teks (5/12) dan angka kedua di kolom foto (7/12), sehingga keduanya sejajar dengan blok di atasnya.
 * Dirender di server, jadi angkanya langsung benar (tanpa hitung-naik dari 0).
 */
export function StatsPanel({ collectorsCount, categoriesCount }: StatsPanelProps) {
  const stats = [
    { href: '/collectors', value: collectorsCount, label: 'pengepul aktif' },
    { href: '/categories', value: categoriesCount, label: 'kategori limbah' },
  ];

  return (
    <ul className="mt-12 grid grid-cols-2 gap-x-6 border-t border-border pt-6 md:mt-14 lg:grid-cols-12 lg:gap-x-12">
      {stats.map((stat, i) => (
        <li key={stat.href} className={i === 0 ? 'lg:col-span-5' : 'lg:col-span-7'}>
          <Link href={stat.href} className="group flex flex-col gap-1 rounded-sm sm:flex-row sm:items-baseline sm:gap-3">
            <span className="font-display font-semibold leading-none lining-nums tabular-nums text-ink text-[length:clamp(2.75rem,2rem_+_3vw,4.25rem)]">
              {formatNumber.format(stat.value)}
            </span>
            <span className="text-body font-medium text-muted link-ui group-hover:text-ink group-hover:[text-decoration-color:currentColor]">
              {stat.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
