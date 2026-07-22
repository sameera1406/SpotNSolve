import { supabase } from '../lib/supabase';
import type { Category } from '../types';

/**
 * Fetches all categories from the database, ordered by name.
 */
export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('[categoryService] fetchCategories error:', error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}
