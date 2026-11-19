import { AdminFormSkeleton } from "@/components/features/admin/AdminSkeletons";

export default function KategoriFormLoading() {
  return (
    <AdminFormSkeleton
      back={{ href: "/dashboard/categories", label: "Semua kategori" }}
      title="Edit kategori"
      description="Perbarui informasi kategori."
      fields={2}
    />
  );
}
