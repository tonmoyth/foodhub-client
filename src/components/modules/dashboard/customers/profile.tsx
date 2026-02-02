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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Required"),
    newPassword: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/* ---------------- COMPONENT ---------------- */

export default function ManageCustomerProfile({ user }: any) {
  const router = useRouter();
  const profileForm = useForm({
    defaultValues: {
      name: user.name,
      image: user.image,
    },

    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");

      try {
        const { data, error } = await authClient.updateUser(value);

        if (data?.status) {
          toast.success("Profile updated successfully", { id: toastId });
          router.refresh();
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to update profile", {
          id: toastId,
        });
      }
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: passwordSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating password...");

      try {
        const { data, error } = await authClient.changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: true,
        });

        if (error) {
          toast.error(error?.message || "Failed to update password", {
            id: toastId,
          });
          return;
        }

        toast.success("Password updated successfully", { id: toastId });

        passwordForm.reset();
      } catch (err: any) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <div className="container mx-auto max-w-4xl py-8 space-y-6">
      {/* -------- EDIT PROFILE -------- */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your basic information</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              profileForm.handleSubmit();
            }}
          >
            <FieldGroup>
              <profileForm.Field
                name="name"
                children={(field) => {
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel>Full Name</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {invalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <profileForm.Field
                name="image"
                children={(field) => {
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const handleImageUpload = async (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                      const res = await fetch(
                        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                        {
                          method: "POST",
                          body: formData,
                        },
                      );

                      const data = await res.json();

                      if (data.success) {
                        field.handleChange(data.data.display_url);
                      }
                    } catch (error) {
                      console.error("Image upload failed", error);
                    }
                  };

                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel>Profile Image</FieldLabel>

                      {/* File input */}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />

                      {/* Preview */}
                      {field.state.value && (
                        <img
                          src={field.state.value}
                          alt="Preview"
                          className="mt-2 h-24 w-24 rounded-full object-cover border"
                        />
                      )}

                      <FieldDescription>
                        Upload an image (ImgBB)
                      </FieldDescription>

                      {invalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={() => profileForm.handleSubmit()}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* -------- UPDATE PASSWORD -------- */}
      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Change your account password</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              passwordForm.handleSubmit();
            }}
          >
            <FieldGroup>
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (name) => (
                  <passwordForm.Field
                    key={name}
                    name={name as any}
                    children={(field) => {
                      const invalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={invalid}>
                          <FieldLabel>
                            {name === "currentPassword"
                              ? "Current Password"
                              : name === "newPassword"
                                ? "New Password"
                                : "Confirm Password"}
                          </FieldLabel>
                          <Input
                            type="password"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                          />
                          {invalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                ),
              )}
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button onClick={() => passwordForm.handleSubmit()}>
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
