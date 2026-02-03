import { getAdminStatistics } from "@/actions/meals.action";
import DashboardStats from "@/components/modules/dashboard/admin/dashbaordStats";

export default async function Page() {
  const statistics = await getAdminStatistics();

  return (
    <div>
      <DashboardStats data={statistics.data} />
    </div>
  );
}
