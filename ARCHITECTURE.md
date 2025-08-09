# Studio One Architecture

## Overview
Studio One is a unified standalone React application that consolidates the best features from S4, One, Docs, and Guardian plugins into a streamlined visual pattern builder.

## Core Principles
1. **Simplified Dashboard**: Header, left sidebar (library), canvas, right sidebar (controls)
2. **Framework First**: Refine architecture before finalizing save/export features
3. **Standalone Architecture**: No WordPress dependencies for core functionality
4. **Single Source of Truth**: Unified state management and consistent patterns
5. **Clean Component Architecture**: Modular, reusable components with clear separation of concerns

## Directory Structure

```
studio-one/
├── src/
│   ├── core/                    # Core system modules
│   │   ├── canvas/             # Canvas rendering engine
│   │   ├── shadow-dom/         # Shadow DOM implementation
│   │   ├── patterns/           # Pattern library system
│   │   ├── look-system/        # Look System from S4
│   │   ├── ui-generator/       # UIGenerator from One
│   │   └── theme-processor/    # Theme processing system
│   │
│   ├── features/               # Feature modules
│   │   ├── library/           # Left sidebar - Pattern/component library
│   │   ├── controls/          # Right sidebar - Controls and settings
│   │   ├── export/            # Export functionality (to be refined)
│   │   ├── save/              # Save functionality (to be refined)
│   │   └── presets/           # Preset management
│   │
│   ├── components/            # Shared UI components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── LeftSidebar.tsx
│   │   │   ├── RightSidebar.tsx
│   │   │   └── Canvas.tsx
│   │   ├── ui/               # Reusable UI components
│   │   └── patterns/         # Pattern components
│   │
│   ├── services/             # Business logic and services
│   │   ├── pattern-service/
│   │   ├── storage-service/
│   │   ├── export-service/
│   │   └── theme-service/
│   │
│   ├── state/                # State management
│   │   ├── store.ts
│   │   ├── slices/
│   │   └── hooks/
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── pattern.types.ts
│   │   ├── canvas.types.ts
│   │   └── theme.types.ts
│   │
│   └── utils/                # Utility functions
│       ├── dom/
│       ├── style/
│       └── helpers/

## Dashboard Layout

### Header
- App branding/logo
- Global actions (save, export, preview)
- Settings/preferences access

### Left Sidebar (Library)
- Pattern categories
- Component browser
- Quick search
- Drag-and-drop support

### Canvas (Center)
- Visual editing area
- Shadow DOM container
- Real-time preview
- Responsive viewport controls

### Right Sidebar (Controls)
- Context-sensitive controls
- Style editors
- Property panels
- Preset selectors

## Key Features to Migrate

### From S4 Plugin
- Canvas builder system
- Shadow DOM implementation
- Pattern library structure
- Look System

### From One Plugin
- UIGenerator for JSON to React
- Enhanced theme processor
- One-system framework components

### From Docs Plugin
- Architecture governance concepts
- Guardian agent patterns
- Documentation structure

### From Guardian Plugin
- State management patterns
- REST API structure
- Validation systems

## Development Phases

### Phase 1: Core Setup (Current)
- Basic directory structure
- Layout components
- State management setup
- Canvas implementation

### Phase 2: Pattern System
- Library UI
- Pattern management
- Drag-and-drop functionality
- Basic controls

### Phase 3: Framework Refinement
- Preset system
- Core scopes
- Style management
- Theme processing

### Phase 4: Save/Export (Later)
- Refined save architecture
- Export formats
- Standalone data persistence
- Integration options

## State Management

Using Zustand for state management with the following stores:
- `canvasStore`: Canvas state and operations
- `patternStore`: Pattern library management
- `controlsStore`: Control panel state
- `themeStore`: Theme and style management
- `presetStore`: Preset configurations

## Notes

- No WordPress dependencies in core functionality
- Save/export to be refined after framework is solid
- Focus on simplified, streamlined UI
- Maintain flexibility for future enhancements
