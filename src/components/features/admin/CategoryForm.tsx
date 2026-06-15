"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/features/admin/ImageUploader";
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

export function CategoryForm({ category, action }: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [isUploading, setIsUploading] = useState(false);
  const { handleKeyDown } = useSmartEnter();
  const isEdit = Boolean(category);

  return (
    <div className="w-full">
      {state.error && (
        <div
          role="alert"
          className="mb-8 flex items-start gap-3 rounded-[4px] border border-border border-l-4 border-red-600 bg-white p-4 shadow-sm text-red-800"
        >
          <svg
            className="mt-0.5 shrink-0 text-red-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5zM8 11a.875.875 0 1 1 0 1.75A.875.875 0 0 1 8 11z" />
          </svg>
          <p className="text-xs font-semibold leading-relaxed">{state.error}</p>
        </div>
      )}

      {state.success && (
        <div
          role="status"
          className="mb-8 flex items-start gap-3 rounded-[4px] border border-border border-l-4 border-brand-green bg-white p-4 shadow-sm text-brand-green"
        >
          <svg
            className="mt-0.5 shrink-0 text-brand-green"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.03 5.03a.75.75 0 0 0-1.06-1.06L6.75 7.19 5.53 5.97a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.75-3.75z" />
          </svg>
          <p className="text-xs font-semibold leading-relaxed">{state.success}</p>
        </div>
      )}

      <form
        action={formAction}
        noValidate
        onKeyDown={handleKeyDown}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        <div className="lg:hidden col-span-1">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              Panduan Mengisi
            </h3>
            <ul className="text-xs text-text-secondary space-y-2.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-text-primary">Nama Kategori:</strong> Masukkan nama ringkas dan padat (cth. Plastik, Kertas, Logam).
              </li>
              <li>
                <strong className="text-text-primary">Deskripsi:</strong> Tuliskan rangkuman singkat mengenai jenis sampah yang tercakup.
              </li>
              <li>
                <strong className="text-text-primary">Konten Edukasi:</strong> Berikan petunjuk pemilahan atau langkah pengelolaan limbah bagi masyarakat.
              </li>
              <li>
                <strong className="text-text-primary">Gambar:</strong> Unggah gambar representatif dengan resolusi yang jelas.
              </li>
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col gap-6 h-full flex-1">
            <div>
              <Label htmlFor="category-name">
                Nama Kategori <span className="text-error">*</span>
              </Label>
              <Input
                id="category-name"
                name="name"
                type="text"
                placeholder="cth. Plastik"
                defaultValue={category?.name ?? ""}
                maxLength={100}
                required
                disabled={isPending || isUploading}
                error={!!state.error}
              />
            </div>

            <div>
              <Label htmlFor="category-description">Deskripsi</Label>
              <Textarea
                id="category-description"
                name="description"
                placeholder="Deskripsi singkat tentang kategori ini…"
                defaultValue={category?.description ?? ""}
                maxLength={500}
                disabled={isPending || isUploading}
                rows={3}
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="category-education">Konten Edukasi</Label>
              <Textarea
                id="category-education"
                name="education_content"
                placeholder="Jelaskan cara pengelolaan, manfaat daur ulang, dll…"
                defaultValue={category?.education_content ?? ""}
                disabled={isPending || isUploading}
                rows={5}
                className="resize-none"
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col justify-between h-full flex-1 gap-6">
            <div className="hidden lg:block border-b border-border pb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
                Panduan Mengisi
              </h3>
              <ul className="text-xs text-text-secondary space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-text-primary">Nama Kategori:</strong> Masukkan nama ringkas dan padat (cth. Plastik, Kertas, Logam).
                </li>
                <li>
                  <strong className="text-text-primary">Deskripsi:</strong> Tuliskan rangkuman singkat mengenai jenis sampah yang tercakup.
                </li>
                <li>
                  <strong className="text-text-primary">Konten Edukasi:</strong> Berikan petunjuk pemilahan atau langkah pengelolaan limbah bagi masyarakat.
                </li>
                <li>
                  <strong className="text-text-primary">Gambar:</strong> Unggah gambar representatif dengan resolusi yang jelas.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <ImageUploader
                name="image_url"
                folder="categories"
                label="Gambar Kategori"
                defaultImageUrl={category?.image_url}
                onUploadStateChange={setIsUploading}
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-12 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-border mt-4">
          <Link
            href="/dashboard/categories"
            className="w-full sm:w-[180px] h-[44px] rounded-[6px] border border-border text-text-secondary bg-white hover:bg-gray-50 active:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center pointer-events-auto"
            style={{ pointerEvents: (isPending || isUploading) ? "none" : "auto", opacity: (isPending || isUploading) ? 0.5 : 1 }}
          >
            Batal
          </Link>
          
          <button
            id={isEdit ? "update-category-submit" : "create-category-submit"}
            type="submit"
            className="w-full sm:w-[180px] h-[44px] rounded-[6px] bg-brand-green text-white hover:bg-brand-green-hover active:bg-brand-green-active disabled:bg-brand-green-disabled text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-1 shadow-sm"
            disabled={isPending || isUploading}
            aria-busy={isPending || isUploading}
          >
            {isPending || isUploading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeOpacity="0.25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    fill="currentColor"
                  />
                </svg>
                {isUploading ? "Mengunggah..." : "Menyimpan..."}
              </span>
            ) : isEdit ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Kategori"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
