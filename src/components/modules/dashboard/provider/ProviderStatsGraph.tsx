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
    totalMenu: number;
    totalOrders: number;
  };
};

export default function ProviderStatsGraph({ data }: Props) {
  const chartData = [
    { name: "Menu", value: data.totalMenu },
    { name: "Orders", value: data.totalOrders },
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Provider Overview</CardTitle>
      </CardHeader>

      <CardContent className="h-[260px]">
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
