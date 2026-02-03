"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { getCart } from "@/utils/addToCard";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/actions/meals.action";

/* ---------------- ZOD SCHEMA ---------------- */
const checkoutSchema = z.object({
  customerName: z.string().min(3, "Full name must be at least 3 characters"),
  customerPhone: z.string().min(11, "Phone number must be at least 11 digits"),
  deliveryAddress: z.string().min(10, "Address must be at least 10 characters"),
});

export default function CheckoutPage() {
  const [cart, setCartState] = useState<any[]>([]);
  const route = useRouter();

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const form = useForm({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      deliveryAddress: "",
    },
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      const taosId = toast.loading("loading...");
      const orderPayload = {
        customerName: value.customerName,
        customerPhone: value.customerPhone,
        deliveryAddress: value.deliveryAddress,
        mealsId: cart[0].id,
        providerProfileId: cart[0].providerProfileId,
        totalAmount: subtotal,
      };

      const formData = new FormData();
      formData.append("customerName", orderPayload.customerName);
      formData.append("customerPhone", orderPayload.customerPhone);
      formData.append("deliveryAddress", orderPayload.deliveryAddress);
      formData.append("mealsId", orderPayload.mealsId);
      formData.append("providerProfileId", orderPayload.providerProfileId);
      formData.append("totalAmount", orderPayload.totalAmount.toString());

      const result = await placeOrder(formData);
      if (result.success) {
        toast.success("Order placed successfully!", { id: taosId });
        localStorage.clear();
        route.refresh();
        form.reset();
      } else {
        toast.error(result.message || "Something went wrong", { id: taosId });
      }
    },
  });

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: ORDER SUMMARY */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">৳{item.price * item.quantity}</p>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>৳{subtotal}</span>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: DELIVERY DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              id="order-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                {/* FULL NAME */}
                <form.Field name="customerName">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Full Name</FieldLabel>
                        <Input
                          type="text"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Full Name"
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* PHONE */}
                <form.Field name="customerPhone">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Phone Number</FieldLabel>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Phone Number"
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* ADDRESS */}
                <form.Field name="deliveryAddress">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Delivery Address</FieldLabel>
                        <Textarea
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="House #, Street, City"
                          rows={4}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* PAYMENT METHOD */}
              <div className="rounded-lg border p-3 text-sm mt-4">
                <p className="font-medium">Payment Method</p>
                <p className="text-muted-foreground">Cash on Delivery</p>
              </div>

              {/* SUBMIT */}
              <CardFooter className="px-0 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!form.state.canSubmit}
                >
                  Place Order
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
