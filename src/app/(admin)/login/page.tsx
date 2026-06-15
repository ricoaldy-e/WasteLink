import { Metadata } from "next";
import { LoginForm } from "@/components/features/admin/LoginForm";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login Admin — WasteLink",
  description: "Halaman login untuk admin WasteLink.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-gray-50">
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:py-8 lg:px-16 xl:py-10 xl:px-24 min-h-screen lg:min-h-0 lg:h-full relative z-10 border-r border-border bg-gray-50">
        <div className="flex justify-start">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all duration-200"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-white group-hover:border-text-secondary group-hover:bg-gray-50 transition-all duration-200 shadow-sm">
              <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="my-auto py-6 w-full flex justify-center">
          <div className="w-full max-w-[460px] bg-white border border-border p-10 sm:p-12 rounded-2xl shadow-sm">
            <LoginForm />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            &copy; {new Date().getFullYear()} WasteLink Admin Panel. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:col-span-6 lg:h-full flex-col items-center justify-center p-12 bg-gradient-to-br from-emerald-50/30 to-brand-green-subtle/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />
        
        <div className="mb-8 text-center max-w-md relative z-10">
          <h3 className="text-lg font-bold uppercase tracking-wider text-text-primary mb-2">Panel Kontrol WasteLink</h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
            Kelola kategori, pantau daftar pengepul aktif, dan pastikan platform direktori daur ulang berjalan dengan lancar untuk bumi yang lebih hijau.
          </p>
        </div>

        <div className="relative w-full max-w-[85%] aspect-[16/10] bg-white border border-border p-3 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group/mockup">
          <div className="flex gap-1.5 mb-2.5 select-none">
            <div className="w-2 h-2 rounded-full bg-red-400/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
            <div className="w-2 h-2 rounded-full bg-green-400/80" />
          </div>
          
          <div className="relative w-full h-[calc(100%-18px)] rounded-lg overflow-hidden border border-border/50 bg-gray-50">
            <Image
              src="/login.png"
              alt="WasteLink Admin Preview"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover/mockup:scale-102"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

