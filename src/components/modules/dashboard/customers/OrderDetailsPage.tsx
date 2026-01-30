"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ReviewModal from "./ReviewModal";

interface Provider {
  id: string;
  res_name: string;
  address: string;
  phone: string;
  logo_image: string;
}

interface OrderDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  totalAmount: number;
  status: "PENDING" | "PREPARING" | "READY" | "DELIVERED";
  created_at: string;
  updated_at: string;
  mealsId: string;
  provider: Provider;
}

interface OrderDetailsPageProps {
  order: OrderDetails;
}

const statusSteps = ["PENDING", "PREPARING", "READY", "DELIVERED"];

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ order }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Provider Info */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader className="px-4 pt-4 flex items-center gap-4">
          <Image
            src={order?.provider?.logo_image}
            alt={order.provider.res_name}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <CardTitle>{order.provider.res_name}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2 text-sm text-muted-foreground">
          <p>Address: {order.provider.address}</p>
          <p>Phone: {order.provider.phone}</p>
        </CardContent>
      </Card>

      {/* Customer & Delivery Info */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Delivery Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Customer:</span> {order.customerName}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {order.customerPhone}
          </p>
          <p>
            <span className="font-medium">Delivery Address:</span>{" "}
            {order.deliveryAddress}
          </p>
          <p>
            <span className="font-medium">Payment Method:</span>{" "}
            {order.paymentMethod.replaceAll("_", " ")}
          </p>
          <p>
            <span className="font-medium">Total Amount:</span> ৳
            {order.totalAmount}
          </p>
        </CardContent>
      </Card>

      {/* Track Order Status */}
      <Card className="shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle>Track Order Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            {statusSteps.map((step, idx) => {
              const completed = idx <= currentStepIndex;
              return (
                <div key={step} className="flex-1 text-center relative">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center ${
                      completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-xs mt-1">{step.replaceAll("_", " ")}</p>
                  {idx !== statusSteps.length - 1 && (
                    <div
                      className={`absolute top-3 left-1/2 w-full h-1 -translate-x-1/2 ${
                        idx < currentStepIndex ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => setIsReviewOpen(true)}
          disabled={order.status !== "DELIVERED"}
          className="w-full sm:w-1/2"
        >
          Review
        </Button>
        <Button className="w-full sm:w-1/2" variant="outline">
          Contact Provider
        </Button>
        <ReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          mealId={order.mealsId}
          orderId={order.id}
        />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
