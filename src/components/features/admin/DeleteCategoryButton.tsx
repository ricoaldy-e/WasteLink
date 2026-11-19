"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/features/admin/ConfirmDialog";
import { deleteCategoryAction } from "@/actions/categories";

interface DeleteCategoryButtonProps {
  id: string;
  name: string;
}

export function DeleteCategoryButton({ id, name }: DeleteCategoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteCategoryAction(id);
      if (result.error) {
        setError(result.error);
        setIsOpen(false);
      } else {
        setIsOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <>
      <Button
        variant="danger-ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        aria-label={`Hapus kategori ${name}`}
      >
        Hapus
      </Button>

      {error && (
        <p role="alert" className="mt-1 text-caption text-error">
          {error}
        </p>
      )}

      <ConfirmDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Hapus kategori “${name}”?`}
        confirmLabel="Hapus kategori"
        busyLabel="Menghapus…"
        confirmId="confirm-delete-category"
        busy={isPending}
        onConfirm={handleDelete}
      >
        Kategori ini akan dihapus permanen dan tidak bisa dikembalikan.
      </ConfirmDialog>
    </>
  );
}
