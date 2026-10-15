---
verified_at: 2026-10-15
verified_commit: b3fe99d8acfb2bb18d3790970ce67ed2c049e613
---

# The API this SDK follows, and who publishes it

## Who publishes `@memoryrelay/sdk`

This repository. `package.json:2-3` names `@memoryrelay/sdk` and its version; the `publish` job (`ci-cd.yml:51-82`) runs `npm publish --access public` on a pushed `v*` tag. npm agrees: `npm view @memoryrelay/sdk repository.url` gives this repository, and the versions on npm (0.1.0, 0.2.0) are this repository's tags.

memoryrelay/api declares the same package name at 0.1.0 in [`sdk/typescript/package.json`](https://github.com/memoryrelay/api/blob/main/sdk/typescript/package.json), and no workflow there publishes it (its only npm publish is `mcp-publish.yml`, for `mcp/`). A change made under `sdk/typescript/` reaches no user; a change made here does, on the next tag. Which of the two stays the publisher is decided in neither repository; ask the person before moving publication.

## What it covers

Memory only: the resources in `src/resources/` and the health check at `src/client.ts:61-64`. No `icm` resource, no `/v2` endpoint.

memoryrelay/api's [plugin and client alignment review of 2026-10-04](https://github.com/memoryrelay/api/blob/main/docs/plans/2026-10-04-plugin-alignment-review.md), section "4. SDKs", found this SDK at 0.2.0 memory-only, with its paths and field names (`min_score`, entity `name`) still correct and no ICM. Its Recommendation 4 asks this SDK to add an `icm` resource or to say in `README.md` that it is memory-only. The README half is done: `README.md:18` says the SDK covers memories, entities, agents and health only, with no ICM resource, and points at the remote MCP server or the Python SDK for ICM (2026-10-15). Adding an `icm` resource is a feature, the owner's call, and stays open; it would be a `02-api-alignment` run.

## Keeping in line with the API

- The API owns every shape: its routes and schemas live in memoryrelay/api (`app/api/v1/`, `app/api/v2/`, `app/icm/`). When the SDK and the API disagree, the API is right and `src/types.ts` and the resource files change.
- The last alignment was [#1](https://github.com/memoryrelay/node-sdk/pull/1) (2026-03-24): nested search results, the 50 000-character limit, `threshold` renamed `min_score`, `detail` error bodies, the entity `entity_type` field, batch `status`, missing methods. Its breaking changes made 0.2.0 ([release.md](release.md)).
- To check at the next run, not assumed: `src/types.ts:39-40` and `src/types.ts:96-97` (session and project fields on memories and agents) and `src/types.ts:120-121` (`session_id` and `project` on create), against the API's current memory and agent schemas.
