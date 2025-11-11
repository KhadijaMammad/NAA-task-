export type Language = 'az' | 'en';

export type Post = {
  id: number;
  title_az: string;
  title_en: string;
  slug: string;
  category: 'news' | 'announcement';
  cover_image: string | null;
  content_az: string;
  content_en: string;
  status: 'active' | 'inactive';
  publish_status: 'published' | 'draft';
  author: string;
  sharing_time: string;
  created_at: string;
  updated_at: string;
};

export type PostFormData = {
  title_az: string;
  title_en: string;
  slug: string;
  category: 'news' | 'announcement';
  cover_image: File | string | null;
  content_az: string;
  content_en: string;
  status: 'active' | 'inactive';
  publish_status: 'published' | 'draft';
  author: string;
};

export type FilterOptions = {
  category: 'all' | 'news' | 'announcement';
  status: 'all' | 'active' | 'inactive';
  search: string;
};
