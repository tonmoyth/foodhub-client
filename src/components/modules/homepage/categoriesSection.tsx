"use client";

import { motion } from "framer-motion";
import { Cake, Sandwich, Pizza, CupSoda } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  {
    title: "Sweets",
    desc: "Cakes, desserts & treats",
    icon: Cake,
    gradient: "from-amber-100 to-amber-200",
    iconColor: "text-amber-600",
  },
  {
    title: "Burgers",
    desc: "Juicy burgers & fast food",
    icon: Sandwich,
    gradient: "from-emerald-100 to-emerald-200",
    iconColor: "text-emerald-600",
  },
  {
    title: "Drinks",
    desc: "Cold drinks & beverages",
    icon: CupSoda,
    gradient: "from-lime-100 to-lime-200",
    iconColor: "text-lime-600",
  },
  {
    title: "Pizzas",
    desc: "Hot & cheesy pizzas",
    icon: Pizza,
    gradient: "from-green-100 to-green-200",
    iconColor: "text-green-600",
  },
];

export default function RecipesByCategory() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Browse by Category
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Find your favorite meals faster
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="group relative h-64 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition`}
                  />

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
                      <Icon className={`h-8 w-8 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
