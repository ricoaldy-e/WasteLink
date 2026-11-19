import { AdminListSkeleton } from "@/components/features/admin/AdminSkeletons";

export default function AdminCollectorsLoading() {
  return (
    <AdminListSkeleton
      title="Pengepul"
      description="Pengepul limbah yang terdaftar. Hanya yang berstatus aktif tampil di direktori publik."
      addHref="/dashboard/collectors/create"
      addLabel="Tambah pengepul"
      avatar="round"
    />
  );
}
