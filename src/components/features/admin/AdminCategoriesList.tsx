"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { Category } from "@/types/category";

interface AdminCategoriesListProps {
  initialCategories: Category[];
}

export function AdminCategoriesList({ initialCategories }: AdminCategoriesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCategories = initialCategories.filter((category) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      category.name.toLowerCase().includes(query) ||
      (category.description || "").toLowerCase().includes(query)
    );
  });

  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

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
          placeholder="Cari nama atau deskripsi..."
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

      {filteredCategories.length > 0 ? (
        <div className="bg-white border border-border rounded-[8px] p-6 shadow-sm">
          <div className="divide-y divide-border">
            {currentItems.map((category) => (
              <div
                key={category.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="shrink-0 w-12 h-12 rounded-[6px] bg-[#299E63]/10 overflow-hidden flex items-center justify-center">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="text-brand-green w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-text-primary">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                      {category.description}
                    </p>
                  )}
                </div>

                {category.created_at && (
                  <div className="text-xs text-text-secondary font-medium shrink-0">
                    Ditambahkan: {new Date(category.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                )}

                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/dashboard/categories/${category.id}/edit`}>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-brand-green border border-border hover:border-brand-green bg-white rounded-[6px] px-3.5 py-1.5 transition-colors">
                      Edit
                    </button>
                  </Link>
                  <DeleteCategoryButton id={category.id} name={category.name} />
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
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-1">Kategori Tidak Ditemukan</h3>
          <p className="text-xs text-text-secondary max-w-xs mx-auto">
            Tidak ada kategori yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
