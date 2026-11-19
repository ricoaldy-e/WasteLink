"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { StateMessage } from "@/components/features/StateMessage";
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

const formatDate = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" });

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

  return (
    <div className="w-full">
      <SearchInput
        value={searchQuery}
        onValueChange={(v) => {
          setSearchQuery(v);
          setCurrentPage(1);
        }}
        label="Cari pengepul"
        placeholder="Cari nama atau kategori"
      />

      <p role="status" className="mt-6 text-small font-semibold tabular-nums text-ink">
        {totalItems} pengepul{searchQuery.trim() && " ditemukan"}
      </p>

      {filteredCollectors.length > 0 ? (
        <>
          {/* Tabel bisa digeser horizontal di layar sempit. `relative`: elemen .sr-only (absolut) di dalam tabel tetap terkurung di area gulir, kalau tidak dokumen ikut melebar. */}
          <div className="relative mt-3 overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full min-w-[46rem] text-left">
              <caption className="sr-only">Daftar pengepul</caption>
              <thead className="border-b-2 border-ink">
                <tr className="text-caption font-semibold text-muted">
                  <th scope="col" className="px-4 py-3">Pengepul</th>
                  <th scope="col" className="px-4 py-3">Kategori</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Terdaftar</th>
                  <th scope="col" className="px-4 py-3"><span className="sr-only">Aksi</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-small">
                {currentItems.map((collector) => (
                  <tr key={collector.id} className="align-middle">
                    <td className="px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-on-primary">
                          {collector.image_url ? (
                            <Image src={collector.image_url} alt="" width={40} height={40} className="size-full object-cover" />
                          ) : (
                            collector.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">{collector.name}</p>
                          {collector.description && <p className="line-clamp-1 max-w-[32ch] text-caption text-muted">{collector.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{collector.categories?.name ?? "-"}</td>
                    <td className="px-4 py-3">
                      {collector.status ? <Badge variant="success">Aktif</Badge> : <Badge variant="neutral">Nonaktif</Badge>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted">
                      {collector.created_at ? (
                        <time dateTime={collector.created_at}>{formatDate.format(new Date(collector.created_at))}</time>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <ButtonLink href={`/dashboard/collectors/${collector.id}/edit`} variant="secondary" size="sm">
                          Edit<span className="sr-only"> pengepul {collector.name}</span>
                        </ButtonLink>
                        <DeleteCollectorButton id={collector.id} name={collector.name} />
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
          <StateMessage title="Pengepul tidak ditemukan">
            Tidak ada pengepul yang cocok dengan “{searchQuery.trim()}”. Coba nama atau kategori lain.
          </StateMessage>
        </div>
      )}
    </div>
  );
}
