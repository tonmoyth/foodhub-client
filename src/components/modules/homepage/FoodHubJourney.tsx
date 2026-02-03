"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Coffee, Clock, Smile } from "lucide-react";

const journey = [
  {
    title: "Place Order",
    icon: ShoppingCart,
    desc: "Choose your favorite meals easily.",
  },
  {
    title: "Preparation",
    icon: Coffee,
    desc: "Our providers cook with love and care.",
  },
  {
    title: "Fast Delivery",
    icon: Clock,
    desc: "Reach your doorstep quickly and hot.",
  },
  {
    title: "Enjoy Meal",
    icon: Smile,
    desc: "Savor delicious food in comfort.",
  },
];

export default function FoodHubJourney() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Abstract background shapes */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold  tracking-tight">
            The FoodHub Journey
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From your first click to the last bite, we ensure a seamless,
            delightful experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {journey.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4 text-3xl shadow-lg">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
