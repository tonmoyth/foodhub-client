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
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/meals.action";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategories: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleCreate = async () => {
    const toastId = toast.loading("creating...");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", description);

    const result = await createCategory(formData);
    if (result.success) {
      toast.success("Categories created successfully!", { id: toastId });
      onClose();
      router.refresh();
    } else {
      toast.error("Failed Creation. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCategories;
