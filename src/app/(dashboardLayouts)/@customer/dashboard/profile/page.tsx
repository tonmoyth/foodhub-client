import { getCurrentUser } from "@/actions/meals.action";
import ManageProfilePage from "@/components/modules/dashboard/customers/profile";
import CustomerProfilePage from "@/components/modules/dashboard/customers/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import userService from "@/services/user.service";

export default async function Page() {
  // const user = {
  //   name: "Nurislam Hasan Tonmoy",
  //   email: "tonmoynht1930@gmail.com",
  //   image: "https://i.pravatar.cc/150",
  //   role: "CUSTOMER",
  //   status: "ACTIVATE",
  // };

  const session = await userService.getSession();
  const user = session.user;

  return (
    <div>
      <div className="container mx-auto max-w-4xl py-8 space-y-6 ">
        <h1 className="text-2xl font-semibold">Manage Profile</h1>

        <Card>
          <CardContent className="flex flex-col sm:flex-row gap-6 p-6 items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>

              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{user.role}</Badge>
                <Badge>{user.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ManageProfilePage user={user}></ManageProfilePage>
    </div>
  );
}
