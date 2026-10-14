# 02_align — change the SDK to match

One job: the approved rows of the comparison, changed in code, tests and README, as one pull request.

## Inputs
- Working (this run): `.github/icm/02-api-alignment/stages/01_compare/output/comparison.md`
- Reference (every run): `.github/icm/_shared/architecture.md`
- Reference (every run): `.github/icm/_shared/build-and-test.md`
- Reference (every run): `.github/icm/_shared/documents.md`

Do NOT load: the other pipelines, `.github/icm/_shared/release.md`, other runs' output.

## Process
1. Change only the approved rows: `src/types.ts` for shapes, the resource file for paths and methods, a new file under `src/resources/` and a property on the client for a new resource, `src/index.ts` when a new type or class is public.
2. For every changed or added method, a nock test in `src/__tests__/` whose mocked request and response follow the API evidence in the comparison, not the old SDK.
3. Update the README's API reference for every method added, changed or removed, and its scope sentence if the run decided it; fix any "Known drift" row of [documents.md](../../../_shared/documents.md) the change touches.
4. Run the CI chain: `npm ci && npm run lint && npm run format:check && npm run build && npm run test:coverage`.
5. Write the pull request: the rows changed with their API evidence, breaking changes listed first, the checks and their results. Title `fix: align <scope> with the API` or `feat: add <resource>`; say in the body which version class the release needs.
6. After the human check, open it against `main` (`gh pr create --repo memoryrelay/node-sdk --base main --title "<title>" --body-file <this stage's output/pull-request.md>`). Never merge, never tag: publishing is `03-release`.

## Outputs
- pull-request.md → output/ — the title and body, each changed row with its evidence, the tests added, the README sections changed, and the checks run with their results.

## Human check
A person reads `pull-request.md` against the approved comparison and confirms nothing outside the approved rows changed and every breaking change is listed first.
