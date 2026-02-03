import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function MealCard({ meal }: any) {
  return (
    <Card className="overflow-hidden p-0 h-100 relative rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-101 border-none m-0">
      {/* Image with subtle overlay */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={meal.image}
          alt={meal.title}
          width={400}
          height={250}
          className="h-40 w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <CardContent className="p-3 space-y-1 relative z-10">
        <h4 className="font-semibold text-lg text-gray-900">{meal.title}</h4>
        <p className="text-sm text-green-800">
          {meal?.providerProfile?.res_name}
        </p>

        <div className="flex justify-between items-center mt-1">
          <p className="font-bold text-yellow-600 text-lg">৳{meal.price}</p>
        </div>

        <p className="text-xs text-muted-foreground">
          Prep: {meal?.prep_time_minute} min
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-3 pt-0 flex gap-2">
        <Button
          asChild
          className="w-full bg-green-600 text-white hover:bg-green-500 transition-colors"
        >
          <Link href={`meals/${meal.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
