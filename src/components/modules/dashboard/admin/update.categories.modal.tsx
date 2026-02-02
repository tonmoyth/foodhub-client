"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
  cat_id: string;
  category_code: string;
}

const UpdateCategoriesModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  category,
  cat_id,
  category_code,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const UpdateCategories = async () => {
    const toastId = toast.loading("Updating category...");
    const updatedCategory = {
      name,
      slug: description,
    };

    try {
      //   const res = await fetch(
      //     `${env.NEXT_PUBLIC_API_URL}/api/categories/${cat_id}`,
      //     {
      //       credentials: "include",
      //     },
      //   );

      //   if (!res.ok) throw new Error("Failed to fetch category");

      //   const categoryData = await res.json();

      //   if (categoryData.data.cat_code === category_code) {
      //     toast.error("This code already exists.", { id: toastId });
      //     return;
      //   }

      const patchRes = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/categories/${cat_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedCategory),
        },
      );

      if (!patchRes.ok) throw new Error("Failed to update category");

      toast.success("Category updated successfully!", { id: toastId });
      onClose();
      router.refresh();
    } catch (err) {
      toast.error("Failed to update. Try again.", { id: toastId });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>update Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Category Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={UpdateCategories}>
            Update
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateCategoriesModal;
