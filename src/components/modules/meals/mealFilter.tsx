"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function MealFilter({ category }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [price, setPrice] = useState<number>(1000);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("categoriesId", value);

    router.push(`?${params.toString()}`);
  };

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Filter Meals</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* categories */}
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>

          <SelectContent>
            {category?.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price */}
        <div>
          <p className="font-medium mb-2">Max Price: ৳{price}</p>
          <Slider
            max={2000}
            step={50}
            value={[price]}
            onValueChange={(v) => {
              setPrice(v[0]);
              updateParams("maxPrice", v[0].toString());
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
