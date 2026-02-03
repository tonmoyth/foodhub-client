import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import HeroBgImage from "../../../../public/foodhub-hero-image.jpg";
import Image from "next/image";
import Link from "next/link";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  className?: string;
}

const Hero7 = ({
  heading = "Delicious Meals, Delivered to Your Doorstep",
  description = "Explore a wide variety of fresh and tasty meals from your favorite local restaurants. Order easily, track your food, and enjoy fast delivery with FoodHub.",
  button = {
    text: "Discover all Meals",
    url: "/meals",
  },
  className,
}: Hero7Props) => {
  return (
    <section className={cn("relative py-32 min-h-[100vh]", className)}>
      {/* Background Image */}
      <Image
        src={HeroBgImage}
        alt="Food background"
        fill
        priority
        className="object-cover -z-10 filter brightness-75"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 -z-10" />

      {/* Content */}
      <div className="container mx-auto p-5 flex items-center justify-center min-h-[70vh] relative text-center">
        <div className="flex flex-col items-center justify-center gap-6 max-w-4xl">
          <h1 className="text-3xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-gray-200 lg:text-lg drop-shadow-md">
            {description}
          </p>

          <Button
            asChild
            size="lg"
            className="mt-6 bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-full text-lg shadow-xl transition-transform transform hover:scale-105"
          >
            <Link href={button.url}>{button.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
