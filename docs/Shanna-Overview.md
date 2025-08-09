# Shanna Overview: How Guardian, ONE, S4, and DOCS fit together (for-dummies)

Last updated: 2025-08-08

## 1) What we’re building now
- A standalone Guardian app (React + Node)
  - Stores governance data as files in `guardian-data/` (nodes, agents, advisories, docs, theme)
  - Runs checks on declared files (nodes) and creates advisories when something violates rules
  - Approvals/acknowledgements are recorded back into JSON (Git-friendly)
- WordPress is optional
  - We can host the built app inside WP later if we want, but the app works independently.

## 2) Tasks integration (plain answer)
- Your request: "If we use tasks, build them into React—not tied to WP."
- Plan:
  - We keep tasks inside Guardian as advisories with states (open/acknowledged/approved/rejected).
  - We can later add optional adapters (e.g., Fluent, Linear, Jira) but only as integrations—core tasking remains inside the React app.

## 3) Are we dogfooding Guardian on Guardian?
- Yes. The current regex checks and (soon) checksum baselines protect the Guardian app itself from drift.
- We’re already using nodes to watch Guardian’s own files (e.g., theme JSON). You can add more nodes to watch any source file that matters.
- Later, the same model applies to other apps:
  - Example: ONE app or a WP plugin can be watched by Guardian via nodes pointing at their files. Guardian stays the central “governor.”

## 4) How the legacy pieces map to the new stack
- S4 (legacy Studio1 builder)
  - What we keep: the idea of Shadow DOM isolation and a builder flow, but we move away from ad hoc component creation.
  - What we fix: we prefer ONE’s more disciplined runtime (if embedding), or go pure SPA when standalone.
- ONE (design system template)
  - What we keep: the canonical runtime pattern—Shadow host + runtimeThemeProcessor + UIGenerator.
  - For Guardian: use one theme (guardian-theme.json) and UIGenerator when we embed later; for now, the standalone doesn’t need Shadow DOM.
- DOCS (agents + documentation)
  - What we keep: the “guardian agents” model, rules, and collaboration concept.
  - What we change: store docs and advisories as files instead of CPTs; React app handles everything.
- Guardian (WP plugin)
  - We hardened the host version (no dev URLs, safe redirects, precise enqueues, REST arg schemas) so it can optionally serve the built SPA, but the primary app is standalone.

## 5) What the checks actually do (today and next)
- Today
  - Regex rules: forbid patterns (e.g., `@vite/client`, `time(`) and require patterns where appropriate
  - Create advisories on failure
- Next (M2)
  - Checksum baselines: store sha256 per watched file and compare on every run
  - Approve Baseline button to update stored hashes after review

## 6) How this scales to other apps (ONE, WP plugins, etc.)
- Guardian remains the central tool. Add nodes pointing to:
  - Files in ONE (dist bundles, processor modules, theme JSON)
  - Files in WP plugins (PHP entrypoints, built JS/CSS) with WP-specific rules only when the WP adapter is enabled
- Same checks, same advisories, same approvals—just different node definitions.

## 7) Simple mental model
- Node = "thing we protect" (file(s) + rules + assigned agent)
- Rule = "what must be true" (regex, checksum, custom)
- Advisory = "record of failure + next steps" (state machine)
- Agent = "who is responsible"
- Guardian = "control tower" (checks, advisories, approvals) sitting outside any one framework

## 8) Practical next steps
- Add checksum baselines + Approve Baseline ✅
- Add more nodes for real files in Guardian, ONE, and WP plugins you care about ✅ (added guardian-source regex protections)
- Add a simple docs editor under `guardian-data/docs` (md/json) and link docs to nodes/agents ✅
- Add a lightweight theme engine + Mini UIGenerator preview ✅
- Finalize theme token structure before building a Theme Editor UI
- Add pre-commit and CI checks

## 9) Theme + UIGenerator plan (simple)
- Theme JSON is your single source of truth (guardian-data/themes/guardian-theme.json)
- Processor applies tokens to app root as CSS variables (SPA). In embedded mode, it targets a Shadow Root.
- UIGenerator builds small UI samples from tokens so you can see themes live.
- Once token structure is stable, we’ll add a small Theme Editor and a more flexible UIGenerator that reads a component schema.

## 10) Why this is better
- Framework-agnostic, Git-first, portable
- Rules and history live alongside code
- Optional integrations (WP or others) don’t own your data or workflow


