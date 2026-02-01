"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import CreateCategories from "./create.categories.modal";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import UpdateCategoriesModal from "./update.categories.modal";

export interface Category {
  id: string;
  name: string;
  iamge?: string;
  created_at: string;
  updated_at: string;
}

const ManageCategories = (items: any) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [catId, setCatId] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Category deleted successfully");
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (id: string, code: string) => {
    setUpdateOpen(true);
    setCode(code);
    setCatId(id);
  };

  return (
    <div className="p-6">
      {/* Header + Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button onClick={() => setModalOpen(true)}>Create Category</Button>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <p>Loading categories...</p>
      ) : items.item.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items?.item?.map((category: any) => (
            <Card key={category.id} className="border">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{category.cat_code}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(category.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Updated: {new Date(category.updated_at).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(category.id, category.cat_code)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div>
        <UpdateCategoriesModal
          isOpen={updateOpen}
          category={items}
          category_code={code}
          cat_id={catId}
          onClose={() => setUpdateOpen(false)}
        />
      </div>
      <CreateCategories
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ManageCategories;
