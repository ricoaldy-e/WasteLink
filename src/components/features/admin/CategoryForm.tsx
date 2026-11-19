"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/features/admin/ImageUploader";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { FormActions } from "@/components/features/admin/FormActions";
import { ActionState } from "@/actions/categories";
import { Category } from "@/types/category";
import { useSmartEnter } from "@/hooks/useSmartEnter";

interface CategoryFormProps {
  /** When provided the form is in Edit mode; omit for Create mode */
  category?: Category;
  /** Server Action bound with the id for update, or plain create action */
  action: (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>;
}

const initialState: ActionState = { error: null, success: null };

const guide = (
  <>
    <h2 className="text-h4 text-ink">Panduan</h2>
    <ul className="mt-3 list-disc space-y-2 ps-5 text-small text-muted">
      <li><strong className="font-semibold text-ink">Nama:</strong> singkat dan jelas, mis. Plastik, Kertas, Logam.</li>
      <li><strong className="font-semibold text-ink">Deskripsi:</strong> ringkasan jenis sampah yang termasuk kategori ini.</li>
      <li><strong className="font-semibold text-ink">Konten edukasi:</strong> cara memilah atau mengelola limbah untuk masyarakat.</li>
      <li><strong className="font-semibold text-ink">Gambar:</strong> gambar representatif yang tajam.</li>
    </ul>
  </>
);

export function CategoryForm({ category, action }: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [isUploading, setIsUploading] = useState(false);
  const { handleKeyDown } = useSmartEnter();
  const isEdit = Boolean(category);
  const busy = isPending || isUploading;

  return (
    <div className="w-full">
      {state.error && <FormNotice tone="error" className="mb-6">{state.error}</FormNotice>}
      {state.success && <FormNotice tone="success" className="mb-6">{state.success}</FormNotice>}

      <form action={formAction} noValidate onKeyDown={handleKeyDown} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Mobile: panduan di atas kolom isian */}
        <Card className="lg:hidden">{guide}</Card>

        {/* Kiri: isian utama */}
        <Card className="flex flex-col gap-6 lg:col-span-8">
          <p className="text-small text-muted">Kolom bertanda <span className="text-error">*</span> wajib diisi.</p>

          <div>
            <Label htmlFor="category-name">
              Nama kategori<span aria-hidden="true" className="text-error"> *</span>
            </Label>
            <Input
              id="category-name"
              name="name"
              type="text"
              placeholder="Contoh: Plastik"
              defaultValue={category?.name ?? ""}
              maxLength={100}
              required
              disabled={busy}
              error={!!state.error}
            />
          </div>

          <div>
            <Label htmlFor="category-description">Deskripsi</Label>
            <Textarea
              id="category-description"
              name="description"
              placeholder="Ringkasan singkat tentang kategori ini"
              defaultValue={category?.description ?? ""}
              maxLength={500}
              disabled={busy}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category-education">Konten edukasi</Label>
            <Textarea
              id="category-education"
              name="education_content"
              placeholder="Cara memilah, mengelola, atau manfaat daur ulangnya"
              defaultValue={category?.education_content ?? ""}
              disabled={busy}
              rows={5}
            />
          </div>
        </Card>

        {/* Kanan: panduan (desktop) dan gambar */}
        <Card className="flex flex-col gap-6 lg:col-span-4">
          <div className="hidden border-b border-border pb-6 lg:block">{guide}</div>

          <ImageUploader
            name="image_url"
            folder="categories"
            label="Gambar kategori"
            defaultImageUrl={category?.image_url}
            onUploadStateChange={setIsUploading}
          />
        </Card>

        <div className="lg:col-span-12">
          <FormActions
            cancelHref="/dashboard/categories"
            submitId={isEdit ? "update-category-submit" : "create-category-submit"}
            submitLabel={isEdit ? "Simpan perubahan" : "Tambah kategori"}
            busyLabel={isUploading ? "Mengunggah…" : "Menyimpan…"}
            busy={busy}
          />
        </div>
      </form>
    </div>
  );
}
