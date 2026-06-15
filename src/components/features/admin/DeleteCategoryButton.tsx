"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
        variant="ghost"
        className="!text-error hover:!text-error hover:!underline !font-normal text-body-sm"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        aria-label={`Hapus kategori ${name}`}
      >
        Hapus
      </Button>

      {error && (
        <p role="alert" className="text-caption text-error mt-1">
          {error}
        </p>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`delete-dialog-title-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            onClick={() => !isPending && setIsOpen(false)}
          />

          <div className="relative z-10 bg-white rounded-[12px] border border-border p-8 shadow-[rgba(18,44,77,0.12)_0px_10px_25px_0px] w-full max-w-[380px] text-center animate-in fade-in zoom-in-95 duration-200">
            <svg
              className="mx-auto mb-5 h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>

            <h2
              id={`delete-dialog-title-${id}`}
              className="text-base font-bold text-text-primary uppercase tracking-wider mb-2"
            >
              Hapus Kategori?
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Kategori{" "}
              <span className="font-semibold text-text-primary">
                &ldquo;{name}&rdquo;
              </span>{" "}
              akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                className="w-full sm:flex-1 h-[44px] rounded-[6px] border border-border text-text-secondary bg-white hover:bg-gray-50 active:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-border"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Batal
              </button>
              <button
                id="confirm-delete-category"
                className="w-full sm:flex-1 h-[44px] rounded-[6px] bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-sm"
                onClick={handleDelete}
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
