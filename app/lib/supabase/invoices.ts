import { supabase } from './client'

export const getInvoices = async () => {
  const { data, error } = await supabase.from('invoices').select('*')
  if (error) {
    console.log(error)
    return []
  }

  return data
}
