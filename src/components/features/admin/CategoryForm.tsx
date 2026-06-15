"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <Card className="w-full max-w-2xl">
      {/* Inline alert: error */}
      {state.error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-[6px] border border-error/30 bg-error-bg px-4 py-3"
        >
          <svg
            className="mt-0.5 shrink-0 text-error"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5zM8 11a.875.875 0 1 1 0 1.75A.875.875 0 0 1 8 11z" />
          </svg>
          <p className="text-body-sm text-error">{state.error}</p>
        </div>
      )}

      {/* Inline alert: success (only shown before redirect fires) */}
      {state.success && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-[6px] border border-brand-green/30 bg-brand-green-muted px-4 py-3"
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
          <p className="text-body-sm text-brand-green">{state.success}</p>
        </div>
      )}

      <form action={formAction} noValidate onKeyDown={handleKeyDown} className="flex flex-col gap-4 md:gap-6">
        {/* Name */}
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

        {/* Description */}
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
          />
        </div>

        {/* Education Content */}
        <div>
          <Label htmlFor="category-education">Konten Edukasi</Label>
          <Textarea
            id="category-education"
            name="education_content"
            placeholder="Jelaskan cara pengelolaan, manfaat daur ulang, dll…"
            defaultValue={category?.education_content ?? ""}
            disabled={isPending || isUploading}
            rows={5}
          />
        </div>

        {/* Image Upload */}
        <ImageUploader
          name="image_url"
          folder="categories"
          label="Gambar Kategori"
          defaultImageUrl={category?.image_url}
          onUploadStateChange={setIsUploading}
        />

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Link href="/dashboard/categories" className="sm:w-auto w-full">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={isPending || isUploading}
            >
              Batal
            </Button>
          </Link>
          <Button
            id={isEdit ? "update-category-submit" : "create-category-submit"}
            type="submit"
            variant="primary"
            className="sm:flex-1"
            disabled={isPending || isUploading}
            aria-busy={isPending || isUploading}
          >
            {isPending || isUploading ? (
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
                {isUploading ? "Mengunggah..." : "Menyimpan..."}
              </span>
            ) : isEdit ? (
              "Simpan Perubahan"
            ) : (
              "Tambah Kategori"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
