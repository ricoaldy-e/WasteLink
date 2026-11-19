import Link from 'next/link';
import { LegalPage, LegalSection, ContactChannel } from '@/components/layout/LegalPage';
import { publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Kontak | WasteLink', 'Siapa yang tepat dihubungi untuk memastikan jenis limbah, jam buka, atau melaporkan informasi direktori yang keliru.', '/contact');

const inlineLink = 'link font-medium text-primary hover:text-primary-hover';

export default function ContactPage() {
  return (
    <LegalPage title="Kontak" intro="Setiap kebutuhan punya pihak yang tepat. Halaman ini menunjukkan siapa yang perlu Anda hubungi.">
      <LegalSection title="Memastikan jenis limbah atau jam buka">
        <p>
          Hubungi pengepulnya langsung lewat WhatsApp di halaman detail. Pengepul yang tahu persis apa yang mereka terima hari ini.
        </p>
        <p>
          <Link href="/collectors" className={inlineLink}>Lihat daftar pengepul</Link>
        </p>
      </LegalSection>
      <LegalSection title="Mencari pengepul untuk jenis limbah tertentu">
        <p>Pilih kategori yang sesuai, lalu bandingkan pengepul yang menerimanya.</p>
        <p>
          <Link href="/categories" className={inlineLink}>Jelajahi kategori limbah</Link>
        </p>
      </LegalSection>
      <LegalSection title="Informasi pengepul keliru atau sudah berubah">
        <p>
          Data direktori dikelola oleh pengelola WasteLink. Sampaikan koreksi <ContactChannel /> dengan menyertakan tautan halaman dan informasi yang perlu diperbarui.
        </p>
        <p>Hindari mengirim data pribadi yang tidak diperlukan.</p>
      </LegalSection>
    </LegalPage>
  );
}
