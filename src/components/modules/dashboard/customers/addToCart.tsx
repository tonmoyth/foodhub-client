"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCart, setCart } from "@/utils/addToCard";

export default function CartPage() {
  const [cart, setCartState] = useState<any[]>([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    setCartState(updated);
  };

  if (!cart.length) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Cart is empty 😢
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-white border border-gray-100"
        >
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-lg text-gray-900">
              {item.title}
            </h4>
            <p className="text-yellow-600 font-bold text-md">৳{item.price}</p>
            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
          </div>

          <Button
            variant="destructive"
            className="flex-shrink-0 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
