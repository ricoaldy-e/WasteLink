import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { StateMessage } from "@/components/features/StateMessage";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { AdminCollectorsList } from "@/components/features/admin/AdminCollectorsList";

type CollectorListItem = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  status: boolean;
  created_at: string;
  category_id: string | null;
  categories: { id: string; name: string } | null;
};

export const metadata: Metadata = {
  title: "Kelola Pengepul | WasteLink Admin",
};

export default async function CollectorsPage() {
  const supabase = await createClient();

  const { data: collectors, error } = await supabase
    .from("collectors")
    .select("id, name, description, image_url, status, created_at, category_id, categories(id, name)")
    .order("created_at", { ascending: false });

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader
        title="Pengepul"
        description="Pengepul limbah yang terdaftar. Hanya yang berstatus aktif tampil di direktori publik."
        action={
          <ButtonLink id="add-collector-btn" href="/dashboard/collectors/create">
            Tambah pengepul
          </ButtonLink>
        }
      />

      {error && <FormNotice tone="error">Data pengepul gagal dimuat: {error.message}</FormNotice>}

      {!error && (!collectors || collectors.length === 0) && (
        <StateMessage
          title="Belum ada pengepul"
          action={<ButtonLink href="/dashboard/collectors/create">Tambah pengepul pertama</ButtonLink>}
        >
          Pengepul yang Anda tambahkan dan aktifkan akan tampil di direktori publik.
        </StateMessage>
      )}

      {!error && collectors && collectors.length > 0 && (
        <AdminCollectorsList initialCollectors={collectors as unknown as CollectorListItem[]} />
      )}
    </Section>
  );
}
