import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | WasteLink",
    default: "WasteLink — Temukan Pengepul Sampah di Sekitar Anda",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
