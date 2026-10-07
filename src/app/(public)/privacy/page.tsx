import { Section } from '@/components/layout/Section';
import { CONTACT_EMAIL, publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Privasi | WasteLink', 'Informasi tentang penelusuran direktori, sesi admin, layanan pendukung, dan tautan pihak ketiga di WasteLink.', '/privacy');

export default function PrivacyPage() {
  return (
    <Section className="bg-background">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-6">Privasi</h1>
        <p className="text-body-lg text-text-secondary mb-8">Penjelasan ini mencakup fitur yang tersedia pada WasteLink sebagai direktori limbah tahap awal.</p>
        <div className="bg-white border border-border rounded-[8px] p-6 md:p-8 space-y-8 text-body-md text-text-secondary">
          <section>
            <h2 className="text-h3 mb-3">Penelusuran tanpa akun</h2>
            <p>Halaman publik dapat digunakan tanpa pendaftaran atau login. Pencarian kategori dan pengepul menyaring daftar di browser; fitur ini tidak mengirim kata pencarian ke server atau menyimpannya sebagai riwayat pencarian.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Data direktori dan layanan pendukung</h2>
            <p>WasteLink menggunakan Supabase untuk menyimpan data kategori, informasi pengepul, dan gambar yang dikelola admin. Informasi pengepul seperti nama, deskripsi, kategori, kontak, lokasi, dan jam operasional ditampilkan ketika tersedia. Jika informasi tentang Anda perlu dikoreksi atau dihapus, hubungi email di bawah.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Sesi admin dan cookie</h2>
            <p>Login hanya ditujukan untuk pengelola. Autentikasi admin menggunakan Supabase dan cookie untuk menjaga sesi login. Jika Anda pernah login sebagai admin, sesi tersebut dapat diperiksa atau diperbarui saat membuka halaman situs, termasuk halaman publik.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Analitik dan akses teknis</h2>
            <p>Aplikasi WasteLink saat ini tidak memasang analitik pengunjung atau pelacak iklan. Penyedia hosting dan layanan pendukung dapat memproses informasi teknis permintaan, seperti alamat IP, untuk menjalankan layanan. Penjelasan ini tidak menjanjikan bahwa penyedia layanan tidak menyimpan log teknis.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Email dan tautan pihak ketiga</h2>
            <p>Jika Anda mengirim email, alamat email dan isi pesan Anda diterima melalui layanan email untuk menanggapi pertanyaan atau laporan. Kirim hanya informasi yang diperlukan. Tautan WhatsApp, peta, dan email membuka layanan lain; penggunaan dan pemrosesan data setelah Anda berpindah mengikuti ketentuan layanan masing-masing.</p>
          </section>
          <section>
            <h2 className="text-h3 mb-3">Pertanyaan privasi</h2>
            <p>Untuk pertanyaan atau permintaan terkait informasi yang ditampilkan di WasteLink, hubungi <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block max-w-full break-all text-brand-green underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">{CONTACT_EMAIL}</a>.</p>
          </section>
        </div>
      </article>
    </Section>
  );
}
