import type { Database } from '@/app/type/supabase'
import { supabase } from './client'

export type CustomersRow = Database['public']['Tables']['customers']['Row']

export async function fetchCustomersCount() {
  return supabase.from('customers').select('id', { count: 'exact' })
}
