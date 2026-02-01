"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  totalAmount: number;
  status: "PENDING" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  created_at: string;
  updated_at: string;
}

interface OrdersTableProps {
  orders: Order[];
  onStatusChange?: (orderId: string, status: Order["status"]) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const router = useRouter();
  //   const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"],
  ) => {
    const taostId = toast.loading("updating status...");
    // setUpdatingId(orderId);
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/provider/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (!res.ok) throw new Error("Failed to update status");
      toast.success("Status updated successfully!", { id: taostId });
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update status");
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerPhone}</TableCell>
              <TableCell>{order.deliveryAddress}</TableCell>
              <TableCell>${order.totalAmount}</TableCell>

              <TableCell>
                {new Date(order.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) =>
                    handleStatusChange(order.id, value as Order["status"])
                  }
                  //   disabled={updatingId === order.id}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="PREPARING">PREPARING</SelectItem>
                    <SelectItem value="READY">READY</SelectItem>
                    <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
