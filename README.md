# Studio ONE

A unified visual builder with governance - merging S4, One, Docs, and Guardian WordPress plugins into a powerful standalone React application.

## Prerequisites
- Node 18+

## Run locally
```
cd studio-one
npm install
npm run api   # starts the Node API at http://localhost:5175
npm run dev   # starts Vite dev server at http://localhost:5173
```
Or in two terminals:
- Terminal A: `npm run api`
- Terminal B: `npm run dev`

Then open http://localhost:5173

## Structure
- server.js: Express API for file I/O
- guardian-data/: JSON and docs persisted in Git
  - guardian.config.json
  - nodes/*.json
  - agents/*.json
  - advisories/*.json (create as needed)
  - docs/* (md or json)
  - themes/guardian-theme.json
- src/: React UI
  - adapters/storage-fs.ts: calls the local API
  - pages/NodesPage.tsx: example page listing nodes

## Notes
- This is a starting point. Next we will add:
  - Rules engine for drift checks (hash + regex)
  - Advisories UI and approvals
  - Docs editor, linked to nodes/agents
  - Optional adapters: storage-git, storage-wp, tasks-fluent

