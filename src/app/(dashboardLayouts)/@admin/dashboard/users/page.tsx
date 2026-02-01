import { getAllUsers } from "@/actions/meals.action";
import UsersTable from "@/components/modules/dashboard/admin/user.table";

export default async function Page() {
  const users = await getAllUsers();

  return (
    <div>
      <UsersTable users={users.data}></UsersTable>
    </div>
  );
}
