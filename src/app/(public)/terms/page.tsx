import { LegalPage, LegalSection, ContactChannel } from '@/components/layout/LegalPage';
import { publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Ketentuan | WasteLink', 'Pahami peran direktori WasteLink, batas layanan, dan perlunya mengonfirmasi informasi langsung kepada pengepul.', '/terms');

export default function TermsPage() {
  return (
    <LegalPage title="Ketentuan penggunaan" intro="Batas layanan WasteLink agar Anda dapat menggunakan informasi direktori dengan jelas.">
      <LegalSection title="Peran WasteLink">
        <p>WasteLink menyediakan informasi kategori limbah, materi edukasi jika tersedia, dan direktori pengepul. WasteLink tidak memproses pembayaran atau transaksi, menyediakan pemesanan penjemputan, maupun mengatur logistik.</p>
      </LegalSection>
      <LegalSection title="Konfirmasi kepada pengepul">
        <p>Pengunjung menghubungi pengepul secara langsung menggunakan informasi kontak yang tersedia. Kategori yang diterima, kontak, lokasi, dan jam operasional dapat berubah. Konfirmasikan informasi tersebut sebelum berkunjung atau membuat kesepakatan.</p>
      </LegalSection>
      <LegalSection title="Pencantuman dalam direktori">
        <p>Status aktif berarti data pengepul ditampilkan untuk publik. WasteLink belum memiliki program pemeriksaan kelayakan pengepul atau fitur ulasan pengguna. Pencantuman bukan sertifikasi, rekomendasi kualitas, atau jaminan layanan. Materi edukasi merupakan informasi umum; pastikan penanganan sesuai jenis dan kondisi limbah Anda.</p>
      </LegalSection>
      <LegalSection title="Interaksi dengan pihak ketiga">
        <p>Percakapan, kunjungan, dan kesepakatan yang dilakukan di luar WasteLink berlangsung antara pengunjung dan pengepul atau pihak ketiga terkait. Tautan WhatsApp dan layanan peta mengikuti ketentuan layanan masing-masing.</p>
      </LegalSection>
      <LegalSection title="Pembaruan informasi">
        <p>WasteLink dapat mengoreksi, memperbarui, atau menghapus informasi direktori. Laporkan informasi yang keliru atau sudah berubah <ContactChannel /> dengan menyertakan tautan halaman terkait.</p>
      </LegalSection>
    </LegalPage>
  );
}
