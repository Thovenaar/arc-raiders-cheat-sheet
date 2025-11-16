import { CATEGORIES } from "../types";

interface CategoryFilterProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearAll: () => void;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    ARC: "bg-purple-600 hover:bg-purple-700",
    Residential: "bg-blue-600 hover:bg-blue-700",
    Medical: "bg-green-600 hover:bg-green-700",
    Industrial: "bg-yellow-600 hover:bg-yellow-700",
    Security: "bg-red-600 hover:bg-red-700",
    Electrical: "bg-cyan-600 hover:bg-cyan-700",
    Mechanical: "bg-orange-600 hover:bg-orange-700",
    Commercial: "bg-pink-600 hover:bg-pink-700",
    Technological: "bg-indigo-600 hover:bg-indigo-700",
    Exodus: "bg-teal-600 hover:bg-teal-700",
    Nature: "bg-lime-600 hover:bg-lime-700"
  };
  return colors[category] || "bg-gray-600 hover:bg-gray-700";
};

export default function CategoryFilter({
  selectedCategories,
  onToggleCategory,
  onClearAll
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Filter by Category</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-accent-orange hover:text-accent-yellow transition-colors text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => onToggleCategory(category)}
              className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                isSelected
                  ? `${getCategoryColor(category)} ring-2 ring-accent-yellow`
                  : "bg-dark-card border border-dark-border hover:border-accent-orange"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
