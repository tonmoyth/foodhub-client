import { getCurrentUser } from "@/actions/meals.action";
import { Navbar1 } from "@/components/navbar1";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentUser();

  return (
    <div>
      <div>
        <Navbar1 user={session?.user}></Navbar1>
      </div>
      <div>{children}</div>
    </div>
  );
}
