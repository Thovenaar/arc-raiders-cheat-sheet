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
      <div className="flex justify-center items-center mb-3 h-24 relative">
        {item.image && (
          <div className="relative group/image w-full h-full flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-lg blur-xl opacity-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle, ${tierColor}40 0%, transparent 70%)`,
              }}
            />
            <img
              src={getImagePath(item.image)}
              alt={item.name}
              className="relative max-h-[120px] max-w-[120px] w-auto h-auto object-contain drop-shadow-lg transition-all duration-300 group-hover/image:scale-110 group-hover/image:drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.1))",
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${tierColor}20 0%, transparent 70%)`,
                filter: "blur(8px)",
              }}
            />
          </div>
        )}
      </div>

      {/* Required Quantity - Top Left */}
      {item.quantity && (
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-dark-bg/80 backdrop-blur-sm px-2 py-1 rounded border border-accent-yellow/30">
          <svg className="w-3.5 h-3.5 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-accent-yellow font-bold text-xs">{item.quantity}</span>
        </div>
      )}

      {/* Tier Badge - Top Right */}
      <div className="absolute top-2 right-2">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
          style={{
            backgroundColor: tierColor,
            color: "#ffffff",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)"
          }}
        >
          {item.tier}
        </span>
      </div>

      {/* Title */}
      <div className="mb-2">
        <h3 className="text-white font-semibold text-lg leading-tight pr-16">{item.name}</h3>
      </div>

      {/* Category Badges */}
      <div className="mb-3">
        <div className="text-gray-400 text-[10px] uppercase tracking-wide mb-1.5">Categories</div>
        <div className="flex flex-wrap gap-1.5">
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
      </div>

      {/* Stats Section */}
      <div className="border-t border-dark-border/50 pt-3 space-y-2">
        {item.weight !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l4-4m4 4l-4-4m4 4l4 4m-4-4l-4 4m4-4l4-4" />
              </svg>
              <span>Weight</span>
            </div>
            <span className="text-white font-semibold text-sm">{item.weight}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Value</span>
          </div>
          <span className="text-accent-orange font-semibold text-sm">Φ{item.value.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
