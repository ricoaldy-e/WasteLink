import { LegalPage, LegalSection, ContactChannel } from '@/components/layout/LegalPage';
import { publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Privasi | WasteLink', 'Informasi tentang penelusuran direktori, sesi admin, layanan pendukung, dan tautan pihak ketiga di WasteLink.', '/privacy');

export default function PrivacyPage() {
  return (
    <LegalPage title="Privasi" intro="Penjelasan ini mencakup data dan fitur yang tersedia di WasteLink.">
      <LegalSection title="Penelusuran tanpa akun">
        <p>Halaman publik dapat digunakan tanpa pendaftaran atau login. Pencarian kategori dan pengepul menyaring daftar di browser; fitur ini tidak mengirim kata pencarian ke server atau menyimpannya sebagai riwayat pencarian.</p>
      </LegalSection>
      <LegalSection title="Data direktori dan layanan pendukung">
        <p>WasteLink menggunakan Supabase untuk menyimpan data kategori, informasi pengepul, dan gambar yang dikelola admin. Informasi pengepul seperti nama, deskripsi, kategori, kontak, lokasi, dan jam operasional ditampilkan ketika tersedia. Jika informasi tentang Anda perlu dikoreksi atau dihapus, sampaikan <ContactChannel />.</p>
      </LegalSection>
      <LegalSection title="Sesi admin dan cookie">
        <p>Login hanya ditujukan untuk pengelola. Autentikasi admin menggunakan Supabase dan cookie untuk menjaga sesi login. Jika Anda pernah login sebagai admin, sesi tersebut dapat diperiksa atau diperbarui saat membuka halaman situs, termasuk halaman publik.</p>
      </LegalSection>
      <LegalSection title="Analitik dan akses teknis">
        <p>Aplikasi WasteLink saat ini tidak memasang analitik pengunjung atau pelacak iklan. Penyedia hosting dan layanan pendukung dapat memproses informasi teknis permintaan, seperti alamat IP, untuk menjalankan layanan. Penjelasan ini tidak menjanjikan bahwa penyedia layanan tidak menyimpan log teknis.</p>
      </LegalSection>
      <LegalSection title="Tautan pihak ketiga">
        <p>Tautan WhatsApp dan peta membuka layanan lain; penggunaan dan pemrosesan data setelah Anda berpindah mengikuti ketentuan layanan masing-masing.</p>
      </LegalSection>
      <LegalSection title="Pertanyaan privasi">
        <p>Untuk pertanyaan atau permintaan terkait informasi yang ditampilkan di WasteLink, sampaikan <ContactChannel />.</p>
      </LegalSection>
    </LegalPage>
  );
}
