import { useState, useMemo } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import CategorySection from "./components/CategorySection";
import QuickTips from "./components/QuickTips";
import Footer from "./components/Footer";
import {
  keepForQuests,
  keepForProjects,
  safeToRecycle,
  workshopUpgrades,
  quickTips
} from "./data/items";
import type { Item } from "./types";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };

  const filterItems = (items: Item[]) => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        item.category.some((cat) => selectedCategories.includes(cat));
      return matchesSearch && matchesCategory;
    });
  };

  const filteredKeepForQuests = useMemo(
    () => filterItems(keepForQuests),
    [searchTerm, selectedCategories]
  );

  const filteredKeepForProjects = useMemo(
    () => filterItems(keepForProjects),
    [searchTerm, selectedCategories]
  );

  const filteredSafeToRecycle = useMemo(
    () => filterItems(safeToRecycle),
    [searchTerm, selectedCategories]
  );

  const filteredWorkshopUpgrades = useMemo(() => {
    const result: { bench: string; level: number; items: Item[] }[] = [];

    Object.entries(workshopUpgrades).forEach(([bench, levels]) => {
      Object.entries(levels).forEach(([level, items]) => {
        const filtered = filterItems(items);
        if (filtered.length > 0) {
          result.push({
            bench: bench.replace(/([A-Z])/g, " $1").trim(),
            level: parseInt(level.replace("level", "")),
            items: filtered
          });
        }
      });
    });

    return result;
  }, [searchTerm, selectedCategories]);

  const totalResults =
    filteredKeepForQuests.length +
    filteredKeepForProjects.length +
    filteredSafeToRecycle.length +
    filteredWorkshopUpgrades.reduce((sum, wu) => sum + wu.items.length, 0);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header onSearch={setSearchTerm} />

        <CategoryFilter
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearCategories}
        />

        {(searchTerm || selectedCategories.length > 0) && (
          <div className="mb-6 text-gray-400">
            Found {totalResults} item{totalResults !== 1 ? "s" : ""}
          </div>
        )}

        <QuickTips tips={quickTips} />

        <CategorySection
          title="Keep for Quests"
          description="Quest-critical items that you should save"
          items={filteredKeepForQuests}
        />

        <CategorySection
          title="Keep for Projects"
          description="Crafting materials needed in large quantities"
          items={filteredKeepForProjects}
        />

        <CategorySection
          title="Safe to Recycle"
          description="Items that can be safely recycled without worry"
          items={filteredSafeToRecycle}
        />

        {filteredWorkshopUpgrades.map((wu, index) => (
          <CategorySection
            key={`${wu.bench}-${wu.level}-${index}`}
            title={`${wu.bench.charAt(0).toUpperCase() + wu.bench.slice(1)} - Level ${wu.level}`}
            description="Workshop upgrade materials"
            items={wu.items}
          />
        ))}

        {totalResults === 0 && (searchTerm || selectedCategories.length > 0) && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No items found matching your filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                handleClearCategories();
              }}
              className="mt-4 px-6 py-2 bg-accent-orange text-white rounded-lg hover:bg-accent-yellow transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
