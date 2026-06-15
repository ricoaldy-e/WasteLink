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
export async function createCategoryAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const education_content = (
    formData.get("education_content") as string
  )?.trim();
  const image_url = (formData.get("image_url") as string)?.trim();

  if (!name) {
    return { error: "Nama kategori wajib diisi.", success: null };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("categories").insert({
    name,
    description: description || null,
    education_content: education_content || null,
    image_url: image_url || null,
  });

  if (error) {
    return {
      error: `Gagal menyimpan kategori: ${error.message}`,
      success: null,
    };
  }

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

// ─────────────────────────────────────────────
// UPDATE
// ─────────────────────────────────────────────
export async function updateCategoryAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const education_content = (
    formData.get("education_content") as string
  )?.trim();
  const image_url = (formData.get("image_url") as string)?.trim();

  if (!name) {
    return { error: "Nama kategori wajib diisi.", success: null };
  }

  const supabase = await createClient();

  // Ambil data lama untuk mengecek image_url
  const { data: oldData } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      description: description || null,
      education_content: education_content || null,
      image_url: image_url || null,
    })
    .eq("id", id);

  if (error) {
    return {
      error: `Gagal memperbarui kategori: ${error.message}`,
      success: null,
    };
  }
  if (oldData?.image_url && oldData.image_url !== image_url) {
    const path = extractStoragePath(oldData.image_url);
    if (path) {
      await supabase.storage.from("wastelink-public").remove([path]);
    }
  }

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────
export async function deleteCategoryAction(id: string): Promise<ActionState> {
  const supabase = await createClient();

  // Ambil data lama untuk mengecek image_url
  const { data: oldData } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      error: `Gagal menghapus kategori: ${error.message}`,
      success: null,
    };
  }
  if (oldData?.image_url) {
    const path = extractStoragePath(oldData.image_url);
    if (path) {
      await supabase.storage.from("wastelink-public").remove([path]);
    }
  }

  revalidatePath("/dashboard/categories");
  return { error: null, success: "Kategori berhasil dihapus." };
}
