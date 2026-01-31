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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

/* ---------------- Zod Schema ---------------- */
const mealSchema = z.object({
  title: z.string().min(5, "Meal title must be at least 5 characters").max(50),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(200),
  price: z.number().min(1, "Price must be greater than 0"),
  discount_price: z.number().min(0, "Discount cannot be negative"),
  categoriesId: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid image URL"),
  is_available: z.boolean(),
  prep_time_minute: z.string().min(1, "Prep time is required"),
  providerProfileId: z.string().uuid(),
});

/* ---------------- Component ---------------- */
export function CreateMealForm({ categoriesData, providerData }: any) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount_price: 0,
      categoriesId: "",
      image: "",
      is_available: true,
      prep_time_minute: "20",
      providerProfileId: providerData.data.id,
    },
    validators: {
      onSubmit: mealSchema,
    },
    onSubmit: async ({ value }) => {
      if (!providerData.data) {
        return router.push("/dashboard/makeProvider");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/provider/meals`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(value),
          },
        );

        if (!response.ok) throw new Error("Failed to submit review");

        toast.success("Meal creation successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed meal creation. Try again.");
      }
      form.reset();
    },
  });

  return (
    <Card className="w-full sm:max-w-2xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>Create Meal</CardTitle>
        <CardDescription>
          Fill in the details to add a new meal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="meal-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Title */}
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Meal Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Japani Food"
                      autoComplete="off"
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
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="This is a delicious Japanese meal..."
                        rows={4}
                        className="min-h-24 resize-none"
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/200 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Price & Discount */}
            <div className="flex gap-4">
              <form.Field
                name="price"
                children={(field) => (
                  <div className="flex-1">
                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {field.state.meta.errors?.length > 0 && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                )}
              />
              <form.Field
                name="discount_price"
                children={(field) => (
                  <div className="flex-1">
                    <FieldLabel htmlFor={field.name}>Discount Price</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {field.state.meta.errors?.length > 0 && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                )}
              />
            </div>

            {/* Category */}
            <form.Field
              name="categoriesId"
              children={(field) => (
                <div>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Select
                    onValueChange={field.handleChange}
                    value={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesData?.data.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors?.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              )}
            />

            {/* Image URL */}
            <form.Field
              name="image"
              children={(field) => (
                <div>
                  <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              )}
            />

            {/* Availability & Prep Time */}
            <div className="flex gap-4 items-center">
              <form.Field
                name="is_available"
                children={(field) => (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.state.value}
                      onCheckedChange={field.handleChange}
                    />
                    <FieldLabel>Available</FieldLabel>
                  </div>
                )}
              />
              <form.Field
                name="prep_time_minute"
                children={(field) => (
                  <div className="flex-1">
                    <FieldLabel htmlFor={field.name}>
                      Prep Time (minutes)
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="meal-form">
            Create Meal
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
