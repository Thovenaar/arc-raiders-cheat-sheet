export type ItemTier =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "material";

export interface Item {
  name: string;
  category: string[];
  weight?: number;
  value: number;
  quantity?: string;
  tier: ItemTier;
  image: string;
  bgColor: string; // Hex color for background
}

export const tierColors = {
  common: "#2a3f5f", // Dark blue
  uncommon: "#2d5016", // Dark green
  rare: "#4a2c6b", // Purple
  epic: "#6b2c8f", // Bright purple
  legendary: "#8b6914", // Gold/yellow
  material: "#6b3d1e", // Orange/brown
};

export interface WorkshopUpgrade {
  bench: string;
  level: number;
  items: Item[];
}

export type Category =
  | "ARC"
  | "Residential"
  | "Medical"
  | "Industrial"
  | "Security"
  | "Electrical"
  | "Mechanical"
  | "Commercial"
  | "Technological"
  | "Exodus"
  | "Nature";

export const CATEGORIES: Category[] = [
  "ARC",
  "Residential",
  "Medical",
  "Industrial",
  "Security",
  "Electrical",
  "Mechanical",
  "Commercial",
  "Technological",
  "Exodus",
  "Nature",
];
