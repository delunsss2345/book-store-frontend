import { Main } from "../../_components/Main";
import { CustomersDashboardClient } from "./_components/CustomersDashboardClient";

export default function CustomersPage() {
  return (
    <Main className="space-y-6">
      <CustomersDashboardClient />
    </Main>
  );
}
