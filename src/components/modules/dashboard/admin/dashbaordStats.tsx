import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, UtensilsCrossed, Package, Store } from "lucide-react";
import DashboardStatsWithGraph from "./dashboardGraph";

type DashboardStatsProps = {
  data: {
    totalCategories: number;
    totalMeals: number;
    totalOrders: number;
    totalProviders: number;
  };
};

export default function DashboardStats({ data }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Categories",
      value: data?.totalCategories,
      icon: ShoppingBag,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Meals",
      value: data?.totalMeals,
      icon: UtensilsCrossed,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Total Orders",
      value: data?.totalOrders,
      icon: Package,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "Total Providers",
      value: data?.totalProviders,
      icon: Store,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="pt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <Card
            key={item?.title}
            className="hover:shadow-lg transition cursor-pointer"
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item?.title}</p>
                <h2 className="text-3xl text-green-500 font-bold mt-1">
                  {item?.value}
                </h2>
              </div>

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${item?.bg}`}
              >
                <item.icon className={`w-6 h-6 ${item?.text}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <DashboardStatsWithGraph data={data} />
      </div>
    </div>
  );
}
