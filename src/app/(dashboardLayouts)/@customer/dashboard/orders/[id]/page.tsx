import OrderDetailsPage from "@/components/modules/dashboard/customers/OrderDetailsPage";
import ordersServices from "@/services/orders.sevices";
import userService from "@/services/user.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await ordersServices.getSingleOrder(id);
  const session = await userService.getSession();

  return (
    <div>
      <OrderDetailsPage order={data.data}></OrderDetailsPage>
    </div>
  );
}
