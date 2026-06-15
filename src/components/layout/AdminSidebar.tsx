"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarLinks = [
  { 
    href: "/dashboard", 
    label: "Dashboard", 
    exact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    )
  },
  { 
    href: "/dashboard/categories", 
    label: "Kategori", 
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    )
  },
  { 
    href: "/dashboard/collectors", 
    label: "Pengepul", 
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-border shadow-sm
        transform transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between h-[72px] px-6 border-b border-border/60 bg-white">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="text-xl text-brand-green font-bold whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px] tracking-tight flex items-center gap-2"
        >
          <Image src="/logo.png" alt="WasteLink" width={28} height={28} className="object-contain" />
          <span>Waste<span className="text-text-primary">Link</span></span>
        </Link>
        
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-[6px]"
          onClick={onClose}
          aria-label="Tutup sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="px-6 pt-6 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Menu Utama</p>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {sidebarLinks.map((link) => {
          const isActive = link.exact 
            ? pathname === link.href 
            : pathname?.startsWith(link.href);
            
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`
                flex items-center gap-3.5 px-4 py-3.5 rounded-[6px] transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1
                text-xs font-semibold uppercase tracking-wider
                ${isActive 
                  ? "bg-[#299E63] text-white" 
                  : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                }
              `}
            >
              <div className={`${isActive ? "text-white" : "text-text-muted group-hover:text-text-primary"} transition-colors`}>
                {link.icon}
              </div>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border/60 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold uppercase">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Admin</p>
            <p className="text-[10px] uppercase tracking-wider text-brand-green font-semibold">WasteLink System</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
