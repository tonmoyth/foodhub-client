import { getAllCategories, getAllMeals } from "@/actions/meals.action";
import { MealCard } from "@/components/modules/meals/MealCard";
import { MealFilter } from "@/components/modules/meals/mealFilter";
import { ProviderCard } from "@/components/modules/meals/ProviderCard";

type SearchParams = {
  categoriesId?: string;

  maxPrice?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const categoriesId = params.categoriesId;

  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const [mealsData, categories] = await Promise.all([
    getAllMeals({
      categoriesId,
      maxPrice,
    }),
    getAllCategories(),
  ]);

  const providers = mealsData?.data
    ? Array.from(
        new Map(
          mealsData.data.map((m: any) => [
            m?.providerProfile?.id,
            m?.providerProfile,
          ]),
        ).values(),
      )
    : [];

  return (
    <div className="space-y-10 p-5 pt-25">
      {/* Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Providers */}
        <div className="md:col-span-1 space-y-4">
          {/* Filter */}
          <div>
            <MealFilter category={categories?.data} />
          </div>
          <h3 className="text-lg font-semibold">Providers</h3>
          {providers.length > 0 ? (
            providers?.map((p: any, idx) => (
              <ProviderCard key={p?.id || idx} provider={p} />
            ))
          ) : (
            <p>No providers found</p>
          )}
        </div>

        {/* Meals */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealsData?.data?.length > 0 ? (
            mealsData?.data.map((meal: any) => (
              <MealCard key={meal?.id} meal={meal} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No meals found for selected filters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
