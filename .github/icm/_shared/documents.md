---
verified_at: 2026-10-14
verified_commit: c5ad2a0de2940a87d53f34f9ca453c0c2a78fe7c
---

# Documents — what this repository's documents say, and who owns it

The agent-facing files are the root `AGENTS.md` (the entry; `CLAUDE.md` is a one-line pointer to it) and this `.github/icm/` folder. The documents below are read by people; each restates facts that a code or workflow file owns, and the owner is right when they disagree.

## Pinned

| Document | What it answers | Owner of the facts |
|---|---|---|
| [README.md](../../../README.md) | install, quick start, configuration, the API reference by resource, error handling, development commands | `src/`, `package.json` |
| [RELEASE.md](../../../RELEASE.md) | npm token and secret setup, the scope, manual and tag-driven publishing, troubleshooting | `.github/workflows/ci-cd.yml`, `package.json` |

`LICENSE` (MIT) is not pinned.

## Known drift

Each is a correction for the next run that touches the document, not a fact to repeat.

| Where | Says | The owner says |
|---|---|---|
| `README.md:353` | Node.js 16 or later | Node 18 or later (`package.json:41-43`); CI tests 18, 20 and 22 (`ci-cd.yml:18`) |
| `README.md:16` | 100% test coverage | the gate is 50-65% (`jest.config.js:12-19`), lowered to the measured coverage in `dcceef6` |
| `README.md:314` | `maxRetries: 5` retries up to 5 times | five attempts in all ([gotchas.md](gotchas.md)) |
| `RELEASE.md:75` | tests run on Node 16, 18, 20 | `ci-cd.yml:18`: 18, 20, 22 |
| `README.md:8-16` "Features" | the SDK's surface, with no word on its scope | memory only, no `icm` resource ([api-alignment.md](api-alignment.md), Recommendation 4) |
