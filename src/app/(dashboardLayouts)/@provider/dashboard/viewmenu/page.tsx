import { getAllCategories, getMealsByProvider } from "@/actions/meals.action";
import Viewmanu from "@/components/modules/dashboard/provider/viewmenu";

export default async function Page() {
  const { data } = await getMealsByProvider();
  const categories = await getAllCategories();

  return (
    <div>
      <Viewmanu categories={categories} items={data}></Viewmanu>
    </div>
  );
}
