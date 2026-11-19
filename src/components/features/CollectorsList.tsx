"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { CollectorCard, collectorListClass, type CollectorCardData } from "@/components/features/CollectorCard";
import { Pagination } from "@/components/ui/pagination";
import { StateMessage } from "@/components/features/StateMessage";

interface Collector extends CollectorCardData {
  status: boolean;
  categories: { name: string } | null;
}

interface CollectorsListProps {
  collectors: Collector[];
  /** Nilai awal dari `?q=` dan `?kategori=` (mis. dari pencarian beranda atau tombol kembali). */
  initialQuery?: string;
  initialCategory?: string;
}

const PER_PAGE = 8;

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-sm border px-4 text-small font-semibold transition-colors duration-150 ${
        selected ? "border-primary bg-primary text-on-primary" : "border-border-strong bg-surface text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function CollectorsList({ collectors, initialQuery = "", initialCategory = "" }: CollectorsListProps) {
  const categoryNames = useMemo(
    () =>
      [...new Set(collectors.map((c) => c.categories?.name).filter((n): n is string => !!n))].sort((a, b) =>
        a.localeCompare(b, "id", { sensitivity: "base" })
      ),
    [collectors]
  );

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(categoryNames.includes(initialCategory) ? initialCategory : "");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Simpan filter di URL (tanpa navigasi) supaya tombol kembali dari halaman detail memulihkannya.
  const applyFilters = (nextQuery: string, nextCategory: string) => {
    setQuery(nextQuery);
    setCategory(nextCategory);
    setPage(1);
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory) params.set("kategori", nextCategory);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const q = query.toLowerCase().trim();
  const filtered = collectors.filter(
    (c) =>
      (!category || c.categories?.name === category) &&
      (!q || [c.name, c.description, c.categories?.name].some((v) => (v || "").toLowerCase().includes(q)))
  );
  const hasFilter = !!q || !!category;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goToPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ block: "start" });
  };

  const criteria = [q && `“${query.trim()}”`, category && `kategori ${category}`].filter(Boolean).join(" di ");

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <SearchInput
          value={query}
          onValueChange={(v) => applyFilters(v, category)}
          label="Cari pengepul"
          placeholder="Cari nama atau jenis limbah"
        />
        {categoryNames.length > 1 && (
          <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
            <Chip selected={!category} onClick={() => applyFilters(query, "")}>Semua</Chip>
            {categoryNames.map((name) => (
              <Chip key={name} selected={category === name} onClick={() => applyFilters(query, category === name ? "" : name)}>
                {name}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div ref={resultsRef} className="mt-8 flex min-h-11 scroll-mt-24 items-center justify-between gap-4">
        <p role="status" className="text-small font-semibold tabular-nums text-ink">
          {filtered.length} pengepul{hasFilter && " ditemukan"}
        </p>
        {hasFilter && (
          <Button variant="ghost" onClick={() => applyFilters("", "")} className="-me-3 min-h-11">
            Hapus filter
          </Button>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          <ul className={`mt-2 ${collectorListClass()}`}>
            {items.map((c) => (
              <li key={c.id}>
                <CollectorCard collector={c} categoryName={c.categories?.name} />
              </li>
            ))}
          </ul>
          {totalPages > 1 && <Pagination page={page} total={totalPages} onChange={goToPage} />}
        </>
      ) : (
        <div className="mt-2">
          <StateMessage
            title="Tidak ada pengepul yang cocok"
            action={
              <>
                <Button variant="secondary" onClick={() => applyFilters("", "")}>Hapus filter</Button>
              </>
            }
          >
            Tidak ada hasil untuk {criteria}. Coba kata kunci yang lebih pendek atau pilih kategori lain.
          </StateMessage>
        </div>
      )}
    </div>
  );
}
