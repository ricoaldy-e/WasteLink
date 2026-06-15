"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Collector {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  status: boolean;
  image_url: string | null;
  categories: { name: string } | null;
}

interface CollectorsListProps {
  collectors: Collector[];
}

export function CollectorsList({ collectors }: CollectorsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCollectors = collectors.filter((collector) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      collector.name.toLowerCase().includes(query) ||
      (collector.description || "").toLowerCase().includes(query) ||
      (collector.address || "").toLowerCase().includes(query) ||
      (collector.categories?.name || "").toLowerCase().includes(query)
    );
  });

  const totalItems = filteredCollectors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollectors.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full">
      <div className="relative w-full max-w-sm mb-8 select-none">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="h-[18px] w-[18px] text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
          placeholder="Cari nama, alamat, atau kategori limbah..."
          className="block w-full pl-10 pr-10 py-2.5 bg-white border border-border rounded-[8px] text-sm font-semibold text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1); // Reset to page 1 on clear
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-secondary hover:text-text-primary focus:outline-none"
            aria-label="Bersihkan pencarian"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filteredCollectors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentItems.map((collector) => (
            <Link key={collector.id} href={`/collectors/${collector.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-2xl h-full">
              <Card className="h-full border border-border shadow-sm hover:border-brand-green/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-lg">
                  {collector.image_url ? (
                    <Image
                      src={collector.image_url}
                      alt={collector.name || "Pengepul"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-4 bg-white"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <span className="text-text-muted text-sm font-medium">Tanpa Gambar</span>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 flex flex-col items-start text-left flex-1 w-full">
                  {collector.categories?.name && (
                    <Badge variant="neutral" className="mb-2.5 bg-gray-50 border-gray-200 text-text-secondary font-medium">
                      {collector.categories.name}
                    </Badge>
                  )}
                  <h3 title={collector.name} className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 min-h-[3.5rem]">{collector.name}</h3>
                  
                  <p className="text-sm text-text-muted line-clamp-2 mb-3 leading-relaxed">
                    {collector.description || "Mitra pengepul terpercaya di WasteLink."}
                  </p>
                  
                  <div className="flex items-start gap-2.5 text-text-secondary mt-auto w-full">
                    <svg className="w-4 h-4 shrink-0 mt-0.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm line-clamp-2 leading-relaxed text-text-secondary">
                      {collector.address ? "Tersedia lokasi Google Maps" : "Lokasi belum disediakan"}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 select-none">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2.5 h-10 text-sm font-semibold flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </Button>

              <div className="hidden sm:flex items-center gap-1.5">
                {getPageNumbers().map((page, index) => {
                  if (page === "ellipsis-start" || page === "ellipsis-end") {
                    return (
                      <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-text-muted">
                        ...
                      </span>
                    );
                  }

                  const pageNum = page as number;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "primary" : "secondary"}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 p-0 text-sm font-semibold rounded-[6px] ${
                        currentPage === pageNum
                          ? "bg-brand-green text-white hover:bg-brand-green-hover"
                          : "bg-white text-text-primary border border-border hover:bg-brand-green-subtle"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <span className="text-body-sm text-text-secondary font-medium sm:hidden px-2">
                Halaman {currentPage} dari {totalPages}
              </span>

              <Button
                variant="secondary"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2.5 h-10 text-sm font-semibold flex items-center gap-1.5"
              >
                Berikutnya
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-border px-4 select-none">
          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center text-text-muted">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-text-primary mb-1">Pengepul Tidak Ditemukan</h3>
          <p className="text-xs text-text-muted max-w-xs mx-auto">
            Tidak ada pengepul yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan coba kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
}
