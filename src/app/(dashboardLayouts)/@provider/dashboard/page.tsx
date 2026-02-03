import { getProviderStatistics } from "@/actions/meals.action";
import ProviderStatsGraph from "@/components/modules/dashboard/provider/ProviderStatsGraph";
import { StatCard } from "@/components/modules/dashboard/provider/StatCard";

export default async function Page() {
  const statistics = await getProviderStatistics();

  return (
    <>
      <div className="pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Total Menu"
            value={statistics?.data?.totalMenu || 0}
          />
          <StatCard
            title="Total Orders"
            value={statistics?.data?.totalOrders || 0}
          />
        </div>

        <ProviderStatsGraph
          data={{
            totalMenu: statistics?.data?.totalMenu || 0,
            totalOrders: statistics?.data?.totalOrders || 0,
          }}
        />
      </div>
    </>
  );
}
