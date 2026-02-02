"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { env } from "@/env";

// /* ---------------- Zod Schema ---------------- */
// const providerSchema = z.object({
//   res_name: z.string().min(3, "Restaurant name must be at least 3 characters"),
//   address: z.string().min(5, "Address must be at least 5 characters"),
//   phone: z.string().min(10, "Phone number is required"),
//   description: z.string().optional(),
//   city: z.string().min(2, "City is required"),
// });

export function UpdateProviderForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      res_name: "",
      address: "",
      phone: "",
      description: "",
      city: "",
    },
    // validators: {
    //   onSubmit: providerSchema,
    // },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating provider...");
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/providers`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(value),
          },
        );

        if (!response.ok) throw new Error("Failed to update provider");

        toast.success("Provider updated successfully!", { id: toastId });
        router.refresh();
      } catch (err) {
        console.error(err);
        toast.error("Failed to update provider. Try again.", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-2xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>Update Provider Profile</CardTitle>
        <CardDescription>Update your restaurant details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="provider-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Restaurant Name */}
            <form.Field
              name="res_name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Restaurant Name
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Address */}
            <form.Field
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Phone */}
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                  />
                </Field>
              )}
            />

            {/* City */}
            <form.Field
              name="city"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            {/* <form.Field
              name="imge"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>image</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            /> */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="provider-form">
          Update Provider
        </Button>
      </CardFooter>
    </Card>
  );
}
