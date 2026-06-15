"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
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
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <div className="lg:hidden col-span-1">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              Panduan Pengepul
            </h3>
            <ul className="text-xs text-text-secondary space-y-2.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-text-primary">Nama & Kategori:</strong> Masukkan nama resmi instansi/lapak dan pilih kategori limbah utama.
              </li>
              <li>
                <strong className="text-text-primary">Alamat & Kontak:</strong> Masukkan link Google Maps lokasi pengepul dan kontak WhatsApp aktif untuk memudahkan transaksi.
              </li>
              <li>
                <strong className="text-text-primary">Jam Operasional:</strong> Informasikan jadwal buka lapak dengan format yang jelas.
              </li>
              <li>
                <strong className="text-text-primary">Status:</strong> Pengepul nonaktif tidak akan muncul di peta direktori publik.
              </li>
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col gap-6">
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

            <div>
              <Label htmlFor="collector-address">Link Google Maps Pengepul</Label>
              <Input
                id="collector-address"
                name="address"
                type="url"
                placeholder="https://maps.app.goo.gl/..."
                defaultValue={collector?.address ?? ""}
                maxLength={500}
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
                className="resize-none"
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col gap-6">
            <div className="hidden lg:block border-b border-border pb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
                Panduan Pengepul
              </h3>
              <ul className="text-xs text-text-secondary space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-text-primary">Nama & Kategori:</strong> Masukkan nama resmi instansi/lapak dan pilih kategori limbah utama.
                </li>
                <li>
                  <strong className="text-text-primary">Alamat & Kontak:</strong> Masukkan link Google Maps lokasi pengepul dan kontak WhatsApp aktif untuk memudahkan transaksi.
                </li>
                <li>
                  <strong className="text-text-primary">Jam Operasional:</strong> Informasikan jadwal buka lapak dengan format yang jelas.
                </li>
                <li>
                  <strong className="text-text-primary">Status:</strong> Pengepul nonaktif tidak akan muncul di peta direktori publik.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <Label htmlFor="collector-status" className="mb-2 block">Status Pengepul</Label>
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

              <div className="flex flex-col gap-4">
                <ImageUploader
                  name="image_url"
                  folder="collectors"
                  label="Gambar Pengepul"
                  defaultImageUrl={collector?.image_url}
                  onUploadStateChange={setIsUploading}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-12 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-border mt-4">
          <Link
            href="/dashboard/collectors"
            className="w-full sm:w-[180px] h-[44px] rounded-[6px] border border-border text-text-secondary bg-white hover:bg-gray-50 active:bg-gray-100 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center pointer-events-auto"
            style={{ pointerEvents: (isPending || isUploading) ? "none" : "auto", opacity: (isPending || isUploading) ? 0.5 : 1 }}
          >
            Batal
          </Link>
          
          <button
            id={isEdit ? "update-collector-submit" : "create-collector-submit"}
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
              "Tambah Pengepul"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
