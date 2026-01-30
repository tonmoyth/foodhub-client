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
    return <p className="text-center mt-20">Cart is empty 😢</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border p-4 rounded-lg"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="rounded"
          />

          <div className="flex-1">
            <h4 className="font-semibold">{item.title}</h4>
            <p>৳{item.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <Button variant="destructive" onClick={() => removeItem(item.id)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
