# node-sdk

`@memoryrelay/sdk`: the Node.js and TypeScript client for the MemoryRelay API at `api.memoryrelay.net` (axios, compiled by `tsc` to `dist/`, tested with Jest). It covers memory only: memories (create, get, update, delete, search, list, batch), entities, agents and the health check. It has no `icm` resource; pinned context, routes and runs are served by the API and not called from here. **This repository is the one that publishes `@memoryrelay/sdk` to npm today**: a pushed `v*` tag runs the `publish` job of `.github/workflows/ci-cd.yml`. memoryrelay/api carries a TypeScript SDK of the same name under `sdk/typescript/` that has never been published; which one changes, and why, is [api-alignment.md](.github/icm/_shared/api-alignment.md).

## Where things live

| Path | What it holds |
|---|---|
| `src/client.ts`, `src/resources/` | the client (config, auth, retries, error mapping) and one class per API resource — mapped in [architecture.md](.github/icm/_shared/architecture.md) |
| `src/types.ts`, `src/errors.ts`, `src/index.ts` | request and response shapes, the error classes, the public exports |
| `src/__tests__/` | Jest tests against HTTP mocked with nock; see [build-and-test.md](.github/icm/_shared/build-and-test.md) |
| `.github/workflows/` | `ci-cd.yml` (lint, format, build, test on Node 18/20/22; npm publish on a `v*` tag) and `icm-check.yml` |
| [README.md](README.md), [RELEASE.md](RELEASE.md) | the user's guide and API reference; the npm publishing setup |
| [`.github/icm/_shared/`](.github/icm/_shared/CONTEXT.md) | what every job below draws on, one file per question |
| [`.github/icm/01-fix/`](.github/icm/01-fix/CLAUDE.md) | fix a defect in the SDK's own behaviour |
| [`.github/icm/02-api-alignment/`](.github/icm/02-api-alignment/CLAUDE.md) | bring the SDK in line with the API: a changed shape, a missing method or resource |
| [`.github/icm/03-release/`](.github/icm/03-release/CLAUDE.md) | cut a version and publish it to npm |

## Route by what just happened

| Route | If | Go to | Then stop at |
|---|---|---|---|
| triage | an issue or report arrives and its kind is unclear | read it whole with its comments, then take the row below that fits | the row chosen, said to the person |
| fix | the SDK misbehaves against its own contract: a retry, an error class, a validation, a failing test | [01_reproduce](.github/icm/01-fix/stages/01_reproduce/CONTEXT.md) | a person has seen the reproduction fail |
| ci-red | `CI/CD` is red on `main` or on a `v*` tag | [01_reproduce](.github/icm/01-fix/stages/01_reproduce/CONTEXT.md), with the run log as the report | a person has seen the reproduction fail |
| align | the API and the SDK disagree (a valid call refused, a field missing or renamed), or a method or resource the API has is asked for, such as `icm` | [01_compare](.github/icm/02-api-alignment/stages/01_compare/CONTEXT.md) | a person approves the comparison and the change it proposes |
| fix-to-align | a fix turns out to be the API's shape, not the SDK's logic | [01_compare](.github/icm/02-api-alignment/stages/01_compare/CONTEXT.md), with the fix run's `reproduction.md` as the request | a person approves the comparison |
| release | a version is to be published to npm | [01_plan](.github/icm/03-release/stages/01_plan/CONTEXT.md) | a person approves the version number |
| npm-check | a `v*` tag was pushed, or a version is missing from npm | [03_publish](.github/icm/03-release/stages/03_publish/CONTEXT.md), from step 2, for that tag | a person has seen the version on npm |
| which-sdk | asked which repository publishes `@memoryrelay/sdk`, or where an SDK change belongs | [api-alignment.md](.github/icm/_shared/api-alignment.md) | the answer, with the file and line that prove it |
| next | a stage's output was approved | the next numbered stage of the same job | a person reads that stage's output |
| status | asked for status | scan `.github/icm/*/stages/*/output/` | report what exists |

## Agents connecting remotely

This repository has no MemoryRelay workspace of its own: the hub workspace `memoryrelay-hub` includes it, and the hub's mirror compiles and serves these files from `main`. An agent on a clone needs nothing: this file is the entry and the table above is the route. An agent that is not on a clone reaches the same files over MCP at `https://api.memoryrelay.net/mcp` through `memoryrelay-hub`: Claude Code and Codex with a key in `MEMORYRELAY_API_KEY`, claude.ai and Claude Desktop as a connector that signs in. None of it holds a secret.

- Start with `icm_route_list` on `memoryrelay-hub` and `icm_context_build` for the one route that fits, not with the whole hub.
- Report what you read with `icm_report_reads` when a stage ends, and what the task came to with `icm_report_outcome`.
- Never write through MCP: a change is a branch and a pull request here, read and merged by a person.

## Rules

- Nothing moves to the next stage until a person has read the output of the last one.
- A stage writes to its own `output/`, which is not committed: one run per worktree or branch, and clear that job's `stages/*/output/` when its pull request merges or is abandoned.
- A job reads only its own run's output; moving to another job is a route above, started by the person.
- `.github/icm/` points at the files that own each fact. When they disagree, the owning file is right: correct `.github/icm/` in the same pull request, and bump its `verified_commit`.
- A pushed `v*` tag publishes to npm within minutes, and npm never takes the same version number twice: the person who pushes the tag is making the release decision.
