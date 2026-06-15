"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

interface CategoriesListProps {
  categories: Category[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories alphabetically and by query
  const filteredCategories = categories.filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      cat.name.toLowerCase().includes(query) ||
      (cat.description || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full">
      {/* Search Input Bar */}
      <div className="relative w-full md:max-w-md mb-8 select-none">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kategori limbah..."
          className="block w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-green/60 focus:ring-2 focus:ring-brand-green/10 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-primary focus:outline-none"
            aria-label="Bersihkan pencarian"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Grid Kategori */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-2xl h-full">
              <Card className="h-full border border-border shadow-sm hover:border-brand-green/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-lg">
                  {cat.image_url ? (
                    <Image
                      src={cat.image_url}
                      alt={cat.name || "Kategori"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <span className="text-text-muted text-sm font-medium">Tanpa Gambar</span>
                    </div>
                  )}
                </div>
                <div className="pt-4 flex flex-col items-start text-left flex-1 w-full">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{cat.name}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mt-auto leading-relaxed">{cat.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-border px-4 select-none">
          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center text-text-muted">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-text-primary mb-1">Kategori Tidak Ditemukan</h3>
          <p className="text-xs text-text-muted max-w-xs mx-auto">
            Tidak ada kategori limbah yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan coba kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
}
