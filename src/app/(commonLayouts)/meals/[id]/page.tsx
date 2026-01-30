import { getSingleMeal } from "@/actions/meals.action";
import MealDetailsCard from "@/components/modules/meals/MealDetailsCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getSingleMeal(id);

  return (
    <div>
      <MealDetailsCard meal={data.data}></MealDetailsCard>
    </div>
  );
}
