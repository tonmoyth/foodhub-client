"use client";

import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meals = [
  {
    name: "Cheese Burger",
    price: "৳180",
    rating: 4.8,
    category: "Burger",
  },
  {
    name: "Chicken Pizza",
    price: "৳450",
    rating: 4.7,
    category: "Pizza",
  },
  {
    name: "Chocolate Cake",
    price: "৳220",
    rating: 4.9,
    category: "Sweets",
  },
];

export default function PopularMeals() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Popular Meals</h2>
          <p className="mt-3 text-muted-foreground">
            Most ordered meals by our customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal, i) => (
            <motion.div
              key={meal.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 rounded-2xl hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {meal.category}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    {meal.rating}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold">{meal.name}</h3>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {meal.price}
                  </span>
                  <Button size="icon" className="rounded-full">
                    <Plus />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
