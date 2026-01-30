import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function ProviderCard({ provider }: any) {
  return (
    <Card className="hover:shadow-md cursor-pointer">
      <CardContent className="p-4 flex gap-3 items-center">
        <Image
          src={provider.logo_image}
          alt={provider.res_name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-medium">{provider.res_name}</p>
          <p className="text-sm text-muted-foreground">{provider.city}</p>
          <p
            className={`text-xs ${
              provider.isOpen ? "text-green-600" : "text-red-500"
            }`}
          >
            {provider.isOpen ? "Open Now" : "Closed"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
