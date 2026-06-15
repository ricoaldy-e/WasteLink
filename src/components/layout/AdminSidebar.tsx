"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", exact: true },
  { href: "/dashboard/categories", label: "Kategori", exact: false },
  { href: "/dashboard/collectors", label: "Pengepul", exact: false },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border shadow-sm
        transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="text-h3 text-brand-green font-bold whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
        >
          Waste<span className="text-text-primary">Link</span> Admin
        </Link>
        
        {/* Close Button for Mobile */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-text-secondary hover:text-brand-green hover:bg-brand-green-subtle rounded-[6px]"
          onClick={onClose}
          aria-label="Tutup sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
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
                flex items-center px-4 py-3 rounded-[6px] transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green
                ${isActive 
                  ? "bg-brand-green-subtle text-brand-green font-bold" 
                  : "text-text-primary hover:bg-border hover:text-brand-green"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
