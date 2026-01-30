import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function MealCard({ meal }: any) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <Image
        src={meal.image}
        alt={meal.title}
        width={400}
        height={250}
        className="h-40 w-full object-cover"
      />

      <CardContent className="p-4 space-y-1">
        <h4 className="font-semibold">{meal.title}</h4>

        <p className="text-sm text-muted-foreground">
          {meal.providerProfile.res_name}
        </p>

        <div className="flex justify-between items-center">
          <p className="font-bold text-primary">৳{meal.price}</p>

          {meal.discount_price && (
            <p className="text-sm line-through text-muted-foreground">
              ৳{meal.price}
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Prep: {meal.prep_time_minute} min
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="w-full">
          <Link href={`meals/${meal.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
