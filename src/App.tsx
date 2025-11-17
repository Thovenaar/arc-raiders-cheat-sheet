import { useState, useMemo, useEffect, useCallback } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import CategorySection from "./components/CategorySection";
import QuickTips from "./components/QuickTips";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
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

  const filterItems = useCallback((items: Item[]) => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        item.category.some((cat) => selectedCategories.includes(cat));
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  const filteredKeepForQuests = useMemo(
    () => filterItems(keepForQuests),
    [filterItems]
  );

  const filteredKeepForProjects = useMemo(
    () => filterItems(keepForProjects),
    [filterItems]
  );

  const filteredSafeToRecycle = useMemo(
    () => filterItems(safeToRecycle),
    [filterItems]
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
  }, [filterItems]);

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
    const needsUpdate = workshopKeys.some((key) => expandedSections[key] === undefined);

    if (needsUpdate) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredWorkshopUpgrades]);

  const allSectionKeys = getAllSectionKeys();
  const allCollapsed = allSectionKeys.every((key) => expandedSections[key] === false);

  // Build sidebar navigation items with submenus
  const sidebarItems = useMemo(() => {
    const items: Array<{ id: string; title: string; children?: Array<{ id: string; title: string }> }> = [
      { id: "keep-for-quests", title: "Keep for Quests" },
      { id: "keep-for-projects", title: "Keep for Projects" },
      { id: "safe-to-recycle", title: "Safe to Recycle" },
    ];

    // Group workshop upgrades by bench
    const workshopGroups: Record<string, Array<{ id: string; title: string }>> = {};
    filteredWorkshopUpgrades.forEach((wu, index) => {
      const benchName = wu.bench.charAt(0).toUpperCase() + wu.bench.slice(1);
      const sectionKey = `workshop-${wu.bench}-${wu.level}-${index}`;

      if (!workshopGroups[benchName]) {
        workshopGroups[benchName] = [];
      }
      workshopGroups[benchName].push({
        id: sectionKey,
        title: `Level ${wu.level}`,
      });
    });

    // Add workshop groups as submenus
    Object.entries(workshopGroups).forEach(([benchName, levels]) => {
      items.push({
        id: `workshop-${benchName.toLowerCase()}`,
        title: benchName,
        children: levels,
      });
    });

    return items;
  }, [filteredWorkshopUpgrades]);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="flex">
        {/* Sidebar on the left, outside main content */}
        <div className="hidden lg:block">
          <Sidebar items={sidebarItems} onSearch={setSearchTerm} />
        </div>

        {/* Main content area */}
        <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
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
            id="keep-for-quests"
            title="Keep for Quests"
            description="Quest-critical items that you should save"
            items={filteredKeepForQuests}
            isExpanded={expandedSections["keep-for-quests"]}
            onToggle={() => toggleSection("keep-for-quests")}
          />

          <CategorySection
            id="keep-for-projects"
            title="Keep for Projects"
            description="Crafting materials needed in large quantities"
            items={filteredKeepForProjects}
            isExpanded={expandedSections["keep-for-projects"]}
            onToggle={() => toggleSection("keep-for-projects")}
          />

          <CategorySection
            id="safe-to-recycle"
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
                id={sectionKey}
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
    </div>
  );
}

export default App;
