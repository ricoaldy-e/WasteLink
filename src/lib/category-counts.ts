import type { createClient } from '@/lib/supabase/server';

type Supabase = Awaited<ReturnType<typeof createClient>>;

/** Jumlah pengepul AKTIF per kategori: { [category_id]: n }. Satu query ringan, dihitung di server. */
export async function getCategoryCounts(supabase: Supabase): Promise<Record<string, number>> {
  const { data } = await supabase.from('collectors').select('category_id').eq('status', true);
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    if (row.category_id) counts[row.category_id] = (counts[row.category_id] ?? 0) + 1;
  }
  return counts;
}
