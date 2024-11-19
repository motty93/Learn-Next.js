import { supabase } from './client'

export const getUsers = async () => {
  const { data, error } = await supabase.from('users').select('id, name, email')
  if (error) {
    console.log(error)
    return []
  }

  return data
}
