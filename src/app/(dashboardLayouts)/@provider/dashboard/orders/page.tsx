import {
  getOrdersForProvider,
  getSignleProvider,
} from "@/actions/meals.action";
import OrdersTable from "@/components/modules/dashboard/provider/orders.table";

export default async function Page() {
  const { data } = await getSignleProvider();
  const incommingOrders = await getOrdersForProvider(data.id);

  return (
    <div>
      <OrdersTable orders={incommingOrders.data}></OrdersTable>
    </div>
  );
}
