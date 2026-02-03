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
      <Card className="rounded-2xl shadow-lg overflow-hidden border-none">
        <CardContent className="flex flex-col md:flex-row gap-6 p-6">
          <Avatar className="h-28 w-28 shadow-lg">
            <AvatarImage src={providersData.logo_image || ""} />
            <AvatarFallback>{providersData?.res_name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {providersData?.res_name}
              </h1>
              <Badge
                variant={providersData?.isOpen ? "default" : "destructive"}
                className="text-sm px-3 py-1"
              >
                {providersData?.isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>

            <p className="text-gray-700">{providersData?.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>📍 {providersData?.address}</p>
              <p>📞 {providersData?.phone}</p>
              <p>🏙️ {providersData?.city}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Menu Items</h2>

        {providersData?.meals.length === 0 ? (
          <p className="text-gray-500">No meals available right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {providersData?.meals.map((meal: any) => (
              <Card
                key={meal?.id}
                className="overflow-hidden rounded-2xl shadow-lg border-none hover:shadow-2xl transition-transform transform "
              >
                {/* Image with gradient overlay */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={meal?.image}
                    alt={meal?.title}
                    className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <CardHeader className="px-4 pt-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {meal?.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {meal?.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-4 pb-4 pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-yellow-600">
                        ৳{meal?.price}
                      </p>
                      <p className="text-sm  text-gray-400">
                        Discount :{meal.discount_price}
                      </p>
                    </div>

                    <Badge
                      variant={meal?.is_available ? "secondary" : "destructive"}
                      className="text-sm px-2 py-1"
                    >
                      {meal?.is_available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">
                    ⏱ Prep time: {meal?.prep_time_minute} min
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
