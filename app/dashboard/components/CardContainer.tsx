import { Card } from '@/app/ui/dashboard/cards'
import { fetchCardData } from './fetchData'

export default async function CardContainer() {
  const { totalPaidInvoices, totalPendingInvoices, invoicesCount, customersCount } =
    await fetchCardData()

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={invoicesCount} type="invoices" />
      <Card title="Total Customers" value={customersCount} type="customers" />
    </>
  )
}
