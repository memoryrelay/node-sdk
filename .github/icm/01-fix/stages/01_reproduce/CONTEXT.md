# 01_reproduce — reproduce the reported defect

One job: turn the report into a test that fails on demand, for the reason reported.

## Inputs
- Working (this run): the report — read whole with what it links: an issue (`gh issue view <n> --repo memoryrelay/node-sdk --comments`), a red run (`gh run view <run-id> --repo memoryrelay/node-sdk --log-failed`), a user's stack trace.
- Reference (every run): `.github/icm/_shared/architecture.md`
- Reference (every run): `.github/icm/_shared/build-and-test.md`
- Reference (every run): `.github/icm/_shared/gotchas.md`

Do NOT load: the other pipelines, `.github/icm/_shared/release.md`, other runs' output.

## Process
1. Restate the report as observed versus expected, with the SDK version, the Node version and the call that was made. Remove any API key from what you copy.
2. Check [gotchas.md](../../../_shared/gotchas.md) first: several reports describe behaviour that is surprising but deliberate or public (attempts versus retries, timeouts as `NetworkError`, 403 as `AuthenticationError`). If the report is one of them, say so and stop for the person to decide whether it is a defect.
3. Decide whose shape is wrong. If the SDK sends or expects something the API does not (a path, a field, a status), stop: that is `02-api-alignment` (route `fix-to-align`), with this file as its request.
4. Find the code path with [architecture.md](../../../_shared/architecture.md) and name the suspected cause as `path:line`. A suspicion is not a finding until something fails.
5. Write the failing test in `src/__tests__/` with nock, calling the SDK, never a copy of its logic. For a red CI run, the failing step of the run is the reproduction.
6. Run it (`npx jest <file>`) and keep the failing output. If it passes, the reproduction or the report is wrong: say which, and stop.

## Outputs
- reproduction.md → output/ — the restated report; whose shape is wrong and why; the suspected cause (`path:line`); the test file and command; the failing output.

## Human check
A person runs the command and confirms it fails for the reported reason, and agrees the defect is the SDK's logic and not the API's shape.
