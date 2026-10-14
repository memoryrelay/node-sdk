---
verified_at: 2026-10-14
verified_commit: c5ad2a0de2940a87d53f34f9ca453c0c2a78fe7c
---

# The API this SDK follows, and who publishes it

## Who publishes `@memoryrelay/sdk`

This repository. `package.json:2-3` names `@memoryrelay/sdk` and its version; the `publish` job (`ci-cd.yml:51-82`) runs `npm publish --access public` on a pushed `v*` tag. npm agrees: `npm view @memoryrelay/sdk repository.url` gives this repository, and the versions on npm (0.1.0, 0.2.0) are this repository's tags.

memoryrelay/api declares the same package name at 0.1.0 in [`sdk/typescript/package.json`](https://github.com/memoryrelay/api/blob/main/sdk/typescript/package.json), and no workflow there publishes it (its only npm publish is `mcp-publish.yml`, for `mcp/`). A change made under `sdk/typescript/` reaches no user; a change made here does, on the next tag. Which of the two stays the publisher is decided in neither repository; ask the person before moving publication.

## What it covers

Memory only: the resources in `src/resources/` and the health check at `src/client.ts:61-64`. No `icm` resource, no `/v2` endpoint.

memoryrelay/api's [plugin and client alignment review of 2026-10-04](https://github.com/memoryrelay/api/blob/main/docs/plans/2026-10-04-plugin-alignment-review.md), section "4. SDKs", found this SDK at 0.2.0 memory-only, with its paths and field names (`min_score`, entity `name`) still correct and no ICM. Its Recommendation 4 asks this SDK to add an `icm` resource or to say in `README.md` that it is memory-only. That recommendation is open: recorded here, not yet acted on. Either answer is a `02-api-alignment` run (the README sentence alone is a documentation change inside that run).

## Keeping in line with the API

- The API owns every shape: its routes and schemas live in memoryrelay/api (`app/api/v1/`, `app/api/v2/`, `app/icm/`). When the SDK and the API disagree, the API is right and `src/types.ts` and the resource files change.
- The last alignment was [#1](https://github.com/memoryrelay/node-sdk/pull/1) (2026-03-24): nested search results, the 50 000-character limit, `threshold` renamed `min_score`, `detail` error bodies, the entity `entity_type` field, batch `status`, missing methods. Its breaking changes made 0.2.0 ([release.md](release.md)).
- To check at the next run, not assumed: `src/types.ts:39-40` and `src/types.ts:96-97` (session and project fields on memories and agents) and `src/types.ts:119-120` (`session_id` and `project` on create), against the API's current memory and agent schemas.
