import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("URL:", import.meta.env.VITE_SUPABASE_ANON_KEY?.length );


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
