"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, useState } from "react";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const segmentMap: Record<string, string> = {
    dashboard: "Dashboard",
    categories: "Kategori",
    collectors: "Pengepul",
    create: "Tambah",
    edit: "Ubah",
  };

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments
    .map((segment, index) => {
      const mapped = segmentMap[segment.toLowerCase()];
      if (!mapped) return null;
      
      const href = "/" + segments.slice(0, index + 1).join("/");
      return {
        label: mapped,
        href,
      };
    })
    .filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-border">
      <div className="flex h-[72px] items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-brand-green hover:bg-gray-100 rounded-[6px] transition-colors"
              onClick={onMenuClick}
              aria-label="Buka menu navigasi"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}

          <div className="flex items-center">
            <span className="lg:hidden text-lg uppercase tracking-widest text-text-primary font-bold">
              {breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard"}
            </span>
          </div>

          <nav className="hidden lg:flex items-center text-xs uppercase tracking-widest font-bold text-text-secondary gap-3">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-3">
                {index > 0 && <span className="text-border">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-brand-green">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-text-primary transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLogoutOpen(true)}
            disabled={isPending}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-red-600 border border-border hover:border-red-600 bg-white rounded-[6px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span>Keluar</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </header>

      {isLogoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
            onClick={() => !isPending && setIsLogoutOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 bg-white rounded-[12px] border border-border p-8 shadow-[rgba(18,44,77,0.12)_0px_10px_25px_0px] w-full max-w-[400px] text-center animate-in fade-in zoom-in-95 duration-200">
            <svg className="mx-auto mb-5 w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>

            <h2 id="logout-dialog-title" className="text-base font-bold text-text-primary uppercase tracking-wider mb-2">
              Konfirmasi Keluar
            </h2>
            
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Sesi Anda akan segera diakhiri. Anda perlu masuk kembali untuk mengakses panel Admin.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                className="w-full sm:flex-1 h-[44px] rounded-[6px] border border-border text-text-secondary bg-white hover:bg-gray-50 active:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-border"
                onClick={() => setIsLogoutOpen(false)}
                disabled={isPending}
              >
                Batal
              </button>
              
              <button
                className="w-full sm:flex-1 h-[44px] rounded-[6px] bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-sm"
                onClick={() => {
                  startTransition(async () => {
                    await logoutAction();
                  });
                }}
                disabled={isPending}
              >
                {isPending && (
                  <svg className="animate-spin w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                  </svg>
                )}
                {isPending ? "Memproses..." : "Ya, Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
