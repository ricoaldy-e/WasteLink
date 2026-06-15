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

  // Create a simple breadcrumb from the pathname
  // e.g. /dashboard/categories/create -> Dashboard / Categories / Create
  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    });

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger (Only visible on lg < screen) */}
          {onMenuClick && (
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-brand-green hover:bg-brand-green-subtle rounded-[6px]"
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

          {/* Breadcrumb Icon (Mobile) or Breadcrumb Text (Desktop) */}
          <div className="flex items-center">
            <span className="lg:hidden text-h3 text-text-primary font-bold">
              {breadcrumbs[breadcrumbs.length - 1] || "Dashboard"}
            </span>
          </div>

          {/* Breadcrumb */}
          <nav className="hidden lg:flex items-center text-body-sm text-text-secondary gap-2">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-text-muted">/</span>}
                <span className={index === breadcrumbs.length - 1 ? "font-semibold text-text-primary" : ""}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="!text-error hover:!bg-error-bg text-body-sm"
            onClick={() => setIsLogoutOpen(true)}
            disabled={isPending}
          >
            Keluar
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {isLogoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !isPending && setIsLogoutOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Box */}
          <div className="relative bg-white rounded-lg shadow-elevated w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-error-bg flex items-center justify-center mb-4 text-error">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <h2 id="logout-dialog-title" className="text-h3 text-text-primary mb-2">
                Keluar dari Admin?
              </h2>
              <p className="text-body-sm text-text-secondary mb-6">
                Sesi Anda akan diakhiri dan Anda harus masuk kembali untuk mengakses halaman ini.
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsLogoutOpen(false)}
                disabled={isPending}
              >
                Batal
              </Button>
              <Button
                variant="primary"
                className="flex-1 !bg-error hover:!bg-error/90 !text-white"
                onClick={() => {
                  startTransition(async () => {
                    await logoutAction();
                  });
                }}
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? "Keluar..." : "Ya, Keluar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
