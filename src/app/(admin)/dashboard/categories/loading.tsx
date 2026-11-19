import { AdminListSkeleton } from "@/components/features/admin/AdminSkeletons";

export default function AdminCategoriesLoading() {
  return (
    <AdminListSkeleton
      title="Kategori"
      description="Kategori limbah yang tersedia di direktori publik."
      addHref="/dashboard/categories/create"
      addLabel="Tambah kategori"
      avatar="square"
    />
  );
}
