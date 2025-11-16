import type { Item } from "../types";
import { tierColors } from "../types";

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

  const tierColor = tierColors[item.tier];

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Brighten a hex color by a factor (0-1, where 1 = fully bright)
  const brightenColor = (hex: string, factor: number = 0.4) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Increase brightness by moving towards white
    const newR = Math.min(255, Math.round(r + (255 - r) * factor));
    const newG = Math.min(255, Math.round(g + (255 - g) * factor));
    const newB = Math.min(255, Math.round(b + (255 - b) * factor));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  // Create a gradient that blends the tier color with the dark base
  // Using the tier color at the start, blending to dark
  const getGradient = () => {
    return `linear-gradient(135deg, ${hexToRgba(tierColor, 0.15)} 0%, ${hexToRgba(tierColor, 0.08)} 30%, #0f1419 60%, #0a0e1a 100%)`;
  };

  const getBorderColor = () => {
    // Use a semi-transparent version of the tier color for the border
    return hexToRgba(tierColor, 0.5);
  };

  return (
    <div
      className="rounded-lg p-4 border-2 transition-all duration-200 overflow-hidden relative group"
      style={{
        background: getGradient(),
        borderColor: getBorderColor(),
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = brightenColor(tierColor, 0.4);
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = getBorderColor();
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)";
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
