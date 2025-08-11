# Studio One Plugin - Personal Notes & Insights

## Key Design System Thoughts

**ONE System Evolution**: Hoping to merge everything to one theme and remove the "one" prefix like in the guardian plugin. Want to explore having pure variables like `color` instead of `one-color` or `ui-color`, `text-size` instead of `one-text-size` etc.

**Transformer Architecture**: Moved to a transformer single section/element hydration system using parent scopes and presets for endless combinations. Patterns are now simply part of other presets - no need for complex separation.

**Component Philosophy**: All components are single div elements - crucial for the 1:1 relationship between self-defined 100+ CSS variables where each element can have only one of each kind of variable applied. Key for presets system to work.

## Framework Priority Tasks

**Must Complete Before Continuing**:
- Finalize one-theme design system (scopes, presets, core variables, core elements)
- Complete preset parent system where section parents with presets can hydrate all children
- Children can have their own presets to override parents
- If no preset applied to children, they inherit parent preset styles

**Component Library Expansion**:
- Copy Chakra core library for base scope elements
- Add base UI components like cards, forms (multi-element but not full sections)
- Create complete set of base section components (hero, dashboard, features, filtered listings etc.)
- Connect to presets like layouts for full transformer experience

**User Customization Path**:
- Let users create additional elements, components, and sections
- Allow renaming existing ones while keeping backend naming/IDs synced with presets
- Apply same logic to brand colors - let users rename color1, color2, etc. to primary, accent, neutral, etc.

## Sidebar UI Improvements

**Consolidation Ideas**:
- Combine Theme controls + Variable management → "Theme Settings"
- Delete Pattern library tab (not used now)
- Combine Element library + Component browser → "Component Library"
- Keep the nice full-width expansion feature for later

## Features to Preserve vs. Rebuild

**Solid Foundations to Keep**:
- Visual Canvas Builder
- JSON architecture  
- ONE CSS system
- Component Library
- Dev/User dual mode system

**Needs Work**:
- Save/Export system (rebuild after framework completion)
- Theme system and presets (good start, needs refinement)
- Flat semantic HTML generation (align with updated framework)

## Cross-Plugin Integration Ideas

**UIGenerator Innovation**: The JSON to React Components system from the ONE plugin is super important - both user output and dashboard React components made with same framework.

**Guardian Plugin Insights**: The powerful node system and rules we started there are really exciting. Could utilize those in Studio One without needing to complete the full guardian doc system yet.

**Single Source of Truth**: Really like the overall structure that mimics what we have with Studio One - want to maintain that philosophy across all plugins.

## Technical Notes

**WordPress Integration**: Can set aside WP integration as a separate module for later.

**Responsive Design**: Want to explore contextual resizing features that could replace traditional breakpoint design.

**Export System**: Need to finalize actual framework theme before completing save/export systems, but prior work on flat HTML architecture and content-aware positioning should prove helpful.