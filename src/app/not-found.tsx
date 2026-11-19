import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { LostBinIllustration } from "@/components/features/Illustrations";

export const metadata = {
  title: "Halaman Tidak Ditemukan | WasteLink",
  description:
    "Halaman atau informasi yang Anda cari tidak tersedia di WasteLink.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen items-center bg-bg py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <p
            aria-hidden="true"
            className="select-none font-display font-semibold leading-[0.9] lining-nums text-primary text-[length:clamp(8rem,2rem_+_30vw,20rem)]"
          >
            404
          </p>
          <h1 className="mt-8 text-h2 text-ink">Halaman tidak ditemukan</h1>
          <p className="mt-4 max-w-[48ch] text-body-lg text-muted">
            Halaman atau data yang Anda cari tidak ada, sudah dihapus, atau
            belum tersedia saat ini.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-sm bg-primary px-5 text-btn text-on-primary transition-colors duration-150 hover:bg-primary-hover active:bg-primary-pressed motion-safe:hover:[&_[data-arrow]]:translate-x-0.5"
          >
            Kembali ke beranda
            <ArrowIcon />
          </Link>
        </div>
        <div className="max-w-md lg:col-span-6 lg:max-w-none">
          <LostBinIllustration />
        </div>
      </Container>
    </main>
  );
}
