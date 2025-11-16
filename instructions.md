# React Website Plan for ARC Raiders Recycling Cheat Sheet

## Original document
![ARC Raiders Recycling Cheat Sheet](cheat-sheet.pdf)

---

## Project Overview
Convert the ARC Raiders Recycling Cheat Sheet PDF into an interactive React website with search functionality, organized by categories, displaying all items with their properties.

---

## Technical Stack
- **React** (Vite or Create React App)
- **TypeScript** (recommended)
- **Tailwind CSS** for styling (matches the dark theme)
- **Fuse.js** or native filtering for search
- **React Icons** for UI elements

---

## Component Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── CategorySection.tsx
│   ├── ItemCard.tsx
│   ├── QuickTips.tsx
│   └── Footer.tsx
├── data/
│   └── items.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.css
```

---

## Data Structure

```typescript
interface Item {
  name: string;
  category: string[]; // Can have multiple categories
  weight: number;
  value: number;
  quantity?: string; // e.g., "3x", "30x"
  image?: string; // Image filename
}

interface WorkshopUpgrade {
  bench: string;
  level: number;
  items: Item[];
}
```

---

## Extracted Data by Category

### **Keep for Quests** (10 items)
```typescript
const keepForQuests: Item[] = [
  { name: "Leaper Pulse Unit", category: ["ARC"], weight: 1, value: 5000, quantity: "1x" },
  { name: "Power Rod", category: ["Exodus"], weight: 1, value: 5500, quantity: "1x" },
  { name: "Rocketeer Driver", category: ["ARC"], weight: 1, value: 5000, quantity: "1x" },
  { name: "Surveyor Vault", category: ["ARC"], weight: 0.75, value: 2000, quantity: "1x" },
  { name: "Antiseptic", category: ["Medical"], weight: 1, value: 1000, quantity: "2x" },
  { name: "Hornet Driver", category: ["ARC"], weight: 0.75, value: 2000, quantity: "2x" },
  { name: "Syringe", category: ["Medical"], weight: 0.3, value: 5000, quantity: "1x" },
  { name: "Wasp Driver", category: ["ARC", "Electrical"], weight: 0.6, value: 1000, quantity: "2x" },
  { name: "Water Pump", category: ["Mechanical", "Industrial"], weight: 2, value: 1000, quantity: "1x" },
  { name: "Snitch Scanner", category: ["ARC"], weight: 0.75, value: 2000, quantity: "2x" }
];
```

### **Keep for Projects** (16 items)
```typescript
const keepForProjects: Item[] = [
  { name: "Leaper Pulse Unit", category: ["ARC"], weight: 1, value: 5000, quantity: "3x" },
  { name: "Magnetic Accelerator", category: ["Exodus"], weight: 1, value: 5500, quantity: "3x" },
  { name: "Exodus Modules", category: ["Exodus"], weight: 1, value: 2750, quantity: "1x" },
  { name: "Adv. Electrical Components", category: ["Electrical"], weight: 1, value: 1750, quantity: "5x" },
  { name: "Humidifier", category: ["Residential"], weight: 2, value: 1000, quantity: "5x" },
  { name: "Sensors", category: ["Technological", "Security"], weight: 0.3, value: 500, quantity: "20x" },
  { name: "Cooling Fan", category: ["Technological"], weight: 3, value: 2000, quantity: "5x" },
  { name: "Battery", category: ["Technological", "Electrical"], weight: 0.25, value: 250, quantity: "30x" },
  { name: "Light Bulb", category: ["Electrical"], weight: 0.2, value: 2000, quantity: "5x" },
  { name: "Electrical Components", category: ["Electrical"], weight: 0.5, value: 640, quantity: "30x" },
  { name: "Wires", category: ["Technological", "Electrical"], weight: 0.25, value: 200, quantity: "30x" },
  { name: "Steel Spring", category: ["Technological"], weight: 0.25, value: 300, quantity: "15x" },
  { name: "Durable Cloth", category: ["Commercial", "Medical"], weight: 1.5, value: 640, quantity: "35x" },
  { name: "ARC Alloy", category: ["ARC"], weight: 0.25, value: 200, quantity: "80x" },
  { name: "Rubber Parts", category: ["Mechanical", "Electrical", "Industrial"], weight: 0.1, value: 50, quantity: "150x" },
  { name: "Metal Parts", category: ["Technological", "Industrial", "Mechanical", "Electrical"], weight: 0.1, value: 50, quantity: "200x" }
];
```

### **Safe to Recycle (A-Z)** (61 items)
```typescript
const safeToRecycle: Item[] = [
  { name: "Accordion", category: ["Residential"], weight: 3, value: 2000 },
  { name: "Alarm Clock", category: ["Residential"], weight: 2, value: 1000 },
  { name: "ARC Coolant", category: ["ARC"], weight: 1, value: 1000 },
  { name: "ARC Flex Rubber", category: ["ARC"], weight: 1, value: 1000 },
  { name: "ARC Performance Steel", category: ["ARC"], weight: 1, value: 1000 },
  { name: "ARC Synthetic Resin", category: ["ARC"], weight: 1, value: 1000 },
  { name: "ARC Thermo Lining", category: ["ARC"], weight: 1, value: 1000 },
  { name: "Bicycle Pump", category: ["Residential"], weight: 3, value: 2000 },
  { name: "Broken Flashlight", category: ["Security"], weight: 2, value: 1000 },
  { name: "Broken Guidance System", category: ["Industrial"], weight: 3, value: 2000 },
  { name: "Broken Handheld Radio", category: ["Security"], weight: 3, value: 2000 },
  { name: "Broken Handcuffs", category: ["Security"], weight: 0.8, value: 640 },
  { name: "Broken Taser", category: ["Security"], weight: 2, value: 1000 },
  { name: "Burned ARC Circuitry", category: ["ARC"], weight: 0.25, value: 640 },
  { name: "Camera Lens", category: ["Security"], weight: 0.8, value: 640 },
  { name: "Candle Holder", category: ["Residential"], weight: 2, value: 640 },
  { name: "Coolant", category: ["Mechanical"], weight: 2, value: 1000 },
  { name: "Cooling Coil", category: ["Industrial"], weight: 2, value: 1000 },
  { name: "Crumpled Plastic Bottle", category: ["Residential"], weight: 0.8, value: 270 },
  { name: "Damaged ARC Motion Core", category: ["ARC"], weight: 0.25, value: 640 },
  { name: "Damaged ARC Powercell", category: ["ARC"], weight: 0.25, value: 293 },
  { name: "Deflated Football", category: ["Residential"], weight: 0.8, value: 1000 },
  { name: "Diving Goggles", category: ["Residential"], weight: 2, value: 640 },
  { name: "Dried-Out ARC Resin", category: ["ARC"], weight: 1, value: 640 },
  { name: "Expired Respirator", category: ["Medical"], weight: 2, value: 640 },
  { name: "Flute", category: ["Residential"], weight: 2, value: 640 },
  { name: "Frying Pan", category: ["Residential"], weight: 2, value: 640 },
  { name: "Garlic Press", category: ["Commercial", "Residential"], weight: 0.8, value: 1000 },
  { name: "Headphones", category: ["Commercial", "Residential"], weight: 2, value: 1000 },
  { name: "Household Cleaner", category: ["Residential"], weight: 0.8, value: 640 },
  { name: "Ice Cream Scooper", category: ["Commercial"], weight: 0.8, value: 640 },
  { name: "Impure ARC Coolant", category: ["ARC"], weight: 1, value: 640 },
  { name: "Industrial Charger", category: ["Industrial"], weight: 2, value: 1000 },
  { name: "Industrial Magnet", category: ["Industrial"], weight: 2, value: 1000 },
  { name: "Metal Brackets", category: ["Mechanical", "Electrical"], weight: 0.8, value: 640 },
  { name: "Number Plate", category: ["Mechanical"], weight: 0.8, value: 80 },
  { name: "Polluted Air Filter", category: ["Industrial"], weight: 0.8, value: 1000 },
  { name: "Portable TV", category: ["Residential"], weight: 3, value: 2000 },
  { name: "Power Bank", category: ["Electrical", "Residential", "Commercial"], weight: 2, value: 1000 },
  { name: "Projector", category: ["Residential"], weight: 2, value: 1000 },
  { name: "Radio", category: ["Commercial", "Residential"], weight: 2, value: 1000 },
  { name: "Remote Control", category: ["Residential"], weight: 0.8, value: 1000 },
  { name: "Ripped Safety Vest", category: ["Industrial"], weight: 0.8, value: 1000 },
  { name: "Rubber Pad", category: ["Electrical"], weight: 2, value: 1000 },
  { name: "Ruined Accordion", category: ["Residential"], weight: 3, value: 2000 },
  { name: "Ruined Baton", category: ["Security"], weight: 0.8, value: 640 },
  { name: "Ruined Handcuffs", category: ["Security"], weight: 0.8, value: 640 },
  { name: "Ruined Parachute", category: ["Exodus"], weight: 0.8, value: 640 },
  { name: "Ruined Riot Shield", category: ["Security"], weight: 2, value: 1000 },
  { name: "Ruined Tactical Vest", category: ["Security"], weight: 0.8, value: 640 },
  { name: "Rusty ARC Steel", category: ["ARC"], weight: 1, value: 640 },
  { name: "Rusted Bolts", category: ["Mechanical", "Industrial"], weight: 0.8, value: 640 },
  { name: "Spring Cushion", category: ["Commercial", "Residential"], weight: 2, value: 2000 },
  { name: "Spotter Relay", category: ["ARC"], weight: 1, value: 5000 },
  { name: "Tattered ARC Lining", category: ["ARC"], weight: 1, value: 640 },
  { name: "Tattered Clothes", category: ["Residential"], weight: 0.8, value: 640 },
  { name: "Thermostat", category: ["Residential"], weight: 2, value: 1000 },
  { name: "Torn Blanket", category: ["Residential", "Medical"], weight: 2, value: 5000 },
  { name: "Turbo Pump", category: ["Exodus"], weight: 3, value: 2000 },
  { name: "Water Filter", category: ["Industrial"], weight: 2, value: 1000 }
];
```

### **Workshop Upgrades** (57 items)
```typescript
const workshopUpgrades = {
  scrappy: {
    level2: [
      { name: "Dog Collar", category: ["Residential"], value: 640, quantity: "1x" }
    ],
    level3: [
      { name: "Lemon", category: ["Nature"], value: 640, quantity: "3x" },
      { name: "Apricot", category: ["Nature"], value: 640, quantity: "3x" }
    ],
    level4: [
      { name: "Prickly Pear", category: ["Nature"], value: 640, quantity: "6x" },
      { name: "Olives", category: ["Nature"], value: 640, quantity: "6x" }
    ],
    level5: [
      { name: "Cat Bed", category: ["Commercial", "Residential"], value: 1000, quantity: "1x" },
      { name: "Mushroom", category: ["Nature"], value: 1000, quantity: "12x" },
      { name: "Apricot", category: ["Nature"], value: 640, quantity: "12x" },
      { name: "Very Comfortable Pillow", category: ["Commercial", "Residential"], value: 2000, quantity: "3x" }
    ]
  },
  gunsmith: {
    level2: [
      { name: "Rusted Tools", category: ["Mechanical"], value: 1000, quantity: "3x" },
      { name: "Wasp Driver", category: ["ARC"], value: 1000, quantity: "8x" }
    ],
    level3: [
      { name: "Mechanical Components", category: ["Mechanical"], value: 2000, quantity: "5x" },
      { name: "Rusted Gear", category: ["Industrial", "Mechanical"], value: 2000, quantity: "3x" },
      { name: "Adv. Mechanical Components", category: ["Mechanical"], value: 1750, quantity: "5x" },
      { name: "Sentinel Firing Core", category: ["ARC"], value: 3000, quantity: "4x" }
    ]
  },
  gearBench: {
    level2: [
      { name: "Power Cable", category: ["Electrical"], value: 1000, quantity: "3x" },
      { name: "Electrical Components", category: ["Electrical"], value: 640, quantity: "5x" }
    ],
    level3: [
      { name: "Hornet Driver", category: ["ARC"], value: 2000, quantity: "5x" },
      { name: "Industrial Battery", category: ["Industrial", "Electrical"], value: 1000, quantity: "3x" },
      { name: "Adv. Electrical Components", category: ["Electrical"], value: 1750, quantity: "5x" },
      { name: "Bastion Cell", category: ["ARC"], value: 5000, quantity: "6x" }
    ]
  },
  medicalLab: {
    level2: [
      { name: "Cracked Bioscanner", category: ["Medical"], value: 1000, quantity: "2x" },
      { name: "Tick Pod", category: ["ARC"], value: 640, quantity: "8x" },
      { name: "Durable Cloth", category: ["Commercial", "Medical"], value: 640, quantity: "5x" }
    ],
    level3: [
      { name: "Rusted Shut Medical Kit", category: ["Medical"], value: 2000, quantity: "3x" },
      { name: "Antiseptic", category: ["Medical"], value: 1000, quantity: "8x" },
      { name: "Surveyor Vault", category: ["ARC"], value: 2000, quantity: "5x" }
    ]
  },
  refiner: {
    level2: [
      { name: "Toaster", category: ["Residential"], value: 1000, quantity: "3x" },
      { name: "Fireball Burner", category: ["ARC"], value: 640, quantity: "8x" },
      { name: "ARC Motion Core", category: ["ARC"], value: 1000, quantity: "5x" }
    ],
    level3: [
      { name: "Motor", category: ["Mechanical"], value: 2000, quantity: "3x" },
      { name: "ARC Circuitry", category: ["ARC"], value: 1000, quantity: "10x" },
      { name: "Bombardier Cell", category: ["ARC"], value: 5000, quantity: "6x" }
    ]
  },
  explosivesStation: {
    level2: [
      { name: "Synthesized Fuel", category: ["Exodus"], value: 750, quantity: "3x" },
      { name: "Pop Trigger", category: ["ARC"], value: 640, quantity: "5x" },
      { name: "Crude Explosives", category: ["Industrial", "Security"], value: 270, quantity: "5x" }
    ],
    level3: [
      { name: "Laboratory Reagents", category: ["Medical"], value: 2000, quantity: "3x" },
      { name: "Explosive Compound", category: ["Industrial", "Security"], value: 1000, quantity: "5x" },
      { name: "Rocketeer Driver", category: ["ARC"], value: 5000, quantity: "3x" }
    ]
  },
  utilityStation: {
    level2: [
      { name: "Damaged Heat Sink", category: ["Technological"], value: 1000, quantity: "2x" },
      { name: "Snitch Scanner", category: ["ARC"], value: 2000, quantity: "6x" },
      { name: "Electrical Components", category: ["Electrical"], value: 640, quantity: "5x" }
    ],
    level3: [
      { name: "Fried Motherboard", category: ["Electrical", "Technological"], value: 2000, quantity: "3x" },
      { name: "Adv. Electrical Components", category: ["Electrical"], value: 1750, quantity: "5x" },
      { name: "Leaper Pulse Unit", category: ["ARC"], value: 5000, quantity: "4x" }
    ]
  }
};
```

---

## Features to Implement

### 1. **Search Bar**
- Real-time filtering across all items
- Search by: name, category, value range, weight
- Highlight matching text
- Show which section the item is in

### 2. **Category Filters**
- Filter badges for: ARC, Residential, Medical, Industrial, Security, Electrical, Mechanical, Commercial, Technological, Exodus, Nature
- Multi-select filtering
- Clear all filters button

### 3. **Item Display**
- Card-based layout matching the original design
- Show: name, category badges, weight, value, quantity
- Color-coded by rarity/category (match PDF colors)
- Placeholder images (can be replaced later)

### 4. **Quick Tips Section**
- Display the two tips from the original
- Collapsible/expandable

### 5. **Responsive Design**
- Mobile-first approach
- Grid layout that adapts

### 6. **Dark Theme**
- Match the PDF's dark background
- Orange/yellow accents for highlights

---

## Implementation Steps for Claude Code

### Step 1: Project Setup
```bash
npm create vite@latest arc-raiders-cheatsheet -- --template react-ts
cd arc-raiders-cheatsheet
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Configure Tailwind
Update `tailwind.config.js`:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0e1a",
          card: "#1a1f2e",
          border: "#2a3142"
        },
        accent: {
          orange: "#ff6b35",
          yellow: "#ffd23f"
        }
      }
    }
  },
  plugins: []
};
```

### Step 3: Create Type Definitions
Create `src/types/index.ts` with the interfaces shown above

### Step 4: Create Data File
Create `src/data/items.ts` with all the extracted data arrays

### Step 5: Build Components

**SearchBar.tsx** - Input with debounced search
**CategorySection.tsx** - Renders a section with title and items
**ItemCard.tsx** - Individual item display with badges
**Header.tsx** - Title, version, search bar
**QuickTips.tsx** - Tips section
**Footer.tsx** - Credits and links

### Step 6: Implement Search Logic
```typescript
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

const filteredItems = allItems.filter(item => {
  const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = selectedCategories.length === 0 || 
    item.category.some(cat => selectedCategories.includes(cat));
  return matchesSearch && matchesCategory;
});
```

### Step 7: Styling
- Use Tailwind for all styling
- Match colors from PDF (dark blue background, colored badges)
- Add hover effects on cards
- Smooth transitions

### Step 8: Polish
- Add loading states
- Add "no results" message
- Add keyboard shortcuts (/ to focus search)
- Add export functionality (optional)

---

## Notes About Images

The PDF contains item icons/images. For the initial build:
1. Use **placeholder colored divs** with category-based colors
2. Add an `image` property to the data structure
3. Create an `/public/images/items/` folder structure
4. Images can be extracted separately and named to match item names (kebab-case)
5. Use `<img src={`/images/items/${item.name.toLowerCase().replace(/\s+/g, '-')}.png`} />` pattern

If you need the actual images extracted from the PDF, you'll need to use a PDF extraction tool separately.

---

## Quick Tips to Include

```typescript
const quickTips = [
  "Selling beats scrapping (most of the time). Recycling yields fewer materials than you might expect—recycling during a raid returns ~50% of the usual components, and you can only properly recycle back in Speranza. If you don't need the mats right now, sell or stash.",
  "Don't craft 'for profit.' Craft only what you'll use; otherwise you often lose value compared to turning in or selling. (Pair this with the 50% recycling rule above.)"
];
```

---

This plan gives Claude Code everything needed to build the site. The data is fully extracted and organized, and the implementation steps are clear and sequential!