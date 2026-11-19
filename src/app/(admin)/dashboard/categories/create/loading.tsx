import { AdminFormSkeleton } from "@/components/features/admin/AdminSkeletons";

export default function KategoriFormLoading() {
  return (
    <AdminFormSkeleton
      back={{ href: "/dashboard/categories", label: "Semua kategori" }}
      title="Tambah kategori"
      description="Isi detail kategori limbah baru untuk direktori."
      fields={2}
    />
  );
}
