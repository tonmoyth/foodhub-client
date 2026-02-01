import { getAllCategories } from "@/actions/meals.action";
import ManageCategories from "@/components/modules/dashboard/admin/manage.categories";

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div>
      <ManageCategories item={categories.data}></ManageCategories>
    </div>
  );
}
