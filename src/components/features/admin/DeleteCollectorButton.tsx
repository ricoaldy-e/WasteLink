"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/features/admin/ConfirmDialog";
import { deleteCollectorAction } from "@/actions/collectors";

interface DeleteCollectorButtonProps {
  id: string;
  name: string;
}

export function DeleteCollectorButton({ id, name }: DeleteCollectorButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteCollectorAction(id);
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
        aria-label={`Hapus pengepul ${name}`}
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
        title={`Hapus pengepul “${name}”?`}
        confirmLabel="Hapus pengepul"
        busyLabel="Menghapus…"
        confirmId="confirm-delete-collector"
        busy={isPending}
        onConfirm={handleDelete}
      >
        Data pengepul ini akan dihapus permanen dan tidak bisa dikembalikan.
      </ConfirmDialog>
    </>
  );
}
