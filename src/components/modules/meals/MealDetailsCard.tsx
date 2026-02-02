"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Flame } from "lucide-react";
import { addToCart } from "@/utils/addToCard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MealDetailsPage({ meal }: { meal: any }) {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8 pt-25">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* IMAGE SECTION */}
        <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[480px] rounded-xl overflow-hidden">
          {meal && (
            <Image
              src={meal.image}
              alt={meal.title || "Meal image"}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              {meal.title}
            </h1>

            <Badge
              className="h-fit"
              variant={meal.is_available ? "default" : "destructive"}
            >
              {meal.is_available ? "Available" : "Unavailable"}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {meal.description}
          </p>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-extrabold text-primary">
              ৳{meal.price}
            </span>

            {/* {meal.discount_price && (
              <span className="text-muted-foreground line-through text-lg">
                ৳{meal.price}
              </span>
            )} */}
          </div>

          {/* Meta */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>⏱ Prep: {meal.prep_time_minute} min</span>
            <span>🔥 Freshly made</span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            <Button
              onClick={() => {
                const res = addToCart({
                  id: meal.id,
                  title: meal.title,
                  price: meal.price,
                  image: meal.image,
                  providerProfileId: meal.providerProfileId,
                });
                if (res?.success === false) {
                  return toast.error(res?.message);
                }

                toast.success("Added to cart 🛒");
                router.push("/dashboard/cart");
              }}
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={!meal.is_available}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>

            {/* <Button size="lg" className="gap-2" disabled={!meal.is_available}>
              <Flame size={18} />
              Order Now
            </Button> */}
          </div>
        </div>
      </div>

      <Card className="mt-10 shadow-none border-none  p-6 flex items-center justify-center gap-4">
        <div className="w-1/3 border p-5 shadow-md rounded-md space-y-2">
          <h1 className="font-semibold text-lg text-center mb-2">
            {" "}
            Resturent Name
          </h1>
          <h3 className="font-semibold text-lg">
            {meal.providerProfile.res_name}
          </h3>
          <p className="text-sm text-muted-foreground">
            📍 {meal.providerProfile.address}, {meal.providerProfile.city}
          </p>
          <p className="text-sm">📞 {meal.providerProfile.phone}</p>
        </div>

        {/* <Button variant="ghost">View Restaurant</Button> */}
      </Card>
    </div>
  );
}
