"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Pencil, Trash2 } from "lucide-react";
import { env } from "@/env";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateMealModal from "./updateMealForm";
import Swal from "sweetalert2";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number;
  categoriesId: string;
  providerProfileId: string;
  image: string;
  is_available: boolean;
  prep_time_minute: string;
}
export default function MenuCard({
  item,
  categories,
}: {
  item: MenuItem;
  categories: any;
}) {
  const [open, setOpen] = useState(false);

  const hasDiscount = !!item.discount_price;
  const finalPrice = hasDiscount
    ? item.price - item.discount_price!
    : item.price;

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This menu item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const toastId = toast.loading("Deleting menu item...");

    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/provider/meals/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Menu item deleted successfully", {
        id: toastId,
      });

      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <Card className="rounded-3xl flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Availability Badge */}
          <Badge
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow ${
              item.is_available
                ? "bg-green-800 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {item.is_available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="p-5 space-y-4 bg-gradient-to-b from-white to-gray-50">
          {/* Title + Description */}
          <div>
            <h3 className="text-lg font-bold line-clamp-1 text-gray-900">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>

          {/* Price + Time */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-green-800">
              ৳{finalPrice}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-4 w-4" />
              {item.prep_time_minute} min
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              variant="outline"
              className="flex-1 bg-white hover:bg-indigo-50 border-green-800 text-green-800 font-medium shadow-sm hover:shadow-md transition"
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>

            <Button
              onClick={() => handleDelete(item.id)}
              size="sm"
              variant="destructive"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md transition"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Update Modal */}
      <UpdateMealModal
        isOpen={open}
        onClose={() => setOpen(false)}
        meal={item}
        categories={categories}
      />
    </div>
  );
}
