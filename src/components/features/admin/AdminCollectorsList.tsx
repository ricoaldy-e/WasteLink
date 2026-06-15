"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DeleteCollectorButton } from "./DeleteCollectorButton";

type CollectorListItem = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  status: boolean;
  created_at: string;
  category_id: string | null;
  categories: { id: string; name: string } | null;
};

interface AdminCollectorsListProps {
  initialCollectors: CollectorListItem[];
}

export function AdminCollectorsList({ initialCollectors }: AdminCollectorsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCollectors = initialCollectors.filter((collector) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      collector.name.toLowerCase().includes(query) ||
      (collector.description || "").toLowerCase().includes(query) ||
      (collector.categories?.name || "").toLowerCase().includes(query)
    );
  });

  const totalItems = filteredCollectors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollectors.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full max-w-sm select-none">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to page 1
          }}
          placeholder="Cari nama atau kategori..."
          className="block w-full pl-9 pr-8 py-2 bg-white border border-border rounded-[6px] text-xs font-semibold text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary focus:outline-none"
            aria-label="Bersihkan pencarian"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filteredCollectors.length > 0 ? (
        <div className="bg-white border border-border rounded-[8px] p-6 shadow-sm">
          <div className="divide-y divide-border">
            {currentItems.map((collector) => (
              <div
                key={collector.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden bg-brand-green flex items-center justify-center text-white text-sm font-bold uppercase">
                  {collector.image_url ? (
                    <Image
                      src={collector.image_url}
                      alt={collector.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{collector.name.charAt(0)}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-text-primary truncate">
                      {collector.name}
                    </h2>
                    <span
                      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                        collector.status
                          ? "bg-brand-green text-white border-transparent"
                          : "bg-white text-text-secondary border-border"
                      }`}
                    >
                      {collector.status ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  {collector.categories?.name && (
                    <p className="text-xs text-brand-green font-semibold mt-0.5">
                      {collector.categories.name}
                    </p>
                  )}
                  {collector.description && (
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                      {collector.description}
                    </p>
                  )}
                </div>

                {collector.created_at && (
                  <div className="text-xs text-text-secondary font-medium shrink-0">
                    Terdaftar: {new Date(collector.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                )}

                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/dashboard/collectors/${collector.id}/edit`}>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-brand-green border border-border hover:border-brand-green bg-white rounded-[6px] px-3.5 py-1.5 transition-colors">
                      Edit
                    </button>
                  </Link>
                  <DeleteCollectorButton id={collector.id} name={collector.name} />
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-border mt-5 select-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Halaman {currentPage} dari {totalPages}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 h-8 rounded-[6px] border border-border text-text-secondary hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center"
                >
                  Sebelumnya
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-[6px] font-bold text-[10px] flex items-center justify-center border transition-all ${
                        currentPage === page
                          ? "bg-brand-green text-white border-transparent"
                          : "bg-white text-text-secondary border-border hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 h-8 rounded-[6px] border border-border text-text-secondary hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-[8px] p-12 text-center shadow-sm">
          <div className="w-12 h-12 bg-gray-50 border border-border rounded-[6px] mx-auto mb-4 flex items-center justify-center text-text-secondary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-1">Pengepul Tidak Ditemukan</h3>
          <p className="text-xs text-text-secondary max-w-xs mx-auto">
            Tidak ada pengepul yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
