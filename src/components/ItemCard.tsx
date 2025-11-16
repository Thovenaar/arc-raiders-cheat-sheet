import type { Item } from "../types";

interface ItemCardProps {
  item: Item;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    ARC: "bg-purple-600",
    Residential: "bg-blue-600",
    Medical: "bg-green-600",
    Industrial: "bg-yellow-600",
    Security: "bg-red-600",
    Electrical: "bg-cyan-600",
    Mechanical: "bg-orange-600",
    Commercial: "bg-pink-600",
    Technological: "bg-indigo-600",
    Exodus: "bg-teal-600",
    Nature: "bg-lime-600"
  };
  return colors[category] || "bg-gray-600";
};

export default function ItemCard({ item }: ItemCardProps) {
  const getImagePath = (imageName: string) => {
    try {
      return new URL(`../assets/img/${imageName}`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <div
      className="rounded-lg p-4 border-2 hover:border-accent-orange transition-all duration-200 hover:shadow-lg overflow-hidden"
      style={{
        backgroundColor: item.bgColor,
        borderColor: item.bgColor
      }}
    >
      {/* Image Section */}
      <div className="flex justify-center items-center mb-3 h-24">
        {item.image && (
          <img
            src={getImagePath(item.image)}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Title and Quantity */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white font-semibold text-lg flex-1">{item.name}</h3>
        {item.quantity && (
          <span className="text-accent-yellow font-bold text-sm ml-2">{item.quantity}</span>
        )}
      </div>

      {/* Category Badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {item.category.map((cat) => (
          <span
            key={cat}
            className={`${getCategoryColor(cat)} text-white text-xs px-2 py-1 rounded`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Weight and Value */}
      <div className="flex justify-between text-sm">
        {item.weight !== undefined && (
          <div className="text-gray-300">
            <span className="text-gray-400">Weight:</span>{" "}
            <span className="text-white font-semibold">{item.weight}</span>
          </div>
        )}
        <div className="text-gray-300">
          <span className="text-gray-400">Value:</span>{" "}
          <span className="text-accent-orange font-semibold">{item.value.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
