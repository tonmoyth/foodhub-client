import { getProviderwithMenu } from "@/actions/meals.action";
import ProviderDetailsPage from "@/components/modules/provider/providerDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProviderwithMenu(id);

  return (
    <div className="pt-25">
      <ProviderDetailsPage providersData={data?.data[0]}></ProviderDetailsPage>
    </div>
  );
}
