import { supabase } from './client'

export const fetchRevenue = async () => {
  try {
    console.log('Fetching revenue data...')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const { data, error } = await supabase.from('revenue').select('*')
    if (error) {
      console.log(error)
      return []
    }

    console.log('Data fetch completed after 3 seconds.')

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}
