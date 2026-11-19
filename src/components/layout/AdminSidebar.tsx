"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const sidebarLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/categories",
    label: "Kategori",
    exact: false,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/collectors",
    label: "Pengepul",
    exact: false,
    icon: (
      <svg {...iconProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Baris logo: tinggi sama dengan AdminHeader (h-16) supaya garis bawahnya sejajar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 rounded-sm" aria-label="WasteLink, ke dashboard">
          <Image src="/logo-mark.png" alt="" width={34} height={26} className="h-6 w-auto object-contain" />
          <span className="font-display text-2xl font-semibold leading-none">
            <span className="text-primary">Waste</span>
            <span className="text-ink">Link</span>
          </span>
        </Link>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:bg-bg-alt hover:text-ink lg:hidden"
          onClick={onClose}
          aria-label="Tutup menu"
        >
          <svg {...iconProps} width={24} height={24}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav aria-label="Admin" className="flex-1 px-3 pt-6">
        <p className="px-3 pb-2 text-eyebrow text-subtle">Menu</p>
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-sm border-l-2 px-3 text-small font-semibold transition-colors duration-150 ${
                    isActive ? "border-primary bg-bg-alt text-ink" : "border-transparent text-muted hover:bg-bg-alt hover:text-ink"
                  }`}
                >
                  <span className={isActive ? "text-primary" : "text-subtle"}>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3 border-t border-border p-6">
        <div aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-small font-semibold text-on-primary">
          A
        </div>
        <div className="min-w-0">
          <p className="truncate text-small font-semibold text-ink">Admin</p>
          <p className="truncate text-caption text-muted">Panel WasteLink</p>
        </div>
      </div>
    </aside>
  );
}
