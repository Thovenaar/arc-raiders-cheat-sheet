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

      <SearchBar onSearch={onSearch} />
    </header>
  );
}
