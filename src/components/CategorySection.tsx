import type { Item } from "../types";
import ItemCard from "./ItemCard";

interface CategorySectionProps {
  title: string;
  items: Item[];
  description?: string;
}

export default function CategorySection({ title, items, description }: CategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-accent-orange mb-2">{title}</h2>
        {description && <p className="text-gray-400">{description}</p>}
        <div className="text-gray-500 text-sm mt-1">{items.length} items</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <ItemCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
}
