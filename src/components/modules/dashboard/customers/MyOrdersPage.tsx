"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  totalAmount: number;
  status: "PENDING" | "PREPARING" | "READY" | "DELIVERED";
  created_at: string;
  updated_at: string;
  providerProfileId: string;
  mealsId: string;
}

interface MyOrdersProps {
  orders: Order[];
}

const statusSteps = ["PENDING", "PREPARING", "READY", "DELIVERED"];

const MyOrdersPage: React.FC<MyOrdersProps> = ({ orders }) => {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => {
        const currentStepIndex = statusSteps.indexOf(order.status);

        return (
          <Card
            key={order.id}
            className="border shadow-sm hover:shadow-md transition"
          >
            <CardHeader className="px-4 pt-4">
              <CardTitle className="text-lg font-semibold">
                Order #{order.id.substring(0, 6).toUpperCase()}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-4 space-y-4">
              {/* Customer & Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Customer</p>
                  <p>{order.customerName}</p>
                  <p>{order.customerPhone}</p>
                </div>
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p>{order.deliveryAddress}</p>
                </div>
              </div>

              {/* Payment & Total */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <p>Payment: {order.paymentMethod.replaceAll("_", " ")}</p>
                <p className="font-bold">Total: ৳{order.totalAmount}</p>
              </div>

              {/* Track Order Status */}
              <div className="space-y-2">
                <p className="font-medium">Track Order Status</p>
                <div className="flex items-center justify-between gap-2">
                  {statusSteps.map((step, idx) => {
                    const completed = idx <= currentStepIndex;
                    return (
                      <div key={step} className="flex-1 text-center">
                        <div
                          className={`w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center ${
                            completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <p className="text-xs mt-1">
                          {step.replaceAll("_", " ")}
                        </p>
                        {idx !== statusSteps.length - 1 && (
                          <div
                            className={`h-1 w-full mt-2 ${
                              idx < currentStepIndex
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button asChild className="w-full mt-4">
                <Link href={`/dashboard/orders/${order.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MyOrdersPage;
