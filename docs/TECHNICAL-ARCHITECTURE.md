# Studio ONE Master Architecture & Implementation Plan

**Last Updated**: January 9, 2025  
**Status**: Active Development  
**Primary Goal**: Complete theme framework and basic Guardian system

## System Overview

Studio ONE is a unified design system and content governance platform that combines the best features from multiple plugins into a single cohesive application.

## Current State Analysis

### Asset Inventory
1. **Guardian Standalone App (now Studio ONE)**
   - Most advanced React-based Guardian system settings
   - Node system and validation rules
   - Framework for agent collaboration

2. **S4 Plugin**
   - Most complete feature set
   - Visual canvas builder
   - Component library
   - Pattern system (to be simplified)

3. **Guardian Plugin**
   - Most accurate/evolved theme framework
   - Best foundation for unified theme system
   - Clean variable architecture

4. **Docs Plugin**
   - Highly evolved collaboration agent system
   - Phase 2 Fluent Boards integration ready
   - 7-section documentation structure

5. **ONE Plugin**
   - UIGenerator innovation (JSON → React)
   - Shadow DOM implementation
   - Runtime theme processing

## Architecture Principles

### 1. Separation of Concerns
- **Presentation Layer**: React components and UI
- **Business Logic**: Core functionality modules
- **Data Layer**: APIs and storage
- **Integration Layer**: External system connectors

### 2. Modularity
- Loosely coupled packages
- Clear interface contracts
- Independent deployment capability
- Shared utility libraries

### 3. Extensibility
- Plugin architecture for custom features
- Hook system for modifications
- Theme system for customization
- API-first design

## Component Architecture

### Core Modules

```
┌─────────────────────────────────────────────────────────┐
│                     Studio ONE Core                      │
├─────────────┬─────────────┬─────────────┬──────────────┤
│ UIGenerator │ Components  │  Guardian   │     Docs     │
│   Module    │  & Presets  │   Module    │    Module    │
├─────────────┴─────────────┴─────────────┴──────────────┤
│                    Shared Services                       │
├─────────────┬─────────────┬─────────────┬──────────────┤
│    Theme    │    Data     │    Auth     │   Export     │
│   Service   │   Service   │  Service    │   Service    │
├─────────────┴─────────────┴─────────────┴──────────────┤
│                      API Layer                           │
├──────────────────────────────────────────────────────────┤
│                   Storage Layer                          │
└──────────────────────────────────────────────────────────┘
```

### Module Descriptions

#### Guardian Module (Core Framework Foundation)
- **Primary Role**: Serves as the most evolved framework foundation
- Validation engine with refined architecture
- Rule management system
- Compliance checking
- Error reporting
- **Key Insight**: Most mature codebase to build upon

#### UIGenerator Module (From One Plugin)
- **Primary Innovation**: JSON to React UI generation
- Dynamic component generation
- Theme-driven rendering (ui-theme.json)
- Zone management system
- Real-time preview
- **Key Feature**: Enables no-code UI creation from JSON

#### Component Library Module (From S4)
- **Core Elements**: Single div elements with 100+ CSS variables
- **Components**: Groups of elements (NOT variants - actual components)
- **Sections**: Full HTML sections with CSS
- **NO PATTERNS**: Presets handle all variations
- **Export System**: To be defined after design system completion

#### Preset System (To Be Defined)
- **Priority**: Must be properly defined before any save/store functionality
- Design token management
- Three-level preset hierarchy:
  - Element presets (single div)
  - Component presets (groups)
  - Section presets (full sections)
- Parent-child hydration system
- **Foundation for**: Entire transformer experience

#### Docs Module
- Documentation generation
- Knowledge management
- Search functionality
- Version control

## Data Flow Architecture

### Request Flow
```
User Action → UI Component → Action Creator → API Service → Backend
     ↑              ↓              ↓              ↓           ↓
     └──────── State Update ← Response ← Processing ← Database
```

### State Management
```javascript
{
  ui: {
    theme: {},
    layout: {},
    preferences: {}
  },
  components: {
    elements: [],      // Single div elements
    components: [],    // Groups of elements
    sections: [],      // Full sections
    selected: null
  },
  presets: {
    element: {},       // Element-level presets
    component: {},     // Component-level presets
    section: {},       // Section-level presets
    active: null
  },
  guardian: {
    rules: [],
    validations: {},
    reports: []
  },
  docs: {
    pages: [],
    search: {},
    versions: []
  }
}
```

## API Architecture

### RESTful Endpoints

#### Components API
```
GET    /api/components            # List all components
GET    /api/components/:id        # Get specific component
POST   /api/components            # Create component
PUT    /api/components/:id        # Update component
DELETE /api/components/:id        # Delete component
```

#### Presets API
```
GET    /api/presets               # List all presets
GET    /api/presets/:type         # Get presets by type (element/component/section)
POST   /api/presets               # Create preset
PUT    /api/presets/:id           # Update preset
DELETE /api/presets/:id           # Delete preset
POST   /api/presets/apply         # Apply preset to component
```

#### Guardian API
```
GET    /api/rules                 # List validation rules
POST   /api/rules                 # Create rule
PUT    /api/rules/:id            # Update rule
DELETE /api/rules/:id            # Delete rule
POST   /api/validate             # Validate content
GET    /api/reports              # Get validation reports
```

#### Theme API
```
GET    /api/themes               # List themes
GET    /api/themes/:id          # Get theme
POST   /api/themes              # Create theme
PUT    /api/themes/:id          # Update theme
GET    /api/tokens              # Get design tokens
PUT    /api/tokens              # Update tokens
```

### WebSocket Events
```javascript
// Real-time updates
socket.on('component:updated', (data) => {})
socket.on('preset:applied', (data) => {})
socket.on('validation:complete', (data) => {})
socket.on('theme:changed', (data) => {})
socket.on('collaboration:update', (data) => {})
```

## Storage Architecture

### File System Structure
```
data/
├── components/
│   ├── elements/        # Single div elements
│   ├── components/      # Groups of elements
│   ├── sections/        # Full sections
│   └── metadata.json
├── presets/
│   ├── element/
│   ├── component/
│   ├── section/
│   └── presets.json
├── themes/
│   ├── default/
│   ├── custom/
│   └── tokens.json
├── rules/
│   ├── validation/
│   ├── governance/
│   └── custom/
└── docs/
    ├── pages/
    ├── assets/
    └── index.json
```

### Database Schema

#### Components Table
```sql
CREATE TABLE components (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(50),    -- 'element', 'component', 'section'
  category VARCHAR(100),
  structure JSON,
  variables JSON,      -- 100+ CSS variables
  presets JSON,        -- Applied presets
  metadata JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### Presets Table
```sql
CREATE TABLE presets (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(50),    -- 'element', 'component', 'section'
  category VARCHAR(100),
  styles JSON,         -- CSS variable overrides
  parent_id UUID,      -- For inheritance
  metadata JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### Rules Table
```sql
CREATE TABLE rules (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(50),
  conditions JSON,
  actions JSON,
  priority INTEGER,
  active BOOLEAN
);
```

## Integration Architecture

### WordPress Bridge (Optional)
```javascript
// Standalone mode
const studioOne = new StudioOne({
  mode: 'standalone',
  api: 'https://api.studio-one.local'
});

// WordPress mode
const studioOne = new StudioOne({
  mode: 'wordpress',
  api: '/wp-json/studio-one/v1'
});
```

### Export Adapters
```javascript
class ExportAdapter {
  toHTML(component) {}
  toJSON(component) {}
  toWordPress(component) {}
  toReact(component) {}
  toVue(component) {}
}
```

## Security Architecture

### Authentication
- JWT-based authentication
- Role-based access control
- API key management
- Session handling

### Authorization Matrix
```
Admin:     Full access to all features
Editor:    Create/edit components, use validation
Viewer:    Read-only access
Developer: API access, export capabilities
```

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens

## Performance Optimization

### Caching Strategy
```javascript
// Memory cache for frequently accessed data
const cache = new Map();

// Redis for distributed caching
const redis = new Redis({
  components: { ttl: 3600 },
  presets: { ttl: 3600 },
  themes: { ttl: 7200 },
  validation: { ttl: 300 }
});
```

### Lazy Loading
- Component-level code splitting
- On-demand component/preset loading
- Progressive enhancement
- Virtual scrolling for large lists

### Asset Optimization
- SVG sprite generation
- Image optimization pipeline
- CSS/JS minification
- CDN integration

## Deployment Architecture

### Container Structure
```dockerfile
# Web application
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Configuration
```yaml
development:
  api_url: http://localhost:3001
  debug: true
  
production:
  api_url: https://api.studio-one.com
  debug: false
  cdn_url: https://cdn.studio-one.com
```

## Monitoring & Logging

### Application Metrics
- Response time tracking
- Error rate monitoring
- User activity analytics
- Performance metrics

### Logging Strategy
```javascript
logger.info('Component created', { 
  componentId, 
  type,     // element/component/section
  userId, 
  timestamp 
});

logger.info('Preset applied', { 
  presetId, 
  componentId, 
  cascade, 
  timestamp 
});

logger.error('Validation failed', { 
  error, 
  context 
});
```

## Implementation Plan & Work Breakdown

### Phase 1: Theme Framework Foundation (Priority 1) - Weeks 1-2

#### 1.1 Unified Theme System
**Agent Assignment**: Theme Specialist Agent  
**Source**: Guardian Plugin theme + S4 theme insights

**Tasks**:
1. **Merge Theme JSONs** (2-3 days)
   - Combine `ui-theme.json` and `one-theme.json` into single `theme.json`
   - Remove all prefixes (`one-`, `ui-`, `guardian-`)
   - Create unified variable naming:
     ```
     // Before
     one-color-1, ui-color-1
     
     // After
     color-1, color-2, color-3
     base-size, scale-ratio
     text-size, text-weight
     ```

2. **Core Variable System** (1-2 days)
   - Define ~20 base variables
   - Implement mathematical scaling system
   - Create HSL color system
   - Define spacing scale (base-size × scale-ratio)

3. **Context-Aware Processing** (2-3 days)
   - Single theme processor with context switching:
     ```javascript
     themeProcessor.generateCSS(context: 'html' | 'react')
     ```

#### 1.2 Preset System Architecture
**Agent Assignment**: Preset System Agent  
**Source**: S4 concepts + Guardian framework

**Tasks**:
1. **Define Preset Hierarchy** (3-4 days)
   - **Element Presets**: Single div elements with 100+ CSS variables
   - **Component Presets**: Groups of elements (cards, forms, etc.)
   - **Section Presets**: Full sections (heroes, features, etc.)

2. **Parent-Child Hydration Rules** (2-3 days)
   - Implement cascade logic
   - Override system for child presets
   - Inheritance patterns

3. **Base Scope Styling** (3-4 days)
   - Copy Chakra-like base components
   - Create element library with preset mappings
   - Implement transformer system

### Phase 2: Guardian System Integration (Priority 2) - Week 3

#### 2.1 Extract Guardian Framework
**Agent Assignment**: Guardian Framework Agent  
**Source**: Guardian standalone app + Guardian plugin

**Tasks**:
1. **Core Extraction** (2-3 days)
   - Pull validation engine from Guardian plugin
   - Extract node system from Guardian standalone app
   - Remove WordPress-specific code

2. **Rule System** (2-3 days)
   - Port rule management from Guardian plugin
   - Integrate collaboration features from Docs plugin
   - Create Studio ONE bridge

3. **Framework Base** (1-2 days)
   - Create standalone Guardian module
   - Define integration points
   - Set up basic API

#### 2.2 Basic Guardian Implementation
**Agent Assignment**: Guardian Implementation Agent  
**Source**: Guardian standalone + Docs plugin collaboration

**Tasks**:
1. **Node System** (2-3 days)
   ```javascript
   // Basic structure needed
   - Node creation and relationships
   - Rule assignment to nodes
   - Preset application to nodes
   - Parent-child relationships
   ```

2. **Validation Engine** (2-3 days)
   - Basic rule validation
   - Error reporting
   - Suggestion system
   - Collaboration hooks from Docs plugin

### Phase 3: UI Components Migration (Priority 3) - Week 4

#### 3.1 UIGenerator Integration
**Agent Assignment**: UI Components Agent  
**Source**: ONE plugin UIGenerator

**Tasks**:
1. **Extract from ONE Plugin** (1-2 days)
   - Pull UIGenerator component
   - Remove WordPress dependencies
   - Adapt to unified theme system

2. **JSON-to-React Pipeline** (2-3 days)
   - Implement with new unified theme
   - Create component generation system
   - Enable both React and HTML output

#### 3.2 Canvas Integration
**Agent Assignment**: Canvas Integration Agent  
**Source**: S4 visual canvas builder

**Tasks**:
1. **Extract S4 Canvas** (2-3 days)
   - Pull visual builder components
   - Remove pattern save/load (defer)
   - Focus on visual editing only

2. **Connect to Preset System** (2-3 days)
   - Wire canvas to use presets
   - Implement drag-drop with presets
   - Create preview system

### Phase 4: Dashboard Consolidation (Priority 4) - 3-4 days

#### 4.1 Sidebar Reorganization
**Agent Assignment**: UI/UX Agent  
**Source**: S4 sidebar + improvements

**Tasks**:
1. **Consolidate Tabs** (1-2 days)
   - Merge Theme + Variables + Presets → "Theme Settings"
   - Merge Elements + Components → "Component Library"
   - Remove Pattern Library tab

2. **Create Preset UI** (2-3 days)
   - Visual preset selector
   - Live preview system
   - Preset management interface

## Key Implementation Details

### Unified Theme Structure
```javascript
// Single theme.json without prefixes
{
  "variables": {
    // Core (~20 variables)
    "color-1": "hsl(220, 80%, 50%)",
    "color-2": "hsl(160, 70%, 45%)",
    "color-3": "hsl(30, 90%, 55%)",
    "base-size": "1rem",
    "scale-ratio": "1.25",
    "font-base": "system-ui",
    "font-heading": "Georgia",
    // ... calculated variables
  },
  "presets": {
    "elements": {},
    "components": {},
    "sections": {}
  }
}
```

### Basic Guardian Structure
```javascript
class GuardianCore {
  constructor() {
    this.rules = new Map();
    this.validators = new Map();
    this.nodes = new Map();
  }

  // Node management
  createNode(id, type, parent = null) {
    const node = {
      id,
      type,
      parent,
      children: [],
      rules: [],
      presets: {}
    };
    
    this.nodes.set(id, node);
    return node;
  }

  // Preset application with hydration
  applyPreset(nodeId, preset, cascade = true) {
    const node = this.nodes.get(nodeId);
    node.presets = { ...node.presets, ...preset };
    
    if (cascade) {
      // Hydrate children unless they have their own presets
      node.children.forEach(childId => {
        const child = this.nodes.get(childId);
        if (!child.presets || Object.keys(child.presets).length === 0) {
          this.applyPreset(childId, preset, true);
        }
      });
    }
  }
}
```

## Success Criteria

1. **Theme Framework** ✅
   - Single unified theme without prefixes
   - Working preset system with 3 levels
   - Parent-child hydration working
   - Mathematical scaling implemented

2. **Guardian System** ✅
   - Basic node system functional
   - Rule validation working
   - Preset application via Guardian
   - Collaboration hooks ready

3. **UI Components** ✅
   - UIGenerator producing React components
   - Canvas editing with presets
   - Simplified dashboard

## Timeline Summary

- **Phase 1**: 1-2 weeks (Theme Framework)
- **Phase 2**: 1 week (Guardian System)
- **Phase 3**: 1 week (UI Components)
- **Phase 4**: 3-4 days (Dashboard)

**Total**: ~4 weeks for MVP with basic Guardian system

## Future Considerations

### Scalability
- Microservices architecture
- Horizontal scaling capability
- Load balancing
- Database sharding

### AI Integration
- Component generation from images
- Preset suggestions based on design
- Theme evolution recommendations
- Automated validation
- Smart documentation

### Collaboration Features
- Real-time editing
- Version control
- Conflict resolution
- Team workspaces
