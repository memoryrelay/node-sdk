# 02_prepare — the version bump as a pull request

One job: a pull request that sets the approved version everywhere it is written, green in CI.

## Inputs
- Working (this run): `.github/icm/03-release/stages/01_plan/output/release-plan.md`
- Reference (every run): `.github/icm/_shared/release.md`
- Reference (every run): `.github/icm/_shared/build-and-test.md`

Do NOT load: the other pipelines, other runs' output.

## Process
1. On a branch `release/X.Y.Z` from `origin/main`, run `npm version X.Y.Z --no-git-tag-version` (it updates `package.json` and `package-lock.json`, and creates no tag).
2. Set the `User-Agent` version in `src/client.ts` to the same number, as [release.md](../../../_shared/release.md) "The version" says, or record in the plan why not.
3. Run the CI chain: `npm ci && npm run lint && npm run format:check && npm run build && npm run test:coverage`.
4. Open the pull request: title `chore: release vX.Y.Z`, body the approved notes and the checks. Wait for `CI/CD` to pass. The agent does not merge it and does not tag.

## Outputs
- release-pr.md → output/ — the pull request's link, the files changed, the CI result, and the exact tag command for stage 03.

## Human check
A person reviews and merges the release pull request, and confirms the merge commit's `package.json` shows the approved version.
