import { Section } from '@/components/layout/Section';
import { CONTACT_EMAIL, publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Ketentuan | WasteLink', 'Pahami peran direktori WasteLink, batas layanan, dan perlunya mengonfirmasi informasi langsung kepada pengepul.', '/terms');

export default function TermsPage() {
  return (
    <Section className="bg-background">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-6">Ketentuan Penggunaan</h1>
        <p className="text-body-lg text-text-secondary mb-8">Batas layanan WasteLink agar Anda dapat menggunakan informasi direktori dengan jelas.</p>
        <div className="bg-white border border-border rounded-[8px] p-6 md:p-8 space-y-8 text-body-md text-text-secondary">
          <section>
            <h2 className="text-h3 mb-3">Peran WasteLink</h2>
            <p>WasteLink adalah produk tahap MVP awal yang menyediakan informasi kategori limbah, materi edukasi jika tersedia, dan direktori pengepul. WasteLink tidak memproses pembayaran atau transaksi, menyediakan pemesanan penjemputan, maupun mengatur logistik.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Konfirmasi kepada pengepul</h2>
            <p>Pengunjung menghubungi pengepul secara langsung menggunakan informasi kontak yang tersedia. Kategori yang diterima, kontak, lokasi, dan jam operasional dapat berubah. Konfirmasikan informasi tersebut sebelum berkunjung atau membuat kesepakatan.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Pencantuman dalam direktori</h2>
            <p>Status aktif berarti data pengepul ditampilkan untuk publik. WasteLink belum memiliki program pemeriksaan kelayakan pengepul atau fitur ulasan pengguna. Pencantuman bukan sertifikasi, rekomendasi kualitas, atau jaminan layanan. Materi edukasi merupakan informasi umum; pastikan penanganan sesuai jenis dan kondisi limbah Anda.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Interaksi dengan pihak ketiga</h2>
            <p>Percakapan, kunjungan, dan kesepakatan yang dilakukan di luar WasteLink berlangsung antara pengunjung dan pengepul atau pihak ketiga terkait. Tautan WhatsApp dan layanan peta mengikuti ketentuan layanan masing-masing.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Pembaruan informasi</h2>
            <p>WasteLink dapat mengoreksi, memperbarui, atau menghapus informasi direktori. Laporkan informasi yang keliru atau sudah berubah ke <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block max-w-full break-all text-brand-green underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">{CONTACT_EMAIL}</a> dengan menyertakan tautan halaman terkait.</p>
          </section>
        </div>
      </article>
    </Section>
  );
}
