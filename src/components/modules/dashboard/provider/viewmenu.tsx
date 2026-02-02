import MenuCard from "./viewmanu.card";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number;
  categoriesId: string;
  image: string;
  is_available: boolean;
  prep_time_minute: string;
  providerProfileId: string;
}

export default function Viewmanu({
  items,
  categories,
}: {
  items: Meal[];
  categories: any;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Menu Items</h1>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <p className="text-muted-foreground">No menu items found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MenuCard categories={categories} key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
