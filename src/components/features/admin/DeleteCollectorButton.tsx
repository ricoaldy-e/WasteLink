"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
        variant="ghost"
        className="!text-error hover:!text-error hover:!underline !font-normal text-body-sm"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        aria-label={`Hapus pengepul ${name}`}
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
          aria-labelledby={`delete-collector-dialog-title-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => !isPending && setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-sm rounded-[8px] bg-white p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-bg">
              <svg
                className="h-6 w-6 text-error"
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
            </div>

            <h2
              id={`delete-collector-dialog-title-${id}`}
              className="text-h3 text-text-primary mb-2"
            >
              Hapus Pengepul?
            </h2>
            <p className="text-body-sm text-text-secondary mb-6">
              Pengepul{" "}
              <span className="font-semibold text-text-primary">
                &ldquo;{name}&rdquo;
              </span>{" "}
              akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Batal
              </Button>
              <Button
                id="confirm-delete-collector"
                variant="primary"
                className="w-full sm:flex-1 !bg-error hover:!bg-red-700 active:!bg-red-800 disabled:!bg-red-300"
                onClick={handleDelete}
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="2"
                      />
                      <path
                        d="M14 8a6 6 0 0 0-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Menghapus…
                  </span>
                ) : (
                  "Ya, Hapus"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
