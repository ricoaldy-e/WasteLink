"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/features/admin/ImageUploader";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { FormActions } from "@/components/features/admin/FormActions";
import { ActionState } from "@/actions/collectors";
import { Collector } from "@/types/collector";
import { Category } from "@/types/category";
import { useSmartEnter } from "@/hooks/useSmartEnter";

interface CollectorFormProps {
  /** Existing collector data - provided in Edit mode, omit for Create */
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

const Required = () => <span aria-hidden="true" className="text-error"> *</span>;

const guide = (
  <>
    <h2 className="text-h4 text-ink">Panduan</h2>
    <ul className="mt-3 list-disc space-y-2 ps-5 text-small text-muted">
      <li><strong className="font-semibold text-ink">Nama dan kategori:</strong> nama resmi usaha/lapak, lalu kategori limbah utamanya.</li>
      <li><strong className="font-semibold text-ink">Lokasi dan kontak:</strong> tautan Google Maps dan nomor WhatsApp yang aktif.</li>
      <li><strong className="font-semibold text-ink">Jam operasional:</strong> tulis hari dan jam, mis. 08.00–17.00 (Senin–Sabtu).</li>
      <li><strong className="font-semibold text-ink">Status:</strong> pengepul nonaktif tidak tampil di direktori publik.</li>
    </ul>
  </>
);

export function CollectorForm({ collector, categories, action }: CollectorFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [isUploading, setIsUploading] = useState(false);
  const { handleKeyDown } = useSmartEnter();
  const isEdit = Boolean(collector);
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
            <Label htmlFor="collector-name">
              Nama pengepul<Required />
            </Label>
            <Input
              id="collector-name"
              name="name"
              type="text"
              placeholder="Contoh: CV Jaya Daur Ulang"
              defaultValue={collector?.name ?? ""}
              maxLength={100}
              required
              disabled={busy}
              error={!!state.error}
            />
          </div>

          <div>
            <Label htmlFor="collector-category">Kategori</Label>
            <Select
              id="collector-category"
              name="category_id"
              defaultValue={collector?.category_id ?? ""}
              required
              disabled={busy}
            >
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="collector-address">Tautan Google Maps</Label>
            <Input
              id="collector-address"
              name="address"
              type="url"
              inputMode="url"
              placeholder="https://maps.app.goo.gl/…"
              defaultValue={collector?.address ?? ""}
              maxLength={500}
              disabled={busy}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="collector-whatsapp">Nomor WhatsApp</Label>
              <Input
                id="collector-whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0812-3456-7890"
                defaultValue={collector?.whatsapp ?? ""}
                maxLength={20}
                disabled={busy}
                className="tabular-nums"
              />
            </div>

            <div>
              <Label htmlFor="collector-hours">Jam operasional</Label>
              <Input
                id="collector-hours"
                name="operational_hours"
                type="text"
                placeholder="08.00–17.00 (Senin–Sabtu)"
                defaultValue={collector?.operational_hours ?? ""}
                maxLength={100}
                disabled={busy}
                className="tabular-nums"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="collector-description">Deskripsi</Label>
            <Textarea
              id="collector-description"
              name="description"
              placeholder="Informasi tambahan tentang pengepul ini"
              defaultValue={collector?.description ?? ""}
              maxLength={500}
              disabled={busy}
              rows={4}
            />
          </div>
        </Card>

        {/* Kanan: panduan (desktop), status, gambar */}
        <Card className="flex flex-col gap-6 lg:col-span-4">
          <div className="hidden border-b border-border pb-6 lg:block">{guide}</div>

          <div>
            <Label htmlFor="collector-status">Status</Label>
            <Select
              id="collector-status"
              name="status"
              defaultValue={collector ? (collector.status ? "true" : "false") : "true"}
              disabled={busy}
            >
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </Select>
          </div>

          <ImageUploader
            name="image_url"
            folder="collectors"
            label="Foto pengepul"
            defaultImageUrl={collector?.image_url}
            onUploadStateChange={setIsUploading}
          />
        </Card>

        <div className="lg:col-span-12">
          <FormActions
            cancelHref="/dashboard/collectors"
            submitId={isEdit ? "update-collector-submit" : "create-collector-submit"}
            submitLabel={isEdit ? "Simpan perubahan" : "Tambah pengepul"}
            busyLabel={isUploading ? "Mengunggah…" : "Menyimpan…"}
            busy={busy}
          />
        </div>
      </form>
    </div>
  );
}
