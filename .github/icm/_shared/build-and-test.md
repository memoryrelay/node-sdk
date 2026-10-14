---
verified_at: 2026-10-14
verified_commit: c5ad2a0de2940a87d53f34f9ca453c0c2a78fe7c
---

# Build, test, and what counts as evidence

What CI runs is the `test` job of `.github/workflows/ci-cd.yml` (`ci-cd.yml:14-49`): on Node 18, 20 and 22, `npm ci`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run test:coverage`. Run the same chain locally before a pull request; the scripts are `package.json:7-16`.

## The pieces

| What | Owner | What it means |
|---|---|---|
| compile | `tsconfig.json` | strict, `noUnusedLocals` and `noUnusedParameters`: an unused import fails the build, not only the lint |
| lint | `eslint.config.mjs` | typescript-eslint recommended plus Prettier compatibility; `no-explicit-any` is a warning, and warnings do not fail CI |
| format | `.prettierrc`, `package.json:14` | `format:check` covers `src/**/*.ts` only |
| tests | `jest.config.js`, `src/__tests__/` | ts-jest; HTTP is mocked with nock against `https://api.memoryrelay.net` (`src/__tests__/client.test.ts:5-18`); no test reaches the live API |
| coverage gate | `jest.config.js:12-19` | `test:coverage` fails below these thresholds; `src/resources/agents.ts` and `src/resources/entities.ts` have no tests of their own today |
| engines | `package.json:41-43` | Node 18 or later |

## Evidence

- A defect in the SDK's own logic: a nock test in `src/__tests__/` that fails before the change and passes after, calling the SDK, never a copy of its logic.
- A disagreement with the API: a nock mock only encodes what the SDK assumes, so it is not proof of the API's shape. The proof is the API's own route or schema in memoryrelay/api, or a recorded live response with the key removed; see [api-alignment.md](api-alignment.md).
- Commit subjects follow the conventional prefixes the history uses (`fix:`, `chore:`, `feat:`, `docs:`, `test:`, `style:`).
