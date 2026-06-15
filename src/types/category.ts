export interface Category {
  id: string;
  name: string;
  description: string | null;
  education_content: string | null;
  image_url: string | null;
  created_at: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  education_content: string;
  image_url: string;
}
