import { Main } from '@/app/(dashboard)/[role]/dashboard/_components/Main'
import { ProductsDashboardClient } from '@/app/(dashboard)/[role]/dashboard/products/_components/ProductsDashboardClient'

export default function ProductsPage() {
    return (
        <Main className='space-y-6'>
            <ProductsDashboardClient />
        </Main>
    )
}
