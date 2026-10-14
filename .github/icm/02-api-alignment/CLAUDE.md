# 02-api-alignment — bring the SDK in line with the API

One run is one alignment: the SDK's paths, fields and resources compared with what memoryrelay/api serves today, the differences agreed with a person, and one pull request that closes them. It is the job behind the 0.2.0 release ([#1](https://github.com/memoryrelay/node-sdk/pull/1), "align SDK with API schemas"), and the job memoryrelay/api's alignment review of 2026-10-04 asks for next: add an `icm` resource, or say in the README that the SDK is memory-only ([api-alignment.md](../_shared/api-alignment.md)).

The API is always right about its own shape; the person decides what the SDK takes on (a new resource is scope, not a defect).

Stages, in order; inputs, outputs and checks for each are in [CONTEXT.md](CONTEXT.md):

1. [Compare](stages/01_compare/CONTEXT.md) — every difference, with the API's evidence, and the change proposed.
2. [Align](stages/02_align/CONTEXT.md) — make the approved change, test it, document it, open the pull request.
