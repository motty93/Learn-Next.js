import { supabase } from './client'

export const getRevenue = async () => {
  const { data, error } = await supabase.from('revenue').select('*')
  if (error) {
    console.log(error)
    return []
  }

  return data
}
