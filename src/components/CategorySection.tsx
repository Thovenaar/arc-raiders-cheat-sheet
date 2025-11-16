import { useState, useEffect } from "react";
import type { Item } from "../types";
import ItemCard from "./ItemCard";

interface CategorySectionProps {
  title: string;
  items: Item[];
  description?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function CategorySection({
  title,
  items,
  description,
  isExpanded: controlledExpanded,
  onToggle
}: CategorySectionProps) {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const handleToggle = onToggle || (() => setInternalExpanded(!internalExpanded));

  useEffect(() => {
    if (controlledExpanded !== undefined) {
      setInternalExpanded(controlledExpanded);
    }
  }, [controlledExpanded]);

  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-accent-orange mb-2">{title}</h2>
            {description && <p className="text-gray-400">{description}</p>}
            <div className="text-gray-500 text-sm mt-1">{items.length} items</div>
          </div>
          <button
            onClick={handleToggle}
            className="ml-4 p-2 rounded-lg bg-dark-card border border-dark-border hover:border-accent-orange transition-all duration-200 flex items-center justify-center min-w-[40px] h-10"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            <svg
              className={`w-5 h-5 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 overflow-hidden ${isExpanded
            ? 'max-h-[10000px] opacity-100 mb-0'
            : 'max-h-0 opacity-0 mb-0 pointer-events-none'
          }`}
      >
        {items.map((item, index) => (
          <ItemCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
}
