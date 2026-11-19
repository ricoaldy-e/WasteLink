import { AdminFormSkeleton } from "@/components/features/admin/AdminSkeletons";

export default function PengepulFormLoading() {
  return (
    <AdminFormSkeleton
      back={{ href: "/dashboard/collectors", label: "Semua pengepul" }}
      title="Tambah pengepul"
      description="Isi data pengepul limbah baru untuk direktori."
      fields={4}
    />
  );
}
