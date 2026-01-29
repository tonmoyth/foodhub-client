import { Navbar1 } from "@/components/navbar1";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Navbar1></Navbar1>
      </div>
      <div className=" px-5">{children}</div>
    </div>
  );
}
