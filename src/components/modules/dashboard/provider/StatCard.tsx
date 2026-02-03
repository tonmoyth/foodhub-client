import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-3xl text-green-500 font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}
