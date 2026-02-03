"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProviderDetailsPage({ providersData }: any) {
  return (
    <div className="container mx-auto max-w-7xl py-8 space-y-8">
      {/* Provider Header */}
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-6 p-6">
          <Avatar className="h-28 w-28">
            <AvatarImage src={providersData.logo_image || ""} />
            <AvatarFallback>{providersData?.res_name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">
                {providersData?.res_name}
              </h1>
              <Badge
                variant={providersData?.isOpen ? "default" : "destructive"}
              >
                {providersData?.isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>

            <p className="text-muted-foreground">
              {providersData?.description}
            </p>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>📍 {providersData?.address}</p>
              <p>📞 {providersData?.phone}</p>
              <p>🏙️ {providersData?.city}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>

        {providersData?.meals.length === 0 ? (
          <p className="text-muted-foreground">No meals available right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {providersData?.meals.map((meal: any) => (
              <Card key={meal?.id} className="overflow-hidden">
                <img
                  src={meal?.image}
                  alt={meal?.title}
                  className="h-48 w-full object-cover"
                />

                <CardHeader>
                  <CardTitle className="text-lg">{meal?.title}</CardTitle>
                  <CardDescription>{meal?.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">
                        ৳{meal?.discount_price}
                      </p>
                      <p className="text-sm line-through text-muted-foreground">
                        ৳{meal?.price}
                      </p>
                    </div>

                    <Badge
                      variant={meal?.is_available ? "secondary" : "destructive"}
                    >
                      {meal?.is_available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    ⏱ Prep time: {meal?.prep_time_minute} min
                  </p>

                  <Button className="w-full" disabled={!meal?.is_available}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
