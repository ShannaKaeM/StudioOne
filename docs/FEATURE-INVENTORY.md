# Studio ONE Feature Inventory

## S4 Plugin Features

### Pattern Management
- **Pattern Library**: Browse and search patterns
- **Pattern Categories**: Organize patterns by type
- **Pattern Preview**: Live preview of patterns
- **Pattern Metadata**: Tags, descriptions, usage notes

### Export System
- **Export UI**: Located in `src/export/` (needs investigation)
- **Format Support**: HTML, JSON, WordPress blocks
- **Bulk Export**: Export multiple patterns
- **Template System**: Custom export templates

### Component System
- **Component Types**: Headers, heroes, features, CTAs
- **Component Variations**: Multiple styles per component
- **Component Properties**: Configurable options

### Issues to Address
- Hard-coded styles throughout
- UI drift from original design
- Fragmented file structure
- Missing documentation

## One Plugin Features

### UIGenerator System
- **Dynamic UI Generation**: JSON-driven UI creation
- **Theme Configuration**: `ui-theme.json` system
- **Zone Management**: Header, library, canvas, editor zones
- **Component Mapping**: Dynamic component instantiation

### Theme System
- **Token Management**: Design tokens for consistency
- **Variable System**: CSS custom properties
- **Theme Presets**: Multiple look configurations
- **Color Schemes**: Dynamic color management

### Enhanced Components
- **Advanced Patterns**: More complex than S4
- **Dynamic Properties**: Runtime configuration
- **Responsive System**: Breakpoint management
- **Animation Support**: Transition configurations

### Integration Points
- WordPress block editor integration
- Custom block controls
- Theme.json synchronization
- Gutenberg compatibility

## Docs Plugin Features

### Documentation System
- **Architecture Docs**: System design documentation
- **Pattern Documentation**: Usage guidelines
- **API Documentation**: Integration guides
- **Best Practices**: Coding standards

### Governance Features
- **Rule Enforcement**: Pattern usage rules
- **Validation Rules**: Content validation
- **Compliance Checking**: Standards compliance
- **Agent Integration**: AI-based validation

### Knowledge Management
- **Search System**: Full-text search
- **Categorization**: Topic organization
- **Version Control**: Documentation versioning
- **Change Tracking**: Edit history

## Guardian Plugin Features

### Validation Engine
- **Content Validation**: Real-time checking
- **Rule Engine**: Configurable rules
- **Error Reporting**: Detailed error messages
- **Fix Suggestions**: Automated corrections

### Rule Management
- **Rule Builder**: Visual rule creation
- **Rule Categories**: Organization by type
- **Rule Priority**: Execution order
- **Custom Rules**: User-defined validation

### Compliance System
- **Standards Checking**: WCAG, SEO, etc.
- **Report Generation**: Compliance reports
- **Audit Trail**: Validation history
- **Exemption Management**: Rule exceptions

## Guardian Standalone Features

### React Architecture
- **Modern Stack**: React 18, TypeScript
- **API Server**: Express.js backend
- **Database**: SQLite for rules/data
- **Real-time Updates**: WebSocket support

### User Interface
- **Dashboard**: Overview and metrics
- **Rule Manager**: CRUD operations
- **Validation UI**: Interactive testing
- **Settings Panel**: Configuration

### API Features
- **REST Endpoints**: Full CRUD API
- **Authentication**: JWT tokens
- **Rate Limiting**: API protection
- **Webhook Support**: External integrations

## Shared/Common Features

### Data Management
- **Import/Export**: Data portability
- **Backup System**: Automated backups
- **Version Control**: Change tracking
- **Migration Tools**: Data migration

### User Management
- **Role System**: Permission levels
- **Team Features**: Collaboration
- **Activity Logging**: User actions
- **Preferences**: User settings

### Integration Features
- **WordPress Integration**: Plugin compatibility
- **Third-party APIs**: External services
- **Webhook System**: Event notifications
- **CLI Tools**: Command line interface

## Feature Priority Matrix

### Must Have (MVP)
1. UIGenerator from One plugin
2. Pattern library from S4
3. Basic validation from Guardian
4. Theme system from One
5. Export functionality from S4

### Should Have (V1)
1. Full Guardian validation
2. Documentation system from Docs
3. Advanced theming
4. Team collaboration
5. API integration

### Nice to Have (V2)
1. AI agent integration
2. Advanced governance
3. Multi-language support
4. Plugin ecosystem
5. Enterprise features

## Technical Debt to Address

### Code Quality
- Remove hard-coded values
- Standardize naming conventions
- Improve error handling
- Add comprehensive tests

### Architecture
- Decouple from WordPress
- Create clear boundaries
- Improve modularity
- Standardize data models

### Documentation
- API documentation
- Code comments
- User guides
- Migration guides

## Migration Complexity Assessment

### Low Complexity
- Static documentation
- Basic UI components
- Simple validation rules
- Export templates

### Medium Complexity
- Theme system migration
- Pattern library extraction
- Rule engine integration
- User preferences

### High Complexity
- UIGenerator extraction
- WordPress decoupling
- Data model unification
- Real-time features
