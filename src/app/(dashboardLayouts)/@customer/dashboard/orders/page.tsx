import MyOrdersPage from "@/components/modules/dashboard/customers/MyOrdersPage";
import ordersServices from "@/services/orders.sevices";

export default async function Page() {
  const { data } = await ordersServices.getUserOrders();

  return (
    <div>
      <MyOrdersPage orders={data}></MyOrdersPage>
    </div>
  );
}
