import { AdminFormSkeleton } from "@/components/features/admin/AdminSkeletons";

export default function PengepulFormLoading() {
  return (
    <AdminFormSkeleton
      back={{ href: "/dashboard/collectors", label: "Semua pengepul" }}
      title="Edit pengepul"
      description="Perbarui informasi pengepul."
      fields={4}
    />
  );
}
