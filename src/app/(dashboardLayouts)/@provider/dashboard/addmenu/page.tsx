import { getAllCategories, getSignleProvider } from "@/actions/meals.action";
import { CreateMealForm } from "@/components/modules/dashboard/provider/addMenu";

export default async function Page() {
  const categories = getAllCategories();
  const provider = getSignleProvider();
  const [categoriesData, providerData] = await Promise.all([
    categories,
    provider,
  ]);

  return (
    <div>
      <CreateMealForm
        categoriesData={categoriesData}
        providerData={providerData}
      ></CreateMealForm>
    </div>
  );
}
