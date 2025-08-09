# Guardian Standalone Roadmap

Last updated: 2025-08-08
Author: Shanna + Agent Mode

## 0. What we have now (MVP)
- Standalone React app (Vite + TS) served at http://localhost:5173
- Tiny Node API for file I/O at http://localhost:5175
- Data directory tracked in Git: `guardian-data/`
  - `guardian.config.json`
  - `nodes/*.json` (1 seeded: theme-guardian)
  - `themes/guardian-theme.json` (seed)
  - `agents/*.json` (seed: shanna)
  - `advisories/*.json` (created on failed checks)
- Nodes page
  - Lists nodes
  - Mark Approved (updates node status)
  - Run Checks (hash/regex pipeline foundation)
  - Shows per-node results; creates advisories on failure
- Advisories panel
  - Lists advisories from files
  - Update state: acknowledged / approved / rejected

## 1. Vision (Guardian)
A framework-agnostic governance tool that:
- Protects critical artifacts (nodes) from drift
- Enforces rules (forbid, require, checksum baselines)
- Records advisories and approvals (file-based, Git-friendly)
- Generates and governs documentation
- Offers optional adapters for WP or other environments

## 2. Architecture (current)
- Frontend: React 18 + Vite + TypeScript
- Backend: Express (Node), file-backed storage
- Data model: JSON files under `guardian-data/`
- Adapters: storage-fs (implemented), storage-git (planned), storage-wp (optional later)

## 3. Data model (file-first)
- `guardian.config.json` – project config (baselineRef, rulesets)
- `nodes/{id}.json` – watched artifact
  - id, name, type, paths[], checks{ checksum, patterns{ forbid[], require[] }, custom[] }, agent, status
- `agents/{id}.json` – agent metadata
- `advisories/{id}.json` – created on violations; has state
- `docs/*` – docs (md/json) for nodes, agents, ADRs (planned)

## 4. Rules engine (phase 1)
- Regex patterns
  - forbid: e.g., `@vite/client`, `time\(`, insecure patterns
  - require: presence checks in target files
- Path normalization to safely read `guardian-data` contents
- Result → create advisory files on failure

Next: checksum baselines (sha256) + approve-baseline flow.

## 5. Roadmap (phased)

### M1 (done)
- [x] Repo scaffold (Vite+React, Node API)
- [x] Nodes list + Mark Approved
- [x] Run Checks with regex rules
- [x] Create advisories on failure
- [x] Advisories list + state transitions

### M2 (in progress)
- [ ] Checksum baseline support
  - Compute sha256 per file → store under `node.checks.baseline` map
  - Compare current to baseline on Run Checks
  - Approve Baseline button updates stored hashes
- [ ] More nodes + realistic rules
  - Add nodes targeting real files (e.g., WP plugin dist/guardian.js, PHP entry)
  - Encode Guardian guardrails (no Vite dev URLs, no `time()` cache buster, `wp_safe_redirect` required, precise enqueue—only when WP adapter is used)
- [ ] Docs editor (file-based)
  - Simple list + view + edit for `guardian-data/docs/*.md`
  - Link docs to nodeId/agentId (frontmatter or filename convention)

### M3
- [ ] storage-git adapter
  - Use git diff as drift source; integrate with pre-commit (Husky) and CI
  - CLI or script to run checks; non-zero exit on critical issues
- [ ] CI (GitHub Actions)
  - Run checks on PR; upload advisory summary
  - Optional: enforce approval before merge
- [ ] Baseline approvals workflow
  - UI: Approve baseline after review; updates node file

### M4
- [ ] Optional storage-wp adapter (thin)
  - For projects that want to host inside WordPress and persist via REST
  - Keep standalone as the primary mode
- [ ] Theming integration (ONE)
  - UIGenerator + runtimeThemeProcessor bridge (if embedding elsewhere)
- [ ] Exporters (optional): zip, json snapshots of guardian-data

## 6. Guardrails (policies to encode as rules)
- General
  - No dev-only URLs in committed code: `@vite/client`, localhost:517x
  - No `?v=` time-based cache busting in production assets
  - No direct global DOM styles when embedded; keep isolation options
- WordPress adapter (only when enabled)
  - Enqueues scoped by exact page hooks
  - Use `wp_safe_redirect` for redirects
  - REST routes must include `permission_callback` and args schema

## 7. Developer workflow
- Local dev
  - `npm run api` (http://localhost:5175)
  - `npm run dev` (http://localhost:5173)
- Data changes tracked in Git (guardian-data)
- Advisories created automatically by checks
- Approvals update node/advisory files

## 8. Open questions
- Where should we persist long-term: purely Git, or Git + optional DB in some deployments?
- What’s the minimum set of default rules all projects must enable?
- Do we add a small CLI for checks and approvals? (Useful for CI and local scripts.)

## 9. Immediate next actions
- Implement checksum baseline + Approve Baseline UI ✅ (added Approve Baseline + sha256 compare)
- Add at least two more nodes with real files and rules ✅ (added guardian-source node with regex protections)
- Add simple Docs editor (list/edit markdown) ✅ (Docs page wired to guardian-data/docs)
- Initialize Git repo and push to GitHub
  - Add basic GitHub Action to run checks on PRs

## 10. Theme/UIGenerator plan (high-level)
- Theme tokens JSON lives at `guardian-data/themes/guardian-theme.json` (file-first)
- Theme processor (lite) applies tokens as CSS variables on the app root (no Shadow DOM needed in SPA)
- Mini UIGenerator renders token-driven components for preview
- Next steps (theme):
  - Finalize token structure/namespacing before building a theme editor UI
  - Add a small Theme Editor later (edit a few key tokens, save, re-apply)
  - When embedding in hosts, switch the processor to inject into a Shadow Root (adapter-aware)

---
This roadmap tracks the Guardian standalone journey: file-first governance with optional adapters, strict guardrails, and a clean approval trail stored alongside your code.

