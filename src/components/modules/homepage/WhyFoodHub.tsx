"use client";

import { motion } from "framer-motion";
import { Truck, Store, ShieldCheck, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Fast Delivery",
    desc: "Quick and reliable delivery from nearby food providers.",
    icon: Truck,
  },
  {
    title: "Trusted Providers",
    desc: "Verified restaurants and kitchens you can rely on.",
    icon: Store,
  },
  {
    title: "Easy Ordering",
    desc: "A smooth and simple ordering experience for everyone.",
    icon: ShieldCheck,
  },
  {
    title: "Live Tracking",
    desc: "Track your order from kitchen to your doorstep.",
    icon: MapPin,
  },
];

export default function WhyFoodHub() {
  return (
    <section className="py-28 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Why choose FoodHub
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Built to make food ordering simple, fast, and trustworthy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
