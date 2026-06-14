import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | WasteLink",
    default: "WasteLink — Temukan Pengepul Sampah di Sekitar Anda",
  },
  description:
    "WasteLink menghubungkan masyarakat dengan pengepul sampah dan daur ulang. Temukan pengepul terpercaya berdasarkan kategori sampah yang Anda miliki.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
