export interface Collector {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  operational_hours: string | null;
  image_url: string | null;
  status: boolean;
  created_at: string;
}

/** Joined shape when querying with category name */
export interface CollectorWithCategory extends Collector {
  categories: { id: string; name: string } | null;
}
