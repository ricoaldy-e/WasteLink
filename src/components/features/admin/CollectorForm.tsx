"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/features/admin/ImageUploader";
import { ActionState } from "@/actions/collectors";
import { Collector } from "@/types/collector";
import { Category } from "@/types/category";
import { useSmartEnter } from "@/hooks/useSmartEnter";

interface CollectorFormProps {
  /** Existing collector data — provided in Edit mode, omit for Create */
  collector?: Collector;
  /** All available categories to populate the Select */
  categories: Pick<Category, "id" | "name">[];
  /** Bound server action: (prevState, formData) => Promise<ActionState> */
  action: (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>;
}

const initialState: ActionState = { error: null, success: null };

export function CollectorForm({ collector, categories, action }: CollectorFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [isUploading, setIsUploading] = useState(false);
  const { handleKeyDown } = useSmartEnter();
  const isEdit = Boolean(collector);

  return (
    <Card className="w-full max-w-2xl">
      {/* Error alert */}
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

      {/* Success alert */}
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
          <Label htmlFor="collector-name">
            Nama Pengepul <span className="text-error">*</span>
          </Label>
          <Input
            id="collector-name"
            name="name"
            type="text"
            placeholder="cth. CV. Jaya Daur Ulang"
            defaultValue={collector?.name ?? ""}
            maxLength={100}
            required
            disabled={isPending || isUploading}
            error={!!state.error}
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="collector-category">Kategori</Label>
          <Select
            id="collector-category"
            name="category_id"
            defaultValue={collector?.category_id ?? ""}
            required
            disabled={isPending || isUploading}
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="collector-address">Alamat</Label>
          <Textarea
            id="collector-address"
            name="address"
            placeholder="Jl. Contoh No. 1, Kota, Provinsi"
            defaultValue={collector?.address ?? ""}
            maxLength={500}
            disabled={isPending || isUploading}
            rows={2}
          />
        </div>

        {/* Phone & WhatsApp — side by side on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          <div>
            <Label htmlFor="collector-phone">Nomor Telepon</Label>
            <Input
              id="collector-phone"
              name="phone"
              type="tel"
              placeholder="021-XXXXXXXX"
              defaultValue={collector?.phone ?? ""}
              maxLength={20}
              disabled={isPending || isUploading}
            />
          </div>
          <div>
            <Label htmlFor="collector-whatsapp">Nomor WhatsApp</Label>
            <Input
              id="collector-whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="08XXXXXXXXXX"
              defaultValue={collector?.whatsapp ?? ""}
              maxLength={20}
              disabled={isPending || isUploading}
            />
          </div>
        </div>

        {/* Operational Hours */}
        <div>
          <Label htmlFor="collector-hours">Jam Operasional</Label>
          <Input
            id="collector-hours"
            name="operational_hours"
            type="text"
            placeholder="cth. 08.00 – 17.00 (Senin – Sabtu)"
            defaultValue={collector?.operational_hours ?? ""}
            maxLength={100}
            disabled={isPending || isUploading}
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="collector-description">Deskripsi</Label>
          <Textarea
            id="collector-description"
            name="description"
            placeholder="Informasi tambahan mengenai pengepul ini…"
            defaultValue={collector?.description ?? ""}
            maxLength={500}
            disabled={isPending || isUploading}
            rows={4}
          />
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="collector-status">Status Pengepul</Label>
          <Select
            id="collector-status"
            name="status"
            defaultValue={collector ? (collector.status ? "true" : "false") : "true"}
            disabled={isPending || isUploading}
          >
            <option value="true">Aktif</option>
            <option value="false">Tidak Aktif</option>
          </Select>
        </div>

        {/* Image Upload */}
        <ImageUploader
          name="image_url"
          folder="collectors"
          label="Gambar Pengepul"
          defaultImageUrl={collector?.image_url}
          onUploadStateChange={setIsUploading}
        />

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Link href="/dashboard/collectors" className="sm:w-auto w-full">
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
            id={isEdit ? "update-collector-submit" : "create-collector-submit"}
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
              "Tambah Pengepul"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
