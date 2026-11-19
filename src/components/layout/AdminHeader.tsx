"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, useState } from "react";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/features/admin/ConfirmDialog";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

const segmentMap: Record<string, string> = {
  dashboard: "Dashboard",
  categories: "Kategori",
  collectors: "Pengepul",
  create: "Tambah",
  edit: "Ubah",
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments
    .map((segment, index) => {
      const mapped = segmentMap[segment.toLowerCase()];
      if (!mapped) return null;
      const href = "/" + segments.slice(0, index + 1).join("/");
      return { label: mapped, href };
    })
    .filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface">
        <div className="flex h-16 items-center justify-between gap-4 px-6 lg:px-10">
          {/* Kiri: tombol menu + breadcrumb */}
          <div className="flex min-w-0 items-center gap-2">
            {onMenuClick && (
              <button
                type="button"
                className="-ml-3 inline-flex size-11 items-center justify-center rounded-sm text-ink transition-colors duration-150 hover:bg-bg-alt lg:hidden"
                onClick={onMenuClick}
                aria-label="Buka menu navigasi"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            )}

            {/* Mobile: nama halaman saat ini */}
            <span className="truncate text-small font-semibold text-ink lg:hidden">
              {breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard"}
            </span>

            {/* Desktop: breadcrumb */}
            <nav aria-label="Breadcrumb" className="hidden lg:block">
              <ol className="flex items-center gap-2 text-small font-semibold text-muted">
                {breadcrumbs.map((crumb, index) => {
                  const last = index === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.href} className="flex items-center gap-2">
                      {index > 0 && <span aria-hidden="true" className="text-subtle">/</span>}
                      {last ? (
                        <span aria-current="page" className="text-ink">{crumb.label}</span>
                      ) : (
                        <Link href={crumb.href} className="link-ui rounded-sm hover:text-ink">
                          {crumb.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          {/* Kanan: keluar */}
          <Button variant="secondary" size="sm" onClick={() => setIsLogoutOpen(true)} disabled={isPending}>
            Keluar
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </Button>
        </div>
      </header>

      <ConfirmDialog
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        title="Keluar dari panel admin?"
        confirmLabel="Keluar"
        busyLabel="Keluar…"
        tone="primary"
        busy={isPending}
        onConfirm={() => {
          startTransition(async () => {
            await logoutAction();
          });
        }}
      >
        Sesi Anda akan diakhiri. Anda perlu masuk kembali untuk membuka panel admin.
      </ConfirmDialog>
    </>
  );
}
