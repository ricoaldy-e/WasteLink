import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/features/admin/CategoryForm";
import { updateCategoryAction } from "@/actions/categories";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Edit Kategori — WasteLink Admin",
};

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const category = data as Category;

  // Bind the category id to updateCategoryAction so CategoryForm
  // receives a (prevState, formData) => Promise<ActionState> signature
  const boundUpdateAction = updateCategoryAction.bind(null, id);

  return (
    <main className="min-h-screen bg-background">
      <Section className="pt-8 pb-12 lg:pt-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/dashboard/categories">
            <Button variant="ghost" className="text-text-secondary hover:text-brand-green mb-4 -ml-3">
              ← Kembali ke Kategori
            </Button>
          </Link>
          <h1 className="text-h2 text-text-primary">Edit Kategori</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Perbarui informasi kategori{" "}
            <span className="font-semibold text-text-primary">
              &ldquo;{category.name}&rdquo;
            </span>
            .
          </p>
        </div>

        {/* Form pre-filled with existing data */}
        <CategoryForm category={category} action={boundUpdateAction} />
      </Section>
    </main>
  );
}
