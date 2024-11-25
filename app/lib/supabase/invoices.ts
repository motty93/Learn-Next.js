import type { Database } from '@/app/type/supabase'
import { supabase } from './client'
import type { CustomersRow } from './customers'

export type InvoicesRow = Database['public']['Tables']['invoices']['Row']
export type LatestInvoicesRow = Pick<InvoicesRow, 'id' | 'amount'> & Omit<CustomersRow, 'id'>
export type TotalInvoicesByStatus = { paid: number | null; pending: number | null }

export const fetchInvoices = async (): Promise<InvoicesRow[]> => {
  const { data, error } = await supabase.from('invoices').select('*')
  if (error) {
    console.log(error)
    return []
  }

  return data
}

export const fetchLatestInvoices = async (): Promise<LatestInvoicesRow[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      id,
      amount,
      customers (
        name,
        email,
        image_url
      )
    `)
    .order('date', { ascending: true })
    .limit(5)

  if (error) {
    console.error(error)
    return []
  }

  if (!data) {
    console.log('No data')
    return []
  }

  const formattedData = data.map((invoice) => ({
    id: invoice.id,
    amount: invoice.amount,
    name: invoice.customers?.name || '',
    email: invoice.customers?.email || '',
    image_url: invoice.customers?.image_url || '',
  }))

  return formattedData
}

export const fetchTotalInvoicesByStatus = async (): Promise<TotalInvoicesByStatus> => {
  const { data, error } = await supabase.rpc('fetch_invoices_count_by_status')

  if (error) {
    console.error(error)
    return { paid: 0, pending: 0 }
  }

  if (!data || data.length === 0) {
    console.log('No data')
    return { paid: 0, pending: 0 }
  }

  return data[0]
}

export const fetchTotalInvoices = async () => {
  return supabase.from('invoices').select('id', { count: 'exact' })
}
