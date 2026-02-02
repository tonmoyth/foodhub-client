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
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
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
  // reviews = {
  //   count: 200,
  //   rating: 5.0,
  //   avatars: [
  //     {
  //       src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  //       alt: "Avatar 1",
  //     },
  //     {
  //       src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
  //       alt: "Avatar 2",
  //     },
  //     {
  //       src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
  //       alt: "Avatar 3",
  //     },
  //     {
  //       src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
  //       alt: "Avatar 4",
  //     },
  //     {
  //       src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
  //       alt: "Avatar 5",
  //     },
  //   ],
  // },
  className,
}: Hero7Props) => {
  return (
    <section className={cn("relative py-32 min-h-[100vh]", className)}>
      {/* Background Image */}
      <Image
        src={HeroBgImage} // public/hero-bg.jpg
        alt="Food background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Content */}
      <div className="container mx-auto p-5 flex items-center justify-center min-h-[70vh] relative text-center">
        <div className="flex flex-col items-center justify-center gap-6 max-w-5xl">
          <h1 className="text-3xl lg:text-6xl font-semibold text-white">
            {heading}
          </h1>
          <p className="text-gray-200 lg:text-lg">{description}</p>

          <Button
            asChild
            size="lg"
            className="mt-6 bg-yellow-300 text-black hover:bg-yellow-200"
          >
            <Link href={button.url}>{button.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
