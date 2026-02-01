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
  console.log(item);

  const hasDiscount = !!item.discount_price;
  const finalPrice = hasDiscount
    ? item.price - item.discount_price!
    : item.price;

  const router = useRouter();

  const handleDelete = async (id: string) => {
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
    <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />

        {/* Availability */}
        <Badge
          className={`absolute top-3 left-3 text-xs ${
            item.is_available ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {item.is_available ? "Available" : "Unavailable"}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-base font-semibold line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Price + Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">৳{finalPrice}</span>
            {hasDiscount && (
              <span className="text-sm line-through text-muted-foreground">
                ৳{item.price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-4 w-4" />
            {item.prep_time_minute} min
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            variant="outline"
            className="w-full"
          >
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            onClick={() => handleDelete(item.id)}
            size="sm"
            variant="destructive"
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>

        <UpdateMealModal
          isOpen={open}
          onClose={() => setOpen(false)}
          meal={item}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
}
