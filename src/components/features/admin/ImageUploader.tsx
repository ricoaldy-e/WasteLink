"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormNotice } from "@/components/features/admin/FormNotice";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const BUCKET = "wastelink-public";

export type UploadFolder = "categories" | "collectors";

interface ImageUploaderProps {
  /** Hidden input name that carries the final URL into FormData */
  name?: string;
  /** Existing URL pre-populated in Edit mode */
  defaultImageUrl?: string | null;
  /** Storage folder: "categories" or "collectors" */
  folder: UploadFolder;
  /** Label text shown above the uploader */
  label?: string;
  /** Callback when upload state changes */
  onUploadStateChange?: (isUploading: boolean) => void;
}

export function ImageUploader({
  name = "image_url",
  defaultImageUrl,
  folder,
  label = "Gambar",
  onUploadStateChange,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImageUrl ?? null
  );
  const [uploadedUrl, setUploadedUrl] = useState<string>(
    defaultImageUrl ?? ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError(
          "Format tidak valid. Gunakan JPEG, PNG, atau WebP."
        );
        e.target.value = "";
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setUploadError("Ukuran gambar melebihi batas 2 MB.");
        e.target.value = "";
        return;
      }

      setUploadError(null);
      setIsUploading(true);
      onUploadStateChange?.(true);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      try {
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const filePath = `${folder}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, file, { upsert: true });

        if (uploadErr) {
          throw new Error(uploadErr.message);
        }

        const { data } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(filePath);

        setUploadedUrl(data.publicUrl);
      } catch (err) {
        setUploadError(
          err instanceof Error
            ? `Upload gagal: ${err.message}`
            : "Upload gagal. Periksa koneksi dan coba lagi."
        );
        setPreviewUrl(defaultImageUrl ?? null);
      } finally {
        setIsUploading(false);
        onUploadStateChange?.(false);
      }
    },
    [folder, defaultImageUrl, onUploadStateChange]
  );

  function handleRemove() {
    setPreviewUrl(null);
    setUploadedUrl("");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      <input type="hidden" name={name} value={uploadedUrl} />

      {previewUrl ? (
        <div className="w-full max-w-xs">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-bg-alt">
            <Image src={previewUrl} alt="Pratinjau gambar" fill className="object-cover" unoptimized />
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/60 text-white">
                <Spinner className="size-7" />
                <span className="text-caption">Mengunggah…</span>
              </div>
            )}
          </div>
          {!isUploading && (
            <Button type="button" variant="danger-ghost" size="sm" onClick={handleRemove} className="-ms-3 mt-1">
              Hapus gambar
            </Button>
          )}
        </div>
      ) : (
        /* Area klik-untuk-unggah */
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex aspect-video w-full max-w-xs flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border-strong transition-colors duration-150 not-disabled:hover:border-primary not-disabled:hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-sm bg-primary-subtle text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </span>
          <span className="text-center">
            <span className="block text-small font-semibold text-ink">Pilih gambar</span>
            <span className="mt-0.5 block text-caption text-muted">JPEG, PNG, atau WebP · maks. 2 MB</span>
          </span>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {uploadError && <FormNotice tone="error">{uploadError}</FormNotice>}

      {!isUploading && !uploadError && uploadedUrl && uploadedUrl !== defaultImageUrl && (
        <p role="status" className="text-caption font-medium text-primary">
          ✓ Gambar terunggah. Simpan form untuk menerapkannya.
        </p>
      )}
    </div>
  );
}
