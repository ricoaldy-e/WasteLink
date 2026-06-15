"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";

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

  // Cleanup object URL to prevent memory leaks
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

      // ── Validation ──────────────────────────────
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

      // ── Local preview (instant, via object URL) ──
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // ── Upload to Supabase Storage ───────────────
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

        // Get public URL
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
        // Revert preview to previous state on failure
        setPreviewUrl(defaultImageUrl ?? null);
      } finally {
        setIsUploading(false);
        onUploadStateChange?.(false);
      }
    },
    [folder, defaultImageUrl]
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

      {/* Hidden input carries the final URL into FormData */}
      <input type="hidden" name={name} value={uploadedUrl} />

      {/* Preview area */}
      {previewUrl ? (
        <div className="relative w-full max-w-xs">
          <div className="relative w-full aspect-video rounded-[6px] overflow-hidden border border-border bg-background">
            <Image
              src={previewUrl}
              alt="Preview gambar"
              fill
              className="object-cover"
              unoptimized
            />
            {/* Uploading overlay */}
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 gap-2">
                <svg
                  className="animate-spin text-white"
                  width="28"
                  height="28"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-label="Mengunggah…"
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
                <span className="text-white text-caption">Mengunggah…</span>
              </div>
            )}
          </div>
          {/* Remove button */}
          {!isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="mt-2 text-caption text-error hover:underline focus:outline-none focus-visible:underline"
              aria-label="Hapus gambar"
            >
              Hapus gambar
            </button>
          )}
        </div>
      ) : (
        /* Drop zone / click-to-upload area */
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={[
            "flex flex-col items-center justify-center gap-3",
            "w-full max-w-xs aspect-video",
            "rounded-[6px] border-2 border-dashed",
            "transition-colors duration-200",
            isUploading
              ? "border-border cursor-not-allowed opacity-50"
              : "border-border hover:border-brand-green cursor-pointer",
            "focus:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-green/10 focus-visible:border-brand-green",
          ].join(" ")}
          aria-label="Pilih gambar untuk diunggah"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-muted">
            <svg
              className="text-brand-green"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-body-sm text-text-primary font-semibold">
              Klik untuk pilih gambar
            </p>
            <p className="text-caption text-text-secondary mt-0.5">
              JPEG, PNG, WebP · Maks. 2 MB
            </p>
          </div>
        </button>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Error message */}
      {uploadError && (
        <div role="alert" className="mt-1 p-2 bg-error-bg text-error text-caption rounded-[4px] flex items-start gap-2 border border-error/20">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{uploadError}</span>
        </div>
      )}

      {/* Success hint */}
      {!isUploading && !uploadError && uploadedUrl && uploadedUrl !== defaultImageUrl && (
        <p role="status" className="text-caption text-brand-green">
          ✓ Gambar berhasil diunggah
        </p>
      )}
    </div>
  );
}
