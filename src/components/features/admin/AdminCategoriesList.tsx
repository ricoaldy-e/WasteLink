"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { StateMessage } from "@/components/features/StateMessage";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { Category } from "@/types/category";

interface AdminCategoriesListProps {
  initialCategories: Category[];
}

const formatDate = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" });

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

  return (
    <div className="w-full">
      <SearchInput
        value={searchQuery}
        onValueChange={(v) => {
          setSearchQuery(v);
          setCurrentPage(1);
        }}
        label="Cari kategori"
        placeholder="Cari nama atau deskripsi"
      />

      <p role="status" className="mt-6 text-small font-semibold tabular-nums text-ink">
        {totalItems} kategori{searchQuery.trim() && " ditemukan"}
      </p>

      {filteredCategories.length > 0 ? (
        <>
          {/* Tabel bisa digeser horizontal di layar sempit. `relative`: elemen .sr-only (absolut) di dalam tabel tetap terkurung di area gulir, kalau tidak dokumen ikut melebar. */}
          <div className="relative mt-3 overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full min-w-[38rem] text-left">
              <caption className="sr-only">Daftar kategori</caption>
              <thead className="border-b-2 border-ink">
                <tr className="text-caption font-semibold text-muted">
                  <th scope="col" className="px-4 py-3">Kategori</th>
                  <th scope="col" className="px-4 py-3">Ditambahkan</th>
                  <th scope="col" className="px-4 py-3"><span className="sr-only">Aksi</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-small">
                {currentItems.map((category) => (
                  <tr key={category.id} className="align-middle">
                    <td className="px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-primary-subtle text-primary">
                          {category.image_url ? (
                            <Image src={category.image_url} alt="" width={40} height={40} className="size-full object-cover" />
                          ) : (
                            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <path d="M3 9h18M9 21V9" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">{category.name}</p>
                          {category.description && <p className="line-clamp-1 max-w-[48ch] text-caption text-muted">{category.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted">
                      {category.created_at ? (
                        <time dateTime={category.created_at}>{formatDate.format(new Date(category.created_at))}</time>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <ButtonLink href={`/dashboard/categories/${category.id}/edit`} variant="secondary" size="sm">
                          Edit<span className="sr-only"> kategori {category.name}</span>
                        </ButtonLink>
                        <DeleteCategoryButton id={category.id} name={category.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />}
        </>
      ) : (
        <div className="mt-3">
          <StateMessage title="Kategori tidak ditemukan">
            Tidak ada kategori yang cocok dengan “{searchQuery.trim()}”. Coba kata kunci lain.
          </StateMessage>
        </div>
      )}
    </div>
  );
}
