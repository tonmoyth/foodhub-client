import { getAllOrdersForAdmin } from "@/actions/meals.action";
import Orderstable from "@/components/modules/dashboard/admin/orders.table";

export default async function Page() {
  const { data } = await getAllOrdersForAdmin();

  return (
    <div>
      <Orderstable orders={data}></Orderstable>
    </div>
  );
}
