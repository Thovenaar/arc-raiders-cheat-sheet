import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

interface SidebarItem {
  id: string;
  title: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  onSearch: (term: string) => void;
}

export default function Sidebar({ items, onSearch }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  // Flatten all items including children for scroll tracking
  const getAllItemIds = (items: SidebarItem[]): string[] => {
    const ids: string[] = [];
    items.forEach((item) => {
      if (item.id) ids.push(item.id);
      if (item.children) {
        ids.push(...getAllItemIds(item.children));
      }
    });
    return ids;
  };

  useEffect(() => {
    const allIds = getAllItemIds(items);
    
    const handleScroll = () => {
      const sections = allIds.map((id) => {
        const element = document.getElementById(id);
        if (element) {
          return {
            id: id,
            top: element.getBoundingClientRect().top,
          };
        }
        return null;
      }).filter(Boolean) as { id: string; top: number }[];

      // Find the section that's currently in view
      const currentSection = sections
        .filter((s) => s.top <= 100)
        .sort((a, b) => b.top - a.top)[0];

      if (currentSection) {
        setActiveId(currentSection.id);
        // Auto-expand parent menu if child is active
        setExpandedMenus((prev) => {
          const newSet = new Set(prev);
          items.forEach((item) => {
            if (item.children?.some((child) => child.id === currentSection.id)) {
              newSet.add(item.id);
            }
          });
          return newSet;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 20; // Small offset for smooth scrolling
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const renderMenuItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.has(item.id);
    const isActive = activeId === item.id || (hasChildren && item.children?.some((child) => child.id === activeId));

    return (
      <li key={item.id}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleMenu(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                isActive
                  ? "bg-accent-orange/10 text-accent-orange font-medium"
                  : "text-gray-300 hover:text-white hover:bg-dark-border/50"
              }`}
              style={{ paddingLeft: `${0.75 + level * 0.75}rem` }}
            >
              <span>{item.title}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {isExpanded && (
              <ul className="mt-1 space-y-1">
                {item.children?.map((child) => renderMenuItem(child, level + 1))}
              </ul>
            )}
          </>
        ) : (
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`block px-3 py-2 rounded-md transition-all duration-200 text-sm ${
              activeId === item.id
                ? "bg-accent-orange/20 text-accent-orange border-l-2 border-accent-orange font-medium"
                : "text-gray-300 hover:text-white hover:bg-dark-border/50"
            }`}
            style={{ paddingLeft: `${0.75 + level * 0.75}rem` }}
          >
            {item.title}
          </a>
        )}
      </li>
    );
  };

  return (
    <aside className="sticky top-0 h-screen w-80 pl-4 pr-2 py-4 flex flex-col">
      <nav className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col h-full">
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-lg font-bold text-accent-orange mb-4">Navigation</h3>
          <SearchBar onSearch={onSearch} />
        </div>
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {items.map((item) => renderMenuItem(item))}
        </ul>
      </nav>
    </aside>
  );
}

