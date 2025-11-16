import type { Item } from "../types";
import { tierColors } from "../types";

interface ItemCardProps {
  item: Item;
}

const getCategoryStyle = (category: string) => {
  const styles: Record<string, { gradient: string; border: string; glow: string }> = {
    ARC: {
      gradient: "linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6d28d9 100%)",
      border: "#a855f7",
      glow: "0 0 8px rgba(168, 85, 247, 0.4)"
    },
    Residential: {
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
      border: "#60a5fa",
      glow: "0 0 8px rgba(96, 165, 250, 0.4)"
    },
    Medical: {
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
      border: "#34d399",
      glow: "0 0 8px rgba(52, 211, 153, 0.4)"
    },
    Industrial: {
      gradient: "linear-gradient(135deg, #eab308 0%, #ca8a04 50%, #a16207 100%)",
      border: "#facc15",
      glow: "0 0 8px rgba(250, 204, 21, 0.4)"
    },
    Security: {
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      border: "#f87171",
      glow: "0 0 8px rgba(248, 113, 113, 0.4)"
    },
    Electrical: {
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
      border: "#22d3ee",
      glow: "0 0 8px rgba(34, 211, 238, 0.4)"
    },
    Mechanical: {
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
      border: "#fb923c",
      glow: "0 0 8px rgba(251, 146, 60, 0.4)"
    },
    Commercial: {
      gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
      border: "#f472b6",
      glow: "0 0 8px rgba(244, 114, 182, 0.4)"
    },
    Technological: {
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)",
      border: "#818cf8",
      glow: "0 0 8px rgba(129, 140, 248, 0.4)"
    },
    Exodus: {
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
      border: "#5eead4",
      glow: "0 0 8px rgba(94, 234, 212, 0.4)"
    },
    Nature: {
      gradient: "linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #4d7c0f 100%)",
      border: "#a3e635",
      glow: "0 0 8px rgba(163, 230, 53, 0.4)"
    }
  };
  return styles[category] || {
    gradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%)",
    border: "#9ca3af",
    glow: "0 0 8px rgba(156, 163, 175, 0.4)"
  };
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
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.category.map((cat) => {
          const style = getCategoryStyle(cat);
          return (
            <span
              key={cat}
              className="text-white text-[10px] px-2 py-0.5 rounded font-medium relative overflow-hidden transition-all duration-200 hover:scale-105 cursor-default"
              style={{
                background: style.gradient,
                border: `1px solid ${style.border}`,
                boxShadow: style.glow,
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `${style.glow}, 0 0 12px ${style.border}`;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = style.glow;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span className="relative z-10">{cat}</span>
            </span>
          );
        })}
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
