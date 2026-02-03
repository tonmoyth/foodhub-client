"use client";

import { Truck, Store, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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

export default function FeaturesSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          How FoodHub Makes Life Easier
        </h2>

        <div className="space-y-20">
          {features.map((item, i) => {
            const Icon = item.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Text */}
                <div className="md:w-1/2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Icon className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>

                {/* Placeholder illustration / abstract shape */}
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                  <div className="w-48 h-48 bg-green-200 rounded-full opacity-50"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
