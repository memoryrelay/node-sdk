# 01_compare — compare the SDK with the API

One job: a list of every difference between what the SDK calls and what the API serves, each with the API's evidence, and the change proposed.

## Inputs
- Working (this run): the request — a report that a valid call is refused or a field is missing, a fix run's `reproduction.md` (route `fix-to-align`), a request for a resource the API has (such as `icm`), or memoryrelay/api's alignment review.
- Reference (every run): `.github/icm/_shared/api-alignment.md`
- Reference (every run): `.github/icm/_shared/architecture.md`
- Reference (only when the request names a documented method or the README's scope): `.github/icm/_shared/documents.md`

Do NOT load: the other pipelines, `.github/icm/_shared/release.md`, other runs' output.

## Process
1. Fix the scope with the request: the resources and methods in question, or all of `src/resources/` and `src/client.ts` for a full pass.
2. For each method in scope, list what the SDK sends and expects: method, path, body and query fields, response shape, from the resource file and `src/types.ts`.
3. Read what the API serves for the same route on memoryrelay/api `main` (its router and schema files under `app/api/`, or its live OpenAPI schema). Record the file and line, or the schema path, for every claim. A nock mock in this repository is not evidence of the API's shape.
4. Classify each difference: SDK wrong (fix it), API addition the SDK lacks (offer it), SDK field the API no longer has (remove or deprecate), or not a difference. Mark each change breaking or additive for users of the SDK.
5. For a new resource (such as `icm`), propose its methods by the API's routes and name the key scopes they need; do not design beyond what the API serves.
6. Say where the change belongs: here, which publishes `@memoryrelay/sdk`, unless the person has moved publication to memoryrelay/api `sdk/typescript/` ([api-alignment.md](../../../_shared/api-alignment.md)).

## Outputs
- comparison.md → output/ — the scope; one row per difference (SDK file:line, API evidence, class, breaking or additive, proposed change); what is deliberately left out; where the change belongs.

## Human check
A person reads `comparison.md`, checks the API evidence on two rows of their choosing, and approves which rows the next stage changes and whether the release this implies is breaking.
