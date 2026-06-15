"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface ActionState {
  error: string | null;
  success: string | null;
}

function extractStoragePath(url: string | null): string | null {
  if (!url) return null;
  const parts = url.split("wastelink-public/");
  return parts.length > 1 ? parts[1] : null;
}

// ─────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────
export async function createCollectorAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get("name") as string)?.trim();
  const category_id = (formData.get("category_id") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const address = (formData.get("address") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const whatsapp = (formData.get("whatsapp") as string)?.trim();
  const operational_hours = (formData.get("operational_hours") as string)?.trim();
  const image_url = (formData.get("image_url") as string)?.trim();
  const statusStr = formData.get("status") as string;
  const status = statusStr === "false" ? false : true;

  if (!name) {
    return { error: "Nama pengepul wajib diisi.", success: null };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("collectors").insert({
    name,
    category_id: category_id || null,
    description: description || null,
    address: address || null,
    phone: phone || null,
    whatsapp: whatsapp || null,
    operational_hours: operational_hours || null,
    image_url: image_url || null,
    status,
  });

  if (error) {
    return {
      error: `Gagal menyimpan pengepul: ${error.message}`,
      success: null,
    };
  }

  revalidatePath("/dashboard/collectors");
  redirect("/dashboard/collectors");
}

// ─────────────────────────────────────────────
// UPDATE
// ─────────────────────────────────────────────
export async function updateCollectorAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get("name") as string)?.trim();
  const category_id = (formData.get("category_id") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const address = (formData.get("address") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const whatsapp = (formData.get("whatsapp") as string)?.trim();
  const operational_hours = (formData.get("operational_hours") as string)?.trim();
  const image_url = (formData.get("image_url") as string)?.trim();
  const statusStr = formData.get("status") as string;
  const status = statusStr === "false" ? false : true;

  if (!name) {
    return { error: "Nama pengepul wajib diisi.", success: null };
  }

  const supabase = await createClient();

  const { data: oldData } = await supabase
    .from("collectors")
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("collectors")
    .update({
      name,
      category_id: category_id || null,
      description: description || null,
      address: address || null,
      phone: phone || null,
      whatsapp: whatsapp || null,
      operational_hours: operational_hours || null,
      image_url: image_url || null,
      status,
    })
    .eq("id", id);

  if (error) {
    return {
      error: `Gagal memperbarui pengepul: ${error.message}`,
      success: null,
    };
  }

  if (oldData?.image_url && oldData.image_url !== image_url) {
    const path = extractStoragePath(oldData.image_url);
    if (path) {
      await supabase.storage.from("wastelink-public").remove([path]);
    }
  }

  revalidatePath("/dashboard/collectors");
  redirect("/dashboard/collectors");
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────
export async function deleteCollectorAction(id: string): Promise<ActionState> {
  const supabase = await createClient();

  const { data: oldData } = await supabase
    .from("collectors")
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("collectors")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      error: `Gagal menghapus pengepul: ${error.message}`,
      success: null,
    };
  }

  if (oldData?.image_url) {
    const path = extractStoragePath(oldData.image_url);
    if (path) {
      await supabase.storage.from("wastelink-public").remove([path]);
    }
  }

  revalidatePath("/dashboard/collectors");
  return { error: null, success: "Pengepul berhasil dihapus." };
}
