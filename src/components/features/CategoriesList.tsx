"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { CategoryCard, type CategoryCardData } from "@/components/features/CategoryCard";
import { StateMessage } from "@/components/features/StateMessage";

interface CategoriesListProps {
  categories: CategoryCardData[];
  /** Jumlah pengepul aktif per kategori: { [category_id]: n } */
  counts: Record<string, number>;
}

export function CategoriesList({ categories, counts }: CategoriesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.toLowerCase().trim();
  const filtered = categories.filter(
    (cat) => !query || cat.name.toLowerCase().includes(query) || (cat.description || "").toLowerCase().includes(query)
  );

  return (
    <div className="w-full">
      <SearchInput value={searchQuery} onValueChange={setSearchQuery} label="Cari kategori" placeholder="Cari kategori limbah" />

      <div className="mt-8 flex min-h-11 items-center justify-between gap-4">
        <p role="status" className="text-small font-semibold tabular-nums text-ink">
          {filtered.length} kategori{query && " ditemukan"}
        </p>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-4">
          {filtered.map((cat) => (
            <li key={cat.id}>
              <CategoryCard category={cat} count={counts[cat.id] ?? 0} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2">
          <StateMessage
            title="Tidak ada kategori yang cocok"
            action={<Button variant="secondary" onClick={() => setSearchQuery("")}>Hapus pencarian</Button>}
          >
            Tidak ada hasil untuk “{searchQuery.trim()}”. Coba kata kunci yang lebih pendek, misalnya “plastik” atau “kertas”.
          </StateMessage>
        </div>
      )}
    </div>
  );
}
