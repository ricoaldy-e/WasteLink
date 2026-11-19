import { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/features/admin/LoginForm";
import { BackLink } from "@/components/ui/back-link";

export const metadata: Metadata = {
  title: "Login Admin | WasteLink",
  description: "Halaman login untuk admin WasteLink.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-bg lg:h-screen lg:grid-cols-12 lg:overflow-hidden">
      {/* Kiri: form */}
      <div className="flex min-h-screen flex-col justify-between p-6 sm:p-10 lg:col-span-6 lg:h-full lg:min-h-0 lg:px-16 lg:py-8 xl:px-24">
        <div>
          <BackLink href="/">Beranda</BackLink>
        </div>

        <div className="my-auto w-full max-w-[26rem] py-10">
          <LoginForm />
        </div>

        <p className="text-caption text-subtle">&copy; {new Date().getFullYear()} WasteLink. Seluruh hak cipta dilindungi.</p>
      </div>

      {/* Kanan: konteks panel, datar */}
      <div className="hidden flex-col justify-center gap-8 bg-primary p-12 text-on-primary lg:col-span-6 lg:flex lg:h-full xl:p-16">
        <div className="max-w-md">
          <h2 className="text-h2 text-white">Panel WasteLink</h2>
          <p className="mt-4 text-body-lg text-on-primary/90">Kelola kategori limbah dan data pengepul yang tampil di direktori publik.</p>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg outline -outline-offset-1 outline-white/10">
          <Image src="/login.png" alt="Tampilan panel admin WasteLink" fill className="object-cover object-top" sizes="50vw" />
        </div>
      </div>
    </main>
  );
}
