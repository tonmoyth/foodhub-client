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
                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel>Profile Image URL</FieldLabel>
                      <Input
                        value={field?.state?.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <FieldDescription>
                        Paste a public image URL
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
