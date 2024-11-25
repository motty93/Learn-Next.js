import { fetchCustomersCount } from '@/app/lib/supabase/customers'
import { fetchTotalInvoices, fetchTotalInvoicesByStatus } from '@/app/lib/supabase/invoices'

type CardData = {
  totalPaidInvoices: number
  totalPendingInvoices: number
  invoicesCount: number
  customersCount: number
}

export async function fetchCardData(): Promise<CardData> {
  try {
    const [totalInvoicesStatus, customersCountResult, invoicesCountResult] = await Promise.all([
      fetchTotalInvoicesByStatus(),
      fetchCustomersCount(),
      fetchTotalInvoices(),
    ])

    if (invoicesCountResult.error || customersCountResult.error) {
      return {
        totalPaidInvoices: 0,
        totalPendingInvoices: 0,
        invoicesCount: 0,
        customersCount: 0,
      }
    }

    return {
      totalPaidInvoices: Number(totalInvoicesStatus.paid),
      totalPendingInvoices: Number(totalInvoicesStatus.pending),
      invoicesCount: invoicesCountResult.count ?? 0,
      customersCount: customersCountResult.count ?? 0,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}
