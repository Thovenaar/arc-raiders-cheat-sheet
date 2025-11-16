# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ARC Raiders Recycling Cheat Sheet - An interactive React website that converts the ARC Raiders game item recycling guide from PDF format into a searchable, filterable web application.

## Current State

The project is in planning phase. The `instructions.md` file contains the complete specification including:
- Full data extraction from the original PDF (87 items across multiple categories)
- Detailed component structure and architecture
- Step-by-step implementation plan
- TypeScript type definitions

## Technology Stack

- **React** with TypeScript (Vite)
- **Tailwind CSS** for styling (dark theme with orange/yellow accents)
- **Fuse.js** or native filtering for search functionality
- **React Icons** for UI elements

## Project Setup (Not Yet Implemented)

When initializing the project, use:
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Architecture

### Component Structure
```
src/
├── components/
│   ├── Header.tsx          # Title, version, search bar
│   ├── SearchBar.tsx       # Input with debounced search
│   ├── CategorySection.tsx # Section renderer with title and items
│   ├── ItemCard.tsx        # Individual item display with badges
│   ├── QuickTips.tsx       # Tips section (collapsible)
│   └── Footer.tsx          # Credits and links
├── data/
│   └── items.ts            # All item data arrays (see instructions.md)
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx
└── index.css
```

### Data Structure

```typescript
interface Item {
  name: string;
  category: string[];    // Multiple categories possible
  weight: number;
  value: number;
  quantity?: string;     // e.g., "3x", "30x"
  image?: string;        // Image filename
}

interface WorkshopUpgrade {
  bench: string;
  level: number;
  items: Item[];
}
```

### Data Categories

The application organizes items into four main sections:
1. **Keep for Quests** (10 items) - Quest-critical items
2. **Keep for Projects** (16 items) - Crafting materials needed in large quantities
3. **Safe to Recycle** (61 items alphabetically) - Items that can be safely recycled
4. **Workshop Upgrades** (57 items across 7 benches) - Items needed for workshop progression

All extracted data is available in `instructions.md` lines 66-264.

### Search & Filter Implementation

The app uses multi-criteria filtering:
- **Text search**: Filter by item name (case-insensitive)
- **Category filters**: Multi-select badges for all 11 categories (ARC, Residential, Medical, Industrial, Security, Electrical, Mechanical, Commercial, Technological, Exodus, Nature)
- **Section indicators**: Show which category section contains matching items

## Tailwind Configuration

Custom theme extends with:
```js
colors: {
  dark: {
    bg: "#0a0e1a",      // Main background
    card: "#1a1f2e",    // Card backgrounds
    border: "#2a3142"   // Border colors
  },
  accent: {
    orange: "#ff6b35",  // Primary accent
    yellow: "#ffd23f"   // Secondary accent
  }
}
```

## Important Implementation Notes

1. **Image Handling**: Use placeholder colored divs initially. Images should go in `/public/images/items/` with kebab-case naming matching item names.

2. **Quick Tips**: Two game tips from the original PDF should be displayed (see instructions.md lines 395-399).

3. **Workshop Upgrades**: Organized by bench type (Scrappy, Gunsmith, Gear Bench, Medical Lab, Refiner, Explosives Station, Utility Station) and upgrade level (2-5).

4. **Color-coding**: Item cards should use category-based color coding matching the original PDF design.

5. **Responsive Design**: Mobile-first approach with adaptive grid layout.

## Reference Documents

- `instructions.md` - Complete project specification with all extracted data and implementation steps
- `cheat-sheet.pdf` - Original source document (binary file)

## Design Principles

- Dark theme matching the game aesthetic
- Real-time search with no page refreshes
- Multi-select category filtering
- Highlight matching search terms
- Smooth transitions and hover effects
- Keyboard accessibility (/ to focus search)
