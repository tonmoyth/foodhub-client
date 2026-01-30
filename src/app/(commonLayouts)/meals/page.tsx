import { getAllMeals } from "@/actions/meals.action";
import { MealCard } from "@/components/modules/meals/MealCard";
import { ProviderCard } from "@/components/modules/meals/ProviderCard";

export default async function Page() {
  const mealsData = await getAllMeals();
  const providers = Array.from(
    new Map(
      mealsData?.data?.map((m: any) => [
        m.providerProfile.id,
        m.providerProfile,
      ]),
    ).values(),
  );
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Providers */}
      <div className="md:col-span-1 space-y-4">
        <h3 className="text-lg font-semibold">Providers</h3>
        {providers.map((p: any) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>

      {/* Meals */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealsData?.data?.map((meal: any) => (
          <MealCard key={`${meal.id}`} meal={meal} />
        ))}
      </div>
    </div>
  );
}
