import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function ProviderCard({ provider }: any) {
  return (
    <Link href={`providers/${provider?.id}`}>
      <Card className="hover:shadow-xl transition-transform transform hover:scale-101 cursor-pointer rounded-2xl border-none overflow-hidden mb-5">
        <CardContent className="p-4 flex gap-4 items-center">
          {provider?.logo_image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0">
              <Image
                src={provider.logo_image}
                alt={provider.res_name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-white font-bold">
              {provider?.res_name?.charAt(0) || "P"}
            </div>
          )}

          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-md">
              {provider?.res_name}
            </p>
            <p className="text-sm text-green-800">{provider?.city}</p>
            <p
              className={`text-xs font-medium mt-1 ${
                provider?.isOpen ? "text-green-600" : "text-red-500"
              }`}
            >
              {provider?.isOpen ? "Open Now" : "Closed"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
