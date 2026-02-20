import { Main } from '@/app/(dashboard)/[role]/dashboard/_components/Main'
import { CustomersDashboardClient } from '@/app/(dashboard)/[role]/dashboard/customers/_components/CustomersDashboardClient'

export default function CustomersPage() {
  return (
    <Main className='space-y-6'>
      <CustomersDashboardClient />
    </Main>
  )
}
