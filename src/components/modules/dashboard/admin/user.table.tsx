"use client";

import { toast } from "sonner";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { ROLE } from "@/constent/role";
import { env } from "@/env";
import { useRouter } from "next/navigation";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusToggle = async (user: User) => {
    const newStatus = user.status === "ACTIVATE" ? "SUSPEND" : "ACTIVATE";

    setLoadingId(user.id);

    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/admin/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      toast.success(
        `User ${newStatus === "ACTIVATE" ? "activated" : "suspended"}`,
      );
      router.refresh();
    } catch {
      toast.error("Failed to update user status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <table className="w-full border text-sm">
      <thead className="bg-muted">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {users
          .filter((user) => user.role !== ROLE.admin)
          .map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>

              {/* Status Badge */}
              <td className="p-3">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    user.status === "ACTIVATE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* Action */}
              <td className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loadingId === user.id || user.role === "ADMIN"}
                    >
                      Action
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {user.status === "ACTIVATE" ? (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleStatusToggle(user)}
                      >
                        Suspend
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className="text-green-600"
                        onClick={() => handleStatusToggle(user)}
                      >
                        Activate
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
