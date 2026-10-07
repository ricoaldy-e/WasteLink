import { Section } from '@/components/layout/Section';
import { CONTACT_EMAIL, publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Kontak | WasteLink', 'Hubungi WasteLink untuk koreksi informasi direktori, pertanyaan produk, dan pembahasan kolaborasi.', '/contact');

export default function ContactPage() {
  return (
    <Section className="bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-6">Kontak WasteLink</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          Untuk pertanyaan atau masukan tentang WasteLink, hubungi kami melalui email. Anda tidak perlu membuat akun.
        </p>
        <div className="bg-white border border-border rounded-[8px] p-6 md:p-8 space-y-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block max-w-full break-all text-body-lg text-brand-green underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green">
            {CONTACT_EMAIL}
          </a>
          <h2 className="text-h3">Apa yang dapat Anda sampaikan?</h2>
          <ul className="list-disc pl-6 space-y-3 text-body-md text-text-secondary">
            <li>Laporan informasi pengepul yang tidak akurat atau sudah berubah.</li>
            <li>Pertanyaan umum tentang produk dan cara menggunakan WasteLink.</li>
            <li>Pertanyaan tentang pencantuman atau koreksi data direktori.</li>
            <li>Usulan kolaborasi terkait informasi pengelolaan limbah.</li>
          </ul>
          <p className="text-body-md text-text-secondary">
            Untuk koreksi data, sertakan tautan halaman dan informasi yang perlu diperbarui. Hindari mengirim data pribadi yang tidak diperlukan. Email ini membuka aplikasi email Anda; tidak ada formulir pengiriman di situs ini.
          </p>
          <p className="text-body-md text-text-secondary">
            Untuk memastikan jenis limbah yang diterima atau jam operasional, silakan hubungi pengepul melalui kontak pada halaman detailnya.
          </p>
        </div>
      </div>
    </Section>
  );
}
