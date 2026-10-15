---
verified_at: 2026-10-15
verified_commit: b3fe99d8acfb2bb18d3790970ce67ed2c049e613
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

None known. The five items found at onboarding (the Node.js floor, the coverage claim, `maxRetries` as retries, RELEASE.md's Node matrix, the SDK's scope) were corrected on 2026-10-15.
