import { useState, useMemo, useEffect } from "react";
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "keep-for-quests": true,
    "keep-for-projects": true,
    "safe-to-recycle": true,
  });

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

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const getAllSectionKeys = () => {
    return [
      "keep-for-quests",
      "keep-for-projects",
      "safe-to-recycle",
      ...filteredWorkshopUpgrades.map((wu, index) => `workshop-${wu.bench}-${wu.level}-${index}`)
    ];
  };

  const collapseAll = () => {
    const allKeys = getAllSectionKeys();
    const newState: Record<string, boolean> = {};
    allKeys.forEach((key) => {
      newState[key] = false;
    });
    setExpandedSections(newState);
  };

  const expandAll = () => {
    const allKeys = getAllSectionKeys();
    const newState: Record<string, boolean> = {};
    allKeys.forEach((key) => {
      newState[key] = true;
    });
    setExpandedSections(newState);
  };

  // Initialize workshop section states when they appear
  useEffect(() => {
    const workshopKeys = filteredWorkshopUpgrades.map((wu, index) => `workshop-${wu.bench}-${wu.level}-${index}`);
    setExpandedSections((prev) => {
      const updated = { ...prev };
      let changed = false;
      workshopKeys.forEach((key) => {
        if (updated[key] === undefined) {
          updated[key] = true;
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [filteredWorkshopUpgrades]);

  const allSectionKeys = getAllSectionKeys();
  const allCollapsed = allSectionKeys.every((key) => expandedSections[key] === false);
  const allExpanded = allSectionKeys.every((key) => expandedSections[key] === true);

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

        <div className="mb-6 flex gap-2">
          <button
            onClick={allCollapsed ? expandAll : collapseAll}
            className="px-4 py-2 bg-dark-card border border-dark-border hover:border-accent-orange text-white rounded-lg transition-all duration-200 text-sm font-medium"
          >
            {allCollapsed ? "Expand All" : "Collapse All"}
          </button>
        </div>

        <QuickTips tips={quickTips} />

        <CategorySection
          title="Keep for Quests"
          description="Quest-critical items that you should save"
          items={filteredKeepForQuests}
          isExpanded={expandedSections["keep-for-quests"]}
          onToggle={() => toggleSection("keep-for-quests")}
        />

        <CategorySection
          title="Keep for Projects"
          description="Crafting materials needed in large quantities"
          items={filteredKeepForProjects}
          isExpanded={expandedSections["keep-for-projects"]}
          onToggle={() => toggleSection("keep-for-projects")}
        />

        <CategorySection
          title="Safe to Recycle"
          description="Items that can be safely recycled without worry"
          items={filteredSafeToRecycle}
          isExpanded={expandedSections["safe-to-recycle"]}
          onToggle={() => toggleSection("safe-to-recycle")}
        />

        {filteredWorkshopUpgrades.map((wu, index) => {
          const sectionKey = `workshop-${wu.bench}-${wu.level}-${index}`;
          return (
            <CategorySection
              key={sectionKey}
              title={`${wu.bench.charAt(0).toUpperCase() + wu.bench.slice(1)} - Level ${wu.level}`}
              description="Workshop upgrade materials"
              items={wu.items}
              isExpanded={expandedSections[sectionKey] ?? true}
              onToggle={() => toggleSection(sectionKey)}
            />
          );
        })}

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
