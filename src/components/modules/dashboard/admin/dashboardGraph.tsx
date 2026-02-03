"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: {
    totalCategories: number;
    totalMeals: number;
    totalOrders: number;
    totalProviders: number;
  };
};

export default function DashboardStatsWithGraph({ data }: Props) {
  const chartData = [
    { name: "Categories", value: data.totalCategories },
    { name: "Meals", value: data.totalMeals },
    { name: "Orders", value: data.totalOrders },
    { name: "Providers", value: data.totalProviders },
  ];

  return (
    <Card className="mt-8 w-full">
      <CardHeader>
        <CardTitle>Platform Overview</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
