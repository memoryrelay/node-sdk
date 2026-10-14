---
verified_at: 2026-10-14
verified_commit: c5ad2a0de2940a87d53f34f9ca453c0c2a78fe7c
---

# Architecture — where each part of the SDK lives

One package, no runtime dependency but `axios` (`package.json:44-46`). The public surface is whatever `src/index.ts` exports: the `MemoryRelay` class and everything in `src/types.ts` and `src/errors.ts`, so renaming an exported type or error is a breaking change.

| Part | Owner | What it means for a job |
|---|---|---|
| defaults | `src/client.ts:16-18` | base URL, 30 s timeout, 3 attempts; the README's "Configuration" restates them |
| construction | `src/client.ts:28-56` | a missing key throws `ValidationError`; every request carries `Authorization: Bearer <key>` and a fixed `User-Agent`; the three resources are built here |
| health | `src/client.ts:61-64` | `GET /v1/health`, the only call outside a resource |
| request, retries | `src/client.ts:69-167` | network errors, 429 (waiting `Retry-After` seconds when sent) and 5xx retry with `2 ** attempt` second backoff; any other 4xx throws at once |
| error mapping | `src/client.ts:172-190`, `src/errors.ts` | status to error class; the message is the body's `detail`, else `error` |
| memories | `src/resources/memories.ts` | the only resource that validates before sending (empty content or `agent_id`, content over 50 000 characters, empty query, empty batch); search and list unwrap the API's `data` array |
| entities | `src/resources/entities.ts` | CRUD under `/v1/entities` and `POST /v1/entities/links` |
| agents | `src/resources/agents.ts` | CRUD under `/v1/agents` and `GET /v1/agents/<id>/stats` |
| shapes | `src/types.ts` | request and response types; they mirror the API's schemas and are corrected by `02-api-alignment`, never guessed |

Each resource method maps to one `/v1/...` path in its file; there is no `/v2` call and no ICM call anywhere in `src/`.
