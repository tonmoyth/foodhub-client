"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { env } from "@/env";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number;
  categoriesId: string;
  image: string;
  is_available: boolean;
  prep_time_minute: string;
  providerProfileId: string;
}

interface UpdateMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal;
  onUpdated?: () => void;
  categories: any;
}

const formSchema = z.object({
  title: z.string().min(3).max(32),
  description: z.string().min(10).max(200),
  price: z.number().min(1),
  discount_price: z.number().min(0),
  categoriesId: z.string().min(1),
  image: z.string(),
  is_available: z.boolean(),
  prep_time_minute: z.string().min(1),
});

const UpdateMealModal: React.FC<UpdateMealModalProps> = ({
  isOpen,
  onClose,
  meal,
  onUpdated,
  categories,
}) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: meal.title,
      description: meal.description,
      price: meal.price,
      discount_price: meal.discount_price,
      categoriesId: meal.categoriesId,
      image: meal.image,
      is_available: meal.is_available,
      prep_time_minute: meal.prep_time_minute,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating meal...");
      try {
        const res = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/providers/single`,
          {
            credentials: "include",
          },
        );

        const { data } = await res.json();

        const updateData = {
          ...value,
          providerProfileId: data.id,
        };

        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/provider/meals/${meal.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updateData),
          },
        );

        if (!response.ok) throw new Error("Failed to update meal");

        toast.success("Meal updated successfully", { id: toastId });
        router.refresh();
        onClose();
      } catch (error: any) {
        toast.error(error.message || "Something went wrong", { id: toastId });
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <CardTitle>Update Meal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            id="update-meal-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
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
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
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
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          rows={4}
                          className="min-h-24 resize-none"
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText>
                            {field.state.value.length}/200
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

              {/* Price */}
              <form.Field
                name="price"
                children={(field) => (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              />

              {/* Discount Price */}
              <form.Field
                name="discount_price"
                children={(field) => (
                  <Field>
                    <FieldLabel>Discount Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              />

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
                        {categories?.data.map((cat: any) => (
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
                  <Field>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              {/* Availability */}
              <form.Field
                name="is_available"
                children={(field) => (
                  <Field className="flex items-center gap-2">
                    <FieldLabel>Available</FieldLabel>
                    <Switch
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(checked)}
                    />
                  </Field>
                )}
              />

              {/* Prep Time */}
              <form.Field
                name="prep_time_minute"
                children={(field) => (
                  <Field>
                    <FieldLabel>Prep Time (minutes)</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <div className="flex gap-2 mt-4">
          <Button className="flex-1" onClick={() => form.handleSubmit()}>
            Update
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateMealModal;
