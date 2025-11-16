import SearchBar from "./SearchBar";

interface HeaderProps {
  onSearch: (term: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-6">
        <h1 className="text-5xl font-bold text-white mb-2">
          ARC Raiders <span className="text-accent-orange">Recycling Cheat Sheet</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Your comprehensive guide to what to keep, recycle, and use for workshop upgrades
        </p>
      </div>
    </header>
  );
}

export function StickySearchBar({ onSearch }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border py-4 mb-6 -mx-4 px-4">
      <div className="max-w-7xl mx-auto">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
